const router = require('express').Router();
const {add_new_stop,get_all_stops,get_stop_by_route_id} = require('./controllers');

router.post('/addnewstop',add_new_stop);
router.get('/getallstops',get_all_stops);
router.post('/getstopbyrouteid',get_stop_by_route_id);
module.exports = router;