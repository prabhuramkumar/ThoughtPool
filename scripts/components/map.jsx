import React from 'react';
var $ = require('jquery');
var directionsService = new google.maps.DirectionsService();
var directionsDisplay, routeEncoded, map;
var polyline = new google.maps.Polyline({
	          strokeColor: '#FF0000',
	          strokeWeight: 2
	      });
var current;

var Map = React.createClass({
	origin: '',
	destination:'',
	
	actions:{
		getEncodedRoute: function(){
			return current.refs.encodedRoute.value;
		},

		updateOrigin: function(newOrigin){
			if(newOrigin){
				current.origin = newOrigin;
				current.props.sourcePositionChangeCallback(current.origin);
			}
		},

		updateDestination: function(newDestination){
			if(newDestination){
				current.destination = newDestination;
				current.props.destinationPositionChangeCallback(current.destination);
			}
		},

		updateRoute: function(){
			var request = {
			   		origin: current.origin,
			    	destination: current.destination,
			    	travelMode: google.maps.TravelMode.DRIVING
			  	};
		  	directionsService.route(request, function(result, status) {
		    	if (status == google.maps.DirectionsStatus.OK) {
		      		directionsDisplay.setDirections(result);
		      		current.refs.encodedRoute.value = result.routes[0].overview_polyline;
		    	} else {
		     		alert("couldn't get directions:" + status);
		    	}
		  	});
		},

		resetRoute: function(route){
			current.refs.encodedRoute.value = '';
			
			this.updateOrigin(route.source);
			this.updateDestination(route.destination);

			if(current.origin != '' && current.destination != ''){
			    this.updateRoute();
		  	}
		},

		showRoute: function(routeDetails){
		    polyline.setMap(null); 
			var path = google.maps.geometry.encoding.decodePath(routeDetails);
		      
		    polyline.setPath(path);
	  		polyline.setMap(map);
		}
	},

	componentDidMount: function(){
		var component = this;
		var twBlrOffice = new google.maps.LatLng(12.928716, 77.628971);
		var	mapOptions = {
				center: twBlrOffice,
				zoom: 11
			};

		directionsDisplay = new google.maps.DirectionsRenderer({
		      draggable: true,
		      map: map
		    });

		map = new google.maps.Map(this.refs.map, mapOptions);
		directionsDisplay.setMap(map);
		directionsDisplay.addListener('directions_changed', function() {
    		var result = directionsDisplay.getDirections();

    		$("#origin").val(result.routes[0].legs[0].start_address)
    		$("#destination").val(result.routes[0].legs[0].end_address)

    		current.props.sourcePositionChangeCallback(directionsDisplay.getDirections().request.origin);
    		current.props.destinationPositionChangeCallback(directionsDisplay.getDirections().request.destination);
   			current.refs.encodedRoute.value = result.routes[0].overview_polyline;			
  		});

		if(this.props.route){
			current.resetCurretnRoute(this.props.route)
		}

	},

	resetCurretnRoute: function(route){
		var path  = google.maps.geometry.encoding.decodePath(this.props.route);
		var newRoute = {source: path[0], destination: path[path.length - 1]}
		this.actions.resetRoute(newRoute);
	},


	render: function(){
		current = this;
		return(
			<div className="map-container">
				<div id="map" ref="map"></div>
				<input type="hidden" id="encodedRoute" ref="encodedRoute"/>
			</div>
			);
	}
});

module.exports = Map;