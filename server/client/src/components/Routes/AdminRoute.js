import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Spinner from "../Layout/Spinner";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";


export default function AdminRoute(){
    const [ok,setOk]=useState(false);
    const [auth]=useAuth();
    const navigate= useNavigate();
    const location = useLocation();

    const [count,setCount]=useState(3);
    
    useEffect(()=>{
        const authCheck= async()=>{
            try {
                const res= await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`);
                if (res.data.success){
                    setOk(true);
                }
            } catch (error) {
                navigate("/");
                setOk(false);
            }
        }
        if(auth?.token) authCheck();
    },[auth?.token,navigate]);

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
    },[count,navigate,ok]);

    return ok? <Outlet/> :<Spinner/>; 
}