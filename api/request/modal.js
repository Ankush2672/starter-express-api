const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqSchema = new Schema({
  username: String,
  roll_no: String,
  department: String,
  name: String,
  receipt: String,
  role:{
      type : Number,
      enum : [1,2,3,4,5]
  },
  mobile_no: String,
  email : String,
  route_id: {
    type : 'ObjectId',
    ref: 'routes'
  },
  stop_id: {
    type : 'ObjectId',
    ref: 'stops'
  },
  request:{
    type : String,
    enum: ["Creation","Updation"]
  } ,
  status:{
    type : String,
    enum: ["Pending","Approved","Rejected"],
    default:"Pending",
  },
});

const reqModal = mongoose.model('requests', reqSchema);

module.exports = {
  name: 'requests',
  modal: reqModal
};