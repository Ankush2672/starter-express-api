const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busSchema = new Schema({
  bus_no: String ,
  driver_id: String,
  bus_type: {
    type: String,
    enum: ["Ac","Non_Ac"]
  },
  bus_number_plate: String,
});

const busModal = mongoose.model('buses', busSchema);

module.exports = {
  name: 'buses',
  modal: busModal
};