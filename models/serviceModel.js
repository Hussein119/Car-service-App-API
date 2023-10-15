const validator = require('validator');
const mongoose = require('mongoose');

const availableTimeSchema = {
  daysPerWeek: {
    type: [String],
    enum: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
  startTime: {
    type: String,
    match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Matches time in HH:mm format
  },
  endTime: {
    type: String,
    match: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Matches time in HH:mm format
  },
};

const serviceSchema = new mongoose.Schema(
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
    imageCover: {
      type: String,
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
    availableTime: availableTimeSchema,
    waitingTime: {
      type: Number, // EX : Represents a waiting time of 2 hours
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
    //     ref: 'ServiceReview',
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

serviceSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'serviceProvider',
    select: 'name email',
  });
  next();
});

// virtual populate
serviceSchema.virtual('reviews', {
  ref: 'ServiceReview',
  foreignField: 'service', // 'service' exists in review model
  localField: '_id', // the id of the service in the service model
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
