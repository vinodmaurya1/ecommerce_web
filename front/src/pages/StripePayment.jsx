import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/stripe-payment/CheckoutForm";
import "../components/stripe-payment/stripe.css";
import { api_url } from "../redux/config";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


const stripePromise = loadStripe("pk_test_51OtOKVSIntRVZuwIxQh7X6bYzL6siMo48YGAaJrXg8dseOvdOtxHBgwQPmFmxqvp3RFJQiZmhoxaKiUgMYQYF2IS001SFw1335");

const StripePayment = () => {
  const { user, cart } = useSelector((state) => state.user);
  const [clientSecret, setClientSecret] = useState("");
  const location = useLocation();
  const {totalAmount,userId, userName, userEmail, orderId}= location.state;
console.log(totalAmount,userId, userName, userEmail, orderId , "stp")
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${api_url}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ totalAmount : 100 ,userId: "89y423234234" , userName:"sutajj" , userEmail:"suk@gmail.com" , orderId:"4893767569kjnfdjhu8754dfkn5487"}),
      body: JSON.stringify({totalAmount,userId, userName, userEmail, orderId}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm  />
        </Elements>
      )}
    </div>
  );
}


export default StripePayment