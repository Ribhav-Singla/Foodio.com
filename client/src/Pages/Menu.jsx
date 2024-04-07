import { useState } from "react";
import MenuItem from "../Components/MenuItem.jsx";
import Pizza from '../Data/Pizza.js'
import Drink from '../Data/Drink.js'

export default function Menu(){
    // handling menu data
    const [pizzaData,setPizzaData] = useState(Pizza);
    const [drinkData,setDrinkData] = useState(Drink);
    
    const pizzaElements = pizzaData.map((obj,idx)=>{
        return <MenuItem key={idx} {...obj} />
    })
    
    const drinkElements = drinkData.map((obj,idx)=>{
        return <MenuItem key={idx} {...obj} />
    })

    // handling menu switches
    const [pizzaMenu,setPizzaMenu] = useState(true);
    const [drinkMenu,setDrinkMenu] = useState(false);
            
    const handlePizzaMenu = ()=>{
        if(drinkMenu){
            setDrinkMenu(prev => !prev);
            setPizzaMenu(prev => !prev);
            pizzabtn.classList.remove('btn-outline-danger');
            pizzabtn.classList.add('btn-danger');
            drinkbtn.classList.remove('btn-danger');
            drinkbtn.classList.add('btn-outline-danger');
        }
    }
    
    const handleDrinkMenu = ()=>{
        if(pizzaMenu){
            setPizzaMenu(prev => !prev);
            setDrinkMenu(prev => !prev);
            pizzabtn.classList.remove('btn-danger');
            pizzabtn.classList.add('btn-outline-danger');
            drinkbtn.classList.remove('btn-outline-danger');
            drinkbtn.classList.add('btn-danger');
        }
    }
    
    return (
        <>
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="text-center mt-4">
                <h1 className="fw-bold mb-3">Our Popular Menu</h1>
                <div className="d-flex align-items-center justify-content-center">
                    <button className="btn btn-danger col-3 col-sm-6 col-md-8 no-outline" id="pizzabtn" onClick={handlePizzaMenu}>Pizza</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-outline-danger col-3 col-sm-6 col-md-8 no-outline" id="drinkbtn" onClick={handleDrinkMenu} style={{outline:"none"}}>Drink</button>
                </div>
            </div>

            <div className="mt-4 mb-5 d-flex flex-wrap gap-4 justify-content-center" style={{maxWidth:"1200px"}}>
                {pizzaMenu && pizzaElements}
                {drinkMenu && drinkElements}
            </div>
        </div>
        </>
    )
}