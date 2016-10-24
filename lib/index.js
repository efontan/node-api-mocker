#! /usr/bin/env node

/** Importing needed Modules **/
var scribe = require("scribe-js")(); //Load Scribe

/** Importing my own Modules **/
const Controller = require('./controller');
const CONST = require('./util/const');


var console = process.console; //create a local (for the module) console

if (require.main === module) startAsCmd();
else module.exports = start;

/**
 * Loads the given configh through the path and configures a mock server according to the used config.
 * After the server is up and running the callback is called with either an error or a reference to the server.
 * @param {string} pathToConfig path to the configFile
 * @param {function} callback get called with server reference or error
 */
function start(pathToConfig, callback) {
    var callback = (typeof callback === 'function') ? callback : function () { };

    if (!pathToConfig)
        return callback(new Error(CONST.ERROR_MESSAGES.MISSING_CONF), null);

    Controller.init(pathToConfig);
    Controller.buildServer(callback);
}

/**
 * Starts the server via command line. And displays information regarding the server start.
 */
function startAsCmd() {
    if (process.argv.length !== 3) console.log('Example Usage: node node-api-mocker path_to_config_file');
    else start(process.argv[2], function (err, server) {
        if (err) return console.tag('Server Exception').date().log(err);
        console.tag('Server Information').date().log('Node-Api-Mocker is listening on port: ', server.address().port);
        console.tag('Server Information').date().log('Used Configuration File is: ', process.argv[2]);
        console.tag('Server Information').date().log('All logs can be found under http://youraddress:port/logs');
    });
}

