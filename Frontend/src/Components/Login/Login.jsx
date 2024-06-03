import { useEffect, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/Store";
import axios from "axios"
import { useContext } from "react";
import AnimataionWrapper from "../../Common/PageAnimation"

const Login = ({ setShowLogin }) => {

  const {url,setToken} = useContext(StoreContext)


  const [currState, setCurrState] = useState("Sign Up");
  const [data,setData] = useState({name:"",email:"",password:""});

  const onChangeHandler =(e)=>{

    const name = e.target.name;
    const value = e.target.value;
    
    setData(data=> ({...data,[name]:value}))

  }

  const onLogin =async(e)=>{

    e.preventDefault();

    let newUrl = url;

    if(currState === 'Login'){

      newUrl = newUrl+"/api/user/login"

    }else{

      newUrl = newUrl+"/api/user/register"

    }



    const response =  await axios.post(newUrl, data)

  

    if(response.data){

      setToken(response.data.access_token);
      localStorage.setItem("token",response.data.access_token)
      setShowLogin(false)

    }else{

      alert(response.data.message)

    }

  }


  useEffect(()=>{

    
  
  },[data])

  return (
    
    <div className="login">
      <form onSubmit={onLogin} className="login_container">
        <div className="login_title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
        </div>
        <div className="login_inputs">
          {currState === "Login" ? ( <></>) : (<input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Name" required />)}
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login_condition">
            <input type="checkbox" id="checkboxInput" required/>
            <p>By continuing, I agree the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ?  <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p> :  <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>  }
      </form>
    </div>
    
  );
};

export default Login;
