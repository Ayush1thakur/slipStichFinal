import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="layout" style={{backgroundColor:"#FAF9F6"}}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "theSlipStitch",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
};

export default Layout;
