import React from 'react';

import Comment from './comment';

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment 
					origin={comment.origin} 
					key={comment.id} 
					destination={comment.destination}
					provider={comment.provider}
					email={comment.email}
					name={comment.name}
					time={comment.time}
					originAddress={comment.originAddress}
					destinationAddress={comment.destinationAddress}>
				</Comment>
			);
		});
		return (
			<div className="poolList">
				{commentNodes}
			</div>
		);
	}
});

module.exports = CommentList;

