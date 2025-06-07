import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Auth from "../../components/Layout/Auth";
import { useAuth } from "../../context/auth";
import Spinner from "../../components/Layout/Spinner";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [load,setLoad]=useState(false);

  const [passVis, setPassVis] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setLoad(true);
      const { email, password } = formData;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      setLoad(false);
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(res);

        // Set auth state first
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        // Save to localStorage
        localStorage.setItem("auth", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token); 

        // Navigate after state is updated
        if (res.data.user.role === 1) {
          navigate("/admin");
        } else {
          navigate(location.state || "/");
        }
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
    <Auth title={"Login"}>
      <form onSubmit={submitHandler}>
        <h1 className="midf">Login</h1>

        <div className="authform">
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

          <label htmlFor="password" className="form-label">
            <div className="forgotpass">
              <p>Password*</p>
              <NavLink to="/forgotPassword">forgot password?</NavLink>
            </div>
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

          <button className="submitBtn" type="submit">
            Login
          </button>

          <div className="al">
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </div>
      </form>
    </Auth>
    </>
  );
};

export default Login;
