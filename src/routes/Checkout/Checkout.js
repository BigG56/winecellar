import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const stripe = loadStripe("pk_test_51MZFyMBaO0IQxageqOhBVLcE7naePrr14xXuBtIq0T5gtqiP3c72i4fVSTSpGntZT3hCEyEPGBvC5k3PPpQj3UVx004yTOpAiw");

function Checkout() {
  
  const { paymentMade } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);
  return (
    <>
    <Elements stripe={stripe}>
      <div style={{display: 'flex', backgroundColor: 'purple', border:"2px solid gold", marginTop:"30px"}}>
        <CheckoutForm />
      </div>
    </Elements>
    { paymentMade &&
      <Navigate to={`/users/${user.id}/orders`}/>
    }
    </>
  );
}

export default Checkout;