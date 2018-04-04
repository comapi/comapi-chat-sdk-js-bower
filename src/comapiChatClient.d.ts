import { IFoundation, IProfile, IDevice, IChannels, InterfaceContainer, INTERFACE_SYMBOLS, Utils, MessageBuilder, ContentData, ConversationBuilder } from "@comapi/sdk-js-foundation";
import { IComapiChatConfig } from "./interfaces";
import { SessionService } from "./sessionService";
import { MessagingService } from "./messagingService";
import { ComapiChatConfig } from "./chatConfig";
import { MemoryConversationStore } from "./memoryStore";
import { IndexedDBConversationStore } from "./dbStore";
export { ComapiChatConfig, MemoryConversationStore, IndexedDBConversationStore, InterfaceContainer, INTERFACE_SYMBOLS, Utils, MessageBuilder, ContentData, ConversationBuilder };
export declare class ComapiChatClient {
    private _comapiChatConfig;
    private _sessionService;
    private _messagingService;
    private _foundation;
    private _eventHandlers;
    /**
     * ComapiChatClient class constructor.
     * @class ComapiChatClient
     * @classdesc ComapiChatClient Class
     */
    constructor();
    /**
     * Method to get session service
     * @method ComapiChatClient#session
     * @returns {SessionService} - Returns SessionService instance
     */
    readonly session: SessionService;
    /**
     * Method to get profile interface
     * @method ComapiChatClient#profile
     * @returns {IProfile} - Returns IProfile interface
     */
    readonly profile: IProfile;
    /**
     * Method to get MessagingService service
     * @method ComapiChatClient#messaging
     * @returns {MessagingService} - Returns MessagingService instance
     */
    readonly messaging: MessagingService;
    /**
     * Method to get IDevice interface
     * @method ComapiChatClient#device
     * @returns {IDevice} - Returns IDevice interface
     */
    readonly device: IDevice;
    /**
     * Method to get IChannels interface
     * @method ComapiChatClient#channels
     * @returns {IChannels} - Returns IChannels interface
     */
    readonly channels: IChannels;
    /**
     * Method to get IFoundation interface
     * @method ComapiChatClient#foundation
     * @returns {IFoundation} - Returns IFoundation interface
     */
    readonly foundation: IFoundation;
    /**
     * Method to initialise chat client
     * @param comapiChatConfig
     * @method ComapiChatClient#initialise
     */
    initialise(comapiChatConfig: IComapiChatConfig): Promise<boolean>;
    /**
     * Method to use when unit testing so mock foundation can easily be injected
     * @param foundation
     * @param comapiChatConfig
     */
    initialiseWithFoundation(foundation: IFoundation, comapiChatConfig: IComapiChatConfig): Promise<boolean>;
    /**
     * Method to uninitialise the sdk
     * @method ComapiChatClient#uninitialise
     */
    uninitialise(): Promise<boolean>;
    /**
     * Subscribes the caller to a comapi event.
     * @method ComapiChatClient#on
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} handler - The callback
     */
    on(eventType: string, handler: Function): void;
    /**
     * Unsubscribes the caller to a comapi event.
     * @method ComapiChatClient#off
     * @param {string} eventType - The type of event to subscribe to
     * @param {Function} [handler] - The callback (optional - if not specified, all associated callbacks will be unregistered)
     */
    off(eventType: string, handler?: Function): void;
    /**
     *
     * @param foundation
     * @param comapiChatConfig
     */
    private _initialise(foundation, comapiChatConfig);
    /**
     * Property to get the SDK version
     * @method ComapiChatClient#version
     */
    static readonly version: string;
}
