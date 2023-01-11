import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './store/rootReducer';

// Initializes redux store
const store = configureStore({
  reducer: rootReducer
});

const root = ReactDOM.createRoot( document.getElementById('root') );
root.render (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);


reportWebVitals();
