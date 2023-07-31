const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, default: null },
  button_title: { type: String, required: true },
  url: { type: String, required: true },
  coupon: { type: String, required: false }, // Not mandatory
  productId: { type: String, required: false }, // Not mandatory
});

const Slider = mongoose.model('Slider', sliderSchema);
module.exports = Slider