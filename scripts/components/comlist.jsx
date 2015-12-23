import React from 'react';
import Reflux from 'reflux';

import Comment from './comment';
import NoResultFound from './noresultsfound';
import NoMyPoolsFound from './noMyPoolsFound';
import PoolStore from '../stores/poolstore';
import Constants from './constants';
import PoolActions from '../actions/poolactions';
import RequestMail from './requestMailer';

var CommentList = React.createClass({

	mixins: [Reflux.connect(PoolStore, 'poolstore')],

	component: '',

	poolData: {},

	handleEmailRequest: function(poolData){
		this.poolData = poolData;
	},

	sendEmailRequest: function(){
		PoolActions.sendRequestEmail(this.poolData.email, this.poolData.originAddress, this.poolData.destinationAddress);
	},
	
	render: function(){
		var current = this;
		var pools = this.state.poolstore.poollist;

		if (this.props.filter === Constants.myPoolsFilter){
			PoolActions.loadMyPools();
			pools = this.state.poolstore.myPoolList;
			pools.forEach(function(pool){
				pool.editable = true;
			});
			this.state.poolstore.searchPool = {};
		}

		if(pools.length == 0){
			this.component = this.props.filter === Constants.myPoolsFilter?<NoMyPoolsFound/>:
																		   <NoResultFound route={this.state.poolstore.searchPool.encodedRoute}/>;
		}
		else{

		    this.component = pools.map(function(pool, i){
				return (
					<Comment
						index={i}
						poolData = {pool}
						mapActions = {current.props.mapActions}
						handleEmailRequest = {current.handleEmailRequest}>
					</Comment>
				);
			});
		}

		return (
			<div className="poolList">
				{this.component}
				<RequestMail sendEmailRequest={this.sendEmailRequest}>
				</RequestMail>
			</div>
			
		);
	}
});

module.exports = CommentList;