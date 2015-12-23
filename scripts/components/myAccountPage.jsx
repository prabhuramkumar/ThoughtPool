import React from 'react';
import CommentList from './comlist';
import Constants from './constants';

var MyAccountPage = React.createClass({
	
	render: function(){
		return(
			<div className="my-account">
				<CommentList filter={Constants.myPoolsFilter}/>
			</div>
		)
	}
});

module.exports = MyAccountPage;