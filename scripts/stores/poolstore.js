var Reflux = require('reflux');
var $ = require('jquery');
var PoolActions = require('../actions/poolactions');


var PoolStore = Reflux.createStore({
	listenables: [PoolActions],
	poollist: [],
	poollistFiltered: [],
	sourceUrl: '/api/comments/',
	noResultFound: 'asdsa',

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
				console.log(this.poollist);
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
		this.poollistFiltered = [];
		var findPool = function(poollistFiltered) {
		   return function(pool){
			    if(this.origin === pool.origin && this.destination === pool.destination){
		        	poollistFiltered.push(pool);
		        }
		        else{
		        	console.log("no matches found");
		        }
	    	}
	    	
		}

		this.poollist.filter(findPool(this.poollistFiltered), searchPool);

		if(this.poollistFiltered.length == 0){
    	 	this.noResultFound = "noresultsfound";
    		this.trigger(this.noResultFound);
    	}else{
    		this.trigger(this.poollistFiltered);
    	}
	}

});

module.exports = PoolStore;