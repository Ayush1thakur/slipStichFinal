import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Spinner from "../Layout/Spinner";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
export default function UserRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);


  useEffect(()=>{
    const authCheck= async()=>{
        try {
            const res= await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`);
            if (res.data.success){
                setOk(true);
            }
        } catch (error) {
            console.log(error);
            setOk(false);
        }
    }
    if(auth?.token) authCheck();
},[auth?.token]);

  useEffect(()=>{
    // console.log(count);
    const interval= setInterval(() => {
        setCount((prev)=>--prev)
    }, 1000);
    ok && clearInterval(interval);
    count===0 && navigate("/login",{
        state:location.pathname
    });
    return ()=> clearInterval(interval);
},[count,navigate,location,ok]);

  return ok ? <Outlet /> : <Spinner />;
}
