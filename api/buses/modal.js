const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busSchema = new Schema({
  username: String ,
  password: String,
  profileUrl: String,
  rooms: [],
  friends: []
});

const busModal = mongoose.model('buses', busSchema);

module.exports = {
  name: 'buses',
  modal: busModal
};