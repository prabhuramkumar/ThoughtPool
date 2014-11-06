'use strict'

/********************************* Polyfills *********************************/

require('es6-promise').polyfill()

/******************************* Dependencies ********************************/

// App
var app = require('app/app-base')

/********************************* Bootstrap *********************************/

/** Open the database, then bootstrap the application */
require('app/db').once('open', function() {

  /** Populate the DB before continuing */
  require('app/populate').then(function() {

    /** Config */

    // Files and parsing
    require('app/view')

    // Routing
    require('app/route')

    // Server
    var server = require('app/server')

    /** Serve */

    var port = app.get('port')

    server.listen(port, console.log.bind(console, 'Starting http on port', port))

  }).catch(console.error.bind(console))

})
