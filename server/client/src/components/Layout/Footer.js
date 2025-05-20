import { Link } from "react-router-dom";
import "./footer.css";
import { FaRegCopyright } from "react-icons/fa";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/reach/offers`,
        { email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setEmail("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="footer">
      <div className="top">
        <div className="fleft">
          <Link to="/">
            <img
              style={{ width: "150px" }}
              src={process.env.REACT_APP_LOGO_WHITE}
              alt="theSlipStitch logo"
            />
          </Link>
          <div className="flbottom">
            <HashLink to="/#about-us">About Us</HashLink>
            <HashLink to="/">Our Products</HashLink>
            <HashLink to="/#contact-us">Contact Us</HashLink>
            <HashLink to="/#join-us">Join Us</HashLink>
            <a
              href="https://www.instagram.com/visualsbyayu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow us on Instagram!
            </a>
          </div>
        </div>
        <div className="fright">
          <h2 className="frhead">Sign Up For Special Offers!</h2>
          <form className="special-offer" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="Enter your email"
            />

            <button type="submit">
              <IoIosArrowForward />
            </button>
          </form>
          <p className="frcontent">
            By signing up, you agree to&nbsp;
            <HashLink to="/policy#navbar">Privacy Policy.</HashLink>
          </p>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <div className="nbl">
          <NavHashLink
            to="/policy#navbar"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Our Policies
          </NavHashLink>
          <NavHashLink
            to="/service#navbar"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Terms of Service
          </NavHashLink>
        </div>
        <p className="copyr">
          <FaRegCopyright className="footer-icon" />
          &nbsp;2025 theSlipStitch. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
