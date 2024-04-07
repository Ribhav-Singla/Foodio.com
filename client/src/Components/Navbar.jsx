import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/Navbar/NavbarSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.Navbar.user);
  console.log(user);

  // handling logout button
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("/api/logout").then((res) => {
        if (res.data === "success") {
          dispatch(setUser(""))
          toast.info("you logged out");
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand text-danger" href="/">
          Foodio.com
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">
              Home
            </a>
            <a className="nav-item nav-link" href="/menu">
              Menu
            </a>
            <a className="nav-item nav-link" href="/aboutUs">
              About us
            </a>
            <a className="nav-item nav-link" href="/orderOnline">
              Order online
            </a>
            <a className="nav-item nav-link" href="/reservation">
              Reservation
            </a>
            <a className="nav-item nav-link" href="/contactUs">
              Contact us
            </a>
          </div>
          <div className="navbar-nav ms-auto">
            {user ? (
              <a
                className="nav-item nav-link"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </a>
            ) : (
              <>
                <a className="nav-item nav-link" href="/signUp">
                  Sign up
                </a>
                <a className="nav-item nav-link" href="/login">
                  Login
                </a>
              </>
            )}
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </nav>
    </>
  );
}
