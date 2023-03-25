const router = require('express').Router();
const {login,signup} = require('./controllers');
const {check_authorization_header} = require('../../services/commonServices');

router.post('/login',login);
router.post('/signup',check_authorization_header,signup);

module.exports = router;