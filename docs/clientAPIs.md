# Client APIs

The following interfaces are available from the chat client:
Please refer to the foundatin documentation for further details of these inherited interfaces.

## Session
This interface is simply the foundation session service exposed.

```javascript
    chatClient.session.startSession()
    .then(function(session){
        console.log("Got a session");
    });
```

## Profile
This interface is simply the foundation profile service exposed.

```javascript
    chatClient.profile.getMyProfile()
    .then(function(profile){
        console.log("Got my profile");
    });
```

## Messaging
THis is the chat messaging interface. It is documented in more detail [here](./messagingService.md)

## Device
This interface is simply the foundation device service exposed.

```javascript
this.chatClient.device.setAPNSPushDetails("my.bundle.id", Environment.development, ">> my push token <<")
    .then(function(succeeded){
        console.log("done");
    });
```

## Channels
This interface is simply the foundation channels service exposed.

## Foundation
This interface is simply the foundation interface exposed.