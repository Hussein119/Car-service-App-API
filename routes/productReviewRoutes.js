const express = require('express');
const reviewControllers = require('../controllers/productReviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);

router
  .route('/')
  .post(
    authControllers.restrictTo('customer'),
    reviewControllers.setProductUserIds,
    reviewControllers.createReview
  );

router.route('/').get(reviewControllers.getAllReviews);

router
  .route('/:id')
  .get(reviewControllers.getReview)
  .patch(
    authControllers.restrictTo('customer', 'admin'),
    reviewControllers.updateReview
  )
  .delete(
    authControllers.restrictTo('customer', 'admin'),
    reviewControllers.deleteReview
  );

// Creating customer to service or to product reviews
//const serviceId = 'serviceId';
//const productId = 'productId';
// router.post(
//   `/customers/services/:${serviceId}`,
//   authControllers.restrictTo('customer'), // Restrict to authenticated users
//   reviewControllers.createReview // Create the customer to service or to product review
// );

// router.post(
//   `/customers/products/:${productId}`,
//   authControllers.restrictTo('customer'), // Restrict to authenticated users
//   reviewControllers.createReview // Create the customer to service or to product review
// );

module.exports = router;
