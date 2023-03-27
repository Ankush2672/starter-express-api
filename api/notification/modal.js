const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notification_schema = new Schema({
  message: String ,
  createdBy: {
    type : 'ObjectId',
    ref: 'users'
  },
  created_time: Date,
  routes : [{
    type : 'ObjectId',
    ref : 'routes'
  }],
  start_date: Date,
  expiry_time: Date,
});

const notificationModal = mongoose.model('notifications', notification_schema);

module.exports = {
  name: 'notifications',
  modal: notificationModal
};