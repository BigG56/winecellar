import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser, updateUser } from '../../api/user';

export const fetchUsers = createAsyncThunk(
    'users/:userName',
    async (userName, thunkAPI) => {
      try {
        const response = await fetchUser(userName);
        return {
          user: response
        };
      } catch(err) {
        console.error(err);
        throw err;
      }
    } 
  );

  export const updateUsers = createAsyncThunk(
    'users/update',
    async (userName, thunkAPI) => {
      try {
        const response = await updateUser(userName);
        return {
          user: response
        };
      } catch(err) {
        console.error(err);
        throw err;
      }
    }
  );