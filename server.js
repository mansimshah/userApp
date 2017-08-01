// var express = require('express'),
// app = express(),
// port = process.env.PORT || 3000,
// mongoose = require('mongoose'),

// bodyParser = require('body-parser');
  
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Userdb'); 

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var routes = require('./routes/user');
// routes(app);

// /*---------------------------User Routes------------------------------*/
// app.post('/adduser',user.adduser);

// app.listen(port);

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

// console.log('todo list RESTful API server started on: ' + port);

/*
*	Module dependencies
*/
var express     = 	   require('express');
var http 	    = 	   require('http');
var bodyParser  =      require('body-parser');
var jsonParser  =      bodyParser.json();
var logger      =      require('morgan');
var mongoose    =      require('mongoose');
var database    =      require('./config/database'); 	// Get configuration file
// var static      =      require( 'serve-static' );
var app         =      express();
// var session 	= 	   require('client-sessions');
var https 		= 		require('https');


//Connection with Database
mongoose.connect(database.url);
var db = mongoose.connection;

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser());

var user = require('./routes/user');

/*---------------------------User Routes------------------------------*/
app.post('/register', user.adduser);
app.get('/testuser', user.testuser);


http.createServer(app).listen(app.get('port'), function(){
// http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

