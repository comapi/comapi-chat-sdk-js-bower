import { IChatConversation, IChatMessage, IConversationStore } from "./interfaces";
export declare class IndexedDBConversationStore implements IConversationStore {
    private _initialised;
    private _database;
    private _DbNme;
    private _ConversationsStore;
    private _MessagesStore;
    private _DbVersion;
    /**
     * IndexedDBConversationStore class constructor
     * @class IndexedDBConversationStore
     * @classdesc An indexedDb implementation of IConversationStore
     */
    constructor();
    /**
     * Method to get a conversation given the conversationId
     * @method IndexedDBConversationStore#getConversation
     * @param {String} conversationId - the conversation id
     * @returns {Promise<IChatConversation>} - Returns a conversation via a promise
     */
    getConversation(conversationId: string): Promise<IChatConversation>;
    /**
     * Method to create a conversation
     * @method IndexedDBConversationStore#createConversation
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    createConversation(conversation: IChatConversation): Promise<boolean>;
    /**
     * Method to update a conversation
     * @method IndexedDBConversationStore#updateConversation
     * @param {IChatConversation} conversation - the conversation to update
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    updateConversation(conversation: IChatConversation): Promise<boolean>;
    /**
     * Method to delete a conversation
     * @method IndexedDBConversationStore#deleteConversation
     * @param {String} conversationId - the conversation id
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    deleteConversation(conversationId: string): Promise<boolean>;
    /**
     * Method to retrieve a conversation message
     * @method IndexedDBConversationStore#getMessage
     * @param {String} conversationId
     * @param {String} messageId
     * @returns {Promise<IChatMessage>} - Returns a message result via a promise
     */
    getMessage(conversationId: string, messageId: string): Promise<IChatMessage>;
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
    updateMessageStatus(conversationId: string, messageId: string, profileId: string, status: string, timestamp: string): Promise<boolean>;
    /**
     * Method to create a message in the store
     * @method IndexedDBConversationStore#createMessage
     * @param {IChatMessage} message - the message
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    createMessage(message: IChatMessage): Promise<boolean>;
    /**
     * Method to query the list of conversations in the store
     * @method IndexedDBConversationStore#getConversations
     * @returns {Promise<IChatConversation[]>} - Returns a list of conversations via a promise
     */
    getConversations(): Promise<IChatConversation[]>;
    /**
     * Method to query the list of messages in the store for a given conversation
     * @method IndexedDBConversationStore#getMessages
     * @param {String} conversationId - the conversation id
     * @returns {Promise<IChatMessage[]>} - Returns a list of messages via a promise
     */
    getMessages(conversationId: string): Promise<IChatMessage[]>;
    /**
     * Method to delete all messages for a conversation in the store
     * @method IndexedDBConversationStore#deleteConversationMessages
     * @param {String} conversationId - the conversation id
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    deleteConversationMessages(conversationId: string): Promise<boolean>;
    /**
     * Method to reset the conversation store
     * @method IndexedDBConversationStore#reset
     * @returns {Promise<boolean>} - Returns a boolean result via a promise
     */
    reset(): Promise<boolean>;
    /**
     *
     */
    private ensureInitialised();
    /**
     * Create the database and stores
     */
    private initialise();
    /**
     *
     * @param message
     */
    private putMessage(message);
    /**
     *
     * @param conversation
     */
    private putConversation(conversation);
    /**
     * Method to clear the data in an object store
     * @method ConversationStore#clearObjectStore
     * @param {string} objectStore : the object store to clear
     * @returns {Promise} - returns a promise
     */
    private clearObjectStore(objectStoreName);
    /**
     *
     * @param conversationId
     */
    private _deleteConversation(conversationId);
}
