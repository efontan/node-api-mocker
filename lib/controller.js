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
exports.initRoutes = function (server, config) {
    var basePath = config.responsePath;
    
    config.paths.forEach(function (route) {
        var method = getMethodType(route);

        if (method === undefined && !validateRoute(route, basePath)) return;

        server[method](route.path, function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            
            if (requestIsFailing()) {
                if (route.errorResponses.length <= 0) return sendResponse(res, route.successResponse.status, path.join(basePath, route.successResponse.filename));
                var selectedError = selectRandomError(route.errorResponses);
                if(selectedError === undefined || selectedError === null) return sendResponse(res, route.successResponse.status, path.join(basePath, route.successResponse.filename));
                else return sendResponse(res, selectedError.status, path.join(basePath, selectedError.filename));
            }
            else return sendResponse(res, route.successResponse.status, (route.successResponse.filename === '') ? '' : path.join(basePath, route.successResponse.filename));

        });

    });
};

/** Helper **/
function getMethodType(route){
    switch (route.method.toUpperCase()) {
        case 'GET': return 'get';
        case 'POST': return 'post';
        case 'PUT': return 'put';
        case 'DELETE': return 'delete';
        default: return undefined;
    }
}

function validateRoute(route, folderPath){
    if (route === undefined || route === null) return false;
    return new Validator.PATH(route.method, route.path, folderPath, route.successResponse, route.errorResponses)
}

function sendResponse(res, status, filepath){
    if (res === null || res === undefined) return;
    if (filepath === '') {
        res.status(status);
        res.end();
    }
    else {
        fs.readFile(filepath, FILE_ENCODING, function (err, responseAsString) {
            if (err) {
                console.tag('Server File Error').date().log('Following Error happend: ' + err.toString());
                res.status(500).end(ERROR.Server_Problem);
            }
            else res.status(status).json(JSON.parse(responseAsString)).end();
        });
    }

}

function requestIsFailing(failQuote){
    return (UTIL.randomInt(0, 100) < failQuote);  
}

function selectRandomError(arr){
    if (UTIL.isArray(arr)) {
        if (arr.length == 1) return arr[0];
        else return arr[UTIL.randomInt(0, arr.length - 1)];
    }
    else return null;
}