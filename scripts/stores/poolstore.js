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
		var poollistFiltered = this.poollist.filter(function(pool){
			return (searchPool.origin === pool.origin && searchPool.destination === pool.destination);
		});

		if(poollistFiltered.length == 0){
    		this.trigger("noresultsfound");
    	} else {
    		this.trigger(poollistFiltered);
    	}
	}

});

module.exports = PoolStore;