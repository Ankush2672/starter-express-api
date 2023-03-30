const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stopSchema = new Schema({

  stop_name : String,
  timing : String,
  stop_route: {
    type : 'ObjectId',
    ref: 'routes'
  },
});

const stopModal = mongoose.model('stops', stopSchema);

module.exports = {
  name:'stops',
  modal: stopModal
};