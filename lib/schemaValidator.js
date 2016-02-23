/** Importing needed Modules **/
var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');
/** Importing my own Modules **/
var FILE_ENCODING = require('../constants/contstants.js').FILE_ENCODING
var UTIL = require('./util.js');

var console = process.console; //create a local (for the module) console

var exports = module.exports = {};

/**
 * Validates a path
 * 
 * @param {string} method The http method of the path
 * @param {string} route The path
 * @param {string} folderPath The http status for the response
 * @param {object} successResponse The succes response object
 * @param {array} errorResponses The error responses array
 * @return {boolean} is path valid
 */
exports.PATH = function (method, route, folderPath, successResponse, errorResponses) {
    var method_result = validateMethod(method);
    var response_result = validateResponse(folderPath, successResponse);
    var errors_result = validateErrors(folderPath, errorResponses);
    
    return method_result && response_result && errors_result;
}

/**
 * Validates config file
 * 
 * @param {string} configFile The path to the config file
 * @return {boolean} is config file valid
 */
exports.CONFIG = function (configFile) {
    
    var config = null;
    try {
        config = jsonfile.readFileSync(configFile);
    } catch (e) {
        console.tag('Server Parse Exception').date().log(e.toString());
        return false;
    }
    
    
    if (config === null || config === undefined) return false;
    
    var port = validatePort(config.port);
    var errorRate = validateErrorRate(config.requestFailQuote);
    var responsePath = validateResponsePath(config.responsePath);
    
    return port && errorRate && responsePath;
}

/**
 * Validates config file
 * 
 * @param {string} configFile The path to the config file
 * @return {boolean} is config file valid
 */
function validateResponse(folderPath, response) {
    if (response === null || response === undefined) return false;
    if (!UTIL.isInteger(response.status)) return false;
    
    fs.readFile(path.join(folderPath, response.filename), FILE_ENCODING, function (err, data) {
        if (err) return false;
        else return true;
    });
}

/**
 * Validates config file
 * 
 * @param {string} configFile The path to the config file
 * @return {boolean} is config file valid
 */
function validateErrors(folderPath, errors) {
    if (UTIL.isArray(errors)) return false
    errors.forEach(function (response) {
        if (!validateResponse(folderPath, response)) return false;
    });
    return true;
}

/**
 * Validates http method
 * 
 * @param {string} method The http method
 * @return {boolean} is method valid
 */
function validateMethod(method) {
    if (typeof method !== 'string') return false;
    
    switch (method.toUpperCase()) {
        case 'GET': return true;
        case 'POST': return true;
        case 'PUT': return true;
        case 'DELETE': return true;
        default: return false;
    }
}

/**
 * Validates port
 * 
 * @param {number} port The server port
 * @return {boolean} is port valid
 */
function validatePort(port){
    if (port === null || port === undefined) return false;
    return UTIL.isNumber(port) && UTIL.isInteger(port) && port <= 65535 && port >= 0;
}

/**
 * Validates error rate
 * 
 * @param {number} errorRate The error response rate of the server
 * @return {boolean} is error response rate valid
 */
function validateErrorRate(errorRate){
    if (errorRate === null || errorRate === undefined) return false;
    return UTIL.isNumber(errorRate) && UTIL.isInteger(errorRate) && errorRate <= 100;
}

/**
 * Validates response path 
 * 
 * @param {string} responsePath The path to the response files
 * @return {boolean} is responsePath valid
 */
function validateResponsePath(responsePath){
    if (responsePath === null || responsePath === undefined) return false;
    if (typeof responsePath !== 'string') return false;
    return fs.existsSync(responsePath);
}