const jwt=require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// protected routes token base
exports.isUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "No token provided or bad format",
            });
        }

        const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({
            success: false,
            message: "Invalid or expired token",
            error,
        });
    }
};


// admin access
exports.isAdmin=async (req,res,next) => {
    try {
        const user=await User.findById(req.user._id);
        if(user.role!=1){
            return res.status(401).send({
                success:false,
                message:"UnAuthorizes Access"
            })
        }else{
            next();
        }
    } catch (error) {

        console.error(error);
        res.status(401).send({
            success:false,
            message:"error in isAdmin middleware",
            error
        })
    }
}