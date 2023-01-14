import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './Home.css';


function Home() {
    return (
        <div className="home-container">
          <h1 className="title">Welcome To The WineCellar</h1>
            <p className="home-info"> Here at The WineCellar we sell a mixture of red, white and rose wines, all for reasonable cheap prices!</p>
            <p className="home-info2">Click here to see are range of wines!</p>
            <Button 
            id="view" 
            variant="outlined"
            color="primary"
            component={Link}
            to={`/products/`}>Products</Button>
        </div>
      );
}
export default Home;