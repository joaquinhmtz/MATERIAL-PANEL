const express               = require('express');
const bodyParser            = require('body-parser');
const expressValidator      = require('express-validator');
const fs                    = require('fs');

module.exports = function(app) {
	const port = app.config.port || 3000;
	app.set('showStackError', true);
	app.use(express["static"]("" + app.config.root + "/public"));
    app.set('port', port);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
}