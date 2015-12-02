import React from 'react';
import CommentList from './comlist';

var MyAccountPage = React.createClass({
	
	render: function(){
		return(
			<CommentList />
		)
	}
});

module.exports = MyAccountPage;