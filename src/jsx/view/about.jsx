'use strict'

/******************************* Dependencies ********************************/

// Third party
var React   = require('react/addons'),
    Handler = require('react-router').RouteHandler

/******************************** Components *********************************/

var About = React.createClass({

  render: function() {return (

<div className='container'>
  <p>Primitive full-stack web application seed. Showcases ReactJS, react-router, Reflux, Datacore, browserify (client), Node+Express, MongoDB+Mongoose (server).</p>
</div>

  )}

})

/********************************** Export ***********************************/

module.exports = About
