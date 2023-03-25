require('dotenv').config();
const jwt = require('jsonwebtoken');
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
}