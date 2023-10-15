const validator = require('validator');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //required: true,
      trim: true,
    },
    description: {
      type: String,
      //required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    imageCover: {
      type: String,
    },
    price: {
      type: Number,
      //required: true,
    },
    priceCurrency: {
      type: String,
      enum: ['EGP'],
      default: 'EGP',
      //required: true,
    },
    quantity: {
      type: Number,
    },
    category: {
      type: String,
      //required: true,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, 'ar-EG');
        },
        message: 'Please provide a valid phone number',
      },
    },
    status: {
      type: String,
      enum: ['new', 'used'],
    },
    area: {
      type: String,
    },
    serviceProvider: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Service Provider (seller) must be specified.'],
    },
    approved: {
      type: Boolean,
      default: false,
    },
    // reviews: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'ProductReview',
    //   },
    // ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps to the document
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'serviceProvider',
    select: 'name email',
  });
  next();
});

// virtual populate
productSchema.virtual('reviews', {
  ref: 'ProductReview',
  foreignField: 'product',
  localField: '_id',
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
