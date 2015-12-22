import React from 'react';
import Reflux from 'reflux';

var $ = require('jquery');

var SuccessAlert = React.createClass({
	
	componentDidMount: function(){
		setTimeout(function(){
			$(".alert-success").fadeOut("slow");
		}, 3000);
	},

	render: function(){
		return(
			<div className="alert alert-success">
			 	{this.props.message}
			</div> 
		);
	}
});

module.exports = SuccessAlert;