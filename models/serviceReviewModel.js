const mongoose = require('mongoose');
const Service = require('./serviceModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Rating is required.'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // customer will make a review to service or service
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer (Reviewer) must be specified.'],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ customer: 1, service: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'customer',
    select: 'name email',
  }).populate({
    path: 'service',
    select: 'name description',
  });
  next();
});

// calcAverageRating for Product

reviewSchema.statics.calcAverageRating = async function (id) {
  // this points to the model
  const stats = await this.aggregate([
    {
      $match: { id },
    },
    {
      $group: {
        _id: '$id',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Service.findByIdAndUpdate(id, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRatings,
    });
  } else {
    await Service.findByIdAndUpdate(id, {
      // default
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', function () {
  if (this.service) this.constructor.calcAverageRating(this.service);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) await doc.constructor.calcAverageRating(doc.service);
});

const ServiceReview = mongoose.model('ServiceReview', reviewSchema);

module.exports = ServiceReview;
