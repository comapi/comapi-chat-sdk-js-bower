"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryConversationStore = (function () {
    /**
     * MemoryConversationStore class constructor
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
            // not going to bother checking existence in reference implementation ...
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
     * Method to update a conversation
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
     * @param conversationId
     */
    MemoryConversationStore.prototype._findConversation = function (conversationId) {
        var result = this.conversations.filter(function (x) { return x.id === conversationId; });
        return result.length === 1 ? result[0] : null;
    };
    /**
     * @param conversationId
     */
    MemoryConversationStore.prototype._indexOfConversation = function (conversationId) {
        return this.conversations.map(function (c) { return c.id; }).indexOf(conversationId);
    };
    /**
     *
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