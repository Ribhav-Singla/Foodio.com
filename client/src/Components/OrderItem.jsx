import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

export default function OrderItem(props){
    
    let {id,itemType,itemName,itemPrice,quantity,handleDeleteItem,handleIncrementQuantity,handleDecrementQuantity} = props;
    return(
        <>
        <div className="border rounded mb-3" style={{width:"100%"}}>
            <div className="d-flex p-2 ps-3 pe-3 pt-3 justify-content-between align-items-baseline">
                <h5 className="fw-bold">{itemName}</h5>
                <RiDeleteBinLine size={20} style={{cursor:"pointer",color:"red"}} onClick={()=> handleDeleteItem(id,itemType)}/>
            </div>
            <div className="d-flex p-2 ps-3 pe-3 justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-baseline">
                    <FiMinusCircle size={20} style={{cursor:"pointer",color:"red"}} onClick={()=>handleDecrementQuantity(id,itemType)}/>
                    <h5>{quantity}</h5>
                    <FiPlusCircle size={20} style={{cursor:"pointer",color:"green"}} onClick={()=>handleIncrementQuantity(id,itemType)} />
                </div>
                <h4 className="fw-bold"><span className="fs-6">₹</span>{itemPrice}</h4>
            </div>
        </div>
        </>
    )
}