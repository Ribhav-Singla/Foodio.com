import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

export default function Checkout(){

    const navigate = useNavigate();

    const handleExit = () => {
      navigate('/orderOnline');
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

      // handling online payment not accepted 
      const handleOnlinePayment = ()=>{
          toast.error('Currently not accepting Online payments');
          setTimeout(()=>{
            document.getElementById('onlinepayment').checked=false;
          },500)
      }

      // handling retriving order details from the local storage
      const [details,setDetails] = useState(JSON.parse(window.localStorage.getItem('orderData')) || []);
      
      // handling change button
      const [address,setAddress] = useState("");

    return (
        <>
        <div className="col-xs-5 col-sm-7 offset-sm-2 col-md-5 offset-md-3 mb-4 mt-3" style={{position:"relative"}}>
          <RxCross2 style={{position:"absolute",left:"97%",cursor:"pointer"}} size={25} onClick={handleExit}/>
          <h1 className="fw-bold mb-3 text-center">Checkout</h1>
          <div>
              <form method="POST" action="/api/checkout" className="needs-validation" noValidate>
                  <div>
                      <label htmlFor="shippingAddress" className="form-label mb-2">Shipping address</label>
                      <div className="d-flex gap-3">
                        <input type="text" name="shippingAddress" className="form-control" placeholder="xxxx sector xx-c chandigarh" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        <button className="btn btn-primary" type="button" onClick={()=>setAddress("")}>Change</button>
                      </div>
                  </div>
                  <br />
                  <div>
                      <label htmlFor="orderData mb-2">Order data</label>
                      <div className="d-flex gap-3 mt-2">
                        <input type="text" name="username" placeholder="Username" className="form-control" required />
                        <input type="number" name="phoneNumber" placeholder="Phone number" className="form-control" required />
                      </div>
                  </div>
                  <br />
                  <div className="">
                      <input type="email" name="email" placeholder="Email" className="form-control" required />
                  </div>
                  <br />
                  <div className="">
                    <label htmlFor="paymentMethod" className="form-label">Payment method</label>
                    <div className="d-flex gap-2 border p-2 rounded">
                      <input type="radio" name="paymentMethod" className="form-check-input" value="cash" required />
                      <label htmlFor="cash" className="form-check-label">Cash on Delivery</label>
                    </div>
                    <div className="d-flex gap-2 border p-2 rounded">
                      <input type="radio" name="paymentMethod" id="onlinepayment" className="form-check-input" value="online" onChange={handleOnlinePayment} required />
                      <label htmlFor="online" className="form-check-label">Online</label>
                    </div>
                  </div>
                  <div>
                    <textarea name="orderDetails" className="d-none" value={JSON.stringify(details)} readOnly={true}></textarea>
                  </div>
                  <br />
                  <button className="btn btn-danger" style={{width:"100%"}}>Order now</button>
              </form>
          </div>
        </div>
        </>
    )
}