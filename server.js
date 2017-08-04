var express     = 	   require('express');
var http 	    = 	   require('http');
var bodyParser  =      require('body-parser');
var jsonParser  =      bodyParser.json();
var logger      =      require('morgan');
var mongoose    =      require('mongoose');
var database    =      require('./config/database'); 	// Get configuration file
var app         =      express();

//Connection with Database
mongoose.connect(database.url);
var db = mongoose.connection;

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser());

var user = require('./routes/user');
var product = require('./routes/product');
var common = require('./routes/common');

/*---------------------------User Routes------------------------------*/
app.post('/register', user.register);
app.post('/login', user.login);

/*---------------------------Product Routes------------------------------*/
app.post('/createProduct', common.isUserValid, product.createProduct);
app.put('/updateProduct/:productId', common.isUserValid, product.updateProduct);
app.get('/allProducts', common.isUserValid, product.allProducts);
app.delete('/deleteProduct/:productId', common.isUserValid, product.deleteProduct);
app.get('/showProduct/:productId', common.isUserValid, product.showProduct);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});