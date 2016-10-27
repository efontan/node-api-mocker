/** Importing needed Modules **/
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const path = require('path')

/** Importing my own Modules **/
const CONST = require('./util/const');
const ConfReader = require('./util/conf-reader');
const Router = require('./router');

function Controller() {
    this.routes = [];
}

/**
 * Initialises the controller with a given config.
 * @param {string} configPath Path to config
 */
Controller.prototype.init = function (configPath) {
    ConfReader.readIn(configPath);
    this.routes = ConfReader.routes;
};

/**
 * Uses the read in config to build an express server.
 * @param {function} callback which is called with server once stared
 */
Controller.prototype.buildServer = function (callback) {
    var server = express();
    //-- Setup Body Parser --//
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    //-- Setup Logging Solution --//
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }); //TODO: Redirect to folder logs
    server.use(morgan('combined', { stream: accessLogStream }));

    this.routes.forEach((route) => {
        var router = new Router(route.success, route.error, ConfReader.config.fail);
        switch (route.method.toUpperCase()) {
            case "GET":
                console.log('Registered GET:', route.path);
                server.get(route.path, router.handle);
                break;
            case "POST":
                console.log('Registered POST:', route.path);
                server.post(route.path, router.handle);
                break;
            case "PUT":
                console.log('Registered PUT:', route.path);
                server.put(route.path, router.handle);
                break;
            case "DELETE":
                console.log('Registered DELETE:', route.path);
                server.delete(route.path, router.handle);
                break;
            default:
                console.log('Unknown HTTP Verb in given route', route)
                break;
        }
    });

    server.listen(ConfReader.config.port, callback(null, server));
};

module.exports = new Controller();