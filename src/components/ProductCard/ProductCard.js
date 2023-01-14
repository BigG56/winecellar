import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import './ProductCard.css';

function ProductCard(props) {

  const { data } = props;

  return (
    <div className="grid-item">
      <div id="prod_container" className="product-card-info-container">
        <div className="product-card-info">
          <img id="prod_img" src={data.img} alt="product pic"/>
          <p>{data.name}</p>
          <p>{data.price}</p>
          <p>{data.type}</p>
        </div>
        <Button
          id="view" 
          variant="outlined"
          color="primary"
          component={Link}
          to={`/products/${data.id}/${data.type}/`}
        >View</Button>
      </div>
    </div>
  );
}

export default ProductCard;