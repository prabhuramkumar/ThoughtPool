import React from 'react';

import Comment from './comment';
import NoResultFound from './noresultsfound';


var CommentList = React.createClass({
	component: '',
	render: function(){
		if(this.props.data.length == 0){
			this.component = <NoResultFound/>
		}else{
		    this.component = this.props.data.map(function(comment, i){
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

