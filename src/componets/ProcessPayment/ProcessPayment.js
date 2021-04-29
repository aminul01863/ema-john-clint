import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardFrom from './SimpleCardFrom';
import SplitCardFrom from './SplitCardFrom';

const stripePromise = loadStripe('pk_test_51Ie2XRL3bolLKNsxgdsFPL8Bf791NAD3lcjP6NwoTDbbpcDLSWUvglYt9EqoQX3b7vmHplAJyP4zzVxtqwURzM0f00vzhSfl7m');

const ProcessPayment = ({ handelPayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardFrom handelPayment={handelPayment}></SimpleCardFrom>
        </Elements>
    );
};

export default ProcessPayment;