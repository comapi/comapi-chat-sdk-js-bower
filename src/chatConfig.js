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
var sdk_js_foundation_1 = require("@comapi/sdk-js-foundation");
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