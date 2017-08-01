var userModel = require('../models/user');
var USER_COLLECTION = userModel.users;
var bcrypt = require('bcryptjs');

exports.adduser	= _adduser;
exports.testuser = _testuser;

function _adduser(req, res, next){

	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;
	var json={};

	var newUser = new USER_COLLECTION({
			username: username,
			email: email,
			password: password
	});

	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			newUser.password = hash;
			newUser.save(function(error, result){
				if(error){
					json.status = '0';
					json.result = {'Error': error};
					res.send(json);
				}else{
					json.status = '1';
					json.result = {'Message': "User "+ newUser.email + " is created successfully."};
					res.send(json);
				}
			});
		});
	});

}

function _testuser(req, res, next){
	console.log("in testuser function");
	res.send({"test":"testing"});
}