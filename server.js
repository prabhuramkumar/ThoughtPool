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

var url = 'mongodb://localhost:27017/Thola';

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
app.use(express.static(path.join(__dirname, 'public')));

//check whether it can be deleted
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.get('/api/comments', function(req, res) {
  var requests =  mongoose.model('request');

  requests.find(function(err, result){
   if (err) {
        console.log(err);
      } else {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
      }
  });
});

app.post('/api/comments', function(req, res) {

var request =  mongoose.model('request');
var newRequest = new request({
      origin: req.body.origin,
      destination: req.body.destination,
      via: req.body.via,
      seats: req.body.seats,
      provider: req.body.provider
});
newRequest.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('documents into the "request" collection are:', result);
        res.setHeader('Cache-Control', 'no-cache');
        res.json(result);
      }
    });

});

require('./config/routes')(app, config, passport, fs, path);

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
