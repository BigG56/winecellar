import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProduct, fetchProducts, fetchProductType } from '../../api/product';

export const loadProduct = createAsyncThunk(
  'products/loadProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await fetchProduct(productId);
      return {
        product: response
      };
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
);

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async (params, thunkAPI) => {
    try {
      const response = await fetchProducts();
      return {
        products: response
      }
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
);

export const loadProductType = createAsyncThunk(
    'products/loadProductType',
    async (productType, thunkAPI) => {
      try {
        const response = await fetchProductType(productType);
        return {
          products: response
        }
      } catch(err) {
        console.error(err);
        throw err;
      }
    }
  );