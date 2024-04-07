import {Link} from 'react-router-dom';

export default function MenuItem(props){
    return (
        <> 
        <div className="d-flex flex-column align-items-center justify-content-center p-2 pb-3 border" style={{width:"20rem",borderRadius:"15px",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
            <div style={{height:"14rem",width:"14rem"}}>
                <img src={props.itemImage} style={{width:"100%",height:"100%"}}/>
            </div>
            <h5 className="fw-bold">{props.itemName}</h5>
            <p className="text-center p-1">{props.itemDescription}</p>
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3">
                <h5 className="fw-bold"><span className="fs-6">₹</span>{props.itemPrice}</h5>
                <Link to="/orderOnline"><button className="btn btn-outline-primary">Order now</button></Link>
            </div>
        </div>
        </>
    )
}