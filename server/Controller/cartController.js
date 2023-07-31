const Cart = require('../Model/Cart');

// Get cart data
exports.getCartData = async (req, res) => {
  console.log('hello')
  try {
    const cartData =await Cart.find();
    // console.log(cartData,'[[[[[[[')
    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update cart data
exports.updateCartData = async (req, res) => {
  try {
    const { cartData, totalItems, totalPrice } = req.body;
    console.log(totalPrice)

    // Remove existing cart data
    await Cart.deleteMany({});

    // Save the new cart data
    const cart = new Cart({
      cartData: cartData,
      totalItems: totalItems,
      totalPrice: totalPrice,
    });

    // Save the cart data to the database
    const savedCart = await cart.save();
    console.log(savedCart, '-------------------------');

    res.status(200).json({ cartData, totalItems, totalPrice });

  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
}