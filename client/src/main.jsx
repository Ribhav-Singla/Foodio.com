import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import Home from "./Pages/Home.jsx";
import Reservation from "./Pages/Reservation.jsx";
import OrderOnline from "./Pages/OrderOnline.jsx";
import Menu from "./Pages/Menu.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import ReviewForm from "./Components/ReviewForm.jsx";
import Checkout from "./Components/Checkout.jsx";
import ReservationForm from "./Components/ReservationForm.jsx";
import ReservationBookingConfirmation from "./Components/ReservationBookingConfirmation.jsx";
import ReservationBookingCancel from "./Components/ReservationBookingCancel.jsx";
import OrderSuccess from "./Pages/OrderSuccess.jsx";
import ReservationModify from "./Pages/ReservationModify.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Toaster />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviewForm" element={<ReviewForm />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/orderOnline" element={<OrderOnline />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderSuccess/:id" element={<OrderSuccess />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservationForm" element={<ReservationForm />} />
          <Route
            path="/reservation/confirmation/:id"
            element={<ReservationBookingConfirmation />}
          />
          <Route
            path="/reservation/confirmation/:id/reservationModify"
            element={<ReservationModify />}
          />
          <Route
            path="/reservation/cancel/:id"
            element={<ReservationBookingCancel />}
          />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
