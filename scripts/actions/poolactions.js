var Reflux = require('reflux');

var ActionCollections = Reflux.createActions([
	'loadPools',
	'createPool',
	'searchPoolList',
	'loadMyPools',
	'deletePool'
]);

module.exports = ActionCollections;