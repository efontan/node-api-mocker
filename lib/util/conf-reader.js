const fs = require('fs');
const Validator = require('../schema-validator');
const CONST = require('./const');

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
    var config;
    try {
        config = JSON.parse(fs.readFileSync(configPath, CONST.FILE_ENCODING))
    } catch (e) {
        throw new Error(CONST.ERROR_MESSAGES.DOES_NOT_EXIST);
    }


    if (Validator.validate(config))
        this._readConfig(config);
    else
        throw new Error(CONST.ERROR_MESSAGES.INVALID_CONF);
}

/**
 * Reads in the routes and config. Also set default values for port and fail if necessary.
 * @param {object} config Parsed config
 */
Conf.prototype._readConfig = function (config) {
    this.config = { port: config.global_conf.port | 1337, fail: config.global_conf.failing_rate | 0 };
    this.routes = config.routes;
}



module.exports = new Conf();