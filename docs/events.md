# Events

All events from the foundation sdk can be listened out for (although most are internally handled)
Here is an example of listening for a profile Updated event ...

### Subscribe to an event
```javascript
sdk.on("profileUpdated", function (event) {
    console.log("profileUpdated", event);
});
```

### Unsubscribe from an event
```javascript
sdk.off("profileUpdated");
```


## Complete list of events


| Event Name | Event Payload | Description |
| ---------- | ------------- | ----------- |
| conversationDeleted | [IConversationDeletedEventData](#iconversationdeletedeventdata) |  Sent when a conversation is deleted
| conversationUndeleted | [IConversationUndeletedEventData](#iconversationundeletedeventdata) |  Sent when a conversation is undeleted
| conversationUpdated | [IConversationUpdatedEventData](#iconversationupdatedeventdata) |  Sent when a conversation is updated
| participantAdded | [IParticipantAddedEventData](#iparticipantaddedeventdata) | Sent when a participant is added to a conversation. When a conversation is created, this event will also fire with the owner's profileId.
| participantRemoved | [IParticipantRemovedEventData](#iparticipantremovedeventdata) |  Sent when a participant is removed to a conversation. App needs to check whether the participant is the current user and locally remove the conversation from the UI.
| participantTyping | [IParticipantTypingEventData](#iparticipanttypingeventdata) | Sent when a participant is typing in a conversation
| participantTypingOff | [IParticipantTypingOffEventData](#iparticipanttypingoffeventdata) | Sent when a participant has stopped typing in a conversation
| profileUpdated | [IProfileUpdatedEvent](#iprofileupdatedevent) | Sent when a user's profile is updated  
| conversationMessageEvent | [IConversationMessageEvent](#iconversationmessageevent) | This event is sent for all conversation message related activity. It encapsulates the `sent`, `delivered` and `read` events. It is defined like this so you can handle web-socket conversation message events and events requested from  `sdk.services.appMessaging.getConversationEvents()` seamlessly.

