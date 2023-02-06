import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { Link, useParams, } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import { checkLoginStatus } from '../../store/auth/Auth.actions';



function Home() {
  const { isSignedIn } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user); 
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    if (isSignedIn) {
      async function isLoggedIn() {
        await dispatch(checkLoginStatus(userId));
      }
      isLoggedIn();
    }
  }, [isSignedIn, userId, dispatch]);


  /*useEffect(() => {
    if (user[userId] || isSignedIn) {
      (async function load() {
        await dispatch(loadCart(userId))
      })();
    }
  }, [dispatch, isSignedIn, user, userId]);*/
  return (
    <>
      { isSignedIn &&
      <div className="home-container">
        <h1 style={{fontWeight: 200}} className="title">Welcome back <span className="username">{user.username}</span></h1> 
          <p className="home-info"> Here at The WineCellar we sell a mixture of red, white and rose wines, all for reasonable cheap prices!</p> 
          <p className="home-info2">Click here to see are range of wines!</p>
          <Button 
            id="view" 
            variant="outlined"
            color="primary"
            component={Link}
            to={`/users/${user.id}/products`}>Products</Button>
      </div>
      }
      { !isSignedIn &&
        <div className="home-container">
          <h1 style={{fontWeight: 200}} className="title">Welcome To The WineCellar</h1>
            <p className="home-info"> Here at The WineCellar we sell a mixture of red, white and rose wines, all for reasonable cheap prices!</p>
            <p className="home-info2">Click here to see are range of wines!</p>
            <Button 
              id="view" 
              variant="outlined"
              color="primary"
              component={Link}
              to={`/products/`}>Products</Button>
        </div>
      }
    </>
  );
}
export default Home;