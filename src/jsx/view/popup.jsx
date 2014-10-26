'use strict'

/******************************* Dependencies ********************************/

// Third party
var React = require('react/addons'),
    rb    = require('react-bootstrap'),
    _     = require('lodash')

// Custom components
var mixins     = require('app-mixins'),
    StorePopup = require('model/popup')

/******************************** Components *********************************/

var ViewPopup = React.createClass({

  render: function() {return (

<div className='popup container'>
  {this.makeMessages()}
</div>

  )},

  makeMessages: function() {
    return StorePopup.messages.map((msg, index) =>

<div key={index} className='pointer' onClick={this.handleDismiss.bind(this, msg)}>
  <rb.Alert bsStyle={msg.type || 'info'}>
    <p>{msg.text}</p>
  </rb.Alert>
</div>

    )
  },

  mixins: mixins.listen.Popup,

  handleDismiss: function (msg) {
    StorePopup.remove(msg)
  }

})

/********************************** Export ***********************************/

module.exports = ViewPopup
