const router = require('express').Router();
const {add_req,get_all_req,get_req_by_type,reject_req} = require('./controllers');

router.post('/addreq',add_req);
router.get('/getallreq',get_all_req);
router.get('/getrequest',get_req_by_type);
router.post('/rejectrequest',reject_req);
module.exports = router;