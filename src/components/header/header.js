import './header.css';
import React from'react';
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


  const { isSignedIn } = useSelector(state => state.auth);
  const { cart } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);
  return (
      <header className="head">
          <div className="header-bar">
              <p className="title">The WineCellar</p>
              <div className="button-container">
                { !isSignedIn &&
                  <Button color="inherit" component={Link} to="/"><b>Home</b></Button>
                }
                { isSignedIn &&
                  <Button color="inherit" component={Link} to={`/users/${user.id}`}><b>Home</b></Button>
                }
                { !isSignedIn &&
                  <Button color="inherit" component={Link} to="/auth/login"><b>Login</b></Button>
                }
                { isSignedIn &&
                  <Button  onClick={handleLogout} color="inherit"><b>Logout</b></Button>
                }
                { isSignedIn &&
                  <Button color="inherit" component={Link} to={`/users/${user.id}/orders`}><b>Orders</b></Button>
                }
                { isSignedIn &&
                  <Button color="inherit" component={Link} to={`/users/${user.id}/account`}><b>Account</b></Button>
                }
              <IconButton aria-label="access shopping cart" color="inherit" component={Link} to={`users/${user.id}/carts/${cart.id}`}>
                <Badge overlap="rectangular" badgeContent={cart.items?.length || 0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
      </header>
  )
}

export default Header;