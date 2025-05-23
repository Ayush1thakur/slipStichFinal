const express= require("express");
const { login, signUp, testC, verifyOtp, resendOtp, forgotPassword, resetPassword } = require("../controllers/authC");
const { isUser, isAdmin } = require("../middleware/authM");
const router= express.Router();

// routing

// sign up
router.post('/signUp',signUp);
// login
router.post('/login',login);
// verify otp
router.post("/verifyOtp",verifyOtp);
// resend otp
router.post("/resendOtp",resendOtp);
// reset password link
router.post("/forgotPassword",forgotPassword);
// resetting password
router.put("/resetPassword",resetPassword);


// protected route
router.get("/user-auth",isUser,(req,res)=>{
    res.status(200).send({ success:true});
})
router.get("/admin-auth",isUser,isAdmin, (req,res)=>{
    res.status(200).send({ success:true});
})


module.exports = router;