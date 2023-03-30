const router = require('express').Router();
const {add_new_bus,get_all_buses,get_buses_by_route_id} = require('./controllers');

router.post('/addnewbus',add_new_bus);
router.get('/getallbuses',get_all_buses);
router.get('/getbusesbyrouteid',get_buses_by_route_id);

module.exports = router;