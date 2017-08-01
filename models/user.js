var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
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

module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}
