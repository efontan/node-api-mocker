/** Importing needed Modules **/
var fs = require('fs');
var path = require('path');
/** Importing my own Modules **/
var FILE_ENCODING = require('../constants/contstants').FILE_ENCODING

//TODO: Support for Logger 

var exports = module.exports = {};
exports.PATH = function (method, route, folderPath, successResponse, errorResponses) {
    var method = validateMethod(method);
    var path = validatePath(path);
    var response = validateResponse(folderPath, successResponse);
    var errors = validateErrors(folderPath, errorResponses);

    return method && path && response && errors;
}

function validateResponse(folderPath, response) {
    if (response === null || response === undefined) return false;
    if (!Number.isInteger(response.status)) return false;
    
    fs.readFile(path.join(folderPath, response.filename), FILE_ENCODING, function (err, data) {
        if (err) return false;
        else return true;
    });
}
function validatePath(path) {
    return true; //TODO: Implement
}
function validateErrors(folderPath, errors) {
    if (isArray(errors)) return false
    errors.forEach(function (response) {
        if (!validateResponse(folderPath, response)) return false;
    });
    return true;
}
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

exports.CONFIG = function (configAsString){
    var config = undefined;
    
    try {
        config = JSON.parse(configAsString);
    } catch (e) {
        console.log('Invalid json with configAsString  = ' + configAsString)
        return false;
    }
    if (config === null || config === undefined) return false;

    var port = validatePort(config.port);
    var errorRate = validateErrorRate(config.requestFailQuote);
    var responsePath = validateResponsePath(config.responsePath);
    
    return port && errorRate && responsePath;
}

function validatePort(port){
    if (port === null || port === undefined) return false;
    return isNumber(port) && isInteger(port);
}
function validateErrorRate(errorRate){
    if (errorRate === null || errorRate === undefined) return false;
    return isNumber(errorRate) && isInteger(errorRate) && errorRate <= 100;
}
function validateResponsePath(responsePath){
    if (responsePath === null || responsePath === undefined) return false;
    if (typeof responsePath !== 'string') return false;
    return fs.existsSync(responsePath);
}

function isNumber(o) {
    return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
}

function isInteger(o){
    return (o % 1) === 0;
}

/**
 * Check whether an object is Array or not
 * @type Boolean
 * @param {object} subject is the variable that is
 * tested for Array identity check
 */
var isArray = (function () {
    // Use compiler's own isArray when available
    if (Array.isArray) {
        return Array.isArray;
    }
    
    // Retain references to variables for performance
    // optimization
    var objectToStringFn = Object.prototype.toString,
        arrayToStringResult = objectToStringFn.call([]);
    
    return function (subject) {
        return objectToStringFn.call(subject) === arrayToStringResult;
    };
}());