import React, { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-toastify'

export default function Reservation() {

  
  const [formData , setFormData] = useState({
    date : "",
    time : "",
    partySize : ""
  })
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "time") {
      // Parse the time value to get hours and minutes
      const [hours, minutes] = value.split(":").map((part) => parseInt(part));
  
      // Check if the time is within the allowed range (11am - 11pm)
      if (hours < 11 || (hours === 23 && minutes !== 0) || hours > 23) {
        // Invalid time, set to empty string or display an error
        setFormData({
          ...formData,
          [name]: "" // You can set it to an empty string or handle the error differently
        });
        return;
      }
    }
  
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  
  // handling form submit to pass on to reservation form component
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user`,{withCredentials:true});
      if (res.data === "login") {
        toast.error("You must be logged in!");
        navigate("/login");
      } else {
        navigate("/reservationForm");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  // handling reservation data to local storage for persistence in differnt components
  useEffect(()=>{
    window.localStorage.setItem('reservationDetails',JSON.stringify(formData));
  },[formData])

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

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-wrap gap-5 mb-5 mt-5">
        <div
          className="col-5"
          style={{
            height: "54vh",
            width: "57vh",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <img
            src="/reservationTable.jpeg"
            style={{ height: "100%", width: "100%", borderRadius: "20px" }}
          />
        </div>
        <form onSubmit={handleSubmit} className="needs-validation col-sm-6 col-md-4" noValidate>
          <h2
            className="fw-bold mb-3"
            style={{ letterSpacing: "0.1rem", fontSize: "2.5rem" }}
          >
            Book a table
          </h2>
          <div className="">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="form-control p-2"
              required
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="time" className="form-label">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="form-control p-2"
              required
            />
            <div className="invalid-feedback">
              Restaurant timings 11am - 11pm
            </div>
          </div>
          <br />
          <div className="">
            <label htmlFor="Partysize" className="form-label">
              Party size
            </label>
            <input
              type="number"
              name="partySize"
              value={formData.partySize}
              onChange={handleInputChange}
              min={1}
              max={8}
              placeholder="Party size"
              className="form-control p-2"
              required
            />
            <div className="invalid-feedback">
              Maximum 8
            </div>
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
