"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sdk_js_foundation_1 = require("@comapi/sdk-js-foundation");
var sdk_js_foundation_2 = require("@comapi/sdk-js-foundation");
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
        console.log("onWebsocketOpened()", event);
        if (this._isInitialised) {
            console.log("syncing on WebsocketOpened event");
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
        console.log("onWebsocketClosed()", event);
    };
    return MessagingService;
}());
exports.MessagingService = MessagingService;
//# sourceMappingURL=messagingService.js.map