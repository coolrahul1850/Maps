var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Listing = require('../models/listing').Listing,
	async = require('async');

var added=0;

function loadFromFile(file)
{
	async.each(file,
		function(item,callback){
			Listing.findOne({externalid:item.id},function(err,res){
				if(!res){
					new Listing({
						externalid : item.id,
						title : item.title,
						price : item.price.length > 0 ? parseFloat(item.price.substring(1)) : 0,
						currency : '$',
						loc : [parseFloat(item.longitude), parseFloat(item.latitude)]
					}).save(function(err){
						if(!err) ++added;
						callback(err);	
					});
				}
				else callback(err); 
			});
		},
		function(err){
			console.log(err? err: "items added :"+added);
	});
}

// if(process.argv[2]) {
// 	mongoose.connect(process.env.mongourl || 'mongodb://localhost:27017/db');
// 	var file = JSON.parse(require('fs').readFileSync(process.argv[2],'utf-8'));
// 	loadFromFile(file);
// }

exports.loadFromFile = loadFromFile;
exports.added = added;
