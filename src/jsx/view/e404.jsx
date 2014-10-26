'use strict'

/******************************* Dependencies ********************************/

// Third party
var React  = require('react/addons'),
    rb     = require('react-bootstrap'),
    Link   = require('react-router').Link

// Custom components

/******************************** Components *********************************/

var e404 = React.createClass({

  render: function() {return (

<div className='container'>
  <h1 className='text-muted'>Sorry, page not found.</h1>
</div>

  )}

})

/********************************** Export ***********************************/

module.exports = e404
