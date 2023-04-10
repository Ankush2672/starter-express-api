const modals = require('../../config').modals;
const Common_service = require('../../services/commonServices');
const config = require('../../config');
const emailTemplate = require('../../templates/emailTemplate');
module.exports = {
    post_notification : async(req,res)=>{
        try{
        let token_data = await Common_service.jwt_verify_token(req.headers.authorization);

                if(!token_data || token_data.role === config.roles.student)
                {
                    res.statusCode = 403;
                    return res.json({error: "forbiden", message:"not authorized", reason: "not authorized"});
                }
                let expiry_date = new Date(req.body.expiry_time);
                req.body.expiry_time = expiry_date.setDate(expiry_date.getDate()+1);
                req.body.createdBy = token_data.id;
                req.body.created_time = Date.now();

                    let users= []
                    let routes= req.body.routes;
                    if(!routes)
                    {
                        users = await modals.users.find({})
                    }
                    else
                    {
                        users = await modals.users.find({route_id : routes})
                    }
                    const emails = users.map(user => user.email);
                    if(emails)
                    {
                        let email_template = emailTemplate.notify(req.body.message);
                        let subject = config.emailSubject.notify_user;
                        await Common_service.sendmail(emails,subject,email_template);
                    }
                await modals.notifications.create(req.body);

                res.json({message : "Notification posted Successfully"});

            }catch(error)
            {
                console.log("post notification error",error);
                res.statusCode = 500;
                return res.json({error : "internal server error",message: "internal server error", reason: error});
            }

    },
    get_notification : async(req,res)=>{
        try{


        let notification = await modals.notifications.find({expiry_time: {$gt: Date.now()}}).sort('-created_time').populate('routes').populate('createdBy');

        let data = JSON.parse(JSON.stringify(notification))

         data.map((ele)=>{
            delete ele.createdBy.password;
         })

        return res.json(data);
        }catch(error)
        {
            console.log("get notification error",error);
            res.statusCode = 500;
            return res.json({error : "internal server error",message: "internal server error", reason: error});
        }
    }
}