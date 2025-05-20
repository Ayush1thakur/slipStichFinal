import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pageNotFound.css";

const PageNotFound = () => {
  const [time, setTime] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    if (time === 0) {
      clearInterval(interval);
      navigate("/");
    }
    return () => clearInterval(interval);
  }, [time,navigate]);

  return (
    <div className="pnf">
      <div className="oops">Oops!</div>
      <div className="pnf-title">Error 404 - Page Not Found</div>
      <div className="pnf-content">
        It looks like you got lost far enough, don't worry returning to the
        homepage in <b>{time}s.</b>
      </div>
    </div>
  );
};

export default PageNotFound;
