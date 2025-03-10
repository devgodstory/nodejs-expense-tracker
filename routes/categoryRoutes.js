const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// Create a new category
router.post('/', async (req, res) => {
  const { name, icon } = req.body;
  try {
    const newCategory = new Category({ name, icon });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
