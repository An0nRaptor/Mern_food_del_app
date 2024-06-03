import { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/Store";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");


  const { url } = useContext(StoreContext);
  const navigate = useNavigate()

  console.log(success);

  const verifyPayment=async()=>{

    const response = await axios.post(url+"/api/order/verify",{success,orderId})

    console.log(response.data.success);

    if(response.data){


        navigate("/myorders")

    }else{
        
        navigate("/")
    }

  }

  useEffect(()=>{

    verifyPayment()

  },[])

  return (
    <div className="verify">
      <div className="spinner">

      </div>
    </div>
  );
};

export default Verify;
