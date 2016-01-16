/** Importing needed Modules **/
var fs = require('fs');
var path = require('path');
/** Importing my own Modules **/
var Validator = require('./schemaValidator.js');
var FILE_ENCODING = require('./constants/contstants').FILE_ENCODING


var exports = module.exports = {routes : []};
exports = function initRoutes(server, config) {
    var basePath = config.responsePath;

    config.paths.forEach(function (route) {
        var method = getMethodType(route);

        if (method === undefined) return;
        if (!validateRoute(route)) return;

        server[method](route.path, function (req, res) {
            fs.readFile(path.join(basePath, route.successResponse.filename), FILE_ENCODING, function (err, responseAsString) {
                if (err) {
                    res.status = 500;
                    res.end('Server Error'); //TODO: Make Class with static content to send 
                } else {
                    res.status = route.successResponse.status;
                    if(responseAsString !== '') res.json(JSON.parse(responseAsString));
                    res.end();
                }
            });
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