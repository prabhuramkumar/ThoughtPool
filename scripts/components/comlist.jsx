import React from 'react';
import Map from './map';

import Comment from './comment';

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment, i){
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
		return (
			<div>
			<div>
					<Map/>
			</div>
			<div className="poolList">
				{commentNodes}
			</div>
			</div>
		);
	}
});

module.exports = CommentList;

