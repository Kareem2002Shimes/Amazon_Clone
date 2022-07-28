import React, { useContext } from "react";
import StarIcon from "@mui/icons-material/Star";
import { GlobalContext } from "./context/GlobalState";
import "./CheckoutProduct.css";

const CheckoutProduct = ({ id, image, title, price, rating, hiddenButton }) => {
  const { basket, dispatch } = useContext(GlobalContext);
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct-image" src={image} />
      <div className="checkoutProduct-info">
        <p className="checkoutProduct-title">{title}</p>
        <p className="checkoutProduct-price"></p>
        <small>$</small>
        <strong>{price}</strong>
        <div className="checkoutProduct-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>
                <StarIcon />
              </p>
            ))}
        </div>
        {!hiddenButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
