const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  product_details: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mrp: {
    type: Number,
    
  },
  img: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  netWeight: {
    type: Number,
    required: true,
  },
  grossWeight: {
    type: Number,
    required: true,
  },
});

// Create the Product model using the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;