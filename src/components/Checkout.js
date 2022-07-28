import React, { useContext } from "react";
import CheckoutImg from "../images/checkoutAd.jpg";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { GlobalContext } from "./context/GlobalState";
import "./Checkout.css";

const Checkout = () => {
  const { basket, user, dispatch } = useContext(GlobalContext);
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="checkout-ad" src={CheckoutImg} alt="checkout-ad" />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout-title">Your shopping Basket</h2>
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
      <div className="checkout-right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
