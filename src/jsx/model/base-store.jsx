'use strict'

/******************************* Dependencies ********************************/

// Third party
var Reflux = require('reflux'),
    _      = require('lodash')

// Custom components
var utils  = require('app-utils')

/************************* Default Store Attributes **************************/

var defaults = {

  /**
  * Calls #trigger after the given promise has been resolved. If the passed
  * value is not a promise, #trigger is called right away (but still
  * asynchronously).
  * The origin of the event can be passed as the first argument. It will
  * be passed into the #trigger call.
  */
  do: function (/* [origin], value */) {
    // Setup
    var origin, value
    if (!arguments.length) return
    else if (arguments.length === 1) {
      value = arguments[0]
    } else {
      origin = arguments[0]
      value = arguments[1]
    }

    // Execute
    return Promise.resolve(value).then(() => this.trigger(origin)).catch(utils.err)
  }

}

/****************************** Store Generator ******************************/

/**
* Makes a store with the default and provided attributes.
*/
function Store (attributes) {
  var attrs = _.merge({}, defaults, attributes)
  return Reflux.createStore(attrs)
}

/********************************** Export ***********************************/

module.exports = Store
