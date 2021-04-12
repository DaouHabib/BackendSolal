const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    prix: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    sale: {
        type: Boolean,
    },
    discount: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true

    },
    new: {
        type: Boolean,
    },
    
    userId: {
        type: String,
    },
});


const Product = mongoose.model('Produit', productSchema);
module.exports.Product = Product;

