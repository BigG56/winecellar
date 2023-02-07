import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus } from '../auth/Auth.actions';
import { addItem, checkoutCart, loadCart, removeItem, updateItem } from './Cart.actions';
import { StarRateTwoTone } from '@material-ui/icons';

const initialState = {
  cart: {
    id: 0,
    user_id: 0,
    items: []
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.cart.items.push(item);
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state.cart, cart);
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state.cart, cart);
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.cart.items = state.cart.items.filter((product) => product.cartitemid !== item);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const { item, qty } = action.payload;
        const index = state.cart.items.findIndex(cartitemid => cartitemid !== item)
        const newItem = [...state.cart.items]
        newItem[index].qty = qty;
      })
  }
});

// Export reducer function by default
export default cartSlice.reducer;