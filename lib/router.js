/** Importing needed Modules **/
const UTIL = require('./util/helper');

function Router(success, error, failQuote) {
    const fail = failQuote;
    const responseSuccess = success;
    const responseError = error;

    /**
     * Uses the given failQuote to determine if the request failes.
     * @returns {boolean} if server responses if error or not
     */
    function _DetermineServerErrors() {
        if (fail === 0)
            return false;
        else
            return (UTIL.randomInt(0, 100) < fail);
    }

    /**
     * This method handeles the incoming request
     * @param {function} req request
     * @param {function} res response
     */
    this.handle = function (req, res) {
        var response;

        if (_DetermineServerErrors())
            response = UTIL.selectRandomElement(responseError);
        else
            response = UTIL.selectRandomElement(responseSuccess);

        res.status(response.status).json(response.body).end();
    }
}

module.exports = Router;