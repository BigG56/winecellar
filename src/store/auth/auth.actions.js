import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn, login, register, logout } from '../../api/auth';

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (userId, thunkAPI) => {
    try {
      const response = await isLoggedIn(userId);

      return {
        cart: response.cart,
        isSignedIn: true,
        user: response.user
      }
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    const { email, password } = credentials;
    try {
      const response = await login({email, password});
      if (response.email) {
        return {
          user: response,
          isAuthenticated: true,
          isSignedIn: true
        }
      }
    } catch(err) {
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (param, thunkAPI) => {
    try {
      const response = await logout();
      return {
        response,
        isAuthenticated: false,
        isSignedIn: false
      }
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
);


export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      await register(credentials);
      return {};
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
);