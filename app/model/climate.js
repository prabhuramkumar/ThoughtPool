'use strict'

/******************************* Dependencies ********************************/

// Third party
var _ = require('lodash')

// Custom components
var mongoose = require('app/db')

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
