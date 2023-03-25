const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stopSchema = new Schema({
  username: String ,
  password: String,
  profileUrl: String,
  rooms: [],
  friends: []
});

const stopModal = mongoose.model('stops', stopSchema);

module.exports = {
  name:'stops',
  modal: stopModal
};