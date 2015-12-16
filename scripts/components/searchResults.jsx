import React from 'react';
import Reflux from 'reflux';
import PoolStore from '../stores/poolstore';
import Map from './map';
import CommentList from './comlist';


var SearchResults = React.createClass({

	mixins: [Reflux.connect(PoolStore, 'poolstore')],

	mapForSearchPageActions: function(){
		return this.ref.mapForSearchPage.actions;
	},

	resetSourceLatLng: function(sourcePosition){
		this.props.resetSourceLatLng(sourcePosition);
	},
	resetDestinantionLatLng: function(destinationPosition){
		this.props.resetDestinantionLatLng(destinationPosition);
	},


	init: function(){
		var page;
		if(this.state.poolstore.poollist == 'init'){
			page = <h3>Home Page!!</h3>
		} else {
			page = <div className="map-and-list">
					<Map ref="mapForSearchPage"
						sourcePositionChangeCallback={this.resetSourceLatLng}
			    	 	destinationPositionChangeCallback ={this.resetDestinantionLatLng}/>
					<CommentList mapActions = {this.mapForSearchPageActions}/>
				</div>		}
		return page;
	},
	
	render: function(){
		return this.init();
	}
});

module.exports = SearchResults;