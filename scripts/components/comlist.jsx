import React from 'react';
import Reflux from 'reflux';

import Comment from './comment';
import NoResultFound from './noresultsfound';
import PoolStore from '../stores/poolstore';
import Constants from './constants';
import PoolActions from '../actions/poolactions';

var CommentList = React.createClass({

	mixins: [Reflux.connect(PoolStore, 'poolstore')],

	component: '',
	
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
			this.component = <NoResultFound route={this.state.poolstore.searchPool.encodedRoute}/>
		} else {
		    this.component = pools.map(function(pool, i){
				return (
					<Comment
						index={i}
						poolData = {pool}
						mapActions = {current.props.mapActions}>
					</Comment>
				);
			});
		}
		return (
			<div className="poolList">
				{this.component}
			</div>
		);
	}
});

module.exports = CommentList;

