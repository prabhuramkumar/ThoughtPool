'use strict'

/******************************* Dependencies ********************************/

// Third party
var router = require('express').Router(),
    _      = require('lodash')

var utils  = require('app/route-utils'),
    Place  = require('app/model/place')

/********************************** Routing **********************************/

/*----------------------------------- GET -----------------------------------*/

// GET all
router.get('/', function (req, res, next) {
  Place.findQ()
  .then(res.sendDocs())
  .catch(res.xerr(404))
})

// GET by :_id
router.get('/:_id', function (req, res) {
  Place.findOneQ(req.params)
  .then(res.sendDoc())
  .catch(res.xerr(404))
})

/*---------------------------------- POST -----------------------------------*/

// All POST requests must have a body
router.post('*', utils.nonEmpty)

// POST /
// Creates a new entity
router.post('/', function (req, res) {
  Place.createQ(req.body)
  .then(function (place) {
    res.xsend(place, 'Successfully created a place.')
  })
  .catch(res.xerr(422))
})

/*----------------------------------- PUT -----------------------------------*/

// PUT :_id
// Updates an entity
router.put('/:_id', utils.nonEmpty, function (req, res) {
  Place.findOneQ(req.params)
  .then(function (place) {
    _.assign(place, req.body)
    return place.saveQ()
  })
  .then(function (place) {
    res.xsend(place, 'Successfully updated the place.')
  })
  .catch(res.xerr(400))
})

// PUT :_id/warmup
router.put('/:_id/warmup', function (req, res) {
  Place.findOneQ(req.params)
  .then(function (place) {
    _.assign(place, req.body)
    return place.saveQ()
  })
  .then(function (place) {
    return place.warmUp()
  })
  .then(function (place) {
    res.xsend(place, 'Successfully changed the climate.')
  })
  .catch(res.xerr(404))
})

// PUT :_id/cooldown
router.put('/:_id/cooldown', function (req, res) {
  Place.findOneQ(req.params)
  .then(function (place) {
    _.assign(place, req.body)
    return place.saveQ()
  })
  .then(function (place) {
    return place.coolDown()
  })
  .then(function (place) {
    res.xsend(place, 'Successfully changed the climate.')
  })
  .catch(res.xerr(404))
})

/*--------------------------------- DELETE ----------------------------------*/

// DELETE :_id
router.delete('/:_id', function (req, res) {
  Place.findOneQ(req.params)
  .then(res.exist())
  .catch(res.xerr(404))
  .then(function (place) {
    return place.removeQ()
  })
  .then(function (place) {
    res.xsend(place, 'Deleted the place.')
  })
  .catch(res.xerr(400))
})

/*-------------------------------- Catch-All --------------------------------*/

router.all('*', utils.undefinedMethod)

/********************************** Export ***********************************/

module.exports = router
