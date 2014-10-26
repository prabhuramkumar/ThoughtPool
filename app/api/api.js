 'use strict'

/******************************* Dependencies ********************************/

// Third party
var router = require('express').Router()

// Custom components
var utils  = require('app/route-utils')

/******************************** Subrouters *********************************/

// places
router.use('/places', require('app/api/places'))

// climates
router.use('/climates', require('app/api/climates'))

/********************************** Routing **********************************/

// GET hello
router.get('/hello', function (req, res) {
  res.xsend('Hello from South Pole!')
})

/*-------------------------------- Catch-All --------------------------------*/

router.all('*', utils.undefinedMethod)

/********************************** Export ***********************************/

module.exports = router
