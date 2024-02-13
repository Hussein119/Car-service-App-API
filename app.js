const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const globalErrorHandler = require('./controllers/errorControllers');
const userRouter = require('./routes/userRoutes');
const productReviewRouter = require('./routes/productReviewRoutes');
const serviceReviewRouter = require('./routes/serviceReviewRoutes');
const productRouter = require('./routes/productRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const AppError = require('./utils/appError');

const app = express();

// Set the view engine to Pug
app.set('view engine', 'pug');

// Implement CORS
app.use(cors());

app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
// accepts 100 request form one IP in one hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

app.use(compression());

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/productReviews', productReviewRouter);
app.use('/api/v1/serviceReviews', serviceReviewRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/services', serviceRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// global error handling
app.use(globalErrorHandler);

module.exports = app;
