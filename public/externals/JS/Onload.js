
var map;
var previousZoom = 1000;
var previousBoundsStr;

function getListings() {
	if(previousZoom >= map.getZoom()) {
		console.log(map.getBounds().toString());
		$.getJSON("http://findall.aws.af.cm/listings/all?curr="+map.getBounds().toUrlValue()+"&prev="+previousBoundsStr+"&zoom="+map.getZoom(),function(result){
			previousZoom = map.getZoom();

			$.each(result,function(i,field)
			{
				var marker = new google.maps.Marker({position: new google.maps.LatLng(field.l.coordinates[1], field.l.coordinates[0]),map: map,title: 'Click me'});
				var infowindow = new google.maps.InfoWindow({content: field.title + " cost is" + field.price});
				google.maps.event.addListener(marker, 'click', function() {	infowindow.open(map, marker);});
			});
		});
	}
}

function Onload()
{
	
	var options = {
		zoom: 12,
		center: new google.maps.LatLng(37.775196, -122.419204),
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};

	map = new google.maps.Map(document.getElementById('map'), options);
	google.maps.event.addListener(map, 'idle', getListings);
}

