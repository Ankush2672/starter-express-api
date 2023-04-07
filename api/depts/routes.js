const router = require('express').Router();
const {add_dept,get_dept} = require('./controllers');

router.post('/adddept',add_dept);
router.get('/getdept',get_dept);

module.exports = router;