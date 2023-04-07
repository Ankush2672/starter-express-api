const modals = require("../../config").modals;
const Common_service = require("../../services/commonServices");
const config = require("../../config");
const { raw } = require("express");

module.exports = {
  add_req: async (req, res) => {
    try {

      if(!(req.body.roll_no || (req.body.username && req.headers.authorization)))
      {
        res.statusCode = 400;
        return res.json({error: "Bad Request",message: "roll_no or username is required",reason: "roll_no or username is required",});
      }

      if(req.headers.authorization){
      let token_data = await Common_service.jwt_verify_token(
        req.headers.authorization
      );
          if (!token_data ) {
            res.statusCode = 403;
            return res.json({
              error: "forbidden",
              message: "not authorized",
              reason: "not authorized",
            });
          }
        
      if(token_data.username !== req.body.username)
      {
        res.statusCode = 403;
        return res.json({
          error: "forbidden",
          message: "not authorized",
          reason: "not authorized",
        });
      }

       let check_duplicate = await modals.requests.findOne({username: req.body.username, status : "Pending"});

       if(check_duplicate)
       {
        res.statusCode = 400;
        return res.json({error: "Bad Request",message: "pending  request already exists",reason: "pending request lready exists",});

       }
        req.body.request = "Updation";
      }


      if(req.body.roll_no){
          let check_duplicate_user = await modals.users.findOne({roll_no: req.body.roll_no});
            if (check_duplicate_user && req.body.request==="Creation") {
              res.statusCode = 400;
              return res.json({error: "Bad Request",message: "Account already exists",reason: "Account already exists",});
             }

             let check_duplicate = await modals.requests.findOne({roll_no: req.body.roll_no, status : "Pending"});

              if(check_duplicate)
              {
                res.statusCode = 400;
                return res.json({error: "Bad Request",message: "pending  request already exists",reason: "pending request lready exists",});
              }
              req.body.request = "Creation";
          }
    if(!req.file.location)
    {
      res.statusCode = 400;
      return res.json({error: "Bad Request",message: "image not uploaded successfully",reason: "image not uploaded successfully",});
    }

    req.body.receipt = req.file.location;
    await modals.requests.create(req.body);
      res.statusCode = 201;
      return res.send({ message: "Request Created successfully" });
    } catch (error) {
      console.log("request creation error : ", error);
      res.statusCode = 500;
      return res.json({
        error: "internal server error",
        message: "internal server error",
        reason: error,
      });
    }
  },
  get_all_req: async (req, res) => {
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
        let requests = await modals.requests.find({});
        res.send(requests);
      } catch (error) {
        console.log("Fetching requests error", error);
      }
  },
  get_req_by_type: async (req, res) => {
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

        let query_payload = {
          status : req.query.status || "Pending",
        }
        if(req.query.request){
          query_payload.request = req.query.request
        }
        if(req.query.department)
        {
          query_payload.department = req.query.department
        }
        console.log(query_payload);
        let requests = await modals.requests.find(query_payload);
        res.send(requests);
      } catch (error) {
        console.log("Fetching requests error", error);
        res.statusCode = 500;
      return res.json({
        error: "internal server error",
        message: "internal server error",
        reason: error,
      });
      }
  },
 
};
