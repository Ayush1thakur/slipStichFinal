import React from "react";
import { Helmet } from "react-helmet";
import AdminNav from "./AdminNav";

const AdminLayout = ({ children, title, description, keywords }) => {
  return (
    <div style={{position:"relative"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <div style={{ backgroundColor: "#FAF9F6", display: "flex" }}>
        <AdminNav />
        <div className="admin-layout" style={{ width:"80vw", padding:"2rem", height: "100vh"}}>{children}</div>
      </div>
    </div>
  );
};

AdminLayout.defaultProps = {
  title: "theSlipStitch",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
};

export default AdminLayout;
