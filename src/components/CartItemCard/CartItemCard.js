import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';

import Incrementer from '../Incrementer/Incrementer';

import { removeItem } from '../../store/cart/Cart.actions';

import './CartItemCard.css';

function CartItemCard(props) {
    
  const { cartitemid, price, qty, name, img} = props;
  const [ quantity, setQuantity ] = useState(qty);
  const convertPrice = Number(price.replace(/[^0-9.-]+/g,""));
  const total = convertPrice * qty;

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
    await dispatch(removeItem(cartitemid));
  }

  return (
    <>
      <div className="cart-item-container">
        <div className="cart-item-details">
          <p>{name}</p>
          <img alt="product" className="prodImg"src={img} />
        </div>
        <div className=".cart-item-increment">
          <Incrementer
            id="qty"
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            value={quantity}
          />
          <Typography onClick={remove}>Remove</Typography>
        </div>
        <div className=".cart-item-price">
          <p id="total">{`£${total}`}</p>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default CartItemCard;