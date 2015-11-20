var Reflux = require('reflux');

var ActionCollections = Reflux.createActions([
	'loadPools',
	'createPool'
]);

module.exports = ActionCollections;