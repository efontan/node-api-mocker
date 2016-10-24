const fs = require('fs');
const Validator = require('../schema-validator');
const CONSTANTS = require('constants');


function Conf() {
    this.config = undefined;
    this.routes = [];
}

Conf.prototype.readIn = function (configPath) {
    console.log('Conf.readConfig with', configPath);
    this._readConfigValidate(configPath);
}

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

Conf.prototype._readConfig = function (config) {
    this.conf = { port: config.global_conf.port | 1337, fail: config.global_conf.failing_rate | 0 };
    this.paths = config.routes;
}



module.exports = new Conf();