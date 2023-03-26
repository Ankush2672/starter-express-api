require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

module.exports = {
    jwt_Sign_token : async(payload)=>{

        return jwt.sign(payload,process.env.JWT_KEY,{expiresIn : "72000s"});
    },
    jwt_verify_token: async(token)=>{
            try{
                    return jwt.verify(token.split(" ")[1],process.env.JWT_KEY);
            }catch(error)
            {
                return null
            }
    },
    check_authorization_header: (req,res,next)=>{
        if(!req.headers.authorization)
        {
            res.statusCode = 403;
            return res.json({error: "forbideen", message:"not authorized", reason: "not authorized"});
        }
        next();
    },
    sendmail: async(email,subject,template)=>{
        try{

        let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "ankushfake2681@gmail.com", 
              pass: "t6B3PIyFg71v8nbp",
            },
          });

          let info = await transporter.sendMail({
            from: '"Piet College" <info@piet.co.in>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            // text: "Hello world?", // plain text body
            html: template, // html body
          });

          console.log("Message sent: %s", info.messageId);
        }catch(error)
        {
            console.log("send email error", error)
        }
    },
}