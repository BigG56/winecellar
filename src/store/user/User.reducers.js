import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser } from '../auth/Auth.actions';

const initialState = {
  user: {
    userId: 0,
    username: '',
    email: '',
    firstname: '',
    lastname: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state.user, user);
      })
      // Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { user } = action.payload;
        Object.assign(state.user, user);
      })
  }
});

// Export reducer function by default
export default userSlice.reducer;