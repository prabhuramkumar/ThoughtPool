'use strict'

/******************************* Dependencies ********************************/

// Third party
var _ = require('lodash')

/********************************* Utilities *********************************/

// Primitive resolution function
function result (value) {
  return typeof value === 'function' ? value() : value
}

/**************************** Utilities / Export *****************************/

/**
* Coerces a value into a date if possible
*/
function date (value) {
  return new Date(value).valueOf() || value
}
exports.date = date

/**
* Tries to get the contents of the X-Msg header out of an xhr object
*/
function getXMsg (xhr) {
  try {
    return JSON.parse(xhr.getResponseHeader('X-Msg'))
  } catch (err) {
    return null
  }
}
exports.getXMsg = getXMsg

/**
* Inserts the given value between each two elements in an array.
* If the value is a function, it's called on each iteration to produce
* the inserted result.
*/
function insert (array, value) {
  if (arguments.length < 2 || !_.isArray(array)) return array

  var index = array.length
  while (--index > 0) array.splice(index, 0, result(value))
  return array
}
exports.insert = insert
