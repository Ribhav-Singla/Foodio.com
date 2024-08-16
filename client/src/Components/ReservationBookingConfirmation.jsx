import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import ReservationDetail from './ReservationDetail'
import {Link,useNavigate ,useParams } from 'react-router-dom';
import axios from 'axios';

export default function ReservationBookingConfirmation(props){
    let {id} = useParams();

    // handling the exit button of reservationBookingConfirmation component
    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/reservation");
    };

    // handling modify reservation data 
    const handleModify = async()=>{
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reservation/confirmation/${id}/edit`)
                .then((res)=>{
                    if(res.data !== 'error'){
                        navigate(`/reservation/confirmation/${id}/reservationModify`,{state : res.data});
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
                <div className="text-center pt-3 pb-2 rounded" style={{backgroundColor:"lightgreen",fontSize:"1.3rem",lineHeight:"0.8rem"}}>
                    <p>Reservation has been confirmed!</p>
                    <p>Booking ID: {id}</p>
                </div>
            </div>
            <br />
            <div className='d-flex justify-content-center align-items-center flex-wrap gap-5'>
                <ReservationDetail {...props}/>
                <div>
                    <button className="btn btn-outline-primary" onClick={handleModify}>Modify &nbsp; <FiEdit size={20} /></button> <br /> <br />
                    <Link to={`/reservation/cancel/${id}`}><button className="btn btn-outline-danger">Cancel &nbsp; <RxCross2 size={20}/></button></Link>
                </div>
            </div>
        </div>
        </>
    )
}