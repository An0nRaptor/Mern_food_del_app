import { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import {StoreContext} from "../../Context/Store"
import axios from "axios";
import {assets} from "../../assets/assets.js"
import AnimataionWrapper from "../../Common/PageAnimation.jsx";

const MyOrders = () => {

    const [data,setData] = useState([])

    const {url,token} = useContext(StoreContext)

    const fetchOrder=async()=>{

        const res = await axios.post(url+"/api/order/userOrders",{},{headers:{token}})
        setData(res.data.data)
    }

    useEffect(()=>{
        
        if(token){
            
            fetchOrder()

        }

    },[token])

  return (
    <AnimataionWrapper>
        <div className="my_orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order,i)=>{

                    return(
                        <div key={i} className="my_orders_order">
                                <img src={assets.parcel_icon} alt=""/>
                                <p>{order.items.map((item,index)=>{

                                    if(index === order.items.length-1){

                                        return item.name + " x " + item.quantity;
                                        
                                    }else{

                                        return item.name+" x " + item.quantity;
                                    }

                                })}</p>

                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                <button onClick={fetchOrder()}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
        </AnimataionWrapper>
      
  
    )
}

export default MyOrders