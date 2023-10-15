const Review = require('../models/peoductReviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = factory.getAll(Review);

exports.updateReview = factory.updateOne(Review);

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.getAllMyReviews = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  // Find all Reviews where the author field matches the user's ID
  const userReviews = await Review.find({ user });

  res.status(200).json(userReviews);
});

exports.setProductUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.customer) req.body.customer = req.user.id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};

// exports.createReview = catchAsync(async (req, res, next) => {
//   const { review, rating } = req.body;

//   // Access the user information from req.user
//   const customer = req.user.id;
//   const service = req.params.serviceId;
//   const product = req.params.productId;

//   if (service) {
//     const createdReview = new Review({ review, rating, customer, service });
//     await createdReview.save();
//     // Add the post's _id to the user's posts array
//     await User.findByIdAndUpdate(customer, {
//       $push: { reviews: createdReview._id },
//     });

//     // Add the post's _id to the user's posts array
//     await Service.findByIdAndUpdate(service, {
//       $push: { reviews: createdReview._id },
//     });

//     return res.status(201).json({ message: 'Review created successfully' });
//   }
//   if (product) {
//     const createdReview = new Review({ review, rating, customer, product });
//     await createdReview.save();
//     // Add the post's _id to the user's posts array
//     await User.findByIdAndUpdate(customer, {
//       $push: { reviews: createdReview._id },
//     });

//     // Add the post's _id to the user's posts array
//     await Product.findByIdAndUpdate(product, {
//       $push: { reviews: createdReview._id },
//     });

//     return res.status(201).json({ message: 'Review created successfully' });
//   }
// });

// exports.deleteReview = catchAsync(async (req, res, next) => {
//   const reviewId = req.params.id;

//   // Find the review by ID
//   const review = await Review.findById(reviewId);

//   if (!review) {
//     return res.status(404).json({ message: 'Review not found' });
//   }

//   // Get the author ID before deleting the review
//   const customer = review.customer;
//   const service = review.service;
//   const product = review.product;

//   // Use findByIdAndDelete to delete the post
//   await Review.findByIdAndDelete(reviewId);

//   // Remove the post's ID from the user's posts array
//   await User.findByIdAndUpdate(customer, { $pull: { reviews: reviewId } });

//   // Remove the post's ID from the service's posts array
//   await Service.findByIdAndUpdate(service, {
//     $pull: { reviews: reviewId },
//   });
//   // Remove the post's ID from the product's posts array
//   await Product.findByIdAndUpdate(product, {
//     $pull: { reviews: reviewId },
//   });

//   res.status(204).end(); // 204 No Content response on successful deletion
// });
