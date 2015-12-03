import React from 'react';
import CommentList from './comlist';
import SearchForm from './searchform';
import Map from './map';
import SuccessAlert from './successAlert';

var SearchPage = React.createClass({
	mapActions: function(route){
		return this.refs.mapForSearchPage.actions;
	},

	render: function(){
		return(
			<div>
				<SuccessAlert/>
				<SearchForm mapActions = {this.mapActions}/>
				<div className="map-and-list">
					<Map ref="mapForSearchPage"/>
					<CommentList mapActions = {this.mapActions}/>
				</div>
			</div>
		);
	}
});

module.exports = SearchPage;