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
        expect(UTIL.isArray({})).toBe(false);

        expect(UTIL.isArray(undefined)).toBe(false);
        expect(UTIL.isArray(null)).toBe(false);
    });
});