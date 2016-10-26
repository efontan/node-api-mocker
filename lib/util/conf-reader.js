const fs = require('fs');
const Validator = require('../schema-validator');
const CONSTANTS = require('constants');

/**
 * Object which manages reading of config and stores the data for easy access.
 */
function Conf() {
    this.config = undefined;
    this.routes = [];
}

/**
 * Reads in the given config.
 * @param {string} configPath Path to config .json
 */
Conf.prototype.readIn = function (configPath) {
    console.log('Conf.readConfig with', configPath);
    this._readConfigValidate(configPath);
}

/**
 * Validates that the file under the given path exists and matches the schema.
 * And then continue the request.
 * @param {string} configPath Path to config .json
 */
Conf.prototype._readConfigValidate = function (configPath) {
    var fileExists = false;
    var configValid = false;

    var config = undefined;

    try {
        config = JSON.parse(fs.readFileSync(configPath, CONSTANTS.FILE_ENCODING))
        fileExists = true;
    } catch (e) {
        console.log('Conf.readConfig', configPath);
    }

    if (fileExists)
        configValid = Validator.validate(config);

    if (fileExists && configValid)
        this._readConfig(config);
}

/**
 * Reads in the routes and config. Also set default values for port and fail if necessary.
 * @param {object} config Parsed config
 */
Conf.prototype._readConfig = function (config) {
    this.conf = { port: config.global_conf.port | 1337, fail: config.global_conf.failing_rate | 0 };
    this.routes = config.routes;
}



module.exports = new Conf();