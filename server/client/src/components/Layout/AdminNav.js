import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./adminNav.css";
import { AiOutlineCopyright } from "react-icons/ai";
import { useAuth } from "../../context/auth";

const AdminNav = () => {
  const [auth, setAuth] = useAuth();

  const logoutHandler = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  
  return (
    <div className="an-navbar">
      <div>
        <div className="an-top">
          <Link to="/admin">
            <img
              style={{ width: "150px" }}
              src={process.env.REACT_APP_LOGO}
              // src={process.env.REACT_APP_LOGO_WHITE}
              alt="theSlipStitch logo"
            />
          </Link>
        </div>
        <div className="an-mid">
        {/* <h2>ADMIN PANEL</h2> */}
          <NavLink to="/admin/categories" className={({ isActive }) => (isActive ? 'active' : '')}>Categories</NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => (isActive ? 'active' : '')}>Products</NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? 'active' : '')}>Orders</NavLink>
        </div>
      </div>
      <div className="an-bottom">
        <NavLink className="logBtn tone-up" to="/login" onClick={logoutHandler}>
          Log Out
        </NavLink>
        <div className="an-copy">
          <h5>
            <AiOutlineCopyright className="an-icon" />
            &nbsp;2025 theSlipStitch
          </h5>
          <h6>All rights reserved.</h6>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
