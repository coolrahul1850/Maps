var Listing = require('../models/listing').Listing;
var DataLoader = require('../test/dataloader');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.listings = function(req,res) {
	Listing.find(function(err,listings){
		res.send(listings);
	});
};

exports.addListings = function(req,res) {
	var file = JSON.parse(require('fs').readFileSync('test/data.json','utf-8'));
	DataLoader.loadFromFile(file);
	res.send('added %s items',DataLoader.added);
};