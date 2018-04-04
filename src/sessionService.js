"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionService = (function () {
    /**
     * SessionService class constructor.
     * @class SessionService
     * @classdesc SessionService Class
     */
    function SessionService(_foundation, _config) {
        this._foundation = _foundation;
        this._config = _config;
    }
    /**
     * Method to start a session
     * @method SessionService#startSession
     * @returns {Promise} - Returns a promise
     */
    SessionService.prototype.startSession = function () {
        return this._foundation.startSession();
    };
    Object.defineProperty(SessionService.prototype, "session", {
        /**
         * Method to get the active session
         * @method SessionService#session
         * @returns {ISession} - Returns a session
         */
        get: function () {
            return this._foundation.session;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method to end a session
     * @method SessionService#endSession
     * @returns {Promise} - Returns a promise
     */
    SessionService.prototype.endSession = function () {
        var _this = this;
        return this._foundation.endSession()
            .then(function () {
            return _this._config.conversationStore.reset();
        });
    };
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=sessionService.js.map