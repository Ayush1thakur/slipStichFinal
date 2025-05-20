const express = require("express");
const router = express.Router();
const { isUser } = require("../middleware/authM");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} = require("../controllers/cartController");

router.post("/add", isUser, addToCart);
router.get("/getCart", isUser, getCartItems);
router.delete("/remove/:productId", isUser, removeFromCart);
router.put("/update", isUser, updateCartQuantity);

module.exports = router;
