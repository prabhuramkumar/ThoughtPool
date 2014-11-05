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
    unique: true,
    match: [/^[A-Za-z]+/, 'Name must be a word.']
  },

  city: {
    type: String,
    trim: true,
    required: true,
    match: [/^[A-Za-z]+/, 'City must be a word.']
  },

  climateName: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    enum: {
      values: ['cold', 'warm'],
      message: 'Climate must be `cold` or `warm`.'
    }
  },

  createdAt: {
    type:    Date,
    default: Date.now
  }

}, {

  collection: 'places',

  toObject: {
    getters: true,
    virtual: true
  }

})

/***************************** Instance Methods ******************************/

Schema.methods.warmUp = function() {
  this.climateName = 'warm'
  return this.saveQ()
}

Schema.methods.coolDown = function() {
  this.climateName = 'cold'
  return this.saveQ()
}

/********************************** Export ***********************************/

var Place = mongoose.model('Place', Schema)

module.exports = Place
