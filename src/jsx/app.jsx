'use strict'

/**
* Entry module. Bootstraps the application.
*/

/********************************* Polyfills *********************************/

require('es6-promise').polyfill()

/*************************** Twitter Bootstrap JS ****************************/

require('react-bootstrap')

/********************************** Config ***********************************/

// Application constants
require('app-constants')

// Base model configuration
require('model/base-config')

// Initialise routing and rendering
require('app-route')
