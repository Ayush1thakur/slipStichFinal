import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CartSummary = ({ cart }) => {
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).token : null;
      if (!token) throw new Error("User not authenticated");

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/payment/create-checkout-session`,
        { cart },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sessionId = response?.data?.sessionId;
      if (!sessionId) throw new Error("No session ID returned from backend");

      const result = await stripe.redirectToCheckout({ sessionId });
      if (result.error) toast.error(result.error.message);
    } catch (error) {
      toast.error("Something went wrong during checkout.");
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-summary" style={styles.container}>
      <h2>Total: ₹{total.toFixed(2)}</h2>
      <button
        style={styles.button}
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
      >
        {loading ? "Processing..." : "Proceed to Checkout"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    border: "1px solid #ddd",
    borderRadius: "6px",
    maxWidth: "400px",
    margin: "20px auto",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6772e5",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default CartSummary;
