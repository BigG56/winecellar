import React from 'react';

import './OrderItemCard.css';

const OrderItemCard = (props) => {
    const { qty, price, product_id, name, description, img} = props;
    const convertPrice = Number(price.replace(/[^0-9.-]+/g,""));
    const total = convertPrice * qty;

    return (
      <div className="order-item-card">
        <img className="orderItemImg" src={img} alt='product'/>
        <div className='itemDescription'>
          <div className="itemName">
            <p><b>{name}</b></p>
          </div>
          <p>{description}</p>
          <p><b>Total</b>: £{total}</p>
          <p><b>Qty</b>: {qty}</p>
          <p><b>Product Id</b>: {product_id}</p>
        </div>
      </div>
    )
}

export default OrderItemCard;