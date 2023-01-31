import { createAsyncThunk } from '@reduxjs/toolkit';
import { isLoggedIn, login, register, logout } from '../../api/auth';

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLogin',
  async (param, thunkAPI) => {
    try {
      const response = await isLoggedIn();

      return {
        cart: response.cart,
        isAuthenticated: true,
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
    const { email, password } = credentials
    try {
      const response = await login({email, password});
      const user = response;
      if (user.email) {
        return {
          isAuthenticated: true,
          isSignedIn: true
        }
      }
      return {
        user
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
        isAuthenticated: false
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