/** Importing needed Modules **/
var fs = require('fs');
var path = require('path');
/** Importing my own Modules **/
var FILE_ENCODING = require('../constants/contstants').FILE_ENCODING

//TODO: Support for Logger 

var exports = module.exports = {};
exports.PATH = function (method, route, folderPath, successResponse, errors) {
    var method = validateMethod(method);
    var path = validatePath(path);
    var response = validateResponse(folderPath, successResponse);
    var errors = validateErrors(folderPath, errorResponses);

    return method && path && response && errors;
}

function validateResponse(folderPath, reponse) {
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
    if (!errors.isArray()) return false
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