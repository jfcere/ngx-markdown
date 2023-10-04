Simptel Authorization Server
============================

REST API of the Simptel Authorization Server

More information: [https://helloreverb.com](https://helloreverb.com)

Contact Info: [hello@helloreverb.com](hello@helloreverb.com)

Version: 1.0.0

All rights reserved

http://apache.org/licenses/LICENSE-2.0.html

Access
------

1.  HTTP Basic Authentication

Methods
-------

\[ Jump to [Models](#models) \]

### Table of Contents

#### [AccountrecoveryCallback](#AccountrecoveryCallback)

    post /accountrecovery/callback

#### [AuthLogin](#AuthLogin)

    post /auth/login

#### [AuthLogout](#AuthLogout)

    get /auth/logout

#### [AuthOpenid](#AuthOpenid)

    get /auth/openid

#### [Oauth2Authorize](#Oauth2Authorize)

    get /oauth2/authorize

#### [Oauth2Jwks](#Oauth2Jwks)

    get /oauth2/jwks

#### [Oauth2Token](#Oauth2Token)

    post /oauth2/token

#### [Oauth2TokenIntrospect](#Oauth2TokenIntrospect)

    post /oauth2/token/introspect

#### [Oauth2TokenRevoke](#Oauth2TokenRevoke)

    post /oauth2/token/revoke

#### [Oauth2WellKnownOpenidConfiguration](#Oauth2WellKnownOpenidConfiguration)

    get /oauth2/.well-known/openid-configuration

#### [RegistrationCallback](#RegistrationCallback)

    post /registration/callback

#### [Sessions](#Sessions)

    get /sessions

#### [SessionsBucket](#SessionsBucket)

    put /sessions/bucket

#### [SessionsSession](#SessionsSession)

    delete /sessions/session

    get /sessions/session

#### [SessionsSessionExtend](#SessionsSessionExtend)

    get /sessions/session/extend

#### [SessionsSessionId](#SessionsSessionId)

    delete /sessions/session/{id}
    
    get /sessions/session/{id}

#### [SessionsSessionRefresh](#SessionsSessionRefresh)

    get /sessions/session/refresh

AccountrecoveryCallback
=======================

[Up](#methods)

    post /accountrecovery/callback

Verifies the TOTP (Time-based One-Time Password) during account recovery, allowing the user to obtain an access token. (accountrecoveryCallbackPost)

### Consumes

This API call consumes the following media types via the Content-Type request header:

* `application/json`

### Request body

body [object](#object) (optional)

Body Parameter —

### Request headers

### Query parameters

applicationId (optional)

Query Parameter — The ID of the IAM (Identity and Access Management) application.

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "data": {
            "applicationId":"<string>",
            "email":"<email>",
            "mode":"accountRecovery"
        },
        "message":"<string>"
    }

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

AuthLogin
=========

[Up](#methods)

    post /auth/login

Authenticate a user (authLoginPost)

Verifies the provided username or email and password, returning an access token upon successful authentication.

### Consumes

This API call consumes the following media types via the Content-Type request header:

* `application/json`

### Request body

body [object](#object) (optional)

Body Parameter —

### Request headers

### Query parameters

applicationId (optional)

Query Parameter — Identifier of the IAM (Identity and Access Management) application.

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "email":"<string>",
        "applicationId":"<string>",
        "mode":"authentication"
    }

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 404

Not Found [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

AuthLogout
==========

[Up](#methods)

    get /auth/logout

Initiates the logout process for an authenticated user. (authLogoutGet)

### Request headers

### Query parameters

post\_logout\_redirect_uri (optional)

Query Parameter — Logout parameters.

state (optional)

Query Parameter — Logout parameters.

client_id (optional)

Query Parameter — Logout parameters.

id\_token\_hint (optional)

Query Parameter — Logout parameters.

logout_hint (optional)

Query Parameter — Logout parameters.

ui_locales (optional)

Query Parameter — Logout parameters.

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {"message":"<string>"}

#### 400

Bad Request [Object](#Object)

### Example data

Content-Type: application/json

    {"error":"<string>"}

* * *

AuthOpenid
==========

[Up](#methods)

    get /auth/openid

Initiates the OpenID Connect authentication flow (authOpenidGet)

Initiates the OpenID Connect authorization flow for a user to authenticate and obtain an access token. The callback URL /auth/oidc/login will be invoked on success.

### Request headers

### Query parameters

client_id (optional)

Query Parameter — The client ID of the external provider

redirect_uri (optional)

Query Parameter — The redirect URI

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {"message":"<string>"}

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 404

Not Found [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

Oauth2Authorize
===============

[Up](#methods)

    get /oauth2/authorize

Initiates the OAuth 2.1 authorization flow (oauth2AuthorizeGet)

This endpoint initiates the OAuth 2.1 authorization flow. It supports various grant types including authorization code and refresh token. The authorization interface is the screen users see when granting applications access to their account. When implementing an OAuth server, you are enabling a developer community to build applications that leverage your platform, allowing applications to access and potentially modify private user content, or act on behalf of users. Because of this, you need to ensure you are empowering your users with as much information as possible to protect their accounts and ensure they are informed as to what applications are doing with their accounts. For more details and libraries supporting OAuth 2.1 and OpenID Connect, visit https://oauth.net/code/

### Query parameters

response_type (optional)

Query Parameter — (Required) Specifies the type of response required, must be set to 'code' as per OAuth 2.1 protocol.

client_id (optional)

Query Parameter — (Required) Unique identifier of the client application seeking access.

redirect_uri (optional)

Query Parameter — (Required) The URI to redirect user after authorization is granted or denied.

scope (optional)

Query Parameter — Specifies the scope of access request, might include multiple space-separated values.

state (optional)

Query Parameter — Value used by the client to maintain state between the request and callback. Prevents cross-site request forgery.

code_challenge (optional)

Query Parameter — (Required) Challenge derived from the code verifier for PKCE.

code\_challenge\_method (optional)

Query Parameter — (Required) Method used to derive the code challenge, either 'plain' or 'S256'.

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `text/plain`

### Responses

#### 302

Found [String](#String)

### Example data

Content-Type: text/plain

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 403

Forbidden [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

Oauth2Jwks
==========

[Up](#methods)

    get /oauth2/jwks

Get JWKS (oauth2JwksGet)

This endpoint returns the JSON Web Key Set (JWKS), which can be used to verify the JWTs issued by the authorization server.

### Request headers

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "keys": [
            {
                "kty":"<string>",
                "use":"<string>",
                "kid":"<string>",
                "alg":"<string>",
                "n":"<string>",
                "e":"<string>"
            },
            {
                "kty":"<string>",
                "use":"<string>",
                "kid":"<string>",
                "alg":"<string>",
                "n":"<string>",
                "e":"<string>"
            }
        ]
    }

* * *

Oauth2Token
===========

[Up](#methods)

    post /oauth2/token

Exchange grant for Access Token (oauth2TokenPost)

This operation exchanges an authorization grant (e.g., authorization code, refresh token, client credentials) for an access token and, optionally, a refresh token. This endpoint adheres to the OAuth 2.1 specification, and supports multiple methods for client authentication including "client\_secret\_post" and "client\_secret\_basic". Depending on the method used, the client provides authentication details either in the request body (for "client\_secret\_post") or in the "Authorization" header (for "client\_secret\_basic"). For more extensive information, visit: https://oauth.net/code/

### Consumes

This API call consumes the following media types via the Content-Type request header:

* `application/x-www-form-urlencoded`

### Request headers

### Form parameters

grantType (optional)

Form Parameter —

code (optional)

Form Parameter —

redirectUri (optional)

Form Parameter —

clientId (optional)

Form Parameter —

codeVerifier (optional)

Form Parameter —

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "accessToken":"<string>",
        "tokenType":"<string>",
        "expiresIn":"<long>",
        "refreshToken":"<string>",
        "exampleParameter":"<string>"
    }

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 404

Not Found [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

Oauth2TokenIntrospect
=====================

[Up](#methods)

    post /oauth2/token/introspect

Token Introspection Endpoint (oauth2TokenIntrospectPost)

Provides a method to introspect an OAuth 2.0 token (RFC 7662), to verify its active state and retrieve associated metadata. Conforms to OAuth 2.1 guidelines.

### Consumes

This API call consumes the following media types via the Content-Type request header:

* `application/x-www-form-urlencoded`

### Request headers

### Form parameters

token (optional)

Form Parameter —

tokenTypeHint (optional)

Form Parameter —

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "active":"<boolean>",
        "scope":"<string>",
        "client_id":"<string>",
        "username":"<string>",
        "token_type":"<string>",
        "exp":"<integer>",
        "iat":"<integer>",
        "nbf":"<integer>"
    }

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

Oauth2TokenRevoke
=================

[Up](#methods)

    post /oauth2/token/revoke

Token Revocation Endpoint (oauth2TokenRevokePost)

Provides a method to revoke an OAuth 2.0 token (RFC 7009), making the token invalid. Conforms to OAuth 2.1 guidelines.

### Consumes

This API call consumes the following media types via the Content-Type request header:

* `application/x-www-form-urlencoded`

### Request headers

### Form parameters

token (optional)

Form Parameter —

tokenTypeHint (optional)

Form Parameter —

### Return type

String

### Example data

Content-Type: application/json

    ""

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `text/plain`

### Responses

#### 200

OK [String](#String)

### Example data

Content-Type: text/plain

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

Oauth2WellKnownOpenidConfiguration
==================================

[Up](#methods)

    get /oauth2/.well-known/openid-configuration

The OAuth 2.0 Token Endpoint (oauth2WellKnownOpenidConfigurationGet)

Use open source libraries to perform OAuth 2.0 and OpenID Connect available for any programming language. You can find a list of libraries at https://oauth.net/code/

### Return type

String

### Example data

Content-Type: application/json

    ""

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `text/plain`

### Responses

#### 200

OK [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 404

Not Found [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

RegistrationCallback
====================

[Up](#methods)

    post /registration/callback

Verifies the OTP for registration and returns an access token. (registrationCallbackPost)

This endpoint is used for the verification of the One-Time Password (OTP) during user registration. Upon successful verification, the user is provided with an access token.

### Consumes

This API call consumes the following media types via the Content-Type request header:

* `application/json`

### Request body

body [object](#object) (optional)

Body Parameter —

### Request headers

### Query parameters

applicationId (optional)

Query Parameter — (Required) The unique identifier of the IAM application initiating the registration process.

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "data": {
            "applicationId":"<string>",
            "email":"<email>",
            "mode":"registration"
        },
        "message":"<string>"
    }

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

Sessions
========

[Up](#methods)

    get /sessions

Get logged in users sessions (sessionsGet)

### Request headers

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "_id":"<string>",
        "expires":"<string>",
        "data":{
            "cookie":{
                "originalMaxAge":"<integer>",
                "expires":"<string>",
                "secure":false,
                "httpOnly":true,
                "path":"/"
            },
            "phonenumber":"<string>",
            "user":{
                "authentication":{"issuer":"<array>"},
                "_id":"<string>",
                "email":"<string>",
                "__v":0,
                "accessId":"<array>",
                "active":true,
                "createdAt":"<string>",
                "emailVerified":true,
                "mfaMethods":[
                    {
                        "name":"<string>",
                        "value":"<string>"
                    },
                    {
                        "name":"<string>",
                        "value":"<string>"
                    }
                ],
                "mfaSteps":0,
                "phoneVerified":false,
                "updatedAt":"<string>",
                "username":"<string>",
                "firstname":"<string>",
                "lastname":"<string>",
                "phonenumber":"<string>"
            },
            "useragent":{
                "ua":"<string>",
                "browser":{
                    "name":"<string>",
                    "version":"<string>",
                    "major":"<string>"
                },
                "engine":{
                    "name":"<string>",
                    "version":"<string>"
                },
                "device":{},
                "cpu":{"architecture":"<string>"}
            },
            "ip":"<string>",
            "permission":{
                "create":"<array>",
                "read":"<array>",
                "update":"<array>",
                "delete":"<array>"
            },
            "MFAInputsBucket":{},
            "sessionID":"<string>",
            "email":"<string>",
            "passport":{
                "user":{
                    "authentication":{"issuer":"<array>"}
                },
                "_id":"<string>",
                "email":"<string>",
                "__v":"<number>",
                "accessId":"<array>",
                "active":true,
                "createdAt":"<string>",
                "emailVerified":true,
                "mfaMethods":[
                    {
                        "name":"<string>",
                        "value":"<string>"
                    },
                    {
                        "name":"<string>",
                        "value":"<string>"
                    }
                ],
                "mfaSteps":"<number>",
                "phoneVerified":false,
                "updatedAt":"<string>",
                "username":"<string>",
                "firstname":"<string>",
                "lastname":"<string>",
                "phonenumber":"<string>"
            }
        }
    }

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

SessionsBucket
==============

[Up](#methods)

    put /sessions/bucket

update session bucket (sessionsBucketPut)

### Consumes

This API call consumes the following media types via the Content-Type request header:

* `application/json`

### Request body

body [object](#object) (optional)

Body Parameter —

### Request headers

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "data":{
            "cookie":{
                "originalMaxAge":"<integer>",
                "expires":"<string>",
                "secure":false,
                "httpOnly":true,
                "path":"/"
            },
            "phonenumber":"<string>",
            "user":{
                "authentication":{"issuer":"<array>"},
                "_id":"<string>",
                "email":"<string>",
                "__v":0,
                "accessId":"<array>",
                "active":true,
                "createdAt":"<string>",
                "emailVerified":true,
                "mfaMethods":[
                    {
                        "name":"<string>",
                        "value":"<string>"
                    },
                    {
                        "name":"<string>",
                        "value":"<string>"
                    }
                ],
                "mfaSteps":0,
                "phoneVerified":false,
                "updatedAt":"<string>",
                "username":"<string>",
                "firstname":"<string>",
                "lastname":"<string>",
                "phonenumber":"<string>"
            },
            "useragent":{
                "ua":"<string>",
                "browser":{
                    "name":"<string>",
                    "version":"<string>",
                    "major":"<string>"
                },
                "engine":{
                    "name":"<string>",
                    "version":"<string>"
                },
                "device":{},
                "cpu":{"architecture":"<string>"}
            },
            "ip":"<string>",
            "permission":{
                "create":"<array>",
                "read":"<array>",
                "update":"<array>",
                "delete":"<array>"
            },
            "MFAInputsBucket":{},
            "sessionID":"<string>",
            "authorize":{
                "WdDyzvZI":{
                    "protocol":"<string>",
                    "client":"<string>",
                    "redirectURI":"<string>",
                    "req":{
                        "type":"<string>",
                        "clientID":"<string>",
                        "redirectURI":"<string>",
                        "scope":"<array>","state":"<string>"
                    }
                }
            }
        }
    }

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

SessionsSession
===============

[Up](#methods)

    delete /sessions/session

Close current session (sessionsSessionDelete)

### Return type

String

### Example data

Content-Type: application/json

    ""

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `text/plain`

### Responses

#### 200

OK [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

[Up](#methods)

    get /sessions/session

Get current session (sessionsSessionGet)

### Request headers

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "data":{
            "cookie":{
                "originalMaxAge":"<integer>",
                "expires":"<string>",
                "secure":false,
                "httpOnly":true,
                "path":"/"
            },
            "phonenumber":"<string>",
            "user":{
                "authentication":{"issuer":"<array>"},
                "_id":"<string>",
                "email":"<string>",
                "__v":0,
                "accessId":"<array>",
                "active":true,
                "createdAt":"<string>",
                "emailVerified":true,
                "mfaMethods":[
                    {
                        "name":"<string>",
                        "value":"<string>"
                    },
                    {
                        "name":"<string>",
                        "value":"<string>"
                    }
                ],
                "mfaSteps":0,
                "phoneVerified":false,
                "updatedAt":"<string>",
                "username":"<string>",
                "firstname":"<string>",
                "lastname":"<string>",
                "phonenumber":"<string>"
            },
            "useragent":{
                "ua":"<string>",
                "browser":{
                    "name":"<string>",
                    "version":"<string>",
                    "major":"<string>"
                },
                "engine":{
                    "name":"<string>",
                    "version":"<string>"
                },
                "device":{},
                "cpu":{"architecture":"<string>"}
            },
            "ip":"<string>",
            "permission":{
                "create":"<array>",
                "read":"<array>",
                "update":"<array>",
                "delete":"<array>"
            },
            "MFAInputsBucket":{},
            "sessionID":"<string>",
            "email":"<string>",
            "passport":{
                "user":{
                    "authentication":{"issuer":"<array>"}
                },
                    "_id":"<string>",
                    "email":"<string>",
                    "__v":"<number>",
                    "accessId":"<array>","active":true,"createdAt":"<string>","emailVerified":true,"mfaMethods":[{"name":"<string>","value":"<string>"},{"name":"<string>","value":"<string>"}],"mfaSteps":"<number>","phoneVerified":false,"updatedAt":"<string>","username":"<string>","firstname":"<string>","lastname":"<string>","phonenumber":"<string>"}}}

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

SessionsSessionExtend
=====================

[Up](#methods)

    get /sessions/session/extend

Extend session (sessionsSessionExtendGet)

### Return type

String

### Example data

Content-Type: application/json

    ""

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `text/plain`

### Responses

#### 200

OK [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

SessionsSessionId
=================

[Up](#methods)

    delete /sessions/session/{id}

Close session by id (sessionsSessionIdDelete)

### Path parameters

id (required)

Path Parameter —

### Return type

String

### Example data

Content-Type: application/json

    ""

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `text/plain`

### Responses

#### 200

OK [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

[Up](#methods)

    get /sessions/session/{id}

Get session by id (sessionsSessionIdGet)

### Path parameters

id (required)

Path Parameter —

### Request headers

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "data":{
            "cookie":{
                "originalMaxAge":"<integer>",
                "expires":"<string>",
                "secure":false,
                "httpOnly":true,
                "path":"/"
            },
            "phonenumber":"<string>",
            "user":{
                "authentication":{"issuer":"<array>"},
                "_id":"<string>",
                "email":"<string>",
                "__v":0,"accessId":"<array>",
                "active":true,
                "createdAt":"<string>",
                "emailVerified":true,
                "mfaMethods":[
                    {
                        "name":"<string>",
                        "value":"<string>"
                    },
                    {
                        "name":"<string>",
                        "value":"<string>"
                    }
                ],
                "mfaSteps":0,
                "phoneVerified":false,
                "updatedAt":"<string>",
                "username":"<string>",
                "firstname":"<string>",
                "lastname":"<string>",
                "phonenumber":"<string>"
            },
            "useragent":{
                "ua":"<string>",
                "browser":{
                    "name":"<string>",
                    "version":"<string>",
                    "major":"<string>"
                },
                "engine":{
                    "name":"<string>",
                    "version":"<string>"
                },
                "device":{},
                "cpu":{"architecture":"<string>"}
            },
            "ip":"<string>",
            "permission":{
                "create":"<array>",
                "read":"<array>",
                "update":"<array>",
                "delete":"<array>"
            },
            "MFAInputsBucket":{},
            "sessionID":"<string>",
            "authorize":{
                "WdDyzvZI":{
                    "protocol":"<string>",
                    "client":"<string>",
                    "redirectURI":"<string>",
                    "req":{
                        "type":"<string>",
                        "clientID":"<string>",
                        "redirectURI":"<string>",
                        "scope":"<array>",
                        "state":"<string>"
                    }
                }
            }
        }
    }

#### 400

Bad Request [String](#String)

### Example data

Content-Type: text/plain

#### 401

Unauthorized [String](#String)

### Example data

Content-Type: text/plain

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

SessionsSessionRefresh
======================

[Up](#methods)

    get /sessions/session/refresh

Refresh current session (sessionsSessionRefreshGet)

### Request headers

### Return type

Object

### Example data

Content-Type: application/json

    { }

### Produces

This API call produces the following media types according to the Accept request header; the media type will be conveyed by the Content-Type response header.

* `application/json`
* `text/plain`

### Responses

#### 200

OK [Object](#Object)

### Example data

Content-Type: application/json

    {
        "data":{
            "cookie":{
                "originalMaxAge":"<integer>",
                "expires":"<string>",
                "secure":false,
                "httpOnly":true,
                "path":"/"
            },
            "phonenumber":"<string>",
            "user":{
                "authentication":{"issuer":"<array>"},
                "_id":"<string>",
                "email":"<string>",
                "__v":0,
                "accessId":"<array>",
                "active":true,
                "createdAt":"<string>",
                "emailVerified":true,
                "mfaMethods":[
                    {
                        "name":"<string>",
                        "value":"<string>"
                    },
                    {
                        "name":"<string>",
                        "value":"<string>"
                    }
                ],
                "mfaSteps":0,
                "phoneVerified":false,
                "updatedAt":"<string>",
                "username":"<string>",
                "firstname":"<string>",
                "lastname":"<string>",
                "phonenumber":"<string>"
            },
            "useragent":{
                "ua":"<string>",
                "browser":{
                    "name":"<string>",
                    "version":"<string>",
                    "major":"<string>"
                },
                "engine":{
                    "name":"<string>",
                    "version":"<string>"
                },
                "device":{},
                "cpu":{"architecture":"<string>"}
            },
            "ip":"<string>",
            "permission":{
                "create":"<array>",
                "read":"<array>",
                "update":"<array>",
                "delete":"<array>"
            },
            "MFAInputsBucket":{},
            "sessionID":"<string>",
            "email":"<string>",
            "passport":{
                "user":{
                    "authentication":{"issuer":"<array>"}
                },
                "_id":"<string>",
                "email":"<string>",
                "__v":"<number>",
                "accessId":"<array>",
                "active":true,
                "createdAt":"<string>",
                "emailVerified":true,
                "mfaMethods":[
                    {
                        "name":"<string>",
                        "value":"<string>"
                    },
                    {
                        "name":"<string>",
                        "value":"<string>"
                    }
                ],
                "mfaSteps":"<number>",
                "phoneVerified":false,
                "updatedAt":"<string>",
                "username":"<string>",
                "firstname":"<string>",
                "lastname":"<string>",
                "phonenumber":"<string>"
            }
        }
    }

#### 500

Internal Server Error [String](#String)

### Example data

Content-Type: text/plain

* * *

Models
------

\[ Jump to [Methods](#methods) \]

### Table of Contents

1.  [`oauth2_token_body`](#oauth2_token_body)
2.  [`token_introspect_body`](#token_introspect_body)
3.  [`token_revoke_body`](#token_revoke_body)

### `oauth2_token_body` 
[Up](#models)

grantType (optional)

[String](#string)

example: authorization_code

code (optional)

[String](#string)

example: &lt;string&gt;

redirectUri (optional)

[String](#string)

example: &lt;uri&gt;

clientId (optional)

[String](#string)

example: &lt;string&gt;

codeVerifier (optional)

[String](#string)

example: &lt;string&gt;

### `token_introspect_body` 
[Up](#models)

token (optional)

[String](#string) (Required) Token being sent.

example: &lt;string&gt;

tokenTypeHint (optional)

[String](#string) Hint about the type of the token submitted for introspection.

example: access_token

### `token_revoke_body` 
[Up](#models)

token (optional)

[String](#string) (Required) Token being sent.

example: &lt;string&gt;

tokenTypeHint (optional)

[String](#string) Hint about the type of the token submitted for introspection.

example: access_token