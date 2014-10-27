'use strict'

/**
* Routing configuration module
*/

/******************************* Dependencies ********************************/

// Third party
var React  = require('react/addons'),
    Routes = require('react-router').Routes,
    Route  = require('react-router').Route

// View components
var Layout = require('view/layout'),
    Index  = require('view/view-index'),
    About  = require('view/about'),
    e404   = require('view/e404')

/********************************* Rendering *********************************/

React.renderComponent(

<Routes location='history'>
  <Route handler={Layout}>
    <Route handler={Index} />
    <Route name='about' handler={About} />
    <Route name='*' handler={e404} />
  </Route>
</Routes>

, document.body)
