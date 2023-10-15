const Review = require('../models/serviceReviewModel');
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

exports.setServiceUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.customer) req.body.customer = req.user.id;
  if (!req.body.service) req.body.service = req.params.serviceId;
  next();
};
