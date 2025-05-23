const mongoose=  require("mongoose");

const offersSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
},{timestamps:true})

module.exports = mongoose.model("Offers",offersSchema);