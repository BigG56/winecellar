import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOrderItems } from '../../store/orderItems/OrderItem.actions'
import OrderItemCard  from '../../components/OrderItemCard/OrderItemCard';

function OrderDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const orderItems = useSelector(state => state.orderItems);

  useEffect(() => {
    async function load() {
      await dispatch(loadOrderItems(orderId));
    }
    load();
  }, [orderId, dispatch]);

  return (
    <>
      <div style={{display: 'flex', backgroundColor: 'purple', border: "2px solid gold", marginTop: "10px"}}>
        <p style={{fontSize: 40, color: 'gold'}}>OrderDetails</p>
      </div>
      {
        Object.keys(orderItems).map((key) => {
          const orderItem = orderItems[key];
          return <OrderItemCard {...orderItem} key={key} />
        })
      }
    </>
  );
}

export default OrderDetails;
