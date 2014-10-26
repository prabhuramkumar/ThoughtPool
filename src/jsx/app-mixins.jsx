'use strict'

/**
* Mixins for reuse in components.
*/

/******************************* Dependencies ********************************/

// Third party
var React    = require('react/addons'),
    _        = require('lodash'),
    listen   = require('reflux').ListenerMixin

// Custom components
var utils    = require('app-utils'),
    Popup    = require('model/popup'),
    Places   = require('model/places'),
    Climates = require('model/climates')

/********************************* Utilities *********************************/

/**
* Returns a function that subscribes a component to a Reflux store. Sometimes
* we pass the origin (the component that called the trigger) into store
* trigger calls. This listener function re-renders the component if it's not
* the origin of the event.
*/
function enroll (store) {
  return function() {
    this.listenTo(store, origin => {
      if (origin !== this) this.forceUpdate()
    })
  }
}

/**
* Maps given Reflux stores to a mixin that gives a component the Reflux
* #listenTo method and subscribes it to the given store.
*/
function listenSetup (stores) {
  return _.mapValues(stores, (store, key) => [
    listen,
    {componentWillMount: enroll(store)}
  ])
}

/****************************** Mixins / Export ******************************/

/**
* Reflux store subscription mixins
*/
exports.listen = listenSetup({
  Popup    : Popup,
  Places   : Places,
  Climates : Climates
})

/**
* Empty initial state
*/
exports.gis = {
  getInitialState: () => ({})
}

/**
* Republish React.addons.LinkedStateMixin
*/
exports.link = React.addons.LinkedStateMixin
