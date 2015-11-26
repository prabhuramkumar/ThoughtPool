import React from 'react';

var Comment = React.createClass({
	getInitialState: function(){
		return {};
	},
                  
	render: function(){
		return (
			<div className="pool">
				<ul className={this.props.provider ?'trip-panel provider' : 'trip-panel pooler'}>
					<li className="origin">
						<h5>From</h5>
						<p>{this.props.originAddress}</p>
					</li>
					<li className="via">
						<h5>Via</h5>
						<p>{this.props.viaAddress}</p>
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