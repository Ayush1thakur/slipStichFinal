const mongoose= require("mongoose");

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true,
    },
    photo:{
        type:[String],
        required: true,
    },
    shipping:{
        type: Boolean,
    }
},{timestamps:true})

module.exports= mongoose.model("Product",productSchema);