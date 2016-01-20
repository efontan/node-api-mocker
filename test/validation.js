var Validation = require('../lib/schemaValidator.js');
var should = require('should');


var configIsRight = JSON.stringify({ "port": 3001, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": 50 });

var portIsNull = JSON.stringify({ "port" : null, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": 50 });
var portIsString = JSON.stringify({ "port" : "error", "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": 50 });
var portIsDouble = JSON.stringify({ "port" : 3.2, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": 50 });
var portIsToHigh = JSON.stringify({ "port" : 65536, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": 50 });
var portIsToLow = JSON.stringify({ "port" : -1, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": 50 });

var pathIsNumber = JSON.stringify({ "port" : 3001, "responsePath": 123, "requestFailQuote": 50 });
var pathIsNull = JSON.stringify({ "port" : 3001, "responsePath": null, "requestFailQuote": 50 });
var pathDoesNotExist = JSON.stringify({ "port" : 3001, "responsePath": "A:\\asfasfasd\\fasdasd\\dasd", "requestFailQuote": 50 });

var failIsNull = JSON.stringify({ "port" : 3001, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": null });
var failIsString = JSON.stringify({ "port" : 3001, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": "error" });
var failIsDouble = JSON.stringify({ "port" : 3.4, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": 3.2 });
var failIsOverHundred = JSON.stringify({ "port" : 3.4, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": 101 });
var failIsUnderHundred = JSON.stringify({ "port" : 3.4, "responsePath": "C:\\Users\\simon\\Source\\Repos\\node-api-mocker\\configuration_test\\responses\\", "requestFailQuote": -1 });

describe('Schema Validation: ', function () {

    describe('Valid Config Schema', function () {
        it('should return true', function () {
            Validation.CONFIG(configIsRight).should.equal(true);
        });
    });

    describe('', function () {
        
        describe('Invalid Config Values', function () {
            it('should return false', function () {
                Validation.CONFIG(undefined).should.equal(false);
                Validation.CONFIG(null).should.equal(false);
                Validation.CONFIG(3.2).should.equal(false);
                Validation.CONFIG(true).should.equal(false);
            });
        });

        describe('Invalid Port Values', function () {
            it('should return false', function () {
                Validation.CONFIG(portIsNull).should.equal(false);
                Validation.CONFIG(portIsString).should.equal(false);
                Validation.CONFIG(portIsDouble).should.equal(false);
                Validation.CONFIG(portIsToHigh).should.equal(false);
                Validation.CONFIG(portIsToLow).should.equal(false);
            });
        });

        describe('Invalid Path Values', function () {
            Validation.CONFIG(pathIsNumber).should.equal(false);
            Validation.CONFIG(pathIsNull).should.equal(false);
            Validation.CONFIG(pathDoesNotExist).should.equal(false);
        });

        describe('Invalid Failquote Values', function () {
            Validation.CONFIG(failIsNull).should.equal(false);
            Validation.CONFIG(failIsString).should.equal(false);
            Validation.CONFIG(failIsDouble).should.equal(false);
            Validation.CONFIG(failIsOverHundred).should.equal(false);
            Validation.CONFIG(failIsUnderHundred).should.equal(false);
        });

    });

});
