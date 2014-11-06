'use strict'

/******************************* Dependencies ********************************/

var Promise = require('bluebird')

/********************************* Utilities *********************************/

function populate (Model, data) {

  return Model.findAsync()
  .then(function (docs) {
    if (!docs || !docs.length) throw null
  })
  .catch(function() {
    return Promise.all(data.map(function (elem) {
      return Model.createAsync(elem)
    }))
    .then(function (docs) {
      console.log("-- mapped docs:", docs);
      return docs
    })
  })

}

/********************************* Populate **********************************/

// Aggregate the populate promises
var promise = Promise.all([
  populate(require('app/model/place'),   require('app/populate/place')),
  populate(require('app/model/climate'), require('app/populate/climate'))
])
.then(function() {
  console.log("-- finished populating");
})

/********************************** Export ***********************************/

module.exports = promise
