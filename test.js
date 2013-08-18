var Listing = require('./models/listing').Listing;
var mongoose = require('mongoose');


var x = function() {
	Listing.count({}, function(err,count) {
		console.log('count %d %s',count,err);
	});

};

// var add = function(cb) {
// 	new Listing({
// 		externalid: '1'
// 	}).save(function(err){
// 		console.log(err);
// 		cb(err);
// 	});					
// };


mongoose.connect('mongodb://localhost:27017/db');
// add(function(err){
// 	console.log(err);
// });
x();






