var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	  email: String,
	  name: String,
	  origin: String,
      destination: String,
      via: String,
      provider: Boolean
});

mongoose.model('request', requestSchema)