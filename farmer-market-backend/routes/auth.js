const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    const { name, email, password, userType } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, userType });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Incorrect password');
        const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET);
        res.json({ token, userType: user.userType });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
