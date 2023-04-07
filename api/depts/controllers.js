const modals = require("../../config").modals;
const Common_service = require("../../services/commonServices");
const config = require("../../config");

module.exports = {
  add_dept: async (req, res) => {
    try {
      let token_data = await Common_service.jwt_verify_token(
        req.headers.authorization
      );

      if (!token_data || token_data.role !== config.roles.superAdmin) {
        res.statusCode = 403;
        return res.json({
          error: "forbidden",
          message: "not authorized",
          reason: "not authorized",
        });
      }

      if (req.body.dept_name === null || req.body.dept_name === "") {
        res.statusCode = 400;
        return res.json({
          error: "Invalid Credentials",
          message: "Invalid Credentials",
          reason: "Invalid Credentials",
        });
      }

      let check_duplicate_dept = await modals.depts.findOne({
        dept_name: req.body.dept_name,
      });
      if (check_duplicate_dept) {
        res.statusCode = 400;
        return res.json({
          error: "Bad Request",
          message: "Department already exists",
          reason: "Department already exists",
        });
      }

      await modals.depts.create(req.body);
      res.statusCode = 201;
      return res.send({ message: "Department Added successfully" });
    } catch (error) {
      console.log("add new department error : ", error);
      res.statusCode = 500;
      return res.json({
        error: "internal server error",
        message: "internal server error",
        reason: error,
      });
    }
  },
  get_dept: async (req, res) => {
    try {
      let depts = await modals.depts.find();
      res.statusCode = 200;
      return res.send(depts);
    } catch (error) {
      console.log("Fetching dept error", error);
      return res.json({
        error: "internal server error",
        message: "internal server error",
        reason: error,
      });
    }
  },
};
