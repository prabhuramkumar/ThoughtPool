import React from 'react';
import PoolActions from '../actions/poolactions';


var Comment = React.createClass({
	removed: '',

	getInitialState: function(){
		return {};
	},

	setCallback : function(){
		var self = this;
		var count;

		var poolList = document.getElementsByClassName('listP');
		var contactBtn = document.getElementsByClassName('contactBtn');
		
		poolList[self.props.index].addEventListener('click', function(){
			$(poolList).removeClass("active");
			$(this).addClass("active");
			if(self.props.mapActions){
				self.props.mapActions().showRoute(self.props.poolData.encodedRoute);
			}
		});

		contactBtn[self.props.index].addEventListener('click', function(){
			self.props.handleEmailRequest(self.props.poolData);
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
					<a className={this.props.poolData.editable ? 'hidden' : 'contactBtn'}  data-toggle="modal" data-target="#sendEmailRequest" data-whatever="@mdo" >Contact</a>
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