
var map;
var marker = new Array();
var content =  new Array();
var infowindow = new google.maps.InfoWindow();
var field = new Array();
var min;
function getListings() {
		

	console.log(map.getBounds().toString());
	$.getJSON("http://findall.aws.af.cm/listings/?box="+map.getBounds().toUrlValue(),function(result){
		$.each(result,function(i,temp)
		{
			field[i] = temp;
			marker[i] = new google.maps.Marker({position: new google.maps.LatLng(field[i].l.coordinates[1], field[i].l.coordinates[0]),map: map,title: 'Click me'});
			content[i] = field[i].title + " cost is" + field[i].price;
			google.maps.event.addListener(marker[i], 'click', function() {	infowindow.setContent(content[i]); infowindow.open(map, marker[i]);});
		});
	});



$(function() {
    $( "#slider-range" ).slider({range: true,min: 0,max: 15000,values: [ 0,15000 ],slide: function( event, ui ) 
    	{
        	$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1] );
        	for (var i = 0; i < marker.length; i++ ) 
        	{

				if (field[i].price >= ui.values[0] && field[i].price <= ui.values[1])
					marker[i].setMap(map);
				else
					marker[i].setMap(null);        		
  	 		}
  	 	
      	}

    	});
   $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 )  );
 			 });




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

