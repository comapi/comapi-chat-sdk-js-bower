# Conversation Store

The chat interface delegates responsibility of storing chat related data to a conversation store which is implemented by the integrator (we supply some reference implementations). When new messages arrive, new conversations are created, messages are marked as read, the sdk will update the conversation store via the following interface:


```javascript
/**
 * 
 */
export interface IConversationStore {

    getConversations(): Promise<IChatConversation[]>;

    getConversation(conversationId: string): Promise<IChatConversation>;
    createConversation(conversation: IChatConversation): Promise<boolean>;
    updateConversation(conversation: IChatConversation): Promise<boolean>;
    deleteConversation(conversationId: string): Promise<boolean>;
    deleteConversationMessages(conversationId: string): Promise<boolean>;

    reset(): Promise<boolean>;
    // sdk calls this to see whether it needs to update / add the new message 
    getMessage(conversationId: string, messageId: string): Promise<IChatMessage>;
    // read / delivered info has been added, hand back to client to store ...
    updateMessageStatus(conversationId: string, messageId: string, profileId: string, status: string, timestamp: string): Promise<boolean>;
    // getMessageStatus(conversationId: string, messageId: string): Promise<boolean>;

    // new message added 
    createMessage(message: IChatMessage): Promise<boolean>;

    getMessages(conversationId: string): Promise<IChatMessage[]>;
}
```

We have implementations for in-memory and indexedDb stores that can be used. You could use these directly or use the source as a starting point to implement your own. The conversation stores are passed to the chat sdk during initialisation.

Here is an example of using the built-in memory store ... 

# ES6 Syntax
Note the imports 
```javascript
import { ComapiChatClient, ComapiChatConfig, MemoryConversationStore } from '@comapi/sdk-js-chat';

let store = new MemoryConversationStore()

let comapiConfig = new ComapiChatConfig()    
    .withStore(store)
    .withApiSpace(">>> Your API SPACE ID <<<")
    .withAuthChallenge(this.authChallenge.bind(this));

let chatClient = new ComapiChatClient();

chatClient.initialise(comapiConfig)
    .then(succeeded => {
        console.log("initialised!");
    });
```

# Traditional Syntax
Note the use of the global COMAPI_CHAT object.
```javascript
var store = new COMAPI_CHAT.MemoryConversationStore();

var comapiConfig = new COMAPI_CHAT.ComapiChatConfig()    
    .withStore(store)
    .withApiSpace(">>> Your API SPACE ID <<<")
    .withAuthChallenge(authChallenge);

var chatClient = new COMAPI_CHAT.ComapiChatClient()

chatClient.initialise(comapiConfig)
    .then(function(succeeded){
        console.log("initialised!");
    });

```

# Implement your own

You may want to implement your own interface if you require to perform any custom action when new messages are delivered etc. The Angular 1.x based sample app implements its own store. The reason being that it uses `$q` instead of native Promises so that Angular's change detection seamlessly works. The angular 4 sample just uses the stock interface as Angular4 internally uses zone.js to monkey patch all async operations.

Both of these 2 angular samples rely on Angular's binding mechanism to keep the views up to date. If you are not using a framework that supports this kind of binding, you will need to hook into some of these store methods. You could publish an event that your view code could consume and subsequently redraw the view / append the new data.

# Asynchronous methods
All of the store interface methods are asynchronous and return promises. The reason being that all of the native persistence interfaces supported by the browser are asynchronous.

Please note that if you implement your own interface, you run the risk of breaking the sdk if your code throws an exception or fails to resolve a promise.

