'use strict'

/******************************* Dependencies ********************************/

// App
var app  = require('app/app-base')

// Third party
var path = require('path')

/********************************** Globals **********************************/

// Path to our main and only HTML file
var html = path.join(__dirname, '../public/app.html')

/********************************** Routing **********************************/

// /api
app.use('/api', require('app/api/api'))

// Fallback — serve html file for other GET requests
app.get('*', function (req, res) {
  res.sendFile(html)
})

// On all other requests, send an error
app.all('*', function (req, res) {
  res.xerr(400)()
})

/*----------------------------- Error Handlers ------------------------------*/

// Left over from non-SPA architecture, not sure if still relevant
if (app.get('env') !== 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    err = null
    next()
  })
}
