import axios from "axios";
import { toast } from "react-toastify";

const CartItems = ({ item, refresh }) => {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  const updateQty = async (qty) => {
    try {
      if (qty < 1) {
        await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/cart/remove/${item.productId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Item removed");
      } else {
        await axios.put(
          `${process.env.REACT_APP_API}/api/v1/cart/update`,
          { productId: item.productId, quantity: qty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      refresh();
    } catch (err) {
      toast.error("Failed to update cart");
    }
  };

  return (
    <div className="cart-item">
      <img src={item.photo[0]} alt={item.name} />
      <div className="cart-details">
        <h3>{item.name}</h3>
        <p>₹{item.price}</p>
        <div className="qty-actions">
          <button onClick={() => updateQty(item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQty(item.quantity + 1)}>+</button>
        </div>
        {/* Optional explicit remove button */}
        {/* <button className="remove-btn" onClick={() => updateQty(0)}>
          Remove
        </button> */}
      </div>
    </div>
  );
};

export default CartItems;
