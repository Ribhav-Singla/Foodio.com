import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="row ">
          <div className="col-3 d-none d-sm-block mx-auto">
            <h5 className="text-danger">Foodio.com</h5>
            <p>
            Indulge in a culinary journey where every bite tells a story. Experience the perfect blend of flavor and ambiance at our restaurant, where passion meets perfection.
            </p>
            <div className="d-flex gap-2">
              <FaSquareXTwitter size={30} />
              <FaSquareInstagram size={30}/>
              <FaSquareFacebook size={30}/>
            </div>
          </div>
          <div className="col-2 ms-3 d-none d-sm-block mx-auto">
            <h5 className="text-danger">Page</h5>
            <a href="#">Home</a> <br />
            <a href="#">Menu</a> <br />
            <a href="#">About us</a> <br />
            <a href="#">Order online</a> <br />
            <a href="#">Reservation</a> <br />
            <a href="#">Contact us</a> <br />
          </div>
          <div className="col-3 xs-text-center">
            <h5 className="text-danger">Get in touch</h5>
            <p>ribhavsingla2166@gmail.com</p>
            <p>+91-9815653691</p>
          </div>
        </div>
        <div className="row col-3 offset-5 mt-4">
            <p>&copy; <span>Copyright all rights reserved.</span></p>
        </div>
      </div>
    </>
  );
}
