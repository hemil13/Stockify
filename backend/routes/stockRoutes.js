const express = require('express');
const router = express.Router();
const Stock = require('../models/stockModel'); 

// POST request to add a new stock item with shopName
router.post('/addstock', async (req, res) => {
  try {
    const { stockName, quantity, price, shopName } = req.body;

    // Check if all required fields are present
    if (!stockName || !quantity || !price || !shopName) {
      return res.status(400).json({ message: 'Please provide all required fields (stockName, quantity, price, shopName)' });
    }

    const newStock = new Stock({ stockName, quantity, price, shopName });
    await newStock.save();
    res.status(200).json(newStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET request to fetch all stock items, optionally filter by shopName
router.get('/getstock', async (req, res) => {
  try {
    const { shopName } = req.query; // Get shopName filter from query params

    let stockItems;

    if (shopName) {
      // If shopName is provided, filter stock data by shopName
      stockItems = await Stock.find({ shopName });
    } else {
      // If no shopName filter, fetch all stock data
      stockItems = await Stock.find();
    }

    if (stockItems.length === 0) {
      return res.status(200).json({ message: "No data available" });
    }

    res.status(200).json(stockItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE request to remove a stock item by ID
router.delete('/deletestock/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStock = await Stock.findByIdAndDelete(id);

    if (!deletedStock) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    res.status(200).json({ message: 'Stock item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request to update a stock item by ID
router.put('/updatestock/:id', async (req, res) => {
  try {
    const { stockName, quantity, price, shopName } = req.body;
    const { id } = req.params;

    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { stockName, quantity, price, shopName },
      { new: true } // Return updated document
    );

    if (!updatedStock) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
