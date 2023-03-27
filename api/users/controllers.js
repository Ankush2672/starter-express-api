const modals = require('../../config').modals;
const Common_service = require('../../services/commonServices');
const config = require('../../config');

module.exports = {
    get_drivers: async (req,res)=>{
        try{

        let token_data = await Common_service.jwt_verify_token(req.headers.authorization);

                if(!token_data || token_data.role > config.roles.transportIncharge)
                {
                    res.statusCode = 403;
                    return res.json({error: "forbideen", message:"not authorized", reason: "not authorized"});
                }

                let driver_details = await modals.users.find({role : config.roles.driver}).select('-password');

                res.statusCode = 201;
                res.json(driver_details);

            }catch(error)
            {
                console.log("get driver details error",error)
                res.statusCode= 500;
                return res.json({error : "internal server error",message: "internal server error", reason: error})
            }

    },
    update_password: async(req,res)=>{
        try{
        let token_data = await Common_service.jwt_verify_token(req.headers.authorization);

        if(!token_data)
        {
            res.statusCode = 403;
            return res.json({error: "forbideen", message:"not authorized", reason: "not authorized"});
        }
        if(!req.body.password)
        {
            res.statusCode = 400;
            return res.json({error: "invalid Json object", message:"Either username and password is missing", reason: "Either username and password is missing"})
        }

        await modals.users.updateOne({_id : token_data.id},{password: req.body.password});

        res.statusCode = 200;
        return res.json({message : "password updated Successfully"});

    }catch(error)
    {
        console.log("update password error",error)
        res.statusCode= 500;
        return res.json({error : "internal server error",message: "internal server error", reason: error})
    }

    },
    get_details : async(req,res)=>{
        try{
        let token_data = await Common_service.jwt_verify_token(req.headers.authorization);

        if(!token_data)
        {
            res.statusCode = 403;
            return res.json({error: "forbideen", message:"not authorized", reason: "not authorized"});
        }

        let details = await modals.users.findOne({_id: token_data.id}).select('-password').populate('route_id').populate('stop_id');

        res.statusCode = 200;
        return res.json(details);

    }catch(error)
    {
        console.log("get details error",error)
        res.statusCode= 500;
        return res.json({error : "internal server error",message: "internal server error", reason: error})
    }

    },
}