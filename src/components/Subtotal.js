import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../context/AppReducer";
import { useAuth } from "../context/GlobalState";
import "./Subtotal.css";
import { useNavigate } from "react-router-dom";
const Subtotal = () => {
  const { basket } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={() => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
