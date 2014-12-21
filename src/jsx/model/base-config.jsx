'use strict'

/**
* Base Record configuration.
*/

/******************************* Dependencies ********************************/

// Third party
var Record = require('datacore')

// Custom components
var constants = require('app-constants')

/******************************* Static Config *******************************/

/**
* Attributes and methods for all models
*/

// Base url for all requests
Record.baseUrl = constants.backendUrl

/****************************** Element Config *******************************/

/**
* Attributes and methods for all elements
*/

// Record.prototype.my-property = my-attribute-or-method

/***************************** Collection Config *****************************/

/**
* Attributes and methods for all collections
*/

// Record.collection.prototype.my-property = my-attribute-or-method
