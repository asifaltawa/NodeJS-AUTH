const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {

    await mongoose.connect(`${process.env.MONGO_URI}/ImageDB`);
    console.log(`MongoDB Connected: `);
  } catch (err) {

    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;