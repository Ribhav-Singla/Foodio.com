import OrderItem from "./OrderItem";
import { IoStarSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pizza from "../Data/Pizza.js";
import Drink from "../Data/Drink.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderList({
  orderData,
  setOrderData,
  total,
  setTotal,
}) {
  //   handling delete item
  const handleDeleteItem = (id, itemType) => {
    setOrderData((prevOrderData) => {
      return prevOrderData.filter((item) => item.id !== id);
    });
  };

  //   handling increment quantity
  const handleIncrementQuantity = (id, itemType) => {
    setOrderData((prevOrderData) => {
      return prevOrderData.map((item) => {
        if (item.type === itemType && item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
    });
  };

  //   handling decrement quantity
  const handleDecrementQuantity = (id, itemType) => {
    setOrderData((prevOrderData) => {
      return prevOrderData.map((item) => {
        if (item.type === itemType && item.id === id) {
          const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      });
    });
  };

  // handling orderItems to be rendered
  const orderElements = orderData.map((item) => {
    let data = item.type === "pizza" ? Pizza : Drink;
    return data
      .map((obj, idx) => {
        if (obj.id === item.id) {
          return (
            <OrderItem
              key={idx}
              id={item.id}
              itemType={item.type}
              itemName={obj.itemName}
              itemPrice={obj.itemPrice}
              quantity={item.quantity}
              handleDeleteItem={handleDeleteItem}
              handleIncrementQuantity={handleIncrementQuantity}
              handleDecrementQuantity={handleDecrementQuantity}
            />
          );
        } else {
          return null;
        }
      })
      .filter((element) => element !== null);
  });

  // handling subtotal , tax fee , total amount
  const [tax, setTax] = useState(3);

  let taxFee = orderData.length > 0 ? tax : 0;

  useEffect(() => {
    let sum = 0;
    orderData.forEach((element) => {
      sum += element.quantity * element.itemPrice;
    });
    setTotal(sum);
  }, [orderData]);

  // handling empty cart and clicking on checkout button
  const navigate = useNavigate();
  const handleCheckout = async () => {
    if (orderData.length == 0) {
      toast.error("your cart is empty");
    } else {
      try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`,{withCredentials:true}).then((res) => {
          if (res.data === "login") {
            toast.error("you must be logged in!");
            navigate("/login");
          }
          else{
            navigate("/checkout");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div
        className="border col-sm-4 col-md-4 col-lg-3 mt-4 mb-5"
        style={{
          borderRadius: "6px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <h4 className="text-center fw-bold mt-3">Order List</h4>
        <hr />
        <div className="" style={{ maxHeight: "500px", overflow: "auto" }}>
          {orderData.length == 0 ? (
            <p className="text-center" style={{ fontSize: "1.5rem" }}>
              Empty!
            </p>
          ) : (
            orderElements
          )}
        </div>
        <hr />
        <div>
          <div className="d-flex p-2 ps-3 pe-3 justify-content-between align-items-center">
            <h5 className="fw-bold">Subtotal</h5>
            <h4 className="fw-bold">
              <span className="fs-6">₹</span>
              {total}
            </h4>
          </div>
          <div className="d-flex p-2 ps-3 pe-3 justify-content-between align-items-center">
            <div style={{ position: "relative" }}>
              <h5 className="fw-bold">Tax fee</h5>
              <IoStarSharp
                size={10}
                style={{
                  color: "red",
                  position: "absolute",
                  left: "100%",
                  top: "0%",
                }}
              />
            </div>
            <h4 className="fw-bold">
              <span className="fs-6">₹</span>
              {taxFee}
            </h4>
          </div>
          <div className="d-flex p-2 ps-3 pe-3 justify-content-between align-items-center">
            <h5 className="fw-bold">Total</h5>
            <h4 className="fw-bold">
              <span className="fs-6">₹</span>
              {total + taxFee}
            </h4>
          </div>
          <div className="ps-2 pe-2">
            <button
              className="btn btn-danger mb-2"
              style={{ width: "100%" }}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
