import React, { useEffect, useState } from "react";
import Auth from "../../components/Layout/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Layout/Spinner";
const OTP = () => {
  const [load,setLoad]=useState(false);
  const navigate = useNavigate();

  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(59);

  const { email } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    document.getElementById("otp-input-0")?.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sec > 0) {
        setSec(sec - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          clearInterval(interval);
        } else {
          setSec(59);
          setMin(min - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [sec, min]);

  const resendHandler = async (event) => {
    try {
      setLoad(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/resendOtp`,
        { email }
      );
      setLoad(false);
      if (res.data.success) {
        toast.success(res.data.message);
        document.getElementById("otp-input-0")?.focus();
        setOtp(["", "", "", "", "", ""]);
        setMin(1);
        setSec(59);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const changeHandler = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const keyHandler = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enterOTP = otp.join("");
    try {
      setLoad(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/verifyOtp`,
        { email, otp: enterOTP }
      );
      setLoad(false);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/login`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
    {load ? <Spinner/>: <></>}
    <Auth title={"Verify Email"}>
      <div className="authform">
      <form onSubmit={submitHandler}>
        <h1>Verify Email</h1>
        <label>Enter the OTP sent to {email}</label>
        <div className="otpInputContainer">
          {otp.map((digit, index) => {
            return (
              <input
                type="text"
                maxLength={1}
                key={index}
                value={digit}
                onChange={(e) => changeHandler(e.target.value, index)}
                onKeyDown={(e) => keyHandler(e, index)}
                className="otp-input"
                id={`otp-input-${index}`}
              />
            );
          })}
        </div>
        <button className="submitBtn" type="submit">
          Verify OTP
        </button>
      </form>
      <div className="resend">
          <p>
            Time Remaining:{" "}
            <span>
              {min < 10 ? `0${min}` : min} : {sec < 10 ? `0${sec}` : sec}
            </span>
          </p>
          <button
            className="resendbtn"
            disabled={sec > 0 || min > 0}
            onClick={resendHandler}
          >
            Resend OTP
          </button>
        </div>
      </div>
      
    </Auth>
    </>
  );
};

export default OTP;
