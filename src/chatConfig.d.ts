import { ComapiConfig } from "@comapi/sdk-js-foundation";
import { IComapiChatConfig, IConversationStore } from "./interfaces";
export declare class ComapiChatConfig extends ComapiConfig implements IComapiChatConfig {
    conversationStore: IConversationStore;
    eventPageSize: number;
    messagePageSize: number;
    lazyLoadThreshold: number;
    getConversationSleepTimeout: number;
    getConversationMaxRetry: number;
    maxEventGap: number;
    autoSynchronize: boolean;
    /**
     * ComapiChatConfig class constructor.
     * @class ComapiChatConfig
     * @classdesc Class that implements IComapiChatConfig and extends ComapiConfig
     */
    constructor();
    /**
     * Function to set the Conversation Store
     * @method ComapiChatConfig#withStore
     * @param {IConversationStore} conversationStore - The conversation store
     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
     */
    withStore(conversationStore: IConversationStore): this;
    /**
     * Function to set the event page size
     * @method ComapiChatConfig#withEventPageSize
     * @param {number} eventPageSize - The event page size
     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
     */
    withEventPageSize(eventPageSize: number): this;
    /**
     * Function to set the message Page Size
     * @method ComapiChatConfig#withMessagePageSize
     * @param {number} messagePageSize - The message page size
     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
     */
    withMessagePageSize(messagePageSize: number): this;
    /**
     * Function to set the lazy load threshold
     * @method ComapiChatConfig#withLazyLoadThreshold
     * @param {number} lazyLoadThreshold - The lazy Load Threshold
     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
     */
    withLazyLoadThreshold(lazyLoadThreshold: number): this;
    /**
     * Function to set the max Event Gap
     * @method ComapiChatConfig#withMaxEventGap
     * @param {number} maxEventGap - The max Event Gap
     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
     */
    withMaxEventGap(maxEventGap: number): this;
    /**
     * Function to set the autoSynchronize property
     * @method ComapiChatConfig#withAutoSynchronize
     * @param {boolean} autoSynchronize - The autoSynchronize
     * @returns {ComapiChatConfig} - Returns reference to itself so methods can be chained
     */
    withAutoSynchronize(autoSynchronize: boolean): this;
}
