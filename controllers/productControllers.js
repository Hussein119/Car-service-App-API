const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

exports.getAllProducts = factory.getAll(Product);
exports.getProductByID = factory.getOne(Product, { path: 'reviews' });
exports.getAllUnapprovedProducts = factory.getAllUnapproved(Product);
exports.getUnapprovedProductByID = factory.getOneUnapproved(Product);

// Define storage configuration for Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(
//       __dirname,
//       '..',
//       'public',
//       'uploads',
//       'products'
//     );
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     // Generate a unique filename for the uploaded file
//     const ext = path.extname(file.originalname);
//     cb(null, `Product_image_${Date.now()}${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

// // Configure Multer for file uploads
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 10, // Limit file size to 10MB
//   },
//   multerFilter,
// });

// exports.uploadProductImages = upload.fields([
//   { name: 'imageCover', maxCount: 1 },
//   { name: 'images' },
// ]);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const customUpload = (fields) => {
  return (req, res, next) => {
    const multerUpload = upload.fields(fields);

    multerUpload(req, res, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  };
};

exports.uploadProductImages = customUpload([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images' },
]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  // Check if 'imageCover' is present in req.files
  const imageCoverFile = req.files['imageCover'];

  if (imageCoverFile) {
    // Handle single image (imageCover)
    const filename = `product-Cover-${req.user.id}-${Date.now()}.jpeg`;

    // Add the 'coverName' field to the 'imageCoverFile' object
    imageCoverFile[0].coverName = filename;

    await sharp(imageCoverFile[0].buffer)
      //.resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/products/${filename}`);
  }

  // Handle multiple images (images)
  if (req.files['images']) {
    await Promise.all(
      req.files['images'].map(async (file) => {
        const filename = `product-image-${req.user.id}-${Date.now()}.jpeg`;

        file.imageName = filename;

        await sharp(file.buffer)
          //.resize(500, 500)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/products/${filename}`);
      })
    );
  }

  next();
});

exports.createProduct = catchAsync(async (req, res, next) => {
  // Check if there are uploaded image files
  if (req.files && req.files.images) {
    // Check if any files were uploaded
    const images = req.files.images.map(
      (file) => `/img/products/${file.imageName}`
    ); // Extract the file paths

    // Include the image paths in the req.body
    req.body.images = images;
  }

  if (req.files && req.files.imageCover) {
    // Check if there is an uploaded image cover
    const imageCoverFile = req.files.imageCover[0];
    if (imageCoverFile) {
      req.body.imageCover = `/img/products/${imageCoverFile.coverName}`;
    }
  }

  req.body.serviceProvider = req.user;

  // Create the document with the modified req.body
  const newDoc = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      documentId: newDoc._id,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  // If the product is not found, return an error response
  if (!product) {
    return res.status(404).json({
      status: 'fail',
      message: 'Product not found',
    });
  }

  const currentUser = req.user;

  // Check if the service's owner is the same as the current user
  if (product.serviceProvider._id.toString() !== currentUser._id.toString()) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to update this product',
    });
  }

  req.body.serviceProvider = req.user;

  // Update the product properties based on the request body
  for (const field in req.body) {
    if (Object.hasOwnProperty.call(req.body, field)) {
      // Check if the field is 'approved', and skip it if it is
      if (field !== 'approved') {
        product[field] = req.body[field];
      }
    }
  }

  // Handle newly uploaded images
  if (req.files && req.files.images) {
    // Check if any files were uploaded
    const newImages = req.files.images.map(
      (file) => `/img/products/${file.imageName}`
    ); // Extract the file paths

    // Concatenate the existing images with the new images
    product.images = product.images.concat(newImages);
  }

  // Handle newly uploaded image cover
  if (req.files && req.files.imageCover) {
    // Check if there's an existing imageCover path
    if (product.imageCover && product.imageCover.startsWith('img/products/')) {
      // Construct the absolute path to the old imageCover file
      const oldImageCoverPath = path.join(
        __dirname,
        '..',
        'public',
        product.imageCover
      );

      // Delete the old imageCover file from the server
      try {
        fs.unlinkSync(oldImageCoverPath);
      } catch (err) {
        return next(new AppError(`Error deleting imageCover file`, 500));
      }
    }
    const imageCoverFile = req.files.imageCover[0];
    if (imageCoverFile) {
      product.imageCover = `/img/products/${imageCoverFile.coverName}`;
    }
  }

  // Handle deleted images
  if (req.body.deletedImages && req.body.deletedImages.length > 0) {
    // Remove the deleted image paths from the product's images
    product.images = product.images.filter((imagePath) => {
      // imagePath -> /img/products/Product_image_1695731792009.png
      if (req.body.deletedImages.includes(imagePath)) {
        // Delete the file from the server
        try {
          const absolutepath = path.join(__dirname, '..', '/public', imagePath);
          fs.unlinkSync(absolutepath); // Synchronously delete the file
        } catch (err) {
          return next(new AppError(`Error deleting file ${imagePath}`, 500));
        }
        return false; // Exclude the deleted image from the array
      }
      return true; // Keep non-deleted images in the array
    });
  }

  // Handle deleted imageCover
  if (req.body.deletedImageCover) {
    const imageCoverPath = path.join(
      __dirname,
      '..',
      '/public',
      req.body.deletedImageCover
    );
    try {
      fs.unlinkSync(imageCoverPath); // Synchronously delete the imageCover file
    } catch (err) {
      return next(
        new AppError(
          `Error deleting imageCover file ${req.body.deletedImageCover}`,
          500
        )
      );
    }
    product.imageCover = null; // Set imageCover to null in the product
  }

  product.upproved = false; // set it to false to be reviewed be the admin

  // Save the updated product document
  await product.save();

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('No document found with that ID', 404));
  }

  const currentUser = req.user;

  // Check if the service's owner is the same as the current user
  if (product.serviceProvider.toString() !== currentUser._id.toString()) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to update this service',
    });
  }

  // delete the product
  await product.remove();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
