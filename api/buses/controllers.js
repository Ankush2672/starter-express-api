const modals = require('../../config').modals;
const Common_service = require('../../services/commonServices');
const config = require('../../config');

module.exports = {

    add_new_bus: async (req, res) => {

        try {
    
            let token_data = await Common_service.jwt_verify_token(
              req.headers.authorization
            );
      
            if (!token_data || token_data.role !== config.roles.transportIncharge){
              res.statusCode = 403;
              return res.json({
                error: "forbidden",
                message: "not authorized",
                reason: "not authorized",
              });
            }
      
            let body = req.body;
            Object.keys(body).forEach((key) => {
              if (body[key] === null || body[key] === "") {
                res.statusCode = 400;
                return res.json({
                  error: "Invalid Credentials",
                  message: "Invalid Credentials",
                  reason: "Invalid Credentials",
                });
              }
            });
      
            let check_duplicate_bus = await modals.buses.findOne({bus_number_plate: req.body.bus_number_plate});
            if (check_duplicate_bus) {
              res.statusCode = 400;
              return res.json({error: "Bad Request",message: "Bus already exists",reason: "Bus already exists",});
            }

            let check_duplicate_driver = await modals.buses.findOne({driver_id: req.body.driver_id});
            if (check_duplicate_driver) {
              res.statusCode = 400;
              return res.json({error: "Bad Request",message: "Driver already assigned",reason: "Driver already assigned",});
            }

            await modals.buses.create(req.body);
            res.statusCode = 201;
            return res.send({ message: "New Bus Added successfully" });
          } catch (error) {
      
            console.log("add new bus error : ", error);
            res.statusCode = 500;
            return res.json({
              error: "internal server error",
              message: "internal server error",
              reason: error,
            });
          }
    },
    get_all_buses: async (req, res) => {
        try {
          let buses = await modals.buses.find({});
          res.send(buses);
        } catch (error) {
          console.log("Fetching bus error", error);
        }
      },
    get_buses_by_route_id: async (req, res) => {
        try {
          let route_id = req.body.bus_route
          let buses = await modals.buses.find({bus_route:route_id});
          res.send(buses);
        } catch (error) {
          console.log("Fetching bus error", error);
        }
      },
};