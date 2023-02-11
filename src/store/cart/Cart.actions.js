import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, checkout, fetchCart, removeFromCart, updateCartItem } from '../../api/cart';

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
  'carts/:cartId/checkout',
  async (checkoutItems, thunkAPI) => {
    const { cartId, paymentInfo, userId} = checkoutItems;
    try {
      const response = await checkout({cartId, paymentInfo, userId});
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

export const updateItem = createAsyncThunk(
  'carts/:cartId/updateItem',
  async (updatedItem, thunkAPI) => {
    const { cartitemid, qty} = updatedItem;
    try {
      await updateCartItem({cartitemid,qty});
      return {
        item: cartitemid,
        qty: qty
      }
    } catch(err) {
        console.error(err);
        throw err;
    }
  }
);