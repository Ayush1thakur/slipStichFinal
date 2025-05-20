import React, { useState } from 'react'
import Auth from '../../components/Layout/Auth'
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Spinner from '../../components/Layout/Spinner';

const ForgotPassword = () => {
    const [email,setEmail]=useState("");
    const [load,setLoad]=useState(false);

    function changeHandler(event) {
        setEmail(event.target.value);
      }
    
      const submitHandler= async(event)=> {
        event.preventDefault();
        try {
            setLoad(true);
            const res = await axios.post(
              `${process.env.REACT_APP_API}/api/v1/auth/forgotPassword`,
              { email }
            );
            setLoad(false);
            if (res.data.success) {
              toast.success(res.data.message);
              setEmail("");
            } else {
              toast.error(res.data.message);
            }
          } catch (error) {
            setLoad(false);
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
          }
      }



  return (
    <>
    {load ? <Spinner/>: <></>}
    <Auth title={"Forgot Password"}>
          <form onSubmit={submitHandler}>
              <h1 className="midf">Forgot Password</h1>
              <p>Enter your email to recieve a password reset link</p>
    
              <label htmlFor="email" className="form-label">
                <input
                  required
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={changeHandler}
                />
              </label>
    
              
              <button className="submitBtn" type="submit">Send Link</button>
    
            </form>
        </Auth>
        </>
  )
}

export default ForgotPassword
