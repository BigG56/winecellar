import './header.css';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

const Header = () => {
  

  return (
      <header>
          <div className="header-bar">
              <p className="title">The Wine Celar</p>
              <div className="button-container">
                { 
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                }
                {
                  <Button color="inherit" component={Link} to="/orders">My Orders</Button>
                }
              <IconButton aria-label="access shopping cart" color="inherit" component={Link} to="/cart">
                <Badge>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
      </header>
  )
}

export default Header;