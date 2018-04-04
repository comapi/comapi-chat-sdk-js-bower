# Messaging Service

This service provides the main functionality of the chat sdk. Here is a list of functions along with a description.


## synchronize

This method synchronises the conversation store. It does this in the following manner:

Obtains a list of conversations that this user is a participant in from comapi backend.

Iterate over list of conversations comparing what is stored locally in conversation store. Local conversations are added / updated as necessary.

There is a concept of lazy loading with a configurable threshold - use the `withLazyLoadThreshold()` method on the `ComapiChatConfig` interface to specify the desired value. The sdk will order all local conversations by date and only synchronise the first n conversations specified by the lazyLoadThreshold.

If a conversation that doesn't get synchronised subsequently receives an event, (i.e. a new message) It will get synchronised at that point. It will also get synchronised with a call to `getConversationInfo()` - see below

## getPreviousMessages

The sdk will only retrieve the last page of messages for a conversation when it synchronises. To implement an infinite scroll style interface you call this method. It will load another page of historic messages.

The page size is configurable - use the `withMessagePageSize()` method on the `ComapiChatConfig` interface to specify the desired value.

The method returns a boolean result via a promise. If you are at the beginning of the conversation (i.e you have all the messages) and you call this method the boolean result will be false. 

## getConversations

Method to return a list of all the conversations a user is part of.

```javascript
chatClient.messaging.getConversations(conversationId)
    .then(conversations => {
        console.log("got conversations", conversations);
    });
```


## getConversationInfo

Method to get conversation info to render a detail view.
It will return an object containing messages, conversation info and participant info.
The conversation will be synchronised if necessary during this call.

```javascript
chatClient.messaging.getConversationInfo(conversationId)
    .then(info => {
        console.log("got info", info);
    });
```

an `IChatConversationInfo` object is returned via a Promise

```javascript
export interface IChatConversationInfo {
    conversation: IChatConversation;
    messages?: IChatMessage[];
    participants?: IConversationParticipant[];
}
```


## sendTextMessage

Method to send a simple text message to a conversation

```javascript
chatClient.messaging.sendTextMessage("Hello world")
    .then(result => {
        console.log("sent!");
    });
```

## sendMessage

Method to send a message to a conversation. This message needs to be created with the MessageBuilder helper object. THis gives you full control of the message and its constituent parts.

```javascript
import { MessageBuilder } from '@comapi/sdk-js-chat';

let message = new MessageBuilder().withText("Hello world");

chatClient.messaging.sendMessage("your conversation id", message)
    .then(result => {
        console.log("sent!");
    });
```

```javascript
var message = new COMAPI_CHAT.MessageBuilder().withText("Hello world");

chatClient.messaging.sendMessage("your conversation id", message)
    .then(function(result){
        console.log("sent!");
    });
```

See foundation sdk for more details of `MessageBuilder`


## sendAttachment
Method to create an attachment via the content api, create a message part(s) using the attachment url and the optional message and send it.


```javascript
var contentData = COMAPI_CHAT.ContentData.createFromFile(attachment);

chatClient.messaging.sendAttachment(conversationId, contentData)
    .then(function (result) {
        console.log("sent!");        
    });
```


## messageFromContentData

Method to create an attachment via the content api and create a message part. An optional text message can also be specified to accompany the attachment.

Note: the variable `attachment` below, is a [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object 

```javascript
var contentData = COMAPI_CHAT.ContentData.createFromFile(attachment);
 
chatClient.messaging.messageFromContentData(contentData)
    .then(function (message) {
        chatClient.messaging.sendMessage(conversationId, message)
    });
```

## markMessagesAsRead

Method to mark the specified messages  as read.
See foundation docs for more info 

## markAllMessagesAsRead

Go through all the messages we have in the store for the given conversation Id and mark them as read if necessary

See foundation docs for more info 

## isMessageRead

Method to determine whether a message has been read. If a ProfileId is specified, that is checked, otherwise we check the current user

## createConversation

Method to create a conversation.
Creates a conversation in the Comapi backend and then inserts into the local conversation store.

## updateConversation

Method to update a conversation.
See foundation docs for more info 

## deleteConversation

Method to delete a conversation.
Deletes conversation in comapi backend and then removes from local conversation store.

## getParticipantsInConversation

Method to get the participants of a conversation
See foundation docs for more info 

## addParticipantsToConversation

Method to add participants to a conversation
See foundation docs for more info 

## deleteParticipantsFromConversation

Method to delete participants from a conversation
See foundation docs for more info 

## sendIsTyping

Function to send an is-typing event
See foundation docs for more info 

## sendIsTypingOff

Function to send an is-typing off event
See foundation docs for more info 