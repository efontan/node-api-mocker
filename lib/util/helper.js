function Helper() { }



/**
 * Checks if the given object is a number
 *
 * @param {any} o The object to check
 * @return {boolean} is object a number
 */
Helper.prototype.isNumber = function (o) {
    return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
};

/**
 * Checks if the given object is an integer
 * 
 * @param {any} o The object to check
 * @return {boolean} is object an integer
 */
Helper.prototype.isInteger = function (o) {
    return this.isNumber(o) && (o % 1) === 0;
};

/**
 * Checks if the given object is an array
 * 
 * @param {any} o The object to check
 * @return {boolean} is object an array
 */
Helper.prototype.isArray = (function () {
    // Use compiler's own isArray when available
    if (Array.isArray) {
        return Array.isArray;
    }

    // Retain references to variables for performance
    // optimization
    var objectToStringFn = Object.prototype.toString,
        arrayToStringResult = objectToStringFn.call([]);

    return function (subject) {
        return objectToStringFn.call(subject) === arrayToStringResult;
    };
} ());

/**
 * Generates an random integer which is between min and max (including min and max)
 * 
 * @param {number} min The lower limit
 * @param {number] max The upper limit 
 * @return {number} a number >= min und number <= max
 */
Helper.prototype.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = new Helper();