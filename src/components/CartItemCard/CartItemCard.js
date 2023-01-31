import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';

import Incrementer from '../Incrementer/Incrementer';

import { removeItem } from '../../store/cart/Cart.actions';

import './CartItemCard.css';

function CartItemCard(props) {
    
  const { cartItemId, price, qty, name} = props;
  const [ quantity, setQuantity ] = useState(qty);

  const dispatch = useDispatch();

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  }

  async function remove() {
    await dispatch(removeItem(cartItemId));
  }

  return (
    <>
      <div className="cart-item-container">
        <div className="cart-item-details">
          <img  alt="" style={{height: '100%', paddingRight: '10px'}} />
          <p>{name}</p>
          <p>{price}</p>
        </div>
        <div className=".cart-item-interact">
          <Incrementer
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            value={quantity}
          />
          <Typography onClick={remove}>Remove</Typography>
        </div>
        <div className=".cart-item-price">
          <p>{`£${price * qty}`}</p>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default CartItemCard;