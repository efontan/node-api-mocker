#! /usr/bin/env node

/** Importing needed Modules **/
var express = require('express')
var fs = require("fs");
var bodyParser = require('body-parser');
/** Importing my own Modules **/
var routesSetup = require('./lib/controller.js')
var FILE_ENCODING = require('./constants/contstants').FILE_ENCODING

if (require.main === module) startAsCmd()
else module.exports = start

function start(configFile, callback) {
        var callback = (typeof callback === 'function') ? callback : function () { };

        if (!configFile) return callback('Missing Configuration File', null);

        fs.readFile(configFile, FILE_ENCODING, function (err, configAsString) {
            //Validation
            
            //Config valid JSON
            //Path to Responses exists

            //Parse Config
            var config = JSON.parse(configAsString);
            //Validate Config

            //TODO: Initialise Controller

            //TODO: Initialise Routes
            
            var app = express();
            //Setup Middleware
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: false }));
            //Initliase Server
            var port = config.port;
            var server = app.listen(port);

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

