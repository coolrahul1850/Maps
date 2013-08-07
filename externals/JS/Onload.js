function Onload()
{
			var map = L.map('map').setView([37.775196, -122.419204], 13);
			L.tileLayer('http://{s}.tile.cloudmade.com/96fa52df8d57472cb31113cc430d8d30/997/256/{z}/{x}/{y}.png', 
				{
			    maxZoom: 18
			}).addTo(map);
			var marker = L.marker([51.5, -0.09]).addTo(map);
			var popup=L.popup();
			function onMapClick(e) {

			}
			function onZoomEnd(e){
				//popup.setLatLng(e.latlng).setContent('on zoom event info:'+(e.toString())).openOn(map);
				console.log(map.getBounds());
				
			}

			map.on('click',onMapClick);
			map.on('zoomend',onZoomEnd);


			//creating icon 
			var LeafIcon = L.Icon.extend({
				options: {
				shadowUrl: 'externals/img/leaf-shadow.png',
				iconSize:     [38, 95],
				shadowSize:   [50, 64],
				iconAnchor:   [22, 94],
				shadowAnchor: [4, 62],
				popupAnchor:  [-3, -76]
			}
		});

		var greenIcon = new LeafIcon({iconUrl: 'externals/img/leaf-green.png'});
//			redIcon = new LeafIcon({iconUrl: '../docs/images/leaf-red.png'}),
//			orangeIcon = new LeafIcon({iconUrl: '../docs/images/leaf-orange.png'});

		L.marker([37.775196, -122.419204], {icon: greenIcon}).bindPopup("I am a green leaf.").addTo(map);
	
//		L.marker([51.495, -0.083], {icon: redIcon}).bindPopup("I am a red leaf.").addTo(map);
//		L.marker([51.49, -0.1], {icon: orangeIcon}).bindPopup("I am an orange leaf.").addTo(map);

	
	// Load the data from all the listings

		$.getJSON("http://findall.aws.af.cm/listings",function(result){
				$.each(result,function(i,field)
				{
					var temp = String(field.loc);
					var temp1 = temp.split(",");
					//console.log(temp1[1]);
					L.marker([temp1[1], temp1[0]], {icon: greenIcon}).bindPopup("I am a green leaf.").addTo(map);
				});
		});





		


}