const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// Get all available products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({ available: true }).populate('farmer', 'name');
        res.json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get product details
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('farmer', 'name');
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
