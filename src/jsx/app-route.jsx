'use strict'

/**
* Routing configuration module
*/

/******************************* Dependencies ********************************/

// Third party
var React  = require('react/addons'),
    Router = require('react-router'),
    DefaultRoute = Router.DefaultRoute,
    Routes = Router.Routes,
    Route  = Router.Route

// View components
var Layout = require('view/layout'),
    Index  = require('view/view-index'),
    About  = require('view/about'),
    e404   = require('view/e404')

/********************************** Routing **********************************/

var routes = (

<Route handler={Layout} path='/'>
  <Route handler={Index} />
  <Route name='about' handler={About} />
  <DefaultRoute handler={e404} />
</Route>

)

/********************************* Rendering *********************************/

Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler />, document.body)
})
