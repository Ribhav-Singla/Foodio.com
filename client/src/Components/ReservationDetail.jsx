import { SlCalender } from "react-icons/sl";
import { IoMdTime } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";

export default function ReservationDetail() {
  // extracting the info detials related to reservation like date , time , partySize
  const [details, setDetails] = useState(JSON.parse(window.localStorage.getItem('reservationDetails')) || []);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <>
      <div
        className="col-8 col-sm-9 col-md-5 p-3 rounded"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <h5 className="fw-bold mb-3">Reservation detail</h5>
        <div className="d-flex justify-content-flex-start align-items-baseline gap-3">
          <SlCalender />
          <p>{formatDate(details.date)}</p>
        </div>
        <div className="d-flex justify-content-flex-start align-items-baseline gap-3">
          <IoMdTime />
          <p>{details.time}</p>
        </div>
        <div className="d-flex justify-content-flex-start align-items-baseline gap-3">
          <FaRegUser />
          <p>{details.partySize} people</p>
        </div>
      </div>
    </>
  );
}
