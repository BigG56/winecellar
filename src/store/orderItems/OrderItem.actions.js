import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrderItems } from '../../api/order';

export const loadOrderItems = createAsyncThunk(
    'orders/:orderId/loadOrderItems',
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