const mongoose = require('mongoose');

// Define the schema for the ProductSlider
const productSliderSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  discount: {
    type: Number,
    required: true
  }
});

// Create the ProductSlider model using the schema
const ProductSlider = mongoose.model('ProductSlider', productSliderSchema);

module.exports = ProductSlider;