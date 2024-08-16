import { RxCross2 } from "react-icons/rx";
import ReservationDetail from './ReservationDetail'
import {Link,useNavigate ,useParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'

export default function ReservationBookingCancel(){

    let {id} = useParams();

    // handling the exit button of reservationBookingCancel component
    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/reservation");
    };

    // handling cancel the booking 
    const handleCancelBooking = async()=>{
        try {
            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/reservation/cancel/${id}`,{withCredentials:true})
                .then((res)=>{
                    if(res.data === 'success'){
                        toast.success("Your reservation is cancelled successfully");
                        navigate('/reservation')
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className="pt-1 pb-5 col-sm-8 offset-sm-2 col-md-6 offset-md-3" style={{position:"relative"}}>
            <RxCross2 style={{position:"absolute",left:"97%",cursor:"pointer"}} size={25} onClick={handleExit}/>
            <div className="mt-4">
                <h2 className="fw-bold text-center" style={{fontSize:"2rem"}}>Reservation</h2>
                <div className="text-center pt-3 pb-2 rounded" style={{backgroundColor:"rgba(251, 133, 0, 0.68)",fontSize:"1.3rem",lineHeight:"0.8rem"}}>
                    <p>Are you sure you want to cancel the reservation?</p>
                    <p>Booking ID: {id}</p>
                </div>
            </div>
            <br />
            <div className='d-flex justify-content-center align-items-center flex-wrap gap-5'>
                <ReservationDetail/>
                <div>
                    <button className="btn btn-outline-danger" onClick={handleCancelBooking}>Cancel &nbsp; <RxCross2 size={20}/></button> <br /> <br />
                    <button className="btn btn-outline-secondary" onClick={()=>navigate(`/reservation/confirmation/${id}`)}>Go Back &nbsp;</button>
                </div>
            </div>
        </div>
        </>
    )
}