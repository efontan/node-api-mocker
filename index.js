#! /usr/bin/env node

/** Importing needed Modules **/
var express = require('express');
var fs = require("fs");
var jsonfile = require('jsonfile');
var scribe = require("scribe-js")(); //Load Scribe
var bodyParser = require('body-parser');
/** Importing my own Modules **/
var Controller = require('./lib/controller.js');
var Validator = require('./lib/schemaValidator.js');
var FILE_ENCODING = require('./constants/contstants').FILE_ENCODING;
var ERROR = require('./constants/contstants.js').ERROR;

var console = process.console; //create a local (for the module) console

if (require.main === module) startAsCmd();
else module.exports = start;

function start(configFile, callback) {
    var callback = (typeof callback === 'function') ? callback : function () { };
    
    if (!configFile) return callback('Missing Configuration File', null);
    

    //Validate Config (As valid JSON and valid Configuration)
    if (!Validator.CONFIG(configFile)) return callback(ERROR.Invalid_Config, null);
    

    //Parse Config
    var config = jsonfile.readFileSync(configFile);
    
    //Initialise Server
    var app = express();
    //Setup Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(scribe.express.logger()); //Log each request
    
    app.use('/logs', scribe.webPanel());
    Controller.initRoutes(app, config);
    //Configure Server and Start Server
    var port = config.port;
    var server = app.listen(port);
    //Return Server
    callback(null, server);
}

function startAsCmd() {
    if (process.argv.length !== 3) console.log('Example Usage: node node-api-mocker path_to_config_file');
    else start(process.argv[2], function (err, server) {
        if (err) return console.tag('Server Exception').date().log(err);
        console.tag('Server Information').date().log('Node-Api-Mocker is listening on port: ', server.address().port);
        console.tag('Server Information').date().log('Used Configuration File is: ', process.argv[2]);
        console.tag('Server Information').date().log('All logs can be found under http://youraddress:port/logs');
    });
}

