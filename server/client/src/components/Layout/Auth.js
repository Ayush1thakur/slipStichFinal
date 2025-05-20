import React from "react";
import "./auth.css";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AiOutlineCopyright } from "react-icons/ai";
import Image from "./Image";

const Auth = ({ children, title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>

      <main className="auth">
        <div className="leftform">
          <Link className="topf" to="/">
            <img
              style={{ width: "150px" }}
              src={process.env.REACT_APP_LOGO}
              alt="theSlipStitch logo"
            />
          </Link>
          {children}
          <p className="authCopyright"><AiOutlineCopyright />&nbsp;2025 theSlipStitch</p>
        </div>
        <div className="rightform">
          <Image/>
        </div>
      </main>
    </div>
  );
};
Auth.defaultProps = {
  title: "theSlipStitch",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
};

export default Auth;
