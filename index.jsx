require("./node_modules/bootstrap/dist/css/bootstrap.min.css")

import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import CommentBox from './commentBox';

// export class App extends React.Component {
// 	render() {
// 		return (
//         <div>Simple React  + Webpack </div>
// 		);
// 	}
// }

ReactDOM.render(
	<CommentBox url="http://localhost:3000/api/comments" interval={2000}/>, 
	document.querySelector("#myApp")
);
