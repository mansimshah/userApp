var productModel = require('../models/product');
var PRODUCT_COLLECTION = productModel.products;
var mongodb = require('mongodb');

exports.createProduct = _createProduct;
exports.updateProduct = _updateProduct;
exports.allProducts = _allProducts;
exports.deleteProduct = _deleteProduct;
exports.showProduct = _showProduct;

function _createProduct(req, res, next){
    var product = new PRODUCT_COLLECTION(req.body);
    var json={};
    product.save(function(error, product) {
        if(error){
			json.status = '0';
			json.result = {'Error': error};
			res.send(json);
		}else{
			json.status = '1';
			json.result = {'Message': "Product "+ product.name + " is created successfully."};
			res.send(json);
		}
    });
}

function _updateProduct(req, res, next){
    var json={};
    PRODUCT_COLLECTION.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(error, product) {
        if(error){
			json.status = '0';
			json.result = {'Error': error};
			res.send(json);
		}else{
			json.status = '1';
			json.result = {'Message': "Product "+ product.name + " is updated successfully."};
			res.send(json);
		}
    });
}

function _allProducts(req, res, next){
    var json={};
    PRODUCT_COLLECTION.find({},{}, function(error, products) {
        if(error){
            json.status = '0';
            json.result = {'Error': error};
            res.send(json);
        }else{
            json.status = '1';
            json.result = {'products': products};
            res.send(json);
        }
    });
}

function _deleteProduct(req, res, next){
    var json={};
    PRODUCT_COLLECTION.deleteOne({_id: new mongodb.ObjectID(req.params.productId)}, function(error, product) {
        if(error){
            json.status = '0';
            json.result = {'Error': error};
            res.send(json);
        }else{
            if (JSON.parse(product).n == 0){
                json.status = '0';
                json.result = {'Message': "Product not found." };
                res.send(json);
            }else{
                json.status = '1';
                json.result = {'Message': "Product successfully deleted." };
                res.send(json);
            }
        }
    });
}

function _showProduct(req, res, next){
    var json={};
    PRODUCT_COLLECTION.findById(req.params.productId, function(error, product) {
        if(error){
            json.status = '0';
            json.result = {'Error': error};
            res.send(json);
        }else{
            json.status = '1';
            json.result = {'product': product };
            res.send(json);
        }
    });
}