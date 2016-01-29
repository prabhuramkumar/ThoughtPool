var Reflux = require('reflux');

import React from 'react';
import CommentList from './comlist';
import SearchForm from './searchform';
import Map from './map';
import SuccessAlert from './successAlert';
import PoolStore from '../stores/poolstore';

var SearchPage = React.createClass({

	mixins: [Reflux.connect(PoolStore, 'poolstore')],

	postSuccess: function(){
		if(this.state.poolstore.postSuccess){
			this.state.poolstore.postSuccess = false;
			return <SuccessAlert message="Your route is Successfully posted."/>
		}
		if(this.state.poolstore.requestEmailSuccess){
			this.state.poolstore.requestEmailSuccess = false;
			return <SuccessAlert message="Your Request is Successfully posted."/>
		}
	},

	mapActions: function(route){
		return this.refs.mapForSearchPage.actions;
	},
	resetSourceLatLng: function(sourcePosition){
		this.refs.searchform.resetSourceLatLng(sourcePosition);
	},
	resetDestinantionLatLng: function(destinationPosition){
		this.refs.searchform.resetDestinantionLatLng(destinationPosition);
	},

	render: function(){
		return(
			<div>
				{this.postSuccess()}
				<SearchForm mapActions = {this.mapActions} ref="searchform"/>
				<div className="map-and-list">
					<Map ref="mapForSearchPage"
						sourcePositionChangeCallback={this.resetSourceLatLng}
			    	 	destinationPositionChangeCallback ={this.resetDestinantionLatLng}/>
					<CommentList mapActions = {this.mapActions}/>
				</div>
				
			</div>

		);
	}
});

module.exports = SearchPage;