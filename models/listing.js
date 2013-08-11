var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ListingSchema = new Schema({
		externalid: {
			type: String,
			index: true
		},
		title : String,
		price : Number,
		bedrooms : String,
		currency : String,
		loc : Array
});

ListingSchema.index({loc:'2d'});

var Listing = mongoose.model('Listing', ListingSchema);

module.exports.Listing = Listing;
module.exports.ListingSchema = ListingSchema;