import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders, fetchOrderItems } from '../../api/order';

/*export const loadOrder = createAsyncThunk(
  'orders/loadOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await fetchOrder(orderId);
      return {
        order: response
      };
    } catch(err) {
      throw err;
    }
  }
);*/

export const loadOrders = createAsyncThunk(
  'orders/loadOrders',
  async (userId, thunkAPI) => {
    try {
      const response = await fetchOrders(userId);
      return {
        orders: response
    }
    } catch(err) {
      throw err;
    }
  }
);

export const loadOrderItems = createAsyncThunk(
  'orders/loadOrderItems',
  async (orderId, thunkAPI) => {
    try {
      const response = await fetchOrderItems(orderId);
      return {
        orderItems: response
    }
    } catch(err) {
      throw err;
    }
  }
);