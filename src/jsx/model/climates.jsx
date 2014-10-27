'use strict'

/******************************* Dependencies ********************************/

// Third party
var Record = require('record'),
    _      = require('lodash')

// Custom components
var utils  = require('app-utils'),
    pop    = require('model/popup').pop,
    Store  = require('model/base-store')

/********************************* Utilities *********************************/

// Pop an error message when fetching climates fails
function errPop (error) {
  pop({
    type : 'danger',
    text : 'Something went wrong when retrieving climates.'
  })
  console.error("-- error:", error)
}

var err = console.error.bind(console)

/******************************* Record Model ********************************/

var Climate = Record.derive({
  /** Model */

  path: 'climates',

  constructorName: 'ClimateModel',

  getByName: function (name) {
    return this.readOne({affix: 'one', data: {name: name}})
  }

}, {
  /** Element */

  constructorName: 'Climate',

  $idKey: '_id',

  /**
  * Element schema. Its values are "filters" that assert the types and set the
  * default values, or can be functions that transform the source value.
  * These attributes are always included, and any extra attributes are
  * discarded. The id attribute, if available, is always included.
  *
  * This schema also determines what to sync to the server. The filters are
  * applied the same way as when reading. Anything extra will be ignored.
  */
  $schema: {
    name: '',
    recommendation: '',
    createdAt: utils.date
  },

  /**
  * Client-side extensions. These won't be synced to the server.
  */
  $extendedSchema: {
    // Random bonus attribute
    extra: function() {
      return _.values(_.omit(_.clone(this), 'extra')).join('|')
    }
  }

})

/******************************* Reflux Store ********************************/

var Climates = Store({

  Climate: Climate,

  init: function() {
    this.all = Climate.newCollection()
    this.reload()
  },

  reload: function() {
    return this.all.$read()
    .then(climates => {
      console.log("-- climates:", climates)
      this.trigger()
    })
    .catch(errPop)
  }

})

/********************************** Export ***********************************/

module.exports = Climates
