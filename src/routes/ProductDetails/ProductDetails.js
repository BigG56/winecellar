import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import './ProductDetails.css';

import Incrementer from '../../components/Incrementer/Incrementer';

import { addItem } from '../../store/cart/Cart.actions';
import { loadProduct } from '../../store/products/Products.actions';

import '../Login/Login';

function ProductDetails() {

  const { productId } = useParams();

  const [ quantity, setQuantity ] = useState(1);

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const product = products[productId];
  const {isSignedIn} = useSelector(state => state.auth);
  const { user } = useSelector(state => state.user)
  const { cart } = useSelector(state => state.cart);
  const cartId = cart.id;
  
 
  

  useEffect(() => {
    if (!products[productId]) {
      (async function load() {
        await dispatch(loadProduct(productId))
      })();
    }
  }, [dispatch, products, productId]);

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }

  const Item = {
    cartId: cartId,
    product: product,
    qty: quantity
  }

  async function handleAddToCart() {
    await dispatch(addItem(Item));
  }

  return (
    <section style={{color: "yellow"}}className="product-details-container">
      <div className="product-info-container">
        { product &&
          <>
            <img id="prod_img" src={product?.img} alt="product pic"/>
            <div className="prod_details">
              <Typography className="prod_name" variant="h3">{product?.name}</Typography>
              <Typography className="prod_description" variant="h6">{product?.description}</Typography>
              <Typography className="prod_price" variant="h3"><b>{product?.price}</b></Typography>
              { isSignedIn &&
                <div className="cartButtons">
                  <Incrementer
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                    value={quantity}
                   />
                  <Button id="add_cart" type="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
                </div>
              }
              { isSignedIn &&      
               <Button id="back" type="contained" color="primary" component={Link} to={`/users/${user.id}/products`}>back</Button>
              }
              { !isSignedIn &&
                <Button id="back" type="contained" color="primary" component={Link} to={`/products`}>back</Button>
              }
            </div>
          </>
        }
      </div>
    </section>
  );
}

export default ProductDetails;