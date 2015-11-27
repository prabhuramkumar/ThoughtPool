var Reflux = require('reflux');
var $ = require('jquery');
var directionsService = new google.maps.DirectionsService();
var directionsDisplay,
	routeEncoded,
	map;

var mapRenderer = {
	source: '',
	destination:'',
	resetSource: function (source) {
		this.source = source;
		this.setRoute(this.source, this.destination);
	},
	resetDestination: function(destination){
		this.destination = destination;
		this.setRoute(this.source, this.destination);
	},
	setRoute: function(source, destination){
		$("#encodedRoute").val('');
		
		if(source != '' && destination != ''){
		    var request = {
		   		origin: {'placeId': source},
		    	destination: {'placeId': destination},
		    	travelMode: google.maps.TravelMode.DRIVING
		  	};

		  	directionsService.route(request, function(result, status) {
		    	if (status == google.maps.DirectionsStatus.OK) {
		      		directionsDisplay.setDirections(result);
		      		$("#encodedRoute").val(result.routes[0].overview_polyline);
		    	} else {
		     		alert("couldn't get directions:" + status);
		    	}
		  	});
	  	}
	},
	render: function(){
		var twBlrOffice = new google.maps.LatLng(12.928716, 77.628971);
		var	mapOptions = {
				center: twBlrOffice,
				zoom: 18
			};

		directionsDisplay = new google.maps.DirectionsRenderer({
		      draggable: true,
		      map: map
		    });

		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		directionsDisplay.setMap(map);
		directionsDisplay.addListener('directions_changed', function() {
    		var result = directionsDisplay.getDirections();
    		$("#origin").val(result.routes[0].legs[0].start_address)
    		$("#destination").val(result.routes[0].legs[0].end_address)
   			$("#encodedRoute").val(result.routes[0].overview_polyline);
  		});
	}
}

module.exports = mapRenderer;