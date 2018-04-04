# Initialisation


To initialise the sdk, you need to setup a ComapiChatConfig object create an instance of the sdk and then call the initialise method passing in the config object.



# ES6

```javascript

import { IAuthChallengeOptions, LogPersistences, OrphanedEventPersistences } from '@comapi/sdk-js-foundation';
import { ComapiChatClient, ComapiChatConfig } from '@comapi/sdk-js-chat';

// We will discuss this in it's own section
import { ConversationStore } from '???';

export class ComapiService {

    private chatClient: ComapiChatClient;
    private comapiConfig: ComapiChatConfig;

    constructor(private _authService: AuthService, private _conversationStore ConversationStore) { 

        // create / initialise ComapiChatConfig
        this.comapiConfig = new ComapiChatConfig()
            .withStore(_conversationStore)
            .withApiSpace(">> YOUR APP SPACE ID <<<")
            .withAuthChallenge(this.authChallenge.bind(this));
    }

    /**
     * Auth Challenge.
     */ 
    private authChallenge(options: IAuthChallengeOptions, answerAuthenticationChallenge) {
        this._authService.getToken(options.nonce)
            .then((token) => {
                answerAuthenticationChallenge(token);
            });
    }


    public initialise(): Promise<boolean> {
        if (this.chatClient) {
            return Promise.resolve(false);
        } else {
            this.chatClient = new ComapiChatClient();
            return this.chatClient.initialise(this.comapiConfig);
        }
    }

    public uninitialise(): Promise<boolean> {
        return this.chatClient.uninitialise()
            .then(function () {
                this.chatClient = undefined;
                return true;
            });
    }

}
```

## Advanced options

The above examples initialised the SDK with minimal configuration. You can customise the sdk behaviour with the following optional settings.

You can ue the following chainable methods to further configure the sdk:

### withEventPageSize(eventPageSize: number)
This parameter defaults to 10

If a gap in the conversation messages is detected, the sdk will fill this up by querying the missing events in pages until the gap is filled. This parameter represents the page size. 

### withMessagePageSize(messagePageSize: number)
This parameter defaults to 10

### withLazyLoadThreshold(lazyLoadThreshold: number)
This parameter defaults to 1

### withMaxEventGap(maxEventGap: number)
This parameter defaults to 100

### withAutoSynchronize(autoSynchronize: boolean)
This parameter defaults to true


# Authentication

## JWT

The Comapi Auth Challenge needs to generate and return a [jwt](https://jwt.io/) via the answerAuthenticationChallenge method.

There are 4 pieces fo data that need to be specified in the Comapi portal for the ApiSpace auth settings

1) Issuer
2) Audience
3) Shared Secret
4) ID Claim

A cryptographic [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) is used as part of the authentication flow. This is passed into the authChallenge (`options.nonce`) and needs to be added as a claim in the generated jwt.

The below sample uses [jsrsasign](https://kjur.github.io/jsrsasign/) to dynamically create a client side jwt  ...

```javascript
function authChallenge (options, answerAuthenticationChallenge) {
    // Header
    var oHeader = { alg: 'HS256', typ: 'JWT' };
    // Payload
    var tNow = KJUR.jws.IntDate.get('now');
    var tEnd = KJUR.jws.IntDate.get('now + 1day');
    var oPayload = {
        sub: "john smith",
        nonce: options.nonce,
        iss: "https://my-issuer.com",
        aud: "https://my-audience.com",
        iat: tNow,
        exp: tEnd,
    };
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "my shared secret");
    answerAuthenticationChallenge(sJWT);
}
```

This node express method uses the [njwt](https://github.com/jwtk/njwt) package. and achieves the same as above but server - side 

```javascript
/**
 * @Params {string} req.body.username
 * @Params {string} req.body.password
 * @Params {string} req.body.nonce
 */
app.post('/authenticate', function (req, res, next) {

    // TODO: authenticate username & password ...

    var claims = {
        iss: "https://my-issuer.com",
        sub: req.body.username,
        nonce: req.body.nonce,
        aud: "https://my-audience.com"
    }

    var jwt = njwt.create(claims, "my shared secret");
    var token = jwt.compact();
    res.json({ jwt: token });
});
```

The following auth challenge could be used in conjunction with the above node endpoint ..

```javascript
function authChallenge (options, answerAuthenticationChallenge) {

    $http.post("/authenticate", { 
            username: "johnSmith" 
            password: "Passw0rd!",
            nonce: options.nonce })
        .then(function (response) {
            answerAuthenticationChallenge(response.data.token);
        })
        .catch(function (error) {
            answerAuthenticationChallenge(null);
        });
}
```


