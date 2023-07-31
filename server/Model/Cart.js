const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
  cartData: {type:Array , require:true}, // Array of cart items
  totalItems: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;