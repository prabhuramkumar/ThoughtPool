import React from 'react';

import Comment from './comment';


var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment 
					origin={comment.origin} 
					via={comment.via} 
					key={comment.id} 
					destination={comment.destination}
					provider={comment.provider}
					email={comment.email}
					name={comment.name}>
					>

				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);
	}
});

module.exports = CommentList;

