import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Auth from "../../components/Layout/Auth";
import Spinner from "../../components/Layout/Spinner";

const SignUp = () => {
  const [load,setLoad]=useState(false);
  const [conPassVis, setConPassVis] = useState(false);
  const [passVis, setPassVis] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  function changeHandler(event) {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    checkPass();
  }

  const checkPass = async () => {
    const { name, email, phone, password, confirmPassword } = formData;
    if (
      password === confirmPassword &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      try {
        setLoad(true);
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/signUp`,
          { name, email, password, confirmPassword, phone }
        );
        setLoad(false);
        if (res.data.success) {
          toast.success(res.data.message);
          navigate(`/otpVerification/${email}`);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
      setLoad(false);
      console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
    } else {
      toast.error("password doesn't match");
    }
  };

  return (
    <>
    {load ? <Spinner/>: <></>}
    <Auth title={"Sign Up"}>
      <form onSubmit={submitHandler}>
        <h1 className="midf">Sign Up</h1>
        <div className="authform">
          <label htmlFor="name" className="form-label">
            Name*
            <input
              required
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={changeHandler}
            />
          </label>

          <label htmlFor="email" className="form-label">
            Email*
            <input
              required
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={changeHandler}
            />
          </label>

          <div className="paswords">
            <label htmlFor="password" className="form-label">
              Password*
              <div className="eyecont">
                <input
                  required
                  minLength={8}
                  type={passVis ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={changeHandler}
                />
                <span
                  className="eye"
                  onClick={() => {
                    setPassVis(!passVis);
                  }}
                >
                  {passVis ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
            </label>

            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password*
              <div className="eyecont">
                <input
                  required
                  minLength={8}
                  type={conPassVis ? "text" : "password"}
                  className="form-control"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={changeHandler}
                />
                <span
                  className="eye"
                  onClick={() => {
                    setConPassVis(!conPassVis);
                  }}
                >
                  {conPassVis ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </span>
              </div>
            </label>
          </div>

          <label htmlFor="phone" className="form-label">
            Phone Number*
            <input
              required
              minLength={10}
              maxLength={10}
              type="text"
              className="form-control"
              id="phone"
              value={formData.phone}
              onChange={changeHandler}
            />
          </label>

          <button className="submitBtn" type="submit">
            Sign Up
          </button>

          <div className="al">
            Already have an account? <NavLink to="/login"> Log In</NavLink>
          </div>
        </div>
      </form>
    </Auth>
    </>
  );
};

export default SignUp;
