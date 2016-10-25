#! /usr/bin/env node

/** Importing my own Modules **/
const Controller = require('./controller');
const CONST = require('./util/const');

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
        if (err) return console.error(err);
        console.log('Node-Api-Mocker is listening ...')
        console.log('Used Configuration File is: ', process.argv[2]);
    });
}

