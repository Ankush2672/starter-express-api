const router = require('express').Router();
const {get_drivers,update_password} = require('./controllers');
const {check_authorization_header} = require('../../services/commonServices');

router.get('/drivers',check_authorization_header,get_drivers);
router.put('/updatepassword',check_authorization_header,update_password);

module.exports = router;