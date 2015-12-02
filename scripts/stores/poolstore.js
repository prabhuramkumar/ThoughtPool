var Reflux = require('reflux');
var $ = require('jquery');
var PoolActions = require('../actions/poolactions');

var PoolStore = Reflux.createStore({
	listenables: [PoolActions],
	sourceUrl: '/api/comments/',
	poolObject: {poollist: [], postSuccess: false},


	init: function(){
		this.loadPools();
	},

	getInitialState: function() {
        return this.poolObject;
    },

	loadPools: function (){
		$.ajax({
			url: this.sourceUrl,
			dataType: 'json',
			cache: false,
			success: function(serverData){
				this.poolObject.poollist = serverData.reverse();
				this.trigger(this.poolObject);
			}.bind(this),
			error: function(){
				console.error(this.sourceUrl, status);
			}.bind(this)
		})
	},

	createPool: function(comment){
		$.ajax({
		  url: this.sourceUrl,
		  dataType: 'json',
		  type: 'POST',
		  data: comment,
		  cache: false,
		  success: function(serverData) {
		  	this.poolObject.poollist.push(serverData);
		  	this.poolObject.poollist = this.poolObject.poollist.reverse();
			alert("success");
			this.poolObject.postSuccess = true;
			alert(this.poolObject.postSuccess);
			this.trigger(this.poolObject);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.sourceUrl, status, err.toString());
		  }.bind(this)
		});
	},

	searchPoolList: function(searchPool){
		var poollistFiltered = this.poolObject.poollist.filter(function(pool){
			var path = google.maps.geometry.encoding.decodePath(pool.routeEncoded);
		    var polyline = new google.maps.Polyline({
		        path: path,
		    });

			var sourceFallsOnRoute = google.maps.geometry.poly.isLocationOnEdge(searchPool.origin, polyline, 0.002);
			var destinationFallsOnRoute = google.maps.geometry.poly.isLocationOnEdge(searchPool.destination, polyline, 0.002);;

			var fallsOnRoute = sourceFallsOnRoute && destinationFallsOnRoute;

			return fallsOnRoute;
		});

		if(poollistFiltered.length == 0){
    		this.trigger({poollist: [], postSuccess: false});
    	} else {
    		this.trigger({poollist: poollistFiltered, postSuccess: false});
    	}
	}

});

module.exports = PoolStore;