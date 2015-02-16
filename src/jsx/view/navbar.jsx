'use strict'

/******************************* Dependencies ********************************/

// Third party
var React   = require('react/addons'),
    Handler = require('react-router').RouteHandler,
    Link    = require('react-router').Link

// Custom components

/******************************** Components *********************************/

var Navbar = React.createClass({

  render: function() {return (

<div className='site-navbar navbar navbar-inverse'>
  <div className='container'>
    <ul className='nav navbar-nav'>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='about'>About</Link></li>
    </ul>
  </div>
</div>

  )}

})

/********************************** Export ***********************************/

module.exports = Navbar
