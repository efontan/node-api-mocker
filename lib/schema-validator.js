const JSON_VALIDATOR = require('jsonschema').Validator;
const CONST = require('./util/const');

var console = process.console; //create a local (for the module) console

function Validator() {
    this._Instance = new JSON_VALIDATOR();
}

/**
 * Validates the given conf against the schema.
 * @param {object} conf
 * @returns
 */
Validator.prototype.validate = function (conf) {
    var result = this._Instance.validate(conf, CONST.CONF_SCHEMA);
    return result.valid;
};

module.exports = new Validator();