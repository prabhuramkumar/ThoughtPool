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
					<p>{this.props.provider ?'Owns a Car' : 'Doesn\'t own a car'}, leaving at <span className="time">{this.props.time}</span></p>
				</div>
				<div className="user-details">
					<div className="dotted-line">
						<p><span className="position">From: </span>{this.props.originAddress}</p>
						<p><span className="position">To: </span>{this.props.destinationAddress}</p>
					</div>
				</div>
				
			</div>
		);
	}
});

module.exports = Comment;