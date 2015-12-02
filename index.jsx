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
import Map from './scripts/components/map';
import PoolStore from './scripts/stores/poolstore';


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
			          <li><Link to="/logout"      activeStyle={ACTIVE}>Logout</Link></li>
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

var Home = React.createClass({
	render: function(){
		return(
			<div>
				<SuccessAlert/>
				<SearchForm />
				<div className="map-and-list">
					<Map/>
					<CommentList  />
				</div>
			</div>
		);
	}
})

var SuccessAlert = React.createClass({
	mixins: [Reflux.connect(PoolStore, 'poolstore')],
	init: function(){
		var page;
		if(this.state.poolstore.postSuccess){
			page = <div className="alert alert-success">
				 	Your route is Successfully created and posted
				 </div> 
		}else{
			page = <div></div>
		}
		return page;

	},
	render: function(){
		return this.init();
	}
})


var MyAccount = React.createClass({
	render: function(){
		return(
			<CommentList />
		)
	}
});

const history = useBasename(createHistory)({
	basename: '/'
});

ReactDOM.render((
	<Router history={history}>
		<Route path="/" component={App} history={history}>
			<IndexRoute component={Home}/>
			<Route path="/myaccount" component={MyAccount} />
			<Route path="/create" component={CreateForm}/>
		</Route>
	</Router>
), document.getElementById('myApp'));

