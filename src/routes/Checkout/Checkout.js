import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';

const stripe = loadStripe("pk_test_1b7TDT5I1aLlj6UAhEejbqrh");

function Checkout() {
  return (
    <Elements stripe={stripe}>
      <div style={{display: 'flex', backgroundColor: 'purple', border:"2px solid gold", marginTop:"30px"}}>
        <CheckoutForm />
      </div>
    </Elements>
  );
}

export default Checkout;