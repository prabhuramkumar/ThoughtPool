require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./css/app.css")

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import ComList from './scripts/components/comlist';
import ComForm from './scripts/components/comform';
import { createHistory, useBasename } from 'history';
const ACTIVE = { color: 'grey' }

class App extends React.Component {
  render() {
    return (
      <div>
        <ul className="nav nav-pills nav-justified">
          <li activeClassName="active"><Link  to="/list"   activeStyle = {ACTIVE}        >PoolList</Link></li>
          <li activeClassName="active"><Link  to="/form"      activeStyle = {ACTIVE} >PoolForm </Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}


const history = useBasename(createHistory)({
  basename: '/'
})

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={ComList}/>
      <Route path="/list" component={ComList}/>
      <Route path="/form" component={ComForm}/>
    </Route>
  </Router>
), document.getElementById('myApp'));

