const router = require('express').Router();
const {add_req,get_all_req,get_req_by_type,reject_req,approve_request} = require('./controllers');
const {check_authorization_header} = require('../../services/commonServices');

router.post('/addreq',add_req);
router.get('/getallreq',check_authorization_header,get_all_req);
router.get('/getrequest',check_authorization_header,get_req_by_type);
router.post('/rejectrequest',check_authorization_header,reject_req);
router.post('/approverequest',check_authorization_header,approve_request)
module.exports = router;