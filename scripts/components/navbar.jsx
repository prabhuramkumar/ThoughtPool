import React from 'react';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
const ACTIVE = { color: 'grey' }


var App = React.createClass({

  render: function(){
    return(
      <div>
      <nav className="navbar navbar-default navbar-fixed-top thola-header">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
             <div className="logo">
                <h3>Thola</h3>
             </div>
          </div>

          <div className="navbar-collapse collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right thola-nav">
                <li><IndexLink      to="/"           activeStyle={ACTIVE}>Home</IndexLink></li>
                <li><Link      to="/search" className="search"      activeStyle={ACTIVE}>Search</Link></li>
                <li><Link      to="/create" className="create"     activeStyle={ACTIVE}>Create</Link></li>
                <li><Link to="/myaccount"           activeStyle={ACTIVE}>My Account</Link></li>
                <li><a className="logout" href ="/logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {this.props.children}
      </div>

    );
  }
});

module.exports = App;



