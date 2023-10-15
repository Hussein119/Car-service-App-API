const mongoose = require('mongoose');
const Product = require('./productModel');

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
    // customer will make a review to service or product
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Customer (Reviewer) must be specified.'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ customer: 1, product: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'customer',
    select: 'name email',
  }).populate({
    path: 'product',
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
    await Product.findByIdAndUpdate(id, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRatings,
    });
  } else {
    await Product.findByIdAndUpdate(id, {
      // default
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
    });
  }
};

reviewSchema.post('save', function () {
  if (this.product) this.constructor.calcAverageRating(this.product);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) await doc.constructor.calcAverageRating(doc.product);
});

const ProductReview = mongoose.model('ProductReview', reviewSchema);

module.exports = ProductReview;
