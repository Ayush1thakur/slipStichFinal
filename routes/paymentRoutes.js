const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/paymentController");
const authenticate = require("../middleware/authM");

router.post("/create-checkout-session", makePayment);

module.exports = router;
