'use strict'

/**
* Base Record configuration.
*/

/******************************* Dependencies ********************************/

// Third party
var Record = require('record'),
    _      = require('lodash'),
    Q      = require('q')

// Custom components
var constants = require('app-constants')

/******************************* Model Config ********************************/

/**
* Attributes and methods for all derived models
*/

// Base url for all requests
Record.baseUrl = constants.backendUrl

/****************************** Element Config *******************************/

/**
* Attributes and methods for all derived element classes
*/

// Record.element.prototype.my-property = my-attribute-or-method

/***************************** Collection Config *****************************/

/**
* Attributes and methods for all derived collection classes
*/

// Record.collection.prototype.my-property = my-attribute-or-method
