const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./../../models/userModel');
const Product = require('./../../models/productModel');
const Service = require('./../../models/serviceModel');
const ServiceReview = require('./../../models/serviceReviewModel');
const ProductReview = require('./../../models/peoductReviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);

const services = JSON.parse(
  fs.readFileSync(`${__dirname}/services.json`, 'utf-8')
);

const servicesReviews = JSON.parse(
  fs.readFileSync(`${__dirname}/servicesReviews.json`, 'utf-8')
);

const productReviews = JSON.parse(
  fs.readFileSync(`${__dirname}/productReviews.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    //await User.create(users, { validateBeforeSave: false });
    //await Product.create(products, { validateBeforeSave: false });
    //await Service.create(services, { validateBeforeSave: false });
    //await ServiceReview.create(servicesReviews, { validateBeforeSave: false });
    //await ProductReview.create(productReviews, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    //await User.deleteMany();
    //await Product.deleteMany();
    //await Service.deleteMany();
    await ServiceReview.deleteMany();
    await ProductReview.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
