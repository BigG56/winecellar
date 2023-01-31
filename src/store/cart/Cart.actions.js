import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, checkout, fetchCart, removeFromCart } from '../../api/cart';

export const addItem = createAsyncThunk(
  'carts/myCart/items',
  async ({ product, quantity } , thunkAPI) => {
    try {
      const response = await addToCart(product, quantity);
      const item = {
        ...product,
        cartItemId: response.id,
        quantity
      };
      return { item } ;
    } catch(err) {
        console.error(err);
        throw err;
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'carts/myCart/checkoutCart',
  async ({ cartId, paymentInfo }, thunkAPI) => {
    try {
      const response = await checkout(cartId, paymentInfo);
      return {
        order: response
      }
    } catch(err) {
        console.error(err);
        throw err;
    }
  }
);

export const loadCart = createAsyncThunk(
  'carts/myCart',
  async (params, thunkAPI) => {
    try {
      const response = await fetchCart();
      return {
        cart: response
      }
    } catch(err) {
        console.error(err);
        throw err;
    }
  }
);

export const removeItem = createAsyncThunk(
  'carts/myCart/removeItem',
  async (cartItemId, thunkAPI) => {
    try {
      await removeFromCart(cartItemId);
      return {
        item: cartItemId
      }
    } catch(err) {
        console.error(err);
        throw err;
    }
  }
);