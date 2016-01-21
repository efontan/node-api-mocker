/** Importing needed Modules **/
var fs = require('fs');
var path = require('path');
/** Importing my own Modules **/
var Validator = require('./schemaValidator.js');
var UTIL = require('./util.js');
var FILE_ENCODING = require('../constants/contstants.js').FILE_ENCODING


var exports = module.exports = {routes : []};
exports.initRoutes = function (server, config) {
    var basePath = config.responsePath;
    
    config.paths.forEach(function (route) {
        var method = getMethodType(route);

        if (method === undefined) return;
        if (!validateRoute(route,basePath)) return;

        server[method](route.path, function (req, res) {
            res.setHeader('Content-Type', 'application/json');
            
            
            

            if (route.successResponse.filename === '' || (route.successResponse.filename === undefined || route.successResponse.filename === null)) {
                res.status(route.successResponse.status);
                res.end();
            } else {
                fs.readFile(path.join(basePath, route.successResponse.filename), FILE_ENCODING, function (err, responseAsString) {
                    if (err) {
                        res.status(500);
                        res.end('Server Error'); //TODO: Make Class with static content to send 
                    } else {
                        res.status(route.successResponse.status);
                        if (responseAsString !== '') res.json(JSON.parse(responseAsString));
                        res.end();
                    }
                });
            }
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

function sendErrorResponse(req, res){
    res.setHeader('Content-Type', 'application/json');

    if (route.errorResponses === null || route.errorResponses === undefined) return sendSuccessResponse(req, res);

    if (UTIL.isArray(route.errorResponses) && route.errorResponses.length > 0) return sendSuccessResponse(req, res);

}
function sendResponse(){

}

function isRequestFailing(failQuote){
    return (UTIL.randomInt(0, 100) <= failQuote);  
}