function Helper() { }

/**
 * Checks for any given object if its a number.
 * @param {any} o object to check
 * @returns {boolean} is o an number
 */
Helper.prototype.isNumber = function (o) {
    return !isNaN(o - 0) && o !== null && o !== "" && o !== false && !this.isArray(o);
};

/**
 * Checks if the given object is an integer.
 * @param {any} o object to check
 * @returns {boolean} is o an integer
 */
Helper.prototype.isInteger = function (o) {
    return this.isNumber(o) && (o % 1) === 0;
};

/**
 * Checks if the given object is an array.
 * @param {any} o object to check
 * @return {boolean} is object an array
 */
Helper.prototype.isArray = (function () {

    if (Array.isArray) {  // Use compiler's own isArray when available
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
 * Generates an random integer which is between min and max (including min and max).
 * @param {number} min The lower limit
 * @param {number] max The upper limit 
 * @returns {number} random number between min and max
 */
Helper.prototype.randomInt = function (min, max) {
    if (min > max)
        throw new Error('Min is larger than max');
    else
        return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Selects a random entry of the given array.
 * @param {[]} arr from which an entry shall be selected
 * @returns {any} random entry from the given arr
 */
Helper.prototype.selectRandomElement = function (arr) {
    var index = this.randomInt(0, arr.length - 1);
    return arr[index];
}

module.exports = new Helper();