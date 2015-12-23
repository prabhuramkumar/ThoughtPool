require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./css/app.css")
require("./node_modules/bootstrap/dist/js/bootstrap.min.js");
require("./node_modules/bootstrap-timepicker/js/bootstrap-timepicker");
var $ = require('jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import CreateForm from './scripts/components/createForm';
import NoResultFound from './scripts/components/noresultsfound';
import SearchPage from './scripts/components/searchPage';
import MyAccountPage from './scripts/components/myAccountPage';
import HomePage from './scripts/components/homepage';
import App from './scripts/components/navbar';

import { createHistory, useBasename } from 'history';

const history = useBasename(createHistory)({
	basename: '/'
});

ReactDOM.render((
	<Router history={history}>
		<Route path="/" component={App} history={history}>
			<IndexRoute component={HomePage}/>
			<Route path="/search" component={SearchPage} />
			<Route path="/myaccount" component={MyAccountPage} />
			<Route path="/create" component={CreateForm}/>
		</Route>
	</Router>
), document.getElementById('myApp'));

