#! /usr/bin/env node

/** Importing needed Modules **/
var express = require('express');
var fs = require("fs");
var bodyParser = require('body-parser');
/** Importing my own Modules **/
var Controller = require('./lib/controller.js');
var Validator = require('./lib/schemaValidator.js');
var FILE_ENCODING = require('./constants/contstants').FILE_ENCODING;

if (require.main === module) startAsCmd();
else module.exports = start;

function start(configFile, callback) {
    var callback = (typeof callback === 'function') ? callback : function () { };
    
    if (!configFile) return callback('Missing Configuration File', null);
    
    fs.readFile(configFile, FILE_ENCODING, function (err, configAsString) {
        //Validate Config (As valid JSON and valid Configuration)
        if (!Validator.CONFIG(configAsString)) return console.log('Invalid Configuration File'); //TODO: Make Class with static content to send
        //Parse Config
        var config = JSON.parse(configAsString);
        //Initialise Server
        var app = express();
        //Setup Middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        Controller.initRoutes(app, config);
        //Configure Server and Start Server
        var port = config.port;
        var server = app.listen(port);
        //Return Server
        callback(null, server);
    });
}

function startAsCmd() {
    if (process.argv.length !== 3) console.log('Example Usage: node node node-api-mocker path_to_config_file'); //TODO: Make Class with static content to send 
    else start(process.argv[2], function (err, server) {
        if (err) console.log(err);
        console.log('Node-Api-Mocker is listening on port: ', server.address().port);
        console.log('Used Configuration File is: ', process.argv[2]);
    });
}

