// npm i express nodemon dotenv mongoose cookie-parser jsonwebtoken nodemailer otp-generator bcrypt

const express = require("express");
require("dotenv").config();
const cors= require("cors");


const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes= require("./routes/productRoutes");
const reachRoute= require("./routes/reachRoute");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
// port
const PORT= process.env.PORT || 4000;

// rest object
const app= express();

// middleware
app.use(cors());
app.use(express.json());

// database connect
connectDB();

// cloudinary connect
cloudinaryConnect();

const fileupload= require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/product',productRoutes);
app.use('/api/v1/reach',reachRoute);
app.use('/api/v1/cart', cartRoutes);
app.use("/api/v1/payment", require("./routes/paymentRoutes"));

// rest api
// app.get('/', (req,res)=>{
//     res.send("<h1>welcome</h1>")
// })


// run/listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`);
})