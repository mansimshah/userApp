var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var products = new Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
  	type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});
exports.products = mongoose.model('products' , products);