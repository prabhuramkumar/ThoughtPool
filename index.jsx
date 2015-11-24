require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./css/app.css")

import React from 'react';
import ReactDOM from 'react-dom';
import Reflux from 'reflux';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import CommentList from './scripts/components/comlist';
import CommentForm from './scripts/components/comform';
import PoolStore from './scripts/stores/poolstore';
import PoolActions from './scripts/actions/poolactions';
import { createHistory, useBasename } from 'history';
const ACTIVE = { color: 'grey' }

class App extends React.Component {
  render() {
    return (
      <div>
        <ComForm/>
        <ComList/>
      </div>
    )
  }
}

var ComList = React.createClass ({
  mixins: [Reflux.connect(PoolStore, 'poolstore')],
  render: function() {
    return (
      <CommentList data={this.state.poolstore}  />
    )
  }
});

var ComForm = React.createClass ({
  onFormSubmit: function(newPool)  {
    PoolActions.createPool(newPool);
  },
  render: function(){
    return (
      <CommentForm onFormSubmit={this.onFormSubmit} />
    )
  }
});

const history = useBasename(createHistory)({
  basename: '/'
})

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('myApp'));

