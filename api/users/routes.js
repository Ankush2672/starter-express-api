const router = require('express').Router();
const {get_drivers} = require('./controllers');
const {check_authorization_header} = require('../../services/commonServices');

router.get('/drivers',check_authorization_header,get_drivers);

module.exports = router;