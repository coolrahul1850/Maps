function Onload()
{
	
	var options = {
		zoom: 12,
		center: new google.maps.LatLng(37.775196, -122.419204),
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};

	var map = new google.maps.Map(document.getElementById('map'), options);
	


	// Load the data from all the listings

		$.getJSON("http://findall.aws.af.cm/listings",function(result){
				$.each(result,function(i,field)
				{
					var temp = String(field.loc);
					var temp1 = temp.split(",");
					//console.log(temp1[1]);
	//				console.log(field.title + field.price);
					var marker = new google.maps.Marker({position: new google.maps.LatLng(temp1[1], temp1[0]),map: map,title: 'Click me'});
					var infowindow = new google.maps.InfoWindow({content: field.title + " cost is" + field.price});
					google.maps.event.addListener(marker, 'click', function() {	infowindow.open(map, marker);});
				});
		});

}