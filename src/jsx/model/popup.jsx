'use strict'

/******************************* Dependencies ********************************/

// Third party
var _     = require('lodash'),
    xhttp = require('datacore').xhttp

// Custom components
var Store = require('model/base-store'),
    utils = require('app-utils')

/********************************* Utilities *********************************/

/**
* Short, flexible, non-method version of Popup.add and Popup.clear.
*/
function pop (/* ... options */) {
  if (!arguments.length) return Popup.clear()

  var messages = _.map(arguments, function (options) {
    return typeof options === 'string' ? {text: options} : options
  })

  Popup.add.apply(Popup, messages)
}

/**
* Interceptor for all successful xhttp requests. Try to read an X-Msg from
* the xhr object. If found, pop info messages.
*/
function popXMsgSuccess (data, xhr) {
  // Try to get messages from headers
  var message = utils.getXMsg(xhr)
  if (!message) return

  // If found, display info messages
  if (_.isArray(message)) pop.apply(null, message)
  else pop(message)
}

/**
* Interceptor for all failed xhttp requests. Try to read an X-Msg from
* the xhr object. If found, pop error messages.
*/
function popXMsgError (data, xhr) {
  // Try to get messages from headers
  var message = utils.getXMsg(xhr)
  if (!message) return

  // If found, display error messages
  if (_.isArray(message)) {
    var messages = message.map(text => ({
      type: 'danger',
      text: text
    }))
    pop.apply(null, messages)
  } else pop({
    type: 'danger',
    text: message
  })
}

/*************************** Register Interceptors ***************************/

/**
* Use the xhttp interceptor feature. These will be applied to all requests
* and will automatically show popups when a server sends an X-Msg.
*/

xhttp.addResInterceptor(popXMsgSuccess)

xhttp.addErrInterceptor(popXMsgError)

/******************************* Reflux Store ********************************/

var Popup = Store({

  init: function() {
    this.messages = []
  },

  defaults: {
    type: 'info',
    text: ''
  },

  make: function (options) {
    return _.merge({}, this.defaults, options)
  },

  clear: function() {
    this.init()
  },

  remove: function (msg) {
    _.pull(this.messages, msg)
    this.trigger()
  },

  addMsg: function (msg) {
    if (!msg.text) return
    msg.timeout = setTimeout(this.remove.bind(this, msg), 5000)
    this.messages.push(msg)
  },

  add: function (/* ... hashes */) {
    var messages = _.map(arguments, this.make.bind(this))
    messages.forEach(this.addMsg.bind(this))
    this.trigger()
  },

  /** Main method */
  pop: pop

})

/********************************** Export ***********************************/

module.exports = Popup
