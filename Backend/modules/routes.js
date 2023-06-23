const SuppliesRoute 			= require('./supplies/supplies.route');
const EntriesRoute 				= require('./entries/entries.route');
const ExtrasRoute 				= require('./extras/extras.route');
const OutputsRoute 				= require('./outputs/outputs.route');

module.exports = function (app, router) {
	SuppliesRoute(app, router),
	EntriesRoute(app, router),
	ExtrasRoute(app, router),
	OutputsRoute(app, router)
}