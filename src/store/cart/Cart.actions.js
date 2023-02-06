import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, checkout, fetchCart, removeFromCart } from '../../api/cart';

export const addItem = createAsyncThunk(
  'carts/:cartId/items',
  async (Item, thunkAPI) => {
    const { cartId, product, qty} = Item;
    try {
      const response = await addToCart({cartId, product, qty});
      const item = {
        ...product,
        cartitemid: response,
        qty
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
  '/:userId/carts/:cartId',
  async (userId, thunkAPI) => {
    try {
      const response = await fetchCart(userId);
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
  'carts/:cartId/removeItem',
  async (cartitemid, thunkAPI) => {
    try {
      await removeFromCart(cartitemid);
      return {
        item: cartitemid
      }
    } catch(err) {
        console.error(err);
        throw err;
    }
  }
);