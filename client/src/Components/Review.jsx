import { RiDeleteBinLine } from "react-icons/ri";
import { Rating } from 'react-simple-star-rating'

export default function Review({id,username,rating,message,createdAt,deleteReview}){

    return(
        <>
            <div className="col-5 p-3 border border-2 rounded-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold">{username}</h5>
                    <RiDeleteBinLine size={20} style={{cursor:"pointer",color:"red"}} onClick={()=>deleteReview(id)}/>
                </div>
                <Rating initialValue={rating} allowHover={false} readonly={true} size={20}/>
                <p className="mt-2">{message}</p>
                <p className="fw-light">{new Date(createdAt).toLocaleDateString()}</p>
            </div>
        </>
    )
}