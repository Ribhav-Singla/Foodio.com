import React, { useEffect, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../features/Navbar/NavbarSlice";

export default function Login() {
  const dispatch = useDispatch()

  // handling formData
  const [formData,setFormData] = useState({
    username : "",
    password : ""
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      });
    });
  }, []);


  const navigate = useNavigate();

  const handleSubmit = async(event)=>{
    event.preventDefault();
    try {
      await axios.post('/api/login',formData)
        .then((res)=>{
          if(res.data === 'success'){
            dispatch(setUser(formData.username))
            toast.success('logged in successfully');
            navigate('/');
          }
          else{
            toast.error('invalid credentials');
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="row text-center mt-4">
        <h1 className="fw-bold">Login</h1>
      </div>

      <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 mb-5 mt-4">
        <form onSubmit={handleSubmit} className="needs-validation col-sm-6 col-md-4" noValidate>
        <p className="fs-5"><span className="fw-bold">#</span>Welcome to our digital table. <span className="fw-bold">Taste</span>, <span className="fw-bold">Click</span>, <span className="fw-bold">Delight</span>.</p>
          <div className="">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className="form-control p-2"
              required
            />
          </div>
          <br />
          <div className="">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="form-control p-2"
              required
            />
          </div>
          <br />
          <button className="btn btn-danger p-2" type="submit">
            Submit
          </button>
        </form>
        <div
          className="col-5"
          style={{
            height: "45vh",
            width: "50vh",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
            <img src="/login.png" alt="" style={{width:"100%",height:"100%",borderRadius:"50%"}} />
        </div>
      </div>
    </>
  );
}
