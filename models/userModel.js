const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, Provide a name'],
    trim: true, //remove whitespaces
    maxlength: [40, 'Maxlength is 40 characters!!'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  favorites: [
    {
      type: {
        type: String,
        enum: ['Service', 'Product'], // Type can be Service or Product
        required: true,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'favorites.type', // Reference dynamically based on the type
      },
    },
  ],
  role: {
    type: String,
    enum: ['customer', 'serviceProvider', 'admin'],
    default: 'customer',
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
  productsChecks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please, Provide a email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please, Provide a password'],
    minlength: [8, 'Minlength is 8 characters!!'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please, Confirm your password'],
    validate: {
      // this only works with CREATE & SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: String,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  subscribed: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({ active: { $ne: false } });
  next();
});

// instance method , can use it in all user docs
userSchema.methods.correctPassword = async function (
  candiatePassword,
  userPassword
) {
  return await bcrypt.compare(candiatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimetamp = this.passwordChangedAt.getTime() / 1000;
    return JWTTimestamp < changedTimetamp;
  }
  // by defult , NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // expires after 10m
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
