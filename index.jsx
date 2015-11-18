require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
require("./css/app.css")

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import CommentBox from './commentBox';
import { createHistory, useBasename } from 'history';
const ACTIVE = { color: 'grey' }
// export class App extends React.Component {
// 	render() {
// 		return (
//         <div>Simple React  + Webpack </div>
// 		);
// 	}
// }
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

class ComList extends React.Component {
  render() {
    return (
   	  <div> 	
      	<CommentBox url="http://localhost:3000/api/comments" config="list"/>
      </div>
    )
  }
}

class ComForm extends React.Component {
  render() {
    return (
    	<div className="commentform">
    		<CommentBox url="http://localhost:3000/api/comments" config="form"/>
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
), document.getElementById('myApp'))
// const history = useBasename(createHistory)({
//   basename: '/'
// })

// ReactDOM.render((
//   <Router history={history}>
//       <Route path="/" component={CommentForm}/>
//       <Route path="/commentform" component={CommentBox}/>
//   </Router>
// ), document.querySelector("#myApp"));

// ReactDOM.render(
// 	<CommentBox url="http://localhost:3000/api/comments" interval={2000}/>, 
// 	document.querySelector("#myApp")
// );
