import React from 'react';

var geocoder = new google.maps.Geocoder;


var Comment = React.createClass({
	setAreaName: function(placeId, stateName){
		var comp = this;
		geocoder.geocode({'placeId': placeId}, function(results, status) {
    		if (status === google.maps.GeocoderStatus.OK) {
    		  if (results[0]) {
    		  	var stateObject = comp.state;
    		  	stateObject[stateName] = results[0].formatted_address;
    		    comp.setState(stateObject);
    		  }
    		}
    		else{
    			console.log("not found");
    		}
 		});
	},

	getInitialState: function(){
		return {};
	},

	componentDidMount: function() {
		this.setAreaName(this.props.origin, "origin");
		this.setAreaName(this.props.destination, "destination");
		this.setAreaName(this.props.via, "via");
    },
                          
	render: function(){
		return (
			<div className="pool">
				<ul className={this.props.provider ?'trip-panel provider' : 'trip-panel pooler'}>
					<li className="origin">
						<span>From</span>
						<p>{this.state.origin}</p>
					</li>
					<li className="via">
						<span>Via</span>
						<p>{this.state.via}</p>
					</li>
					<li className="destination">
						<span>To</span>
						<p>{this.state.destination}</p>
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