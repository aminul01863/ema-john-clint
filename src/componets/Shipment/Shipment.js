import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null)
  const onSubmit = data => {
    setShippingData(data)
  }

  const handelPaymentSuccess = paymentId => {
    const saveCart = getDatabaseCart();
    const orderDetails = { ...loggedInUser, products: saveCart, paymentId, Shipment: shippingData, orderTime: new Date() }

    fetch('https://vast-brushlands-34070.herokuapp.com/addOrders', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Your Order Successfully.....')
        }
      })
  }

  console.log(watch("example"));
  return (
    <div className="row">
      <div style={{ display: shippingData ? 'none' : 'block' }} className="col-md-6">
        <form className="shipment-form" onSubmit={handleSubmit(onSubmit)}>

          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name..." />
          {errors.name && <span className="error">Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email.." />
          {errors.email && <span className="error">Email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Your address..." />
          {errors.name && <span className="error">Address is required</span>}

          <input name="phone" ref={register({ required: true })} placeholder="Your phone..." />
          {errors.phone && <span className="error">Phone is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{ display: shippingData ? 'block' : 'none' }} className="col-md-6">
        <h2>Please Pay For Me</h2>
        <ProcessPayment handelPayment={handelPaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;