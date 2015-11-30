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
				<ul className={this.props.provider ?'trip-panel provider' : 'trip-panel pooler'}>
					<li className="origin">
						<h5>From</h5>
						<p>{this.props.originAddress}</p>
					</li>
					<li className="destination">
						<h5>To</h5>
						<p>{this.props.destinationAddress}</p>
					</li>
				</ul>
				<ul className="trip-panel user-panel">
					<li>
						<div className="user-name">
							<a href={"https://contacts.thoughtworks.com/searchUser?searchQuery="+this.props.email} target="_blank"> {this.props.name}</a>
							<p>{this.props.email}</p>
							<p>{this.props.provider ?'Owns a Car' : 'Doesn\'t own a car'}</p>
							<p>{this.props.time}</p>

						</div>
					</li>
				</ul>
			</div>
		);
	}
});

module.exports = Comment;