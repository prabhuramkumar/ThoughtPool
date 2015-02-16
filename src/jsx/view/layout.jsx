'use strict'

/******************************* Dependencies ********************************/

// Third party
var React   = require('react/addons'),
    Handler = require('react-router').RouteHandler

// Custom components
var Navbar = require('view/navbar'),
    Popup  = require('view/popup')

/******************************** Components *********************************/

var Layout = React.createClass({

  render: function() {return (

<div role='layout' className='outermost'>

  <Popup />

  <div className='layout'>

    <Navbar />

    <div className='site-wrap'>
      <Handler />
    </div>

  </div>

</div>

  )}

})

/********************************** Export ***********************************/

module.exports = Layout
