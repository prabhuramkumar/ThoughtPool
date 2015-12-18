var fs = require('fs');
var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require("passport");
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var ejs = require('ejs');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

require('./config/passport')(passport, config);

var app = express();

var url = config.app.mongoUrl;
var mongoose = require('mongoose');
mongoose.connect(url);
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
 if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

app.set('port', config.app.port);
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(
  {
    secret: 'tholasessionkey',
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());


//check whether it can be deleted
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

require('./config/routes')(app, config, passport, mongoose, fs, path);


app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
