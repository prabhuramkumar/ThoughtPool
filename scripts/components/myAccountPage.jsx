import React from 'react';
import CommentList from './comlist';
import Constants from './constants';

var MyAccountPage = React.createClass({
	
	render: function(){
		return(
			<CommentList filter={Constants.myPoolsFilter}/>
		)
	}
});

module.exports = MyAccountPage;