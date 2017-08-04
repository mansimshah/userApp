var userModel = require('../models/user');
var USER_COLLECTION = userModel.users;
var bcrypt = require('bcryptjs');
var common = require('./common');

exports.register	= _register;
exports.login = _login;

function _register(req, res, next){

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

	common.saltAndHash(req, res, password, function(endryptedPassword){
   		newUser.password = endryptedPassword;
	});

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

}

function _login(req, res, next){
	var email = req.body.email;
	var password = req.body.password;
	var json={};

	USER_COLLECTION.findOne({"email" : email}, function(error, user) {
		console.log("User==" + user);
		if (error || !user){
			json.status = '0';
			json.result = {'Error': "User not found."};
			res.send(json);
		}else{
			common.validatePassword(req, res, req.body.password, user.password, function(err, result){
				console.log("result==="+result);
				var token = common.generateToken(email);
				console.log("token===="+token);
				if (result){
					json.status = '1';
					json.result = {'Message': "You are logged in successfully.", 'Token': token};
					res.send(json);
				}else{
					json.status = '0';
					json.result = {'Error': "Incorrect Password."};
					res.send(json);
				}
			});
		}	
   	});
}