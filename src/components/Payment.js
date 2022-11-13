import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { useAuth } from "./context/GlobalState";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./context/AppReducer";
import axios from "./axios";
import { db } from "../firebase";
import "./Payment.css";
import { doc, setDoc } from "firebase/firestore";

const Payment = () => {
  const { user, basket, dispatch } = useAuth();

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    // generate the special stripe secret which allows us to cherge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);
  // console.log("ClientSecret", clientSecret);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // do all the fancy stripe stuff
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(error ? error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* payment section => delivery address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>Alexandria, Egypt</p>
          </div>
        </div>
        {/* payment section => Review Items */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {/* Products from basket */}
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* payment section => Payment method */}
        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-details">
            {/* Stripe */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error} </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
