var Reflux = require('reflux');

var ActionCollections = Reflux.createActions([
	'loadPools',
	'createPool',
	'searchPoolList',
	'loadMyPools',
	'deletePool',
	'sendEmail',
	'sendRequestEmail'
]);

module.exports = ActionCollections;