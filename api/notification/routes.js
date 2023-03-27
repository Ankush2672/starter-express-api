const router = require('express').Router();
const {post_notification,get_notification} = require('./controllers');
const {check_authorization_header} = require('../../services/commonServices');


router.post('/postnotification',check_authorization_header,post_notification);
router.get('/getnotification',get_notification);

module.exports = router;