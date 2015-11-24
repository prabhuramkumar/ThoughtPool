import React from 'react';
import Reflux from 'reflux';
import PoolStore from '../stores/poolstore';
import PoolActions from '../actions/poolactions';

import ComList from './comlist';

var Search = React.createClass({
	render: function(){
		return(
			<SearchForm />
			<ComList />
		);
	}
});

module.exports = Search;