import React, { useEffect ,useState} from "react";
import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

export default function ContactUs() {

  // handling formdata
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // handling map leaflet
  const mapRef = useRef(null);
  const latitude = 30.7333;
  const longitude = 76.79;

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

  // handling form data to be sent to the backend
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('/api/contactUs', formData);
      if(res.data === 'login'){
        toast.error('you must be logged in!');
        navigate('/login');
      }
      if (res.data === "success") {
        toast.success("Message sent successfully !");
        // Reset form data and validation state
        setFormData({
          username: "",
          email: "",
          message: ""
        });
        const forms = document.querySelectorAll(".needs-validation");
        forms.forEach((form) => {
          form.classList.remove("was-validated");
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="row text-center mt-3">
        <h1 className="fw-bold">Contact us</h1>
        <p>
          We love hearing from our customers. Feel free to share your experience
          or ask any questions you may have.
        </p>
      </div>


      <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 mb-5">
        <div className="col-5"
          style={{
            height: "52vh",
            width: "55vh",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            ref={mapRef}
            style={{ height: "100%", width: "100%", borderRadius: "20px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
              <Popup>Foodio.com</Popup>
            </Marker>
          </MapContainer>
        </div>
        <form className="needs-validation col-sm-6 col-md-4" noValidate onSubmit={handleSubmit}>
          <div className="">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-control p-2"
              required
            />
          </div>
          <br />
          <div className="">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control p-2"
              required
            />
          </div>
          <br />
          <div className="">
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              className="form-control p-2"
              rows={4}
              required
            ></textarea>
            <div className="invalid-feedback">Please provide a message.</div>
          </div>
          <br />
          <button className="btn btn-danger p-2"  type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
