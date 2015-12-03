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

	loadPools: function (searchPool){
		$.ajax({
			url: this.sourceUrl,
			dataType: 'json',
			cache: false,
			success: function(serverData){
				this.poolObject.poollist = serverData.reverse();
				if(searchPool){
					this.searchPoolList(searchPool);
				}
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
			this.poolObject.postSuccess = true;
			this.trigger(this.poolObject);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.sourceUrl, status, err.toString());
		  }.bind(this)
		});
	},

	getPath: function(encodedRoute){
		return google.maps.geometry.encoding.decodePath(encodedRoute);
	},

	getPolyline: function(path){
		var polyline = new google.maps.Polyline({
		        path: path,
		    });
		return polyline;
	},

	fallsOnRoute: function(placeLatLng, pathPolyline){
		return google.maps.geometry.poly.isLocationOnEdge(placeLatLng, pathPolyline, 0.002);
	},

	searchPoolList: function(searchPool){
		var allPool = this.poolObject.poollist;
		var exactPool = [];
		var partialPool = [];
		var lessPartialPool = [];

		var preferredRoutePolyline = this.getPolyline(this.getPath(searchPool.encodedRoute));
		var searchOrigin = searchPool.origin;
		var searchDestination = searchPool.destination;

		for(var i = 0; i<allPool.length; i++){

			var pool = allPool[i];
			var path = this.getPath(pool.routeEncoded);
			var polyline = this.getPolyline(path);

			var sourceFallsOnRoute = this.fallsOnRoute(searchOrigin, polyline);
			var destinationFallsOnRoute = this.fallsOnRoute(searchDestination, polyline);

			
			if (sourceFallsOnRoute && destinationFallsOnRoute){
				exactPool = exactPool.concat([pool]);
			}
			else
			{
				if (sourceFallsOnRoute || destinationFallsOnRoute){
					var poolStart = path[0];
					var poolEnd = path[path.length - 1];

					var poolStartFallsOnRoute = this.fallsOnRoute(poolStart, preferredRoutePolyline);
					var poolEndFallsOnRoute = this.fallsOnRoute(poolEnd, preferredRoutePolyline);

					if (poolStartFallsOnRoute && poolEndFallsOnRoute){
						partialPool = partialPool.concat([pool]);
					}
					else{
						lessPartialPool = lessPartialPool.concat([pool])
					}
				}
			}
		}

		var poollistFiltered = exactPool.concat(partialPool).concat(lessPartialPool);
		this.poolObject.poollist = poollistFiltered;
	}
});
module.exports = PoolStore;