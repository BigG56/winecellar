import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus } from '../auth/Auth.actions';
import { addItem, checkoutCart, loadCart, removeItem } from './Cart.actions';

const initialState = {
  items: [],
  cart: {}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items.push(item);
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
        state.cart = cart;
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        state.cart = cart;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items = state.items.filter((product) => product.cartItemId !== item);
      })
  }
});

// Export reducer function by default
export default cartSlice.reducer;