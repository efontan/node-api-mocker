/** Importing needed Modules **/
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

/** Importing my own Modules **/
const Validator = require('./schema-validator');
const UTIL = require('./util/helper');
const CONST = require('./util/const');
const ConfReader = require('./util/conf-reader');


var console = process.console; //create a local (for the module) console

function Controller() {
    this.routes = [];
}

/**
 * Determines the HTTP Verb of a path and return the proper string version
 * 
 * @param {object} route The path object
 * @returns {string} http verb 
 */
function _GetHTTPVerb(route) {
    switch (route.method.toUpperCase()) {
        case 'GET': return 'get';
        case 'POST': return 'post';
        case 'PUT': return 'put';
        case 'DELETE': return 'delete';
        default: return 'get';
    }
}

/**
 * Uses the given failQuote to determine if the request failes
 * 
 * @param {number} failqQuote The response fail percentage 
 * @returns {boolean} if server responses if error or not
 */
function _DetermineServerErrors() {
    return (UTIL.randomInt(0, 100) < failQuote);
}

Controller.prototype.init = function (configPath) {
    ConfReader.readIn(configPath);

    if (ConfReader.conf === undefined) {
        console.log(CONST.ERROR_MESSAGES.INVALID_CONF);
        process.exit(1);
    }

    this.routes = CONF.paths;
}

Controller.prototype.buildServer = function (callback) {
    var server = express();
    //-- Setup Body Parser --//
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    //-- Setup Logging Solution --//
    app.use(scribe.express.logger());
    app.use('/logs', scribe.webPanel());

    this.routes.forEach((route) => {
        switch (route.method.toUpperCase()) {
            case "GET":
                app.get(route.path, (req, res) => {
                    var response;

                    if (_DetermineServerErrors())
                        response = UTIL.selectRandomElement(route.sucess);
                    else
                        response = UTIL.selectRandomElement(route.sucess);

                    res.json(response.status, response.body)
                });
                break;
            case "POST":
                app.post(route.path, (req, res) => {
                    var response;

                    if (_DetermineServerErrors())
                        response = UTIL.selectRandomElement(route.sucess);
                    else
                        response = UTIL.selectRandomElement(route.sucess);

                    res.json(response.status, response.body)
                });
                break;
            case "PUT":
                app.put(route.path, (req, res) => {
                    var response;

                    if (_DetermineServerErrors())
                        response = UTIL.selectRandomElement(route.sucess);
                    else
                        response = UTIL.selectRandomElement(route.sucess);

                    res.json(response.status, response.body)
                });
                break;
            case "DELETE":
                app.delete(route.path, (req, res) => {
                    var response;

                    if (_DetermineServerErrors())
                        response = UTIL.selectRandomElement(route.sucess);
                    else
                        response = UTIL.selectRandomElement(route.sucess);

                    res.json(response.status, response.body)
                });
                break;
            default:
                console.log('Unkown HTTP Verb in given route', route)
                break;
        }
    });

    server.listen(ConfReader.conf.port, callback);
}

module.exports = new Controller();