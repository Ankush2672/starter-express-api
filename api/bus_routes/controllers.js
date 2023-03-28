const modals = require('../../config').modals;
const Common_service = require('../../services/commonServices');
const config = require('../../config');

module.exports = {
    add_bus_route: async (req,res)=>{

        try{

            let token_data = await Common_service.jwt_verify_token(req.headers.authorization);
                if(!token_data || token_data.role !== config.roles.transportIncharge)
                {
                    res.statusCode = 403;
                    return res.json({error: "forbidden", message:"not authorized", reason: "not authorized"});
                }
                
                let body = req.body
                Object.keys(body).forEach(key => {
                    if(body[key]===null||body[key]==='')
                    {
                        res.statusCode = 400;
                        return res.json({error: "Invalid Credentials", message:"Invalid Credentials", reason: "Invalid Credentials"});
                    }
                });
            
                let check_duplicate_route = await modals.routes.findOne({route_name: req.body.route_name});
                if(check_duplicate_route)
                {
                    res.statusCode = 400;
                    return res.json({error: "Route already exists", message:"Route already exists", reason: "Route already exists"});
                }

                let check_duplicate_route_no = await modals.routes.findOne({route_no: req.body.route_no});
                if(check_duplicate_route_no)
                {
                    res.statusCode = 400;
                    return res.json({error: "Route No already exists", message:"Route No already exists", reason: "Route No already exists"});
                }

                let check_duplicate_bus_incharge = await modals.routes.findOne({bus_incharge: req.body.bus_incharge});
                if(check_duplicate_bus_incharge)
                {
                    res.statusCode = 400;
                    return res.json({error: "Incharge already assigned", message:"Incharge already assigned", reason: "Incharge already assigned"});
                }
                await modals.routes.create(req.body);
                
                res.statusCode = 201;
                return res.send({message : "New Route Created successfully"});

        }catch(error)
        {
            console.log("add bus route error : ",error);
            res.statusCode = 500;
            return res.json({error : "internal server error",message: "internal server error", reason: error});
        }
        
    },
    get_bus_route: async (req,res)=>{

        try{

            let bus_routes = await modals.routes.find({});
            res.send(bus_routes);
        }catch(error)
        {
            console.log("get bus route error", error);
        }
        
    },
    update_bus_incharge: async (req,res)=>{

        try{
            
            let token_data = await Common_service.jwt_verify_token(req.headers.authorization);
                if(!token_data || token_data.role !== config.roles.transportIncharge)
                {
                    res.statusCode = 403;
                    return res.json({error: "forbidden", message:"not authorized", reason: "not authorized"});
                }

                let newbusincharge = req.body.new_bus_incharge;
                let check_duplicate_bus_incharge = await modals.routes.findOne({bus_incharge: newbusincharge});
                if(check_duplicate_bus_incharge)
                {
                    res.statusCode = 400;
                    return res.json({error: "Incharge already assigned", message:"Incharge already assigned", reason: "Incharge already assigned"});
                }
                
                let routename = req.body.route_name
                let bus_routes = await modals.routes.findOneAndUpdate({route_name: routename},{bus_incharge:newbusincharge});
                if(!bus_routes)
                {
                    res.statusCode = 400;
                    return res.json({error: "Bad Request", message:"Update failed", reason: "Update failed"});
                }
                res.send("Updated Successfully");
        }catch(error)
        {
            console.log("update bus incharge error", error);
        }
        
    },
    update_bus_price: async (req,res)=>{
        try{
            let token_data = await Common_service.jwt_verify_token(req.headers.authorization);
                if(!token_data || token_data.role !== config.roles.transportIncharge)
                {
                    res.statusCode = 403;
                    return res.json({error: "forbidden", message:"not authorized", reason: "not authorized"});
                }
                
            let bus_routes = await modals.routes.findOneAndUpdate({route_name: req.body.route_name},{price_ac: req.body.price_ac,price_non_ac: req.body.price_non_ac});
                if(!bus_routes)
                {
                    res.statusCode = 400;
                    return res.json({error: "Bad Request", message:"Update failed", reason: "Update failed"});
                }
                res.send("Updated Successfully");
        }catch(error)
        {
            console.log("update bus incharge error", error);
        }
        
    },
}
