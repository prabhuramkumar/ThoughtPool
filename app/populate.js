'use strict'

/********************************* Utilities *********************************/

function populate (Model, data) {

  var promise = Model.findQ()
  .then(function (docs) {
    if (!docs || !docs.length) throw null
  })
  .catch(function() {
    return Promise.all(data.map(function (elem) {
      return Model.createQ(elem)
    }))
    .then(function (docs) {
      console.log("-- mapped docs:", docs);
      return docs
    })
  })

  // Attach a fail handler and return the promise
  return promise.catch(console.error.bind(console))
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
