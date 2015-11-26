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

import { createHistory, useBasename } from 'history';
const ACTIVE = { color: 'grey' }

var App = React.createClass({
  mixins: [Reflux.connect(PoolStore, 'poolstore')],
  init: function(){
    var page;
    if(this.state.poolstore==="noresultsfound"){
      page = <div>
                <NoResultFound />
                <SearchForm />
              </div>
    }else{
      page = <div>
                <SearchForm />
                <CommentList data={this.state.poolstore} />
              </div>
    }
    return page;
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

