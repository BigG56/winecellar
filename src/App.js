import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/header.js';
import { useDispatch } from 'react-redux';
import { checkLoginStatus } from './store/auth/Auth.actions';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';

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
     <Router basename={'/client'}>
        <Header />
        <Routes>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
