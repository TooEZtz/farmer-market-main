const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    price: Number,
    image: String, // URL or base64 encoded image
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', productSchema);
