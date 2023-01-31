import './header.css';
import React, { useState } from'react';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { logoutUser } from '../../store/auth/Auth.actions';


const Header = () => {
  const history = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      history('/');
    } catch(err) {
      throw new err();
    }
  }


  const {isSignedIn} = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  return (
      <header className="head">
          <div className="header-bar">
              <p><a className="title" href='http://localhost:3008/home'>The WineCellar</a></p>
              <div className="button-container">
                { !isSignedIn &&
                  <Button color="inherit" component={Link} to="/auth/login">Login</Button>
                }
                { isSignedIn &&
                  <Button  onClick={handleLogout} color="inherit">Logout</Button>
                }
                { isSignedIn &&
                  <Button color="inherit" component={Link} to="/orders">Orders</Button>
                }
              <IconButton aria-label="access shopping cart" color="inherit" component={Link} to="/carts/myCart">
                <Badge overlap="rectangular" badgeContent={items?.length || 0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
      </header>
  )
}

export default Header;