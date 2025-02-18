
const mongoose = require('mongoose');
require('dotenv').config() 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB is connected...");
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error.message);
  }
};

module.exports = connectDB;

