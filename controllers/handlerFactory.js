const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };
    // Check if 'approved' exists in the model
    if (Model.prototype.hasOwnProperty('approved')) {
      filter.approved = true;
    }

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFileds()
      .Pagination();
    // const doc = await features.query.explain();
    const doc = await features.query;

    if (doc.length == 0 || !doc) {
      return next(new AppError('No documents found', 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });

exports.getAllUnapproved = (Model) =>
  catchAsync(async (req, res, next) => {
    const filter = { approved: false };

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFileds()
      .Pagination();
    // const doc = await features.query.explain();
    const doc = await features.query;

    if (doc.length == 0 || !doc) {
      return next(new AppError('No documents found', 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newdoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        document: newdoc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    if (doc.approved === false) {
      return next(new AppError('This is Unapproved document!', 403));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.getOneUnapproved = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    if (doc.approved === true) {
      return next(new AppError('This is approved document!', 403));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(201).json({
      status: 'success',
      data: {
        document: doc,
      },
    });
  });
