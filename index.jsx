require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./css/app.css")
require("./node_modules/bootstrap/dist/js/bootstrap.min.js");
require("./node_modules/bootstrap-timepicker/js/bootstrap-timepicker");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import CreateForm from './scripts/components/createform';
import NoResultFound from './scripts/components/noresultsfound';
import SearchPage from './scripts/components/searchPage';
import MyAccountPage from './scripts/components/myAccountPage';

import { createHistory, useBasename } from 'history';
const ACTIVE = { color: 'grey' }

var App = React.createClass({
	init: function(){
		return(
			<div>
				<div className="thola-header">
		            <div className="logo">
		                <h3>Thola</h3>
		            </div>
		            <ul className="thola-nav">
			          <li><IndexLink      to="/"           activeStyle={ACTIVE}>Home</IndexLink></li>
			          <li><Link to="/myaccount"           activeStyle={ACTIVE}>My Account</Link></li>
			          <li><Link      to="/create"      activeStyle={ACTIVE}>Create</Link></li>
			          <li><a href ="/logout">Logout</a></li>
			        </ul>

		        </div>
		        {this.props.children}
	        </div>
			
		)
	},
	render: function() {
		return this.init();
	}
});

const history = useBasename(createHistory)({
	basename: '/'
});

ReactDOM.render((
	<Router history={history}>
		<Route path="/" component={App} history={history}>
			<IndexRoute component={SearchPage}/>
			<Route path="/myaccount" component={MyAccountPage} />
			<Route path="/create" component={CreateForm}/>
		</Route>
	</Router>
), document.getElementById('myApp'));

