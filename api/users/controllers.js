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
                res.json({error : "internal server error",message: "internal server error", reason: error})
            }

    },
}