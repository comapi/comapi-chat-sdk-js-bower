import { ConversationScope } from "@comapi/sdk-js-foundation";
import { IComapiChatConfig, IChatConversation, IChatMessage, IChatConversationInfo } from "./interfaces";
import { IFoundation, IConversationParticipant, IConversationMessage } from "@comapi/sdk-js-foundation";
import { IContentData } from "@comapi/sdk-js-foundation";
export declare class MessagingService {
    private _foundation;
    private _config;
    private _mutex;
    private _isInitialised;
    private _isInitialising;
    /**
     * MessagingService class constructor.
     * @class MessagingService
     * @classdesc MessagingService Class
     */
    constructor(_foundation: IFoundation, _config: IComapiChatConfig);
    /**
     * Method to initialise Comapi Chat Layer
     * 1) Initialise foundation interface
     * 2) Wire up event handlers
     * 3) Synchronise
     * @param {IComapiChatConfig} config - the config
     * @method MessagingService#initialise
     * @returns {Promise<boolean>}
     */
    initialise(config: IComapiChatConfig): Promise<boolean>;
    /**
     * Method to uninitialise Comapi Chat Layer
     * 1) cancel event subscriptions
     */
    uninitialise(): Promise<boolean>;
    /**
     * Method to Synchronise Chat layer - locally stored conversations will be reconciled against Comapi and updated appropriately.
     * @param {ConversationScope} [scope] - The Conversation Scope
     * @method MessagingService#synchronize
     * @returns {Promise<boolean>}
     */
    synchronize(scope?: ConversationScope): Promise<boolean>;
    /**
     * Method to request the previous page of messages for a given conversation.
     * After the Promise has been resolved, the messages will be in the supplied conversation store (if available)
     * @method MessagingService#getPreviousMessages
     * @returns {Promise<boolean>}
     */
    getPreviousMessages(conversationId: string): Promise<boolean>;
    /**
     * Method to return a list of all the conversations a user is part of.
     * This is designed to to power a master conversation view.
     * @method MessagingService#getConversations
     * @returns {Promise<IChatConversation[]>}
     */
    getConversations(): Promise<IChatConversation[]>;
    /**
     * Method to get conversation info to render a detail view.
     * - will return messages, conversation info and participant info.
     * - Conversation will be synchronised if necessary during this call.
     * @param {string} conversationId - the  id of the conversation to retrieved
     * @method MessagingService#getConversationInfo
     * @returns {Promise<IChatConversationInfo>} returns an IChatConversationInfo object via a promise
     */
    getConversationInfo(conversationId: string): Promise<IChatConversationInfo>;
    /**
     * Method to send a text message to a conversation
     * @param {string} conversationId - the conversation id
     * @param {string} text - the message text
     * @method MessagingService#sendMessage
     * @returns {Promise<boolean>}
     */
    sendTextMessage(conversationId: string, text: string): Promise<boolean>;
    /**
     * Method to send a message to a conversation
     * @param {string} conversationId - the conversation id
     * @param {IConversationMessage} message - the message text
     * @method MessagingService#sendMessage
     * @returns {Promise<boolean>}
     */
    sendMessage(conversationId: string, message: IConversationMessage): Promise<boolean>;
    /**
     * Method to create an attachment via the content api, create a message part(s) using the attachment url and the optional message
     * @param {string} conversationId - the conversationId
     * @param {IContentData} contentData  - the Content Data
     * @param {string} [text] - optional message to accompany the attachment
     */
    sendAttachment(conversationId: string, contentData: IContentData, text?: string): Promise<boolean>;
    /**
     * Method to create an attachment via the content api, create a message part(s) using the attachment url and the optional message
     * @param {string} conversationId - the conversationId
     * @param {IContentData} contentData  - the Content Data
     * @param {string} [text] - optional message to accompany the attachment
     */
    messageFromContentData(contentData: IContentData, text?: string): Promise<IConversationMessage>;
    /**
     * Method to mark the specified messages  as read.
     * @param {string} conversationId
     * @param {string[]} messageIds
     * @method MessagingService#markMessagesAsRead
     * @returns {Promise<boolean>}
     */
    markMessagesAsRead(conversationId: string, messageIds: string[]): Promise<boolean>;
    /**
     * Go through all the messages we have in the store for the given conversation Id and mark them as read if necessary
     * @param {string} conversationId
     * @method MessagingService#markAllMessagesAsRead
     * @returns {Promise<boolean>}
     */
    markAllMessagesAsRead(conversationId: string): Promise<boolean>;
    /**
     * Method to determine whether a message has been read. If a ProfileId is specified, that is checked, otherwise we check the current user
     * @param {IChatMessage} message - the message to check
     * @param {string} [profileId] - the profile Id to check
     * @method MessagingService#isMessageRead
     * @returns {boolean}
     */
    isMessageRead(message: IChatMessage, profileId?: string): boolean;
    /**
     * Method to create a conversation.
     * @param {IChatConversation} conversation
     * @method MessagingService#createConversation
     * @returns {Promise<boolean>}
     */
    createConversation(conversation: IChatConversation): Promise<boolean>;
    /**
     * Method to update a conversation.
     * @param { IChatConversation } conversation
     * @method MessagingService#updateConversation
     * @returns {Promise<boolean>}
     */
    updateConversation(conversation: IChatConversation): Promise<boolean>;
    /**
     * Method to delete a conversation.
     * @param { string } conversationId
     * @method MessagingService#deleteConversation
     * @returns {Promise<boolean>}
     */
    deleteConversation(conversationId: string): Promise<boolean>;
    /**
     * Method to get the participants of a conversation
     * @param {string} conversationId
     * @method MessagingService#getParticipantsInConversation
     * @returns {Promise<IConversationParticipant[]>}
     */
    getParticipantsInConversation(conversationId: string): Promise<IConversationParticipant[]>;
    /**
     * Method to add participants to a conversation
     * @param { string } conversationId
     * @param {IConversationParticipant[]} participants
     * @method MessagingService#addParticipantsToConversation
     * @returns {Promise<boolean>}
     */
    addParticipantsToConversation(conversationId: string, participants: IConversationParticipant[]): Promise<boolean>;
    /**
     * Method to delete participants from a conversation
     * @param { string } conversationId
     * @param { string[] } participants
     * @method MessagingService#deleteParticipantsFromConversation
     * @returns {Promise<boolean>}
     */
    deleteParticipantsFromConversation(conversationId: string, participants: string[]): Promise<boolean>;
    /**
     * Function to send an is-typing event
     * @param conversationId
     * @method MessagingService#sendIsTyping
     * @returns {Promise<boolean>}
     */
    sendIsTyping(conversationId: string): Promise<boolean>;
    /**
     * Function to send an is-typing off event
     * @param conversationId
     * @method MessagingService#sendIsTypingOff
     * @returns {Promise<boolean>}
     */
    sendIsTypingOff(conversationId: string): Promise<boolean>;
    /**
     * Method to get a page of messages and adapt into IChatMessage entities
     * @param {IChatConversation} conversation
     * @returns {Promise<boolean>}
     */
    private getMessages(conversation);
    /**
     * Map a IConversationDetails2 object into an IChatConversation
     * @param conversation
     */
    private mapConversation(conversation);
    /**
     * Method to compare what is local and what is remote and determine what conversations need adding and removing
     * @param {IConversationDetails2[]} remoteConversations
     * @param {IChatConversation[]} localConversations
     * @returns {IConversationSyncInfo}
     */
    private getConversationSyncInfo(remoteConversations, localConversations);
    /**
     * Keep getting pages of events and applying them onto the store until we hit the end ...
     * @param conversation
     */
    private updateConversationWithEvents(conversation);
    /**
     * Update a conversation by applying new events to the conversation store.
     * New events will be queried in pages and applied until we get all unseen events.
     * Any logical decision regarding whether this conversation is too out of date to be refreshed in this way are not dealt with here.
     * @param {IChatConversation} conversation
     */
    private synchronizeConversation(conversation);
    /**
     * Method to apply an event to the conversation store
     * @param {IConversationMessageEvent} event - the event to apply
     * @returns {Promise<boolean>} - returns a boolean result inside a Promise
     */
    private _applyConversationMessageEvent(event);
    /**
     * Method to apply an event to the conversation store, also updating the IChatConversation
     * @param {IConversationMessageEvent} event - the event to apply
     * @returns {Promise<boolean>} - returns a boolean result inside a Promise
     */
    private applyConversationMessageEvent(event);
    /**
     * handle the event if we are idle (and listening), otherwise cache it ...
     */
    private onConversationMessageEvent(event);
    /**
     * Event handler to handle incoming Conversation Message events
     * @param {IConversationMessageEvent} event
     */
    private _onConversationMessageEvent(event);
    /**
     * Event handler to handle incoming Conversation Deleted events
     * @param {IConversationDeletedEventData} event
     */
    private onConversationDeleted(event);
    /**
     * Event handler to handle incoming Conversation Updated events
     * @param {IConversationUpdatedEventData} event
     */
    private onConversationUpdated(event);
    /**
     * Get a conversation from rest api and load in last page of messages
     * due to a secondary store being in use, the conversation may not exist when trying
     * to query it off the back of a onParticipantAdded event - hence the retry logic ...
     * @param conversationId
     */
    private initialiseConversation(conversationId, depth?);
    /**
     * Event handler to handle incoming Participant Added events
     * @param {IParticipantAddedEventData} event
     */
    private onParticipantAdded(event);
    /**
     * Event handler to handle incoming Participant Removed events
     * @param {IParticipantRemovedEventData} event
     */
    private onParticipantRemoved(event);
    /**
     * Event handler to handle web socket open event
     * @param event
     */
    private onWebsocketOpened(event);
    /**
     * Event handler to handle web socket closed event
     * @param event
     */
    private onWebsocketClosed(event);
}
