/** Importing needed Modules **/
const UTIL = require('./util/helper');
/**
 * Creates an Route Handler.
 * @param {[]} success Responses for successful requests
 * @param {[]} error Responses for unsuccessful requests
 * @param {number} failQuote failure rates of the server
 */
function Router(success, error, failQuote) {
    const fail = failQuote;
    const responseSuccess = success;
    const responseError = error;

    /**
     * Uses the given failQuote to determine if the request failed.
     * @returns {boolean} if server responses if error or not
     */
    function _DetermineServerErrors() {
        if (fail === 0)
            return false;
        else
            return (UTIL.randomInt(0, 100) <= fail);
    }

    /**
     * This method responses to incoming request depending on _DetermineServerErrors outcome.
     * It will either way use an response from responseSuccess or responseError
     * @param {object} req
     * @param {object} res
     */
    this.handle = function (req, res) {
        var response;

        if (_DetermineServerErrors())
            response = UTIL.selectRandomElement(responseError);
        else
            response = UTIL.selectRandomElement(responseSuccess);

        res.setHeader('Content-Type', 'application/json');
        res.status(response.status).json(response.body).end();
    }
}

module.exports = Router;