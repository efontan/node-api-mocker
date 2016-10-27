const ConfReader = require('../lib/util/conf-reader')

describe("Testing config reader", function () {
    it("should read in a valid config", function () {
        var path = 'spec/test-confs/correct.conf.json';
        ConfReader.readIn(path);
        expect(ConfReader.config).not.toBe(undefined);
        expect(ConfReader.routes.length).not.toBe(0);

        expect(ConfReader.config.port).toBe(1337);
        expect(ConfReader.config.fail).toBe(0);
    });

    it("should fallback to use the default values, when none are provided in the config", function () {
        var path = 'spec/test-confs/minimal.conf.json';
        ConfReader.readIn(path);
        expect(ConfReader.config).not.toBe(undefined);
        expect(ConfReader.routes.length).not.toBe(0);

        expect(ConfReader.config.port).toBe(1337);
        expect(ConfReader.config.fail).toBe(0);
    });

    it("should throw an exception, when file does not exist", function () {
        var path = 'does/not/exist/file.json';
        expect(() => ConfReader.readIn(path)).toThrow(new Error('The given file does not exist'));
    });

    it("should throw an exception, when config does not match the schema", function () {
        var path = 'spec/test-confs/wrong.conf.json';
        expect(() => ConfReader.readIn(path)).toThrow(new Error('Given config does not match the schema. Please make sure your config does match the needed schema'));
    });

});