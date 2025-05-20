const bcrypt=require("bcrypt");

// password hashing
exports.hashPassword= async(password)=>{
    try {
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log("Error in hashing password");
        console.error(error);
        process.exit(1);
    }
};

// password comparing
exports.comparePassword= async(password,hashedPassword)=>{
    try {
        return bcrypt.compare(password,hashedPassword); 
    } catch (error) {
        console.log("Error in comparing password");
        console.error(error);
        process.exit(1);
    }
};
