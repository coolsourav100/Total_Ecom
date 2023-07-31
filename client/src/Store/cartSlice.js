import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartData: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      const { cartData, totalItems, totalPrice } = action.payload[0];
      state.cartData = cartData;
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },
    addToCart: (state, action) => {
      const { _id, price } = action.payload;
      const existingItem = state.cartData.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartData.push({ ...action.payload, quantity: 1 });
        state.totalItems += 1;
      }

      state.totalPrice = Number(state.totalPrice) + Number(price); // Increment totalPrice when adding an item to the cart
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.cartData.find((item) => item.id === itemId);

      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity;
        state.totalPrice =
          Number(state.totalPrice) - Number(itemToRemove.price) * Number(itemToRemove.quantity); // Decrement totalPrice when removing an item from the cart
        state.cartData = state.cartData.filter((item) => item.id !== itemId);
      }
    },
    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToIncrease = state.cartData.find((item) => item._id === itemId);

      if (itemToIncrease) {
        itemToIncrease.quantity += 1;
        state.totalItems += 1;
        state.totalPrice = Number(state.totalPrice) + Number(itemToIncrease.price); // Increment totalPrice when increasing the quantity
      }
    },
    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const itemToDecrease = state.cartData.find((item) => item._id === itemId);

      if (itemToDecrease) {
        itemToDecrease.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= itemToDecrease.price; // Decrement totalPrice when decreasing the quantity

        if (itemToDecrease.quantity <= 0) {
          state.cartData = state.cartData.filter((item) => item._id !== itemId);
        }
      }
    },
  },
});

export const { setCartData, addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;