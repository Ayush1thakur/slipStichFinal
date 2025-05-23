const mongoose= require("mongoose");

const otpSchema= new mongoose.Schema({
    _id:String,
    otp:String,
    createdAt: Date,
    expiresAt: Date,
})

module.exports = mongoose.model("OTP",otpSchema);