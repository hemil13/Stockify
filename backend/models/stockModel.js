// models/stockModel.js
const mongoose = require('mongoose');

// Define the schema for the stock data
const stockSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
    enum: ['Shop A', 'Shop B', 'Shop C', 'Shop D'],
  },
  stockName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create the model from the schema
const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
