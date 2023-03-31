const router = require('express').Router();
const {get_drivers,update_password,get_details,id_card} = require('./controllers');
const {check_authorization_header} = require('../../services/commonServices');

router.get('/drivers',check_authorization_header,get_drivers);
router.put('/updatepassword',check_authorization_header,update_password);
router.get('/getdetails',check_authorization_header,get_details);
router.get('/idcard',check_authorization_header,id_card);

module.exports = router;