import React from 'react';
import CommentList from './comlist';
import SearchForm from './searchform';
import Map from './map';
import SuccessAlert from './successAlert';

var SearchPage = React.createClass({
	
	render: function(){
		return(
			<div>
				<SuccessAlert/>
				<SearchForm/>
				<div className="map-and-list">
					<Map/>
					<CommentList/>
				</div>
			</div>
		);
	}
});

module.exports = SearchPage;