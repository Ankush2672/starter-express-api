const router = require('express').Router();
const {add_bus_route,get_bus_route,update_bus_incharge,update_bus_price} = require('./controllers');

router.post('/addbusroute',add_bus_route);
router.get('/getbusroute',get_bus_route);
router.put('/updatebusincharge',update_bus_incharge);
router.put('/updatebusprice',update_bus_price);

module.exports = router;