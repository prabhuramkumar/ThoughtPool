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
				this.poollist = serverData;
				this.trigger(this.poollist);
			}.bind(this),
			error: function(){
				console.error(this.sourceUrl, status);
			}.bind(this)
		})
	},

	createPool: function(comment){
		alert(comment);
		$.ajax({
		  url: this.sourceUrl,
		  dataType: 'json',
		  type: 'POST',
		  data: comment,
		  success: function(serverData) {
		    this.poollist = serverData;
			this.trigger(this.poollist);
		  }.bind(this),
		  error: function(xhr, status, err) {
		    console.error(this.sourceUrl, status, err.toString());
		  }.bind(this)
		});
	}

});

module.exports = PoolStore;