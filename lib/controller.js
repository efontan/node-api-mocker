/** Importing needed Modules **/
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const path = require('path')
/** Importing my own Modules **/
const Validator = require('./schema-validator');
const UTIL = require('./util/helper');
const CONST = require('./util/const');
const ConfReader = require('./util/conf-reader');

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
function _DetermineServerErrors(failQuote) {
    if (failQuote === 0)
        return false;
    else
        return (UTIL.randomInt(0, 100) < failQuote);
}

Controller.prototype.init = function (configPath) {
    ConfReader.readIn(configPath);

    if (ConfReader.conf === undefined) {
        console.log(CONST.ERROR_MESSAGES.INVALID_CONF);
        process.exit(1);
    }

    this.routes = ConfReader.routes;
}

Controller.prototype.buildServer = function (callback) {
    var server = express();
    //-- Setup Body Parser --//
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    //-- Setup Logging Solution --//
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    server.use(morgan('combined', { stream: accessLogStream }))

    this.routes.forEach((route) => {
        switch (route.method.toUpperCase()) {
            case "GET":
                console.log('Registered GET:', route.path);
                server.get(route.path, (req, res) => {
                    var response;

                    if (_DetermineServerErrors(ConfReader.conf.fail))
                        response = UTIL.selectRandomElement(route.sucess);
                    else
                        response = UTIL.selectRandomElement(route.sucess);

                    res.status(response.status).json(response.body).end();
                });
                break;
            case "POST":
                console.log('Registered POST:', route.path);
                server.post(route.path, (req, res) => {
                    var response;

                    if (_DetermineServerErrors(ConfReader.conf.fail))
                        response = UTIL.selectRandomElement(route.sucess);
                    else
                        response = UTIL.selectRandomElement(route.sucess);

                    res.status(response.status).json(response.body).end();
                });
                break;
            case "PUT":
                console.log('Registered PUT:', route.path);
                server.put(route.path, (req, res) => {
                    var response;

                    if (_DetermineServerErrors(ConfReader.conf.fail))
                        response = UTIL.selectRandomElement(route.sucess);
                    else
                        response = UTIL.selectRandomElement(route.sucess);

                    res.status(response.status).json(response.body).end();
                });
                break;
            case "DELETE":
                console.log('Registered DELETE:', route.path);
                server.delete(route.path, (req, res) => {
                    var response;

                    if (_DetermineServerErrors(ConfReader.conf.fail))
                        response = UTIL.selectRandomElement(route.sucess);
                    else
                        response = UTIL.selectRandomElement(route.sucess);

                    res.status(response.status).json(response.body).end();
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