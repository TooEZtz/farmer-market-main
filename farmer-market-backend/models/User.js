const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    userType: { type: String, enum: ['customer', 'farmer'], default: 'customer' },
});

module.exports = mongoose.model('User', userSchema);
