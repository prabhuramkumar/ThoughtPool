require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./css/app.css")

import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import CommentList from './scripts/components/comlist';
import SearchForm from './scripts/components/searchform';
import CreateForm from './scripts/components/createform';
import NoResultFound from './scripts/components/noresultsfound';
import PoolStore from './scripts/stores/poolstore';
import Map from './scripts/components/map';

import { createHistory, useBasename } from 'history';
const ACTIVE = { color: 'grey' }

var App = React.createClass({
	mixins: [Reflux.connect(PoolStore, 'poolstore')],
	init: function(){
	return(
		<div>
			<SearchForm />
			<div className="map-and-list">
				<Map/>
				<CommentList data={this.state.poolstore} />
			</div>
		</div>
	);
	
	},
	render: function() {
		return this.init();
	}
});


var MyPool = React.createClass({
	mixins: [Reflux.connect(PoolStore, 'poolstore')],
	render: function(){
		return(
			<CommentList data={this.state.poolstore} />
		)
	}
});

const history = useBasename(createHistory)({
	basename: '/'
});

ReactDOM.render((
	<Router history={history}>
		<Route path="/" component={App}/>
		<Route path="/myaccount" component={MyPool} />
		<Route path="/create" component={CreateForm}/>
	</Router>
), document.getElementById('myApp'));

