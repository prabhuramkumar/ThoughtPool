'use strict'

/******************************* Dependencies ********************************/

// App
var app = require('app/app-base')

// Third party
var mongoose = require('mongoose'),
    Promise  = require('bluebird')

/****************************** Mongoose Config ******************************/

// Promisify mongoose
Promise.promisifyAll(mongoose)

/********************************* DB Config *********************************/

// DB
if (app.get('env') === 'development') {
  mongoose.connect('mongodb://localhost/main')
} else {
  mongoose.connect('my-server-somewhere')
}

mongoose.connection.on('open', console.log.bind(console, 'connected to the database successfully'))

mongoose.connection.on('error', console.error.bind(console, 'connection error'))

/********************************** Export ***********************************/

module.exports = mongoose
