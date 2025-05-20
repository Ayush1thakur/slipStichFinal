const mongoose=require("mongoose");

const communitySchema= new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    contact:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
        trim:true,
    },
    
},{timestamps:true})

module.exports = mongoose.model("Community",communitySchema);