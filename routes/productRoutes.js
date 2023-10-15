const express = require('express');
const productControllers = require('../controllers/productControllers');
const authControllers = require('../controllers/authControllers');
const Product = require('../models/productModel');
const reviewRouter = require('./productReviewRoutes');

const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);

router.use('/:productId/reviews', reviewRouter);

// Get a list of all products
router.get('/', productControllers.getAllProducts);

// Get a single product by ID
router.get('/:id', productControllers.getProductByID);

// admin section

// Get a list of all Unapproved products
router.get(
  '/admin/unapproved',
  authControllers.adminOnly,
  productControllers.getAllUnapprovedProducts
);

// Get a single Unapproved product by ID
router.get(
  '/admin/unapproved/:id',
  authControllers.adminOnly,
  productControllers.getUnapprovedProductByID
);

// Update a product by ID from Unapproved to approved
router.patch(
  '/admin/approve/:id',
  authControllers.adminOnly,
  authControllers.approveDoc(Product)
);

// Update a product by ID from Unapproved to be removed
router.delete(
  '/admin/remove/:id',
  authControllers.adminOnly,
  authControllers.deleteDoc(Product)
);

// user must be a Product Provider (productProvider)
router.use(authControllers.serviceProviderOnly);

// Create a new product
router.post(
  '/',
  productControllers.uploadProductImages,
  productControllers.resizeProductImages,
  productControllers.createProduct
);

// Update a product by ID
router.patch(
  '/:id',
  productControllers.uploadProductImages,
  productControllers.resizeProductImages,
  productControllers.updateProduct
);

// Delete a product by ID
router.delete('/:id', productControllers.deleteProduct);

module.exports = router;
