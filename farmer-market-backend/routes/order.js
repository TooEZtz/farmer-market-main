const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

const Order = require('../models/Order');
const Product = require('../models/Product');

// Place an order
router.post('/', authenticate, async (req, res) => {
    const { products } = req.body; // Array of { productId, quantity }
    try {
        let totalPrice = 0;
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product || !product.available) throw new Error('Product not available');
            totalPrice += product.price * item.quantity;
            // Optionally update product availability or stock here
        }
        const order = new Order({
            customer: req.user.userId,
            products: products.map(item => ({ product: item.productId, quantity: item.quantity })),
            totalPrice,
        });
        await order.save();
        res.status(201).json({ message: 'Order placed' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get customer orders
router.get('/', authenticate, async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.userId }).populate('products.product');
        res.json(orders);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
