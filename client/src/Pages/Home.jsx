import { useEffect, useState } from "react";
import Review from "../Components/Review";
import { Link,useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import axios from "axios";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    axios
      .get("/api/review")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, [reRender]);

  // handle delete review
  const deleteReview = async (id) => {
    try {
      const res = await axios.get("/api/user");
      if (res.data === "login") {
        toast.error("You must be logged in!");
        navigate("/login");
      }
      else{
        await axios.delete(`/api/review/${id}`)
          .then((res)=>{
            if(res.data === 'owner'){
              toast.error('you must be the owner of the review to delete it');
              return ;
            }
          })
        setReRender((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle review form
  const navigate = useNavigate();
  const handleReviewForm = async()=>{
    try {
      const res = await axios.get("/api/user");
      if (res.data === "login") {
        toast.error("You must be logged in!");
        navigate("/login");
      } else {
        navigate("/reviewForm");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="row offset-1 d-flex flex-wrap mb-5 mt-4 mt-md-5">
        <div className="col-sm-9  col-md-5 d-flex flex-column justify-content-center">
          <h2
            className="fw-bold"
            style={{ letterSpacing: "0.1rem", fontSize: "2.5rem" }}
          >
            Best <span className="text-danger">Restaurant</span> in Town.
          </h2>
          <p style={{ fontSize: "1.1rem" }}>
            Escape the ordinary and embark on a culinary adventure like no other
            at our renowned restaurant, where every moment is savored and every
            dish tells a story of passion, creativity, and unparalleled
            excellence.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link to="/orderOnline">
              <button className="btn btn-danger">Order now</button>
            </Link>
            <Link to="/reservation">
              <button className="btn btn-outline-danger">Reservation</button>
            </Link>
          </div>
        </div>
        <div
          className="col-3 offset-1"
          style={{ height: "52vh", width: "400px" }}
        >
          <img
            src="/homerestaurant.png"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        </div>
      </div>

      <h2
        id="reviewSection"
        className="fw-bold col-6 offset-3 mt-5"
        style={{ letterSpacing: "0.1rem", fontSize: "2.5rem" }}
      >
        What Our Customers Say
      </h2>
      <button
        className="btn btn-outline-danger col-2 offset-4 mt-3"
        onClick={handleReviewForm}
      >
        Leave a review..
      </button>
      <div className="col-9 d-flex justify-content-center align-items-center gap-3 flex-wrap offset-1 mt-4">
        {reviews.map((obj) => {
          return (
            <Review
              key={obj._id}
              id={obj._id}
              username={obj.username}
              rating={obj.rating}
              message={obj.message}
              createdAt={obj.createdAt}
              deleteReview={deleteReview}
            />
          );
        })}
      </div>

      <div
        className="col-6 offset-2 d-flex flex-column justify-content-center align-items-center gap-4 p-4 pt-5 pb-5 mb-4 mt-5"
        style={{ backgroundColor: "rgb(255, 216, 219)", borderRadius: "15px" }}
      >
        <h2
          className="fw-bold"
          style={{ letterSpacing: "0.1rem", fontSize: "2.5rem" }}
        >
          Hungry? We are open now..
        </h2>
        <div className="d-flex flex-wrap gap-3">
          <Link to="/orderOnline">
            <button className="btn btn-danger">Order now</button>
          </Link>
          <Link to="/reservation">
            <button className="btn btn-outline-danger">Reservation</button>
          </Link>
        </div>
      </div>
    </>
  );
}
