const FS = require('fs');
const Validator = require('../schema-validator');
const CONSTANTS = require('constants');

var console = process.console; //create a local (for the module) console

function Conf() {
    this.conf = undefined;
    this.paths = [];
}

Conf.prototype.readIn = _readConfigLog;

function _readConfigLog(configPath) {
    console.log('Conf.readConfig with', configPath);
    _readConfigValidate(configPath);
}

function _readConfigValidate(configPath) {
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
        _readConfig(config);
}

function _readConfig(config) {
    this.conf = config.global_conf;
    this.paths = config.routes;
}



module.exports = new Conf();