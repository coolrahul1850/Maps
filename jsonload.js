fs = require('fs');
var stringArray = [];


var readFromFile = function() {
	var data=fs.readFileSync('testdataSF.json');
	var par = JSON.parse(data.toString());
	for (var i=0; i< par.length; i++)
	{
		stringArray.push({
			id:par[i].id,
			lat:parseFloat(par[i].latitude),
			lng:parseFloat(par[i].longitude)
		});
	}

	console.log('read %s entries',stringArray.length);
}

var getLocationsInBounds = function(bounds) {
	var locations=[];
	for(var i=0;i<stringArray.length;i++) {
		var pt=stringArray[i];
		if(bounds.ne.lat>=pt.lat && pt.lat>=bounds.sw.lat) {
			if(bounds.ne.lng >= pt.lng && pt.lng >= bounds.sw.lng)
				locations.push(pt);
		}
	}
	// these results should be cached
	console.log('filtering %s results',locations.length);
	return locations;
}


readFromFile();
// this will be read from the web service call
var bounds=
{
	ne:{lat:37.80842772926481,lng:-122.2119140625},
	sw:{lat:37.75958708713444, lng:-122.67539978027342}
};

console.log(JSON.stringify(getLocationsInBounds(bounds)));
