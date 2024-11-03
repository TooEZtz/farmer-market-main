const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Product = require('../models/Product');
const Order = require('../models/Order');
const authenticate = require('../middleware/authenticate');

// Middleware to verify farmer
const verifyFarmer = (req, res, next) => {
    if (req.user.userType !== 'farmer') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

// Add a product
router.post('/add-product', authenticate, verifyFarmer, async (req, res) => {
    const { name, description, price, image } = req.body;
    try {
        const product = new Product({
            farmer: req.user.userId,
            name,
            description,
            price,
            image,
        });
        await product.save();
        res.status(201).json({ message: 'Product added' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get farmer's products and earnings
router.get('/dashboard', authenticate, verifyFarmer, async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.user.userId });
        const orders = await Order.find({ 'products.product': { $in: products.map(p => p._id) } });
        const totalEarnings = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        res.json({ products, totalEarnings });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
