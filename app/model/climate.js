'use strict'

/******************************* Dependencies ********************************/

// Third party
var mongoose = require('mongoose-q')(),
    _        = require('lodash')

/********************************** Schema ***********************************/

var Schema = new mongoose.Schema({

  id: false,

  name: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    enum: {
      values: ['cold', 'warm'],
      message: 'Name must be `cold` or `warm`.'
    }
  },

  recommendation: {
    type: String,
    trim: true,
    required: true
  },

  createdAt: {
    type:    Date,
    default: Date.now
  }

}, {

  collection: 'climates',

  toObject: {
    getters: true,
    virtual: true
  }

})

/********************************** Export ***********************************/

var Climate = mongoose.model('Climate', Schema)

module.exports = Climate
