import React from 'react';
import MapRenderer from '../stores/mapRenderer';

var Map = React.createClass({
	componentDidMount: function(){
		MapRenderer.render();
	},
	getEncodedRoute: function(){
		return this.refs.encodedRoute.value;
	},
	render: function(){
		return(
			<div className="map-container">
				<div id="map"></div>
				<input type="hidden" id="encodedRoute" ref="encodedRoute"/>
			</div>
			);
	}
});

module.exports = Map;