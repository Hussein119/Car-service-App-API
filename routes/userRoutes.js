const express = require('express');
const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

// auth

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);
router.post('/forgotPassword', authControllers.forgotPassword);
router.patch('/resetPassword/:token', authControllers.resetPassword);
router.route('/Unsubscribe/:email').get(userControllers.unsubscribe);

// will protect all the routes after it, beacuse the middleware run in sequence
router.use(authControllers.protect);

router.patch('/updateMyPassword', authControllers.updatePassword);
router.get('/getMe', userControllers.getMe, userControllers.getUser);
router.patch(
  '/updateMe',
  userControllers.uploadUserPhoto,
  userControllers.resizeUserPhoto,
  userControllers.updateMe
);
router.delete('/deleteMe', userControllers.deleteMe);

// will run for all the routes after it, beacuse the middleware run in sequence
router.use(authControllers.restrictTo('admin'));

// Users
router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);
router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
