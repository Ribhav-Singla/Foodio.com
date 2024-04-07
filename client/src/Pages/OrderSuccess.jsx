import { useEffect, useState } from 'react';
import { Checkmark } from 'react-checkmark'
import {useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

export default function OrderSuccess(){

    let {id} = useParams();

    const [total,setTotal] = useState(window.localStorage.getItem('amount') || 0)

    useEffect(()=>{
        window.localStorage.removeItem('orderData')
    },[])

    // handling order more button
    const navigate = useNavigate();
    const handleOrderMore = ()=>{
        navigate('/orderOnline');
    }

    return (
        <>
        <div className=' d-flex flex-wrap justify-content-center align-items-center flex-column gap-1' style={{height:'400px'}}>
            <Checkmark size='120px' color='#29bf12'/>
            <h3 className='fw-bold mt-2'>Order Success</h3>
            <p>Order ID: {id}</p>
            <p>Amount to be paid: ₹{Number(total)+Number(3)} </p>
            <p className='text-secondary'>Thank you, Your order will be started as soon as possible.</p>
            <button className='btn btn-danger col-4 col-md-3' onClick={handleOrderMore}>Order more</button>
        </div>
        </>
    )
}