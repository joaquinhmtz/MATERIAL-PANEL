const env	    = process.env.NODE_ENV || '';
const path      = require("path");
const rootPath  = path.normalize(__dirname + '/..');
require('dotenv').config({path: rootPath + '/.env' + (env ? '.' + env : '')});

function createConfig() {
    const config =  {
		db : {
			user: process.env.MONGO_USER,
            password : process.env.MONGO_PASS,
			cluster : process.env.MONGO_CLUSTER,
			ip : process.env.MONGO_IP,
			db : process.env.MONGO_DB
		},
		root: rootPath,
		app: {
			name: process.env.APP_NAME
		},
        secret : process.env.SECRET,
		port: parseInt(process.env.PORT),
        isProduction: (process.env.PRODUCTION === "true")
	};
	
	config.db.url = `mongodb+srv://${config.db.user}:${config.db.password}@${config.db.cluster}/${config.db.db}?retryWrites=true&w=majority`

    return config;
}

module.exports = {
	createConfig
}

