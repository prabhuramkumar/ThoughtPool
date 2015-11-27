import React from 'react';
import MapRenderer from '../stores/mapRenderer';

var Map = React.createClass({
	componentDidMount: function(){
		MapRenderer.render();
	},
	render: function(){
		return(
			<div className="map-container">
				<div id="map"></div>
				<input type="hidden" id="encodedRoute"/>
			</div>
			);
	}
});

module.exports = Map;