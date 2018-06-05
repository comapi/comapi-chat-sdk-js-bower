"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_js_foundation_1 = require("@comapi/sdk-js-foundation");
exports.InterfaceContainer = sdk_js_foundation_1.InterfaceContainer;
exports.INTERFACE_SYMBOLS = sdk_js_foundation_1.INTERFACE_SYMBOLS;
exports.Utils = sdk_js_foundation_1.Utils;
exports.MessageBuilder = sdk_js_foundation_1.MessageBuilder;
exports.ContentData = sdk_js_foundation_1.ContentData;
exports.ConversationBuilder = sdk_js_foundation_1.ConversationBuilder;
var sessionService_1 = require("./sessionService");
var messagingService_1 = require("./messagingService");
var chatConfig_1 = require("./chatConfig");
exports.ComapiChatConfig = chatConfig_1.ComapiChatConfig;
var memoryStore_1 = require("./memoryStore");
exports.MemoryConversationStore = memoryStore_1.MemoryConversationStore;
var dbStore_1 = require("./dbStore");
exports.IndexedDBConversationStore = dbStore_1.IndexedDBConversationStore;
var ComapiChatClient = (function () {
    /**
     * ComapiChatClient class constructor.
     * @class ComapiChatClient
     * @classdesc ComapiChatClient Class
     */
    function ComapiChatClient() {
        this._eventHandlers = [];
        console.log("Constructing a ComapiChatClient");
    }
    Object.defineProperty(ComapiChatClient.prototype, "session", {
        /**
         * Method to get session service
         * @method ComapiChatClient#session
         * @returns {SessionService} - Returns SessionService instance
         */
        get: function () {
            if (this._foundation) {
                return this._sessionService;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "profile", {
        /**
         * Method to get profile interface
         * @method ComapiChatClient#profile
         * @returns {IProfile} - Returns IProfile interface
         */
        get: function () {
            if (this._foundation) {
                return this._foundation.services.profile;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "messaging", {
        /**
         * Method to get MessagingService service
         * @method ComapiChatClient#messaging
         * @returns {MessagingService} - Returns MessagingService instance
         */
        get: function () {
            if (this._foundation) {
                return this._messagingService;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "device", {
        /**
         * Method to get IDevice interface
         * @method ComapiChatClient#device
         * @returns {IDevice} - Returns IDevice interface
         */
        get: function () {
            if (this._foundation) {
                return this._foundation.device;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "channels", {
        /**
         * Method to get IChannels interface
         * @method ComapiChatClient#channels
         * @returns {IChannels} - Returns IChannels interface
         */
        get: function () {
            if (this._foundation) {
                return this._foundation.channels;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComapiChatClient.prototype, "foundation", {
        /**
         * Method to get IFoundation interface
         * @method ComapiChatClient#foundation
         * @returns {IFoundation} - Returns IFoundation interface
         */
        get: function () {
            if (this._foundation) {
                return this._foundation;
            }
            else {
                throw new Error("Not initialised");
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Method to initialise chat client
     * @param comapiChatConfig
     * @method ComapiChatClient#initialise
     */
    ComapiChatClient.prototype.initialise = function (comapiChatConfig) {
        var _this = this;
        if (this._foundation) {
            throw new Error("Already initialised");
        }
        return sdk_js_foundation_1.Foundation.initialise(comapiChatConfig)
            .then(function (foundation) {
            return _this._initialise(foundation, comapiChatConfig);
        });
    };
    /**
     * Method to use when unit testing so mock foundation can easily be injected
     * @param foundation
     * @param comapiChatConfig
     */
    ComapiChatClient.prototype.initialiseWithFoundation = function (foundation, comapiChatConfig) {
        if (this._foundation) {
            throw new Error("Already initialised");
        }
        return this._initialise(foundation, comapiChatConfig);
    };
    /**
     * Method to uninitialise the sdk
     * @method ComapiChatClient#uninitialise
     */
    ComapiChatClient.prototype.uninitialise = function () {
        var _this = this;
        return this._messagingService.uninitialise()
            .then(function () {
            return _this._sessionService.endSession();
        })
            .then(function () {
            _this._comapiChatConfig = undefined;
            _this._foundation = undefined;
            _this._sessionService = undefined;
            _this._messagingService = undefined;
            return Promise.resolve(true);
        });
    };
    /**
     * Subscribes the caller to a comapi event.
     * @method ComapiChatClient#on
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} handler - The callback
     */
    ComapiChatClient.prototype.on = function (eventType, handler) {
        // Note user will probably call this before sdk has initialised and _foundation will be undefined
        // need to cache these and wire in between foundation initialisation and this chat layer initialisation
        // If foundation is initialised, just add ...
        if (this._foundation) {
            this._foundation.on(eventType, handler);
        }
        else {
            this._eventHandlers.push({ eventType: eventType, handler: handler });
        }
    };
    /**
     * Unsubscribes the caller to a comapi event.
     * @method ComapiChatClient#off
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
     */
    ComapiChatClient.prototype.off = function (eventType, handler) {
        if (this._foundation) {
            this._foundation.off(eventType, handler);
        }
        else {
            var filtered = void 0;
            if (handler) {
                // remove the specific callback(s)
                filtered = this._eventHandlers.filter(function (h) {
                    return h.handler === handler && eventType === h.eventType;
                });
            }
            else {
                // remove all callbacks
                filtered = this._eventHandlers.filter(function (h) {
                    return eventType === h.eventType;
                });
            }
            for (var _i = 0, filtered_1 = filtered; _i < filtered_1.length; _i++) {
                var h = filtered_1[_i];
                // find index and splice 
                var index = this._eventHandlers.indexOf(h);
                if (index !== -1) {
                    this._eventHandlers.splice(index, 1);
                }
            }
        }
    };
    /**
     *
     * @param foundation
     * @param comapiChatConfig
     */
    ComapiChatClient.prototype._initialise = function (foundation, comapiChatConfig) {
        this._comapiChatConfig = comapiChatConfig;
        this._foundation = foundation;
        this._sessionService = new sessionService_1.SessionService(foundation, comapiChatConfig);
        this._messagingService = new messagingService_1.MessagingService(foundation, comapiChatConfig);
        // Wire in prior to any events firing off ...
        for (var _i = 0, _a = this._eventHandlers; _i < _a.length; _i++) {
            var handler = _a[_i];
            this._foundation.on(handler.eventType, handler.handler);
        }
        this._eventHandlers = [];
        return this._messagingService.initialise(comapiChatConfig);
    };
    Object.defineProperty(ComapiChatClient, "version", {
        /**
         * Property to get the SDK version
         * @method ComapiChatClient#version
         */
        get: function () {
            return "1.0.1.175";
        },
        enumerable: true,
        configurable: true
    });
    return ComapiChatClient;
}());
exports.ComapiChatClient = ComapiChatClient;
//# sourceMappingURL=comapiChatClient.js.map