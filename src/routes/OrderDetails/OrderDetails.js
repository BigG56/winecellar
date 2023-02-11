import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadOrderItems } from '../../store/orders/Orders.actions'

function OrderDetails() {
  const orderId = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      await dispatch(loadOrderItems(orderId));
    }
    load();
  }, [orderId, dispatch]);


  return (
    <div style={{display: 'flex', backgroundColor: 'purple', border: "2px solid gold", marginTop: "10px"}}>
      <p style={{fontSize: 40, color: 'gold'}}>OrderDetails</p>
    </div>
  );
}

export default OrderDetails;