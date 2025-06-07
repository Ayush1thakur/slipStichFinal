import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Call backend API to clear the cart in DB after payment success
    const clearUserCart = async () => {
      try {
        await axios.delete("/api/cart/clear", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you send auth
          },
        });
        // optionally clear local storage cart if you have any
        localStorage.removeItem("cart");
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    };

    clearUserCart();
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
