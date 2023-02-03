import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import {loadCart} from '../../store/cart/Cart.actions'


function Home() {
  const { isSignedIn } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn) {
      (async function load() {
        await dispatch(loadCart());
      })();
    }
  }, [dispatch]);

    return (
      <div className="home-container">
        { !isSignedIn &&
          <h1 style={{fontWeight: 200}} className="title">Welcome To The WineCellar</h1>
        }
        { isSignedIn &&
          <h1 style={{fontWeight: 200}} className="title">Welcome back {user.username}</h1>
        }
          <p className="home-info"> Here at The WineCellar we sell a mixture of red, white and rose wines, all for reasonable cheap prices!</p>
          <p className="home-info2">Click here to see are range of wines!</p>
          { !isSignedIn &&
            <Button 
            id="view" 
            variant="outlined"
            color="primary"
            component={Link}
            to={`/products/`}>Products</Button>
          }
          { isSignedIn &&
            <Button 
            id="view" 
            variant="outlined"
            color="primary"
            component={Link}
            to={`/users/${user.id}/products`}>Products</Button>
          }
      </div>
    );
}
export default Home;