import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser, registerUser, logoutUser } from './Auth.actions';

const initialState = {
  isSignedIn: false,
  isFetching: false,
  isAuthenticated: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Check login status success
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { isSignedIn } = action.payload;
        state.isSignedIn = isSignedIn;
      })
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        const { isAuthenticated, isSignedIn } = action.payload;
        state.isAuthenticated = isAuthenticated;
        state.isSignedIn = isSignedIn;
      })
      // Login failure
      .addCase(loginUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
      //logout success
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.isSignedIn = false;
      })
      // Registration success
      .addCase(registerUser.fulfilled, (state, action) => {
         state.isAuthenticated = false;
      })
      // Registration failure
      .addCase(registerUser.rejected, (state, action) => {
        const { error } = action.payload;
        state.isAuthenticated = false;
        state.error = error;
      })
  }
});

// Export reducer function by default
export default authSlice.reducer;