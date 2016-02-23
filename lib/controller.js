/** Importing needed Modules **/
var fs = require('fs');
var path = require('path');
/** Importing my own Modules **/
var Validator = require('./schemaValidator.js');
var UTIL = require('./util.js');
var FILE_ENCODING = require('../constants/contstants.js').FILE_ENCODING
var ERROR = require('../constants/contstants.js').ERROR;

var console = process.console; //create a local (for the module) console


var exports = module.exports = {};

/**
 * Registers all paths from the given config on the given server.
 * Also initialises the callbacks on the server for the paths.
 * 
 * @param {object} server The server to register the paths at
 * @param {object} config The config which is used by the server
 */
exports.initRoutes = function (server, config) {
    var failQuote = config.requestFailQuote;
    var basePath = config.responsePath;
    
    config.paths.forEach(function (route) {
        var method = getMethodType(route);

        if (method === undefined && !validateRoute(route, basePath)) return;

        server[method](route.path, function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            
            if (requestIsFailing(failQuote)) {
                if (route.errorResponses.length === 0) return sendResponse(res, route.successResponse.status, (route.successResponse.filename === '') ? '' : path.join(basePath, route.successResponse.filename));
                var selectedError = selectRandomError(route.errorResponses);
                if (selectedError === undefined || selectedError === null) return sendResponse(res, route.successResponse.status, (route.successResponse.filename === '') ? '' : path.join(basePath, route.successResponse.filename));
                else return sendResponse(res, selectedError.status, path.join(basePath, selectedError.filename));
            }
            else return sendResponse(res, route.successResponse.status, (route.successResponse.filename === '') ? '' : path.join(basePath, route.successResponse.filename));

        });

    });
};

//Helper

/**
 * Determines the HTTP Verb of a path and return the proper string version
 * 
 * @param {object} route The path object
 * @return {string} http verb 
 */
function getMethodType(route){
    switch (route.method.toUpperCase()) {
        case 'GET': return 'get';
        case 'POST': return 'post';
        case 'PUT': return 'put';
        case 'DELETE': return 'delete';
        default: return undefined;
    }
}

/**
 * Let the Validator validate the given path
 * 
 * @param {object} route The path object
 * @param {string} folderPath The path to the responses folder
 * @return {boolean} is route valid path
 */
function validateRoute(route, folderPath){
    if (route === undefined || route === null) return false;
    return new Validator.PATH(route.method, route.path, folderPath, route.successResponse, route.errorResponses)
}

/**
 * Uses the given parameter to send an response
 * 
 * @param {object} res The response object
 * @param {number} status The http status for the response
 * @param {string} filePath The path to the response file
 */
function sendResponse(res, status, filepath){
    if (res === null || res === undefined) return;
    if (filepath === '') res.status(status).end();
    else {
        fs.readFile(filepath, FILE_ENCODING, function (err, responseAsString) {
            if (err) {
                console.tag('Server File Error').date().log('Following Error happend: ' + err.toString());
                res.status(500).end(ERROR.Server_Problem);
            }
            else {
                try {
                    res.status(status).json(JSON.parse(responseAsString)).end();
                } catch (exception) {
                    console.tag('Server File Error').date().log('Could not parse ' + filepath + ' to JSON.');
                    res.status(status).end(exception);
                }
                
            }
        });
    }

}

/**
 * Uses the given failQuote to determine if the request failes
 * 
 * @param {number} failqQuote The response fail percentage 
 * @return {boolean} if server responses if error or not
 */
function requestIsFailing(failQuote){
    return (UTIL.randomInt(0, 100) < failQuote);  
}

/**
 * Selects a random error from the given error array
 * 
 * @param {array} res The error array 
 * @return {object} selected error or null
 */
function selectRandomError(arr){
    if (UTIL.isArray(arr)) {
        if (arr.length === 1) return arr[0];
        else return arr[UTIL.randomInt(0, arr.length - 1)];
    }
    else return null;
}