import React, { useEffect, useState } from "react";
import axios from 'axios';
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from "../features/Navbar/NavbarSlice";

export default function SignUp() {
  const dispatch = useDispatch()

  // handling formdata 
  const [formData,setFormData] = useState({
    username : "",
    email : "",
    password : "",
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

  // handling formSubmit button

  const navigate = useNavigate();

  const handleFormSubmit = async(event)=>{
    event.preventDefault();
    try{
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`,formData,{withCredentials:true})
        .then((res)=>{
          if(res.data === 'success'){
            dispatch(setUser(formData.username))
            toast.success('user registerd successfully');
            setFormData({
              username : "",
              email : "",
              password : "",
            })
            const form = document.querySelector(".needs-validation");
            form.classList.remove("was-validated");
            navigate('/');
          }
          else{
            toast.error(res.data.message);
          }
        })
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className="row text-center mt-4">
        <h1 className="fw-bold">Sign up</h1>
      </div>

      <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 mb-5 mt-4">
        <div
          className="col-5"
          style={{
            height: "53vh",
            width: "58vh",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
            <img src="/signUp.png" alt="" style={{width:"100%",height:"100%",borderRadius:"50%"}} />
        </div>
        <form onSubmit={handleFormSubmit} className="needs-validation col-sm-6 col-md-4" noValidate>
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
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
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
      </div>
    </>
  );
}
