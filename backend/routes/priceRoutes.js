const express = require('express');
const router = express.Router();
const Price = require('../models/priceModel'); // Make sure you have the Price model defined

// POST request to add a price
router.post('/addprice', async (req, res) => {
  try {
    const {
      productName,
      category,
      pricePerKg,
      price250g,
      price500g,
      wholesalePrice,
      costPrice
    } = req.body;

    const newPrice = new Price({
      productName,
      category,
      pricePerKg,
      price250g,
      price500g,
      wholesalePrice,
      costPrice
    });

    await newPrice.save();
    res.status(201).json(newPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET request to fetch all prices
router.get('/getprice', async (req, res) => {
  try {
    const prices = await Price.find();
    if (prices.length === 0) {
      res.status(200).json({ message: "No data available" });
    } else {
      res.status(200).json(prices);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE request to remove a price entry
router.delete('/deleteprice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Price.findByIdAndDelete(id);
    res.status(200).json({ message: "Price entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request to update a price entry
router.put('/updateprice/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedPrice = await Price.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedPrice) {
      return res.status(404).json({ message: "Price entry not found" });
    }

    res.status(200).json(updatedPrice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
