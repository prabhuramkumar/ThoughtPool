'use strict'

/******************************* Dependencies ********************************/

// Third party
var React = require('react/addons'),
    rb    = require('react-bootstrap')

// Custom components
var mixins     = require('app-mixins'),
    StorePopup = require('model/popup')

/******************************** Components *********************************/

var ViewPopup = React.createClass({

  render: function() {return (

<div className='popup container'>

  {StorePopup.messages.map((msg, index) =>
    <div key={index} className='pointer' onClick={() => this.handleDismiss(msg)}>
      <rb.Alert bsStyle={msg.type || 'info'}>
        <p>{msg.text}</p>
      </rb.Alert>
    </div>
  )}

</div>

  )},

  mixins: mixins.listen.Popup,

  handleDismiss: function (msg) {
    StorePopup.remove(msg)
  }

})

/********************************** Export ***********************************/

module.exports = ViewPopup
