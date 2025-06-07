const express = require("express");
const router = express.Router();
const { isUser } = require("../middleware/authM");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} = require("../controllers/cartController");

router.post("/add", isUser, addToCart);
router.get("/getCart", isUser, getCartItems);
router.delete("/remove/:productId", isUser, removeFromCart);
router.put("/update", isUser, updateCartQuantity);
router.delete("/clear", isUser, clearCart);

module.exports = router;
