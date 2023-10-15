const express = require('express');
const serviceControllers = require('../controllers/serviceControllers');
const authControllers = require('../controllers/authControllers');
const Service = require('../models/serviceModel');

const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);

// Get a list of all services
router.get('/', serviceControllers.getAllServices);

// Get a single service by ID
router.get('/:id', serviceControllers.getServiceByID);

// admin section

// Get a list of all Unapproved services
router.get(
  '/admin/unapproved',
  authControllers.adminOnly,
  serviceControllers.getAllUnapprovedServices
);

// Get a single Unapproved service by ID
router.get(
  '/admin/unapproved/:id',
  authControllers.adminOnly,
  serviceControllers.getUnapprovedServiceByID
);

// Update a service by ID from Unapproved to approved
router.patch(
  '/admin/approve/:id',
  authControllers.adminOnly,
  authControllers.approveDoc(Service)
);

// Update a service by ID from Unapproved to be removed
router.delete(
  '/admin/remove/:id',
  authControllers.adminOnly,
  authControllers.deleteDoc(Service)
);

// user must be a Service Provider (serviceProvider)
router.use(authControllers.serviceProviderOnly);

// Create a new service
router.post(
  '/',
  serviceControllers.uploadServiceImages,
  serviceControllers.resizeServiceImages,
  serviceControllers.createService
);

// Update a service by ID
router.patch(
  '/:id',
  serviceControllers.uploadServiceImages,
  serviceControllers.resizeServiceImages,
  serviceControllers.updateService
);

// Delete a service by ID
router.delete('/:id', serviceControllers.deleteService);

module.exports = router;
