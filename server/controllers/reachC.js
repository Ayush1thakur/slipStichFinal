const Offers= require("../models/Offers");
const Community= require("../models/Community");

exports.createOffers= async(req,res,next)=>{
    try {
        const {email}= req.body;
        if(!email){
            return res.status(401).send({
                message:"Email is required"
            })
        }

        const existingOffer= await Offers.findOne({email});
        if(existingOffer){
            return res.status(400).send({
                success:false,
                message:"Already Signed Up for Offers",
            })
        }

        const offer= await Offers.create({email});

        return res.status(200).send({
            success:true,
            message:"Successfully Signed Up for Offers",
            offer
        })


    } catch (error) {
       console.log(error);
       return res.status(500).send({
        success:false,
        message:'Error in Signing up for Offers'
       }) 
    }
}

exports.createCommunity= async(req,res,next)=>{
    try {
        const {name,email,contact,state,message}= req.body;
        if(!name || !email|| !contact || !state || !message){
            return res.status(401).send({
                message:"All fields required"
            })
        }

        const existingCommunity= await Community.findOne({email});
        if(existingCommunity){
            return res.status(200).send({
                success:true,
                message:"We'll reach you shortly",
            })
        }

        const comunity= await Community.create({name,email,contact,state,message});

        return res.status(200).send({
            success:true,
            message:"We'll reach you shortly",
            comunity
        })


    } catch (error) {
       console.log(error);
       return res.status(500).send({
        success:false,
        message:'Error in Joining Us'
       }) 
    }
}