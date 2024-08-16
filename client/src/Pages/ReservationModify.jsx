import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function ReservationModify() {
  let { id } = useParams();
  const data = useLocation().state;

  // extracting the info detials related to reservation like date , time , partySize
  const [details, setDetails] = useState(
    JSON.parse(window.localStorage.getItem("reservationDetails")) || []
  );
  console.log(details);

  // handling input changes in the reservation details that is on LocalStorage
  const handleInputChange = (event) => {
    let { name, value } = event.target;
  
    if (name === "time") {
      // Splitting the time value to get hours and minutes
      const [hours, minutes] = value.split(":").map((part) => parseInt(part));
  
      // Checking if the entered time is within the allowed range (11am - 11pm)
      if ((hours < 11 || hours > 23) || (hours === 11 && minutes < 0) || (hours === 23 && minutes > 0)) {
        // If the time is not within the allowed range, reset the value to empty string
        value = ""; // You can set it to an empty string or handle the error differently
      }
    }
  
    setDetails({
      ...details,
      [name]: value,
    });
  };
  

  useEffect(() => {
    window.localStorage.setItem("reservationDetails", JSON.stringify(details));
  }, [details]);

  // handling exit button
  const navigate = useNavigate();
  const handleExit = () => {
    navigate(`/reservation/confirmation/${id}`);
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

  return (
    <>
      <div
        className="col-xs-5 col-sm-7 offset-sm-2 col-md-5 offset-md-3 mb-4 mt-3"
        style={{ position: "relative" }}
      >
        <RxCross2
          style={{ position: "absolute", left: "97%", cursor: "pointer" }}
          size={25}
          onClick={handleExit}
        />
        <h1 className="fw-bold mb-3 text-center">
          Modify <span className="text-danger">Reservation</span>
        </h1>
        <div>
          <form
            method="POST"
            action={`${import.meta.env.VITE_BACKEND_URL}/api/reservation/Edited/${id}`}
            className="needs-validation"
            noValidate
          >
            <div>
              <label htmlFor="orderData mb-2">Order data</label>
              <div className="d-flex gap-3 mt-2">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={data.username}
                  className="form-control"
                  readOnly={true}
                  required
                />
                <input
                  type="number"
                  name="phonenumber"
                  value={data.phonenumber}
                  placeholder="Phone number"
                  className="form-control"
                  readOnly={true}
                  required
                />
              </div>
            </div>
            <br />
            <div className="">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={data.email}
                placeholder="Email"
                className="form-control  mt-2"
                readOnly={true}
                required
              />
            </div>
            <br />
            <div className="">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={details.date}
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
                value={details.time}
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
                value={details.partySize}
                onChange={handleInputChange}
                placeholder="Party size"
                className="form-control p-2"
                required
              />
            </div>
            <br />
            <button className="btn btn-danger" style={{ width: "100%" }}>
              Order now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
