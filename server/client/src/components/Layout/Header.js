import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./header.css";
import { useAuth } from "../../context/auth";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { NavHashLink } from 'react-router-hash-link';



const Header = () => {
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState([]);
  const [displayDD, setDisplayDD] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/v1/category/get-all-category`)
      .then((res) => {
        if (res.data.success) {
          setCategory(res.data.category);
        } else {
          console.error("Failed to fetch category:", res.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);

  const logoutHandler = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  return (
    <div className="navbar" id="navbar">
      <div className="left">
        <Link to="/">
          <img
            style={{ width: "150px" }}
            src={process.env.REACT_APP_LOGO}
            alt="theSlipStitch logo"
          />
        </Link>

        <div className="mid">
          <NavLink to="/">Home</NavLink>
          <NavHashLink to="/#about-us">About Us</NavHashLink>

          <div className="dropdown" onClick={()=>setDisplayDD(!displayDD)}>
            <div className="dropdown-tag">
              Our Collection <IoIosArrowDown/>
            </div>
            <ul className="dropdown-menu" style={{display: displayDD ? "flex" : "none"}}>
              {category.map((category) => (
                <NavLink
                  key={category._id}
                  onClick={()=>setDisplayDD(!displayDD)}
                  className="dropdown-item"
                  to={`/products/${category.slug}`}
                >
                  {category.name}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="right">
        <NavLink to="/cart">
          <PiShoppingCartSimpleBold className="cart-icon" />
        </NavLink>
        {!auth.user ? (
          <NavLink className="authBtn" to="/signup">
            Sign Up
          </NavLink>
        ) : (
          <NavLink className="authBtn" to="/login" onClick={logoutHandler}>
            Log Out
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
