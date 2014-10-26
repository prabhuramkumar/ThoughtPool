'use strict'

/******************************* Dependencies ********************************/

// Third party
var express = require('express'),
    _       = require('lodash')

// Custom components
var utils   = require('app/route-utils')

/******************************** Extensions *********************************/

/**
* Extend express request and response prototypes with custom attributes.
* This may also be done after creating and configuring the app object.
*/
_.defaults(express.request, utils.req)
_.defaults(express.response, utils.res)

/********************************** Globals **********************************/

var app = express()

app.set('env', 'development')

app.set('port', process.env.PORT || 3000)

/********************************** Export ***********************************/

module.exports = app
