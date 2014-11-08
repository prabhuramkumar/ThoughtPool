'use strict'

/**
* CORS configuration module.
*/

/******************************* Dependencies ********************************/

// App
var app  = require('app/app-base')

// Third party
var cors = require('cors')

/********************************** Globals **********************************/

// Headers to expose in all requests
var exposeHeaders = ['X-Msg'].join(',')

/********************************** Config ***********************************/

// Enable CORS and OPTIONS for all routes
app.use(cors())
app.options('*', cors())

// Expose these headers on all requests
app.all('*', function (req, res, next) {
  res.set({'Access-Control-Expose-Headers': exposeHeaders})
  next()
})
