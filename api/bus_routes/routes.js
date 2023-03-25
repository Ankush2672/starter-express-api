const router = require('express').Router();
const {add_bus_route,get_bus_route} = require('./controllers');

router.post('/',add_bus_route);
router.get('/',get_bus_route);

module.exports = router;