'use strict'

/******************************* Dependencies ********************************/

// Third party
var React  = require('react/addons')

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
      <this.props.activeRouteHandler />
    </div>

  </div>

</div>

  )}

})

/********************************** Export ***********************************/

module.exports = Layout
