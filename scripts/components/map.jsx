import React from 'react';
import MapRenderer from '../stores/mapRenderer';

var Map = React.createClass({
	componentDidMount: function(){
		MapRenderer.render();
	},
	render: function(){
		return(
			<div id="map"></div>
			);
	}
});

module.exports = Map;