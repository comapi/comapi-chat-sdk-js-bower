import { IChatConversation, IChatMessage, IConversationStore } from "./interfaces";
export declare class MemoryConversationStore implements IConversationStore {
    private conversations;
    private messageStore;
    /**
     * MemoryConversationStore class constructor
     * @class MemoryConversationStore
     * @classdesc An in memory implementation of IConversationStore
     */
    constructor();
    /**
     * Method to reset the conversation store
     * @method MemoryConversationStore#reset
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    reset(): Promise<boolean>;
    /**
     * Method to get a conversation given the conversationId
     * @method MemoryConversationStore#getConversation
     * @param {String} conversationId - the conversation id
     * @returns {Promise<IChatConversation>} - Returns a conversation via a promise
     */
    getConversation(conversationId: string): Promise<IChatConversation>;
    /**
     * Method to create a conversation
     * @method MemoryConversationStore#createConversation
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    createConversation(conversation: IChatConversation): Promise<boolean>;
    /**
     * Method to update a conversation
     * @method MemoryConversationStore#updateConversation
     * @param {IChatConversation} conversation - the conversation to update
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    updateConversation(conversation: IChatConversation): Promise<boolean>;
    /**
     * Method to delete a conversation
     * @method MemoryConversationStore#deleteConversation
     * @param {String} conversationId - the conversation id
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    deleteConversation(conversationId: string): Promise<boolean>;
    /**
     * Method to retrieve a conversation message
     * @method MemoryConversationStore#getMessage
     * @param {String} conversationId
     * @param {String} messageId
     * @returns {Promise<IChatMessage>} - Returns a message result via a promise
     */
    getMessage(conversationId: string, messageId: string): Promise<IChatMessage>;
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
    updateMessageStatus(conversationId: string, messageId: string, profileId: string, status: string, timestamp: string): Promise<boolean>;
    /**
     * Method to create a message in the store
     * @method MemoryConversationStore#createMessage
     * @param {IChatMessage} message - the message
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    createMessage(message: IChatMessage): Promise<boolean>;
    /**
     * Method to query the list of conversations in the store
     * @method MemoryConversationStore#getConversations
     * @returns {Promise<IChatConversation[]>} - Returns a list of conversations via a promise
     */
    getConversations(): Promise<IChatConversation[]>;
    /**
     * Method to query the list of messages in the store for a given conversation
     * @method MemoryConversationStore#getMessages
     * @param {String} conversationId - the conversation id
     * @returns {Promise<IChatMessage[]>} - Returns a list of messages via a promise
     */
    getMessages(conversationId: string): Promise<IChatMessage[]>;
    /**
     * Method to delete all messages for a conversation in the store
     * @method MemoryConversationStore#deleteConversationMessages
     * @param {String} conversationId - the conversation id
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    deleteConversationMessages(conversationId: string): Promise<boolean>;
    /**
     * @param conversationId
     */
    private _findConversation(conversationId);
    /**
     * @param conversationId
     */
    private _indexOfConversation(conversationId);
    /**
     *
     * @param conversationId
     * @param messageId
     */
    private _findMessage(conversationId, messageId);
}
