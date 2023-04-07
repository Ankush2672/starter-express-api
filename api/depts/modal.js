const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptSchema = new Schema({
  dept_name: String ,
});

const deptModal = mongoose.model('depts', deptSchema);

module.exports = {
  name: 'depts',
  modal: deptModal
};