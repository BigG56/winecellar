import { combineReducers } from 'redux';
import authReducer from './auth/Auth.reducer';
import productReducer from './products/Products.reducers';

export default combineReducers({
    auth: authReducer,
    //user: userReducer,
    products: productReducer,
    //cart: cartReducer,
    //order: orderReducer
  });