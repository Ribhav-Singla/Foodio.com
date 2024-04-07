import {Link} from 'react-router-dom'

export default function AboutUs(){
    return (
        <> 
        <div className="row offset-1 d-flex flex-wrap mt-4">
            <div className="col-3 d-none d-md-inline" style={{height:"50vh",width:"26vw"}}>
                <img src="/aboutusrestaurant.png" style={{width:"100%",height:"100%"}} class="d-md-block"/>
            </div>
            <div className="col-sm-9  col-md-5 offset-md-1 d-flex flex-column justify-content-center">
                <h2 className="fw-bold" style={{letterSpacing:"0.1rem", fontSize:"2.5rem"}}>About Our <span className="text-danger">Restaurant</span></h2>
                <p style={{fontSize:"1.1rem"}}>Indulge in a culinary journey at our restaurant, where every dish is crafted with passion and precision. Our menu showcases a fusion of flavors, blending traditional recipes with innovative twists. Immerse yourself in the inviting ambiance as you savor each bite, surrounded by warm hospitality and elegant décor. Whether you're seeking a romantic dinner for two or a lively gathering with friends, our restaurant promises an unforgettable dining experience.</p>
                <Link to='/orderOnline'><button className="btn btn-danger" style={{width:"fit-content"}}>Order now</button></Link>
            </div>
        </div>

        <div className="row offset-1 d-flex flex-wrap mb-4 mt-4 mt-md-0">
            <div className="col-sm-9  col-md-5 d-flex flex-column justify-content-center">
                <p style={{fontSize:"1.1rem"}}>Indulge in our signature dish, the succulent <b>'Spicy Honey Glazed Salmon'</b>. Savor the perfect harmony of tender salmon fillets delicately coated in a tantalizing blend of spicy seasoning and sweet honey glaze, creating a culinary masterpiece that tantalizes the taste buds. Garnished with fresh herbs and served alongside a medley of vibrant vegetables, this exquisite dish offers a symphony of flavors that promises to delight every palate.</p>
            </div>
            <div className="col-3 offset-1" style={{height:"52vh",width:"28vw"}}>
                <img src="/aboutusdish.png" style={{width:"100%",height:"100%"}}/>
            </div>
        </div>
        </>
    )
}