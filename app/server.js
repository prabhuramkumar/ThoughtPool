'use strict'

/******************************* Dependencies ********************************/

// App
var app  = require('app/app-base')

// Third party
var http = require('http')

/********************************** Config ***********************************/

var serverHttp = http.Server(app)

/********************************** Export ***********************************/

module.exports = serverHttp
