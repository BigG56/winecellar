import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import { useSelector } from 'react-redux';
import ProductsPage from './routes/Products/Products';
import Login from './routes/Login/Login';
import ProductDetails from './routes/ProductDetails/ProductDetails';
import Register from './routes/Register/Register';
import Home from './routes/Home/Home'
import History from './utils/history';
import Account from "./routes/Account/Account";
import Cart from "./routes/Cart/Cart";
import Checkout from "./routes/Checkout/Checkout";
import Orders from "./routes/Orders/Orders";
import OrderDetails from './routes/OrderDetails/OrderDetails';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';




function App() {
  const { isSignedIn } = useSelector(state => state.auth);

  return (
    <div className="App" style={{flex: 1}}>
     <Router basename="/home" history={History}>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />}/>
          <Route path="/products" element={<ProductsPage />}/>
          <Route path="/products/:productId/:productType" element={<ProductDetails />}/>
          <Route path="/auth/login" element={<Login />}/>
          <Route path="/auth/register" element={<Register/>}/>
          {/* Private Routes */}
          <Route path='users/:userId' element={<ProtectedRoute isSignedIn={isSignedIn}><Home /></ProtectedRoute>}/>
          <Route path="users/:userId/account" element={<ProtectedRoute isSignedIn={isSignedIn}><Account/></ProtectedRoute>}/>
          <Route path='users/:userId/products' element={<ProtectedRoute isSignedIn={isSignedIn}><ProductsPage /></ProtectedRoute>}/>
          <Route path="users/:userId/products/:productId/:productType" element={<ProtectedRoute isSignedIn={isSignedIn}><ProductDetails /></ProtectedRoute>}/>          
          <Route path="users/:userId/carts/:cartId" element={<ProtectedRoute isSignedIn={isSignedIn}><Cart/></ProtectedRoute>}/>
          <Route path="users/:userId/carts/:cartId/checkout" element={<ProtectedRoute isSignedIn={isSignedIn}><Checkout/></ProtectedRoute>}/>
          <Route path="users/:userId/orders" element={<ProtectedRoute isSignedIn={isSignedIn}><Orders/></ProtectedRoute>}/>
          <Route path="users/:userId/orders/:orderId" element={<ProtectedRoute isSignedIn={isSignedIn}><OrderDetails/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
