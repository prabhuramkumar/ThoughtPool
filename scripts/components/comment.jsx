import React from 'react';

var Comment = React.createClass({
	render: function(){
		return (
			<div className="poollist">
				<ul className={this.props.provider ?'trip-panel provider' : 'trip-panel pooler'}>
					<li className="origin">
						<span>From</span>
						<strong>{this.props.origin}</strong>
					</li>
					<li className="via">
						<span>Via</span>
						<strong>{this.props.via}</strong>
					</li>
					<li className="destination">
						<span>To</span>
						<strong>{this.props.destination}</strong>
					</li>
				</ul>
				<ul className="misc-panel">
					<li>
						<div className="user-name">
							<a href={"https://contacts.thoughtworks.com/searchUser?searchQuery="+this.props.email} target="_blank"> {this.props.name}</a>
							<p>{this.props.email}</p>
							<p>{this.props.provider ?'Owns a Car' : 'Doesnt own a car'}</p>
						</div>
					</li>
				</ul>
			</div>
		);
	}
});

module.exports = Comment;