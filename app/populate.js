'use strict'

/******************************* Dependencies ********************************/

// Third party
var Q = require('q')

/********************************* Utilities *********************************/

function populate (Model, data) {

  var promise = Model.findQ()
  .then(function (docs) {
    if (!docs || !docs.length) throw null
  })
  .catch(function() {
    return Q.all(data.map(function (elem) {
      return Model.createQ(elem)
    }))
    .then(function (docs) {
      console.log("-- mapped docs:", docs);
      return docs
    })
  })

  // Let it throw errors
  promise.done()

  return promise

}

/********************************* Populate **********************************/

// Aggregate the populate promises
var promise = Q.all([
  populate(require('app/model/place'),   require('app/populate/place')),
  populate(require('app/model/climate'), require('app/populate/climate'))
])
.then(function() {
  console.log("-- finished populating");
})

/********************************** Export ***********************************/

module.exports = promise
