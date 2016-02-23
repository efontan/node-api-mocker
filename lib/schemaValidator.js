/** Importing needed Modules **/
var fs = require('fs');
var jsonfile = require('jsonfile');
var path = require('path');
/** Importing my own Modules **/
var FILE_ENCODING = require('../constants/contstants.js').FILE_ENCODING
var UTIL = require('./util.js');

var console = process.console; //create a local (for the module) console

var exports = module.exports = {};
exports.PATH = function (method, route, folderPath, successResponse, errorResponses) {
    var method = validateMethod(method);
    var path = validatePath(path);
    var response = validateResponse(folderPath, successResponse);
    var errors = validateErrors(folderPath, errorResponses);
    
    console.log("method: " + method);
    console.log("path: " + path);
    console.log("response: " + response);
    console.log("errors: " + errors);

    return method && response && errors;
}

function validateResponse(folderPath, response) {
    if (response === null || response === undefined) return false;
    if (!UTIL.isInteger(response.status)) return false;
    
    fs.readFile(path.join(folderPath, response.filename), FILE_ENCODING, function (err, data) {
        if (err) return false;
        else return true;
    });
}
function validateErrors(folderPath, errors) {
    if (UTIL.isArray(errors)) return false
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

exports.CONFIG = function (configFile){
    
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

function validatePort(port){
    if (port === null || port === undefined) return false;
    return UTIL.isNumber(port) && UTIL.isInteger(port) && port <= 65535 && port >= 0;
}
function validateErrorRate(errorRate){
    if (errorRate === null || errorRate === undefined) return false;
    return UTIL.isNumber(errorRate) && UTIL.isInteger(errorRate) && errorRate <= 100;
}
function validateResponsePath(responsePath){
    if (responsePath === null || responsePath === undefined) return false;
    if (typeof responsePath !== 'string') return false;
    return fs.existsSync(responsePath);
}