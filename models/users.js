const mongoose = require('mongoose');
const  Schema  =  mongoose.Schema;

const  userSchema = new Schema({
  first_name: { type: String, required:  true },
  last_name: { type: String, required:  true },
  email: { type: String, required:  true },
  password: { type: String,  required: true },
  isAdmin: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now}
})

const User  = mongoose.model('User',  userSchema);

module.exports = User;