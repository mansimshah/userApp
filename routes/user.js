// var express = require('express');
// var router = express.Router();

var User = require('../models/user');

exports.adduser	= _adduser;
exports.testuser = _testuser;

function _adduser(req, res, next){

// var _adduser = router.post('/register', function(req, res){

	var username = req.body.username;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	// validation
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('password', 'Password is not valid').notEmpty();
	// req.checkBody('password2', 'Password do not match').equals(req.body.password);

	// var errors = req.validationErrors();

	// if(error){
	// 	json.status='0';
	// 	json.result={'error':'Error In Adding New User'};
	// 	res.send(json);
	// }else {
	// 	var newUser = new User({
	// 		username: username,
	// 		email: email,
	// 		password: password
	// 	});

	// 	User.createUser(newUser, function(err, user){
	// 		if(err) throw err;
	// 		console.log(user);
	// 	});
	// }

	var newUser = new User({
			username: username,
			email: email,
			password: password
		});

	User.createUser(newUser, function(err, user){
		if(err) throw err;
		console.log(user);
	});

}

function _testuser(req, res, next){
	console.log("in testuser function");
	res.send({"test":"testing"});
}
