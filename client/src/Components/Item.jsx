export default function Item(props){
    return (
        <> 
        <div className="d-flex flex-column align-items-center justify-content-center p-2 pb-3 border" style={{width:"15rem",borderRadius:"15px",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
            <div style={{height:"14rem",width:"14rem"}}>
                <img src={props.itemImage} style={{width:"100%",height:"100%"}}/>
            </div>
            <h5 className="fw-bold">{props.itemName}</h5>
            <p className="text-center p-1">{props.itemDescription}</p>
            <h5 className="fw-bold"><span className="fs-6">₹</span>{props.itemPrice}</h5>
            <button className="btn btn-outline-primary col-5" onClick={()=> props.addItem(props.type,props.id,props.itemPrice)}>Add</button>
        </div>
        </>
    )
}