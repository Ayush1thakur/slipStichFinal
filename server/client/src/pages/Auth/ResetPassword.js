import React, { useState } from "react";
import Auth from "../../components/Layout/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Layout/Spinner";

const ResetPassword = () => {
  const [load,setLoad]=useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [newPassVis, setNewPassVis] = useState(false);
  const [conNewPassVis, setConNewPassVis] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
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
      const { newPassword, confirmNewPassword } = formData;

      if (newPassword === confirmNewPassword) {
        setLoad(true);
        const res = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/auth/resetPassword`,
          { id, newPassword, confirmNewPassword }
        );
        setLoad(false);
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.error("Passwords doesn't match");
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
    <Auth title={"Reset Password"}>
      <form onSubmit={submitHandler}>
        <h1 className="midf">Reset Password</h1>

        <label htmlFor="password" className="form-label">
          New Password*
          <div className="eyecont">
            <input
              required
              minLength={8}
              type={newPassVis ? "text" : "password"}
              className="form-control"
              id="newPassword"
              value={formData.newPassword}
              onChange={changeHandler}
            />
            <span
              className="eye"
              onClick={() => {
                setNewPassVis(!newPassVis);
              }}
            >
              {newPassVis ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
        </label>

        <label htmlFor="confirmPassword" className="form-label">
          Confirm New Password*
          <div className="eyecont">
            <input
              required
              minLength={8}
              type={conNewPassVis ? "text" : "password"}
              className="form-control"
              id="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={changeHandler}
            />
            <span
              className="eye"
              onClick={() => {
                setConNewPassVis(!conNewPassVis);
              }}
            >
              {conNewPassVis ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
        </label>

        <button className="submitBtn" type="submit">
          Reset Password
        </button>
      </form>
    </Auth>
    </>
  );
};

export default ResetPassword;
