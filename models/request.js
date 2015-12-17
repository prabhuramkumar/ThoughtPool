var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	email: String,
	name: String,
	originAddress: String,
	destinationAddress: String,
	provider: Boolean,
	time: String,
	encodedRoute: String,
	createdOn: Date,
	everyday: Boolean
});

mongoose.model('request', requestSchema)