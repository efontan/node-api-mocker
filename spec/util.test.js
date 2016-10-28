const UTIL = require('../lib/util/helper');

describe("Testing isInteger", function () {
    it("should return false in each case.", function () {
        expect(UTIL.isInteger('c')).toBe(false);
        expect(UTIL.isInteger('')).toBe(false);
        expect(UTIL.isInteger('string')).toBe(false);

        expect(UTIL.isInteger(NaN)).toBe(false);
        expect(UTIL.isInteger(undefined)).toBe(false);
        expect(UTIL.isInteger(null)).toBe(false);

        expect(UTIL.isInteger(2.3)).toBe(false);
        expect(UTIL.isInteger(0.5)).toBe(false);

        expect(UTIL.isInteger([])).toBe(false);
        expect(UTIL.isInteger({})).toBe(false);
    });
    it("should return false in each case.", function () {
        expect(UTIL.isInteger(1)).toBe(true);
    });
});

describe("Testing isArray", function () {
    it("should return false in each case.", function () {
        expect(UTIL.isArray('c')).toBe(false);
        expect(UTIL.isArray('')).toBe(false);
        expect(UTIL.isArray('string')).toBe(false);

        expect(UTIL.isArray(0)).toBe(false);
        expect(UTIL.isArray(1.2)).toBe(false);

        expect(UTIL.isArray({})).toBe(false);

        expect(UTIL.isArray(undefined)).toBe(false);
        expect(UTIL.isArray(null)).toBe(false);
    });
});

describe("Testing randomInt", function () {
    it('should throw no exception', function () {
        expect(() => UTIL.randomInt(0, 1000)).not.toThrow(new Error('Min is larger than max'));
    });

    it('should throw an exception', function () {
        expect(() => UTIL.randomInt(1000, 0)).toThrow(new Error('Min is larger than max'));
    });

    it("should return a number between min and max", function () {
        var min = 0;
        var max = 1000;

        var result = UTIL.randomInt(min, max);

        expect(result >= min).toBe(true);
        expect(result <= max).toBe(true);
    });

    it("should return an integer", function () {
        var result = UTIL.randomInt(0, 1000);

        expect(UTIL.isInteger(result)).toBe(true);
    });
});

describe("Testing selectRandomElement", function () {
    it('should throw no exception', function () {
        expect(() => UTIL.selectRandomElement([])).not.toThrow(new Error('Arr was not an array'));
    });

    it('should throw an exception', function () {
        expect(() => UTIL.selectRandomElement({})).toThrow(new Error('Arr was not an array'));
    });

    it("should return null for empty array", function () {
        expect(UTIL.selectRandomElement([])).toBe(null);
    });

    it("should return c, as it is the only element", function () {
        expect(UTIL.selectRandomElement(['c'])).toBe('c');
    });

    it("should return either a or b", function () {
        var result1 = '';
        var result2 = '';

        // this may not be the nicest way to test this but it will guaranty branch coverage
        while (result1 !== 'a') {
            result1 = UTIL.selectRandomElement(['a', 'b']);
        }
        while (result2 !== 'b') {
            result2 = UTIL.selectRandomElement(['a', 'b']);
        }
        expect(result1 === 'a' && result2 === 'b').toBe(true);
    });

});