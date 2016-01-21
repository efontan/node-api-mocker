var exports = module.exports = {};

exports.isNumber = function (o) {
    return !isNaN(o - 0) && o !== null && o !== "" && o !== false;
};

exports.isInteger = function (o) {
    return this.isNumber(o) && (o % 1) === 0;
};

/**
 * Check whether an object is Array or not
 * @type Boolean
 * @param {object} subject is the variable that is
 * tested for Array identity check
 */
exports.isArray = (function () {
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
}());
exports.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
