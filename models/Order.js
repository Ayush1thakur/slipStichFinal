const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.ObjectId,
      ref: "Product",
    },
  ],
  payment: {},
  buyer: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "Order Recieved",
    enum: ["Order Recieved", "Processing", "Shipped", "Delivered", "Cancelled"],
  },
},{timestamps:true});

module.exports = mongoose.model("Order", orderSchema);
