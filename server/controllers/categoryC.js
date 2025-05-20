const Category= require("../models/Category");
const slugify = require("slugify");

// create
exports.createCategory= async(req,res,next)=>{
    try {
        const {name}= req.body;
        if(!name){
            return res.status(401).send({
                message:"Name is required"
            })
        }
        const corrName=name.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

        const existingCategory= await Category.findOne({corrName});
        if(existingCategory){
            return res.status(400).send({
                success:false,
                message:"Category Already Exists",
            })
        }

        const category= await Category.create({name:corrName, slug: slugify(name)});

        return res.status(200).send({
            success:true,
            message:"new category created",
            category
        })


    } catch (error) {
       console.log(error);
       return res.status(500).send({
        success:false,
        error,
        message:'Error in creating Category'
       }) 
    }
}

// update
exports.updateCategory= async(req,res,next)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category = await Category.findByIdAndUpdate(
            id,
            {name,slug:slugify(name)},
            {new:true});
        return res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
       return res.status(500).send({
        success:false,
        error,
        message:'Error in Updating Category'
       }) 
    }
}

// get category
exports.getAllCategory= async(req,res,next)=>{
    try{
        const category = await Category.find({});
        return res.status(200).send({
            success:true,
            message:"All categories found",
            category,
        });
    }catch (error) {
        console.log(error);
        return res.status(500).send({
        success:false,
        error,
        message:'Error in fetching all Category'
       }) 
    }
}

exports.getCategory= async(req,res)=>{
    try{
        const {slug}= req.params;
        const category = await Category.findOne({slug:slug});
        return res.status(200).send({
            success:true,
            message:"category found",
            category,
        });
    }catch (error) {
        console.log(error);
        return res.status(500).send({
        success:false,
        error,
        message:'Error in fetching Category'
       }) 
    }
}

// delete category
exports.deleteCategory= async (req,res,next) => {
    try{
        const {id}= req.params;
        await Category.findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            message:"category deleted successfully",
        });
    }catch (error) {
        console.log(error);
        return res.status(500).send({
        success:false,
        error,
        message:'Error in Deleting Category'
       }) 
    }
}
