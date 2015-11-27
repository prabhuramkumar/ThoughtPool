var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	  email: String,
	  name: String,
	  origin: String,
	  originAddress: String,
      destination: String,
	  destinationAddress: String,
      via: String,
	  viaAddress: String,
      provider: Boolean,
      time: String,
      routeEncoded: String
});

mongoose.model('request', requestSchema)