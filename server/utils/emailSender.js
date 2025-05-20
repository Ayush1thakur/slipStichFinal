const nodemailer= require("nodemailer");


// Email sending function
exports.mailSender = async (email,title,body) => {
    try {
        // Configure transporter
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
          });

          await transporter.verify((error,success)=>{
            if(error){
                console.log(error);
            }else{
                console.log("Ready to send Email");
            }
          })

          let info= await transporter.sendMail({
            from:"theSlipStitch",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        }) 
        return info;

    } catch (error) {
        console.error("error in Sending email",error);
    }
};