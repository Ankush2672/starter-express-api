const router = require('express').Router();
const {add_req,get_all_req,get_req_by_type} = require('./controllers');

router.post('/addreq',add_req);
router.get('/getallreq',get_all_req);
router.get('/getrequest',get_req_by_type);
module.exports = router;