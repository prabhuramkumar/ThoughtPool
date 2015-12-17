var Reflux = require('reflux');

var ActionCollections = Reflux.createActions([
	'loadPools',
	'createPool',
	'searchPoolList',
	'loadMyPools',
	'deletePool',
	'sendEmail'
]);

module.exports = ActionCollections;