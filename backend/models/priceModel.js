const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  category: {  
    type: String,
    required: true,
    enum: ['Cat A', 'Cat B', 'Cat C', 'Cat D'],
  },
  pricePerKg: {
    type: Number,
    required: true
  },
  price250g: {
    type: Number,
    required: true
  },
  price500g: {
    type: Number,
    required: true
  },
  wholesalePrice: {
    type: Number,
    default: null
  },
  costPrice: {
    type: Number,
    default: null
  }
}, {
  timestamps: true
});

const Price = mongoose.model('Price', priceSchema);

module.exports = Price;
