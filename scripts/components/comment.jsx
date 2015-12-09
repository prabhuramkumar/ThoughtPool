import React from 'react';
import PoolActions from '../actions/poolactions';

var Comment = React.createClass({
	removed: '',

	getInitialState: function(){
		return {};
	},

	setCallback : function(){
		var inputElements = document.getElementsByClassName('listP');
		var com = this;
		var count;
		
		inputElements[com.props.index].addEventListener('click', function(){
			if(com.props.mapActions){
				com.props.mapActions().showRoute(com.props.poolData.routeEncoded);
			}
		});
	},

	removePool: function(e){
		PoolActions.deletePool(this.props.poolData._id);
	},

	componentDidMount: function(){
		this.setCallback();
	},
	
	render: function(){
		return (
			<div className="pool listP">
		
				<div className="user-profile">
					<h3 className="user-name">{this.props.poolData.name}</h3>
					<p>{this.props.poolData.provider ?'Owns a Car' : 'Doesn\'t own a car'}, leaving at <span className="time">{this.props.poolData.time}</span></p>
					<a href={"https://contacts.thoughtworks.com/searchUser?searchQuery="+this.props.poolData.email} target="_blank"> Contact</a>
					<a className={!this.props.poolData.editable ? 'hidden' : ''} onClick={this.removePool}>Remove</a>
				</div>
				<div className="user-details">
					<p><span className="position">From: </span>{this.props.poolData.originAddress}</p>
					<p><span className="position">To: </span>{this.props.poolData.destinationAddress}</p>
				</div>
			</div>
		);
	}
});

module.exports = Comment;