var Reflux = require('reflux');
var $ = require('jquery');
var PoolActions = require('../actions/poolactions');

var PoolStore = Reflux.createStore({
	listenables: [PoolActions],
	poollist: [],
	sourceUrl: '/api/comments/',

	init: function(){
		this.loadPools();
	},

	getInitialState: function() {
        return this.poollist;
    },

	loadPools: function (){
		$.ajax({
			url: this.sourceUrl,
			dataType: 'json',
			cache: false,
			success: function(serverData){
				this.poollist = serverData.reverse();
				this.trigger(this.poollist);
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
		  	this.poollist.push(serverData);
		  	this.poollist = this.poollist.reverse();
			this.trigger(this.poollist);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.sourceUrl, status, err.toString());
		  }.bind(this)
		});
	},

	searchPoolList: function(searchPool){
		var poollistFiltered = this.poollist.filter(function(pool){
			var path = google.maps.geometry.encoding.decodePath(pool.routeEncoded);
		    var polyline = new google.maps.Polyline({
		        path: path,
		    });

			var sourceFallsOnRoute = google.maps.geometry.poly.isLocationOnEdge(searchPool.origin, polyline, 0.001);
			var destinationFallsOnRoute = google.maps.geometry.poly.isLocationOnEdge(searchPool.destination, polyline, 0.001);;

			var fallsOnRoute = sourceFallsOnRoute && destinationFallsOnRoute;

			return fallsOnRoute;
		});

		if(poollistFiltered.length == 0){
    		this.trigger([]);
    	} else {
    		this.trigger(poollistFiltered);
    	}
	}

});

module.exports = PoolStore;