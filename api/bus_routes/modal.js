const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bus_routeSchema = new Schema({
  username: String ,
  password: String,
  profileUrl: String,
  rooms: [],
  friends: []
});

const bus_routeModal = mongoose.model('routes', bus_routeSchema);

module.exports = {
  name: 'routes',
  modal: bus_routeModal
}