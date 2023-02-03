import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import './ProductCard.css';
import { useSelector } from 'react-redux';

function ProductCard(props) {
  const { isSignedIn } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user);

  const { data } = props;

  return (
    <div className="grid-item">
      <div className="product-card-info-container">
        <div className="product-card-info">
          <img id="prod_img" src={data.img} alt="product pic"/>
          <p>{data.name}</p>
          <p>{data.price}</p>
          <p>{data.type}</p>
        </div>
        { !isSignedIn &&
          <Button
          id="view" 
          variant="outlined"
          color="primary"
          component={Link}
          to={`/products/${data.id}/${data.type}/`}
        >View</Button>
        }
        { isSignedIn &&
          <Button
          id="view" 
          variant="outlined"
          color="primary"
          component={Link}
          to={`/users/${user.id}/products/${data.id}/${data.type}/`}
        >View</Button>
        }
      </div>
    </div>
  );
}

export default ProductCard;