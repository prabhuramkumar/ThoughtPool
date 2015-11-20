/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//db
var url = 'mongodb://localhost:27017/Thola';

var mongoose = require('mongoose');
mongoose.connect(url);
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
 if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});



var COMMENTS_FILE = path.join(__dirname, 'comments.json');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.set('port', (process.env.PORT || 3000));
app.use(allowCrossDomain);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


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



app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
