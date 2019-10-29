var COMAPI_CHAT =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var sdk_js_foundation_1 = __webpack_require__(1);
	exports.InterfaceContainer = sdk_js_foundation_1.InterfaceContainer;
	exports.INTERFACE_SYMBOLS = sdk_js_foundation_1.INTERFACE_SYMBOLS;
	exports.Utils = sdk_js_foundation_1.Utils;
	exports.MessageBuilder = sdk_js_foundation_1.MessageBuilder;
	exports.ContentData = sdk_js_foundation_1.ContentData;
	exports.ConversationBuilder = sdk_js_foundation_1.ConversationBuilder;
	var sessionService_1 = __webpack_require__(82);
	var messagingService_1 = __webpack_require__(83);
	var chatConfig_1 = __webpack_require__(84);
	exports.ComapiChatConfig = chatConfig_1.ComapiChatConfig;
	var memoryStore_1 = __webpack_require__(85);
	exports.MemoryConversationStore = memoryStore_1.MemoryConversationStore;
	var dbStore_1 = __webpack_require__(86);
	exports.IndexedDBConversationStore = dbStore_1.IndexedDBConversationStore;
	var ComapiChatClient = (function () {
	    function ComapiChatClient() {
	        this._eventHandlers = [];
	    }
	    Object.defineProperty(ComapiChatClient.prototype, "session", {
	        /**
	         * ComapiChatClient class constructor.
	         * @class ComapiChatClient
	         * @classdesc ComapiChatClient Class
	         */
	        // constructor() {}
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
	            return "1.0.5.188";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return ComapiChatClient;
	}());
	exports.ComapiChatClient = ComapiChatClient;
	//# sourceMappingURL=comapiChatClient.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	var foundation_1 = __webpack_require__(2);
	exports.Foundation = foundation_1.Foundation;
	var utils_1 = __webpack_require__(5);
	exports.Utils = utils_1.Utils;
	var comapiConfig_1 = __webpack_require__(8);
	exports.ComapiConfig = comapiConfig_1.ComapiConfig;
	var conversationBuilder_1 = __webpack_require__(4);
	exports.ConversationBuilder = conversationBuilder_1.ConversationBuilder;
	var messageBuilder_1 = __webpack_require__(6);
	exports.MessageBuilder = messageBuilder_1.MessageBuilder;
	var messageStatusBuilder_1 = __webpack_require__(7);
	exports.MessageStatusBuilder = messageStatusBuilder_1.MessageStatusBuilder;
	var inversify_config_1 = __webpack_require__(11);
	exports.InterfaceContainer = inversify_config_1.InterfaceContainer;
	var interfaceSymbols_1 = __webpack_require__(10);
	exports.INTERFACE_SYMBOLS = interfaceSymbols_1.INTERFACE_SYMBOLS;
	var contentData_1 = __webpack_require__(81);
	exports.ContentData = contentData_1.ContentData;
	var mutex_1 = __webpack_require__(60);
	exports.Mutex = mutex_1.Mutex;
	__export(__webpack_require__(3));
	//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var interfaces_1 = __webpack_require__(3);
	var conversationBuilder_1 = __webpack_require__(4);
	exports.ConversationBuilder = conversationBuilder_1.ConversationBuilder;
	var messageBuilder_1 = __webpack_require__(6);
	exports.MessageBuilder = messageBuilder_1.MessageBuilder;
	var messageStatusBuilder_1 = __webpack_require__(7);
	exports.MessageStatusBuilder = messageStatusBuilder_1.MessageStatusBuilder;
	var comapiConfig_1 = __webpack_require__(8);
	exports.ComapiConfig = comapiConfig_1.ComapiConfig;
	var urlConfig_1 = __webpack_require__(9);
	var interfaceSymbols_1 = __webpack_require__(10);
	var inversify_config_1 = __webpack_require__(11);
	var contentData_1 = __webpack_require__(81);
	exports.ContentData = contentData_1.ContentData;
	var mutex_1 = __webpack_require__(60);
	exports.Mutex = mutex_1.Mutex;
	var utils_1 = __webpack_require__(5);
	exports.Utils = utils_1.Utils;
	var Foundation = (function () {
	    /**
	     * Foundation class constructor.
	     * @class Foundation
	     * @classdesc Class that implements Comapi foundation functionality.
	     */
	    function Foundation(_eventManager, _logger, _networkManager, services, device, channels) {
	        this._eventManager = _eventManager;
	        this._logger = _logger;
	        this._networkManager = _networkManager;
	        // initialising like this for sake of JSDoc ...
	        this._services = services;
	        this._device = device;
	        this._channels = channels;
	    }
	    /**
	     * Factory method to create a singleton instance of Foundation
	     * @method Foundation#initialise
	     * @param {IComapiConfig} comapiConfig - the app config (use `ComapiConfig` to create)
	     * @returns {Promise} - returns promise
	     */
	    Foundation.initialiseShared = function (comapiConfig) {
	        return Foundation._initialise(comapiConfig, true);
	    };
	    /**
	     * Factory method to create an instance of Foundation
	     * @method Foundation#initialise
	     * @param {IComapiConfig} comapiConfig - the app config (use `ComapiConfig` to create)
	     * @returns {Promise} - returns promise
	     */
	    Foundation.initialise = function (comapiConfig) {
	        return Foundation._initialise(comapiConfig, false);
	    };
	    Object.defineProperty(Foundation, "version", {
	        /**
	         * Property to get the SDK version
	         * @method Foundation#version
	         */
	        get: function () {
	            return "1.0.2.121";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Private initialisation method
	     * @param comapiConfig
	     * @param indexedDBLogger
	     */
	    Foundation._initialise = function (comapiConfig, doSingleton) {
	        if (doSingleton && Foundation._foundation) {
	            return Promise.resolve(Foundation._foundation);
	        }
	        if (comapiConfig.foundationRestUrls === undefined) {
	            comapiConfig.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
	        }
	        var container = comapiConfig.interfaceContainer ? comapiConfig.interfaceContainer : new inversify_config_1.InterfaceContainer();
	        if (comapiConfig.interfaceContainer) {
	            container = comapiConfig.interfaceContainer;
	        }
	        else {
	            container = new inversify_config_1.InterfaceContainer();
	            container.initialise(comapiConfig);
	            container.bindComapiConfig(comapiConfig);
	        }
	        if (comapiConfig.logPersistence &&
	            comapiConfig.logPersistence === interfaces_1.LogPersistences.IndexedDB) {
	            container.bindIndexedDBLogger();
	        }
	        var eventManager = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager);
	        var logger = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger);
	        logger.logLevel = comapiConfig.logLevel in interfaces_1.LogLevels ? comapiConfig.logLevel : 0;
	        var networkManager = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager);
	        var services = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Services);
	        var device = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Device);
	        var channels = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.Channels);
	        var foundation = new Foundation(eventManager, logger, networkManager, services, device, channels);
	        if (doSingleton) {
	            Foundation._foundation = foundation;
	        }
	        // adopt a cached session if there is one
	        var sessionManager = container.getInterface(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager);
	        return sessionManager.initialise()
	            .then(function (result) {
	            return Promise.resolve(foundation);
	        });
	    };
	    /**
	     * Method to start a new authenticated session
	     * @method Foundation#startSession
	     * @returns {Promise} - Returns a promise
	     */
	    Foundation.prototype.startSession = function () {
	        return this._networkManager.startSession()
	            .then(function (sessionInfo) {
	            return sessionInfo.session;
	        });
	    };
	    /**
	     * Method to end an existing authenticated session
	     * @method Foundation#endSession
	     * @returns {Promise} - Returns a promise
	     */
	    Foundation.prototype.endSession = function () {
	        return this._networkManager.endSession();
	    };
	    Object.defineProperty(Foundation.prototype, "services", {
	        /**
	         * Method to get Services interface
	         * @method Foundation#services
	         * @returns {Services} - Returns Services
	         */
	        get: function () {
	            return this._services;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Foundation.prototype, "device", {
	        /**
	         * Method to get Device interface
	         * @method Foundation#device
	         * @returns {Device} - Returns Device
	         */
	        get: function () {
	            return this._device;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Foundation.prototype, "channels", {
	        /**
	         * Method to get Channels interface
	         * @method Foundation#channels
	         * @returns {Channels} - Returns Channels
	         */
	        get: function () {
	            return this._channels;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Foundation.prototype, "session", {
	        /**
	         * Method to get current session
	         * @method Foundation#session
	         * @returns {ISession} - Returns an ISession interface
	         */
	        get: function () {
	            return this._networkManager.session;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Foundation.prototype, "logger", {
	        /**
	         * Method to get the logger
	         * @method Foundation#logger
	         * @returns {ILogger} - Returns an ILogger interface
	         */
	        get: function () {
	            return this._logger;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Subscribes the caller to a comapi event.
	     * @method Foundation#on
	     * @param {string} eventType - The type of event to subscribe to
	     * @param {Function} handler - The callback
	     */
	    Foundation.prototype.on = function (eventType, handler) {
	        this._eventManager.subscribeToLocalEvent(eventType, handler);
	    };
	    /**
	     * Unsubscribes the caller to a comapi event.
	     * @method Foundation#off
	     * @param {string} eventType - The type of event to subscribe to
	     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
	     */
	    Foundation.prototype.off = function (eventType, handler) {
	        this._eventManager.unsubscribeFromLocalEvent(eventType, handler);
	    };
	    /**
	     * Method to retrieve the current debug log as a string
	     * @method Foundation#getLogs
	     * @returns {Promise} - Returns a promise
	     */
	    Foundation.prototype.getLogs = function () {
	        return this._logger.getLog();
	    };
	    return Foundation;
	}());
	exports.Foundation = Foundation;
	//# sourceMappingURL=foundation.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Log level enum
	 */
	var LogLevels;
	(function (LogLevels) {
	    LogLevels[LogLevels["None"] = 0] = "None";
	    LogLevels[LogLevels["Error"] = 1] = "Error";
	    LogLevels[LogLevels["Warn"] = 2] = "Warn";
	    LogLevels[LogLevels["Debug"] = 3] = "Debug";
	})(LogLevels = exports.LogLevels || (exports.LogLevels = {}));
	;
	/**
	 * Log persistence enum
	 */
	var LogPersistences;
	(function (LogPersistences) {
	    LogPersistences[LogPersistences["None"] = 0] = "None";
	    LogPersistences[LogPersistences["IndexedDB"] = 1] = "IndexedDB";
	    LogPersistences[LogPersistences["LocalStorage"] = 2] = "LocalStorage";
	})(LogPersistences = exports.LogPersistences || (exports.LogPersistences = {}));
	;
	/**
	 * Log persistence enum
	 */
	var OrphanedEventPersistences;
	(function (OrphanedEventPersistences) {
	    OrphanedEventPersistences[OrphanedEventPersistences["None"] = 0] = "None";
	    OrphanedEventPersistences[OrphanedEventPersistences["IndexedDbIfSupported"] = 1] = "IndexedDbIfSupported";
	    OrphanedEventPersistences[OrphanedEventPersistences["LocalStorage"] = 2] = "LocalStorage"; // force local storage
	})(OrphanedEventPersistences = exports.OrphanedEventPersistences || (exports.OrphanedEventPersistences = {}));
	;
	;
	;
	;
	/**
	 * Environment enum
	 */
	var Environment;
	(function (Environment) {
	    Environment[Environment["development"] = 0] = "development";
	    Environment[Environment["production"] = 1] = "production";
	})(Environment = exports.Environment || (exports.Environment = {}));
	;
	;
	;
	;
	/**
	 * Log level enum
	 */
	var ConversationScope;
	(function (ConversationScope) {
	    ConversationScope[ConversationScope["public"] = 0] = "public";
	    ConversationScope[ConversationScope["participant"] = 1] = "participant";
	})(ConversationScope = exports.ConversationScope || (exports.ConversationScope = {}));
	;
	//# sourceMappingURL=interfaces.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var utils_1 = __webpack_require__(5);
	var ConversationBuilder = (function () {
	    /**
	     * ConversationBuilder class constructor.
	     * initialises the id with a guid
	     * @class ConversationBuilder
	     * @classdesc Class that implements ConversationBuilder
	     */
	    function ConversationBuilder() {
	        /**
	         * The conversation description
	         */
	        this.description = undefined;
	        /**
	         * The conversation roles
	         */
	        this.roles = {
	            "owner": {
	                "canSend": true,
	                "canAddParticipants": true,
	                "canRemoveParticipants": true
	            },
	            "participant": {
	                "canSend": true,
	                "canAddParticipants": true,
	                "canRemoveParticipants": true
	            }
	        };
	        /**
	         * The isPublic field
	         */
	        this.isPublic = false;
	        /**
	         * The participants
	         */
	        this.participants = undefined;
	        this.id = utils_1.Utils.uuid();
	    }
	    /**
	     * Method to specify the conversationId (defaults to a new guid if not used)
	     * @method ConversationBuilder#withId
	     * @param {string} id
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withId = function (id) {
	        this.id = id;
	        return this;
	    };
	    /**
	     * Method to specify the conversation name
	     * @method ConversationBuilder#withName
	     * @param {string} name
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withName = function (name) {
	        this.name = name;
	        return this;
	    };
	    /**
	     * Method to specify the conversation description
	     * @method ConversationBuilder#withDescription
	     * @param {string} description
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withDescription = function (description) {
	        this.description = description;
	        return this;
	    };
	    /**
	     * Method to specify initial participant list (will all be members)
	     * @method ConversationBuilder#withUsers
	     * @param {string[]} users
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withUsers = function (users) {
	        this.participants = [];
	        for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
	            var user = users_1[_i];
	            this.participants.push({ id: user });
	        }
	        return this;
	    };
	    /**
	     * Method to specify initial participant (will be a member)
	     * @method ConversationBuilder#withUser
	     * @param {string} user
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withUser = function (user) {
	        this.participants = [{ id: user }];
	        return this;
	    };
	    /**
	     * Method to specify initial participants -  takes an array of IConversationParticipant objects which enables individual
	     * roles to be specified for each user.
	     * @method ConversationBuilder#withParticipants
	     * @param {IConversationParticipant[]} participants
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withParticipants = function (participants) {
	        this.participants = participants;
	        return this;
	    };
	    /**
	     * Method to set owner privelages for the conversation
	     * @method ConversationBuilder#withOwnerPrivelages
	     * @param {IConversationPrivelages} privelages
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withOwnerPrivelages = function (privelages) {
	        this.roles.owner = privelages;
	        return this;
	    };
	    /**
	     * Method to set participant privelages for the conversation
	     * @method ConversationBuilder#withParticipantPrivelages
	     * @param {IConversationPrivelages} privelages
	     * @returns {ConversationBuilder} - Returns reference to itself so methods can be chained
	     */
	    ConversationBuilder.prototype.withParticipantPrivelages = function (privelages) {
	        this.roles.participant = privelages;
	        return this;
	    };
	    return ConversationBuilder;
	}());
	exports.ConversationBuilder = ConversationBuilder;
	//# sourceMappingURL=conversationBuilder.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * Utility class
	 */
	var Utils = (function () {
	    /**
	     * Utils class constructor.
	     * @class Utils
	     * @classdesc Class that implements a Utils.
	     */
	    function Utils() {
	        throw new Error("Cannot new this class");
	    }
	    /**
	     * Static method to clone an object
	     * @method Utils#clone
	     * @param {any} obj - the object to clone
	     * @returns {any} - returns a clone of the object
	     */
	    Utils.clone = function (obj) {
	        return JSON.parse(JSON.stringify(obj));
	    };
	    /**
	     * Static method to generate a uuid (simulated)
	     * @method Utils#uuid
	     * @returns {string} - returns a uuid
	     */
	    Utils.uuid = function () {
	        var d = new Date().getTime();
	        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
	            var r = (d + Math.random() * 16) % 16 | 0;
	            d = Math.floor(d / 16);
	            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
	        });
	        return uuid;
	    };
	    /**
	     * Static method to get current browser info
	     * @method Utils#getBrowserInfo
	     * @param {string} [userAgent] - user agent string (optional - for unit tsting)
	     * @returns {IBrowserInfo} - returns an IBrowserInfo interface
	     */
	    Utils.getBrowserInfo = function (userAgent) {
	        var ua = userAgent !== undefined ? userAgent : navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	        if (/trident/i.test(M[1])) {
	            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	            return {
	                name: "IE",
	                version: tem[1] || ""
	            };
	        }
	        if (M[1] === "Chrome") {
	            tem = ua.match(/\bOPR\/(\d+)/);
	            if (tem !== null) {
	                return {
	                    name: "Opera",
	                    version: tem[1]
	                };
	            }
	        }
	        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
	        tem = ua.match(/version\/(\d+)/i);
	        if (tem !== null) {
	            M.splice(1, 1, tem[1]);
	        }
	        return {
	            name: M[0],
	            version: M[1]
	        };
	    };
	    /**
	     * Static method to call some async function on an array of data and you want them called sequentially
	     * @method Utils#eachSeries
	     * @param {any[]} arr
	     * @param {Function} iteratorFn
	     * @returns {Promise} - returns a Promise
	     */
	    Utils.eachSeries = function (arr, iteratorFn) {
	        return arr.reduce(function (p, item) {
	            return p.then(function () {
	                return iteratorFn(item);
	            });
	        }, Promise.resolve());
	    };
	    /**
	     * Static method to encapsulate repeatdly calling an async method until a condition is met (tyoes defined at top)
	     * @method Utils#doUntil
	     * @param {DoUntilOperationFunction} operation - the operation to perform
	     * @param {DoUntilTestFunction} test - the condition that stops the repeats
	     * @param {any} data - the data
	     */
	    Utils.doUntil = function (operation, test, data) {
	        return operation(data)
	            .then(function (rslt) {
	            return test(rslt) ? Utils.doUntil(operation, test, rslt) : rslt;
	        });
	    };
	    /**
	     * Static method to provide Mustache/handlebars style formatting ...
	     * @method Utils#format
	     * @param {string} content
	     * @param {Object} tags
	     */
	    Utils.format = function (content, tags) {
	        return content.replace(/{{(.*?)}}/g, function (tag, key) {
	            var replacement;
	            if (typeof tags[key] === "string") {
	                replacement = key !== "urlBase" ? encodeURIComponent(tags[key]) : tags[key];
	            }
	            return typeof replacement === "string" ? replacement : "";
	        });
	    };
	    /**
	     * Static method to het a header value from a headers collection in a case insensitive fashion
	     * @method Utils#getHeaderValue
	     * @param headers Helper function to deal with potential case issues accessing http headers collection
	     * @param key
	     */
	    Utils.getHeaderValue = function (headers, key) {
	        return headers[key] || headers[key.toLowerCase()];
	    };
	    /**
	     * https://davidwalsh.name/javascript-debounce-function
	     * Returns a function, that, as long as it continues to be invoked, will not
	     * be triggered. The function will be called after it stops being called for
	     * N milliseconds. If `immediate` is passed, trigger the function on the
	     * leading edge, instead of the trailing.
	     */
	    Utils.debounce = function (func, wait, immediate) {
	        var timeout;
	        return function () {
	            var context = this, args = arguments;
	            var later = function () {
	                timeout = null;
	                if (!immediate) {
	                    func.apply(context, args);
	                }
	            };
	            var callNow = immediate && !timeout;
	            clearTimeout(timeout);
	            timeout = setTimeout(later, wait);
	            if (callNow) {
	                func.apply(context, args);
	            }
	        };
	    };
	    return Utils;
	}());
	exports.Utils = Utils;
	;
	//# sourceMappingURL=utils.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * @class MessageBuilder
	 * @classdesc Class that implements MessageBuilder
	 */
	var MessageBuilder = (function () {
	    function MessageBuilder() {
	        this.id = undefined;
	        this.metadata = {};
	        this.parts = [];
	        this.alert = undefined;
	        this.context = undefined;
	        this.sentEventId = undefined;
	        this.statusUpdates = undefined;
	    }
	    /**
	     * Method to create a simple text based message
	     * @method MessageBuilder#withText
	     * @param {String} text - the text of the message
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withText = function (text) {
	        this.parts.push({
	            data: text,
	            size: text.length,
	            type: "text/plain",
	        });
	        return this;
	    };
	    /**
	     * Method to create a message containing a single data part
	     * @method MessageBuilder#withData
	     * @param {String} type - the type of the data i.e. `image/png`
	     * @param {String} data - the data (if you want to pass binary data, then base64 encode it first)
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withData = function (type, data) {
	        this.parts.push({
	            data: data,
	            size: data.length,
	            type: type,
	        });
	        return this;
	    };
	    /**
	     * Method to create a message containing a single data part
	     * @method MessageBuilder#withData
	     * @param {String} type - the type of the data i.e. `image/png`
	     * @param {String} url - the url
	     * @param {Number} [size] - the size of the resource the URL is pointing to
	     * @param {String} [name] - the teh name of the original file
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withURL = function (type, url, size, name) {
	        this.parts.push({
	            name: name,
	            size: size,
	            type: type,
	            url: url,
	        });
	        return this;
	    };
	    /**
	     * Method to add a message part to the message. This can be called multiple times
	     * @method MessageBuilder#withPart
	     * @param {IMessagePart} part - the message part to add
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withPart = function (part) {
	        this.parts.push(part);
	        return this;
	    };
	    /**
	     * Method to set the generic title for a push message. It also allocates placeholders for apns and fcm info
	     * @method MessageBuilder#withPush
	     * @param {String} text - The title of the push message. Note call this method BEFORE `withApnsAlert()` and `withFcmAlert()`
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withPush = function (text) {
	        this.alert = {
	            "text": text,
	            "platforms": {
	                "apns": undefined,
	                "fcm": undefined
	            }
	        };
	        return this;
	    };
	    /**
	     * Method to specify APNS specific push info - Note: must call `withPush()` first.
	     * @method MessageBuilder#withApnsAlert
	     * @param {IApnsAlert} info - the APNS speific push info
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withApnsAlert = function (info) {
	        // TODO: cater for incorrect usage
	        this.alert.platforms.apns = info;
	        return this;
	    };
	    /**
	     * Method to specify FCM specific push info - Note: must call `withPush()` first.
	     * @method MessageBuilder#withFcmAlert
	     * @param {IFcmAlert} info - the FCM speific push info
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withFcmAlert = function (info) {
	        // TODO: cater for incorrect usage        
	        this.alert.platforms.fcm = info;
	        return this;
	    };
	    /**
	     * Method to specify additional metadata to accompany the message
	     * @method MessageBuilder#withMetadata
	     * @param {any} metadata - the metadata.
	     * @returns {MessageBuilder}  - Returns reference to itself so methods can be chained
	     */
	    MessageBuilder.prototype.withMetadata = function (metadata) {
	        this.metadata = metadata;
	        return this;
	    };
	    return MessageBuilder;
	}());
	exports.MessageBuilder = MessageBuilder;
	//# sourceMappingURL=messageBuilder.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * @class MessageStatusBuilder
	 * @classdesc Class that implements MessageStatusBuilder
	 */
	var MessageStatusBuilder = (function () {
	    function MessageStatusBuilder() {
	    }
	    /**
	     * @method MessageStatusBuilder#deliveredStatusUpdate
	     * @param {String} messageId
	     * @returns {IMessageStatus} - Returns Mesage status object
	     */
	    MessageStatusBuilder.prototype.deliveredStatusUpdate = function (messageId) {
	        return {
	            messageIds: [messageId],
	            status: "delivered",
	            timestamp: new Date().toISOString()
	        };
	    };
	    /**
	     * @method MessageStatusBuilder#deliveredStatusUpdates
	     * @param {String[]} messageIds
	     * @returns {IMessageStatus} - Returns Mesage status object
	     */
	    MessageStatusBuilder.prototype.deliveredStatusUpdates = function (messageIds) {
	        return {
	            messageIds: messageIds,
	            status: "delivered",
	            timestamp: new Date().toISOString()
	        };
	    };
	    /**
	     * @method MessageStatusBuilder#readStatusUpdate
	     * @param {String} messageId
	     * @returns {IMessageStatus} - Returns Mesage status object
	     */
	    MessageStatusBuilder.prototype.readStatusUpdate = function (messageId) {
	        return {
	            messageIds: [messageId],
	            status: "read",
	            timestamp: new Date().toISOString()
	        };
	    };
	    /**
	     * @method MessageStatusBuilder#readStatusUpdates
	     * @param {String[]} messageIds
	     * @returns {IMessageStatus} - Returns Mesage status object
	     */
	    MessageStatusBuilder.prototype.readStatusUpdates = function (messageIds) {
	        return {
	            messageIds: messageIds,
	            status: "read",
	            timestamp: new Date().toISOString()
	        };
	    };
	    return MessageStatusBuilder;
	}());
	exports.MessageStatusBuilder = MessageStatusBuilder;
	//# sourceMappingURL=messageStatusBuilder.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var interfaces_1 = __webpack_require__(3);
	var urlConfig_1 = __webpack_require__(9);
	var ComapiConfig = (function () {
	    /**
	     * ComapiConfig class constructor.
	     * @class ComapiConfig
	     * @classdesc Class that implements IComapiConfig
	     */
	    function ComapiConfig() {
	        this.logRetentionHours = 24;
	        this.urlBase = "https://api.comapi.com";
	        this.webSocketBase = "wss://api.comapi.com";
	        this.logLevel = interfaces_1.LogLevels.Error;
	        this.logPersistence = interfaces_1.LogPersistences.LocalStorage;
	        this.isTypingTimeout = 10;
	        this.isTypingOffTimeout = 10;
	        this.foundationRestUrls = new urlConfig_1.FoundationRestUrls();
	        this.orphanedEventPersistence = interfaces_1.OrphanedEventPersistences.IndexedDbIfSupported;
	        this.apiSpaceId = undefined;
	    }
	    /**
	     * Function to set apiSpaceId
	     * @method ComapiConfig#withApiSpace
	     * @param {string} id - the api space id
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withApiSpace = function (id) {
	        this.apiSpaceId = id;
	        return this;
	    };
	    /**
	     * Function to set Logfile Retention Time in hours (Defaouts to `24`)
	     * @method ComapiConfig#withLogRetentionTime
	     * @param {number} hours - the log retention time in hours
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withLogRetentionTime = function (hours) {
	        this.logRetentionHours = hours;
	        return this;
	    };
	    /**
	     * Function to set the authentication Challenge
	     * @method ComapiConfig#withAuthChallenge
	     * @param {IAuthChallenge} authChallenge - the authentication challenge
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withAuthChallenge = function (authChallenge) {
	        this.authChallenge = authChallenge;
	        return this;
	    };
	    /**
	     * Function to set urlBase (Defaults to production)
	     * @method ComapiConfig#withUrlBase
	     * @param {string} urlBase - the url base
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withUrlBase = function (urlBase) {
	        this.urlBase = urlBase;
	        return this;
	    };
	    /**
	     * Function to set webSocketBase (Defaults to production)
	     * @method ComapiConfig#withWebSocketBase
	     * @param {string} webSocketBase - the web socket base
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withWebSocketBase = function (webSocketBase) {
	        this.webSocketBase = webSocketBase;
	        return this;
	    };
	    /**
	     * Function to set logLevel  (Defaults to errors only)
	     * @method ComapiConfig#withLogLevel
	     * @param {LogLevels} withLogLevel - the logLevel
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withLogLevel = function (logLevel) {
	        this.logLevel = logLevel;
	        return this;
	    };
	    /**
	     * Function to set logPersistence
	     * @method ComapiConfig#withLogPersistence
	     * @param {LogPersistences} logPersistence - the logPersistence
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withLogPersistence = function (logPersistence) {
	        this.logPersistence = logPersistence;
	        return this;
	    };
	    /**
	     * Function to override foundationRestUrls
	     * @method ComapiConfig#withFoundationRestUrls
	     * @param {IFoundationRestUrls} foundationRestUrls - the foundationRestUrls
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withFoundationRestUrls = function (foundationRestUrls) {
	        this.foundationRestUrls = foundationRestUrls;
	        return this;
	    };
	    /**
	     * Function to override eventMapping
	     * @method ComapiConfig#withEventMapping
	     * @param {IEventMapping} eventMapping - the eventMapping
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withEventMapping = function (eventMapping) {
	        this.eventMapping = eventMapping;
	        return this;
	    };
	    /**
	     * Function to override localStoragePrefix
	     * @method ComapiConfig#withLocalStoragePrefix
	     * @param {string} localStoragePrefix - the localStoragePrefix
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withLocalStoragePrefix = function (localStoragePrefix) {
	        this.localStoragePrefix = localStoragePrefix;
	        return this;
	    };
	    /**
	     * Function to override orphanedEventPersistence
	     * @method ComapiConfig#withOrphanedEventPersistence
	     * @param {string} orphanedEventPersistence - the orphanedEventPersistence
	     * @returns {ComapiConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiConfig.prototype.withOrphanedEventPersistence = function (orphanedEventPersistence) {
	        this.orphanedEventPersistence = orphanedEventPersistence;
	        return this;
	    };
	    return ComapiConfig;
	}());
	exports.ComapiConfig = ComapiConfig;
	//# sourceMappingURL=comapiConfig.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var FoundationRestUrls = (function () {
	    function FoundationRestUrls() {
	        // Content
	        this.content = "{{urlBase}}/apispaces/{{apiSpaceId}}/content";
	        // Conversations
	        this.conversations = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations";
	        this.conversation = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}";
	        this.participants = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/participants";
	        this.typing = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/typing";
	        // DEVICES
	        this.push = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/{{sessionId}}/push";
	        // FACEBOOK
	        this.facebook = "{{urlBase}}/apispaces/{{apiSpaceId}}/channels/facebook/state";
	        // Messages
	        this.events = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/events";
	        this.messages = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/messages";
	        this.statusUpdates = "{{urlBase}}/apispaces/{{apiSpaceId}}/conversations/{{conversationId}}/messages/statusupdates";
	        // Profile
	        this.profiles = "{{urlBase}}/apispaces/{{apiSpaceId}}/profiles";
	        this.profile = "{{urlBase}}/apispaces/{{apiSpaceId}}/profiles/{{profileId}}";
	        // session
	        this.sessions = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions";
	        this.sessionStart = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/start";
	        this.session = "{{urlBase}}/apispaces/{{apiSpaceId}}/sessions/{{sessionId}}";
	    }
	    return FoundationRestUrls;
	}());
	exports.FoundationRestUrls = FoundationRestUrls;
	//# sourceMappingURL=urlConfig.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var INTERFACE_SYMBOLS = {
	    AppMessaging: "AppMessaging",
	    AuthenticatedRestClient: "AuthenticatedRestClient",
	    Channels: "Channels",
	    ComapiConfig: "ComapiConfig",
	    ContentManager: "ContentManager",
	    ConversationManager: "ConversationManager",
	    Device: "Device",
	    DeviceManager: "DeviceManager",
	    EventManager: "EventManager",
	    EventMapper: "EventMapper",
	    FacebookManager: "FacebookManager",
	    IndexedDBLogger: "IndexedDBLogger",
	    LocalStorageData: "LocalStorageData",
	    Logger: "Logger",
	    MessageManager: "MessageManager",
	    MessagePager: "MessagePager",
	    NetworkManager: "NetworkManager",
	    OrphanedEventManager: "OrphanedEventManager",
	    Profile: "Profile",
	    ProfileManager: "ProfileManager",
	    RestClient: "RestClient",
	    Services: "Services",
	    SessionManager: "SessionManager",
	    WebSocketManager: "WebSocketManager",
	};
	exports.INTERFACE_SYMBOLS = INTERFACE_SYMBOLS;
	//# sourceMappingURL=interfaceSymbols.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	__webpack_require__(12);
	var inversify_1 = __webpack_require__(14);
	var interfaces_1 = __webpack_require__(3);
	var eventManager_1 = __webpack_require__(56);
	var localStorageData_1 = __webpack_require__(57);
	var logger_1 = __webpack_require__(58);
	var restClient_1 = __webpack_require__(61);
	var authenticatedRestClient_1 = __webpack_require__(62);
	var sessionManager_1 = __webpack_require__(63);
	var webSocketManager_1 = __webpack_require__(64);
	var networkManager_1 = __webpack_require__(65);
	var deviceManager_1 = __webpack_require__(66);
	var facebookManager_1 = __webpack_require__(67);
	var conversationManager_1 = __webpack_require__(68);
	var profileManager_1 = __webpack_require__(69);
	var messageManager_1 = __webpack_require__(70);
	var indexedDBOrphanedEventManager_1 = __webpack_require__(71);
	var localStorageOrphanedEventManager_1 = __webpack_require__(72);
	var messagePager_1 = __webpack_require__(73);
	var appMessaging_1 = __webpack_require__(74);
	var profile_1 = __webpack_require__(75);
	var services_1 = __webpack_require__(76);
	var device_1 = __webpack_require__(77);
	var channels_1 = __webpack_require__(78);
	var indexedDBLogger_1 = __webpack_require__(59);
	var eventMapper_1 = __webpack_require__(79);
	var contentManager_1 = __webpack_require__(80);
	var interfaceSymbols_1 = __webpack_require__(10);
	var InterfaceContainer = (function () {
	    function InterfaceContainer() {
	        this._overriddenInterfaces = {};
	        this._container = new inversify_1.Container();
	    }
	    /**
	     *
	     */
	    InterfaceContainer.prototype.initialise = function (comapiConfig) {
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager).to(eventManager_1.EventManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData).to(localStorageData_1.LocalStorageData).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger).to(logger_1.Logger).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient).to(restClient_1.RestClient).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager).to(sessionManager_1.SessionManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.EventMapper).to(eventMapper_1.EventMapper).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager).to(webSocketManager_1.WebSocketManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager).to(networkManager_1.NetworkManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient).to(authenticatedRestClient_1.AuthenticatedRestClient).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager).to(deviceManager_1.DeviceManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager).to(facebookManager_1.FacebookManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager).to(conversationManager_1.ConversationManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager).to(profileManager_1.ProfileManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.MessagePager).to(messagePager_1.MessagePager).inSingletonScope();
	        var dbSupported = "indexedDB" in window;
	        if (comapiConfig && comapiConfig.orphanedEventPersistence) {
	            if (comapiConfig.orphanedEventPersistence === interfaces_1.OrphanedEventPersistences.LocalStorage) {
	                this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager).inSingletonScope();
	            }
	            else if (comapiConfig.orphanedEventPersistence === interfaces_1.OrphanedEventPersistences.IndexedDbIfSupported) {
	                if (dbSupported) {
	                    this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(indexedDBOrphanedEventManager_1.IndexedDBOrphanedEventManager).inSingletonScope();
	                }
	                else {
	                    this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager).inSingletonScope();
	                }
	            }
	        }
	        else {
	            if (dbSupported) {
	                this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(indexedDBOrphanedEventManager_1.IndexedDBOrphanedEventManager).inSingletonScope();
	            }
	            else {
	                this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager).to(localStorageOrphanedEventManager_1.LocalStorageOrphanedEventManager).inSingletonScope();
	            }
	        }
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager).to(messageManager_1.MessageManager).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.AppMessaging).to(appMessaging_1.AppMessaging).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Profile).to(profile_1.Profile).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Services).to(services_1.Services).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Device).to(device_1.Device).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.Channels).to(channels_1.Channels).inSingletonScope();
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ContentManager).to(contentManager_1.ContentManager).inSingletonScope();
	    };
	    /**
	     *
	     */
	    InterfaceContainer.prototype.uninitialise = function () {
	        this._container.unbindAll();
	    };
	    /**
	     *
	     */
	    InterfaceContainer.prototype.bindIndexedDBLogger = function () {
	        if (this._container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger)) {
	            this._container.rebind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger).to(indexedDBLogger_1.IndexedDBLogger).inSingletonScope();
	        }
	        else {
	            this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger).to(indexedDBLogger_1.IndexedDBLogger).inSingletonScope();
	        }
	    };
	    /**
	     *
	     */
	    InterfaceContainer.prototype.unbindIndexedDBLogger = function () {
	        if (this._container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger)) {
	            this._container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger);
	        }
	    };
	    /**
	     *
	     */
	    InterfaceContainer.prototype.bindComapiConfig = function (comapiConfig) {
	        var _comapiConfig = comapiConfig;
	        if (this._container.isBound(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)) {
	            // console.log("unbinding old ComapiConfig: ", JSON.stringify(_comapiConfig));
	            this._container.unbind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig);
	        }
	        else {
	            // console.log("first bind of ComapiConfig: ", JSON.stringify(_comapiConfig));
	        }
	        this._container.bind(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig).toDynamicValue(function (context) {
	            // console.log("serving up ComapiConfig: ", JSON.stringify(_comapiConfig));
	            return _comapiConfig;
	        });
	    };
	    /**
	     *
	     * @param serviceIdentifier
	     */
	    InterfaceContainer.prototype.getInterface = function (serviceIdentifier) {
	        return this._container.get(serviceIdentifier);
	    };
	    /**
	     *
	     * @param serviceIdentifier
	     */
	    InterfaceContainer.prototype.setInterface = function (serviceIdentifier, instance) {
	        var _this = this;
	        // unbind existing interface
	        if (this._container.isBound(serviceIdentifier)) {
	            this._container.unbind(serviceIdentifier);
	        }
	        // cache this one
	        this._overriddenInterfaces[serviceIdentifier.toString()] = instance;
	        // bind this new one
	        this._container.bind(serviceIdentifier).toDynamicValue(function (context) {
	            return _this._overriddenInterfaces[serviceIdentifier.toString()];
	        });
	    };
	    return InterfaceContainer;
	}());
	exports.InterfaceContainer = InterfaceContainer;
	//# sourceMappingURL=inversify.config.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	var Reflect;
	(function (Reflect) {
	    // Metadata Proposal
	    // https://rbuckton.github.io/reflect-metadata/
	    (function (factory) {
	        var root = typeof global === "object" ? global :
	            typeof self === "object" ? self :
	                typeof this === "object" ? this :
	                    Function("return this;")();
	        var exporter = makeExporter(Reflect);
	        if (typeof root.Reflect === "undefined") {
	            root.Reflect = Reflect;
	        }
	        else {
	            exporter = makeExporter(root.Reflect, exporter);
	        }
	        factory(exporter);
	        function makeExporter(target, previous) {
	            return function (key, value) {
	                if (typeof target[key] !== "function") {
	                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
	                }
	                if (previous)
	                    previous(key, value);
	            };
	        }
	    })(function (exporter) {
	        var hasOwn = Object.prototype.hasOwnProperty;
	        // feature test for Symbol support
	        var supportsSymbol = typeof Symbol === "function";
	        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
	        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
	        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
	        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
	        var downLevel = !supportsCreate && !supportsProto;
	        var HashMap = {
	            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
	            create: supportsCreate
	                ? function () { return MakeDictionary(Object.create(null)); }
	                : supportsProto
	                    ? function () { return MakeDictionary({ __proto__: null }); }
	                    : function () { return MakeDictionary({}); },
	            has: downLevel
	                ? function (map, key) { return hasOwn.call(map, key); }
	                : function (map, key) { return key in map; },
	            get: downLevel
	                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
	                : function (map, key) { return map[key]; },
	        };
	        // Load global or shim versions of Map, Set, and WeakMap
	        var functionPrototype = Object.getPrototypeOf(Function);
	        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
	        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
	        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
	        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	        // [[Metadata]] internal slot
	        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
	        var Metadata = new _WeakMap();
	        /**
	         * Applies a set of decorators to a property of a target object.
	         * @param decorators An array of decorators.
	         * @param target The target object.
	         * @param propertyKey (Optional) The property key to decorate.
	         * @param attributes (Optional) The property descriptor for the target key.
	         * @remarks Decorators are applied in reverse order.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     Example = Reflect.decorate(decoratorsArray, Example);
	         *
	         *     // property (on constructor)
	         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     Object.defineProperty(Example, "staticMethod",
	         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
	         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
	         *
	         *     // method (on prototype)
	         *     Object.defineProperty(Example.prototype, "method",
	         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
	         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
	         *
	         */
	        function decorate(decorators, target, propertyKey, attributes) {
	            if (!IsUndefined(propertyKey)) {
	                if (!IsArray(decorators))
	                    throw new TypeError();
	                if (!IsObject(target))
	                    throw new TypeError();
	                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
	                    throw new TypeError();
	                if (IsNull(attributes))
	                    attributes = undefined;
	                propertyKey = ToPropertyKey(propertyKey);
	                return DecorateProperty(decorators, target, propertyKey, attributes);
	            }
	            else {
	                if (!IsArray(decorators))
	                    throw new TypeError();
	                if (!IsConstructor(target))
	                    throw new TypeError();
	                return DecorateConstructor(decorators, target);
	            }
	        }
	        exporter("decorate", decorate);
	        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
	        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
	        /**
	         * A default metadata decorator factory that can be used on a class, class member, or parameter.
	         * @param metadataKey The key for the metadata entry.
	         * @param metadataValue The value for the metadata entry.
	         * @returns A decorator function.
	         * @remarks
	         * If `metadataKey` is already defined for the target and target key, the
	         * metadataValue for that key will be overwritten.
	         * @example
	         *
	         *     // constructor
	         *     @Reflect.metadata(key, value)
	         *     class Example {
	         *     }
	         *
	         *     // property (on constructor, TypeScript only)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         static staticProperty;
	         *     }
	         *
	         *     // property (on prototype, TypeScript only)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         property;
	         *     }
	         *
	         *     // method (on constructor)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         static staticMethod() { }
	         *     }
	         *
	         *     // method (on prototype)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         method() { }
	         *     }
	         *
	         */
	        function metadata(metadataKey, metadataValue) {
	            function decorator(target, propertyKey) {
	                if (!IsObject(target))
	                    throw new TypeError();
	                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
	                    throw new TypeError();
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	            }
	            return decorator;
	        }
	        exporter("metadata", metadata);
	        /**
	         * Define a unique metadata entry on the target.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param metadataValue A value that contains attached metadata.
	         * @param target The target object on which to define metadata.
	         * @param propertyKey (Optional) The property key for the target.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     Reflect.defineMetadata("custom:annotation", options, Example);
	         *
	         *     // property (on constructor)
	         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
	         *
	         *     // decorator factory as metadata-producing annotation.
	         *     function MyAnnotation(options): Decorator {
	         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	         *     }
	         *
	         */
	        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	        }
	        exporter("defineMetadata", defineMetadata);
	        /**
	         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.hasMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function hasMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("hasMetadata", hasMetadata);
	        /**
	         * Gets a value indicating whether the target object has the provided metadata key defined.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function hasOwnMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("hasOwnMetadata", hasOwnMetadata);
	        /**
	         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function getMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("getMetadata", getMetadata);
	        /**
	         * Gets the metadata value for the provided metadata key on the target object.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function getOwnMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("getOwnMetadata", getOwnMetadata);
	        /**
	         * Gets the metadata keys defined on the target object or its prototype chain.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns An array of unique metadata keys.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getMetadataKeys(Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
	         *
	         */
	        function getMetadataKeys(target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryMetadataKeys(target, propertyKey);
	        }
	        exporter("getMetadataKeys", getMetadataKeys);
	        /**
	         * Gets the unique metadata keys defined on the target object.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns An array of unique metadata keys.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getOwnMetadataKeys(Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
	         *
	         */
	        function getOwnMetadataKeys(target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryOwnMetadataKeys(target, propertyKey);
	        }
	        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
	        /**
	         * Deletes the metadata entry from the target object with the provided key.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.deleteMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function deleteMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return false;
	            if (!metadataMap.delete(metadataKey))
	                return false;
	            if (metadataMap.size > 0)
	                return true;
	            var targetMetadata = Metadata.get(target);
	            targetMetadata.delete(propertyKey);
	            if (targetMetadata.size > 0)
	                return true;
	            Metadata.delete(target);
	            return true;
	        }
	        exporter("deleteMetadata", deleteMetadata);
	        function DecorateConstructor(decorators, target) {
	            for (var i = decorators.length - 1; i >= 0; --i) {
	                var decorator = decorators[i];
	                var decorated = decorator(target);
	                if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                    if (!IsConstructor(decorated))
	                        throw new TypeError();
	                    target = decorated;
	                }
	            }
	            return target;
	        }
	        function DecorateProperty(decorators, target, propertyKey, descriptor) {
	            for (var i = decorators.length - 1; i >= 0; --i) {
	                var decorator = decorators[i];
	                var decorated = decorator(target, propertyKey, descriptor);
	                if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                    if (!IsObject(decorated))
	                        throw new TypeError();
	                    descriptor = decorated;
	                }
	            }
	            return descriptor;
	        }
	        function GetOrCreateMetadataMap(O, P, Create) {
	            var targetMetadata = Metadata.get(O);
	            if (IsUndefined(targetMetadata)) {
	                if (!Create)
	                    return undefined;
	                targetMetadata = new _Map();
	                Metadata.set(O, targetMetadata);
	            }
	            var metadataMap = targetMetadata.get(P);
	            if (IsUndefined(metadataMap)) {
	                if (!Create)
	                    return undefined;
	                metadataMap = new _Map();
	                targetMetadata.set(P, metadataMap);
	            }
	            return metadataMap;
	        }
	        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
	        function OrdinaryHasMetadata(MetadataKey, O, P) {
	            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	            if (hasOwn)
	                return true;
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (!IsNull(parent))
	                return OrdinaryHasMetadata(MetadataKey, parent, P);
	            return false;
	        }
	        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
	        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return false;
	            return ToBoolean(metadataMap.has(MetadataKey));
	        }
	        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
	        function OrdinaryGetMetadata(MetadataKey, O, P) {
	            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	            if (hasOwn)
	                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (!IsNull(parent))
	                return OrdinaryGetMetadata(MetadataKey, parent, P);
	            return undefined;
	        }
	        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
	        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return undefined;
	            return metadataMap.get(MetadataKey);
	        }
	        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
	        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
	            metadataMap.set(MetadataKey, MetadataValue);
	        }
	        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
	        function OrdinaryMetadataKeys(O, P) {
	            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (parent === null)
	                return ownKeys;
	            var parentKeys = OrdinaryMetadataKeys(parent, P);
	            if (parentKeys.length <= 0)
	                return ownKeys;
	            if (ownKeys.length <= 0)
	                return parentKeys;
	            var set = new _Set();
	            var keys = [];
	            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
	                var key = ownKeys_1[_i];
	                var hasKey = set.has(key);
	                if (!hasKey) {
	                    set.add(key);
	                    keys.push(key);
	                }
	            }
	            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
	                var key = parentKeys_1[_a];
	                var hasKey = set.has(key);
	                if (!hasKey) {
	                    set.add(key);
	                    keys.push(key);
	                }
	            }
	            return keys;
	        }
	        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
	        function OrdinaryOwnMetadataKeys(O, P) {
	            var keys = [];
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return keys;
	            var keysObj = metadataMap.keys();
	            var iterator = GetIterator(keysObj);
	            var k = 0;
	            while (true) {
	                var next = IteratorStep(iterator);
	                if (!next) {
	                    keys.length = k;
	                    return keys;
	                }
	                var nextValue = IteratorValue(next);
	                try {
	                    keys[k] = nextValue;
	                }
	                catch (e) {
	                    try {
	                        IteratorClose(iterator);
	                    }
	                    finally {
	                        throw e;
	                    }
	                }
	                k++;
	            }
	        }
	        // 6 ECMAScript Data Typ0es and Values
	        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
	        function Type(x) {
	            if (x === null)
	                return 1 /* Null */;
	            switch (typeof x) {
	                case "undefined": return 0 /* Undefined */;
	                case "boolean": return 2 /* Boolean */;
	                case "string": return 3 /* String */;
	                case "symbol": return 4 /* Symbol */;
	                case "number": return 5 /* Number */;
	                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
	                default: return 6 /* Object */;
	            }
	        }
	        // 6.1.1 The Undefined Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
	        function IsUndefined(x) {
	            return x === undefined;
	        }
	        // 6.1.2 The Null Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
	        function IsNull(x) {
	            return x === null;
	        }
	        // 6.1.5 The Symbol Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
	        function IsSymbol(x) {
	            return typeof x === "symbol";
	        }
	        // 6.1.7 The Object Type
	        // https://tc39.github.io/ecma262/#sec-object-type
	        function IsObject(x) {
	            return typeof x === "object" ? x !== null : typeof x === "function";
	        }
	        // 7.1 Type Conversion
	        // https://tc39.github.io/ecma262/#sec-type-conversion
	        // 7.1.1 ToPrimitive(input [, PreferredType])
	        // https://tc39.github.io/ecma262/#sec-toprimitive
	        function ToPrimitive(input, PreferredType) {
	            switch (Type(input)) {
	                case 0 /* Undefined */: return input;
	                case 1 /* Null */: return input;
	                case 2 /* Boolean */: return input;
	                case 3 /* String */: return input;
	                case 4 /* Symbol */: return input;
	                case 5 /* Number */: return input;
	            }
	            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
	            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
	            if (exoticToPrim !== undefined) {
	                var result = exoticToPrim.call(input, hint);
	                if (IsObject(result))
	                    throw new TypeError();
	                return result;
	            }
	            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
	        }
	        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
	        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
	        function OrdinaryToPrimitive(O, hint) {
	            if (hint === "string") {
	                var toString_1 = O.toString;
	                if (IsCallable(toString_1)) {
	                    var result = toString_1.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	                var valueOf = O.valueOf;
	                if (IsCallable(valueOf)) {
	                    var result = valueOf.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	            }
	            else {
	                var valueOf = O.valueOf;
	                if (IsCallable(valueOf)) {
	                    var result = valueOf.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	                var toString_2 = O.toString;
	                if (IsCallable(toString_2)) {
	                    var result = toString_2.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	            }
	            throw new TypeError();
	        }
	        // 7.1.2 ToBoolean(argument)
	        // https://tc39.github.io/ecma262/2016/#sec-toboolean
	        function ToBoolean(argument) {
	            return !!argument;
	        }
	        // 7.1.12 ToString(argument)
	        // https://tc39.github.io/ecma262/#sec-tostring
	        function ToString(argument) {
	            return "" + argument;
	        }
	        // 7.1.14 ToPropertyKey(argument)
	        // https://tc39.github.io/ecma262/#sec-topropertykey
	        function ToPropertyKey(argument) {
	            var key = ToPrimitive(argument, 3 /* String */);
	            if (IsSymbol(key))
	                return key;
	            return ToString(key);
	        }
	        // 7.2 Testing and Comparison Operations
	        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
	        // 7.2.2 IsArray(argument)
	        // https://tc39.github.io/ecma262/#sec-isarray
	        function IsArray(argument) {
	            return Array.isArray
	                ? Array.isArray(argument)
	                : argument instanceof Object
	                    ? argument instanceof Array
	                    : Object.prototype.toString.call(argument) === "[object Array]";
	        }
	        // 7.2.3 IsCallable(argument)
	        // https://tc39.github.io/ecma262/#sec-iscallable
	        function IsCallable(argument) {
	            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
	            return typeof argument === "function";
	        }
	        // 7.2.4 IsConstructor(argument)
	        // https://tc39.github.io/ecma262/#sec-isconstructor
	        function IsConstructor(argument) {
	            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
	            return typeof argument === "function";
	        }
	        // 7.2.7 IsPropertyKey(argument)
	        // https://tc39.github.io/ecma262/#sec-ispropertykey
	        function IsPropertyKey(argument) {
	            switch (Type(argument)) {
	                case 3 /* String */: return true;
	                case 4 /* Symbol */: return true;
	                default: return false;
	            }
	        }
	        // 7.3 Operations on Objects
	        // https://tc39.github.io/ecma262/#sec-operations-on-objects
	        // 7.3.9 GetMethod(V, P)
	        // https://tc39.github.io/ecma262/#sec-getmethod
	        function GetMethod(V, P) {
	            var func = V[P];
	            if (func === undefined || func === null)
	                return undefined;
	            if (!IsCallable(func))
	                throw new TypeError();
	            return func;
	        }
	        // 7.4 Operations on Iterator Objects
	        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
	        function GetIterator(obj) {
	            var method = GetMethod(obj, iteratorSymbol);
	            if (!IsCallable(method))
	                throw new TypeError(); // from Call
	            var iterator = method.call(obj);
	            if (!IsObject(iterator))
	                throw new TypeError();
	            return iterator;
	        }
	        // 7.4.4 IteratorValue(iterResult)
	        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
	        function IteratorValue(iterResult) {
	            return iterResult.value;
	        }
	        // 7.4.5 IteratorStep(iterator)
	        // https://tc39.github.io/ecma262/#sec-iteratorstep
	        function IteratorStep(iterator) {
	            var result = iterator.next();
	            return result.done ? false : result;
	        }
	        // 7.4.6 IteratorClose(iterator, completion)
	        // https://tc39.github.io/ecma262/#sec-iteratorclose
	        function IteratorClose(iterator) {
	            var f = iterator["return"];
	            if (f)
	                f.call(iterator);
	        }
	        // 9.1 Ordinary Object Internal Methods and Internal Slots
	        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
	        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
	        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
	        function OrdinaryGetPrototypeOf(O) {
	            var proto = Object.getPrototypeOf(O);
	            if (typeof O !== "function" || O === functionPrototype)
	                return proto;
	            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
	            // Try to determine the superclass constructor. Compatible implementations
	            // must either set __proto__ on a subclass constructor to the superclass constructor,
	            // or ensure each class has a valid `constructor` property on its prototype that
	            // points back to the constructor.
	            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	            // This is the case when in ES6 or when using __proto__ in a compatible browser.
	            if (proto !== functionPrototype)
	                return proto;
	            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	            var prototype = O.prototype;
	            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	            if (prototypeProto == null || prototypeProto === Object.prototype)
	                return proto;
	            // If the constructor was not a function, then we cannot determine the heritage.
	            var constructor = prototypeProto.constructor;
	            if (typeof constructor !== "function")
	                return proto;
	            // If we have some kind of self-reference, then we cannot determine the heritage.
	            if (constructor === O)
	                return proto;
	            // we have a pretty good guess at the heritage.
	            return constructor;
	        }
	        // naive Map shim
	        function CreateMapPolyfill() {
	            var cacheSentinel = {};
	            var arraySentinel = [];
	            var MapIterator = (function () {
	                function MapIterator(keys, values, selector) {
	                    this._index = 0;
	                    this._keys = keys;
	                    this._values = values;
	                    this._selector = selector;
	                }
	                MapIterator.prototype["@@iterator"] = function () { return this; };
	                MapIterator.prototype[iteratorSymbol] = function () { return this; };
	                MapIterator.prototype.next = function () {
	                    var index = this._index;
	                    if (index >= 0 && index < this._keys.length) {
	                        var result = this._selector(this._keys[index], this._values[index]);
	                        if (index + 1 >= this._keys.length) {
	                            this._index = -1;
	                            this._keys = arraySentinel;
	                            this._values = arraySentinel;
	                        }
	                        else {
	                            this._index++;
	                        }
	                        return { value: result, done: false };
	                    }
	                    return { value: undefined, done: true };
	                };
	                MapIterator.prototype.throw = function (error) {
	                    if (this._index >= 0) {
	                        this._index = -1;
	                        this._keys = arraySentinel;
	                        this._values = arraySentinel;
	                    }
	                    throw error;
	                };
	                MapIterator.prototype.return = function (value) {
	                    if (this._index >= 0) {
	                        this._index = -1;
	                        this._keys = arraySentinel;
	                        this._values = arraySentinel;
	                    }
	                    return { value: value, done: true };
	                };
	                return MapIterator;
	            }());
	            return (function () {
	                function Map() {
	                    this._keys = [];
	                    this._values = [];
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                }
	                Object.defineProperty(Map.prototype, "size", {
	                    get: function () { return this._keys.length; },
	                    enumerable: true,
	                    configurable: true
	                });
	                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
	                Map.prototype.get = function (key) {
	                    var index = this._find(key, /*insert*/ false);
	                    return index >= 0 ? this._values[index] : undefined;
	                };
	                Map.prototype.set = function (key, value) {
	                    var index = this._find(key, /*insert*/ true);
	                    this._values[index] = value;
	                    return this;
	                };
	                Map.prototype.delete = function (key) {
	                    var index = this._find(key, /*insert*/ false);
	                    if (index >= 0) {
	                        var size = this._keys.length;
	                        for (var i = index + 1; i < size; i++) {
	                            this._keys[i - 1] = this._keys[i];
	                            this._values[i - 1] = this._values[i];
	                        }
	                        this._keys.length--;
	                        this._values.length--;
	                        if (key === this._cacheKey) {
	                            this._cacheKey = cacheSentinel;
	                            this._cacheIndex = -2;
	                        }
	                        return true;
	                    }
	                    return false;
	                };
	                Map.prototype.clear = function () {
	                    this._keys.length = 0;
	                    this._values.length = 0;
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                };
	                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
	                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
	                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
	                Map.prototype["@@iterator"] = function () { return this.entries(); };
	                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
	                Map.prototype._find = function (key, insert) {
	                    if (this._cacheKey !== key) {
	                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
	                    }
	                    if (this._cacheIndex < 0 && insert) {
	                        this._cacheIndex = this._keys.length;
	                        this._keys.push(key);
	                        this._values.push(undefined);
	                    }
	                    return this._cacheIndex;
	                };
	                return Map;
	            }());
	            function getKey(key, _) {
	                return key;
	            }
	            function getValue(_, value) {
	                return value;
	            }
	            function getEntry(key, value) {
	                return [key, value];
	            }
	        }
	        // naive Set shim
	        function CreateSetPolyfill() {
	            return (function () {
	                function Set() {
	                    this._map = new _Map();
	                }
	                Object.defineProperty(Set.prototype, "size", {
	                    get: function () { return this._map.size; },
	                    enumerable: true,
	                    configurable: true
	                });
	                Set.prototype.has = function (value) { return this._map.has(value); };
	                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
	                Set.prototype.delete = function (value) { return this._map.delete(value); };
	                Set.prototype.clear = function () { this._map.clear(); };
	                Set.prototype.keys = function () { return this._map.keys(); };
	                Set.prototype.values = function () { return this._map.values(); };
	                Set.prototype.entries = function () { return this._map.entries(); };
	                Set.prototype["@@iterator"] = function () { return this.keys(); };
	                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
	                return Set;
	            }());
	        }
	        // naive WeakMap shim
	        function CreateWeakMapPolyfill() {
	            var UUID_SIZE = 16;
	            var keys = HashMap.create();
	            var rootKey = CreateUniqueKey();
	            return (function () {
	                function WeakMap() {
	                    this._key = CreateUniqueKey();
	                }
	                WeakMap.prototype.has = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? HashMap.has(table, this._key) : false;
	                };
	                WeakMap.prototype.get = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
	                };
	                WeakMap.prototype.set = function (target, value) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
	                    table[this._key] = value;
	                    return this;
	                };
	                WeakMap.prototype.delete = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? delete table[this._key] : false;
	                };
	                WeakMap.prototype.clear = function () {
	                    // NOTE: not a real clear, just makes the previous data unreachable
	                    this._key = CreateUniqueKey();
	                };
	                return WeakMap;
	            }());
	            function CreateUniqueKey() {
	                var key;
	                do
	                    key = "@@WeakMap@@" + CreateUUID();
	                while (HashMap.has(keys, key));
	                keys[key] = true;
	                return key;
	            }
	            function GetOrCreateWeakMapTable(target, create) {
	                if (!hasOwn.call(target, rootKey)) {
	                    if (!create)
	                        return undefined;
	                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
	                }
	                return target[rootKey];
	            }
	            function FillRandomBytes(buffer, size) {
	                for (var i = 0; i < size; ++i)
	                    buffer[i] = Math.random() * 0xff | 0;
	                return buffer;
	            }
	            function GenRandomBytes(size) {
	                if (typeof Uint8Array === "function") {
	                    if (typeof crypto !== "undefined")
	                        return crypto.getRandomValues(new Uint8Array(size));
	                    if (typeof msCrypto !== "undefined")
	                        return msCrypto.getRandomValues(new Uint8Array(size));
	                    return FillRandomBytes(new Uint8Array(size), size);
	                }
	                return FillRandomBytes(new Array(size), size);
	            }
	            function CreateUUID() {
	                var data = GenRandomBytes(UUID_SIZE);
	                // mark as random - RFC 4122 § 4.4
	                data[6] = data[6] & 0x4f | 0x40;
	                data[8] = data[8] & 0xbf | 0x80;
	                var result = "";
	                for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                    var byte = data[offset];
	                    if (offset === 4 || offset === 6 || offset === 8)
	                        result += "-";
	                    if (byte < 16)
	                        result += "0";
	                    result += byte.toString(16).toLowerCase();
	                }
	                return result;
	            }
	        }
	        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
	        function MakeDictionary(obj) {
	            obj.__ = undefined;
	            delete obj.__;
	            return obj;
	        }
	    });
	})(Reflect || (Reflect = {}));
	//# sourceMappingURL=Reflect.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), (function() { return this; }())))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var keys = __webpack_require__(15);
	exports.METADATA_KEY = keys;
	var container_1 = __webpack_require__(16);
	exports.Container = container_1.Container;
	var literal_types_1 = __webpack_require__(18);
	exports.BindingScopeEnum = literal_types_1.BindingScopeEnum;
	exports.BindingTypeEnum = literal_types_1.BindingTypeEnum;
	exports.TargetTypeEnum = literal_types_1.TargetTypeEnum;
	var container_module_1 = __webpack_require__(46);
	exports.AsyncContainerModule = container_module_1.AsyncContainerModule;
	exports.ContainerModule = container_module_1.ContainerModule;
	var injectable_1 = __webpack_require__(47);
	exports.injectable = injectable_1.injectable;
	var tagged_1 = __webpack_require__(48);
	exports.tagged = tagged_1.tagged;
	var named_1 = __webpack_require__(49);
	exports.named = named_1.named;
	var inject_1 = __webpack_require__(30);
	exports.inject = inject_1.inject;
	exports.LazyServiceIdentifer = inject_1.LazyServiceIdentifer;
	var optional_1 = __webpack_require__(50);
	exports.optional = optional_1.optional;
	var unmanaged_1 = __webpack_require__(51);
	exports.unmanaged = unmanaged_1.unmanaged;
	var multi_inject_1 = __webpack_require__(52);
	exports.multiInject = multi_inject_1.multiInject;
	var target_name_1 = __webpack_require__(53);
	exports.targetName = target_name_1.targetName;
	var post_construct_1 = __webpack_require__(54);
	exports.postConstruct = post_construct_1.postConstruct;
	var metadata_reader_1 = __webpack_require__(21);
	exports.MetadataReader = metadata_reader_1.MetadataReader;
	var guid_1 = __webpack_require__(19);
	exports.guid = guid_1.guid;
	var decorator_utils_1 = __webpack_require__(31);
	exports.decorate = decorator_utils_1.decorate;
	var constraint_helpers_1 = __webpack_require__(43);
	exports.traverseAncerstors = constraint_helpers_1.traverseAncerstors;
	exports.taggedConstraint = constraint_helpers_1.taggedConstraint;
	exports.namedConstraint = constraint_helpers_1.namedConstraint;
	exports.typeConstraint = constraint_helpers_1.typeConstraint;
	var serialization_1 = __webpack_require__(25);
	exports.getServiceIdentifierAsString = serialization_1.getServiceIdentifierAsString;
	var binding_utils_1 = __webpack_require__(55);
	exports.multiBindToService = binding_utils_1.multiBindToService;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.NAMED_TAG = "named";
	exports.NAME_TAG = "name";
	exports.UNMANAGED_TAG = "unmanaged";
	exports.OPTIONAL_TAG = "optional";
	exports.INJECT_TAG = "inject";
	exports.MULTI_INJECT_TAG = "multi_inject";
	exports.TAGGED = "inversify:tagged";
	exports.TAGGED_PROP = "inversify:tagged_props";
	exports.PARAM_TYPES = "inversify:paramtypes";
	exports.DESIGN_PARAM_TYPES = "design:paramtypes";
	exports.POST_CONSTRUCT = "post_construct";


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	var __generator = (this && this.__generator) || function (thisArg, body) {
	    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
	    function verb(n) { return function (v) { return step([n, v]); }; }
	    function step(op) {
	        if (f) throw new TypeError("Generator is already executing.");
	        while (_) try {
	            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
	            if (y = 0, t) op = [0, t.value];
	            switch (op[0]) {
	                case 0: case 1: t = op; break;
	                case 4: _.label++; return { value: op[1], done: false };
	                case 5: _.label++; y = op[1]; op = [0]; continue;
	                case 7: op = _.ops.pop(); _.trys.pop(); continue;
	                default:
	                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
	                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
	                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
	                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
	                    if (t[2]) _.ops.pop();
	                    _.trys.pop(); continue;
	            }
	            op = body.call(thisArg, _);
	        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
	        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_1 = __webpack_require__(17);
	var ERROR_MSGS = __webpack_require__(20);
	var literal_types_1 = __webpack_require__(18);
	var METADATA_KEY = __webpack_require__(15);
	var metadata_reader_1 = __webpack_require__(21);
	var planner_1 = __webpack_require__(22);
	var resolver_1 = __webpack_require__(35);
	var binding_to_syntax_1 = __webpack_require__(37);
	var guid_1 = __webpack_require__(19);
	var serialization_1 = __webpack_require__(25);
	var container_snapshot_1 = __webpack_require__(44);
	var lookup_1 = __webpack_require__(45);
	var Container = (function () {
	    function Container(containerOptions) {
	        var options = containerOptions || {};
	        if (typeof options !== "object") {
	            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
	        }
	        if (options.defaultScope === undefined) {
	            options.defaultScope = literal_types_1.BindingScopeEnum.Transient;
	        }
	        else if (options.defaultScope !== literal_types_1.BindingScopeEnum.Singleton &&
	            options.defaultScope !== literal_types_1.BindingScopeEnum.Transient &&
	            options.defaultScope !== literal_types_1.BindingScopeEnum.Request) {
	            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
	        }
	        if (options.autoBindInjectable === undefined) {
	            options.autoBindInjectable = false;
	        }
	        else if (typeof options.autoBindInjectable !== "boolean") {
	            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
	        }
	        if (options.skipBaseClassChecks === undefined) {
	            options.skipBaseClassChecks = false;
	        }
	        else if (typeof options.skipBaseClassChecks !== "boolean") {
	            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
	        }
	        this.options = {
	            autoBindInjectable: options.autoBindInjectable,
	            defaultScope: options.defaultScope,
	            skipBaseClassChecks: options.skipBaseClassChecks
	        };
	        this.guid = guid_1.guid();
	        this._bindingDictionary = new lookup_1.Lookup();
	        this._snapshots = [];
	        this._middleware = null;
	        this.parent = null;
	        this._metadataReader = new metadata_reader_1.MetadataReader();
	    }
	    Container.merge = function (container1, container2) {
	        var container = new Container();
	        var bindingDictionary = planner_1.getBindingDictionary(container);
	        var bindingDictionary1 = planner_1.getBindingDictionary(container1);
	        var bindingDictionary2 = planner_1.getBindingDictionary(container2);
	        function copyDictionary(origin, destination) {
	            origin.traverse(function (key, value) {
	                value.forEach(function (binding) {
	                    destination.add(binding.serviceIdentifier, binding.clone());
	                });
	            });
	        }
	        copyDictionary(bindingDictionary1, bindingDictionary);
	        copyDictionary(bindingDictionary2, bindingDictionary);
	        return container;
	    };
	    Container.prototype.load = function () {
	        var modules = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            modules[_i] = arguments[_i];
	        }
	        var getHelpers = this._getContainerModuleHelpersFactory();
	        for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
	            var currentModule = modules_1[_a];
	            var containerModuleHelpers = getHelpers(currentModule.guid);
	            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
	        }
	    };
	    Container.prototype.loadAsync = function () {
	        var modules = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            modules[_i] = arguments[_i];
	        }
	        return __awaiter(this, void 0, void 0, function () {
	            var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
	            return __generator(this, function (_b) {
	                switch (_b.label) {
	                    case 0:
	                        getHelpers = this._getContainerModuleHelpersFactory();
	                        _a = 0, modules_2 = modules;
	                        _b.label = 1;
	                    case 1:
	                        if (!(_a < modules_2.length)) return [3, 4];
	                        currentModule = modules_2[_a];
	                        containerModuleHelpers = getHelpers(currentModule.guid);
	                        return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];
	                    case 2:
	                        _b.sent();
	                        _b.label = 3;
	                    case 3:
	                        _a++;
	                        return [3, 1];
	                    case 4: return [2];
	                }
	            });
	        });
	    };
	    Container.prototype.unload = function () {
	        var _this = this;
	        var modules = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            modules[_i] = arguments[_i];
	        }
	        var conditionFactory = function (expected) { return function (item) {
	            return item.moduleId === expected;
	        }; };
	        modules.forEach(function (module) {
	            var condition = conditionFactory(module.guid);
	            _this._bindingDictionary.removeByCondition(condition);
	        });
	    };
	    Container.prototype.bind = function (serviceIdentifier) {
	        var scope = this.options.defaultScope || literal_types_1.BindingScopeEnum.Transient;
	        var binding = new binding_1.Binding(serviceIdentifier, scope);
	        this._bindingDictionary.add(serviceIdentifier, binding);
	        return new binding_to_syntax_1.BindingToSyntax(binding);
	    };
	    Container.prototype.rebind = function (serviceIdentifier) {
	        this.unbind(serviceIdentifier);
	        return this.bind(serviceIdentifier);
	    };
	    Container.prototype.unbind = function (serviceIdentifier) {
	        try {
	            this._bindingDictionary.remove(serviceIdentifier);
	        }
	        catch (e) {
	            throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + serialization_1.getServiceIdentifierAsString(serviceIdentifier));
	        }
	    };
	    Container.prototype.unbindAll = function () {
	        this._bindingDictionary = new lookup_1.Lookup();
	    };
	    Container.prototype.isBound = function (serviceIdentifier) {
	        var bound = this._bindingDictionary.hasKey(serviceIdentifier);
	        if (!bound && this.parent) {
	            bound = this.parent.isBound(serviceIdentifier);
	        }
	        return bound;
	    };
	    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
	        return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
	    };
	    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
	        var bound = false;
	        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
	            var bindings = this._bindingDictionary.get(serviceIdentifier);
	            var request_1 = planner_1.createMockRequest(this, serviceIdentifier, key, value);
	            bound = bindings.some(function (b) { return b.constraint(request_1); });
	        }
	        if (!bound && this.parent) {
	            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
	        }
	        return bound;
	    };
	    Container.prototype.snapshot = function () {
	        this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
	    };
	    Container.prototype.restore = function () {
	        var snapshot = this._snapshots.pop();
	        if (snapshot === undefined) {
	            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
	        }
	        this._bindingDictionary = snapshot.bindings;
	        this._middleware = snapshot.middleware;
	    };
	    Container.prototype.createChild = function (containerOptions) {
	        var child = new Container(containerOptions);
	        child.parent = this;
	        return child;
	    };
	    Container.prototype.applyMiddleware = function () {
	        var middlewares = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            middlewares[_i] = arguments[_i];
	        }
	        var initial = (this._middleware) ? this._middleware : this._planAndResolve();
	        this._middleware = middlewares.reduce(function (prev, curr) { return curr(prev); }, initial);
	    };
	    Container.prototype.applyCustomMetadataReader = function (metadataReader) {
	        this._metadataReader = metadataReader;
	    };
	    Container.prototype.get = function (serviceIdentifier) {
	        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
	    };
	    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
	        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
	    };
	    Container.prototype.getNamed = function (serviceIdentifier, named) {
	        return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
	    };
	    Container.prototype.getAll = function (serviceIdentifier) {
	        return this._get(true, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
	    };
	    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
	        return this._get(false, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
	    };
	    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
	        return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
	    };
	    Container.prototype.resolve = function (constructorFunction) {
	        var tempContainer = new Container();
	        tempContainer.bind(constructorFunction).toSelf();
	        tempContainer.parent = this;
	        return tempContainer.get(constructorFunction);
	    };
	    Container.prototype._getContainerModuleHelpersFactory = function () {
	        var _this = this;
	        var setModuleId = function (bindingToSyntax, moduleId) {
	            bindingToSyntax._binding.moduleId = moduleId;
	        };
	        var getBindFunction = function (moduleId) {
	            return function (serviceIdentifier) {
	                var _bind = _this.bind.bind(_this);
	                var bindingToSyntax = _bind(serviceIdentifier);
	                setModuleId(bindingToSyntax, moduleId);
	                return bindingToSyntax;
	            };
	        };
	        var getUnbindFunction = function (moduleId) {
	            return function (serviceIdentifier) {
	                var _unbind = _this.unbind.bind(_this);
	                _unbind(serviceIdentifier);
	            };
	        };
	        var getIsboundFunction = function (moduleId) {
	            return function (serviceIdentifier) {
	                var _isBound = _this.isBound.bind(_this);
	                return _isBound(serviceIdentifier);
	            };
	        };
	        var getRebindFunction = function (moduleId) {
	            return function (serviceIdentifier) {
	                var _rebind = _this.rebind.bind(_this);
	                var bindingToSyntax = _rebind(serviceIdentifier);
	                setModuleId(bindingToSyntax, moduleId);
	                return bindingToSyntax;
	            };
	        };
	        return function (mId) { return ({
	            bindFunction: getBindFunction(mId),
	            isboundFunction: getIsboundFunction(mId),
	            rebindFunction: getRebindFunction(mId),
	            unbindFunction: getUnbindFunction(mId)
	        }); };
	    };
	    Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
	        var result = null;
	        var defaultArgs = {
	            avoidConstraints: avoidConstraints,
	            contextInterceptor: function (context) { return context; },
	            isMultiInject: isMultiInject,
	            key: key,
	            serviceIdentifier: serviceIdentifier,
	            targetType: targetType,
	            value: value
	        };
	        if (this._middleware) {
	            result = this._middleware(defaultArgs);
	            if (result === undefined || result === null) {
	                throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
	            }
	        }
	        else {
	            result = this._planAndResolve()(defaultArgs);
	        }
	        return result;
	    };
	    Container.prototype._planAndResolve = function () {
	        var _this = this;
	        return function (args) {
	            var context = planner_1.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
	            context = args.contextInterceptor(context);
	            var result = resolver_1.resolve(context);
	            return result;
	        };
	    };
	    return Container;
	}());
	exports.Container = Container;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var literal_types_1 = __webpack_require__(18);
	var guid_1 = __webpack_require__(19);
	var Binding = (function () {
	    function Binding(serviceIdentifier, scope) {
	        this.guid = guid_1.guid();
	        this.activated = false;
	        this.serviceIdentifier = serviceIdentifier;
	        this.scope = scope;
	        this.type = literal_types_1.BindingTypeEnum.Invalid;
	        this.constraint = function (request) { return true; };
	        this.implementationType = null;
	        this.cache = null;
	        this.factory = null;
	        this.provider = null;
	        this.onActivation = null;
	        this.dynamicValue = null;
	    }
	    Binding.prototype.clone = function () {
	        var clone = new Binding(this.serviceIdentifier, this.scope);
	        clone.activated = false;
	        clone.implementationType = this.implementationType;
	        clone.dynamicValue = this.dynamicValue;
	        clone.scope = this.scope;
	        clone.type = this.type;
	        clone.factory = this.factory;
	        clone.provider = this.provider;
	        clone.constraint = this.constraint;
	        clone.onActivation = this.onActivation;
	        clone.cache = this.cache;
	        return clone;
	    };
	    return Binding;
	}());
	exports.Binding = Binding;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var BindingScopeEnum = {
	    Request: "Request",
	    Singleton: "Singleton",
	    Transient: "Transient"
	};
	exports.BindingScopeEnum = BindingScopeEnum;
	var BindingTypeEnum = {
	    ConstantValue: "ConstantValue",
	    Constructor: "Constructor",
	    DynamicValue: "DynamicValue",
	    Factory: "Factory",
	    Function: "Function",
	    Instance: "Instance",
	    Invalid: "Invalid",
	    Provider: "Provider"
	};
	exports.BindingTypeEnum = BindingTypeEnum;
	var TargetTypeEnum = {
	    ClassProperty: "ClassProperty",
	    ConstructorArgument: "ConstructorArgument",
	    Variable: "Variable"
	};
	exports.TargetTypeEnum = TargetTypeEnum;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function guid() {
	    function s4() {
	        return Math.floor((Math.random() + 1) * 0x10000)
	            .toString(16)
	            .substring(1);
	    }
	    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
	        s4() + "-" + s4() + s4() + s4();
	}
	exports.guid = guid;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
	exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
	exports.NULL_ARGUMENT = "NULL argument";
	exports.KEY_NOT_FOUND = "Key Not Found";
	exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
	exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
	exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
	exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
	exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
	exports.UNDEFINED_INJECT_ANNOTATION = function (name) {
	    return "@inject called with undefined this could mean that the class " + name + " has " +
	        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
	        "overcome this limitation.";
	};
	exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
	exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
	exports.INVALID_BINDING_TYPE = "Invalid binding type:";
	exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
	exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
	exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
	exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
	    "used as service identifier";
	exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
	    "must be applied to the parameters of a class constructor or a class property.";
	exports.ARGUMENTS_LENGTH_MISMATCH = function () {
	    var values = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        values[_i] = arguments[_i];
	    }
	    return "The number of constructor arguments in the derived class " +
	        (values[0] + " must be >= than the number of constructor arguments of its base class.");
	};
	exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
	    "must be an object.";
	exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
	    "be a string ('singleton' or 'transient').";
	exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
	    "be a boolean";
	exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
	    "be a boolean";
	exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
	exports.POST_CONSTRUCT_ERROR = function () {
	    var values = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        values[_i] = arguments[_i];
	    }
	    return "@postConstruct error in class " + values[0] + ": " + values[1];
	};
	exports.CIRCULAR_DEPENDENCY_IN_FACTORY = function () {
	    var values = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        values[_i] = arguments[_i];
	    }
	    return "It looks like there is a circular dependency " +
	        ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") +
	        ("service identifier '" + values[1] + "'.");
	};
	exports.STACK_OVERFLOW = "Maximum call stack size exceeded";


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var MetadataReader = (function () {
	    function MetadataReader() {
	    }
	    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
	        var compilerGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, constructorFunc);
	        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, constructorFunc);
	        return {
	            compilerGeneratedMetadata: compilerGeneratedMetadata,
	            userGeneratedMetadata: userGeneratedMetadata || {}
	        };
	    };
	    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
	        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED_PROP, constructorFunc) || [];
	        return userGeneratedMetadata;
	    };
	    return MetadataReader;
	}());
	exports.MetadataReader = MetadataReader;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_count_1 = __webpack_require__(23);
	var ERROR_MSGS = __webpack_require__(20);
	var literal_types_1 = __webpack_require__(18);
	var METADATA_KEY = __webpack_require__(15);
	var exceptions_1 = __webpack_require__(24);
	var serialization_1 = __webpack_require__(25);
	var context_1 = __webpack_require__(26);
	var metadata_1 = __webpack_require__(27);
	var plan_1 = __webpack_require__(28);
	var reflection_utils_1 = __webpack_require__(29);
	var request_1 = __webpack_require__(34);
	var target_1 = __webpack_require__(32);
	function getBindingDictionary(cntnr) {
	    return cntnr._bindingDictionary;
	}
	exports.getBindingDictionary = getBindingDictionary;
	function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
	    var metadataKey = isMultiInject ? METADATA_KEY.MULTI_INJECT_TAG : METADATA_KEY.INJECT_TAG;
	    var injectMetadata = new metadata_1.Metadata(metadataKey, serviceIdentifier);
	    var target = new target_1.Target(targetType, name, serviceIdentifier, injectMetadata);
	    if (key !== undefined) {
	        var tagMetadata = new metadata_1.Metadata(key, value);
	        target.metadata.push(tagMetadata);
	    }
	    return target;
	}
	function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
	    var bindings = getBindings(context.container, target.serviceIdentifier);
	    var activeBindings = [];
	    if (bindings.length === binding_count_1.BindingCount.NoBindingsAvailable &&
	        context.container.options.autoBindInjectable &&
	        typeof target.serviceIdentifier === "function" &&
	        metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
	        context.container.bind(target.serviceIdentifier).toSelf();
	        bindings = getBindings(context.container, target.serviceIdentifier);
	    }
	    if (!avoidConstraints) {
	        activeBindings = bindings.filter(function (binding) {
	            var request = new request_1.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
	            return binding.constraint(request);
	        });
	    }
	    else {
	        activeBindings = bindings;
	    }
	    _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
	    return activeBindings;
	}
	function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
	    switch (bindings.length) {
	        case binding_count_1.BindingCount.NoBindingsAvailable:
	            if (target.isOptional()) {
	                return bindings;
	            }
	            else {
	                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
	                var msg = ERROR_MSGS.NOT_REGISTERED;
	                msg += serialization_1.listMetadataForTarget(serviceIdentifierString, target);
	                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
	                throw new Error(msg);
	            }
	        case binding_count_1.BindingCount.OnlyOneBindingAvailable:
	            if (!target.isArray()) {
	                return bindings;
	            }
	        case binding_count_1.BindingCount.MultipleBindingsAvailable:
	        default:
	            if (!target.isArray()) {
	                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
	                var msg = ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
	                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
	                throw new Error(msg);
	            }
	            else {
	                return bindings;
	            }
	    }
	}
	function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
	    var activeBindings;
	    var childRequest;
	    if (parentRequest === null) {
	        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
	        childRequest = new request_1.Request(serviceIdentifier, context, null, activeBindings, target);
	        var thePlan = new plan_1.Plan(context, childRequest);
	        context.addPlan(thePlan);
	    }
	    else {
	        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
	        childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
	    }
	    activeBindings.forEach(function (binding) {
	        var subChildRequest = null;
	        if (target.isArray()) {
	            subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
	        }
	        else {
	            if (binding.cache) {
	                return;
	            }
	            subChildRequest = childRequest;
	        }
	        if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
	            var dependencies = reflection_utils_1.getDependencies(metadataReader, binding.implementationType);
	            if (!context.container.options.skipBaseClassChecks) {
	                var baseClassDependencyCount = reflection_utils_1.getBaseClassDependencyCount(metadataReader, binding.implementationType);
	                if (dependencies.length < baseClassDependencyCount) {
	                    var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH(reflection_utils_1.getFunctionName(binding.implementationType));
	                    throw new Error(error);
	                }
	            }
	            dependencies.forEach(function (dependency) {
	                _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
	            });
	        }
	    });
	}
	function getBindings(container, serviceIdentifier) {
	    var bindings = [];
	    var bindingDictionary = getBindingDictionary(container);
	    if (bindingDictionary.hasKey(serviceIdentifier)) {
	        bindings = bindingDictionary.get(serviceIdentifier);
	    }
	    else if (container.parent !== null) {
	        bindings = getBindings(container.parent, serviceIdentifier);
	    }
	    return bindings;
	}
	function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
	    if (avoidConstraints === void 0) { avoidConstraints = false; }
	    var context = new context_1.Context(container);
	    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
	    try {
	        _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
	        return context;
	    }
	    catch (error) {
	        if (exceptions_1.isStackOverflowExeption(error)) {
	            if (context.plan) {
	                serialization_1.circularDependencyToException(context.plan.rootRequest);
	            }
	        }
	        throw error;
	    }
	}
	exports.plan = plan;
	function createMockRequest(container, serviceIdentifier, key, value) {
	    var target = new target_1.Target(literal_types_1.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata_1.Metadata(key, value));
	    var context = new context_1.Context(container);
	    var request = new request_1.Request(serviceIdentifier, context, null, [], target);
	    return request;
	}
	exports.createMockRequest = createMockRequest;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var BindingCount = {
	    MultipleBindingsAvailable: 2,
	    NoBindingsAvailable: 0,
	    OnlyOneBindingAvailable: 1
	};
	exports.BindingCount = BindingCount;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERROR_MSGS = __webpack_require__(20);
	function isStackOverflowExeption(error) {
	    return (error instanceof RangeError ||
	        error.message === ERROR_MSGS.STACK_OVERFLOW);
	}
	exports.isStackOverflowExeption = isStackOverflowExeption;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERROR_MSGS = __webpack_require__(20);
	function getServiceIdentifierAsString(serviceIdentifier) {
	    if (typeof serviceIdentifier === "function") {
	        var _serviceIdentifier = serviceIdentifier;
	        return _serviceIdentifier.name;
	    }
	    else if (typeof serviceIdentifier === "symbol") {
	        return serviceIdentifier.toString();
	    }
	    else {
	        var _serviceIdentifier = serviceIdentifier;
	        return _serviceIdentifier;
	    }
	}
	exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
	function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
	    var registeredBindingsList = "";
	    var registeredBindings = getBindings(container, serviceIdentifier);
	    if (registeredBindings.length !== 0) {
	        registeredBindingsList = "\nRegistered bindings:";
	        registeredBindings.forEach(function (binding) {
	            var name = "Object";
	            if (binding.implementationType !== null) {
	                name = getFunctionName(binding.implementationType);
	            }
	            registeredBindingsList = registeredBindingsList + "\n " + name;
	            if (binding.constraint.metaData) {
	                registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
	            }
	        });
	    }
	    return registeredBindingsList;
	}
	exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
	function alreadyDependencyChain(request, serviceIdentifier) {
	    if (request.parentRequest === null) {
	        return false;
	    }
	    else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
	        return true;
	    }
	    else {
	        return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
	    }
	}
	function dependencyChainToString(request) {
	    function _createStringArr(req, result) {
	        if (result === void 0) { result = []; }
	        var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
	        result.push(serviceIdentifier);
	        if (req.parentRequest !== null) {
	            return _createStringArr(req.parentRequest, result);
	        }
	        return result;
	    }
	    var stringArr = _createStringArr(request);
	    return stringArr.reverse().join(" --> ");
	}
	function circularDependencyToException(request) {
	    request.childRequests.forEach(function (childRequest) {
	        if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
	            var services = dependencyChainToString(childRequest);
	            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
	        }
	        else {
	            circularDependencyToException(childRequest);
	        }
	    });
	}
	exports.circularDependencyToException = circularDependencyToException;
	function listMetadataForTarget(serviceIdentifierString, target) {
	    if (target.isTagged() || target.isNamed()) {
	        var m_1 = "";
	        var namedTag = target.getNamedTag();
	        var otherTags = target.getCustomTags();
	        if (namedTag !== null) {
	            m_1 += namedTag.toString() + "\n";
	        }
	        if (otherTags !== null) {
	            otherTags.forEach(function (tag) {
	                m_1 += tag.toString() + "\n";
	            });
	        }
	        return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
	    }
	    else {
	        return " " + serviceIdentifierString;
	    }
	}
	exports.listMetadataForTarget = listMetadataForTarget;
	function getFunctionName(v) {
	    if (v.name) {
	        return v.name;
	    }
	    else {
	        var name_1 = v.toString();
	        var match = name_1.match(/^function\s*([^\s(]+)/);
	        return match ? match[1] : "Anonymous function: " + name_1;
	    }
	}
	exports.getFunctionName = getFunctionName;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(19);
	var Context = (function () {
	    function Context(container) {
	        this.guid = guid_1.guid();
	        this.container = container;
	    }
	    Context.prototype.addPlan = function (plan) {
	        this.plan = plan;
	    };
	    Context.prototype.setCurrentRequest = function (currentRequest) {
	        this.currentRequest = currentRequest;
	    };
	    return Context;
	}());
	exports.Context = Context;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var Metadata = (function () {
	    function Metadata(key, value) {
	        this.key = key;
	        this.value = value;
	    }
	    Metadata.prototype.toString = function () {
	        if (this.key === METADATA_KEY.NAMED_TAG) {
	            return "named: " + this.value.toString() + " ";
	        }
	        else {
	            return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
	        }
	    };
	    return Metadata;
	}());
	exports.Metadata = Metadata;


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Plan = (function () {
	    function Plan(parentContext, rootRequest) {
	        this.parentContext = parentContext;
	        this.rootRequest = rootRequest;
	    }
	    return Plan;
	}());
	exports.Plan = Plan;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var inject_1 = __webpack_require__(30);
	var ERROR_MSGS = __webpack_require__(20);
	var literal_types_1 = __webpack_require__(18);
	var METADATA_KEY = __webpack_require__(15);
	var serialization_1 = __webpack_require__(25);
	exports.getFunctionName = serialization_1.getFunctionName;
	var target_1 = __webpack_require__(32);
	function getDependencies(metadataReader, func) {
	    var constructorName = serialization_1.getFunctionName(func);
	    var targets = getTargets(metadataReader, constructorName, func, false);
	    return targets;
	}
	exports.getDependencies = getDependencies;
	function getTargets(metadataReader, constructorName, func, isBaseClass) {
	    var metadata = metadataReader.getConstructorMetadata(func);
	    var serviceIdentifiers = metadata.compilerGeneratedMetadata;
	    if (serviceIdentifiers === undefined) {
	        var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
	        throw new Error(msg);
	    }
	    var constructorArgsMetadata = metadata.userGeneratedMetadata;
	    var keys = Object.keys(constructorArgsMetadata);
	    var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
	    var iterations = (hasUserDeclaredUnknownInjections) ? keys.length : func.length;
	    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
	    var propertyTargets = getClassPropsAsTargets(metadataReader, func);
	    var targets = constructorTargets.concat(propertyTargets);
	    return targets;
	}
	function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
	    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
	    var metadata = formatTargetMetadata(targetMetadata);
	    var isManaged = metadata.unmanaged !== true;
	    var serviceIdentifier = serviceIdentifiers[index];
	    var injectIdentifier = (metadata.inject || metadata.multiInject);
	    serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
	    if (serviceIdentifier instanceof inject_1.LazyServiceIdentifer) {
	        serviceIdentifier = serviceIdentifier.unwrap();
	    }
	    if (isManaged) {
	        var isObject = serviceIdentifier === Object;
	        var isFunction = serviceIdentifier === Function;
	        var isUndefined = serviceIdentifier === undefined;
	        var isUnknownType = (isObject || isFunction || isUndefined);
	        if (!isBaseClass && isUnknownType) {
	            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
	            throw new Error(msg);
	        }
	        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
	        target.metadata = targetMetadata;
	        return target;
	    }
	    return null;
	}
	function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
	    var targets = [];
	    for (var i = 0; i < iterations; i++) {
	        var index = i;
	        var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
	        if (target !== null) {
	            targets.push(target);
	        }
	    }
	    return targets;
	}
	function getClassPropsAsTargets(metadataReader, constructorFunc) {
	    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
	    var targets = [];
	    var keys = Object.keys(classPropsMetadata);
	    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
	        var key = keys_1[_i];
	        var targetMetadata = classPropsMetadata[key];
	        var metadata = formatTargetMetadata(classPropsMetadata[key]);
	        var targetName = metadata.targetName || key;
	        var serviceIdentifier = (metadata.inject || metadata.multiInject);
	        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, targetName, serviceIdentifier);
	        target.metadata = targetMetadata;
	        targets.push(target);
	    }
	    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
	    if (baseConstructor !== Object) {
	        var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
	        targets = targets.concat(baseTargets);
	    }
	    return targets;
	}
	function getBaseClassDependencyCount(metadataReader, func) {
	    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
	    if (baseConstructor !== Object) {
	        var baseConstructorName = serialization_1.getFunctionName(baseConstructor);
	        var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
	        var metadata = targets.map(function (t) {
	            return t.metadata.filter(function (m) {
	                return m.key === METADATA_KEY.UNMANAGED_TAG;
	            });
	        });
	        var unmanagedCount = [].concat.apply([], metadata).length;
	        var dependencyCount = targets.length - unmanagedCount;
	        if (dependencyCount > 0) {
	            return dependencyCount;
	        }
	        else {
	            return getBaseClassDependencyCount(metadataReader, baseConstructor);
	        }
	    }
	    else {
	        return 0;
	    }
	}
	exports.getBaseClassDependencyCount = getBaseClassDependencyCount;
	function formatTargetMetadata(targetMetadata) {
	    var targetMetadataMap = {};
	    targetMetadata.forEach(function (m) {
	        targetMetadataMap[m.key.toString()] = m.value;
	    });
	    return {
	        inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
	        multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
	        targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
	        unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
	    };
	}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var error_msgs_1 = __webpack_require__(20);
	var METADATA_KEY = __webpack_require__(15);
	var metadata_1 = __webpack_require__(27);
	var decorator_utils_1 = __webpack_require__(31);
	var LazyServiceIdentifer = (function () {
	    function LazyServiceIdentifer(cb) {
	        this._cb = cb;
	    }
	    LazyServiceIdentifer.prototype.unwrap = function () {
	        return this._cb();
	    };
	    return LazyServiceIdentifer;
	}());
	exports.LazyServiceIdentifer = LazyServiceIdentifer;
	function inject(serviceIdentifier) {
	    return function (target, targetKey, index) {
	        if (serviceIdentifier === undefined) {
	            throw new Error(error_msgs_1.UNDEFINED_INJECT_ANNOTATION(target.name));
	        }
	        var metadata = new metadata_1.Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.inject = inject;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERROR_MSGS = __webpack_require__(20);
	var METADATA_KEY = __webpack_require__(15);
	function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
	    var metadataKey = METADATA_KEY.TAGGED;
	    _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
	}
	exports.tagParameter = tagParameter;
	function tagProperty(annotationTarget, propertyName, metadata) {
	    var metadataKey = METADATA_KEY.TAGGED_PROP;
	    _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
	}
	exports.tagProperty = tagProperty;
	function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
	    var paramsOrPropertiesMetadata = {};
	    var isParameterDecorator = (typeof parameterIndex === "number");
	    var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
	    if (isParameterDecorator && propertyName !== undefined) {
	        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
	    }
	    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
	        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
	    }
	    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
	    if (!Array.isArray(paramOrPropertyMetadata)) {
	        paramOrPropertyMetadata = [];
	    }
	    else {
	        for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
	            var m = paramOrPropertyMetadata_1[_i];
	            if (m.key === metadata.key) {
	                throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key);
	            }
	        }
	    }
	    paramOrPropertyMetadata.push(metadata);
	    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
	    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
	}
	function _decorate(decorators, target) {
	    Reflect.decorate(decorators, target);
	}
	function _param(paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); };
	}
	function decorate(decorator, target, parameterIndex) {
	    if (typeof parameterIndex === "number") {
	        _decorate([_param(parameterIndex, decorator)], target);
	    }
	    else if (typeof parameterIndex === "string") {
	        Reflect.decorate([decorator], target, parameterIndex);
	    }
	    else {
	        _decorate([decorator], target);
	    }
	}
	exports.decorate = decorate;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var guid_1 = __webpack_require__(19);
	var metadata_1 = __webpack_require__(27);
	var queryable_string_1 = __webpack_require__(33);
	var Target = (function () {
	    function Target(type, name, serviceIdentifier, namedOrTagged) {
	        this.guid = guid_1.guid();
	        this.type = type;
	        this.serviceIdentifier = serviceIdentifier;
	        this.name = new queryable_string_1.QueryableString(name || "");
	        this.metadata = new Array();
	        var metadataItem = null;
	        if (typeof namedOrTagged === "string") {
	            metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
	        }
	        else if (namedOrTagged instanceof metadata_1.Metadata) {
	            metadataItem = namedOrTagged;
	        }
	        if (metadataItem !== null) {
	            this.metadata.push(metadataItem);
	        }
	    }
	    Target.prototype.hasTag = function (key) {
	        for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
	            var m = _a[_i];
	            if (m.key === key) {
	                return true;
	            }
	        }
	        return false;
	    };
	    Target.prototype.isArray = function () {
	        return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
	    };
	    Target.prototype.matchesArray = function (name) {
	        return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
	    };
	    Target.prototype.isNamed = function () {
	        return this.hasTag(METADATA_KEY.NAMED_TAG);
	    };
	    Target.prototype.isTagged = function () {
	        return this.metadata.some(function (m) {
	            return (m.key !== METADATA_KEY.INJECT_TAG) &&
	                (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
	                (m.key !== METADATA_KEY.NAME_TAG) &&
	                (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
	                (m.key !== METADATA_KEY.NAMED_TAG);
	        });
	    };
	    Target.prototype.isOptional = function () {
	        return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
	    };
	    Target.prototype.getNamedTag = function () {
	        if (this.isNamed()) {
	            return this.metadata.filter(function (m) { return m.key === METADATA_KEY.NAMED_TAG; })[0];
	        }
	        return null;
	    };
	    Target.prototype.getCustomTags = function () {
	        if (this.isTagged()) {
	            return this.metadata.filter(function (m) {
	                return (m.key !== METADATA_KEY.INJECT_TAG) &&
	                    (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
	                    (m.key !== METADATA_KEY.NAME_TAG) &&
	                    (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
	                    (m.key !== METADATA_KEY.NAMED_TAG);
	            });
	        }
	        return null;
	    };
	    Target.prototype.matchesNamedTag = function (name) {
	        return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
	    };
	    Target.prototype.matchesTag = function (key) {
	        var _this = this;
	        return function (value) {
	            for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
	                var m = _a[_i];
	                if (m.key === key && m.value === value) {
	                    return true;
	                }
	            }
	            return false;
	        };
	    };
	    return Target;
	}());
	exports.Target = Target;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var QueryableString = (function () {
	    function QueryableString(str) {
	        this.str = str;
	    }
	    QueryableString.prototype.startsWith = function (searchString) {
	        return this.str.indexOf(searchString) === 0;
	    };
	    QueryableString.prototype.endsWith = function (searchString) {
	        var reverseString = "";
	        var reverseSearchString = searchString.split("").reverse().join("");
	        reverseString = this.str.split("").reverse().join("");
	        return this.startsWith.call({ str: reverseString }, reverseSearchString);
	    };
	    QueryableString.prototype.contains = function (searchString) {
	        return (this.str.indexOf(searchString) !== -1);
	    };
	    QueryableString.prototype.equals = function (compareString) {
	        return this.str === compareString;
	    };
	    QueryableString.prototype.value = function () {
	        return this.str;
	    };
	    return QueryableString;
	}());
	exports.QueryableString = QueryableString;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(19);
	var Request = (function () {
	    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
	        this.guid = guid_1.guid();
	        this.serviceIdentifier = serviceIdentifier;
	        this.parentContext = parentContext;
	        this.parentRequest = parentRequest;
	        this.target = target;
	        this.childRequests = [];
	        this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
	        this.requestScope = parentRequest === null
	            ? new Map()
	            : null;
	    }
	    Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
	        var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
	        this.childRequests.push(child);
	        return child;
	    };
	    return Request;
	}());
	exports.Request = Request;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERROR_MSGS = __webpack_require__(20);
	var literal_types_1 = __webpack_require__(18);
	var exceptions_1 = __webpack_require__(24);
	var serialization_1 = __webpack_require__(25);
	var instantiation_1 = __webpack_require__(36);
	var invokeFactory = function (factoryType, serviceIdentifier, fn) {
	    try {
	        return fn();
	    }
	    catch (error) {
	        if (exceptions_1.isStackOverflowExeption(error)) {
	            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
	        }
	        else {
	            throw error;
	        }
	    }
	};
	var _resolveRequest = function (requestScope) {
	    return function (request) {
	        request.parentContext.setCurrentRequest(request);
	        var bindings = request.bindings;
	        var childRequests = request.childRequests;
	        var targetIsAnArray = request.target && request.target.isArray();
	        var targetParentIsNotAnArray = !request.parentRequest ||
	            !request.parentRequest.target ||
	            !request.target ||
	            !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
	        if (targetIsAnArray && targetParentIsNotAnArray) {
	            return childRequests.map(function (childRequest) {
	                var _f = _resolveRequest(requestScope);
	                return _f(childRequest);
	            });
	        }
	        else {
	            var result = null;
	            if (request.target.isOptional() && bindings.length === 0) {
	                return undefined;
	            }
	            var binding_1 = bindings[0];
	            var isSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Singleton;
	            var isRequestSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Request;
	            if (isSingleton && binding_1.activated) {
	                return binding_1.cache;
	            }
	            if (isRequestSingleton &&
	                requestScope !== null &&
	                requestScope.has(binding_1.guid)) {
	                return requestScope.get(binding_1.guid);
	            }
	            if (binding_1.type === literal_types_1.BindingTypeEnum.ConstantValue) {
	                result = binding_1.cache;
	            }
	            else if (binding_1.type === literal_types_1.BindingTypeEnum.Function) {
	                result = binding_1.cache;
	            }
	            else if (binding_1.type === literal_types_1.BindingTypeEnum.Constructor) {
	                result = binding_1.implementationType;
	            }
	            else if (binding_1.type === literal_types_1.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
	                result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function () { return binding_1.dynamicValue(request.parentContext); });
	            }
	            else if (binding_1.type === literal_types_1.BindingTypeEnum.Factory && binding_1.factory !== null) {
	                result = invokeFactory("toFactory", binding_1.serviceIdentifier, function () { return binding_1.factory(request.parentContext); });
	            }
	            else if (binding_1.type === literal_types_1.BindingTypeEnum.Provider && binding_1.provider !== null) {
	                result = invokeFactory("toProvider", binding_1.serviceIdentifier, function () { return binding_1.provider(request.parentContext); });
	            }
	            else if (binding_1.type === literal_types_1.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
	                result = instantiation_1.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
	            }
	            else {
	                var serviceIdentifier = serialization_1.getServiceIdentifierAsString(request.serviceIdentifier);
	                throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
	            }
	            if (typeof binding_1.onActivation === "function") {
	                result = binding_1.onActivation(request.parentContext, result);
	            }
	            if (isSingleton) {
	                binding_1.cache = result;
	                binding_1.activated = true;
	            }
	            if (isRequestSingleton &&
	                requestScope !== null &&
	                !requestScope.has(binding_1.guid)) {
	                requestScope.set(binding_1.guid, result);
	            }
	            return result;
	        }
	    };
	};
	function resolve(context) {
	    var _f = _resolveRequest(context.plan.rootRequest.requestScope);
	    return _f(context.plan.rootRequest);
	}
	exports.resolve = resolve;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var error_msgs_1 = __webpack_require__(20);
	var literal_types_1 = __webpack_require__(18);
	var METADATA_KEY = __webpack_require__(15);
	function _injectProperties(instance, childRequests, resolveRequest) {
	    var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
	        return (childRequest.target !== null &&
	            childRequest.target.type === literal_types_1.TargetTypeEnum.ClassProperty);
	    });
	    var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
	    propertyInjectionsRequests.forEach(function (r, index) {
	        var propertyName = "";
	        propertyName = r.target.name.value();
	        var injection = propertyInjections[index];
	        instance[propertyName] = injection;
	    });
	    return instance;
	}
	function _createInstance(Func, injections) {
	    return new (Func.bind.apply(Func, [void 0].concat(injections)))();
	}
	function _postConstruct(constr, result) {
	    if (Reflect.hasMetadata(METADATA_KEY.POST_CONSTRUCT, constr)) {
	        var data = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, constr);
	        try {
	            result[data.value]();
	        }
	        catch (e) {
	            throw new Error(error_msgs_1.POST_CONSTRUCT_ERROR(constr.name, e.message));
	        }
	    }
	}
	function resolveInstance(constr, childRequests, resolveRequest) {
	    var result = null;
	    if (childRequests.length > 0) {
	        var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
	            return (childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ConstructorArgument);
	        });
	        var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
	        result = _createInstance(constr, constructorInjections);
	        result = _injectProperties(result, childRequests, resolveRequest);
	    }
	    else {
	        result = new constr();
	    }
	    _postConstruct(constr, result);
	    return result;
	}
	exports.resolveInstance = resolveInstance;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERROR_MSGS = __webpack_require__(20);
	var literal_types_1 = __webpack_require__(18);
	var binding_in_when_on_syntax_1 = __webpack_require__(38);
	var binding_when_on_syntax_1 = __webpack_require__(40);
	var BindingToSyntax = (function () {
	    function BindingToSyntax(binding) {
	        this._binding = binding;
	    }
	    BindingToSyntax.prototype.to = function (constructor) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Instance;
	        this._binding.implementationType = constructor;
	        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toSelf = function () {
	        if (typeof this._binding.serviceIdentifier !== "function") {
	            throw new Error("" + ERROR_MSGS.INVALID_TO_SELF_VALUE);
	        }
	        var self = this._binding.serviceIdentifier;
	        return this.to(self);
	    };
	    BindingToSyntax.prototype.toConstantValue = function (value) {
	        this._binding.type = literal_types_1.BindingTypeEnum.ConstantValue;
	        this._binding.cache = value;
	        this._binding.dynamicValue = null;
	        this._binding.implementationType = null;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toDynamicValue = function (func) {
	        this._binding.type = literal_types_1.BindingTypeEnum.DynamicValue;
	        this._binding.cache = null;
	        this._binding.dynamicValue = func;
	        this._binding.implementationType = null;
	        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toConstructor = function (constructor) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Constructor;
	        this._binding.implementationType = constructor;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toFactory = function (factory) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
	        this._binding.factory = factory;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toFunction = function (func) {
	        if (typeof func !== "function") {
	            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
	        }
	        var bindingWhenOnSyntax = this.toConstantValue(func);
	        this._binding.type = literal_types_1.BindingTypeEnum.Function;
	        return bindingWhenOnSyntax;
	    };
	    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
	        this._binding.factory = function (context) {
	            var autofactory = function () { return context.container.get(serviceIdentifier); };
	            return autofactory;
	        };
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toProvider = function (provider) {
	        this._binding.type = literal_types_1.BindingTypeEnum.Provider;
	        this._binding.provider = provider;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingToSyntax.prototype.toService = function (service) {
	        this.toDynamicValue(function (context) { return context.container.get(service); });
	    };
	    return BindingToSyntax;
	}());
	exports.BindingToSyntax = BindingToSyntax;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_in_syntax_1 = __webpack_require__(39);
	var binding_on_syntax_1 = __webpack_require__(41);
	var binding_when_syntax_1 = __webpack_require__(42);
	var BindingInWhenOnSyntax = (function () {
	    function BindingInWhenOnSyntax(binding) {
	        this._binding = binding;
	        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
	        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
	        this._bindingInSyntax = new binding_in_syntax_1.BindingInSyntax(binding);
	    }
	    BindingInWhenOnSyntax.prototype.inRequestScope = function () {
	        return this._bindingInSyntax.inRequestScope();
	    };
	    BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
	        return this._bindingInSyntax.inSingletonScope();
	    };
	    BindingInWhenOnSyntax.prototype.inTransientScope = function () {
	        return this._bindingInSyntax.inTransientScope();
	    };
	    BindingInWhenOnSyntax.prototype.when = function (constraint) {
	        return this._bindingWhenSyntax.when(constraint);
	    };
	    BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
	        return this._bindingWhenSyntax.whenTargetNamed(name);
	    };
	    BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
	        return this._bindingWhenSyntax.whenTargetIsDefault();
	    };
	    BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
	    };
	    BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
	        return this._bindingWhenSyntax.whenInjectedInto(parent);
	    };
	    BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
	        return this._bindingWhenSyntax.whenParentNamed(name);
	    };
	    BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenParentTagged(tag, value);
	    };
	    BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
	        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
	    };
	    BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
	        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
	    };
	    BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
	        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
	    };
	    BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
	    };
	    BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
	        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
	    };
	    BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
	    };
	    BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
	        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
	    };
	    BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
	        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
	    };
	    BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
	        return this._bindingOnSyntax.onActivation(handler);
	    };
	    return BindingInWhenOnSyntax;
	}());
	exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var literal_types_1 = __webpack_require__(18);
	var binding_when_on_syntax_1 = __webpack_require__(40);
	var BindingInSyntax = (function () {
	    function BindingInSyntax(binding) {
	        this._binding = binding;
	    }
	    BindingInSyntax.prototype.inRequestScope = function () {
	        this._binding.scope = literal_types_1.BindingScopeEnum.Request;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingInSyntax.prototype.inSingletonScope = function () {
	        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    BindingInSyntax.prototype.inTransientScope = function () {
	        this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
	        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
	    };
	    return BindingInSyntax;
	}());
	exports.BindingInSyntax = BindingInSyntax;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_on_syntax_1 = __webpack_require__(41);
	var binding_when_syntax_1 = __webpack_require__(42);
	var BindingWhenOnSyntax = (function () {
	    function BindingWhenOnSyntax(binding) {
	        this._binding = binding;
	        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
	        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    }
	    BindingWhenOnSyntax.prototype.when = function (constraint) {
	        return this._bindingWhenSyntax.when(constraint);
	    };
	    BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
	        return this._bindingWhenSyntax.whenTargetNamed(name);
	    };
	    BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
	        return this._bindingWhenSyntax.whenTargetIsDefault();
	    };
	    BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
	    };
	    BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
	        return this._bindingWhenSyntax.whenInjectedInto(parent);
	    };
	    BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
	        return this._bindingWhenSyntax.whenParentNamed(name);
	    };
	    BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenParentTagged(tag, value);
	    };
	    BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
	        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
	    };
	    BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
	        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
	    };
	    BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
	        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
	    };
	    BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
	    };
	    BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
	        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
	    };
	    BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
	        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
	    };
	    BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
	        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
	    };
	    BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
	        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
	    };
	    BindingWhenOnSyntax.prototype.onActivation = function (handler) {
	        return this._bindingOnSyntax.onActivation(handler);
	    };
	    return BindingWhenOnSyntax;
	}());
	exports.BindingWhenOnSyntax = BindingWhenOnSyntax;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_when_syntax_1 = __webpack_require__(42);
	var BindingOnSyntax = (function () {
	    function BindingOnSyntax(binding) {
	        this._binding = binding;
	    }
	    BindingOnSyntax.prototype.onActivation = function (handler) {
	        this._binding.onActivation = handler;
	        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
	    };
	    return BindingOnSyntax;
	}());
	exports.BindingOnSyntax = BindingOnSyntax;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var binding_on_syntax_1 = __webpack_require__(41);
	var constraint_helpers_1 = __webpack_require__(43);
	var BindingWhenSyntax = (function () {
	    function BindingWhenSyntax(binding) {
	        this._binding = binding;
	    }
	    BindingWhenSyntax.prototype.when = function (constraint) {
	        this._binding.constraint = constraint;
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
	        this._binding.constraint = constraint_helpers_1.namedConstraint(name);
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
	        this._binding.constraint = function (request) {
	            var targetIsDefault = (request.target !== null) &&
	                (!request.target.isNamed()) &&
	                (!request.target.isTagged());
	            return targetIsDefault;
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
	        this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
	        this._binding.constraint = function (request) {
	            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
	        this._binding.constraint = function (request) {
	            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
	        this._binding.constraint = function (request) {
	            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
	        this._binding.constraint = function (request) {
	            return constraint_helpers_1.traverseAncerstors(request, constraint);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
	        this._binding.constraint = function (request) {
	            return !constraint_helpers_1.traverseAncerstors(request, constraint);
	        };
	        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
	    };
	    return BindingWhenSyntax;
	}());
	exports.BindingWhenSyntax = BindingWhenSyntax;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var metadata_1 = __webpack_require__(27);
	var traverseAncerstors = function (request, constraint) {
	    var parent = request.parentRequest;
	    if (parent !== null) {
	        return constraint(parent) ? true : traverseAncerstors(parent, constraint);
	    }
	    else {
	        return false;
	    }
	};
	exports.traverseAncerstors = traverseAncerstors;
	var taggedConstraint = function (key) { return function (value) {
	    var constraint = function (request) {
	        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
	    };
	    constraint.metaData = new metadata_1.Metadata(key, value);
	    return constraint;
	}; };
	exports.taggedConstraint = taggedConstraint;
	var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
	exports.namedConstraint = namedConstraint;
	var typeConstraint = function (type) { return function (request) {
	    var binding = null;
	    if (request !== null) {
	        binding = request.bindings[0];
	        if (typeof type === "string") {
	            var serviceIdentifier = binding.serviceIdentifier;
	            return serviceIdentifier === type;
	        }
	        else {
	            var constructor = request.bindings[0].implementationType;
	            return type === constructor;
	        }
	    }
	    return false;
	}; };
	exports.typeConstraint = typeConstraint;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ContainerSnapshot = (function () {
	    function ContainerSnapshot() {
	    }
	    ContainerSnapshot.of = function (bindings, middleware) {
	        var snapshot = new ContainerSnapshot();
	        snapshot.bindings = bindings;
	        snapshot.middleware = middleware;
	        return snapshot;
	    };
	    return ContainerSnapshot;
	}());
	exports.ContainerSnapshot = ContainerSnapshot;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERROR_MSGS = __webpack_require__(20);
	var Lookup = (function () {
	    function Lookup() {
	        this._map = new Map();
	    }
	    Lookup.prototype.getMap = function () {
	        return this._map;
	    };
	    Lookup.prototype.add = function (serviceIdentifier, value) {
	        if (serviceIdentifier === null || serviceIdentifier === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        if (value === null || value === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        var entry = this._map.get(serviceIdentifier);
	        if (entry !== undefined) {
	            entry.push(value);
	            this._map.set(serviceIdentifier, entry);
	        }
	        else {
	            this._map.set(serviceIdentifier, [value]);
	        }
	    };
	    Lookup.prototype.get = function (serviceIdentifier) {
	        if (serviceIdentifier === null || serviceIdentifier === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        var entry = this._map.get(serviceIdentifier);
	        if (entry !== undefined) {
	            return entry;
	        }
	        else {
	            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
	        }
	    };
	    Lookup.prototype.remove = function (serviceIdentifier) {
	        if (serviceIdentifier === null || serviceIdentifier === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        if (!this._map.delete(serviceIdentifier)) {
	            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
	        }
	    };
	    Lookup.prototype.removeByCondition = function (condition) {
	        var _this = this;
	        this._map.forEach(function (entries, key) {
	            var updatedEntries = entries.filter(function (entry) { return !condition(entry); });
	            if (updatedEntries.length > 0) {
	                _this._map.set(key, updatedEntries);
	            }
	            else {
	                _this._map.delete(key);
	            }
	        });
	    };
	    Lookup.prototype.hasKey = function (serviceIdentifier) {
	        if (serviceIdentifier === null || serviceIdentifier === undefined) {
	            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
	        }
	        return this._map.has(serviceIdentifier);
	    };
	    Lookup.prototype.clone = function () {
	        var copy = new Lookup();
	        this._map.forEach(function (value, key) {
	            value.forEach(function (b) { return copy.add(key, b.clone()); });
	        });
	        return copy;
	    };
	    Lookup.prototype.traverse = function (func) {
	        this._map.forEach(function (value, key) {
	            func(key, value);
	        });
	    };
	    return Lookup;
	}());
	exports.Lookup = Lookup;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(19);
	var ContainerModule = (function () {
	    function ContainerModule(registry) {
	        this.guid = guid_1.guid();
	        this.registry = registry;
	    }
	    return ContainerModule;
	}());
	exports.ContainerModule = ContainerModule;
	var AsyncContainerModule = (function () {
	    function AsyncContainerModule(registry) {
	        this.guid = guid_1.guid();
	        this.registry = registry;
	    }
	    return AsyncContainerModule;
	}());
	exports.AsyncContainerModule = AsyncContainerModule;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERRORS_MSGS = __webpack_require__(20);
	var METADATA_KEY = __webpack_require__(15);
	function injectable() {
	    return function (target) {
	        if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
	            throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
	        }
	        var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
	        Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
	        return target;
	    };
	}
	exports.injectable = injectable;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var metadata_1 = __webpack_require__(27);
	var decorator_utils_1 = __webpack_require__(31);
	function tagged(metadataKey, metadataValue) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.tagged = tagged;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var metadata_1 = __webpack_require__(27);
	var decorator_utils_1 = __webpack_require__(31);
	function named(name) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, name);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.named = named;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var metadata_1 = __webpack_require__(27);
	var decorator_utils_1 = __webpack_require__(31);
	function optional() {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.OPTIONAL_TAG, true);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.optional = optional;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var metadata_1 = __webpack_require__(27);
	var decorator_utils_1 = __webpack_require__(31);
	function unmanaged() {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
	        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	    };
	}
	exports.unmanaged = unmanaged;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var metadata_1 = __webpack_require__(27);
	var decorator_utils_1 = __webpack_require__(31);
	function multiInject(serviceIdentifier) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
	        if (typeof index === "number") {
	            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	        }
	        else {
	            decorator_utils_1.tagProperty(target, targetKey, metadata);
	        }
	    };
	}
	exports.multiInject = multiInject;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var METADATA_KEY = __webpack_require__(15);
	var metadata_1 = __webpack_require__(27);
	var decorator_utils_1 = __webpack_require__(31);
	function targetName(name) {
	    return function (target, targetKey, index) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.NAME_TAG, name);
	        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
	    };
	}
	exports.targetName = targetName;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ERRORS_MSGS = __webpack_require__(20);
	var METADATA_KEY = __webpack_require__(15);
	var metadata_1 = __webpack_require__(27);
	function postConstruct() {
	    return function (target, propertyKey, descriptor) {
	        var metadata = new metadata_1.Metadata(METADATA_KEY.POST_CONSTRUCT, propertyKey);
	        if (Reflect.hasOwnMetadata(METADATA_KEY.POST_CONSTRUCT, target.constructor)) {
	            throw new Error(ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
	        }
	        Reflect.defineMetadata(METADATA_KEY.POST_CONSTRUCT, metadata, target.constructor);
	    };
	}
	exports.postConstruct = postConstruct;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.multiBindToService = function (container) {
	    return function (service) {
	        return function () {
	            var types = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                types[_i] = arguments[_i];
	            }
	            return types.forEach(function (t) { return container.bind(t).toService(service); });
	        };
	    };
	};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var EventManager = (function () {
	    /**
	     * EventManager class constructor.
	     * @class EventManager
	     * @ignore
	     * @classdesc Class that implements all local event management.
	     */
	    function EventManager() {
	        this.eventSubscribers = [];
	    }
	    /**
	     * Subscribes the caller to a local event type.
	     * @method EventManager#subscribeToLocalEvent
	     * @param {string} eventType - The type of event to subscribe to
	     * @param {Function} handler - The callback
	     */
	    EventManager.prototype.subscribeToLocalEvent = function (eventType, handler) {
	        this.eventSubscribers.push({
	            eventType: eventType,
	            handler: handler,
	        });
	    };
	    /**
	     * Checks for an event subscriptionfor a local event type.
	     * @method EventManager#isSubscribedToLocalEvent
	     * @param {string} eventType - The type of event to check
	     */
	    EventManager.prototype.isSubscribedToLocalEvent = function (eventType) {
	        var isSubscribed = false;
	        for (var _i = 0, _a = this.eventSubscribers; _i < _a.length; _i++) {
	            var subscriber = _a[_i];
	            if (subscriber.eventType === eventType) {
	                isSubscribed = true;
	                break;
	            }
	        }
	        return isSubscribed;
	    };
	    /**
	     * Removes a subscription for a local event type.
	     * @method EventManager#unsubscribeFromLocalEvent
	     * @param {string} eventType - The type of event to subscribe to
	     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
	     */
	    EventManager.prototype.unsubscribeFromLocalEvent = function (eventType, handler) {
	        for (var i = this.eventSubscribers.length - 1; i >= 0; i--) {
	            var subscriber = this.eventSubscribers[i];
	            if (handler) {
	                // looking for a single handler                
	                if (subscriber.handler === handler && subscriber.eventType === eventType) {
	                    this.eventSubscribers.splice(i, 1);
	                    break;
	                }
	            }
	            else {
	                // remove ANY subscribing to `eventType`
	                if (subscriber.eventType === eventType) {
	                    this.eventSubscribers.splice(i, 1);
	                }
	            }
	        }
	    };
	    /**
	     * Publishes a LocalEvent.
	     * @method EventManager#publishLocalEvent
	     * @param {string} eventType - The type of event to publish
	     * @param {Object} data - The data associated with the event
	     */
	    EventManager.prototype.publishLocalEvent = function (eventType, data) {
	        var _this = this;
	        setTimeout(function () {
	            for (var _i = 0, _a = _this.eventSubscribers; _i < _a.length; _i++) {
	                var subscriber = _a[_i];
	                if (subscriber.eventType === eventType) {
	                    // call the handler
	                    // TODO: configurably wrap this ...
	                    // try {
	                    subscriber.handler(data);
	                    // } catch (e) {
	                    //    console.error("caught exception publishing event: " + e);
	                    // }
	                }
	            }
	        });
	    };
	    return EventManager;
	}());
	EventManager = __decorate([
	    inversify_1.injectable(),
	    __metadata("design:paramtypes", [])
	], EventManager);
	exports.EventManager = EventManager;
	//# sourceMappingURL=eventManager.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var LocalStorageData = (function () {
	    /**
	     * LocalStorageData class constructor.
	     * @class LocalStorageData
	     * @ignore
	     * @classdesc Class that implements Local storage access.
	     * @param  {string} [prefix]
	     */
	    function LocalStorageData(_comapiConfig) {
	        this._comapiConfig = _comapiConfig;
	        if (_comapiConfig && _comapiConfig.localStoragePrefix) {
	            this._prefix = _comapiConfig.localStoragePrefix;
	        }
	        else {
	            this._prefix = "comapi.";
	        }
	    }
	    Object.defineProperty(LocalStorageData.prototype, "prefix", {
	        /**
	         * Setter to set the prefix
	         * @method LocalStorageData#prefix
	         * @param {string} prefix - the prefix
	         */
	        set: function (prefix) {
	            this._prefix = prefix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Get raw value as string from local storage.
	     * @method LocalStorageData#getString
	     * @param {String} key - the key
	     * @returns (String) - the raw string value
	     */
	    LocalStorageData.prototype.getString = function (key) {
	        return Promise.resolve(localStorage.getItem(this._prefix + key));
	    };
	    /**
	     * Set raw value as string to local storage.
	     * @method LocalStorageData#setString
	     * @param {String} key - the key
	     * @param {String} value - the value
	     */
	    LocalStorageData.prototype.setString = function (key, value) {
	        localStorage.setItem(this._prefix + key, value);
	        return Promise.resolve(true);
	    };
	    /**
	     * Get value as object .
	     * @method LocalStorageData#getObject
	     * @param  {string} key
	     * @returns {Object} - the value Object
	     */
	    LocalStorageData.prototype.getObject = function (key) {
	        return this.getString(key)
	            .then(function (raw) {
	            var obj = null;
	            try {
	                obj = JSON.parse(raw);
	            }
	            catch (e) {
	                console.error("caught exception in LocalStorageData.get(" + key + "): " + e);
	            }
	            return Promise.resolve(obj);
	        });
	    };
	    /**
	     * Set value as object.
	     * @method LocalStorageData#setObject
	     * @param  {string} key
	     * @param  {Object} data
	     * @returns {boolean} - returns boolean value representing success
	     */
	    LocalStorageData.prototype.setObject = function (key, data) {
	        var succeeded = true;
	        try {
	            var stringified = JSON.stringify(data);
	            this.setString(key, stringified);
	        }
	        catch (e) {
	            console.log("caught exception in LocalStorageData.set(" + key + "): " + e);
	            succeeded = false;
	        }
	        return Promise.resolve(succeeded);
	    };
	    /**
	     * Remove a value from local storage.
	     * @method LocalStorageData#remove
	     * @param  {string} key
	     */
	    LocalStorageData.prototype.remove = function (key) {
	        try {
	            localStorage.removeItem(this._prefix + key);
	        }
	        catch (e) {
	            console.error("caught exception in LocalStorageData.remove(" + key + "): " + e);
	        }
	        return Promise.resolve(true);
	    };
	    return LocalStorageData;
	}());
	LocalStorageData = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object])
	], LocalStorageData);
	exports.LocalStorageData = LocalStorageData;
	//# sourceMappingURL=localStorageData.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaces_1 = __webpack_require__(3);
	var indexedDBLogger_1 = __webpack_require__(59);
	var interfaceSymbols_1 = __webpack_require__(10);
	var Logger = (function () {
	    /**
	     * Logger class constructor.
	     * @class Logger
	     * @ignore
	     * @classdesc Class that implements all the Logger functionality.
	     * @param {IEventManager} [eventManager] - event manager interface - for publishing log events
	     * @param {ILocalStorageData} [localStorageData] - local storage interface  - for publishing log events
	     * @param {IndexedDB} [indexedDB] - indexedDB interface - assumed to be open and ready to go
	     */
	    function Logger(_eventManager, _localStorageData, _indexedDB) {
	        this._eventManager = _eventManager;
	        this._localStorageData = _localStorageData;
	        this._indexedDB = _indexedDB;
	        this._logLevel = interfaces_1.LogLevels.Debug;
	        // used as an id to identify each "session" - it will change on page reload and if 2 windows are open you can identify each log entry for diagnostics
	        this._uid = ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
	        this._maxLocalStorageLogSize = 1024;
	        this._localStorageKey = "rollingLogfile";
	    }
	    Object.defineProperty(Logger.prototype, "logLevel", {
	        /**
	         * Getter to get the log level
	         * @method Logger#logLevel
	         * @returns {LogLevels} - returns the current log level
	         */
	        get: function () {
	            return this._logLevel;
	        },
	        /**
	         * Setter to set the log level
	         * @method Logger#logLevel
	         * @param {LogLevels} theLogLevel - the log level
	         */
	        set: function (theLogLevel) {
	            this._logLevel = theLogLevel;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Write custon content to the diagnostic log of type info.
	     * @method Logger#log
	     * @param  {String} message
	     * @param  {Object} [data]
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.log = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Debug, message, data);
	    };
	    /**
	     * Write custon content to the diagnostic log of type warning.
	     * @method Logger#warn
	     * @param  {String} message
	     * @param  {Object} [data]
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.warn = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Warn, message, data);
	    };
	    /**
	     * Write custon content to the diagnostic log of type error.
	     * @method Logger#error
	     * @param  {String} message
	     * @param  {Object} [data]
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.error = function (message, data) {
	        return this._log(interfaces_1.LogLevels.Error, message, data);
	    };
	    /**
	     * Method to get the current logfile
	     * @method Logger#getLog
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.getLog = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._indexedDB) {
	                _this._indexedDB.getData().then(function (data) {
	                    resolve(JSON.stringify(data));
	                }).catch(function (error) {
	                    reject(error);
	                });
	            }
	            else if (_this._localStorageData) {
	                resolve(_this._localStorageData.getString(_this._localStorageKey));
	            }
	            else {
	                reject({ message: "No logfile to get" });
	            }
	        });
	    };
	    /**
	     * Method to clear the current logfile.
	     * @method Logger#clearLog
	     * @returns {Promise} - returns promise
	     */
	    Logger.prototype.clearLog = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._indexedDB) {
	                _this._indexedDB.clearData().then(function () {
	                    resolve(true);
	                })
	                    .catch(function (error) {
	                    reject(error);
	                });
	            }
	            else if (_this._localStorageData) {
	                _this._localStorageData.remove(_this._localStorageKey);
	                resolve(true);
	            }
	            else {
	                reject({ message: "No logfile to clear" });
	            }
	        });
	    };
	    /**
	     * Private method to get a string representation of a log level
	     * @param {LogLevels} level
	     * @returns {String}
	     */
	    Logger.prototype._stringForLogLevel = function (level) {
	        switch (level) {
	            case interfaces_1.LogLevels.Debug:
	                return "Debug";
	            case interfaces_1.LogLevels.Warn:
	                return "Warning";
	            case interfaces_1.LogLevels.Error:
	                return "Error";
	            default:
	                return "?";
	        }
	    };
	    /**
	     * Private method to log a message
	     * @param  {LogLevels} level
	     * @param  {string} message
	     * @param  {Object} [data]
	     * @returns Promise
	     */
	    Logger.prototype._log = function (level, message, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (level <= _this._logLevel) {
	                var formattedMessage_1 = "[" + _this._uid + "] : " + new Date().toJSON() + " ["
	                    + _this._stringForLogLevel(level) + "] : " + message + (data !== undefined ? (" : "
	                    + JSON.stringify(data)) : "") + "\r\n";
	                switch (level) {
	                    case interfaces_1.LogLevels.Error:
	                        console.error(formattedMessage_1);
	                        break;
	                    case interfaces_1.LogLevels.Warn:
	                        console.warn(formattedMessage_1);
	                        break;
	                    case interfaces_1.LogLevels.Debug:
	                        console.log(formattedMessage_1);
	                        break;
	                    default:
	                        break;
	                }
	                var now = new Date();
	                var logEvent = {
	                    created: now.valueOf(),
	                    data: data,
	                    logLevel: level,
	                    message: message,
	                    timestamp: now.toISOString(),
	                };
	                if (_this._indexedDB) {
	                    _this._indexedDB.addRecord(logEvent)
	                        .then(function (index) {
	                        resolve(true);
	                    });
	                }
	                else if (_this._localStorageData) {
	                    // fall back to using local storage
	                    _this._localStorageData.getString(_this._localStorageKey)
	                        .then(function (log) {
	                        if (log !== null) {
	                            log += formattedMessage_1;
	                        }
	                        else {
	                            log = formattedMessage_1;
	                        }
	                        if (log.length > _this._maxLocalStorageLogSize) {
	                            log = log.substring(formattedMessage_1.length);
	                        }
	                        _this._localStorageData.setString(_this._localStorageKey, log)
	                            .then(function () {
	                            resolve(true);
	                        });
	                    });
	                }
	                else {
	                    resolve(true);
	                }
	                if (_this._eventManager) {
	                    _this._eventManager.publishLocalEvent("LogMessage", logEvent);
	                }
	            }
	        });
	    };
	    return Logger;
	}());
	Logger = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.IndexedDBLogger)), __param(2, inversify_1.optional()),
	    __metadata("design:paramtypes", [Object, Object, indexedDBLogger_1.IndexedDBLogger])
	], Logger);
	exports.Logger = Logger;
	//# sourceMappingURL=logger.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var mutex_1 = __webpack_require__(60);
	/*
	 * http://blog.vanamco.com/indexeddb-fundamentals-plus-a-indexeddb-example-tutorial/
	 * http://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673
	 */
	var IndexedDBLogger = (function () {
	    /**
	     * IndexedDBLogger class constructor.
	     * @class IndexedDBLogger
	     * @ignore
	     * @classdesc Class that implements an IndexedDBLogger.
	     * @param {string} name - database name (for overriding in unit tests)
	     */
	    function IndexedDBLogger(_comapiConfig) {
	        this._comapiConfig = _comapiConfig;
	        this.idbSupported = "indexedDB" in window;
	        this._version = 1;
	        this._store = "Logs";
	        this._mutex = new mutex_1.Mutex();
	        this._name = "Comapi";
	    }
	    Object.defineProperty(IndexedDBLogger.prototype, "name", {
	        /**
	         * Setter to set the name
	         * @method IndexedDBLogger#name
	         * @param {string} name - the name
	         */
	        set: function (name) {
	            this._name = name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Removes all records older than specified date
	     * @method IndexedDBLogger#purge
	     * @param {Date} date threshold (messages older than this will be deleted)
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.purge = function (when) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this.ensureInitialised()
	                .then(function (initialised) {
	                return new Promise(function (resolve, reject) {
	                    var transaction = _this._database.transaction([_this._store], "readwrite");
	                    var objectStore = transaction.objectStore(_this._store);
	                    var index = objectStore.index("created");
	                    // we want all keys less than this date
	                    var keyRangeValue = IDBKeyRange.upperBound(when.valueOf());
	                    index.openCursor(keyRangeValue).onsuccess = function (event) {
	                        var cursor = event.target.result;
	                        if (cursor) {
	                            objectStore["delete"](cursor.primaryKey);
	                            cursor["continue"]();
	                        }
	                        else {
	                            // should be all deleted 
	                            resolve(true);
	                        }
	                    };
	                });
	            });
	        }, "purge");
	    };
	    /**
	     * Method to delete a database
	     * @method IndexedDBLogger#deleteDatabase
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.deleteDatabase = function () {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this.ensureInitialised()
	                .then(function (initialised) {
	                return new Promise(function (resolve, reject) {
	                    var req = indexedDB.deleteDatabase(_this._name);
	                    var self = _this;
	                    req.onsuccess = function () {
	                        console.log("Deleted database " + self._name + " successfully");
	                        resolve(true);
	                    };
	                    req.onerror = function (e) {
	                        reject({ message: "Couldn't delete database " + self._name + " : " + e.target.error.name });
	                    };
	                    req.onblocked = function () {
	                        console.warn("Couldn't delete database " + self._name + " due to the operation being blocked");
	                    };
	                });
	            });
	        }, "deleteDatabase");
	    };
	    /**
	     * Method to clear the data in an object store
	     * @method IndexedDBLogger#clearData
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.clearData = function () {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this.ensureInitialised()
	                .then(function (initialised) {
	                return new Promise(function (resolve, reject) {
	                    // open a read/write db transaction, ready for clearing the data
	                    var transaction = _this._database.transaction([_this._store], "readwrite");
	                    transaction.onerror = function (event) {
	                        console.error("Transaction not opened due to error: " + transaction.error);
	                    };
	                    // create an object store on the transaction
	                    var objectStore = transaction.objectStore(_this._store);
	                    // clear all the data out of the object store
	                    var objectStoreRequest = objectStore.clear();
	                    objectStoreRequest.onsuccess = function (event) {
	                        resolve(true);
	                    };
	                    objectStoreRequest.onerror = function (e) {
	                        reject({ message: "Failed to clear object store: " + e.target.error.name });
	                    };
	                });
	            });
	        }, "clearData");
	    };
	    /**
	     * Method to get all or the first n objects in an object store
	     * @method IndexedDBLogger#getData
	     * @param {number} [count] - number of records to query - retrieves all if not specified
	     * @param {boolean} [getIndexes] - whether to add the key into the returned record - doesn'tadd by default
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.getData = function (count, getIndexes) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this.ensureInitialised()
	                .then(function (initialised) {
	                return new Promise(function (resolve, reject) {
	                    var transaction = _this._database.transaction([_this._store], "readonly");
	                    var objectStore = transaction.objectStore(_this._store);
	                    var cursorRequest = objectStore.openCursor();
	                    var numRetrieved = 0;
	                    var data = [];
	                    cursorRequest.onsuccess = function (event) {
	                        var cursor = event.target.result;
	                        numRetrieved++;
	                        if (cursor) {
	                            var record = cursor.value;
	                            if (getIndexes === true) {
	                                record.key = cursor.key;
	                            }
	                            data.push(cursor.value);
	                            if (numRetrieved && numRetrieved >= count) {
	                                resolve(data);
	                            }
	                            else {
	                                cursor.continue();
	                            }
	                        }
	                        else {
	                            resolve(data);
	                        }
	                    };
	                    cursorRequest.onerror = function (e) {
	                        reject({ message: "Failed to openCursor: " + e.target.error.name });
	                    };
	                });
	            });
	        }, "getData");
	    };
	    /**
	     * Method to get the count of objects in the object store
	     * @method IndexedDBLogger#getCount
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.getCount = function () {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this.ensureInitialised()
	                .then(function (initialised) {
	                return new Promise(function (resolve, reject) {
	                    var transaction = _this._database.transaction([_this._store], "readonly");
	                    var objectStore = transaction.objectStore(_this._store);
	                    var count = objectStore.count();
	                    count.onerror = function (e) {
	                        reject({ message: "Failed to get count: " + e.target.error.name });
	                    };
	                    count.onsuccess = function () {
	                        resolve(count.result);
	                    };
	                });
	            });
	        }, "getCount");
	    };
	    /**
	     * Method to close a database connection
	     * @method IndexedDBLogger#closeDatabase
	     */
	    IndexedDBLogger.prototype.closeDatabase = function () {
	        if (this._database) {
	            this._database.close();
	        }
	    };
	    /**
	     * Method to add a record to a previously opened indexed database
	     * @method IndexedDBLogger#addRecord
	     * @param {Object} entity - The entity
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.addRecord = function (entity) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this.ensureInitialised()
	                .then(function (initialised) {
	                return new Promise(function (resolve, reject) {
	                    var transaction = _this._database.transaction([_this._store], "readwrite");
	                    var store = transaction.objectStore(_this._store);
	                    // Perform the add
	                    var request = store.add(entity);
	                    request.onerror = function (e) {
	                        console.error("Error", e.target.error.name);
	                        reject({ message: "add failed: " + e.target.error.name });
	                    };
	                    request.onsuccess = function (e) {
	                        // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
	                        // returns auto incremented id ...
	                        resolve(e.target.result);
	                    };
	                });
	            });
	        }, "addRecord");
	    };
	    /**
	     *
	     */
	    IndexedDBLogger.prototype.ensureInitialised = function () {
	        var _this = this;
	        if (!this._initialised) {
	            // this is a promise instance to ensure it's only called once
	            this._initialised = this.initialise()
	                .then(function (result) {
	                if (_this._comapiConfig) {
	                    var retentionHours = _this._comapiConfig.logRetentionHours === undefined ? 24 : _this._comapiConfig.logRetentionHours;
	                    var purgeDate = new Date((new Date()).valueOf() - 1000 * 60 * 60 * retentionHours);
	                    return _this.purge(purgeDate);
	                }
	                else {
	                    return result;
	                }
	            });
	        }
	        return this._initialised;
	    };
	    /**
	     * Method to open a connection to the database
	     * @method IndexedDBLogger#initialise
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBLogger.prototype.initialise = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.idbSupported) {
	                var self_1 = _this;
	                var openRequest = indexedDB.open(_this._name, _this._version);
	                openRequest.onupgradeneeded = function (e) {
	                    console.log("Upgrading database...");
	                    var thisDB = e.target.result;
	                    if (!thisDB.objectStoreNames.contains(self_1._store)) {
	                        var os = thisDB.createObjectStore(self_1._store, { autoIncrement: true });
	                        os.createIndex("created", "created", { unique: false });
	                    }
	                };
	                openRequest.onsuccess = function (e) {
	                    self_1._database = e.target.result;
	                    resolve(true);
	                };
	                openRequest.onerror = function (e) {
	                    reject({ message: "IndexedDBLogger.open failed : " + e.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "IndexedDBLogger not supported on this platform" });
	            }
	        });
	    };
	    return IndexedDBLogger;
	}());
	IndexedDBLogger = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)), __param(0, inversify_1.optional()),
	    __metadata("design:paramtypes", [Object])
	], IndexedDBLogger);
	exports.IndexedDBLogger = IndexedDBLogger;
	//# sourceMappingURL=indexedDBLogger.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Mutex = (function () {
	    function Mutex() {
	        this._queue = [];
	        this._pending = false;
	    }
	    Mutex.prototype.acquire = function (name) {
	        var _this = this;
	        var ticket = new Promise(function (resolve) { return _this._queue.push({ method: resolve, name: name }); });
	        if (!this._pending) {
	            this._dispatchNext();
	        }
	        return ticket;
	    };
	    Mutex.prototype.runExclusive = function (callback, name) {
	        return this
	            .acquire(name)
	            .then(function (release) {
	            var result;
	            try {
	                result = callback();
	            }
	            catch (e) {
	                release();
	                throw (e);
	            }
	            return Promise
	                .resolve(result)
	                .then(function (x) { return (release(), x); }, function (e) {
	                release();
	                throw e;
	            });
	        });
	    };
	    Mutex.prototype._dispatchNext = function () {
	        if (this._queue.length > 0) {
	            this._pending = true;
	            this._queue.shift().method(this._dispatchNext.bind(this));
	        }
	        else {
	            this._pending = false;
	        }
	    };
	    return Mutex;
	}());
	exports.Mutex = Mutex;
	//# sourceMappingURL=mutex.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var RestClient = (function () {
	    /**
	     * RestClient class constructor.
	     * @class RestClient
	     * @ignore
	     * @classdesc Class that implements a RestClient.
	     * @param {ILogger} [logger] - the logger
	     * @param {INetworkManager} [networkManager] - the network Manager
	     */
	    function RestClient(logger) {
	        this.logger = logger;
	        this._readyStates = [
	            "request not initialized",
	            "server connection established",
	            "request received ",
	            "processing request",
	            "request finished and response is ready"
	        ];
	    }
	    /**
	     * Method to make a GET request
	     * @method RestClient#get
	     * @param  {string} url
	     * @param  {any} [headers]
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.get = function (url, headers) {
	        return this.makeRequest("GET", url, headers);
	    };
	    /**
	     * Method to make a POST request
	     * @method RestClient#post
	     * @param  {string} url
	     * @param  {any} data
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.post = function (url, headers, data) {
	        return this.makeRequest("POST", url, headers, data);
	    };
	    /**
	     * Method to make a PUT request
	     * @method RestClient#put
	     * @param  {string} url
	     * @param  {any} headers
	     * @param  {any} data
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.put = function (url, headers, data) {
	        return this.makeRequest("PUT", url, headers, data);
	    };
	    /**
	     * Method to make a PATCH request
	     * @method RestClient#patch
	     * @param  {string} url
	     * @param  {any} headers
	     * @param  {any} data
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.patch = function (url, headers, data) {
	        return this.makeRequest("PATCH", url, headers, data);
	    };
	    /**
	     * Method to make a DELETE request
	     * @method RestClient#delete
	     * @param  {string} url
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.delete = function (url, headers) {
	        return this.makeRequest("DELETE", url, headers);
	    };
	    /**
	     * @param  {XMLHttpRequest} request
	     * @param  {any} headers
	     */
	    RestClient.prototype.addHeaders = function (request, headers) {
	        for (var prop in headers) {
	            if (headers.hasOwnProperty(prop)) {
	                request.setRequestHeader(prop, headers[prop]);
	            }
	        }
	    };
	    /**
	     *
	     */
	    RestClient.prototype.getResponseHeaders = function (xhr) {
	        var headers = {};
	        var headerStr = xhr.getAllResponseHeaders();
	        if (headerStr) {
	            var headerPairs = headerStr.split("\u000d\u000a");
	            for (var i = 0; i < headerPairs.length; i++) {
	                var headerPair = headerPairs[i];
	                // Can't use split() here because it does the wrong thing
	                // if the header value has the string ": " in it.
	                var index = headerPair.indexOf("\u003a\u0020");
	                if (index > 0) {
	                    var key = headerPair.substring(0, index);
	                    var val = headerPair.substring(index + 2);
	                    headers[key] = val;
	                }
	            }
	        }
	        return headers;
	    };
	    /**
	     *
	     */
	    RestClient.prototype.createCORSRequest = function (method, url) {
	        var xhr = new XMLHttpRequest();
	        if ("withCredentials" in xhr) {
	            // Check if the XMLHttpRequest object has a "withCredentials" property.
	            // "withCredentials" only exists on XMLHTTPRequest2 objects.
	            xhr.open(method, url, true);
	        } /*else if (typeof XDomainRequest != "undefined") {

	                // Otherwise, check if XDomainRequest.
	                // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
	                xhr = new XDomainRequest();
	                xhr.open(method, url);

	            } else {

	                // Otherwise, CORS is not supported by the browser.
	                xhr = null;

	            }*/
	        return xhr;
	    };
	    /**
	     * @param  {string} method (GET,POST,PUT,DELETE)
	     * @param  {string} url
	     * @param  {any} [headers]
	     * @param  {any} [data]
	     * @returns {Promise} - returns a promise
	     */
	    RestClient.prototype.makeRequest = function (method, url, headers, data) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            headers = headers || {};
	            // We want this as a default default ...
	            if (!headers["Content-Type"]) {
	                headers["Content-Type"] = "application/json";
	            }
	            // Edge/IE want to cache requests by default ...
	            /* tslint:disable:no-string-literal */
	            if (!headers["Cache-Control"]) {
	                headers["Cache-Control"] = "no-cache";
	                headers["Pragma"] = "no-cache";
	                headers["If-Modified-Since"] = "Mon, 26 Jul 1997 05:00:00 GMT";
	            }
	            /* tslint:enable:no-string-literal */
	            if (_this.logger) {
	                _this.logger.log(method + "'ing " + url + "  ...");
	            }
	            var xhr = _this.createCORSRequest(method, url);
	            if (_this.logger) {
	                _this.logger.log("Created XMLHttpRequest ...");
	            }
	            if (headers !== undefined) {
	                _this.addHeaders(xhr, headers);
	            }
	            if (_this.logger) {
	                _this.logger.log("added headers", headers);
	            }
	            xhr.onload = function () {
	                if (_this.logger) {
	                    _this.logger.log("xhr.onload", xhr.responseText);
	                }
	                var succeeded = xhr.status >= 200 && xhr.status < 300;
	                var result = {
	                    headers: _this.getResponseHeaders(xhr),
	                    response: undefined,
	                    statusCode: xhr.status,
	                };
	                if (xhr.responseText) {
	                    try {
	                        result.response = JSON.parse(xhr.responseText);
	                        if (_this.logger) {
	                            _this.logger.log(method + "'ing to " + url + " returned this object: ", result.response);
	                        }
	                    }
	                    catch (e) {
	                        result.response = xhr.responseText;
	                        if (_this.logger) {
	                            _this.logger.log(method + "'ing to " + url + " returned this text: " + xhr.responseText);
	                        }
	                    }
	                }
	                if (succeeded) {
	                    resolve(result);
	                }
	                else {
	                    reject(result);
	                }
	            };
	            xhr.onerror = function () {
	                // There was a connection error of some sort
	                if (_this.logger) {
	                    _this.logger.log("xhr.onerror", xhr.responseText);
	                }
	                if (_this.logger) {
	                    _this.logger.error(method + "'ing to " + url + " failed");
	                }
	                var result = {
	                    headers: _this.getResponseHeaders(xhr),
	                    response: xhr.responseText,
	                    statusCode: xhr.status,
	                };
	                reject(result);
	            };
	            xhr.onreadystatechange = function (evt) {
	                if (_this.logger) {
	                    _this.logger.log("onreadystatechange: " + _this._readyStates[xhr.readyState] + " [status=" + xhr.status + "]");
	                }
	            };
	            xhr.onabort = function (evt) {
	                if (_this.logger) {
	                    _this.logger.log("onabort", evt);
	                }
	            };
	            xhr.send(data ? JSON.stringify(data) : null);
	            if (_this.logger) {
	                _this.logger.log("send data", data);
	            }
	        });
	    };
	    return RestClient;
	}());
	RestClient = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)), __param(0, inversify_1.optional()),
	    __metadata("design:paramtypes", [Object])
	], RestClient);
	exports.RestClient = RestClient;
	//# sourceMappingURL=restClient.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var AuthenticatedRestClient = (function () {
	    /**
	     * AuthenticatedRestClient class constructor.
	     * @class AuthenticatedRestClient
	     * @ignore
	     * @classdesc Class that implements an Authenticated RestClient.
	     * @param {ILogger} logger - the logger
	     * @param {IRestClient} restClient - the restClient
	     * @param {INetworkManager} networkManager - the Network Manager
	     */
	    function AuthenticatedRestClient(logger, restClient, networkManager) {
	        this.logger = logger;
	        this.restClient = restClient;
	        this.networkManager = networkManager;
	        this.retryCount = 3;
	    }
	    /**
	     * Method to make a GET request
	     * @method AuthenticatedRestClient#get
	     * @param  {string} url
	     * @param  {any} [headers]
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.get = function (url, headers) {
	        var _this = this;
	        headers = headers || {};
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.get.bind(_this.restClient), url, headers);
	        });
	    };
	    /**
	     * Method to make a POST request
	     * @method AuthenticatedRestClient#post
	     * @param  {string} url
	     * @param  {any} data
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.post = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.post.bind(_this.restClient), url, headers, data);
	        });
	    };
	    /**
	     * Method to make a PATCH request
	     * @method AuthenticatedRestClient#patch
	     * @param  {string} url
	     * @param  {any} data
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.patch = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.patch.bind(_this.restClient), url, headers, data);
	        });
	    };
	    /**
	     * Method to make a PUT request
	     * @method AuthenticatedRestClient#put
	     * @param  {string} url
	     * @param  {any} headers
	     * @param  {any} data
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.put = function (url, headers, data) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.put.bind(_this.restClient), url, headers, data);
	        });
	    };
	    /**
	     * Method to make a DELETE request
	     * @method AuthenticatedRestClient#delete
	     * @param  {string} url
	     * @param  {any} headers
	     * @returns {Promise} - returns a promise
	     */
	    AuthenticatedRestClient.prototype.delete = function (url, headers) {
	        var _this = this;
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            headers.authorization = _this.constructAUthHeader(token);
	            return _this.makeRequestWithRetry(0, _this.restClient.delete.bind(_this.restClient), url, headers);
	        });
	    };
	    /**
	     * Method to check token prior to making a rest call and retry on 401 if necessary ...
	     * @param {number} count - The number of retries (this function is called recursively)
	     * @param {Function} verb  - The actual rest method to call
	     * @param {string} url  - The url
	     * @param {any} [headers] - The headers
	     * @param {any} [data]  - The data
	     */
	    AuthenticatedRestClient.prototype.makeRequestWithRetry = function (count, verb, url, headers, data) {
	        var _this = this;
	        return verb(url, headers, data)
	            .catch(function (result) {
	            if (count < _this.retryCount && result.statusCode === 401 && _this.networkManager) {
	                return _this.networkManager.restartSession()
	                    .then(function (sessionInfo) {
	                    headers.authorization = _this.constructAUthHeader(sessionInfo.token);
	                    return _this.makeRequestWithRetry(++count, verb, url, headers, data);
	                });
	            }
	            throw result;
	        });
	    };
	    /**
	     * Method to create an auth header from a token
	     * @method AuthenticatedRestClient#constructAUthHeader
	     * @param {string} token
	     * @returns {string} - returns the auth header
	     */
	    AuthenticatedRestClient.prototype.constructAUthHeader = function (token) {
	        return "Bearer " + token;
	    };
	    return AuthenticatedRestClient;
	}());
	AuthenticatedRestClient = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
	    __metadata("design:paramtypes", [Object, Object, Object])
	], AuthenticatedRestClient);
	exports.AuthenticatedRestClient = AuthenticatedRestClient;
	//# sourceMappingURL=authenticatedRestClient.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var utils_1 = __webpack_require__(5);
	var interfaceSymbols_1 = __webpack_require__(10);
	var SessionManager = (function () {
	    /**
	     * SessionManager class constructor.
	     * @class SessionManager
	     * @ignore
	     * @classdesc Class that implements all the SessionManager functionality.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} comapiConfig
	     */
	    function SessionManager(_logger, _restClient, _localStorageData, _comapiConfig) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	    }
	    /**
	     * Retrieve a cached session if there is one
	     */
	    SessionManager.prototype.initialise = function () {
	        var _this = this;
	        return this._localStorageData.getObject("session")
	            .then(function (sessionInfo) {
	            if (sessionInfo) {
	                if (_this.isSessionValid(sessionInfo)) {
	                    _this._sessionInfo = sessionInfo;
	                    return true;
	                }
	                else {
	                    return _this._localStorageData.remove("session")
	                        .then(function () {
	                        return false;
	                    });
	                }
	            }
	            else {
	                return false;
	            }
	        });
	    };
	    Object.defineProperty(SessionManager.prototype, "sessionInfo", {
	        /**
	         * Getter to get the current sessionInfo
	         * @method SessionManager#sessionInfo
	         * @returns {ISessionInfo}
	         */
	        get: function () {
	            return this._sessionInfo;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Function to get auth token
	     * @method SessionManager#token
	     * @returns {Promise} - returns the auth token via a promise
	     */
	    SessionManager.prototype.getValidToken = function () {
	        return this.startSession()
	            .then(function (sessionInfo) {
	            return Promise.resolve(sessionInfo.token);
	        });
	    };
	    /**
	     * Function to start a new session or return an existing session
	     * @method SessionManager#startSession
	     * @param {any} userDefined -  Additional client-specific information
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype.startSession = function () {
	        var _this = this;
	        var self = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._sessionInfo && _this.isSessionValid(_this._sessionInfo)) {
	                resolve(_this._sessionInfo);
	            }
	            else {
	                // call comapi service startAuth                
	                _this._startAuth().then(function (sessionStartResponse) {
	                    var authChallengeOptions = {
	                        nonce: sessionStartResponse.nonce
	                    };
	                    // call integrators auth challenge method
	                    self._comapiConfig.authChallenge(authChallengeOptions, function (jwt) {
	                        if (jwt) {
	                            self._createAuthenticatedSession(jwt, sessionStartResponse.authenticationId, {})
	                                .then(function (sessionInfo) {
	                                return Promise.all([sessionInfo, self._setSession(sessionInfo)]);
	                            })
	                                .then(function (_a) {
	                                var sessionInfo = _a[0], result = _a[1];
	                                if (!result) {
	                                    console.error("_setSession() failed");
	                                }
	                                // pass back to client
	                                resolve(sessionInfo);
	                            })
	                                .catch(function (error) {
	                                reject(error);
	                            });
	                        }
	                        else {
	                            // client failed to fulfil the auth challenge for some reason ...
	                            reject({ message: "Failed to get a JWT from authChallenge", statusCode: 401 });
	                        }
	                    });
	                }).catch(function (error) { return reject(error); });
	            }
	        });
	    };
	    /**
	     * Function to end the current session
	     * @method SessionManager#endSession
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype.endSession = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this._sessionInfo) {
	                _this._endAuth()
	                    .then(function (result) {
	                    _this.removeSession();
	                    resolve(true);
	                }).catch(function (error) {
	                    _this.removeSession();
	                    resolve(false);
	                });
	            }
	            else {
	                reject({ message: "No active session is present, create one before ending one" });
	            }
	        });
	    };
	    /**
	     * Retrieves details about a session
	     * @method SessionManager#requestSession
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype.requestSession = function () {
	        var headers = {
	            "Content-Type": "application/json",
	            "authorization": this.getAuthHeader(),
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.session, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            sessionId: this.sessionInfo.session.id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url, headers);
	    };
	    /**
	     * Internal function to remove an existing cached session
	     * @returns {Promise} - returns boolean result
	     */
	    SessionManager.prototype.removeSession = function () {
	        var _this = this;
	        return this._localStorageData.remove("session")
	            .then(function (result) {
	            _this._sessionInfo = undefined;
	            return result;
	        });
	    };
	    /**
	     * Internal function to create an authenticated session
	     * @param (String) jwt - the jwt retrieved from the integrator
	     * @param (String) authenticationId - the authenticationId given by comapi back end
	     * @param (Object) deviceInfo - the deviceInfo
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype._createAuthenticatedSession = function (jwt, authenticationId, deviceInfo) {
	        var _this = this;
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.sessions, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this.getDeviceId()
	            .then(function () {
	            var browserInfo = utils_1.Utils.getBrowserInfo();
	            var data = {
	                authenticationId: authenticationId,
	                authenticationToken: jwt,
	                deviceId: _this._deviceId,
	                platform: /*browserInfo.name*/ "javascript",
	                platformVersion: browserInfo.version,
	                sdkType: /*"javascript"*/ "native",
	                sdkVersion: "1.1.5.322"
	            };
	            return _this._restClient.post(url, {}, data);
	        })
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Internal function to start an authenticated session
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype._startAuth = function () {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.sessionStart, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Internal function to end an authenticated session
	     * @returns {Promise} - Returns a promise
	     */
	    SessionManager.prototype._endAuth = function () {
	        var headers = {
	            "Content-Type": "application/json",
	            "authorization": this.getAuthHeader(),
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.session, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            sessionId: this.sessionInfo.session.id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, headers)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Internal function to load in an existing session if available
	     * @returns {boolean} - returns boolean reault
	     */
	    SessionManager.prototype._setSession = function (sessionInfo) {
	        if (this.hasExpired(sessionInfo.session.expiresOn)) {
	            this._logger.error("Was given an expired token ;-(");
	        }
	        this._sessionInfo = sessionInfo;
	        return this._localStorageData.setObject("session", sessionInfo);
	    };
	    /**
	     *
	     */
	    SessionManager.prototype.getAuthHeader = function () {
	        return "Bearer " + this.sessionInfo.token;
	    };
	    /**
	     * Create one if not available ...
	     */
	    SessionManager.prototype.getDeviceId = function () {
	        var _this = this;
	        if (this._deviceId) {
	            return Promise.resolve(this._deviceId);
	        }
	        else {
	            return this._localStorageData.getString("deviceId")
	                .then(function (value) {
	                if (value === null) {
	                    _this._deviceId = utils_1.Utils.uuid();
	                    return _this._localStorageData.setString("deviceId", _this._deviceId)
	                        .then(function (result) {
	                        return Promise.resolve(_this._deviceId);
	                    });
	                }
	                else {
	                    _this._deviceId = value;
	                    return Promise.resolve(_this._deviceId);
	                }
	            });
	        }
	    };
	    /**
	     * Check an iso date is not in the past ...
	     * @param expiresOn
	     */
	    SessionManager.prototype.hasExpired = function (expiresOn) {
	        var now = new Date();
	        var expiry = new Date(expiresOn);
	        return now > expiry;
	    };
	    /**
	     * Checks validity of session based on expiry and matching apiSpace
	     * @param sessionInfo
	     */
	    SessionManager.prototype.isSessionValid = function (sessionInfo) {
	        var valid = false;
	        if (!this.hasExpired(sessionInfo.session.expiresOn)) {
	            // check that the token matches 
	            if (sessionInfo.token) {
	                var bits = sessionInfo.token.split(".");
	                if (bits.length === 3) {
	                    var payload = JSON.parse(atob(bits[1]));
	                    if (payload.apiSpaceId === this._comapiConfig.apiSpaceId) {
	                        valid = true;
	                    }
	                }
	            }
	        }
	        return valid;
	    };
	    return SessionManager;
	}());
	SessionManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.RestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object])
	], SessionManager);
	exports.SessionManager = SessionManager;
	//# sourceMappingURL=sessionManager.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	// https://github.com/vitalets/controlled-promise/blob/master/src/index.js
	var MyPromise = (function () {
	    function MyPromise() {
	        this._promise = null;
	        this._resolve = null;
	        this._reject = null;
	        this._isPending = false;
	        this._value = null;
	    }
	    Object.defineProperty(MyPromise.prototype, "promise", {
	        /**
	         *
	         * @returns {Boolean}
	         */
	        get: function () {
	            return this._promise;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MyPromise.prototype, "value", {
	        /**
	         *
	         * @returns {Boolean}
	         */
	        get: function () {
	            return this._value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     *
	     * @param fn
	     */
	    MyPromise.prototype.call = function (fn) {
	        var _this = this;
	        if (!this._isPending) {
	            this._isPending = true;
	            this._promise = new Promise(function (resolve, reject) {
	                _this._resolve = resolve;
	                _this._reject = reject;
	                fn();
	            });
	        }
	        return this._promise;
	    };
	    Object.defineProperty(MyPromise.prototype, "isPending", {
	        /**
	         * Returns true if promise is pending.
	         *
	         * @returns {Boolean}
	         */
	        get: function () {
	            return this._isPending;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     *
	     * @param value
	     */
	    MyPromise.prototype.resolve = function (value) {
	        this._isPending = false;
	        this._value = value;
	        this._resolve(value);
	    };
	    /**
	     *
	     * @param value
	     */
	    MyPromise.prototype.reject = function (value) {
	        this._isPending = false;
	        this._reject(value);
	    };
	    return MyPromise;
	}());
	// https://gist.github.com/strife25/9310539
	// https://github.com/vitalets/websocket-as-promised/blob/master/src/index.js
	var WebSocketManager = (function () {
	    /**
	     * WebSocketManager class constructor.
	     * @class  WebSocketManager
	     * @ignore
	     * @classdesc Class that implements WebSocketManager
	     * @param {ILogger} _logger
	     * @param {ILocalStorageData} _localStorageData
	     * @param {IComapiConfig} _comapiConfig
	     * @param {ISessionManager} _sessionManager
	     * @param {IEventManager} _eventManager
	     */
	    function WebSocketManager(_logger, _localStorageData, _comapiConfig, _sessionManager, _eventManager, _eventMapper) {
	        var _this = this;
	        this._logger = _logger;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	        this._eventManager = _eventManager;
	        this._eventMapper = _eventMapper;
	        // ready state code mapping ...
	        this.readystates = [
	            "Connecting",
	            "Open",
	            "Closing",
	            "Closed" // 3
	        ];
	        // TODO: make configurable ...
	        this.echoIntervalTimeout = 1000 * 60; // 1 minute
	        this.STATE = {
	            CLOSED: 3,
	            CLOSING: 2,
	            CONNECTING: 0,
	            OPEN: 1,
	        };
	        // can use _opening._value for equivalent functionality
	        this.manuallyClosed = false;
	        // whether socket ever connected - set to true on first connect and used to determine whether to reconnect on close if not a manual close
	        this.didConnect = false;
	        this.reconnecting = false;
	        this.attempts = 0;
	        // start this here just once
	        this.echoIntervalId = setInterval(function () { return _this.echo(); }, this.echoIntervalTimeout);
	    }
	    Object.defineProperty(WebSocketManager.prototype, "isOpening", {
	        /**
	         * Is WebSocket connection in opening state.
	         *
	         * @returns {Boolean}
	         */
	        get: function () {
	            return Boolean(this.webSocket && this.webSocket.readyState === this.STATE.CONNECTING);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WebSocketManager.prototype, "isOpened", {
	        /**
	         * Is WebSocket connection opened.
	         *
	         * @returns {Boolean}
	         */
	        get: function () {
	            return Boolean(this.webSocket && this.webSocket.readyState === this.STATE.OPEN);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WebSocketManager.prototype, "isClosing", {
	        /**
	         * Is WebSocket connection in closing state.
	         *
	         * @returns {Boolean}
	         */
	        get: function () {
	            return Boolean(this.webSocket && this.webSocket.readyState === this.STATE.CLOSING);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WebSocketManager.prototype, "isClosed", {
	        /**
	         * Is WebSocket connection closed.
	         *
	         * @returns {Boolean}
	         */
	        get: function () {
	            return Boolean(!this.webSocket || this.webSocket.readyState === this.STATE.CLOSED);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Function to determine te connection state of the websocket - rturns hether ther socket `did` connect rather than the current status as there is reconnection logic running.
	     * @method WebSocketManager#isConnected
	     * @returns {boolean}
	     */
	    WebSocketManager.prototype.isConnected = function () {
	        return this.isOpened;
	    };
	    /**
	     * Function to connect websocket
	     * @method WebSocketManager#connect
	     */
	    WebSocketManager.prototype.connect = function () {
	        var _this = this;
	        if (this.isClosing) {
	            return Promise.reject(new Error("Can't open WebSocket while closing."));
	        }
	        // User calls connect and already connected
	        if (this.isOpened) {
	            return this._opening.promise;
	        }
	        // we have started to open, so return this and everyone can wait on it ....
	        if (this._opening && this._opening.isPending) {
	            return this._opening.promise;
	        }
	        this._opening = new MyPromise();
	        return this._opening.call(function () {
	            _this._logger.log("WebSocketManager.connect();");
	            if (!_this.webSocket) {
	                _this._logger.log("WebSocketManager.connect()");
	                var _token_1;
	                _this._sessionManager.getValidToken()
	                    .then(function (token) {
	                    _token_1 = token;
	                    _this._logger.log("WebSocketManager.connect() - got auth token", token);
	                    // reset this in case someone is opening / closing
	                    _this.manuallyClosed = false;
	                    var url = _this._comapiConfig.webSocketBase + "/apispaces/" + _this._comapiConfig.apiSpaceId + "/socket";
	                    var queryString = "?token=" + token;
	                    var fullUrl = url + queryString;
	                    _this._logger.log("connecting ...", fullUrl);
	                    _this.webSocket = new WebSocket(fullUrl);
	                    _this.webSocket.onopen = _this._handleOpen.bind(_this);
	                    _this.webSocket.onerror = _this._handleError.bind(_this);
	                    _this.webSocket.onclose = _this._handleClose.bind(_this);
	                    _this.webSocket.onmessage = _this._handleMessage.bind(_this);
	                })
	                    .catch(function (error) {
	                    _this._opening.reject({
	                        code: error.code,
	                        message: _token_1 ? "Websocket Error" : "Failed to get Valid Token",
	                    });
	                });
	            }
	        });
	    };
	    /**
	     * Function to disconnect websocket
	     * @method WebSocketManager#disconnect
	     * @returns {Promise}
	     */
	    WebSocketManager.prototype.disconnect = function () {
	        var _this = this;
	        if (this.isClosed) {
	            return Promise.resolve(true);
	        }
	        this._logger.log("WebSocketManager.disconnect();");
	        this._closing = new MyPromise();
	        return this._closing.call(function () {
	            _this.manuallyClosed = true;
	            _this.webSocket.close();
	        });
	    };
	    /**
	     * Function to send some data from the client down the websocket
	     * @method WebSocketManager#send
	     * @param {any} data -  the data to send
	     * @returns {Promise}
	     */
	    WebSocketManager.prototype.send = function (data) {
	        if (this.isOpened) {
	            this.webSocket.send(JSON.stringify(data));
	        }
	    };
	    /**
	     * Function to determine te whether there is an ative socket or not (connected or disconnected)
	     * @method WebSocketManager#hasSocket
	     * @returns {boolean}
	     */
	    WebSocketManager.prototype.hasSocket = function () {
	        return this.webSocket ? true : false;
	    };
	    /**
	     * Function to generate an interval for reconnecton purposes
	     * @method WebSocketManager#generateInterval
	     * @param {number} k
	     * @returns {Promise}
	     */
	    WebSocketManager.prototype.generateInterval = function (k) {
	        var maxInterval = (Math.pow(2, k) - 1) * 1000;
	        if (maxInterval > 30 * 1000) {
	            maxInterval = 30 * 1000; // If the generated interval is more than 30 seconds, truncate it down to 30 seconds.
	        }
	        // generate the interval to a random number between 0 and the maxInterval determined from above
	        var interval = Math.random() * maxInterval;
	        this._logger.log("generateInterval() => " + interval);
	        return interval;
	    };
	    /**
	     *
	     * @param event
	     */
	    WebSocketManager.prototype._handleOpen = function (event) {
	        this._logger.log("_handleOpen", event);
	        this.didConnect = true;
	        this._eventManager.publishLocalEvent("WebsocketOpened", { timestamp: new Date().toISOString() });
	        if (this._opening) {
	            this._opening.resolve(true);
	        }
	    };
	    /**
	     *
	     * @param event
	     */
	    WebSocketManager.prototype._handleMessage = function (event) {
	        this._logger.log("_handleMessage", event);
	        var message;
	        try {
	            message = JSON.parse(event.data);
	        }
	        catch (e) {
	            this._logger.error("socket onmessage: (not JSON)", event.data);
	        }
	        if (message) {
	            this._logger.log("websocket onmessage: ", message);
	            this.publishWebsocketEvent(message);
	        }
	    };
	    /**
	     *
	     * @param event
	     */
	    WebSocketManager.prototype._handleError = function (event) {
	        this._logger.log("websocket onerror - readystate: " + this.readystates[this.webSocket.readyState], event);
	    };
	    /**
	     *
	     * @param event
	     */
	    WebSocketManager.prototype._handleClose = function (event) {
	        this.webSocket = undefined;
	        this._logger.log("WebSocket Connection closed.", event);
	        this._eventManager.publishLocalEvent("WebsocketClosed", { timestamp: new Date().toISOString() });
	        // This is the failed to connect flow ...
	        if (this._opening.isPending) {
	            this._opening.resolve(false);
	        }
	        // This is the manually closed flow
	        if (this._closing && this._closing.isPending) {
	            this._closing.resolve(true);
	            this.didConnect = false;
	        }
	        // only retry if we didn't manually close it and it actually connected in the first place
	        if (!this.manuallyClosed && !this.reconnecting) {
	            this._logger.log("socket not manually closed, reconnecting ...");
	            this.reconnecting = true;
	            this.reconnect();
	        }
	    };
	    /**
	     *
	     */
	    WebSocketManager.prototype.echo = function () {
	        this.send({
	            name: "echo",
	            payload: {},
	            publishedOn: new Date().toISOString(),
	        });
	    };
	    /**
	     *
	     */
	    WebSocketManager.prototype.reconnect = function () {
	        var _this = this;
	        var time = this.generateInterval(this.attempts);
	        setTimeout(function () {
	            _this.attempts++;
	            _this._logger.log("reconnecting (" + _this.attempts + ") ...");
	            _this.connect()
	                .then(function (connected) {
	                if (connected) {
	                    _this._logger.log("socket reconnected");
	                    _this.attempts = 0;
	                    _this.reconnecting = false;
	                }
	                else {
	                    _this._logger.log("socket recycle failed");
	                    _this.reconnect();
	                }
	            })
	                .catch(function (e) {
	                _this._logger.log("socket recycle failed", e);
	                _this.reconnect();
	            });
	        }, time);
	    };
	    /**
	     *
	     * @param name
	     */
	    WebSocketManager.prototype.mapEventName = function (name) {
	        // // TODO: make this configurable
	        // let eventAliasInfo: IEventMapping = {
	        //     conversation: ["conversation", "chat"],
	        //     conversationMessage: ["conversationMessage", "chatMessage"],
	        //     profile: ["profile"]
	        // };
	        if (this._comapiConfig.eventMapping) {
	            if (name) {
	                var split = name.split(".");
	                // for conversation.delete, category is conversation, type is delete
	                var category = split[0];
	                var type = split[1];
	                for (var eventCategory in this._comapiConfig.eventMapping) {
	                    if (this._comapiConfig.eventMapping.hasOwnProperty(eventCategory)) {
	                        // propertyName is what you want
	                        // you can get the value like this: myObject[propertyName]
	                        var aliases = this._comapiConfig.eventMapping[eventCategory];
	                        // go through the
	                        for (var _i = 0, aliases_1 = aliases; _i < aliases_1.length; _i++) {
	                            var val = aliases_1[_i];
	                            if (val === category) {
	                                return eventCategory + "." + type;
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        return name;
	    };
	    /**
	     * Map internal event structure to a defined interface ...
	     */
	    WebSocketManager.prototype.publishWebsocketEvent = function (event) {
	        var mappedName = this.mapEventName(event.name);
	        switch (mappedName) {
	            case "conversation.delete":
	                {
	                    this._eventManager.publishLocalEvent("conversationDeleted", this._eventMapper.conversationDeleted(event));
	                }
	                break;
	            case "conversation.undelete":
	                {
	                    this._eventManager.publishLocalEvent("conversationUndeleted", this._eventMapper.conversationUndeleted(event));
	                }
	                break;
	            case "conversation.update":
	                {
	                    this._eventManager.publishLocalEvent("conversationUpdated", this._eventMapper.conversationUpdated(event));
	                }
	                break;
	            case "conversation.participantAdded":
	                {
	                    this._eventManager.publishLocalEvent("participantAdded", this._eventMapper.participantAdded(event));
	                }
	                break;
	            case "conversation.participantRemoved":
	                {
	                    this._eventManager.publishLocalEvent("participantRemoved", this._eventMapper.participantRemoved(event));
	                }
	                break;
	            case "conversation.participantTyping":
	                {
	                    this._eventManager.publishLocalEvent("participantTyping", this._eventMapper.participantTyping(event));
	                }
	                break;
	            case "conversation.participantTypingOff":
	                {
	                    this._eventManager.publishLocalEvent("participantTypingOff", this._eventMapper.participantTypingOff(event));
	                }
	                break;
	            case "conversationMessage.sent":
	                {
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", this._eventMapper.conversationMessageSent(event));
	                }
	                break;
	            case "conversationMessage.read":
	                {
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", this._eventMapper.conversationMessageRead(event));
	                }
	                break;
	            case "conversationMessage.delivered":
	                {
	                    this._eventManager.publishLocalEvent("conversationMessageEvent", this._eventMapper.conversationMessageDelivered(event));
	                }
	                break;
	            case "profile.update":
	                {
	                    if (event.eTag) {
	                        this._localStorageData.setString("MyProfileETag", event.eTag);
	                    }
	                    this._eventManager.publishLocalEvent("profileUpdated", this._eventMapper.profileUpdated(event));
	                }
	                break;
	            default:
	                this._logger.warn("Unknown Event", event);
	                this._eventManager.publishLocalEvent("webSocketEvent", event);
	                break;
	        }
	    };
	    return WebSocketManager;
	}());
	WebSocketManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventManager)),
	    __param(5, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.EventMapper)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
	], WebSocketManager);
	exports.WebSocketManager = WebSocketManager;
	//# sourceMappingURL=webSocketManager.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var NetworkManager = (function () {
	    /**
	     * NetworkManager class constructor.
	     * @class NetworkManager
	     * @ignore
	     * @classdesc Class that implements Session And Socket Resolution.
	     * @parameter {ISessionManager} _sessionManager
	     * @parameter {IWebSocketManager} _webSocketManager
	     */
	    function NetworkManager(_logger, _sessionManager, _webSocketManager) {
	        this._logger = _logger;
	        this._sessionManager = _sessionManager;
	        this._webSocketManager = _webSocketManager;
	    }
	    /**
	     * Method to start a new authenticated session AND connect up the websocket
	     * @method Foundation#startSession
	     * @returns {Promise} - Returns a promise
	     */
	    NetworkManager.prototype.startSession = function () {
	        var _this = this;
	        var _sessionInfo;
	        return this._sessionManager.startSession()
	            .then(function (sessionInfo) {
	            _sessionInfo = sessionInfo;
	            return _this._webSocketManager.connect();
	        })
	            .then(function (connected) {
	            if (connected) {
	                return _sessionInfo;
	            }
	            else {
	                _this._logger.error("Failed to connect web socket");
	                // Is the session invalid even though it hadn't expired ? 
	                //  - perhaps the auth settings have changes since the token was issued ?
	                return _this._sessionManager.requestSession()
	                    .then(function (session) {
	                    // all good, websocket connection failure was just a blip and will automatically reconnect ...
	                    return _sessionInfo;
	                })
	                    .catch(function (error) {
	                    // session was bad
	                    _this._logger.error("failed to request session", error);
	                    // delete old cached session and re-auth ...
	                    return _this._sessionManager.removeSession()
	                        .then(function (result) {
	                        return _this._sessionManager.startSession();
	                    });
	                });
	            }
	        });
	    };
	    /**
	     * Method to restart an expired authenticated session
	     * @method Foundation#restartSession
	     * @returns {Promise} - Returns a promise
	     */
	    NetworkManager.prototype.restartSession = function () {
	        var _this = this;
	        return this._webSocketManager.disconnect()
	            .then(function (succeeded) {
	            return _this._sessionManager.removeSession();
	        })
	            .then(function (succeeded) {
	            return _this._sessionManager.startSession();
	        })
	            .then(function (sessionInfo) {
	            return Promise.all([sessionInfo, _this._webSocketManager.connect()]);
	        })
	            .then(function (_a) {
	            var sessionInfo = _a[0], connected = _a[1];
	            if (!connected) {
	                _this._logger.error("Failed to connect web socket");
	            }
	            return sessionInfo;
	        });
	    };
	    Object.defineProperty(NetworkManager.prototype, "session", {
	        /**
	         * Method to get current session
	         * @method Foundation#session
	         * @returns {ISession} - Returns an ISession interface
	         */
	        get: function () {
	            return this._sessionManager.sessionInfo ? this._sessionManager.sessionInfo.session : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Method to end an existing authenticated session
	     * @method Foundation#endSession
	     * @returns {Promise} - Returns a promise
	     */
	    NetworkManager.prototype.endSession = function () {
	        var _this = this;
	        return this._webSocketManager.disconnect()
	            .then(function () {
	            return _this._sessionManager.endSession();
	        });
	    };
	    NetworkManager.prototype.getValidToken = function () {
	        return this._sessionManager.getValidToken();
	    };
	    /**
	     * Create a session if we don't have one already ...
	     * @method NetworkManager#ensureSession
	     * @returns {Promise} - returns a Promise
	     */
	    NetworkManager.prototype.ensureSession = function () {
	        return this._sessionManager.startSession();
	    };
	    return NetworkManager;
	}());
	NetworkManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.WebSocketManager)),
	    __metadata("design:paramtypes", [Object, Object, Object])
	], NetworkManager);
	exports.NetworkManager = NetworkManager;
	//# sourceMappingURL=networkManager.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaces_1 = __webpack_require__(3);
	var utils_1 = __webpack_require__(5);
	var interfaceSymbols_1 = __webpack_require__(10);
	var DeviceManager = (function () {
	    // private _deviceId: string;
	    /**
	     * DeviceManager class constructor.
	     * @class DeviceManager
	     * @ignore
	     * @classdesc Class that implements all the DeviceManager functionality.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} ComapiConfig
	     */
	    function DeviceManager(_logger, _restClient, _localStorageData, _comapiConfig) {
	        // this._deviceId = _localStorageData.getString("deviceId");
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        // if (!this._deviceId) {
	        //     this._deviceId = Utils.uuid();
	        //     _localStorageData.setString("deviceId", this._deviceId);
	        // }
	    }
	    /**
	     * Function to set FCM push details for the current session
	     * @method DeviceManager#setFCMPushDetails
	     * @param {string} sessionId
	     * @param {string} packageName
	     * @param {string} registrationId
	     * @returns {Promise} - Returns a promise
	     */
	    DeviceManager.prototype.setFCMPushDetails = function (sessionId, packageName, registrationId) {
	        var data = {
	            "fcm": {
	                "package": packageName,
	                "registrationId": registrationId
	            }
	        };
	        return this._restClient.put(this.getPushUrl(sessionId), {}, data)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to set APNS push details for the current session
	     * @method DeviceManager#setAPNSPushDetails
	     * @param {string} sessionId
	     * @param {string} bundleId
	     * @param {Environment} environment
	     * @param {string} token
	     * @returns {Promise} - Returns a promise
	     */
	    DeviceManager.prototype.setAPNSPushDetails = function (sessionId, bundleId, environment, token) {
	        var data = {
	            "apns": {
	                "bundleId": bundleId,
	                "environment": interfaces_1.Environment[environment],
	                "token": token
	            }
	        };
	        return this._restClient.put(this.getPushUrl(sessionId), {}, data)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to remove push details for the current session
	     * @method DeviceManager#removePushDetails
	     * @param {string} sessionId
	     * @returns {Promise} - Returns a promise
	     */
	    DeviceManager.prototype.removePushDetails = function (sessionId) {
	        return this._restClient.delete(this.getPushUrl(sessionId), {})
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Getter to get the current push Url
	     * @method DeviceManager#pushUrl
	     * @returns {string}
	     */
	    DeviceManager.prototype.getPushUrl = function (sessionId) {
	        return utils_1.Utils.format(this._comapiConfig.foundationRestUrls.push, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            sessionId: sessionId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	    };
	    return DeviceManager;
	}());
	DeviceManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object])
	], DeviceManager);
	exports.DeviceManager = DeviceManager;
	//# sourceMappingURL=deviceManager.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var utils_1 = __webpack_require__(5);
	var interfaceSymbols_1 = __webpack_require__(10);
	var FacebookManager = (function () {
	    /**
	     * FacebookManager class constructor.
	     * @class FacebookManager
	     * @ignore
	     * @classdesc Class that implements all the FacebookManager functionality.
	     * @parameter {IRestClient} restClient
	     * @parameter {IComapiConfig} comapiConfig
	     */
	    function FacebookManager(_restClient, _comapiConfig) {
	        this._restClient = _restClient;
	        this._comapiConfig = _comapiConfig;
	    }
	    /**
	     * @param {any} [data] - the data to post
	     */
	    FacebookManager.prototype.createSendToMessengerState = function (data) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.facebook, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, data || {});
	    };
	    return FacebookManager;
	}());
	FacebookManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object, Object])
	], FacebookManager);
	exports.FacebookManager = FacebookManager;
	//# sourceMappingURL=facebookManager.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaces_1 = __webpack_require__(3);
	var utils_1 = __webpack_require__(5);
	var interfaceSymbols_1 = __webpack_require__(10);
	var ConversationManager = (function () {
	    /**
	     * ConversationManager class constructor.
	     * @class ConversationManager
	     * @ignore
	     * @classdesc Class that implements Conversation Management.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} ComapiConfig
	     * @parameter {ISessionManager} sessionManager
	     */
	    function ConversationManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	        //  This object is an in-memory dictionary of last sent timestamps (conversationId: timestamp) ...
	        //  "FA93AA1B-DEA5-4182-BE67-3DEAF4021040": "2017-02-28T14:48:21.634Z"
	        this.isTypingInfo = {};
	        // same for typing off 
	        this.isTypingOffInfo = {};
	    }
	    /**
	     * Function to create a conversation
	     * @method ConversationManager#createConversation
	     * @param {IConversationDetails} conversationDetails
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.createConversation = function (conversationDetails) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversations, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, conversationDetails)
	            .then(function (result) {
	            result.response._etag = utils_1.Utils.getHeaderValue(result.headers, "ETag");
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Function to update a conversation
	     * @method ConversationManager#updateConversation
	     * @param {IConversationDetails} conversationDetails
	     * @param {string} [eTag] - the eTag
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.updateConversation = function (conversationDetails, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["if-match"] = eTag;
	        }
	        var args = {
	            description: conversationDetails.description,
	            isPublic: conversationDetails.isPublic,
	            name: conversationDetails.name,
	            roles: conversationDetails.roles,
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationDetails.id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.put(url, headers, args)
	            .then(function (result) {
	            result.response._etag = utils_1.Utils.getHeaderValue(result.headers, "ETag");
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Function to get a conversation
	     * @method ConversationManager#getConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.getConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            result.response._etag = utils_1.Utils.getHeaderValue(result.headers, "ETag");
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Function to delete a conversation
	     * @method ConversationManager#deleteConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.deleteConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversation, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, {})
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to add participants to a conversation
	     * @method ConversationManager#addParticipantsToConversation
	     * @param {string} conversationId
	     * @param {IConversationParticipant[]} participants
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.addParticipantsToConversation = function (conversationId, participants) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, participants)
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to remove participants to a conversation
	     * @method ConversationManager#deleteParticipantsFromConversation
	     * @param {string} conversationId
	     * @param {string[]} participants
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
	        var query = "";
	        for (var i = 0; i < participants.length; i++) {
	            query += (i === 0 ? "?id=" + participants[i] : "&id=" + participants[i]);
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url + query, {})
	            .then(function (result) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to get participantss in a conversation
	     * @method ConversationManager#getParticipantsInConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.getParticipantsInConversation = function (conversationId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.participants, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @method ConversationManager#getConversations
	     * @param {ConversationScope} [scope]
	     * @param {string} [profileId]
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.getConversations = function (scope, profileId) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.conversations, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        if (scope || profileId) {
	            url += "?";
	            if (scope !== undefined) {
	                url += "scope=" + interfaces_1.ConversationScope[scope] + "&";
	            }
	            if (profileId !== undefined) {
	                url += "profileId=" + profileId;
	            }
	        }
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Function to send an is-typing event
	     * @method ConversationManager#sendIsTyping
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.sendIsTyping = function (conversationId) {
	        var _this = this;
	        // we only want to call this once every n seconds (10?)
	        if (this.isTypingInfo[conversationId]) {
	            var lastSentTime = new Date(this.isTypingInfo[conversationId]);
	            var now = new Date();
	            var diff = (now.getTime() - lastSentTime.getTime()) / 1000;
	            if (diff < (this._comapiConfig.isTypingTimeout || 10)) {
	                return Promise.resolve(false);
	            }
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.typing, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, {})
	            .then(function (result) {
	            _this.isTypingInfo[conversationId] = new Date().toISOString();
	            if (_this.isTypingOffInfo[conversationId]) {
	                delete _this.isTypingOffInfo[conversationId];
	            }
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     * Function to send an is-typing off event
	     * @method ConversationManager#sendIsTyping
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    ConversationManager.prototype.sendIsTypingOff = function (conversationId) {
	        var _this = this;
	        // we only want to call this once every n seconds (10?)
	        if (this.isTypingOffInfo[conversationId]) {
	            var lastSentTime = new Date(this.isTypingOffInfo[conversationId]);
	            var now = new Date();
	            var diff = (now.getTime() - lastSentTime.getTime()) / 1000;
	            if (diff < (this._comapiConfig.isTypingOffTimeout || 10)) {
	                return Promise.resolve(false);
	            }
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.typing, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.delete(url, {})
	            .then(function (result) {
	            _this.isTypingOffInfo[conversationId] = new Date().toISOString();
	            if (_this.isTypingInfo[conversationId]) {
	                delete _this.isTypingInfo[conversationId];
	            }
	            return Promise.resolve(true);
	        });
	    };
	    return ConversationManager;
	}());
	ConversationManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
	], ConversationManager);
	exports.ConversationManager = ConversationManager;
	//# sourceMappingURL=conversationManager.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var utils_1 = __webpack_require__(5);
	var interfaceSymbols_1 = __webpack_require__(10);
	var ProfileManager = (function () {
	    /**
	     * ProfileManager class constructor.
	     * @class ProfileManager
	     * @ignore
	     * @classdesc Class that implements Profile Management.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} comapiConfig
	     * @parameter {ISessionManager} sessionManager
	     */
	    function ProfileManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	    }
	    /**
	     * Function to retrieve a user's profile
	     * @method ProfileManager#getProfile
	     * @param {string} id
	     * @returns {Promise}
	     */
	    ProfileManager.prototype.getProfile = function (id) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.get(url);
	    };
	    /**
	     * Function to query for a list of profiles matching the search criteria
	     * @method ProfileManager#getProfile
	     * @param {string} [query] - See https://www.npmjs.com/package/mongo-querystring for query syntax.
	     * @returns {Promise}
	     */
	    ProfileManager.prototype.queryProfiles = function (query) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profiles, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        if (query) {
	            url += ("?" + query);
	        }
	        return this._restClient.get(url);
	    };
	    /**
	     * Function to update a profile
	     * @method ProfileManager#updateProfile
	     * @param {string} id
	     * @param {Object} profile
	     * @param {string} [eTag]
	     * @returns {Promise}
	     */
	    ProfileManager.prototype.updateProfile = function (id, profile, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["If-Match"] = eTag;
	        }
	        // take a copy of it prior to messing with it ...
	        var data = utils_1.Utils.clone(profile);
	        if (data.id === undefined) {
	            data.id = id;
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.put(url, headers, data);
	    };
	    /**
	     * Function to patch a profile
	     * @method ProfileManager#updateProfile
	     * @param {string} id
	     * @param {Object} profile
	     * @param {string} [eTag]
	     * @returns {Promise}
	     */
	    ProfileManager.prototype.patchProfile = function (id, profile, eTag) {
	        var headers = {};
	        if (eTag) {
	            headers["If-Match"] = eTag;
	        }
	        // take a copy of it prior to messing with it ...
	        var data = utils_1.Utils.clone(profile);
	        if (data.id === undefined) {
	            data.id = id;
	        }
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.profile, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            profileId: id,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.patch(url, headers, data);
	    };
	    return ProfileManager;
	}());
	ProfileManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
	], ProfileManager);
	exports.ProfileManager = ProfileManager;
	//# sourceMappingURL=profileManager.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var utils_1 = __webpack_require__(5);
	var interfaceSymbols_1 = __webpack_require__(10);
	var MessageManager = (function () {
	    /**
	     * MessagesManager class constructor.
	     * @class MessagesManager
	     * @ignore
	     * @classdesc Class that implements Messages Management.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IComapiConfig} comapiConfig
	     * @parameter {ISessionManager} sessionManager
	     */
	    function MessageManager(_logger, _restClient, _localStorageData, _comapiConfig, _sessionManager) {
	        this._logger = _logger;
	        this._restClient = _restClient;
	        this._localStorageData = _localStorageData;
	        this._comapiConfig = _comapiConfig;
	        this._sessionManager = _sessionManager;
	    }
	    /**
	     * @method MessagesManager#getConversationEvents
	     * @param {string} conversationId
	     * @param {number} from
	     * @param {number} limit
	     * @returns {Promise}
	     */
	    MessageManager.prototype.getConversationEvents = function (conversationId, from, limit) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.events, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        url += "?from=" + from;
	        url += "&limit=" + limit;
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @method MessagesManager#getConversationMessages
	     * @param {string} conversationId
	     * @param {number} limit
	     * @param {number} [from]
	     * @returns {Promise}
	     */
	    MessageManager.prototype.getConversationMessages = function (conversationId, limit, from) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        url += "?limit=" + limit;
	        if (from !== undefined) {
	            url += "&from=" + from;
	        }
	        return this._restClient.get(url)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @deprecated - use methd that uses IConversationDetails / ConversationBuilder
	     * @method MessagesManager#sendMessageToConversation
	     * @parameter {String} conversationId
	     * @parameter {Object} metadata
	     * @parameter {IMessagePart[]} parts
	     * @parameter {IMessageAlert} alert
	     * @returns {Promise}
	     */
	    MessageManager.prototype._sendMessageToConversation = function (conversationId, metadata, parts, alert) {
	        var request = {
	            alert: alert,
	            metadata: metadata,
	            parts: parts,
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, request)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @method MessagesManager#sendMessageToConversation2
	     * @parameter {string} conversationId
	     * @parameter {IConversationMessage} message
	     */
	    MessageManager.prototype.sendMessageToConversation = function (conversationId, message) {
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.messages, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, {}, message)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * @method MessagesManager#sendMessageStatusUpdates
	     * @param {string} conversationId
	     * @param {IMessageStatus[]} statuses
	     * @returns {Promise}
	     */
	    MessageManager.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
	        var headers = {
	            "Content-Type": "application/json",
	        };
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.statusUpdates, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            conversationId: conversationId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this._restClient.post(url, headers, statuses)
	            .then(function (result) {
	            return Promise.resolve(result.response);
	        });
	    };
	    return MessageManager;
	}());
	MessageManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AuthenticatedRestClient)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.SessionManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
	], MessageManager);
	exports.MessageManager = MessageManager;
	//# sourceMappingURL=messageManager.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	;
	var IndexedDBOrphanedEventManager = (function () {
	    function IndexedDBOrphanedEventManager() {
	        this.idbSupported = "indexedDB" in window;
	        this._name = "Comapi.OrphanedEvents";
	        this._version = 1;
	        this._continuationTokenStore = "ContinuationTokens";
	        this._orphanedEventStore = "OrphanedEvents";
	    }
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.clearAll = function () {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return _this.clearObjectStore(_this._continuationTokenStore);
	        })
	            .then(function (cleared) {
	            return _this.clearObjectStore(_this._orphanedEventStore);
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.clear = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return _this.deleteTokenInfo(conversationId);
	        })
	            .then(function (deleted) {
	            return _this.deleteEvents(conversationId);
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._continuationTokenStore], "readonly");
	                var objectStore = transaction.objectStore(_this._continuationTokenStore);
	                // we want all the messages from this conversation ...
	                // using a keyrange to encapsulate just the specified conversationId and all the dates
	                var keyRange = IDBKeyRange.only(conversationId);
	                var cursorRequest = objectStore.openCursor(keyRange);
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    // only one record ...
	                    if (cursor) {
	                        var info = cursor.value;
	                        resolve(info.continuationToken);
	                    }
	                    else {
	                        resolve(null);
	                    }
	                };
	                cursorRequest.onerror = function (e) {
	                    reject({ message: "Failed to openCursor: " + e.target.error.name });
	                };
	            });
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._continuationTokenStore], "readwrite");
	                var store = transaction.objectStore(_this._continuationTokenStore);
	                var request = store.put({
	                    continuationToken: continuationToken,
	                    conversationId: conversationId
	                });
	                request.onerror = function (event) {
	                    reject({ message: "add failed: " + event.target.error.name });
	                };
	                request.onsuccess = function (event) {
	                    // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
	                    // returns auto incremented id ...
	                    // resolve((<IDBRequest>event.target).result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	                var store = transaction.objectStore(_this._orphanedEventStore);
	                var request = store.put(event);
	                request.onerror = function (e) {
	                    // console.error("Error", e.target.error.name);
	                    return Promise.resolve(false);
	                };
	                request.onsuccess = function (e) {
	                    // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
	                    // returns auto incremented id ...
	                    // resolve((<IDBRequest>event.target).result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	                var store = transaction.objectStore(_this._orphanedEventStore);
	                var request = store.delete(event.eventId);
	                request.onerror = function (e) {
	                    reject({ message: "delete failed: " + e.target.error.name });
	                };
	                request.onsuccess = function (e) {
	                    console.log("store.delete", e.target.result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._orphanedEventStore], "readonly");
	                var objectStore = transaction.objectStore(_this._orphanedEventStore);
	                var index = objectStore.index("conversationId");
	                var keyRange = IDBKeyRange.only(conversationId);
	                var events = [];
	                var cursorRequest = index.openCursor(keyRange, "prev");
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        events.unshift(cursor.value);
	                        cursor.continue();
	                    }
	                    else {
	                        resolve(events.sort(function (e1, e2) {
	                            return e1.conversationEventId - e2.conversationEventId;
	                        }));
	                    }
	                };
	                cursorRequest.onerror = function (event) {
	                    reject({ message: "Failed to openCursor: " + event.target.error.name });
	                };
	            });
	        });
	    };
	    IndexedDBOrphanedEventManager.prototype.ensureInitialised = function () {
	        if (!this._initialised) {
	            // this is a promise instance to ensure it's only called once
	            this._initialised = this.initialise();
	        }
	        return this._initialised;
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.initialise = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if (_this.idbSupported) {
	                var self_1 = _this;
	                var openRequest = indexedDB.open(_this._name, _this._version);
	                openRequest.onupgradeneeded = function (event) {
	                    var thisDB = event.target.result;
	                    /**
	                     * will be an array of IOrphanedEventContainer objects
	                     */
	                    if (!thisDB.objectStoreNames.contains(self_1._continuationTokenStore)) {
	                        thisDB.createObjectStore(self_1._continuationTokenStore, { keyPath: "conversationId" });
	                    }
	                    /**
	                     * Will be an array of IConversationMessageEvent objects
	                     */
	                    if (!thisDB.objectStoreNames.contains(self_1._orphanedEventStore)) {
	                        var os = thisDB.createObjectStore(self_1._orphanedEventStore, { keyPath: "eventId" });
	                        os.createIndex("conversationId", "conversationId", { unique: false });
	                    }
	                };
	                openRequest.onsuccess = function (event) {
	                    _this._database = event.target.result;
	                    resolve(true);
	                };
	                openRequest.onerror = function (event) {
	                    reject({ message: "IndexedDBOrphanedEventManager.initialise failed : " + event.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "IndexedDBOrphanedEventManager not supported on this platform" });
	            }
	        });
	    };
	    /**
	     * Method to clear the data in an object store
	     * @method ConversationStore#clearObjectStore
	     * @param {string} objectStore : the object store to clear
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBOrphanedEventManager.prototype.clearObjectStore = function (objectStoreName) {
	        var _this = this;
	        // can't reference objectStore in the promise without this ...
	        var _objectStoreName = objectStoreName;
	        return new Promise(function (resolve, reject) {
	            // open a read/write db transaction, ready for clearing the data
	            var transaction = _this._database.transaction([_objectStoreName], "readwrite");
	            transaction.onerror = function (event) {
	                console.error("Transaction not opened due to error: " + transaction.error);
	            };
	            var objectStore = transaction.objectStore(_objectStoreName);
	            var objectStoreRequest = objectStore.clear();
	            objectStoreRequest.onsuccess = function (event) {
	                resolve(true);
	            };
	            objectStoreRequest.onerror = function (event) {
	                reject({ message: "Failed to clear object store: " + event.target.error.name });
	            };
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.deleteTokenInfo = function (conversationId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var transaction = _this._database.transaction([_this._continuationTokenStore], "readwrite");
	            var store = transaction.objectStore(_this._continuationTokenStore);
	            var request = store.delete(conversationId);
	            request.onerror = function (event) {
	                reject({ message: "delete failed: " + event.target.error.name });
	            };
	            request.onsuccess = function (event) {
	                console.log("store.delete", event.target.result);
	                resolve(true);
	            };
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBOrphanedEventManager.prototype.deleteEvents = function (conversationId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var transaction = _this._database.transaction([_this._orphanedEventStore], "readwrite");
	            var objectStore = transaction.objectStore(_this._orphanedEventStore);
	            var index = objectStore.index("conversationId");
	            var keyRange = IDBKeyRange.only(conversationId);
	            // we want all the messages from this conversation ...
	            // using a keyrange to encapsulate just the specified conversationId and all the dates
	            var cursorRequest = index.openCursor(keyRange, "next");
	            cursorRequest.onsuccess = function (event) {
	                var cursor = event.target.result;
	                if (cursor) {
	                    objectStore.delete(cursor.primaryKey);
	                    cursor.continue();
	                }
	                else {
	                    resolve(true);
	                }
	            };
	            cursorRequest.onerror = function (e) {
	                reject({ message: "Failed to openCursor: " + e.target.error.name });
	            };
	        });
	    };
	    return IndexedDBOrphanedEventManager;
	}());
	IndexedDBOrphanedEventManager = __decorate([
	    inversify_1.injectable()
	], IndexedDBOrphanedEventManager);
	exports.IndexedDBOrphanedEventManager = IndexedDBOrphanedEventManager;
	//# sourceMappingURL=indexedDBOrphanedEventManager.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	;
	var LocalStorageOrphanedEventManager = (function () {
	    /**
	     *
	     */
	    function LocalStorageOrphanedEventManager(_localStorage) {
	        this._localStorage = _localStorage;
	        this._orphanedEvents = {};
	    }
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.clearAll = function () {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            _this._orphanedEvents = {};
	            return _this._localStorage.setObject("orphanedEvents", _this._orphanedEvents);
	        });
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.clear = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            _this._orphanedEvents[conversationId] = {
	                orphanedEvents: []
	            };
	            return _this._localStorage.setObject("orphanedEvents", _this._orphanedEvents);
	        });
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.getContinuationToken = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            var container = _this._orphanedEvents[conversationId];
	            return Promise.resolve(container ? container.continuationToken : null);
	        });
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.setContinuationToken = function (conversationId, continuationToken) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            var _info = _this._orphanedEvents[conversationId];
	            if (_info) {
	                _info.continuationToken = continuationToken;
	            }
	            else {
	                _this._orphanedEvents[conversationId] = {
	                    continuationToken: continuationToken,
	                    orphanedEvents: []
	                };
	            }
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.addOrphanedEvent = function (event) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            var info = _this._orphanedEvents[event.conversationId];
	            if (info) {
	                // check for dupe 
	                var found = info.orphanedEvents.filter(function (e) { return e.eventId === event.eventId; });
	                if (found.length === 0) {
	                    // insert
	                    info.orphanedEvents.unshift(event);
	                    // sort
	                    info.orphanedEvents = info.orphanedEvents.sort(function (e1, e2) {
	                        if (e1.conversationEventId > e2.conversationEventId) {
	                            return 1;
	                        }
	                        else if (e1.conversationEventId < e2.conversationEventId) {
	                            return -1;
	                        }
	                        else {
	                            return 0;
	                        }
	                    });
	                    // save
	                    return _this._localStorage.setObject("orphanedEvents", _this._orphanedEvents);
	                }
	                else {
	                    return Promise.resolve(false);
	                }
	            }
	            else {
	                return Promise.resolve(false);
	            }
	        });
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.removeOrphanedEvent = function (event) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            var info = _this._orphanedEvents[event.conversationId];
	            if (info) {
	                for (var i = info.orphanedEvents.length - 1; i >= 0; i--) {
	                    var e = info.orphanedEvents[i];
	                    if (e.eventId === event.eventId) {
	                        info.orphanedEvents.splice(i, 1);
	                        break;
	                    }
	                }
	                // save
	                return _this._localStorage.setObject("orphanedEvents", _this._orphanedEvents);
	            }
	            else {
	                return Promise.reject({ message: "No container for conversation " + event.conversationId });
	            }
	        });
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.getOrphanedEvents = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            var info = _this._orphanedEvents[conversationId];
	            return Promise.resolve(info ? info.orphanedEvents : []);
	        });
	    };
	    LocalStorageOrphanedEventManager.prototype.ensureInitialised = function () {
	        if (!this._initialised) {
	            // this is a promise instance to ensure it's only called once
	            this._initialised = this.initialise();
	        }
	        return this._initialised;
	    };
	    /**
	     *
	     */
	    LocalStorageOrphanedEventManager.prototype.initialise = function () {
	        var _this = this;
	        return this._localStorage.getObject("orphanedEvents")
	            .then(function (result) {
	            _this._orphanedEvents = result || {};
	            return true;
	        });
	    };
	    return LocalStorageOrphanedEventManager;
	}());
	LocalStorageOrphanedEventManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __metadata("design:paramtypes", [Object])
	], LocalStorageOrphanedEventManager);
	exports.LocalStorageOrphanedEventManager = LocalStorageOrphanedEventManager;
	//# sourceMappingURL=localStorageOrphanedEventManager.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var utils_1 = __webpack_require__(5);
	var interfaceSymbols_1 = __webpack_require__(10);
	var MessagePager = (function () {
	    /**
	     * MessagePager class constructor.
	     * @class MessagePager
	     * @ignore
	     * @classdesc Class that implements Conversation Message Pagination.
	     * @parameter {ILogger} _logger
	     * @parameter {ILocalStorageData} _localStorage
	     * @parameter {IMessageManager} _messageManager
	     */
	    function MessagePager(_logger, _localStorage, _messageManager, _orphanedEventManager) {
	        this._logger = _logger;
	        this._localStorage = _localStorage;
	        this._messageManager = _messageManager;
	        this._orphanedEventManager = _orphanedEventManager;
	    }
	    /**
	     * Get a page of messages, internally deal with orphaned events etc ...
	     * @method MessagePager#getMessages
	     * @param {string} id - the conversationId
	     * @param {number} pageSize - the page size
	     * @param {number} [continuationToken] - the continuation token (optional - if not specified then retrieve from the end)
	     * @returns {Promise<any>} - TODO: incorporate continuationToken into respose
	     */
	    MessagePager.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
	        var _this = this;
	        if (continuationToken <= 0) {
	            return Promise.reject({ message: "All messages from conversation " + conversationId + " have been loaded" });
	        }
	        var _continuationToken = null;
	        var _conversationMessagesResult;
	        // 1) get info & Validate
	        return this._orphanedEventManager.getContinuationToken(conversationId)
	            .then(function (token) {
	            _continuationToken = token;
	            if (continuationToken !== undefined) {
	                // check the continuationToken is correct
	                if (_continuationToken !== continuationToken) {
	                    // get rid of our cached events as they are now useless
	                    // return this._orphanedEventManager.clear(conversationId)
	                    // .then(() => {
	                    return Promise.reject({ message: "Invalid continuation token: " + continuationToken + " for " + conversationId + ", you nust start from the end" });
	                    // });
	                }
	                else {
	                    return Promise.resolve(true);
	                }
	            }
	            else {
	                // reset the store as they want to go from the beginning 
	                return _this._orphanedEventManager.clear(conversationId);
	            }
	        })
	            .then(function () {
	            return _this._messageManager.getConversationMessages(conversationId, pageSize, continuationToken);
	        })
	            .then(function (result) {
	            _conversationMessagesResult = result;
	            if (result.messages === undefined) {
	                _this._logger.log("No messages in this channel yet");
	                return Promise.resolve({ messages: [] });
	            }
	            else {
	                // merge any events we got from the call to getConversationMessages with whats in the store
	                return _this.getOrphanedEvents(conversationId, _conversationMessagesResult.orphanedEvents)
	                    .then(function (orphanedEvents) {
	                    return _this.applyOrphanedEvents(_conversationMessagesResult.messages, orphanedEvents);
	                })
	                    .then(function () {
	                    // update continuation token for this conv 
	                    _continuationToken = _conversationMessagesResult.earliestEventId - 1;
	                    return _this._orphanedEventManager.setContinuationToken(conversationId, _continuationToken);
	                })
	                    .then(function () {
	                    return Promise.resolve({
	                        continuationToken: _continuationToken,
	                        earliestEventId: _conversationMessagesResult.earliestEventId,
	                        latestEventId: _conversationMessagesResult.latestEventId,
	                        messages: _conversationMessagesResult.messages,
	                    });
	                });
	            }
	        });
	    };
	    /**
	     * Method to append a new batch of orphaned events to the store and then return them all ..
	     * @param {string} conversationId
	     * @param {any[]} orphanedEvents
	     * @returns {Promise<IConversationMessageEvent[]>}
	     */
	    MessagePager.prototype.getOrphanedEvents = function (conversationId, orphanedEvents) {
	        var _this = this;
	        var mapped = orphanedEvents.map(function (e) { return _this.mapOrphanedEvent(e); });
	        // filter out any delete events... (as have no conversationId)
	        var filtered = mapped.filter(function (e) { return e.conversationId !== undefined; });
	        // add them into the store 
	        return utils_1.Utils.eachSeries(filtered, function (event) {
	            return _this._orphanedEventManager.addOrphanedEvent(event);
	        })
	            .then(function (done) {
	            // get the store 
	            return _this._orphanedEventManager.getOrphanedEvents(conversationId);
	        });
	    };
	    /**
	     * Function to iterate through a bunch of messages and mark as delivered as appropriate - NOTE: this is automatically called by  AppMessaging.getMessages()
	     * @method MessagePager#markMessagesAsDelivered
	     * @param {string} id - the conversationId
	     * @param {Object[]} messages - the messages to check
	     * @param {string} uerId - the userId
	     * @returns {Promise}
	     */
	    MessagePager.prototype.markMessagesAsDelivered = function (id, messages, userId) {
	        var messageIds = [];
	        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
	            var message = messages_1[_i];
	            // only look at messages that I haven't sent ...
	            if (message.context && message.context.from && message.context.from.id !== userId) {
	                var alreadyDelivered = false;
	                if (message.statusUpdates && message.statusUpdates[userId]) {
	                    // status will be delivered then read i.e. if read, it was delivered
	                    if (message.statusUpdates[userId].status === "delivered" ||
	                        message.statusUpdates[userId].status === "read") {
	                        alreadyDelivered = true;
	                    }
	                }
	                if (!alreadyDelivered) {
	                    messageIds.unshift(message.id);
	                }
	            }
	        }
	        if (messageIds.length > 0) {
	            var statusUpdate = {
	                messageIds: messageIds,
	                status: "delivered",
	                timestamp: new Date().toISOString()
	            };
	            return this._messageManager.sendMessageStatusUpdates(id, [statusUpdate]);
	        }
	        else {
	            // TODO: status update response id currently "OK" ROFL ...
	            return Promise.resolve("OK");
	        }
	    };
	    /**
	     * Method to reset any cached info abut a conversation
	     */
	    MessagePager.prototype.resetConversation = function (conversationId) {
	        return this._orphanedEventManager.clear(conversationId);
	    };
	    /**
	     * Orphaned events must be applied in ascending order, so if we want to loop backwards through these they need to be sorted
	     * by id descending
	     */
	    MessagePager.prototype.applyOrphanedEvents = function (messages, orphanedEvents) {
	        var _this = this;
	        return utils_1.Utils.eachSeries(orphanedEvents, function (event) {
	            if (_this.playEvent(event, messages)) {
	                _this._logger.log("succesfuly played event " + event.conversationEventId);
	                return _this._orphanedEventManager.removeOrphanedEvent(event);
	            }
	            else {
	                _this._logger.warn("failed to play event " + event.conversationEventId, event);
	                return Promise.resolve(false);
	            }
	        });
	    };
	    /**
	     *
	     */
	    MessagePager.prototype.playEvent = function (event, messages) {
	        var played = false;
	        // find message in array
	        var found = messages.filter(function (message) { return message.id === event.payload.messageId; });
	        var message;
	        if (found.length === 1) {
	            message = found[0];
	            played = true;
	        }
	        else if (found.length >= 1) {
	            this._logger.error("Found more than 1 message with same messageId: " + event.payload.messageId);
	        }
	        else {
	            this._logger.log("Message " + event.payload.messageId + " not found ...");
	        }
	        switch (event.name) {
	            case "conversationMessage.read":
	                {
	                    if (message) {
	                        // apply status update - read overwrites delivered
	                        message.statusUpdates[event.payload.profileId] = {
	                            "status": "read",
	                            "on": event.payload.timestamp
	                        };
	                    }
	                }
	                break;
	            case "conversationMessage.delivered":
	                {
	                    if (message) {
	                        // apply status update - read overwrites delivered
	                        var updateForProfileId = message.statusUpdates[event.payload.profileId];
	                        if (updateForProfileId && updateForProfileId.status === "read") {
	                            this._logger.log("Message already marked as read, not marking as delivered");
	                        }
	                        else {
	                            message.statusUpdates[event.payload.profileId] = {
	                                "status": "delivered",
	                                "on": event.payload.timestamp
	                            };
	                        }
	                    }
	                }
	                break;
	            default:
	                this._logger.error("Unknown eventName " + event.name + " for messageId: " + event.payload.messageId);
	                break;
	        }
	        return played;
	    };
	    /*
	        An event from the websocket / event api ...
	        ============================================
	        {
	            "eventId": "4ea0489c-5bab-42e2-883c-5545f8444b80",
	            "name": "conversationMessage.delivered",
	            "conversationId": "7489e390-62b4-4812-a866-ea9499f7e28e",
	            "conversationEventId": 3,
	            "payload": {
	                "messageId": "4a0fbb0f-7693-47a8-9628-18bef4c69f10",
	                "conversationId": "7489e390-62b4-4812-a866-ea9499f7e28e",
	                "isPublicConversation": false,
	                "profileId": "alex",
	                "timestamp": "2016-11-08T12:25:24.774Z"
	            }
	        }


	        An orphaned event ...
	        ======================
	        {
	            "id": 54,
	            "data": {
	                "name": "delivered",
	                "payload": {
	                    "messageId": "3008c899-c18d-410a-884e-c10a51632d3b",
	                    "conversationId": "bc24d5b0-b03c-4594-872b-510c4af81dfe",
	                    "isPublicConversation": false,
	                    "profileId": "alex",
	                    "timestamp": "2016-11-08T12:48:53.088Z"
	                },
	                "eventId": "8605dbd1-6a10-4405-8966-1eb7dfaefea4",
	                "profileId": "alex"
	            }
	        }
	     */
	    MessagePager.prototype.mapOrphanedEvent = function (event) {
	        var mapped = {};
	        mapped.conversationEventId = event.id;
	        mapped.name = "conversationMessage." + event.data.name;
	        mapped.eventId = event.data.eventId;
	        mapped.conversationId = event.data.payload.conversationId;
	        mapped.payload = event.data.payload;
	        return mapped;
	    };
	    return MessagePager;
	}());
	MessagePager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.OrphanedEventManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object])
	], MessagePager);
	exports.MessagePager = MessagePager;
	//# sourceMappingURL=messagePager.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var AppMessaging = (function () {
	    /**
	     * AppMessaging class constructor.
	     * @class  AppMessaging
	     * @classdesc Class that implements AppMessaging
	     * @param {INetworkManager} networkManager
	     * @param {IConversationManager} conversationManager
	     * @param {IMessageManager} messageManager
	     */
	    function AppMessaging(_networkManager, _conversationManager, _messageManager, _messagePager, _contentManager) {
	        this._networkManager = _networkManager;
	        this._conversationManager = _conversationManager;
	        this._messageManager = _messageManager;
	        this._messagePager = _messagePager;
	        this._contentManager = _contentManager;
	    }
	    /**
	     * Function to create a conversation
	     * @method AppMessaging#createConversation
	     * @param {IConversationDetails} conversationDetails - the conversation details (use `ConversationBuilder` to create this)
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.createConversation = function (conversationDetails) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.createConversation(conversationDetails);
	        });
	    };
	    /**
	     * Function to update a conversation
	     * @method AppMessaging#updateConversation
	     * @param {IConversationDetails} conversationDetails - the conversation details (use `ConversationBuilder` to create this)
	     * @param {string} [eTag] - the eTag
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.updateConversation = function (conversationDetails, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.updateConversation(conversationDetails, eTag);
	        });
	    };
	    /**
	     * Function to get a conversation
	     * @method AppMessaging#getConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.getConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getConversation(conversationId);
	        });
	    };
	    /**
	     * Function to delete a conversation
	     * @method AppMessaging#deleteConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.deleteConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.deleteConversation(conversationId);
	        })
	            .then(function (deleted) {
	            return _this._messagePager.resetConversation(conversationId);
	        });
	    };
	    /**
	     * Function to add participants to a conversation
	     * @method AppMessaging#addParticipantsToConversation
	     * @param {string} conversationId
	     * @param {IConversationParticipant[]} participants
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.addParticipantsToConversation = function (conversationId, participants) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.addParticipantsToConversation(conversationId, participants);
	        });
	    };
	    /**
	     * Function to remove participants to a conversation
	     * @method AppMessaging#deleteParticipantsFromConversation
	     * @param {string} conversationId
	     * @param {string[]} participants
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.deleteParticipantsFromConversation(conversationId, participants);
	        });
	    };
	    /**
	     * Function to get participantss in a conversation
	     * @method AppMessaging#getParticipantsInConversation
	     * @param {string} conversationId
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.getParticipantsInConversation = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getParticipantsInConversation(conversationId);
	        });
	    };
	    /**
	     * Function to get all conversations  the user is a participant in
	     * @method AppMessaging#getConversations
	     * @param {ConversationScope} [scope] - the conversation scope ["`public`"|"`participant`"]
	     * @param {string} [profileId] - The profileId to search with
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.getConversations = function (scope, profileId) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.getConversations(scope, profileId);
	        });
	    };
	    /**
	     * Function to get events from a conversation
	     * @method AppMessaging#getConversationEvents
	     * @param {string} conversationId - the conversation Id
	     * @param {number} from - the event Id to start from
	     * @param {number} limit - the maximum number of events to retrievee
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.getConversationEvents = function (conversationId, from, limit) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._messageManager.getConversationEvents(conversationId, from, limit);
	        });
	    };
	    /**
	     * Function to send a message to a conversation
	     * @method AppMessaging#sendMessageToConversation
	     * @param {string} conversationId  - the conversation Id
	     * @param {IConversationMessage} - the message to send (Use `MessageBuilder` to create a message)
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.sendMessageToConversation = function (conversationId, message) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._messageManager.sendMessageToConversation(conversationId, message);
	        });
	    };
	    /**
	     * Function to sent message status udates for messages in a conversation
	     * @method AppMessaging#sendMessageStatusUpdates
	     * @param {string} conversationId  - the conversation Id
	     * @param {IMessageStatus[]} statuses -  the message statuses (Use `MessageStatusBuilder` to create the status objects)
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.sendMessageStatusUpdates = function (conversationId, statuses) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._messageManager.sendMessageStatusUpdates(conversationId, statuses);
	        });
	    };
	    /**
	     * Get a page of messages, internally deal with orphaned events etc ...
	     * @method AppMessaging#getMessages
	     * @param {string} id - the conversationId
	     * @param {number} pageSize - the page size
	     * @param {number} [continuationToken] - the continuation token (optional - if not specified then retrieve from the end)
	     * @returns {Promise<IGetMessagesResponse>}
	     */
	    AppMessaging.prototype.getMessages = function (conversationId, pageSize, continuationToken) {
	        var _this = this;
	        var profileId;
	        var _getMessagesResponse;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            profileId = sessionInfo.session.profileId;
	            return _this._messagePager.getMessages(conversationId, pageSize, continuationToken);
	        })
	            .then(function (getMessagesResponse) {
	            _getMessagesResponse = getMessagesResponse;
	            return _this._messagePager.markMessagesAsDelivered(conversationId, getMessagesResponse.messages, profileId);
	        })
	            .then(function (markDeliveredresponse) {
	            return Promise.resolve(_getMessagesResponse);
	        });
	    };
	    /**
	     * Function to send typing event to a conversation
	     * @method AppMessaging#sendIsTyping
	     * @param {string} conversationId - the conversation Id
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.sendIsTyping = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.sendIsTyping(conversationId);
	        });
	    };
	    /**
	     * Function to send typing off event to a conversation
	     * @method AppMessaging#sendIsTypingOff
	     * @param {string} conversationId - the conversation Id
	     * @returns {Promise}
	     */
	    AppMessaging.prototype.sendIsTypingOff = function (conversationId) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._conversationManager.sendIsTypingOff(conversationId);
	        });
	    };
	    /**
	     * Method to upload content data
	     * @method AppMessaging#uploadContent
	     * @param {ContentData} content - the content
	     * @returns {IUploadContentResult} - the result
	     */
	    AppMessaging.prototype.uploadContent = function (content, folder) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._contentManager.uploadContent(content, folder);
	        });
	    };
	    return AppMessaging;
	}());
	AppMessaging = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ConversationManager)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.MessageManager)),
	    __param(3, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.MessagePager)),
	    __param(4, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ContentManager)),
	    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
	], AppMessaging);
	exports.AppMessaging = AppMessaging;
	//# sourceMappingURL=appMessaging.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var utils_1 = __webpack_require__(5);
	var interfaceSymbols_1 = __webpack_require__(10);
	var Profile = (function () {
	    /**
	     * Profile class constructor.
	     * @class Profile
	     * @classdesc Class that implements Profile.
	     * @parameter {INetworkManager} _networkManager
	     * @parameter {ILocalStorageData} localStorageData
	     * @parameter {IProfileManager} profileManager
	     */
	    function Profile(_networkManager, _localStorage, _profileManager) {
	        this._networkManager = _networkManager;
	        this._localStorage = _localStorage;
	        this._profileManager = _profileManager;
	    }
	    /**
	     * Get a profile
	     * @method Profile#getProfile
	     * @param {string} profileId - The id of the profile  to get
	     * @returns {Promise} - returns a Promise
	     */
	    Profile.prototype.getProfile = function (profileId) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._profileManager.getProfile(profileId);
	        });
	    };
	    /**
	     * Function to query for a list of profiles matching the search criteria
	     * @method Profile#queryProfiles
	     * @param {string} [query] - See <a href="https://www.npmjs.com/package/mongo-querystring">mongo-querystring</a> for query syntax.
	     * @returns {Promise}
	     */
	    Profile.prototype.queryProfiles = function (query) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._profileManager.queryProfiles(query);
	        });
	    };
	    /**
	     * Function to update a profile
	     * @method Profile#updateProfile
	     * @param {string} profileId - the id of the profile to update
	     * @param {any} profile - the profile to update
	     * @param {string} [eTag] - the eTag (returned in headers from getProfile())
	     * @returns {Promise}
	     */
	    Profile.prototype.updateProfile = function (profileId, profile, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._profileManager.updateProfile(profileId, profile, eTag);
	        });
	    };
	    /**
	     * Function to patch a profile
	     * @method Profile#updateProfile
	     * @param {string} profileId - the id of the profile to update
	     * @param {any} profile - the profile to patch
	     * @param {string} [eTag] - the eTag (returned in headers from getProfile())
	     * @returns {Promise}
	     */
	    Profile.prototype.patchProfile = function (profileId, profile, eTag) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._profileManager.patchProfile(profileId, profile, eTag);
	        });
	    };
	    /**
	     * Get current user's profile
	     * @method Profile#getMyProfile
	     * @param {boolean} [useEtag=true] - Whether to use eTags to maintain consistency of profile data (defaults to true)
	     * @returns {Promise} - returns a Promise
	     */
	    Profile.prototype.getMyProfile = function (useEtag) {
	        var _this = this;
	        if (useEtag === void 0) { useEtag = true; }
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._profileManager.getProfile(sessionInfo.session.profileId);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", utils_1.Utils.getHeaderValue(result.headers, "ETag"));
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Update current user's profile
	     * @method Profile#updateMyProfile
	     * @param {any} profile - the profile of the logged in user to update
	     * @param {boolean} [useEtag=true] - Whether to use eTags to maintain consistency of profile data (defaults to true)
	     * @returns {Promise} - returns a Promise
	     */
	    Profile.prototype.updateMyProfile = function (profile, useEtag) {
	        var _this = this;
	        if (useEtag === void 0) { useEtag = true; }
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return Promise.all([sessionInfo, _this.getMyProfileETag(useEtag)]);
	        })
	            .then(function (_a) {
	            var sessionInfo = _a[0], eTag = _a[1];
	            return _this._profileManager.updateProfile(sessionInfo.session.profileId, profile, eTag);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", utils_1.Utils.getHeaderValue(result.headers, "ETag"));
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     * Patch current user's profile
	     * @method Profile#patchMyProfile
	     * @param {any} profile - the profile of the logged in user to update
	     * @returns {Promise} - returns a Promise
	     */
	    Profile.prototype.patchMyProfile = function (profile, useEtag) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return Promise.all([sessionInfo, _this.getMyProfileETag(useEtag)]);
	        })
	            .then(function (_a) {
	            var sessionInfo = _a[0], eTag = _a[1];
	            return _this._profileManager.patchProfile(sessionInfo.session.profileId, profile, eTag);
	        })
	            .then(function (result) {
	            if (useEtag) {
	                _this._localStorage.setString("MyProfileETag", utils_1.Utils.getHeaderValue(result.headers, "ETag"));
	            }
	            return Promise.resolve(result.response);
	        });
	    };
	    /**
	     *
	     * @param useEtag
	     */
	    Profile.prototype.getMyProfileETag = function (useEtag) {
	        if (useEtag) {
	            return this._localStorage.getString("MyProfileETag");
	        }
	        else {
	            return Promise.resolve(undefined);
	        }
	    };
	    return Profile;
	}());
	Profile = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.LocalStorageData)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ProfileManager)),
	    __metadata("design:paramtypes", [Object, Object, Object])
	], Profile);
	exports.Profile = Profile;
	//# sourceMappingURL=profile.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var Services = (function () {
	    /**
	     * Services class constructor.
	     * @class Services
	     * @classdesc Class that implements Services interface
	     * @parameter {AppMessaging} _appMessaging
	     * @parameter {Profile} _profile
	     */
	    function Services(_appMessaging, _profile) {
	        this._appMessaging = _appMessaging;
	        this._profile = _profile;
	    }
	    Object.defineProperty(Services.prototype, "appMessaging", {
	        /**
	         * Method to get AppMessaging interface
	         * @method Services#appMessaging
	         * @returns {AppMessaging} - Returns AppMessaging interface
	         */
	        get: function () {
	            return this._appMessaging;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Services.prototype, "profile", {
	        /**
	         * Method to get Profile interface
	         * @method Services#profile
	         * @returns {Profile} - Returns Profile interface
	         */
	        get: function () {
	            return this._profile;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Services;
	}());
	Services = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.AppMessaging)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Profile)),
	    __metadata("design:paramtypes", [Object, Object])
	], Services);
	exports.Services = Services;
	//# sourceMappingURL=services.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var Device = (function () {
	    /**
	     * Device class constructor.
	     * @class Device
	     * @classdesc Class that implements Device related functionality.
	     * @parameter {INetworkManager} _networkManager
	     * @parameter {IDeviceManager} deviceManager
	     */
	    function Device(_networkManager, _deviceManager) {
	        this._networkManager = _networkManager;
	        this._deviceManager = _deviceManager;
	    }
	    /**
	     * Function to set FCM push details for the current session
	     * @method Device#setFCMPushDetails
	     * @param {string} packageName - the andriod package name of your cordova app
	     * @param {string} registrationId - the push registration id
	     * @returns {Promise} - Returns a promise
	     */
	    Device.prototype.setFCMPushDetails = function (packageName, registrationId) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._deviceManager.setFCMPushDetails(sessionInfo.session.id, packageName, registrationId);
	        });
	    };
	    /**
	     * Function to set APNS push details for the current session
	     * @method Device#setAPNSPushDetails
	     * @param {string} bundleId - the iOS bundleId of your cordova app
	     * @param {Environment} environment - the environment ["`development`"|"`production`"]
	     * @param {string} token
	     * @returns {Promise} - Returns a promise
	     */
	    Device.prototype.setAPNSPushDetails = function (bundleId, environment, token) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._deviceManager.setAPNSPushDetails(sessionInfo.session.id, bundleId, environment, token);
	        });
	    };
	    /**
	     * Function to remove push details for the current session
	     * @method Device#removePushDetails
	     * @returns {Promise} - Returns a promise
	     */
	    Device.prototype.removePushDetails = function () {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._deviceManager.removePushDetails(sessionInfo.session.id);
	        });
	    };
	    return Device;
	}());
	Device = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.DeviceManager)),
	    __metadata("design:paramtypes", [Object, Object])
	], Device);
	exports.Device = Device;
	//# sourceMappingURL=device.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var Channels = (function () {
	    /**
	     * Channels class constructor.
	     * @class Channels
	     * @classdesc Class that implements Channels interface
	     * @parameter {NetworkManager} networkManager
	     * @parameter {IFacebookManager} facebookManager
	     */
	    function Channels(_networkManager, _facebookManager) {
	        this._networkManager = _networkManager;
	        this._facebookManager = _facebookManager;
	    }
	    /**
	     * Method to create opt in state for facebook messenger
	     * @method Channels#createFbOptInState
	     * @param {any} [data] - the data to post
	     */
	    Channels.prototype.createFbOptInState = function (data) {
	        var _this = this;
	        return this._networkManager.ensureSession()
	            .then(function (sessionInfo) {
	            return _this._facebookManager.createSendToMessengerState(data);
	        });
	    };
	    return Channels;
	}());
	Channels = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.FacebookManager)),
	    __metadata("design:paramtypes", [Object, Object])
	], Channels);
	exports.Channels = Channels;
	//# sourceMappingURL=channels.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var EventMapper = (function () {
	    function EventMapper() {
	    }
	    EventMapper.prototype.conversationDeleted = function (event) {
	        return {
	            conversationId: event.conversationId,
	            createdBy: event.context.createdBy,
	            timestamp: event.publishedOn,
	        };
	    };
	    EventMapper.prototype.conversationUndeleted = function (event) {
	        return {
	            conversationId: event.conversationId,
	            createdBy: event.context.createdBy,
	            timestamp: event.publishedOn,
	        };
	    };
	    EventMapper.prototype.conversationUpdated = function (event) {
	        return {
	            conversationId: event.conversationId,
	            // the user who updated the conversation
	            createdBy: event.context.createdBy,
	            description: event.payload.description,
	            eTag: event.etag,
	            isPublic: event.payload.isPublic,
	            name: event.payload.name,
	            roles: event.payload.roles,
	            timestamp: event.publishedOn,
	        };
	    };
	    EventMapper.prototype.participantAdded = function (event) {
	        return {
	            conversationId: event.conversationId,
	            createdBy: event.context.createdBy,
	            profileId: event.payload.profileId,
	            role: event.payload.role,
	            timestamp: event.publishedOn,
	        };
	    };
	    EventMapper.prototype.participantRemoved = function (event) {
	        return {
	            conversationId: event.conversationId,
	            createdBy: event.context.createdBy,
	            profileId: event.payload.profileId,
	            timestamp: event.publishedOn,
	        };
	    };
	    EventMapper.prototype.participantTyping = function (event) {
	        return {
	            conversationId: event.payload.conversationId,
	            createdBy: event.context.createdBy,
	            profileId: event.payload.profileId,
	            timestamp: event.publishedOn,
	        };
	    };
	    EventMapper.prototype.participantTypingOff = function (event) {
	        return {
	            conversationId: event.payload.conversationId,
	            createdBy: event.context.createdBy,
	            profileId: event.payload.profileId,
	            timestamp: event.publishedOn,
	        };
	    };
	    EventMapper.prototype.conversationMessageSent = function (event) {
	        return {
	            conversationEventId: event.conversationEventId,
	            conversationId: event.payload.context.conversationId,
	            eventId: event.eventId,
	            name: "conversationMessage.sent",
	            payload: {
	                alert: event.payload.alert,
	                context: event.payload.context,
	                messageId: event.payload.messageId,
	                metadata: event.payload.metadata,
	                parts: event.payload.parts,
	            }
	        };
	    };
	    EventMapper.prototype.conversationMessageRead = function (event) {
	        return {
	            conversationEventId: event.conversationEventId,
	            conversationId: event.payload.conversationId,
	            eventId: event.eventId,
	            name: "conversationMessage.read",
	            payload: {
	                conversationId: event.payload.conversationId,
	                messageId: event.payload.messageId,
	                profileId: event.payload.profileId,
	                timestamp: event.payload.timestamp
	            }
	        };
	    };
	    EventMapper.prototype.conversationMessageDelivered = function (event) {
	        return {
	            conversationEventId: event.conversationEventId,
	            conversationId: event.payload.conversationId,
	            eventId: event.eventId,
	            name: "conversationMessage.delivered",
	            payload: {
	                conversationId: event.payload.conversationId,
	                messageId: event.payload.messageId,
	                profileId: event.payload.profileId,
	                timestamp: event.payload.timestamp
	            }
	        };
	    };
	    EventMapper.prototype.profileUpdated = function (event) {
	        return {
	            eTag: event.eTag,
	            profile: event.payload
	        };
	    };
	    return EventMapper;
	}());
	EventMapper = __decorate([
	    inversify_1.injectable()
	], EventMapper);
	exports.EventMapper = EventMapper;
	//# sourceMappingURL=eventMapper.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var inversify_1 = __webpack_require__(14);
	var interfaceSymbols_1 = __webpack_require__(10);
	var utils_1 = __webpack_require__(5);
	var ContentManager = (function () {
	    /**
	     * ContentManager class constructor.
	     * @class ContentManager
	     * @ignore
	     * @classdesc Class that implements all the ContentManager functionality.
	     * @parameter {ILogger} logger
	     * @parameter {IRestClient} restClient
	     * @parameter {IComapiConfig} ComapiConfig
	     */
	    function ContentManager(_logger, networkManager, _comapiConfig) {
	        this._logger = _logger;
	        this.networkManager = networkManager;
	        this._comapiConfig = _comapiConfig;
	    }
	    /**
	     * Method to upload content data
	     * @method ContentManager#uploadContent
	     * @param {string} folder - the folder
	     * @param {ContentData} content - the content
	     * @returns {IUploadContentResult} - the result
	     */
	    ContentManager.prototype.uploadContent = function (content, folder) {
	        var _this = this;
	        var url = utils_1.Utils.format(this._comapiConfig.foundationRestUrls.content, {
	            apiSpaceId: this._comapiConfig.apiSpaceId,
	            urlBase: this._comapiConfig.urlBase,
	        });
	        return this.networkManager.getValidToken()
	            .then(function (token) {
	            return new Promise(function (resolve, reject) {
	                var xhr = new XMLHttpRequest();
	                xhr.open("POST", url);
	                xhr.setRequestHeader("authorization", _this.constructAUthHeader(token));
	                var body;
	                if (content.file) {
	                    var fd = new FormData();
	                    fd.append("file", content.file);
	                    body = fd;
	                }
	                else {
	                    xhr.setRequestHeader("Content-Type", "application/json");
	                    body = JSON.stringify({
	                        data: content.data,
	                        name: content.name,
	                        type: content.type
	                    });
	                }
	                xhr.send(body);
	                xhr.onload = function () {
	                    var response;
	                    try {
	                        response = JSON.parse(xhr.responseText);
	                        if (_this._logger) {
	                            _this._logger.log("uploadContent() returned this object: ", response);
	                        }
	                    }
	                    catch (e) {
	                        if (_this._logger) {
	                            _this._logger.log("uploadContent returned this text: " + xhr.responseText);
	                        }
	                        reject(xhr.responseText);
	                    }
	                    if (xhr.status === 200) {
	                        resolve(response);
	                    }
	                    else {
	                        reject(response);
	                    }
	                };
	                xhr.onerror = function () {
	                    reject(xhr.responseText);
	                };
	                xhr.onabort = function () {
	                    reject(xhr.responseText);
	                };
	                xhr.onprogress = function (evt) {
	                    if (evt.lengthComputable) {
	                        var percentComplete = (evt.loaded / evt.total) * 100;
	                        if (_this._logger) {
	                            _this._logger.log("onprogress: " + percentComplete + " %");
	                        }
	                    }
	                };
	            });
	        });
	    };
	    /**
	     * Method to create an auth header from a token
	     * @method ContentManager#constructAUthHeader
	     * @param {string} token
	     * @returns {string} - returns the auth header
	     */
	    ContentManager.prototype.constructAUthHeader = function (token) {
	        return "Bearer " + token;
	    };
	    return ContentManager;
	}());
	ContentManager = __decorate([
	    inversify_1.injectable(),
	    __param(0, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.Logger)),
	    __param(1, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.NetworkManager)),
	    __param(2, inversify_1.inject(interfaceSymbols_1.INTERFACE_SYMBOLS.ComapiConfig)),
	    __metadata("design:paramtypes", [Object, Object, Object])
	], ContentManager);
	exports.ContentManager = ContentManager;
	//# sourceMappingURL=contentManager.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/*
	 * Helper class to create the content
	 */
	var ContentData = (function () {
	    /**
	     * ContentData class constructor.
	     * @class ContentData
	     * @classdesc Class that implements Content Data.
	     */
	    /* tslint:disable:no-empty */
	    function ContentData() {
	    }
	    /**
	     * Static method that creates and initialises a ContentData instance from a File object
	     * @param {File} file - the file object
	     * @returns {ContentData}
	     */
	    ContentData.createFromFile = function (file) {
	        return new ContentData().initFromFile(file);
	    };
	    /**
	     * Static method that creates and initialises a ContentData instance from raw base64 data
	     * @param {string} data - the base64 data
	     * @param {string} name - the name of the attachment
	     * @param {string} type - the type of attachment
	     * @returns {ContentData}
	     */
	    ContentData.createFromBase64 = function (data, name, type) {
	        return new ContentData().initFromBase64Data(data, name, type);
	    };
	    /* tslint:enable:no-empty */
	    /**
	     * Method that initialises a ContentData instance from a File object
	     * @method ContentData#initFromFile
	     * @param {File} file - the file object
	     * @returns {ContentData}
	     */
	    ContentData.prototype.initFromFile = function (file) {
	        this.file = file;
	        return this;
	    };
	    /**
	     * Method that initialises a ContentData instance from raw base64 data
	     * @method ContentData#initFromBase64Data
	     * @param {string} data - the base64 data
	     * @param {string} name - the name of the attachment
	     * @param {string} type - the type of attachment
	     * @returns {ContentData}
	     */
	    ContentData.prototype.initFromBase64Data = function (data, name, type) {
	        this.data = data;
	        this.name = name;
	        this.type = type;
	        return this;
	    };
	    return ContentData;
	}());
	exports.ContentData = ContentData;
	//# sourceMappingURL=contentData.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports) {

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

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var sdk_js_foundation_1 = __webpack_require__(1);
	var sdk_js_foundation_2 = __webpack_require__(1);
	var MessagingService = (function () {
	    /**
	     * MessagingService class constructor.
	     * @class MessagingService
	     * @classdesc MessagingService Class
	     */
	    function MessagingService(_foundation, _config) {
	        this._foundation = _foundation;
	        this._config = _config;
	        this._mutex = new sdk_js_foundation_1.Mutex();
	        this._isInitialised = false;
	        this._isInitialising = false;
	    }
	    /**
	     * Method to initialise Comapi Chat Layer
	     * 1) Initialise foundation interface
	     * 2) Wire up event handlers
	     * 3) Synchronise
	     * @param {IComapiChatConfig} config - the config
	     * @method MessagingService#initialise
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.initialise = function (config) {
	        var _this = this;
	        if (!this._isInitialised && !this._isInitialising) {
	            this._isInitialising = true;
	            this._foundation.logger.log("initialise(" + config + ")");
	            this._foundation.on("conversationMessageEvent", function (event) { _this.onConversationMessageEvent(event); });
	            this._foundation.on("conversationDeleted", function (event) { _this.onConversationDeleted(event); });
	            this._foundation.on("conversationUpdated", function (event) { _this.onConversationUpdated(event); });
	            this._foundation.on("participantAdded", function (event) { _this.onParticipantAdded(event); });
	            this._foundation.on("participantRemoved", function (event) { _this.onParticipantRemoved(event); });
	            this._foundation.on("WebsocketOpened", function (event) { _this.onWebsocketOpened(event); });
	            this._foundation.on("WebsocketClosed", function (event) { _this.onWebsocketClosed(event); });
	            return this.synchronize()
	                .then(function (result) {
	                _this._isInitialising = false;
	                _this._isInitialised = true;
	                return result;
	            });
	        }
	        else {
	            return Promise.resolve(false);
	        }
	    };
	    /**
	     * Method to uninitialise Comapi Chat Layer
	     * 1) cancel event subscriptions
	     */
	    MessagingService.prototype.uninitialise = function () {
	        this._foundation.logger.log("uninitialise()");
	        this._foundation.off("conversationMessageEvent");
	        this._foundation.off("conversationDeleted");
	        this._foundation.off("conversationUpdated");
	        this._foundation.off("participantAdded");
	        this._foundation.off("participantRemoved");
	        this._isInitialised = false;
	        return Promise.resolve(true);
	    };
	    /**
	     * Method to Synchronise Chat layer - locally stored conversations will be reconciled against Comapi and updated appropriately.
	     * @param {ConversationScope} [scope] - The Conversation Scope
	     * @method MessagingService#synchronize
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.synchronize = function (scope) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            var remoteConversations;
	            var localConversations;
	            var syncInfo;
	            // Will explicitly start a session prior to calling getConversations so I can get the session info ...
	            // I am interested in the profileId of the user  ...
	            return _this._foundation.startSession()
	                .then(function (session) {
	                // 1) get list of conversations from comapi
	                return _this._foundation.services.appMessaging.getConversations(scope);
	            })
	                .then(function (conversations) {
	                remoteConversations = conversations;
	                // 2) get list from IConversationStore
	                return _this._config.conversationStore.getConversations();
	            })
	                .then(function (conversations) {
	                // take a copy of this as we don't want it getting modified when we add/remove using the store ;-)
	                localConversations = conversations.slice();
	                syncInfo = _this.getConversationSyncInfo(remoteConversations, localConversations);
	                return sdk_js_foundation_2.Utils.eachSeries(syncInfo.deleteArray, function (conversationId) {
	                    return _this._config.conversationStore.deleteConversation(conversationId)
	                        .then(function (deleted) {
	                        // Remove the conversation from from localConversations
	                        for (var i = localConversations.length - 1; i >= 0; i--) {
	                            if (localConversations[i].id === conversationId) {
	                                localConversations.splice(i, 1);
	                            }
	                        }
	                        return deleted;
	                    });
	                });
	            })
	                .then(function (result) {
	                // 3) Add new ones
	                return sdk_js_foundation_2.Utils.eachSeries(syncInfo.addArray, function (conversation) {
	                    return _this._config.conversationStore.createConversation(conversation);
	                });
	            })
	                .then(function (result) {
	                // 4) Update existing ones that have changed
	                return sdk_js_foundation_2.Utils.eachSeries(syncInfo.updateArray, function (conversation) {
	                    return _this._config.conversationStore.updateConversation(conversation);
	                });
	            })
	                .then(function (result) {
	                // Add the new conversations to the localConversations array ...
	                // TODO: the orig. call to _store.getConversations() returned  reference (in my memoryStore sample)
	                // the dDB version wont do that ....
	                // a) mem version returns a copy 
	                for (var _i = 0, _a = syncInfo.addArray; _i < _a.length; _i++) {
	                    var newConv = _a[_i];
	                    localConversations.push(newConv);
	                }
	                localConversations.sort(function (a, b) {
	                    var left = Number(new Date(a.lastMessageTimestamp));
	                    var right = Number(new Date(b.lastMessageTimestamp));
	                    return (true) ? right - left : left - right;
	                });
	                // we will just pick the first _lazyLoadThreshold from the ordered array to synchronise
	                var syncSet = localConversations.slice(0, _this._config.lazyLoadThreshold);
	                // 4) Sync conversation messages 
	                return sdk_js_foundation_2.Utils.eachSeries(syncSet, function (conversation) {
	                    return _this.synchronizeConversation(conversation);
	                });
	            })
	                .then(function () {
	                return true;
	            });
	        }, "synchronize");
	    };
	    /**
	     * Method to request the previous page of messages for a given conversation.
	     * After the Promise has been resolved, the messages will be in the supplied conversation store (if available)
	     * @method MessagingService#getPreviousMessages
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.getPreviousMessages = function (conversationId) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this._config.conversationStore.getConversation(conversationId)
	                .then(function (conversation) {
	                return conversation.continuationToken > 0 ? _this.getMessages(conversation) : Promise.resolve(false);
	            });
	        }, "getPreviousMessages");
	    };
	    /**
	     * Method to return a list of all the conversations a user is part of.
	     * This is designed to to power a master conversation view.
	     * @method MessagingService#getConversations
	     * @returns {Promise<IChatConversation[]>}
	     */
	    MessagingService.prototype.getConversations = function () {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this._config.conversationStore.getConversations();
	        }, "getConversations");
	    };
	    /**
	     * Method to get conversation info to render a detail view.
	     * - will return messages, conversation info and participant info.
	     * - Conversation will be synchronised if necessary during this call.
	     * @param {string} conversationId - the  id of the conversation to retrieved
	     * @method MessagingService#getConversationInfo
	     * @returns {Promise<IChatConversationInfo>} returns an IChatConversationInfo object via a promise
	     */
	    MessagingService.prototype.getConversationInfo = function (conversationId) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            var _conversation;
	            var _messages;
	            var _participants;
	            return _this._config.conversationStore.getConversation(conversationId)
	                .then(function (conversation) {
	                _conversation = conversation;
	                if (_conversation) {
	                    // do we need to initialise ?
	                    if (_conversation.latestLocalEventId === undefined ||
	                        // or do we need to sync ?
	                        _conversation.latestLocalEventId < _conversation.latestRemoteEventId) {
	                        return _this.synchronizeConversation(conversation);
	                    }
	                    else {
	                        return Promise.resolve(true);
	                    }
	                }
	                else {
	                    return Promise.resolve(false);
	                }
	            })
	                .then(function (result) {
	                return _conversation ? _this._config.conversationStore.getMessages(conversationId) : null;
	            })
	                .then(function (messages) {
	                _messages = messages;
	                return _conversation ? _this._foundation.services.appMessaging.getParticipantsInConversation(conversationId) : null;
	            })
	                .then(function (participants) {
	                _participants = participants;
	                return _conversation ? {
	                    conversation: _conversation,
	                    messages: _messages,
	                    participants: _participants
	                } : null;
	            });
	        }, "getConversationInfo");
	    };
	    /**
	     * Method to send a text message to a conversation
	     * @param {string} conversationId - the conversation id
	     * @param {string} text - the message text
	     * @method MessagingService#sendMessage
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.sendTextMessage = function (conversationId, text) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            var message = new sdk_js_foundation_1.MessageBuilder().withText(text);
	            return _this._foundation.services.appMessaging.sendMessageToConversation(conversationId, message)
	                .then(function (result) {
	                var m = {
	                    conversationId: conversationId,
	                    id: result.id,
	                    metadata: message.metadata,
	                    parts: message.parts,
	                    senderId: _this._foundation.session && _this._foundation.session.profileId || undefined,
	                    senderName: undefined,
	                    sentEventId: result.eventId,
	                    sentOn: new Date().toISOString(),
	                    statusUpdates: {}
	                };
	                return _this._config.conversationStore.createMessage(m);
	            });
	        }, "sendTextMessage");
	    };
	    /**
	     * Method to send a message to a conversation
	     * @param {string} conversationId - the conversation id
	     * @param {IConversationMessage} message - the message text
	     * @method MessagingService#sendMessage
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.sendMessage = function (conversationId, message) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this._foundation.services.appMessaging.sendMessageToConversation(conversationId, message)
	                .then(function (result) {
	                var m = {
	                    conversationId: conversationId,
	                    id: result.id,
	                    metadata: message.metadata,
	                    parts: message.parts,
	                    senderId: _this._foundation.session && _this._foundation.session.profileId || undefined,
	                    senderName: undefined,
	                    sentEventId: result.eventId,
	                    sentOn: new Date().toISOString(),
	                    statusUpdates: {}
	                };
	                return _this._config.conversationStore.createMessage(m);
	            });
	        }, "sendMessage");
	    };
	    /**
	     * Method to create an attachment via the content api, create a message part(s) using the attachment url and the optional message
	     * @param {string} conversationId - the conversationId
	     * @param {IContentData} contentData  - the Content Data
	     * @param {string} [text] - optional message to accompany the attachment
	     */
	    MessagingService.prototype.sendAttachment = function (conversationId, contentData, text) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this._foundation.services.appMessaging.uploadContent(contentData)
	                .then(function (result) {
	                var message = new sdk_js_foundation_1.MessageBuilder().withURL(result.type, result.url, result.size, result.name);
	                if (text) {
	                    message.withText(text);
	                }
	                return _this.sendMessage(conversationId, message);
	            });
	        }, "sendAttachment");
	    };
	    /**
	     * Method to create an attachment via the content api, create a message part(s) using the attachment url and the optional message
	     * @param {string} conversationId - the conversationId
	     * @param {IContentData} contentData  - the Content Data
	     * @param {string} [text] - optional message to accompany the attachment
	     */
	    MessagingService.prototype.messageFromContentData = function (contentData, text) {
	        return this._foundation.services.appMessaging.uploadContent(contentData)
	            .then(function (result) {
	            var message = new sdk_js_foundation_1.MessageBuilder().withURL(result.type, result.url, result.size, result.name);
	            if (text) {
	                message.withText(text);
	            }
	            return message;
	        });
	    };
	    /**
	     * Method to mark the specified messages  as read.
	     * @param {string} conversationId
	     * @param {string[]} messageIds
	     * @method MessagingService#markMessagesAsRead
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.markMessagesAsRead = function (conversationId, messageIds) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            var statuses = new sdk_js_foundation_1.MessageStatusBuilder().readStatusUpdates(messageIds);
	            return _this._foundation.services.appMessaging.sendMessageStatusUpdates(conversationId, [statuses]);
	        }, "markMessagesAsRead");
	    };
	    /**
	     * Go through all the messages we have in the store for the given conversation Id and mark them as read if necessary
	     * @param {string} conversationId
	     * @method MessagingService#markAllMessagesAsRead
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.markAllMessagesAsRead = function (conversationId) {
	        var _this = this;
	        var unreadIds = [];
	        return this._config.conversationStore.getMessages(conversationId)
	            .then(function (messages) {
	            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
	                var message = messages_1[_i];
	                if (!_this.isMessageRead(message)) {
	                    unreadIds.push(message.id);
	                }
	            }
	            return unreadIds.length > 0 ? _this.markMessagesAsRead(conversationId, unreadIds) : Promise.resolve(false);
	        });
	    };
	    /**
	     * Method to determine whether a message has been read. If a ProfileId is specified, that is checked, otherwise we check the current user
	     * @param {IChatMessage} message - the message to check
	     * @param {string} [profileId] - the profile Id to check
	     * @method MessagingService#isMessageRead
	     * @returns {boolean}
	     */
	    MessagingService.prototype.isMessageRead = function (message, profileId) {
	        var currentUser = this._foundation.session && this._foundation.session.profileId || undefined;
	        // look at status updates ...
	        var _profileId = profileId ? profileId : currentUser;
	        if (message.senderId !== currentUser) {
	            return (message.statusUpdates && message.statusUpdates[_profileId]) ? message.statusUpdates[_profileId].status === "read" : false;
	        }
	        else {
	            return true;
	        }
	    };
	    /**
	     * Method to create a conversation.
	     * @param {IChatConversation} conversation
	     * @method MessagingService#createConversation
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.createConversation = function (conversation) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this._foundation.services.appMessaging.createConversation(conversation)
	                .then(function (result) {
	                return _this._config.conversationStore.createConversation(_this.mapConversation(result));
	            });
	        }, "createConversation");
	    };
	    /**
	     * Method to update a conversation.
	     * @param { IChatConversation } conversation
	     * @method MessagingService#updateConversation
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.updateConversation = function (conversation) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            // conversation updated event will trigger the store to update ...
	            return _this._foundation.services.appMessaging.updateConversation(conversation)
	                .then(function (updated) {
	                return true;
	            });
	        }, "updateConversation");
	    };
	    /**
	     * Method to delete a conversation.
	     * @param { string } conversationId
	     * @method MessagingService#deleteConversation
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.deleteConversation = function (conversationId) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            return _this._foundation.services.appMessaging.deleteConversation(conversationId)
	                .then(function () {
	                return _this._config.conversationStore.deleteConversation(conversationId);
	            })
	                .then(function () {
	                return _this._config.conversationStore.deleteConversationMessages(conversationId);
	            });
	        }, "deleteConversation");
	    };
	    /**
	     * Method to get the participants of a conversation
	     * @param {string} conversationId
	     * @method MessagingService#getParticipantsInConversation
	     * @returns {Promise<IConversationParticipant[]>}
	     */
	    MessagingService.prototype.getParticipantsInConversation = function (conversationId) {
	        return this._foundation.services.appMessaging.getParticipantsInConversation(conversationId);
	    };
	    /**
	     * Method to add participants to a conversation
	     * @param { string } conversationId
	     * @param {IConversationParticipant[]} participants
	     * @method MessagingService#addParticipantsToConversation
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.addParticipantsToConversation = function (conversationId, participants) {
	        return this._foundation.services.appMessaging.addParticipantsToConversation(conversationId, participants);
	    };
	    /**
	     * Method to delete participants from a conversation
	     * @param { string } conversationId
	     * @param { string[] } participants
	     * @method MessagingService#deleteParticipantsFromConversation
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.deleteParticipantsFromConversation = function (conversationId, participants) {
	        return this._foundation.services.appMessaging.deleteParticipantsFromConversation(conversationId, participants);
	    };
	    /**
	     * Function to send an is-typing event
	     * @param conversationId
	     * @method MessagingService#sendIsTyping
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.sendIsTyping = function (conversationId) {
	        return this._foundation.services.appMessaging.sendIsTyping(conversationId);
	    };
	    /**
	     * Function to send an is-typing off event
	     * @param conversationId
	     * @method MessagingService#sendIsTypingOff
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.sendIsTypingOff = function (conversationId) {
	        return this._foundation.services.appMessaging.sendIsTypingOff(conversationId);
	    };
	    /**
	     * Method to get a page of messages and adapt into IChatMessage entities
	     * @param {IChatConversation} conversation
	     * @returns {Promise<boolean>}
	     */
	    MessagingService.prototype.getMessages = function (conversation) {
	        var _this = this;
	        var getMessagesResult;
	        var messages;
	        return this._foundation.services.appMessaging.getMessages(conversation.id, this._config.messagePageSize, conversation.continuationToken)
	            .then(function (result) {
	            getMessagesResult = result;
	            // update conversation object
	            // add the messages (after adapting IConversationMessage => IChatMessage)
	            messages = getMessagesResult.messages.map(function (message) {
	                return {
	                    conversationId: message.context && message.context.conversationId || undefined,
	                    id: message.id,
	                    metadata: message.metadata,
	                    parts: message.parts,
	                    senderAvatarUrl: message.context && message.context.from && message.context.from.avatarUrl || undefined,
	                    senderId: message.context && message.context.from && message.context.from.id || undefined,
	                    senderName: message.context && message.context.from && message.context.from.name || undefined,
	                    // TODO: error in IConversationMessage interface
	                    sentEventId: message.sentEventId,
	                    sentOn: message.context && message.context.sentOn || undefined,
	                    statusUpdates: message.statusUpdates
	                };
	            });
	            // we dont care about the order ... that is not our problem
	            return sdk_js_foundation_2.Utils.eachSeries(messages, function (message) {
	                return _this._config.conversationStore.createMessage(message);
	            });
	        })
	            .then(function () {
	            conversation.earliestLocalEventId = getMessagesResult.earliestEventId;
	            // getMessagesResult.latestEventId refers to the latest id in that block.
	            // DONT overwrite this once it has been set !!!
	            if (conversation.latestLocalEventId === undefined) {
	                conversation.latestLocalEventId = getMessagesResult.latestEventId;
	            }
	            conversation.continuationToken = getMessagesResult.continuationToken;
	            return _this._config.conversationStore.updateConversation(conversation);
	        });
	    };
	    /**
	     * Map a IConversationDetails2 object into an IChatConversation
	     * @param conversation
	     */
	    MessagingService.prototype.mapConversation = function (conversation) {
	        return {
	            description: conversation.description,
	            // DONT copy this as this is the latest on the server            
	            // latestEventId: conversation.latestSentEventId,
	            eTag: conversation._etag,
	            id: conversation.id,
	            isPublic: conversation.isPublic,
	            // TODO: this will be a different property!!!
	            lastMessageTimestamp: conversation._updatedOn,
	            latestRemoteEventId: conversation.latestSentEventId,
	            name: conversation.name,
	            roles: conversation.roles,
	        };
	    };
	    /**
	     * Method to compare what is local and what is remote and determine what conversations need adding and removing
	     * @param {IConversationDetails2[]} remoteConversations
	     * @param {IChatConversation[]} localConversations
	     * @returns {IConversationSyncInfo}
	     */
	    MessagingService.prototype.getConversationSyncInfo = function (remoteConversations, localConversations) {
	        var _this = this;
	        var deleteArray = [];
	        var addArray = [];
	        var updateArray = [];
	        // make list of local conversations to delete
	        for (var _i = 0, localConversations_1 = localConversations; _i < localConversations_1.length; _i++) {
	            var localConv = localConversations_1[_i];
	            // For es5 compatibility ;-( (TS4091)
	            (function (localConv) {
	                // if not in remote array, needs deleting
	                var found = remoteConversations.find(function (o) { return o.id === localConv.id; });
	                if (!found) {
	                    _this._foundation.logger.log("Local conversation " + localConv.id + " needs deleting");
	                    deleteArray.push(localConv.id);
	                }
	                else {
	                    // etag may or may not be there
	                    var needsUpdating = false;
	                    if (localConv.latestRemoteEventId !== found.latestSentEventId) {
	                        _this._foundation.logger.log(found.id + ": latestRemoteEventId and latestSentEventId differ, needs updating ");
	                        needsUpdating = true;
	                    }
	                    else if (found._etag && localConv.eTag && found._etag !== localConv.eTag) {
	                        _this._foundation.logger.log(found.id + ": etagS differ, needs updating ");
	                        needsUpdating = true;
	                    }
	                    // either the eTag is different or the latestRemoteEventId is different
	                    if (needsUpdating) {
	                        localConv.name = found.name;
	                        localConv.description = found.description;
	                        localConv.roles = found.roles;
	                        localConv.isPublic = found.isPublic;
	                        localConv.eTag = found._etag;
	                        localConv.latestRemoteEventId = found.latestSentEventId;
	                        updateArray.push(localConv);
	                    }
	                }
	            })(localConv);
	        }
	        // make list of local conversations to add
	        for (var _a = 0, remoteConversations_1 = remoteConversations; _a < remoteConversations_1.length; _a++) {
	            var remoteConv = remoteConversations_1[_a];
	            // For es5 compatibility ;-( (TS4091)
	            (function (remoteConv) {
	                // if not in local array, needs adding
	                if (!localConversations.find(function (o) { return o.id === remoteConv.id; })) {
	                    _this._foundation.logger.log("Remote conversation " + remoteConv.id + " needs adding");
	                    addArray.push(_this.mapConversation(remoteConv));
	                }
	            })(remoteConv);
	        }
	        return {
	            addArray: addArray,
	            deleteArray: deleteArray,
	            updateArray: updateArray
	        };
	    };
	    /**
	     * Keep getting pages of events and applying them onto the store until we hit the end ...
	     * @param conversation
	     */
	    MessagingService.prototype.updateConversationWithEvents = function (conversation) {
	        var _this = this;
	        var self = this;
	        var _events;
	        var _getPageOfEventsFunc = function (conv) {
	            var _this = this;
	            return self._foundation.services.appMessaging.getConversationEvents(conv.id, conv.latestLocalEventId + 1, self._config.eventPageSize)
	                .then(function (events) {
	                _events = events;
	                return sdk_js_foundation_2.Utils.eachSeries(events, function (event) {
	                    return self.applyConversationMessageEvent(event)
	                        .then(function (result) {
	                        return true;
	                    })
	                        .catch(function (error) {
	                        self._foundation.logger.warn("Failed to apply event: " + JSON.stringify(error));
	                        return false;
	                    });
	                    // result of the last operation flows int the then below...
	                }).then(function (result) {
	                    // want the eventId of the last one
	                    conv.latestLocalEventId = _events[_events.length - 1].conversationEventId;
	                    return conv;
	                });
	            })
	                .catch(function (error) {
	                // this will cause compaerFunc to return false
	                _events = undefined;
	                _this._foundation.logger.error("getConversationEvents ;-( threw this", error);
	                return conv;
	            });
	        };
	        var _compareFunc = function (conv) {
	            if (_events) {
	                return _events.length === self._config.eventPageSize;
	            }
	            else {
	                return false;
	            }
	        };
	        return sdk_js_foundation_2.Utils.doUntil(_getPageOfEventsFunc, _compareFunc, conversation)
	            .then(function (conv) {
	            return _this._config.conversationStore.updateConversation(conv);
	        });
	    };
	    /**
	     * Update a conversation by applying new events to the conversation store.
	     * New events will be queried in pages and applied until we get all unseen events.
	     * Any logical decision regarding whether this conversation is too out of date to be refreshed in this way are not dealt with here.
	     * @param {IChatConversation} conversation
	     */
	    MessagingService.prototype.synchronizeConversation = function (conversation) {
	        var _this = this;
	        // no messages yet
	        if (conversation.latestRemoteEventId === undefined) {
	            this._foundation.logger.log("Conversation " + conversation.id + " is empty ...");
	            return Promise.resolve(false);
	        }
	        // is this a new conversation (to us)? If so, load a page of messages
	        if (conversation.continuationToken === undefined) {
	            this._foundation.logger.log("Conversation " + conversation.id + " seen for first time on this device, initialising with messages ...");
	            return this.getMessages(conversation);
	        }
	        else if (conversation.latestLocalEventId >= conversation.latestRemoteEventId) {
	            // NOTE: latestSentEventId means exactly that - we could have puled in some status updates which would put us ahead
	            // if we get an event that proved there is a gap, we can fill it ...
	            this._foundation.logger.log("Conversation " + conversation.id + " already up to date ...");
	            return Promise.resolve(false);
	        }
	        else {
	            var gap = conversation.latestRemoteEventId - (conversation.latestLocalEventId + 1);
	            // get events and apply
	            if (gap < this._config.maxEventGap) {
	                this._foundation.logger.log("Updating Conversation " + conversation.id + " with events ...");
	                return this.updateConversationWithEvents(conversation);
	            }
	            else {
	                // ReloadConversation
	                this._foundation.logger.log("Conversation " + conversation.id + " too out of date, reloading last page of messages ...");
	                return this._config.conversationStore.deleteConversationMessages(conversation.id)
	                    .then(function (result) {
	                    conversation.continuationToken = -1;
	                    conversation.earliestLocalEventId = undefined;
	                    conversation.latestLocalEventId = undefined;
	                    return _this._config.conversationStore.updateConversation(conversation);
	                })
	                    .then(function (result) {
	                    return _this.getMessages(conversation);
	                });
	            }
	        }
	    };
	    /**
	     * Method to apply an event to the conversation store
	     * @param {IConversationMessageEvent} event - the event to apply
	     * @returns {Promise<boolean>} - returns a boolean result inside a Promise
	     */
	    MessagingService.prototype._applyConversationMessageEvent = function (event) {
	        switch (event.name) {
	            case "conversationMessage.sent":
	                var messageSentPayload = event.payload;
	                var message = {
	                    conversationId: event.conversationId,
	                    id: messageSentPayload.messageId,
	                    metadata: messageSentPayload.metadata,
	                    parts: messageSentPayload.parts,
	                    senderAvatarUrl: messageSentPayload.context && messageSentPayload.context.from && messageSentPayload.context.from.avatarUrl || undefined,
	                    senderId: messageSentPayload.context && messageSentPayload.context.from && messageSentPayload.context.from.id || undefined,
	                    senderName: messageSentPayload.context && messageSentPayload.context.from && messageSentPayload.context.from.name || undefined,
	                    sentEventId: event.conversationEventId,
	                    sentOn: messageSentPayload.context && messageSentPayload.context.sentOn || undefined,
	                };
	                return this._config.conversationStore.createMessage(message);
	            case "conversationMessage.delivered":
	            case "conversationMessage.read":
	                var splitResult = event.name.split(".");
	                var statusUpdate = event.payload;
	                return this._config.conversationStore.updateMessageStatus(statusUpdate.conversationId, statusUpdate.messageId, statusUpdate.profileId, splitResult[1], // ["delivered"|"read"]
	                statusUpdate.timestamp);
	            default:
	                return Promise.reject({ message: "Unknown option " + event.name });
	        }
	    };
	    /**
	     * Method to apply an event to the conversation store, also updating the IChatConversation
	     * @param {IConversationMessageEvent} event - the event to apply
	     * @returns {Promise<boolean>} - returns a boolean result inside a Promise
	     */
	    MessagingService.prototype.applyConversationMessageEvent = function (event) {
	        var _this = this;
	        var _chatConversation;
	        return this._config.conversationStore.getConversation(event.conversationId)
	            .then(function (chatConversation) {
	            // is there a conversation ?
	            // if not, can run the onParticipantAdded logic ....
	            if (chatConversation === null) {
	                return _this.initialiseConversation(event.conversationId);
	            }
	            else {
	                return chatConversation;
	            }
	        })
	            .then(function (chatConversation) {
	            _chatConversation = chatConversation;
	            // is there a gap ?
	            if (event.conversationEventId > _chatConversation.latestLocalEventId + 1) {
	                _this._foundation.logger.warn("Gap detected in conversation: latestEventId: " + _chatConversation.latestLocalEventId + ", conversationEventId: " + event.conversationEventId);
	            }
	            return _this._applyConversationMessageEvent(event);
	        })
	            .then(function (updated) {
	            if (_chatConversation.earliestLocalEventId === undefined) {
	                _chatConversation.earliestLocalEventId = event.conversationEventId;
	            }
	            if (_chatConversation.latestLocalEventId === undefined) {
	                _chatConversation.latestLocalEventId = event.conversationEventId;
	            }
	            if (event.conversationEventId > _chatConversation.latestLocalEventId) {
	                _chatConversation.latestLocalEventId = event.conversationEventId;
	            }
	            return _this._config.conversationStore.updateConversation(_chatConversation);
	        });
	    };
	    /**
	     * handle the event if we are idle (and listening), otherwise cache it ...
	     */
	    MessagingService.prototype.onConversationMessageEvent = function (event) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            // check for a gap ...
	            return _this._config.conversationStore.getConversation(event.conversationId)
	                .then(function (conversation) {
	                if (conversation !== null) {
	                    var gap = event.conversationEventId - (conversation.latestLocalEventId + 1);
	                    if (gap > 0) {
	                        // gap needs filling 
	                        if (gap < _this._config.maxEventGap) {
	                            // FillGap
	                            return _this.updateConversationWithEvents(conversation);
	                        }
	                        else {
	                            // ReloadConversation
	                            return _this._config.conversationStore.deleteConversationMessages(event.conversationId)
	                                .then(function (result) {
	                                conversation.continuationToken = -1;
	                                conversation.earliestLocalEventId = undefined;
	                                conversation.latestLocalEventId = undefined;
	                                conversation.latestRemoteEventId = event.conversationEventId;
	                                return _this._config.conversationStore.updateConversation(conversation);
	                            })
	                                .then(function (result) {
	                                return _this.getMessages(conversation);
	                            });
	                        }
	                    }
	                    else {
	                        // ApplyEvent
	                        return _this._onConversationMessageEvent(event);
	                    }
	                }
	                else {
	                    // ApplyEvent
	                    return _this._onConversationMessageEvent(event);
	                }
	            });
	        }, "onConversationMessageEvent");
	    };
	    /**
	     * Event handler to handle incoming Conversation Message events
	     * @param {IConversationMessageEvent} event
	     */
	    MessagingService.prototype._onConversationMessageEvent = function (event) {
	        var _this = this;
	        this._foundation.logger.log("onConversationMessageEvent", event);
	        return this.applyConversationMessageEvent(event)
	            .then(function (updated) {
	            var payload = event.payload;
	            var currentUser = _this._foundation.session && _this._foundation.session.profileId || undefined;
	            // if it was a message sent, send a delivered (unless I sent it!) ...
	            if (event.name === "conversationMessage.sent" && payload.context && payload.context.from && payload.context.from.id !== currentUser) {
	                var status_1 = new sdk_js_foundation_1.MessageStatusBuilder().deliveredStatusUpdate(event.payload.messageId);
	                _this._foundation.services.appMessaging.sendMessageStatusUpdates(event.conversationId, [status_1]);
	            }
	            return updated;
	        });
	    };
	    /**
	     * Event handler to handle incoming Conversation Deleted events
	     * @param {IConversationDeletedEventData} event
	     */
	    MessagingService.prototype.onConversationDeleted = function (event) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            _this._foundation.logger.log("onConversationDeleted");
	            return _this._config.conversationStore.deleteConversation(event.conversationId);
	        }, "onConversationDeleted");
	    };
	    /**
	     * Event handler to handle incoming Conversation Updated events
	     * @param {IConversationUpdatedEventData} event
	     */
	    MessagingService.prototype.onConversationUpdated = function (event) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            _this._foundation.logger.log("onConversationUpdated");
	            return _this._config.conversationStore.getConversation(event.conversationId)
	                .then(function (conversation) {
	                conversation.name = event.name;
	                conversation.description = event.description;
	                conversation.roles = event.roles;
	                conversation.isPublic = event.isPublic;
	                conversation.eTag = event.eTag;
	                // TODO: not sure this is correct ...
	                conversation.lastMessageTimestamp = event.timestamp;
	                return _this._config.conversationStore.updateConversation(conversation);
	            });
	        }, "onConversationUpdated");
	    };
	    /**
	     * Get a conversation from rest api and load in last page of messages
	     * due to a secondary store being in use, the conversation may not exist when trying
	     * to query it off the back of a onParticipantAdded event - hence the retry logic ...
	     * @param conversationId
	     */
	    MessagingService.prototype.initialiseConversation = function (conversationId, depth) {
	        var _this = this;
	        if (depth === void 0) { depth = 0; }
	        var _conversation;
	        return this._foundation.services.appMessaging.getConversation(conversationId)
	            .then(function (remoteConversation) {
	            _conversation = _this.mapConversation(remoteConversation);
	            return _this._config.conversationStore.createConversation(_conversation);
	        })
	            .then(function (result) {
	            return _this.getMessages(_conversation);
	        })
	            .then(function (result) {
	            return _conversation;
	        })
	            .catch(function (error) {
	            // TODO: Consider moving this functionality into foundation ...
	            if (error.statusCode === 404 && depth < _this._config.getConversationMaxRetry) {
	                // sleep and recurse configurable 
	                return new Promise(function (resolve, reject) {
	                    setTimeout(function () { resolve(); }, _this._config.getConversationSleepTimeout);
	                })
	                    .then(function () {
	                    return _this.initialiseConversation(conversationId, ++depth);
	                });
	            }
	            else {
	                throw error;
	            }
	        });
	    };
	    /**
	     * Event handler to handle incoming Participant Added events
	     * @param {IParticipantAddedEventData} event
	     */
	    MessagingService.prototype.onParticipantAdded = function (event) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            _this._foundation.logger.log("onParticipantAdded");
	            var currentUser = _this._foundation.session && _this._foundation.session.profileId || undefined;
	            // if this is me, need to add the conversation ...
	            if (event.profileId === currentUser) {
	                // If this client created the conversation, we will have already stored it off the back of the rest call.
	                // check it isn't in the store already and if not initialise it
	                return _this._config.conversationStore.getConversation(event.conversationId)
	                    .then(function (conversation) {
	                    return conversation === null ?
	                        _this.initialiseConversation(event.conversationId)
	                        : conversation;
	                })
	                    .then(function (conversation) {
	                    return conversation !== null;
	                });
	            }
	            else {
	                return Promise.resolve(false);
	            }
	        }, "onParticipantAdded");
	    };
	    /**
	     * Event handler to handle incoming Participant Removed events
	     * @param {IParticipantRemovedEventData} event
	     */
	    MessagingService.prototype.onParticipantRemoved = function (event) {
	        var _this = this;
	        return this._mutex.runExclusive(function () {
	            _this._foundation.logger.log("onParticipantRemoved");
	            var currentUser = _this._foundation.session && _this._foundation.session.profileId || undefined;
	            // if this is me, need to add the conversation ...
	            if (event.profileId === currentUser) {
	                return _this._config.conversationStore.deleteConversation(event.conversationId);
	            }
	            else {
	                return Promise.resolve(false);
	            }
	        }, "onParticipantRemoved");
	    };
	    /**
	     * Event handler to handle web socket open event
	     * @param event
	     */
	    MessagingService.prototype.onWebsocketOpened = function (event) {
	        this._foundation.logger.log("onWebsocketOpened()", event);
	        if (this._isInitialised) {
	            this._foundation.logger.log("syncing on WebsocketOpened event");
	            return this.synchronize();
	        }
	        else {
	            return Promise.resolve(false);
	        }
	    };
	    /**
	     * Event handler to handle web socket closed event
	     * @param event
	     */
	    MessagingService.prototype.onWebsocketClosed = function (event) {
	        this._foundation.logger.log("onWebsocketClosed()", event);
	    };
	    return MessagingService;
	}());
	exports.MessagingService = MessagingService;
	//# sourceMappingURL=messagingService.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var sdk_js_foundation_1 = __webpack_require__(1);
	var ComapiChatConfig = (function (_super) {
	    __extends(ComapiChatConfig, _super);
	    /**
	     * ComapiChatConfig class constructor.
	     * @class ComapiChatConfig
	     * @classdesc Class that implements IComapiChatConfig and extends ComapiConfig
	     */
	    function ComapiChatConfig() {
	        var _this = _super.call(this) || this;
	        _this.eventPageSize = 10;
	        _this.messagePageSize = 10;
	        _this.lazyLoadThreshold = 1;
	        _this.getConversationSleepTimeout = 1000;
	        _this.getConversationMaxRetry = 3;
	        _this.maxEventGap = 100;
	        _this.autoSynchronize = true;
	        _this.conversationStore = undefined;
	        return _this;
	    }
	    /**
	     * Function to set the Conversation Store
	     * @method ComapiChatConfig#withStore
	     * @param {IConversationStore} conversationStore - The conversation store
	     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiChatConfig.prototype.withStore = function (conversationStore) {
	        this.conversationStore = conversationStore;
	        return this;
	    };
	    /**
	     * Function to set the event page size
	     * @method ComapiChatConfig#withEventPageSize
	     * @param {number} eventPageSize - The event page size
	     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiChatConfig.prototype.withEventPageSize = function (eventPageSize) {
	        this.eventPageSize = eventPageSize;
	        return this;
	    };
	    /**
	     * Function to set the message Page Size
	     * @method ComapiChatConfig#withMessagePageSize
	     * @param {number} messagePageSize - The message page size
	     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiChatConfig.prototype.withMessagePageSize = function (messagePageSize) {
	        this.messagePageSize = messagePageSize;
	        return this;
	    };
	    /**
	     * Function to set the lazy load threshold
	     * @method ComapiChatConfig#withLazyLoadThreshold
	     * @param {number} lazyLoadThreshold - The lazy Load Threshold
	     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiChatConfig.prototype.withLazyLoadThreshold = function (lazyLoadThreshold) {
	        this.lazyLoadThreshold = lazyLoadThreshold;
	        return this;
	    };
	    /**
	     * Function to set the max Event Gap
	     * @method ComapiChatConfig#withMaxEventGap
	     * @param {number} maxEventGap - The max Event Gap
	     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiChatConfig.prototype.withMaxEventGap = function (maxEventGap) {
	        this.maxEventGap = maxEventGap;
	        return this;
	    };
	    /**
	     * Function to set the autoSynchronize property
	     * @method ComapiChatConfig#withAutoSynchronize
	     * @param {boolean} autoSynchronize - The autoSynchronize
	     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
	     */
	    ComapiChatConfig.prototype.withAutoSynchronize = function (autoSynchronize) {
	        this.autoSynchronize = autoSynchronize;
	        return this;
	    };
	    return ComapiChatConfig;
	}(sdk_js_foundation_1.ComapiConfig));
	exports.ComapiChatConfig = ComapiChatConfig;
	//# sourceMappingURL=chatConfig.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var MemoryConversationStore = (function () {
	    /**
	     * MemoryConversationStore class constructor
	     * This implementation will store an array of conversations and an array of messages for each conversation in a separate message store.
	     * The messages will be mapped to the conversationId's as defined above.
	     * @class MemoryConversationStore
	     * @classdesc An in memory implementation of IConversationStore
	     */
	    function MemoryConversationStore() {
	        this.conversations = [];
	        this.messageStore = {};
	        console.log("Constructing a MemoryConversationStore");
	    }
	    /**
	     * Method to reset the conversation store
	     * @method MemoryConversationStore#reset
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    MemoryConversationStore.prototype.reset = function () {
	        this.conversations = [];
	        this.messageStore = {};
	        return Promise.resolve(true);
	    };
	    /**
	     * Method to get a conversation given the conversationId
	     * @method MemoryConversationStore#getConversation
	     * @param {String} conversationId - the conversation id
	     * @returns {Promise<IChatConversation>} - Returns a conversation via a promise
	     */
	    MemoryConversationStore.prototype.getConversation = function (conversationId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            resolve(_this._findConversation(conversationId));
	        });
	    };
	    /**
	     * Method to create a conversation
	     * @method MemoryConversationStore#createConversation
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    MemoryConversationStore.prototype.createConversation = function (conversation) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            // Check ie we have it first ...
	            if (_this._indexOfConversation(conversation.id) === -1) {
	                _this.conversations.push(conversation);
	                _this.messageStore[conversation.id] = [];
	                resolve(true);
	            }
	            else {
	                reject({ message: "Conversation " + conversation.id + " already exists" });
	            }
	        });
	    };
	    /**
	     * Method to update a conversation.
	     * We will find the conversation and then update the individual properties on the found object rather than replace.
	     * This is so that frameworks such as angular will correctly detect changes.
	     * @method MemoryConversationStore#updateConversation
	     * @param {IChatConversation} conversation - the conversation to update
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    MemoryConversationStore.prototype.updateConversation = function (conversation) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var found = _this._findConversation(conversation.id);
	            if (found) {
	                found.name = conversation.name;
	                found.description = conversation.description;
	                found.roles = conversation.roles;
	                found.isPublic = conversation.isPublic;
	                found.earliestLocalEventId = conversation.earliestLocalEventId;
	                found.latestLocalEventId = conversation.latestLocalEventId;
	                found.continuationToken = conversation.continuationToken;
	                resolve(true);
	            }
	            else {
	                reject({ message: "Conversation " + conversation.id + " not found" });
	            }
	        });
	    };
	    /**
	     * Method to delete a conversation
	     * @method MemoryConversationStore#deleteConversation
	     * @param {String} conversationId - the conversation id
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    MemoryConversationStore.prototype.deleteConversation = function (conversationId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var index = _this._indexOfConversation(conversationId);
	            if (index >= 0) {
	                _this.conversations.splice(index, 1);
	                resolve(true);
	            }
	            else {
	                reject({ message: "Conversation " + conversationId + " not found" });
	            }
	        });
	    };
	    /**
	     * Method to retrieve a conversation message
	     * @method MemoryConversationStore#getMessage
	     * @param {String} conversationId
	     * @param {String} messageId
	     * @returns {Promise<IChatMessage>} - Returns a message result via a promise
	     */
	    MemoryConversationStore.prototype.getMessage = function (conversationId, messageId) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            resolve(_this._findMessage(conversationId, messageId));
	        });
	    };
	    /**
	     * Method to update the message status for a message already in the message store (delivered, read etc ...)
	     * @method MemoryConversationStore#updateMessageStatus
	     * @param {String} conversationId - the conversation id
	     * @param {String} messageId  - the message id
	     * @param {String} profileId  - the profile id corresponding to the status event
	     * @param {String} status  - the status to apply
	     * @param {String} timestamp  - the timestamp of the status event
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    MemoryConversationStore.prototype.updateMessageStatus = function (conversationId, messageId, profileId, status, timestamp) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var message = _this._findMessage(conversationId, messageId);
	            if (message) {
	                // if we get delivered and read out of order, dont overwrite "read" with delivered 
	                if (message.statusUpdates &&
	                    message.statusUpdates[profileId] &&
	                    message.statusUpdates[profileId].status === "read") {
	                    resolve(false);
	                }
	                else {
	                    if (!message.statusUpdates) {
	                        message.statusUpdates = {};
	                    }
	                    message.statusUpdates[profileId] = {
	                        status: status,
	                        on: timestamp
	                    };
	                    resolve(true);
	                }
	            }
	            else {
	                reject({ message: "Message " + messageId + " not found in conversation " + conversationId });
	            }
	        });
	    };
	    /**
	     * Method to create a message in the store
	     * @method MemoryConversationStore#createMessage
	     * @param {IChatMessage} message - the message
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    MemoryConversationStore.prototype.createMessage = function (message) {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            var found = _this._findMessage(message.conversationId, message.id);
	            // check for dupes
	            if (found === null) {
	                // messages are ordered by sentEventId
	                // iterate backwards to see where to insert (will 99% prob be just on the end)
	                // UNLESS we are backfilling where it is prob going to be the beginning ...
	                // may be better off just appending and sorting ???
	                var conversationMessages = _this.messageStore[message.conversationId];
	                if (conversationMessages) {
	                    var position = 0; // lets default to the beginning ..
	                    for (var i = conversationMessages.length - 1; i >= 0; i--) {
	                        var _message = conversationMessages[i];
	                        if (_message.sentEventId < message.sentEventId) {
	                            position = i + 1;
	                            break;
	                        }
	                    }
	                    conversationMessages.splice(position, 0, message);
	                    resolve(true);
	                }
	                else {
	                    reject({ message: "Conversation " + message.conversationId + " not found in messageStore" });
	                }
	            }
	            else {
	                console.warn("Message already in store, updating ...", message);
	                found.sentEventId = message.sentEventId;
	                found.senderId = message.senderId;
	                found.sentOn = message.sentOn;
	                found.statusUpdates = message.statusUpdates;
	                resolve(false);
	            }
	        });
	    };
	    /**
	     * Method to query the list of conversations in the store
	     * @method MemoryConversationStore#getConversations
	     * @returns {Promise<IChatConversation[]>} - Returns a list of conversations via a promise
	     */
	    MemoryConversationStore.prototype.getConversations = function () {
	        return Promise.resolve(this.conversations);
	    };
	    /**
	     * Method to query the list of messages in the store for a given conversation
	     * @method MemoryConversationStore#getMessages
	     * @param {String} conversationId - the conversation id
	     * @returns {Promise<IChatMessage[]>} - Returns a list of messages via a promise
	     */
	    MemoryConversationStore.prototype.getMessages = function (conversationId) {
	        var conversationMessages = this.messageStore[conversationId];
	        return Promise.resolve(conversationMessages ? conversationMessages : []);
	    };
	    /**
	     * Method to delete all messages for a conversation in the store
	     * @method MemoryConversationStore#deleteConversationMessages
	     * @param {String} conversationId - the conversation id
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    MemoryConversationStore.prototype.deleteConversationMessages = function (conversationId) {
	        this.messageStore[conversationId] = [];
	        return Promise.resolve(true);
	    };
	    /**
	     * Private method to find a conversation given the conversationId
	     * @param conversationId
	     */
	    MemoryConversationStore.prototype._findConversation = function (conversationId) {
	        var result = this.conversations.filter(function (x) { return x.id === conversationId; });
	        return result.length === 1 ? result[0] : null;
	    };
	    /**
	     * Private method to get the index of a conversation given the conversationId
	     * @param conversationId
	     */
	    MemoryConversationStore.prototype._indexOfConversation = function (conversationId) {
	        return this.conversations.map(function (c) { return c.id; }).indexOf(conversationId);
	    };
	    /**
	     * Private method to find a message
	     * @param conversationId
	     * @param messageId
	     */
	    MemoryConversationStore.prototype._findMessage = function (conversationId, messageId) {
	        var conversationMessages = this.messageStore[conversationId];
	        if (conversationMessages) {
	            var message = conversationMessages.filter(function (x) { return x.id === messageId; });
	            // return message.length === 1 ? message[0] : null;
	            if (message.length === 1) {
	                return message[0];
	            }
	            else {
	                return null;
	            }
	        }
	        else {
	            return null;
	        }
	    };
	    return MemoryConversationStore;
	}());
	exports.MemoryConversationStore = MemoryConversationStore;
	//# sourceMappingURL=memoryStore.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var IndexedDBConversationStore = (function () {
	    /**
	     * IndexedDBConversationStore class constructor
	     * @class IndexedDBConversationStore
	     * @classdesc An indexedDb implementation of IConversationStore
	     */
	    function IndexedDBConversationStore() {
	        this._DbNme = "IConversationStore4";
	        this._ConversationsStore = "IChatConversation";
	        this._MessagesStore = "IChatMessage";
	        this._DbVersion = 1;
	        console.log("Constructing a IndexedDBConversationStore");
	    }
	    /**
	     * Method to get a conversation given the conversationId
	     * @method IndexedDBConversationStore#getConversation
	     * @param {String} conversationId - the conversation id
	     * @returns {Promise<IChatConversation>} - Returns a conversation via a promise
	     */
	    IndexedDBConversationStore.prototype.getConversation = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._ConversationsStore], "readonly");
	                var objectStore = transaction.objectStore(_this._ConversationsStore);
	                // we want all the messages from this conversation ...
	                // using a keyrange to encapsulate just the specified conversationId and all the dates
	                var keyRange = IDBKeyRange.only(conversationId);
	                var cursorRequest = objectStore.openCursor(keyRange);
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    // only one record ...
	                    if (cursor) {
	                        resolve(cursor.value);
	                    }
	                    else {
	                        resolve(null);
	                    }
	                };
	                cursorRequest.onerror = function (e) {
	                    reject({ message: "Failed to openCursor: " + e.target.error.name });
	                };
	            });
	        });
	    };
	    /**
	     * Method to create a conversation
	     * @method IndexedDBConversationStore#createConversation
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    IndexedDBConversationStore.prototype.createConversation = function (conversation) {
	        return this.putConversation(conversation);
	    };
	    /**
	     * Method to update a conversation
	     * @method IndexedDBConversationStore#updateConversation
	     * @param {IChatConversation} conversation - the conversation to update
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    IndexedDBConversationStore.prototype.updateConversation = function (conversation) {
	        var _this = this;
	        return this.getConversation(conversation.id)
	            .then(function (c) {
	            if (c) {
	                return _this.putConversation(conversation);
	            }
	            else {
	                return Promise.reject({ message: "Conversation " + conversation.id + " not found" });
	            }
	        });
	    };
	    /**
	     * Method to delete a conversation
	     * @method IndexedDBConversationStore#deleteConversation
	     * @param {String} conversationId - the conversation id
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    IndexedDBConversationStore.prototype.deleteConversation = function (conversationId) {
	        var _this = this;
	        // check conv exists first as we cnt tell whether we actually deleted anything ...
	        return this.getConversation(conversationId)
	            .then(function (c) {
	            if (c !== null) {
	                return _this._deleteConversation(conversationId);
	            }
	            else {
	                return Promise.reject({ message: "Conversation " + conversationId + " not found" });
	            }
	        });
	    };
	    /**
	     * Method to retrieve a conversation message
	     * @method IndexedDBConversationStore#getMessage
	     * @param {String} conversationId
	     * @param {String} messageId
	     * @returns {Promise<IChatMessage>} - Returns a message result via a promise
	     */
	    IndexedDBConversationStore.prototype.getMessage = function (conversationId, messageId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._MessagesStore], "readonly");
	                var objectStore = transaction.objectStore(_this._MessagesStore);
	                var cursorRequest = objectStore.get(messageId);
	                cursorRequest.onsuccess = function (event) {
	                    var message = event.target.result;
	                    if (message) {
	                        resolve(message);
	                    }
	                    else {
	                        resolve(null);
	                    }
	                };
	                cursorRequest.onerror = function (event) {
	                    reject({ message: "Failed to openCursor: " + event.target.error.name });
	                };
	            });
	        });
	    };
	    /**
	     * Method to update the message status for a message already in the message store (delivered, read etc ...)
	     * @method IndexedDBConversationStore#updateMessageStatus
	     * @param {String} conversationId - the conversation id
	     * @param {String} messageId  - the message id
	     * @param {String} profileId  - the profile id corresponding to the status event
	     * @param {String} status  - the status to apply
	     * @param {String} timestamp  - the timestamp of the status event
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    IndexedDBConversationStore.prototype.updateMessageStatus = function (conversationId, messageId, profileId, status, timestamp) {
	        var _this = this;
	        return this.getMessage(conversationId, messageId)
	            .then(function (message) {
	            // if we get delivered and read out of order, dont overwrite "read" with delivered 
	            if (message.statusUpdates &&
	                message.statusUpdates[profileId] &&
	                message.statusUpdates[profileId].status === "read") {
	                Promise.resolve(false);
	            }
	            else {
	                if (!message.statusUpdates) {
	                    message.statusUpdates = {};
	                }
	                message.statusUpdates[profileId] = {
	                    status: status,
	                    on: timestamp
	                };
	                return _this.putMessage(message);
	            }
	        });
	    };
	    /**
	     * Method to create a message in the store
	     * @method IndexedDBConversationStore#createMessage
	     * @param {IChatMessage} message - the message
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    IndexedDBConversationStore.prototype.createMessage = function (message) {
	        var _this = this;
	        return this.getConversation(message.conversationId)
	            .then(function (c) {
	            if (c !== null) {
	                return _this.putMessage(message);
	            }
	            else {
	                return Promise.reject({ message: "Conversation " + message.conversationId + " not found" });
	            }
	        });
	    };
	    /**
	     * Method to query the list of conversations in the store
	     * @method IndexedDBConversationStore#getConversations
	     * @returns {Promise<IChatConversation[]>} - Returns a list of conversations via a promise
	     */
	    IndexedDBConversationStore.prototype.getConversations = function () {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._ConversationsStore], "readonly");
	                var objectStore = transaction.objectStore(_this._ConversationsStore);
	                var conversations = [];
	                var cursorRequest = objectStore.openCursor();
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        conversations.push(cursor.value);
	                        cursor.continue();
	                    }
	                    else {
	                        resolve(conversations);
	                    }
	                };
	                cursorRequest.onerror = function (event) {
	                    reject({ message: "Failed to openCursor: " + event.target.error.name });
	                };
	            });
	        });
	    };
	    /**
	     * Method to query the list of messages in the store for a given conversation
	     * @method IndexedDBConversationStore#getMessages
	     * @param {String} conversationId - the conversation id
	     * @returns {Promise<IChatMessage[]>} - Returns a list of messages via a promise
	     */
	    IndexedDBConversationStore.prototype.getMessages = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._MessagesStore], "readonly");
	                var objectStore = transaction.objectStore(_this._MessagesStore);
	                var index = objectStore.index("conversation");
	                var keyRange = IDBKeyRange.only("" + conversationId);
	                var messages = [];
	                var cursorRequest = index.openCursor(keyRange, "prev");
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        messages.unshift(cursor.value);
	                        cursor.continue();
	                    }
	                    else {
	                        resolve(messages.sort(function (m1, m2) {
	                            return m1.sentEventId - m2.sentEventId;
	                        }));
	                    }
	                };
	                cursorRequest.onerror = function (event) {
	                    reject({ message: "Failed to openCursor: " + event.target.error.name });
	                };
	            });
	        });
	    };
	    /**
	     * Method to delete all messages for a conversation in the store
	     * @method IndexedDBConversationStore#deleteConversationMessages
	     * @param {String} conversationId - the conversation id
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    IndexedDBConversationStore.prototype.deleteConversationMessages = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._MessagesStore], "readwrite");
	                var objectStore = transaction.objectStore(_this._MessagesStore);
	                var index = objectStore.index("conversation");
	                var keyRange = IDBKeyRange.only("" + conversationId);
	                // we want all the messages from this conversation ...
	                // using a keyrange to encapsulate just the specified conversationId and all the dates
	                var cursorRequest = index.openCursor(keyRange, "next");
	                cursorRequest.onsuccess = function (event) {
	                    var cursor = event.target.result;
	                    if (cursor) {
	                        objectStore.delete(cursor.primaryKey);
	                        cursor.continue();
	                    }
	                    else {
	                        resolve(true);
	                    }
	                };
	                cursorRequest.onerror = function (e) {
	                    reject({ message: "Failed to openCursor: " + e.target.error.name });
	                };
	            });
	        });
	    };
	    /**
	     * Method to reset the conversation store
	     * @method IndexedDBConversationStore#reset
	     * @returns {Promise<boolean>} - Returns a boolean result via a promise
	     */
	    IndexedDBConversationStore.prototype.reset = function () {
	        var _this = this;
	        return this.clearObjectStore(this._ConversationsStore)
	            .then(function (cleared) {
	            return _this.clearObjectStore(_this._MessagesStore);
	        })
	            .then(function (cleared) {
	            return Promise.resolve(true);
	        });
	    };
	    /**
	     *
	     */
	    IndexedDBConversationStore.prototype.ensureInitialised = function () {
	        if (!this._initialised) {
	            // this is a promise instance to ensure it's only called once
	            this._initialised = this.initialise();
	        }
	        return this._initialised;
	    };
	    /**
	     * Create the database and stores
	     */
	    IndexedDBConversationStore.prototype.initialise = function () {
	        var _this = this;
	        return new Promise(function (resolve, reject) {
	            if ("indexedDB" in window) {
	                var openRequest = indexedDB.open(_this._DbNme, _this._DbVersion);
	                openRequest.onupgradeneeded = function (event) {
	                    console.log("Upgrading database...");
	                    var thisDB = event.target.result;
	                    /**
	                     * Create Messages Store
	                     * Indexed by conversationId and sentEventId
	                     */
	                    if (!thisDB.objectStoreNames.contains(_this._MessagesStore)) {
	                        var os = thisDB.createObjectStore(_this._MessagesStore, { keyPath: "id" });
	                        os.createIndex("conversation", "conversationId", { unique: false });
	                    }
	                    /**
	                     * Create Conversations Store
	                     * Indexed by conversationId
	                     */
	                    if (!thisDB.objectStoreNames.contains(_this._ConversationsStore)) {
	                        thisDB.createObjectStore(_this._ConversationsStore, { keyPath: "id" });
	                    }
	                };
	                openRequest.onsuccess = function (event) {
	                    _this._database = event.target.result;
	                    console.log("database opened ;-)");
	                    resolve(true);
	                };
	                openRequest.onerror = function (event) {
	                    reject({ message: "IndexedDBLogger.open failed : " + event.target.error.name });
	                };
	            }
	            else {
	                reject({ message: "IndexedDB not supported on this platform - use https://github.com/axemclion/IndexedDBShim or https://github.com/Microsoft/cordova-plugin-indexedDB" });
	            }
	        });
	    };
	    /**
	     *
	     * @param message
	     */
	    IndexedDBConversationStore.prototype.putMessage = function (message) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._MessagesStore], "readwrite");
	                var store = transaction.objectStore(_this._MessagesStore);
	                var request = store.put(message);
	                request.onerror = function (e) {
	                    console.error("Error", e.target.error.name);
	                    reject({ message: "add failed: " + e.target.error.name });
	                };
	                request.onsuccess = function (event) {
	                    // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
	                    // returns auto incremented id ...
	                    // resolve((<IDBRequest>event.target).result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    /**
	     *
	     * @param conversation
	     */
	    IndexedDBConversationStore.prototype.putConversation = function (conversation) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._ConversationsStore], "readwrite");
	                var store = transaction.objectStore(_this._ConversationsStore);
	                var request = store.put(conversation);
	                request.onerror = function (event) {
	                    reject({ message: "add failed: " + event.target.error.name });
	                };
	                request.onsuccess = function (event) {
	                    // http://stackoverflow.com/questions/12502830/how-to-return-auto-increment-id-from-objectstore-put-in-an-indexeddb
	                    // returns auto incremented id ...
	                    // resolve((<IDBRequest>event.target).result);
	                    resolve(true);
	                };
	            });
	        });
	    };
	    /**
	     * Method to clear the data in an object store
	     * @method ConversationStore#clearObjectStore
	     * @param {string} objectStore : the object store to clear
	     * @returns {Promise} - returns a promise
	     */
	    IndexedDBConversationStore.prototype.clearObjectStore = function (objectStoreName) {
	        var _this = this;
	        // can't reference objectStore in the promise without this ...
	        var _objectStoreName = objectStoreName;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                // open a read/write db transaction, ready for clearing the data
	                var transaction = _this._database.transaction([_objectStoreName], "readwrite");
	                transaction.onerror = function (event) {
	                    console.error("Transaction not opened due to error: " + transaction.error);
	                };
	                var objectStore = transaction.objectStore(_objectStoreName);
	                var objectStoreRequest = objectStore.clear();
	                objectStoreRequest.onsuccess = function (event) {
	                    resolve(true);
	                };
	                objectStoreRequest.onerror = function (event) {
	                    reject({ message: "Failed to clear object store: " + event.target.error.name });
	                };
	            });
	        });
	    };
	    /**
	     *
	     * @param conversationId
	     */
	    IndexedDBConversationStore.prototype._deleteConversation = function (conversationId) {
	        var _this = this;
	        return this.ensureInitialised()
	            .then(function (initialised) {
	            return new Promise(function (resolve, reject) {
	                var transaction = _this._database.transaction([_this._ConversationsStore], "readwrite");
	                var store = transaction.objectStore(_this._ConversationsStore);
	                var request = store.delete(conversationId);
	                request.onerror = function (event) {
	                    reject({ message: "delete failed: " + event.target.error.name });
	                };
	                request.onsuccess = function (event) {
	                    console.log("store.delete", event.target.result);
	                    _this.deleteConversationMessages(conversationId)
	                        .then(function (succeeded) {
	                        resolve(succeeded);
	                    });
	                };
	            });
	        });
	    };
	    return IndexedDBConversationStore;
	}());
	exports.IndexedDBConversationStore = IndexedDBConversationStore;
	//# sourceMappingURL=dbStore.js.map

/***/ })
/******/ ]);