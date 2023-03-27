const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bus_routeSchema = new Schema({
  route_no: String,
  route_name: String,
  price_ac: String,
  price_non_ac: String,
  bus_incharge: {
    type : 'ObjectId',
    ref: 'users'
  }
});

const bus_routeModal = mongoose.model('routes', bus_routeSchema);

module.exports = {
  name: 'routes',
  modal: bus_routeModal
}