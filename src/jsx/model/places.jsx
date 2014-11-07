'use strict'

/******************************* Dependencies ********************************/

// Third party
var Record  = require('record'),
    _       = require('lodash')

// Custom components
var utils   = require('app-utils'),
    pop     = require('model/popup').pop,
    Store   = require('model/base-store'),
    Climate = require('model/climates').Climate

/********************************* Utilities *********************************/

// Pop an error message when fetching places fails
function errPop (error) {
  pop({
    type : 'danger',
    text : 'Something went wrong when retrieving places.'
  })
  utils.error("-- error:", error)
}

/******************************* Record Model ********************************/

var Place = Record.derive({
  /** Static */

  path: 'places'

}, {
  /** Element */

  $constructorName: 'Place',

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
    city: '',
    climateName: '',
    createdAt: utils.date
  },

  /**
  * Contrived example of complementing a model asynchronously on the client.
  * These extensions are loaded before the CRUD promise that fetches this
  * element is resolved. They won't be synced to the server when saving.
  */
  $extendedSchema: {
    // Nested model loaded from server
    climate: function() {
      return Climate.getByName(this.climateName)
    },
    // Random bonus attribute
    gist: function() {
      return _.values(_.omit(_.clone(this), 'gist'))
        .filter(x => typeof x === 'string').join('|')
    }
  },

  $isWarm: function() {
    return this.climateName.toLowerCase() === 'warm'
  },

  $isCold: function() {
    return this.climateName.toLowerCase() === 'cold'
  },

  $warmUp: function() {
    return this.$save({affix: 'warmup'})
  },

  $coolDown: function() {
    return this.$save({affix: 'cooldown'})
  }

})

/******************************* Reflux Store ********************************/

var Places = Store({

  Place: Place,

  init: function() {
    this.all = Place.newCollection()
    this.reload()
  },

  reload: function() {
    return this.all.$read()
    .then(places => {
      utils.log("-- places:", places)
      this.trigger()
    })
    .catch(errPop)
  }

})

/********************************** Export ***********************************/

module.exports = Places
