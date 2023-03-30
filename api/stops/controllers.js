const modals = require('../../config').modals;
const Common_service = require('../../services/commonServices');
const config = require('../../config');

module.exports = {
  add_new_stop: async (req, res) => {
    try {

      let token_data = await Common_service.jwt_verify_token(
        req.headers.authorization
      );

      if ((!token_data) || ((token_data.role !== config.roles.transportIncharge) && (token_data.role !== config.roles.busIncharge))){
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

      let check_duplicate_stop = await modals.stops.findOne({
        stop_name: req.body.stop_name,
      });
      if (check_duplicate_stop) {
        res.statusCode = 400;
        return res.json({
          error: "Bad Request",
          message: "Stop already exists",
          reason: "Stop already exists",
        });
      }

      await modals.stops.create(req.body);
      res.statusCode = 201;
      return res.send({ message: "New Stop Created successfully" });
    } catch (error) {

      console.log("add new stop error : ", error);
      res.statusCode = 500;
      return res.json({
        error: "internal server error",
        message: "internal server error",
        reason: error,
      });
    }
  },
  get_all_stops: async (req, res) => {
    try {
      let stops = await modals.stops.find({});
      res.send(stops);
    } catch (error) {
      console.log("Fetching bus stop error", error);
    }
  },
  get_stop_by_route_id: async (req, res) => {
    try {
      let route_id = req.body.route_id
      let stops = await modals.stops.find({stop_route:route_id});
      res.send(stops);
    } catch (error) {
      console.log("Fetching bus stop error", error);
    }
  },
};
