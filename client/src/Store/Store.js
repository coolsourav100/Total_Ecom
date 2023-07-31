import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import counterSlice  from './toggleSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter:counterSlice
  },
})