import React, { useEffect,useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'

export default function ContactUs() {

  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };

  // handling rating
  const [rating, setRating] = useState(0)

  const handleRating = (rate) => {
    setRating(rate)
  }

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
      <div className="row text-center mt-5" style={{position:"relative"}}>
        <RxCross2 style={{position:"absolute",left:"17%",cursor:"pointer"}} size={25} onClick={handleExit}/>
        <h1 className="fw-bold">Review</h1>
        <p>
          We love hearing from our customers. Feel free to share your experience.
        </p>
      </div>


      <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 mb-5">
        <form method="POST" action={`${import.meta.env.VITE_BACKEND_URL}/api/review`} className="needs-validation col-sm-6 col-md-4" noValidate>
          <div className="">
            <input
              type="text"
              name="review[username]"
              placeholder="Username"
              className="form-control p-2"
              required
            />
          </div>
          <br />
          <div className="">
            <label htmlFor="rating" className="form-label fs-5">Rating</label> <br />
            <Rating onClick={handleRating}/>
            <input
              type="number"
              name="review[rating]"
              placeholder="Rating"
              min={1}
              max={5}
              className="form-control p-2 d-none"
              value={rating}
              readOnly
              required
            />
          </div>
          <br />
          <div className="">
            <textarea
              name="review[message]"
              placeholder="Message"
              className="form-control p-2"
              rows={4}
              required
            ></textarea>
            <div className="invalid-feedback">Please provide your review.</div>
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
