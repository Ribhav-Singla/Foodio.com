import { RxCross2 } from "react-icons/rx";
import ReservationDetail from "./ReservationDetail";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ReservationForm() {
  // extracting the info detials related to reservation like date , time , partySize
  const [details, setDetails] = useState(JSON.parse(window.localStorage.getItem('reservationDetails')) || []);

  // handling the exit button of reservationForm component
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/reservation");
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
        className="pt-1 pb-5 col-sm-8 offset-sm-2"
        style={{ position: "relative" }}
      >
        <RxCross2
          style={{ position: "absolute", left: "97%", cursor: "pointer" }}
          size={25}
          onClick={handleExit}
        />
        <div className="mt-4">
          <h2 className="fw-bold text-center" style={{ fontSize: "2rem" }}>
            Reservation
          </h2>
          <div
            className="text-center p-1 rounded"
            style={{ backgroundColor: "lightblue", fontSize: "1.2rem" }}
          >
            <p>
              Due to limited availability, we can hold the table for you for{" "}
              <span className="fw-bold">5:00 minutes</span>
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-4">
          <div className="col-8 col-sm-9 col-md-5  mt-3">
            <h5 className="fw-bold mb-3">Data order</h5>
            <form method="POST" action={`${import.meta.env.VITE_BACKEND_URL}/api/reservation`} className="needs-validation" noValidate>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="form-control"
                required
              />
              <br />
              <input
                type="number"
                name="phonenumber"
                placeholder="Phone number"
                className="form-control"
                required
              />
              <br />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="form-control"
                required
              />
              <br />
              <input type="date" name="date" value={details.date} className="d-none" readOnly={true}/>
              <input type="time" name="time" value={details.time} className="d-none" readOnly={true}/>
              <input type="number" name="partySize" value={details.partySize} className="d-none"readOnly={true} />
              <button
                className="btn btn-danger"
                type="submit"
                style={{ width: "100%" }}
              >
                Confirm reservation
              </button>
            </form>
          </div>
          <ReservationDetail/>
        </div>
      </div>
    </>
  );
}
