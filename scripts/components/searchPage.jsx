import React from 'react';
import CommentList from './comlist';
import SearchForm from './searchform';
import Map from './map';
import SuccessAlert from './successAlert';

var SearchPage = React.createClass({

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
				<SuccessAlert/>
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