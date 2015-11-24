var Reflux = require('reflux');

var ActionCollections = Reflux.createActions([
	'loadPools',
	'createPool',
	'searchPoolList'
]);

module.exports = ActionCollections;