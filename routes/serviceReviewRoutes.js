const express = require('express');
const reviewControllers = require('../controllers/serviceReviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);

router
  .route('/')
  .post(
    authControllers.restrictTo('customer'),
    reviewControllers.setServiceUserIds,
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

// Creating customer to service or to service reviews
//const serviceId = 'serviceId';
//const serviceId = 'serviceId';
// router.post(
//   `/customers/services/:${serviceId}`,
//   authControllers.restrictTo('customer'), // Restrict to authenticated users
//   reviewControllers.createReview // Create the customer to service or to service review
// );

// router.post(
//   `/customers/services/:${serviceId}`,
//   authControllers.restrictTo('customer'), // Restrict to authenticated users
//   reviewControllers.createReview // Create the customer to service or to service review
// );

module.exports = router;
