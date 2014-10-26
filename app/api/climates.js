'use strict'

/******************************* Dependencies ********************************/

// Third party
var router  = require('express').Router(),
    _       = require('lodash')

var utils   = require('app/route-utils'),
    Climate = require('app/model/climate')

/********************************** Routing **********************************/

/*----------------------------------- GET -----------------------------------*/

// GET all
router.get('/', function (req, res, next) {
  Climate.findQ()
  .then(res.sendDocs())
  .catch(res.xerr(404))
})

// GET one
// E.g. by name: /one?name=warm
router.get('/one', function (req, res) {
  Climate.findOneQ(req.query)
  .then(res.sendDoc())
  .catch(res.xerr(404))
})

// GET by :_id
router.get('/:_id', function (req, res) {
  Climate.findOneQ(req.params)
  .then(res.sendDoc())
  .catch(res.xerr(404))
})

/*-------------------------------- Catch-All --------------------------------*/

router.all('*', utils.undefinedMethod)

/********************************** Export ***********************************/

module.exports = router
