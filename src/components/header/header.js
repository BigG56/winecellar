import './header.css';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const { isAuthenticated } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  return (
      <header className="head">
          <div className="header-bar">
              <p><a className="title" href='http://localhost:3008/home'>The WineCellar</a></p>
              <div className="button-container">
                { !isAuthenticated &&
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                }
                { isAuthenticated &&
                  <Button color="inherit" component={Link} to="/logout">Logout</Button>
                }
                { isAuthenticated &&
                  <Button color="inherit" component={Link} to="/orders">Orders</Button>
                }
              <IconButton aria-label="access shopping cart" color="inherit" component={Link} to="/cart">
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