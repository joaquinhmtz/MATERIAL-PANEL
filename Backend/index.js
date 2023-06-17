const express           = require('express');
const mongoose          = require('mongoose');
const morgan            = require('morgan');
const bodyParser        = require('body-parser');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;


const app               = express();
const router            = express.Router();
const server            = require('http').Server(app);
const config            = require('./config/config').createConfig();

global.config = config;

app.config = config;
app.name = config.app.name;
app.secret = config.secret;

async function ConnectDB () {
    try {
        let connection = await mongoose.connect(config.db.url);

        if (connection != null || connection != undefined) 
            console.log('Connected to Database', config.db.db);
      } catch (error) {
        console.log('Error Database', error);
      }
}

ConnectDB();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PUT, OPTIONS");
	next();
});

//Express module
require('./config/express')(app);

//Routes module
require('./modules/routes')(app, router);

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.use('/', router);

//Error Middleware
//app.use(errorMiddleware);

server.listen(app.get('port'), function () {
	console.log("\n" + config.app.name + " SERVER RUNNING ON: " + app.get('port'));
});