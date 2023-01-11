import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import { useDispatch } from 'react-redux';
import { checkLoginStatus } from './store/auth/Auth.actions';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import ProductDetails from './routes/ProductDetails/ProductDetails';
import Register from './routes/Register/Register';

function App() {

  const dispatch = useDispatch();

  // Load user cart on entry to app
  useEffect(() => {
    async function isLoggedIn() {
      await dispatch(checkLoginStatus());
    }

    isLoggedIn();
  }, [dispatch]);

  return (
    <div className="App" style={{flex: 1}}>
     <Router basename="/home">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/products" element={<ProductDetails />}/>
          <Route path="/products/:productsType" element={<ProductDetails />}/>
          {/* Private Routes */}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
