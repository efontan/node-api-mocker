#! /usr/bin/env node

/** Importing needed Modules **/
var express = require('express')
var fs = require("fs");
var bodyParser = require('body-parser');

/** Importing my own Modules **/
var routesSetup = require('./lib/routes_setup')
var FILE_ENCODING = require('./constants/contstants').FILE_ENCODING

if (require.main === module) startAsCmd()
else module.exports = start

function start(configFile) {
    
    return function (callback){
        var callback = (typeof callback === 'function') ? callback : function () { };

        if (!configFile) return callback('Missing Configuration File', null);

        fs.readFile(configFile, FILE_ENCODING, function (err, configAsString) {
            //Validate configAsString as JSON

            //Parse Config
            var config = JSON.parse(configAsString);
            //Validate Config

            //TODO: Initialise Controller

            //TODO: Initialise Routes
            
            var app = express();
            var port = config.port;
            var server = app.listen(port);
            callback(null, server);
        });
    }

        function read(err, data) {

            if (err) return reject(err)

            var serverConf = JSON.parse(data)
                , routes = serverConf.routes
                , port = serverConf.port
                , listener = express()
                , server = undefined

            routesSetup(listener, routes)

            server = listener.listen(port)

            return resolve(server)

        }

    })

}

function startAsCmd() {

    if (process.argv.length !== 3) console.log('usage: node rest-server-mock path_to_config_file')

    else start(process.argv[2])
        .then(function (server) {
                console.log('RestServerMock is listening on port: ', server.address().port, ' ...')
                console.log('Configuration file: ', process.argv[2])
            }
            , function (err) {
                console.log(err)
            })

}

