import React ,{ useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import { useSelector } from 'react-redux';
//import { checkLoginStatus } from './store/auth/Auth.actions';
import Products from './routes/Products/Products';
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
  //const dispatch = useDispatch();

  // Load user cart on entry to app
  /*useEffect(() => {
    async function isLoggedIn() {
      await dispatch(checkLoginStatus());
    }

    isLoggedIn();
  }, [dispatch]);*/

  return (
    <div className="App" style={{flex: 1}}>
     <Router basename="/home" history={History}>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />}/>
          <Route path="/products" element={<Products />}/>
          <Route path="/auth/login" element={<Login />}/>
          <Route path="/auth/register" element={<Register/>}/>
          <Route path="/products/:productId/:productType" element={<ProductDetails />}/>
          {/* Private Routes */}
          <Route path="/users/:userName" element={<Account/>}/>
          <Route path="/carts/myCart" element={<ProtectedRoute isSignedIn={isSignedIn}><Cart/></ProtectedRoute>}/>
          <Route path="/checkout" element={<ProtectedRoute isSignedIn={isSignedIn}><Checkout/></ProtectedRoute>}/>
          <Route path="/orders" element={<ProtectedRoute isSignedIn={isSignedIn}><Orders/></ProtectedRoute>}/>
          <Route path="/orders/:orderId" element={<ProtectedRoute isSignedIn={isSignedIn}><OrderDetails/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
