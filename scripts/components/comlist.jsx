import React from 'react';
import Reflux from 'reflux';

import Comment from './comment';
import NoResultFound from './noresultsfound';
import PoolStore from '../stores/poolstore';



var CommentList = React.createClass({
	mixins: [Reflux.connect(PoolStore, 'poolstore')],
	component: '',
	render: function(){
		if(this.state.poolstore.length == 0){
			this.component = <NoResultFound/>
		}else{
		    this.component = this.state.poolstore.map(function(comment, i){
				return (
					<Comment
						index={i}
						origin={comment.origin} 
						key={comment.id} 
						destination={comment.destination}
						provider={comment.provider}
						email={comment.email}
						name={comment.name}
						time={comment.time}
						originAddress={comment.originAddress}
						destinationAddress={comment.destinationAddress}
						routeEncoded={comment.routeEncoded}>
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

