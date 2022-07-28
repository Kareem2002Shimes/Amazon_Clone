import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { GlobalContext } from "./context/GlobalState";
import Order from "./Order";
import "./Orders.css";
const Orders = () => {
  const { user, basket, dispatch } = useContext(GlobalContext);

  const [orders, setOrders] = useState([]);
  if (user) {
    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) =>
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  } else {
    setOrders([]);
  }
  useEffect(() => {}, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders-order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};
export default Orders;
