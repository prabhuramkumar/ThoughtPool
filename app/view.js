'use strict'

/******************************* Dependencies ********************************/

// App
var app = require('app/app-base')

// Third party
var path         = require('path'),
    express      = require('express'),
    logger       = require('morgan'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser')

/********************************** Config ***********************************/

// Serve static files from this directory
app.use(express.static(path.join(__dirname, '../public')))

// Log stuff
app.use(logger('dev'))

// Automatically parse JSON
app.use(bodyParser.json())

// Automatically parse URL-encoded
app.use(bodyParser.urlencoded({extended: true}))

// Automatically parse cookies
app.use(cookieParser())
