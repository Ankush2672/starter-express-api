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
    id_card: async(req,res)=>{
        
        try{
            let token_data = await Common_service.jwt_verify_token(req.headers.authorization);

            if(!token_data || token_data.role !== config.roles.student)
            {
                res.statusCode = 403;
                return res.json({error: "forbideen", message:"not authorized", reason: "not authorized"});
            }

            let user_details = await modals.users.findOne({_id: token_data.id}).select('-password').populate('route_id').populate('stop_id');
            user_details = JSON.parse(JSON.stringify(user_details));
            let id_card_payload = {
                name: user_details.name,
                roll_no: user_details.roll_no,
                department: user_details.department,
                mobile: user_details.mobile_no,
                email: user_details.email,
                stop: user_details?.stop_id?.stop_name,
                route: {
                    route_no: user_details?.route_id?.route_no,
                    route_name: user_details?.route_id?.route_name
                },
                validity: user_details.validity,
                fee_status : user_details.fee_status,
                profile : user_details.profileUrl
            }
            let bus_details = null;
            if(user_details?.route_id?._id)
            {
                 bus_details = await modals.buses.findOne({bus_route : user_details.route_id._id});
                bus_details = JSON.parse(JSON.stringify(bus_details));
            }

            if(bus_details)
            {
                id_card_payload.bus_details = {
                    no : bus_details.bus_no,
                    number_plate: bus_details.bus_number_plate,
                    type : bus_details.bus_type
                }
            }

                res.statusCode = 200;
            return res.json(id_card_payload);


        }catch(error)
        {
            console.log("Id_card error",error);
            res.statusCode= 500;
            return res.json({error : "internal server error",message: "internal server error", reason: error});
        }
    },
}