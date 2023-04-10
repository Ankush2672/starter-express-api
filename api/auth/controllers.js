const modals = require('../../config').modals;
const Common_service = require('../../services/commonServices');
const config = require('../../config');
const emailTemplate = require('../../templates/emailTemplate');

module.exports = {
    login: async(req,res) =>{
            try{
            let username = req.body.username;
            let password = req.body.password;

            let user_exist = await modals.users.findOne({username});

            if(!user_exist)
            {
                res.statusCode = 400;
                return res.json({error : "bad Request", message: "invalid Credentials", reason: "invalid credentials"});
            }
            let password_check = await user_exist.comparePassword(password);
            if(!password_check)
            {
                res.statusCode = 400;
                return res.json({error : "bad Request", message: "invalid Credentials", reason: "invalid credentials"});
            }
            let token_payload = {
                id: user_exist._id,
                role: user_exist.role,
                name: user_exist.name,
                username: user_exist.username
            }
            let auth_token = await Common_service.jwt_Sign_token(token_payload);

            let res_payload={
                auth_token,
                name: user_exist.name,
                username: user_exist.username,
                role: user_exist.role,
                mobile_no: user_exist.mobile_no,
                roll_no: user_exist.roll_no,
                route_id: user_exist.route_id,
                stop_id: user_exist.stop_id,
                fee_status: user_exist.fee_status,
                validity: user_exist.validity,
            }

            res.statusCode = 200;
            return res.json(res_payload);

        }catch(error)
        {
            console.log("login error",error)
            res.statusCode = 500;
        return res.json({error : "internal server error",message: "internal server error", reason: error});
        }

    },
    signup: async(req,res) =>{
        try{

             let token_data = await Common_service.jwt_verify_token(req.headers.authorization);

                if(!token_data || token_data.role !== config.roles.superAdmin)
                {
                    res.statusCode = 403;
                    return res.json({error: "forbideen", message:"not authorized", reason: "not authorized"});
                }
                if(req.body.role === config.roles.student)
                {
                    req.body.username = req.body.roll_no;
                }
                
                if(!req.body.username || !req.body.password)
                {
                    res.statusCode = 400;
                    return res.json({error: "invalid Json object", message:"Either username and password is missing", reason: "Either username and password is missing"});
                }

                let check_duplicate = await modals.users.findOne({username: req.body.username});
                if(check_duplicate)
                {
                    res.statusCode = 400;
                    return res.json({error: "User already exists", message:"user already exists", reason: "user already exists"});
                }
                if(req.body.validity){
                let increase = req.body.validity * 183;
       
                let validity = new Date();
                req.body.validity= validity.setDate(validity.getDate()+ increase);
                }
                if(req.body.role == config.roles.student)
                {
                 req.body.fee_status = "Paid"
                }
                await modals.users.create(req.body);
                if(req.body.email)
                {
                    let email_template = emailTemplate.accountcreated(req.body.username,req.body.password,req.body.name);
                    let subject = config.emailSubject.transport_account_created;
                    await Common_service.sendmail(req.body.email,subject,email_template);
                }
            
                res.statusCode = 200;
                return res.send({message : "user Created successfully"});
        }catch(error)
        {
                console.log("signup error",error)
                res.statusCode = 500;
        return res.json({error : "internal server error",message: "internal server error", reason: error});
        }
    },
}