var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var users = new Schema({
  username: {
    type: String,
    required: true,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
  	type: String,
  	required: true
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});
exports.users = mongoose.model('users' , users);