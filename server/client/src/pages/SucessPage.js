import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear cart from localStorage or any state management if used
    localStorage.removeItem("cart");
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Payment Successful ✅</h1>
      <p>Thank you for your purchase!</p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default SuccessPage;
