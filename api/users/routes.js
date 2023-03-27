const router = require('express').Router();
const {get_drivers,update_password,get_details} = require('./controllers');
const {check_authorization_header} = require('../../services/commonServices');

router.get('/drivers',check_authorization_header,get_drivers);
router.put('/updatepassword',check_authorization_header,update_password);
router.get('/getdetails',check_authorization_header,get_details)

module.exports = router;