import React from 'react';
import MapRenderer from '../stores/mapRenderer';


var Comment = React.createClass({
	getInitialState: function(){
		return {};
	},

	setCallback : function(){
		var inputElements = document.getElementsByClassName('listP');
		var com = this;
		var count;
		
		inputElements[com.props.index].addEventListener('click', function(){
			MapRenderer.showRoute(com.props.routeEncoded);
		});
		
	},

	componentDidMount: function(){
		this.setCallback();
	},
                  
	render: function(){
		return (
			<div className="pool listP">
		
				<div className="user-name">
					<a href={"https://contacts.thoughtworks.com/searchUser?searchQuery="+this.props.email} target="_blank"> {this.props.name}</a>
					<p>{this.props.email}</p>
					<p>{this.props.provider ?'Owns a Car' : 'Doesn\'t own a car'}</p>
				</div>
				<div className="user-details">
					<h5>From</h5>
					<p>{this.props.originAddress}</p>
					<h5>To</h5>
					<p>{this.props.destinationAddress}</p>
					<br/>
					<p>{this.props.time}</p>
				</div>
				
			</div>
		);
	}
});

module.exports = Comment;