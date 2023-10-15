const Service = require('../models/serviceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

exports.getAllServices = factory.getAll(Service);
exports.getServiceByID = factory.getOne(Service);
exports.getAllUnapprovedServices = factory.getAllUnapproved(Service);
exports.getUnapprovedServiceByID = factory.getOneUnapproved(Service);

// Define storage configuration for Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(
//       __dirname,
//       '..',
//       'public',
//       'uploads',
//       'services'
//     );
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     // Generate a unique filename for the uploaded file
//     const ext = path.extname(file.originalname);
//     cb(null, `Service_image_${Date.now()}${ext}`);
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

// exports.uploadServiceImages = upload.fields([
//   { name: 'imageCover', maxCount: 1 },
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

exports.uploadServiceImages = customUpload([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images' },
]);

exports.resizeServiceImages = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  // Check if 'imageCover' is present in req.files
  const imageCoverFile = req.files['imageCover'];

  if (imageCoverFile) {
    // Handle single image (imageCover)
    const filename = `service-Cover-${req.user.id}-${Date.now()}.jpeg`;

    // Add the 'coverName' field to the 'imageCoverFile' object
    imageCoverFile[0].coverName = filename;

    await sharp(imageCoverFile[0].buffer)
      //.resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/services/${filename}`);
  }

  // Handle multiple images (images)
  if (req.files['images']) {
    await Promise.all(
      req.files['images'].map(async (file) => {
        const filename = `service-image-${req.user.id}-${Date.now()}.jpeg`;

        file.imageName = filename;

        await sharp(file.buffer)
          //.resize(500, 500)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/services/${filename}`);
      })
    );
  }

  next();
});

exports.createService = catchAsync(async (req, res, next) => {
  // Check if there are uploaded image files
  if (req.files && req.files.imageCover) {
    // Check if there is an uploaded image cover
    const imageCoverFile = req.files.imageCover[0];
    if (imageCoverFile) {
      req.body.imageCover = `/img/services/${imageCoverFile.coverName}`;
    }
  }

  req.body.serviceProvider = req.user;

  // Create the document with the modified req.body
  const newDoc = await Service.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      documentId: newDoc._id,
    },
  });
});

exports.updateService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  // If the Service is not found, return an error response
  if (!service) {
    return res.status(404).json({
      status: 'fail',
      message: 'Service not found',
    });
  }

  const currentUser = req.user;

  // Check if the service's owner is the same as the current user
  if (service.serviceProvider._id.toString() !== currentUser._id.toString()) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to update this service',
    });
  }

  req.body.serviceProvider = req.user;

  // Update the Service properties based on the request body
  for (const field in req.body) {
    if (Object.hasOwnProperty.call(req.body, field)) {
      // Check if the field is 'approved', and skip it if it is
      if (field !== 'approved') {
        service[field] = req.body[field];
      }
    }
  }

  // Handle newly uploaded images (imageCover)
  if (req.files && req.files.imageCover) {
    // Check if there's an existing imageCover path
    if (service.imageCover && service.imageCover.startsWith('img/services/')) {
      // Construct the absolute path to the old imageCover file
      const oldImageCoverPath = path.join(
        __dirname,
        '..',
        'public',
        service.imageCover
      );

      // Delete the old imageCover file from the server
      try {
        fs.unlinkSync(oldImageCoverPath);
      } catch (err) {
        return next(new AppError(`Error deleting imageCover file`, 500));
      }
    }
    // Check if any files were uploaded
    const imageCoverFile = req.files.imageCover[0];
    if (imageCoverFile) {
      // Update the imageCover path in the service document
      service.imageCover = `/img/services/${imageCoverFile.coverName}`;
    }
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
    service.imageCover = null; // Set imageCover to null in the service
  }

  service.upproved = false; // set it to false to be reviewed be the admin

  // Save the updated Service document
  await service.save();

  res.status(200).json({
    status: 'success',
    data: {
      service,
    },
  });
});

exports.deleteService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return next(new AppError('No document found with that ID', 404));
  }

  const currentUser = req.user;

  // Check if the service's owner is the same as the current user
  if (service.serviceProvider.toString() !== currentUser._id.toString()) {
    return res.status(403).json({
      status: 'fail',
      message: 'You are not authorized to update this service',
    });
  }

  // delete the service
  await service.remove();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
