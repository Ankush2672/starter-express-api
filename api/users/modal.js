const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: String,
  password: String,
  roll_no: String,
  department: String,
  name: String,
  profileUrl: String,
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
  fee_status:{
    type: String,
    enum: ["Paid","Unpaid"]
  },
  validity:{
    type: String,
  }
});

userSchema.pre('save', function(next) {
  console.log("in");
  var user = this;

  // only hash the password if it has been modified (or is new)
   if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});
userSchema.pre('updateOne', function(next) {
  var user = this;
  //console.log();

  // only hash the password if it has been modified (or is new)
  if(!user._update.password)
  {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user._update.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user._update.password = hash;
          next();
      });
  });
});
   
userSchema.methods.comparePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const userModal = mongoose.model('users', userSchema);

module.exports = {
  name: 'users',
  modal: userModal
};