import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Item from "../Components/Item";
import Pizza from "../Data/Pizza.js";
import Drink from "../Data/Drink.js";
import OrderList from "../Components/OrderList.jsx";

export default function OrderOnline() {
  // handling orderData for the orderList to render
  const [orderData, setOrderData] = useState(JSON.parse(window.localStorage.getItem('orderData')) || []);

  const addItem = (type, id,itemPrice) => {
    setOrderData((prevOrderData) => {
      return [...prevOrderData, { type, id, quantity: 1 ,itemPrice}];
    });
    toast.success('added to cart')
  };

  // handling orderData total amount
  const [total, setTotal] = useState(0);

  // uploading total amount to localStorage
  useEffect(()=>{
    window.localStorage.setItem('amount',total)
  },[total])

  // handling the data to localStorage for persistence state btw the re-render of page refresh

  useEffect(()=>{
    window.localStorage.setItem('orderData',JSON.stringify(orderData));
  },[orderData])

  // handling menu data
  const [pizzaData, setPizzaData] = useState(Pizza);
  const [drinkData, setDrinkData] = useState(Drink);

  const pizzaElements = pizzaData.map((obj, idx) => {
    return <Item key={idx} type={"pizza"} {...obj} addItem={addItem} />;
  });

  const drinkElements = drinkData.map((obj, idx) => {
    return <Item key={idx} type={"drink"} {...obj} addItem={addItem} />;
  });

  // handling menu switches
  const [pizzaMenu, setPizzaMenu] = useState(true);
  const [drinkMenu, setDrinkMenu] = useState(false);

  const handlePizzaMenu = () => {
    if (drinkMenu) {
      setDrinkMenu((prev) => !prev);
      setPizzaMenu((prev) => !prev);
      pizzabtn.classList.remove("btn-outline-danger");
      pizzabtn.classList.add("btn-danger");
      drinkbtn.classList.remove("btn-danger");
      drinkbtn.classList.add("btn-outline-danger");
    }
  };

  const handleDrinkMenu = () => {
    if (pizzaMenu) {
      setPizzaMenu((prev) => !prev);
      setDrinkMenu((prev) => !prev);
      pizzabtn.classList.remove("btn-danger");
      pizzabtn.classList.add("btn-outline-danger");
      drinkbtn.classList.remove("btn-outline-danger");
      drinkbtn.classList.add("btn-danger");
    }
  };

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="fw-bold mb-3">Menu</h1>
        <button
          className="btn btn-danger col-3 col-sm-2 col-md-2 no-outline"
          id="pizzabtn"
          onClick={handlePizzaMenu}
        >
          Pizza
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className="btn btn-outline-danger col-3 col-sm-2 col-md-2 no-outline"
          id="drinkbtn"
          onClick={handleDrinkMenu}
          style={{ outline: "none" }}
        >
          Drink
        </button>
      </div>

      <div className="d-flex justify-content-center align-items-start">
        <div className="col-xs-4 col-sm-6 col-md-8 mt-4 mb-5 d-flex flex-wrap gap-4 justify-content-center">
          {pizzaMenu && pizzaElements}
          {drinkMenu && drinkElements}
        </div>
        <OrderList orderData={orderData} setOrderData={setOrderData} total={total} setTotal={setTotal} />
      </div>
    </>
  );
}
