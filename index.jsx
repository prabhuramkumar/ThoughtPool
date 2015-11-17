require("./node_modules/bootstrap/dist/css/bootstrap.min.css")

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import CommentForm from './commentBox';
import CommentBox from './commentBox';
import CommentList from './commentBox';
import { createHistory, useBasename } from 'history';
const ACTIVE = { color: 'red' }
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
        <h5>Navigation</h5>
        <ul>
          <li><Link      to="/list"           activeStyle={ACTIVE}>Comments List</Link></li>
          <li><Link      to="/form"       activeStyle={ACTIVE}>CommentForm </Link></li>
        </ul>

        {this.props.children}
      </div>
    )
  }
}

class ComList extends React.Component {
  render() {
    return (
      <CommentBox url="http://localhost:3000/api/comments"/>
    )
  }
}

class ComForm extends React.Component {
  render() {
    return (
    	<h1> Form</h1>
    )
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <h3>Index</h3>
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
      // <IndexRoute component={Index}/>
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
