const SuppliesRoute 			= require('./supplies/supplies.route');
const EntriesRoute 				= require('./entries/entries.route');

module.exports = function (app, router) {
	SuppliesRoute(app, router),
	EntriesRoute(app, router)
}