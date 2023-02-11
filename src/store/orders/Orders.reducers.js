import { createSlice } from '@reduxjs/toolkit';
import { checkoutCart } from '../cart/Cart.actions';
import { loadOrders, loadOrderItems } from './Orders.actions';

const initialState = {};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Add order from successful checkout
      .addCase(checkoutCart.fulfilled, (state, action) => {
        const { order } = action.payload;
        state[order.id] = order;
      })
      // Load order data by ID success
      /*.addCase(loadOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state[order.id] = order;
      })*/
      // Load order list success
      .addCase(loadOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        orders.forEach((order) => {
          const { id } = order;
          state[id] = order;
        });
      })
      .addCase(loadOrderItems.fulfilled, (state, action) => {
        const { orderItems } = action.payload;
        orderItems.forEach((orderItem) => {
          const { id } = orderItem;
          state[id] = orderItem;
        });
      })
  }
});

// Export reducer function by default
export default orderSlice.reducer;