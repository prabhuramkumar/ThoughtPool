'use strict'

/**
* Extensions for the standard request and response objects in Express
*/

/******************************* Dependencies ********************************/

// Third party
var _ = require('lodash')

/********************************** Globals **********************************/

/** Objects to fill with prototype methods for req and res */
exports.req = {}
exports.res = {}

/** Error table for res.xerr */
var errorTypes = {

  default: {
    code: 500,
    msg: 'Sorry, something went wrong.'
  },

  angry: {
    code: 400,
    msg: 'Bad request!'
  },

  400: {
    code: 400,
    msg: 'Bad request.'
  },

  422: {
    code: 422,
    msg: 'Malformed entity.'
  },

  404: {
    code: 404,
    msg: 'Entity not found.'
  }

}

/******************************** Middleware *********************************/

/**
* Returns 400 if the request body has no data
*/
function nonEmpty (req, res, next) {
  if (_.isEmpty(req.body)) return res.xsend(400, "Request must contain data.")
  next()
}
exports.nonEmpty = nonEmpty

/**
* 404 undefined API method
*/
function undefinedMethod (req, res) {
  res.xsend(404, 'No such API method defined.')
}
exports.undefinedMethod = undefinedMethod

/**************************** Request Extensions *****************************/

/**************************** Response Extensions ****************************/

/**
* Puts extra data into the X-Msg header.
*/
function xmsg (message) {
  if (!message) return this

  this.set({'Access-Control-Expose-Headers': 'X-Msg'})
  this.set({'X-Msg': JSON.stringify(message)})

  return this
}
exports.res.xmsg = xmsg

/**
* Puts an extra message (if any) into the X-Msg header and sends the given
* data. Automatically chooses between #json and #sendStatus methods, like the
* old Express #send method.
*/
function xsend (data, message) {
  this.xmsg(message)

  if (parseInt(data) > 0) this.sendStatus(data)
  else this.json(data)

  return this
}
exports.res.xsend = xsend

/**
* Shorter version of res.xsend.bind(res)
*/
function go() {
  return this.xsend.bind(this)
}
exports.res.go = go

/**
* Returns a function that takes a mongoose document and sends
* its formatted representation.
*/
function sendDoc() {
  return function (doc) {
    if (!doc) throw null
    return this.xsend(doc.toObject())
  }.bind(this)
}
exports.res.sendDoc = sendDoc

/**
* Returns a function that takes mongoose documents and sends
* their formatted representations.
*/
function sendDocs() {
  return function (docs) {
    if (!docs || !docs.length) throw null
    return this.xsend(_.invoke(docs, 'toObject'))
  }.bind(this)
}
exports.res.sendDocs = sendDocs

/**
* Returns a function bound to self (to response object) that sends
* the given error (code and xmsg). If it receives an actual error
* as argument, that error is sent instead of the default message.
*/
function xerr (type) {
  return function (error) {
    console.log('-- error:', error)
    var err  = errorTypes[type] || errorTypes.default,
        code = err.code, msg

    // Format the message
    if (error instanceof Error) {
      // Mongoose errors include a hash of errors
      if (error.errors) msg = _.map(error.errors, 'message')
      // Standard errors have a message
      else msg = error.message
    } else {
      // Non-error: use our default message
      msg = err.msg
    }

    this.xsend(code, msg)
    return this
  }.bind(this)
}
exports.res.xerr = xerr

/**
* Function generator. Returns a function that asserts that the value it got
* is truthy. Useful for Mongo operations that may return null instead of a
* document, or a number of affected documents (e.g. `#update`). Throws an
* error if it gets a falsy value, otherwise returns the value.
*/
function exist() {
  return function (value) {
    if (!value) throw null
    return value
  }.bind(this)
}
exports.res.exist = exist
