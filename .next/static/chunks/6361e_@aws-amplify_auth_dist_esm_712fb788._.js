(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthError",
    ()=>AuthError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$errors$2f$AmplifyError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/errors/AmplifyError.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class AuthError extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$errors$2f$AmplifyError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyError"] {
    constructor(params){
        super(params);
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = AuthError;
        Object.setPrototypeOf(this, AuthError.prototype);
    }
}
;
 //# sourceMappingURL=AuthError.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/utils/assertServiceError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertServiceError",
    ()=>assertServiceError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$types$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/types/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function assertServiceError(error) {
    if (!error || error.name === 'Error' || error instanceof TypeError) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$types$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyErrorCode"].Unknown,
            message: 'An unknown error has occurred.',
            underlyingError: error
        });
    }
}
;
 //# sourceMappingURL=assertServiceError.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/parsers/regionParsers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRegionFromIdentityPoolId",
    ()=>getRegionFromIdentityPoolId,
    "getRegionFromUserPoolId",
    ()=>getRegionFromUserPoolId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function getRegionFromUserPoolId(userPoolId) {
    const region = userPoolId === null || userPoolId === void 0 ? void 0 : userPoolId.split('_')[0];
    if (!userPoolId || userPoolId.indexOf('_') < 0 || !region || typeof region !== 'string') throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
        name: 'InvalidUserPoolId',
        message: 'Invalid user pool id provided.'
    });
    return region;
}
function getRegionFromIdentityPoolId(identityPoolId) {
    if (!identityPoolId || !identityPoolId.includes(':')) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
            name: 'InvalidIdentityPoolIdException',
            message: 'Invalid identity pool id provided.',
            recoverySuggestion: 'Make sure a valid identityPoolId is given in the config.'
        });
    }
    return identityPoolId.split(':')[0];
}
;
 //# sourceMappingURL=regionParsers.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTO_SIGN_IN_EXCEPTION",
    ()=>AUTO_SIGN_IN_EXCEPTION,
    "DEVICE_METADATA_NOT_FOUND_EXCEPTION",
    ()=>DEVICE_METADATA_NOT_FOUND_EXCEPTION,
    "INVALID_APP_SCHEME_EXCEPTION",
    ()=>INVALID_APP_SCHEME_EXCEPTION,
    "INVALID_ORIGIN_EXCEPTION",
    ()=>INVALID_ORIGIN_EXCEPTION,
    "INVALID_PREFERRED_REDIRECT_EXCEPTION",
    ()=>INVALID_PREFERRED_REDIRECT_EXCEPTION,
    "INVALID_REDIRECT_EXCEPTION",
    ()=>INVALID_REDIRECT_EXCEPTION,
    "OAUTH_SIGNOUT_EXCEPTION",
    ()=>OAUTH_SIGNOUT_EXCEPTION,
    "TOKEN_REFRESH_EXCEPTION",
    ()=>TOKEN_REFRESH_EXCEPTION,
    "UNEXPECTED_SIGN_IN_INTERRUPTION_EXCEPTION",
    ()=>UNEXPECTED_SIGN_IN_INTERRUPTION_EXCEPTION,
    "USER_ALREADY_AUTHENTICATED_EXCEPTION",
    ()=>USER_ALREADY_AUTHENTICATED_EXCEPTION,
    "USER_UNAUTHENTICATED_EXCEPTION",
    ()=>USER_UNAUTHENTICATED_EXCEPTION,
    "invalidAppSchemeException",
    ()=>invalidAppSchemeException,
    "invalidOriginException",
    ()=>invalidOriginException,
    "invalidPreferredRedirectUrlException",
    ()=>invalidPreferredRedirectUrlException,
    "invalidRedirectException",
    ()=>invalidRedirectException
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const USER_UNAUTHENTICATED_EXCEPTION = 'UserUnAuthenticatedException';
const USER_ALREADY_AUTHENTICATED_EXCEPTION = 'UserAlreadyAuthenticatedException';
const DEVICE_METADATA_NOT_FOUND_EXCEPTION = 'DeviceMetadataNotFoundException';
const AUTO_SIGN_IN_EXCEPTION = 'AutoSignInException';
const INVALID_REDIRECT_EXCEPTION = 'InvalidRedirectException';
const INVALID_APP_SCHEME_EXCEPTION = 'InvalidAppSchemeException';
const INVALID_PREFERRED_REDIRECT_EXCEPTION = 'InvalidPreferredRedirectUrlException';
const invalidRedirectException = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
    name: INVALID_REDIRECT_EXCEPTION,
    message: 'signInRedirect or signOutRedirect had an invalid format or was not found.',
    recoverySuggestion: 'Please make sure the signIn/Out redirect in your oauth config is valid.'
});
const invalidAppSchemeException = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
    name: INVALID_APP_SCHEME_EXCEPTION,
    message: 'A valid non-http app scheme was not found in the config.',
    recoverySuggestion: 'Please make sure a valid custom app scheme is present in the config.'
});
const invalidPreferredRedirectUrlException = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
    name: INVALID_PREFERRED_REDIRECT_EXCEPTION,
    message: 'The given preferredRedirectUrl does not match any items in the redirectSignOutUrls array from the config.',
    recoverySuggestion: 'Please make sure a matching preferredRedirectUrl is provided.'
});
const INVALID_ORIGIN_EXCEPTION = 'InvalidOriginException';
const invalidOriginException = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
    name: INVALID_ORIGIN_EXCEPTION,
    message: 'redirect is coming from a different origin. The oauth flow needs to be initiated from the same origin',
    recoverySuggestion: 'Please call signInWithRedirect from the same origin.'
});
const OAUTH_SIGNOUT_EXCEPTION = 'OAuthSignOutException';
const TOKEN_REFRESH_EXCEPTION = 'TokenRefreshException';
const UNEXPECTED_SIGN_IN_INTERRUPTION_EXCEPTION = 'UnexpectedSignInInterruptionException';
;
 //# sourceMappingURL=constants.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/types.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OAuthStorageKeys",
    ()=>OAuthStorageKeys,
    "assertAuthTokens",
    ()=>assertAuthTokens,
    "assertAuthTokensWithRefreshToken",
    ()=>assertAuthTokensWithRefreshToken,
    "assertDeviceMetadata",
    ()=>assertDeviceMetadata,
    "assertIdTokenInAuthTokens",
    ()=>assertIdTokenInAuthTokens,
    "isTypeUserPoolConfig",
    ()=>isTypeUserPoolConfig,
    "oAuthTokenRefreshException",
    ()=>oAuthTokenRefreshException,
    "tokenRefreshException",
    ()=>tokenRefreshException
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/constants.mjs [app-client] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function isTypeUserPoolConfig(authConfig) {
    if (authConfig && authConfig.Cognito.userPoolId && authConfig.Cognito.userPoolClientId) {
        return true;
    }
    return false;
}
function assertAuthTokens(tokens) {
    if (!tokens || !tokens.accessToken) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_UNAUTHENTICATED_EXCEPTION"],
            message: 'User needs to be authenticated to call this API.',
            recoverySuggestion: 'Sign in before calling this API again.'
        });
    }
}
function assertIdTokenInAuthTokens(tokens) {
    if (!tokens || !tokens.idToken) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_UNAUTHENTICATED_EXCEPTION"],
            message: 'User needs to be authenticated to call this API.',
            recoverySuggestion: 'Sign in before calling this API again.'
        });
    }
}
const oAuthTokenRefreshException = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOKEN_REFRESH_EXCEPTION"],
    message: "Token refresh is not supported when authenticated with the 'implicit grant' (token) oauth flow. \n	Please change your oauth configuration to use 'code grant' flow.",
    recoverySuggestion: "Please logout and change your Amplify configuration to use \"code grant\" flow. \n	E.g { responseType: 'code' }"
});
const tokenRefreshException = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_UNAUTHENTICATED_EXCEPTION"],
    message: 'User needs to be authenticated to call this API.',
    recoverySuggestion: 'Sign in before calling this API again.'
});
function assertAuthTokensWithRefreshToken(tokens) {
    if (isAuthenticatedWithImplicitOauthFlow(tokens)) {
        throw oAuthTokenRefreshException;
    }
    if (!isAuthenticatedWithRefreshToken(tokens)) {
        throw tokenRefreshException;
    }
}
function assertDeviceMetadata(deviceMetadata) {
    if (!deviceMetadata || !deviceMetadata.deviceKey || !deviceMetadata.deviceGroupKey || !deviceMetadata.randomPassword) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
            name: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEVICE_METADATA_NOT_FOUND_EXCEPTION"],
            message: 'Either deviceKey, deviceGroupKey or secretPassword were not found during the sign-in process.',
            recoverySuggestion: 'Make sure to not clear storage after calling the signIn API.'
        });
    }
}
const OAuthStorageKeys = {
    inflightOAuth: 'inflightOAuth',
    oauthSignIn: 'oauthSignIn',
    oauthPKCE: 'oauthPKCE',
    oauthState: 'oauthState'
};
function isAuthenticated(tokens) {
    return (tokens === null || tokens === void 0 ? void 0 : tokens.accessToken) || (tokens === null || tokens === void 0 ? void 0 : tokens.idToken);
}
function isAuthenticatedWithRefreshToken(tokens) {
    return isAuthenticated(tokens) && (tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken);
}
function isAuthenticatedWithImplicitOauthFlow(tokens) {
    return isAuthenticated(tokens) && !(tokens === null || tokens === void 0 ? void 0 : tokens.refreshToken);
}
;
 //# sourceMappingURL=types.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/factories/createCognitoIdentityPoolEndpointResolver.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCognitoIdentityPoolEndpointResolver",
    ()=>createCognitoIdentityPoolEndpointResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentity$2f$cognitoIdentityPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/foundation/factories/serviceClients/cognitoIdentity/cognitoIdentityPoolEndpointResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/amplifyUrl/index.mjs [app-client] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createCognitoIdentityPoolEndpointResolver = (param)=>{
    let { endpointOverride } = param;
    return (input)=>{
        if (endpointOverride) {
            return {
                url: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrl"](endpointOverride)
            };
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentity$2f$cognitoIdentityPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cognitoIdentityPoolEndpointResolver"])(input);
    };
};
;
 //# sourceMappingURL=createCognitoIdentityPoolEndpointResolver.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/utils.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formLoginsMap",
    ()=>formLoginsMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/singleton/Auth/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function formLoginsMap(idToken) {
    const issuer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJWT"])(idToken).payload.iss;
    const res = {};
    if (!issuer) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
            name: 'InvalidIdTokenException',
            message: 'Invalid Idtoken.'
        });
    }
    const domainName = issuer.replace(/(^\w+:|^)\/\//, '');
    res[domainName] = idToken;
    return res;
}
;
 //# sourceMappingURL=utils.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/IdentityIdProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cognitoIdentityIdProvider",
    ()=>cognitoIdentityIdProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentity$2f$createGetIdClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/foundation/factories/serviceClients/cognitoIdentity/createGetIdClient.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/utils/assertServiceError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$parsers$2f$regionParsers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/parsers/regionParsers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$factories$2f$createCognitoIdentityPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/factories/createCognitoIdentityPoolEndpointResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/utils.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Provides a Cognito identityId
 *
 * @param tokens - The AuthTokens received after SignIn
 * @returns string
 * @throws configuration exceptions: `InvalidIdentityPoolIdException`
 *  - Auth errors that may arise from misconfiguration.
 * @throws service exceptions: {@link GetIdException }
 */ async function cognitoIdentityIdProvider(param) {
    let { tokens, authConfig, identityIdStore } = param;
    identityIdStore.setAuthConfig({
        Cognito: authConfig
    });
    // will return null only if there is no identityId cached or if there is an error retrieving it
    const identityId = await identityIdStore.loadIdentityId();
    if (identityId) {
        return identityId.id;
    }
    const logins = (tokens === null || tokens === void 0 ? void 0 : tokens.idToken) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formLoginsMap"])(tokens.idToken.toString()) : {};
    const generatedIdentityId = await generateIdentityId(logins, authConfig);
    // Store generated identityId
    identityIdStore.storeIdentityId({
        id: generatedIdentityId,
        type: tokens ? 'primary' : 'guest'
    });
    return generatedIdentityId;
}
async function generateIdentityId(logins, authConfig) {
    const identityPoolId = authConfig === null || authConfig === void 0 ? void 0 : authConfig.identityPoolId;
    const region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$parsers$2f$regionParsers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionFromIdentityPoolId"])(identityPoolId);
    const getId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentity$2f$createGetIdClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGetIdClient"])({
        endpointResolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$factories$2f$createCognitoIdentityPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCognitoIdentityPoolEndpointResolver"])({
            endpointOverride: authConfig.identityPoolEndpoint
        })
    });
    // IdentityId is absent so get it using IdentityPoolId with Cognito's GetId API
    let idResult;
    // for a first-time user, this will return a brand new identity
    // for a returning user, this will retrieve the previous identity assocaited with the logins
    try {
        idResult = (await getId({
            region
        }, {
            IdentityPoolId: identityPoolId,
            Logins: logins
        })).IdentityId;
    } catch (e) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertServiceError"])(e);
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"](e);
    }
    if (!idResult) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
            name: 'GetIdResponseException',
            message: 'Received undefined response from getId operation',
            recoverySuggestion: 'Make sure to pass a valid identityPoolId in the configuration.'
        });
    }
    return idResult;
}
;
 //# sourceMappingURL=IdentityIdProvider.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/credentialsProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CognitoAWSCredentialsAndIdentityIdProvider",
    ()=>CognitoAWSCredentialsAndIdentityIdProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Logger/ConsoleLogger.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentity$2f$createGetCredentialsForIdentityClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/foundation/factories/serviceClients/cognitoIdentity/createGetCredentialsForIdentityClient.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/singleton/Auth/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/utils/assertServiceError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$parsers$2f$regionParsers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/parsers/regionParsers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/types.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$factories$2f$createCognitoIdentityPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/factories/createCognitoIdentityPoolEndpointResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$IdentityIdProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/IdentityIdProvider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/utils.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsoleLogger"]('CognitoCredentialsProvider');
const CREDENTIALS_TTL = 50 * 60 * 1000; // 50 min, can be modified on config if required in the future
class CognitoAWSCredentialsAndIdentityIdProvider {
    async clearCredentialsAndIdentityId() {
        logger.debug('Clearing out credentials and identityId');
        this._credentialsAndIdentityId = undefined;
        await this._identityIdStore.clearIdentityId();
    }
    async clearCredentials() {
        logger.debug('Clearing out in-memory credentials');
        this._credentialsAndIdentityId = undefined;
    }
    async getCredentialsAndIdentityId(getCredentialsOptions) {
        const isAuthenticated = getCredentialsOptions.authenticated;
        const { tokens } = getCredentialsOptions;
        const { authConfig } = getCredentialsOptions;
        try {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertIdentityPoolIdConfig"])(authConfig === null || authConfig === void 0 ? void 0 : authConfig.Cognito);
        } catch (e) {
            // No identity pool configured, skipping
            return;
        }
        if (!isAuthenticated && !authConfig.Cognito.allowGuestAccess) {
            // TODO(V6): return partial result like Native platforms
            return;
        }
        const { forceRefresh } = getCredentialsOptions;
        const tokenHasChanged = this.hasTokenChanged(tokens);
        const identityId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$IdentityIdProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cognitoIdentityIdProvider"])({
            tokens,
            authConfig: authConfig.Cognito,
            identityIdStore: this._identityIdStore
        });
        // Clear cached credentials when forceRefresh is true OR the cache token has changed
        if (forceRefresh || tokenHasChanged) {
            this.clearCredentials();
        }
        if (!isAuthenticated) {
            return this.getGuestCredentials(identityId, authConfig.Cognito);
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertIdTokenInAuthTokens"])(tokens);
            return this.credsForOIDCTokens(authConfig.Cognito, tokens, identityId);
        }
    }
    async getGuestCredentials(identityId, authConfig) {
        var _clientResult_Credentials, _clientResult_Credentials1;
        // Return existing in-memory cached credentials only if it exists, is not past it's lifetime and is unauthenticated credentials
        if (this._credentialsAndIdentityId && !this.isPastTTL() && this._credentialsAndIdentityId.isAuthenticatedCreds === false) {
            logger.info('returning stored credentials as they neither past TTL nor expired.');
            return this._credentialsAndIdentityId;
        }
        // Clear to discard if any authenticated credentials are set and start with a clean slate
        this.clearCredentials();
        const region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$parsers$2f$regionParsers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionFromIdentityPoolId"])(authConfig.identityPoolId);
        const getCredentialsForIdentity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentity$2f$createGetCredentialsForIdentityClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGetCredentialsForIdentityClient"])({
            endpointResolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$factories$2f$createCognitoIdentityPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCognitoIdentityPoolEndpointResolver"])({
                endpointOverride: authConfig.identityPoolEndpoint
            })
        });
        // use identityId to obtain guest credentials
        // save credentials in-memory
        // No logins params should be passed for guest creds:
        // https://docs.aws.amazon.com/cognitoidentity/latest/APIReference/API_GetCredentialsForIdentity.html
        let clientResult;
        try {
            clientResult = await getCredentialsForIdentity({
                region
            }, {
                IdentityId: identityId
            });
        } catch (e) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertServiceError"])(e);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"](e);
        }
        if ((clientResult === null || clientResult === void 0 ? void 0 : (_clientResult_Credentials = clientResult.Credentials) === null || _clientResult_Credentials === void 0 ? void 0 : _clientResult_Credentials.AccessKeyId) && (clientResult === null || clientResult === void 0 ? void 0 : (_clientResult_Credentials1 = clientResult.Credentials) === null || _clientResult_Credentials1 === void 0 ? void 0 : _clientResult_Credentials1.SecretKey)) {
            this._nextCredentialsRefresh = new Date().getTime() + CREDENTIALS_TTL;
            const res = {
                credentials: {
                    accessKeyId: clientResult.Credentials.AccessKeyId,
                    secretAccessKey: clientResult.Credentials.SecretKey,
                    sessionToken: clientResult.Credentials.SessionToken,
                    expiration: clientResult.Credentials.Expiration
                },
                identityId
            };
            if (clientResult.IdentityId) {
                res.identityId = clientResult.IdentityId;
                this._identityIdStore.storeIdentityId({
                    id: clientResult.IdentityId,
                    type: 'guest'
                });
            }
            this._credentialsAndIdentityId = {
                ...res,
                isAuthenticatedCreds: false
            };
            return res;
        } else {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
                name: 'CredentialsNotFoundException',
                message: "Cognito did not respond with either Credentials, AccessKeyId or SecretKey."
            });
        }
    }
    async credsForOIDCTokens(authConfig, authTokens, identityId) {
        var _clientResult_Credentials, _clientResult_Credentials1;
        if (this._credentialsAndIdentityId && !this.isPastTTL() && this._credentialsAndIdentityId.isAuthenticatedCreds === true) {
            logger.debug('returning stored credentials as they neither past TTL nor expired.');
            return this._credentialsAndIdentityId;
        }
        // Clear to discard if any unauthenticated credentials are set and start with a clean slate
        this.clearCredentials();
        const logins = authTokens.idToken ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$utils$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formLoginsMap"])(authTokens.idToken.toString()) : {};
        const region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$parsers$2f$regionParsers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionFromIdentityPoolId"])(authConfig.identityPoolId);
        const getCredentialsForIdentity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentity$2f$createGetCredentialsForIdentityClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGetCredentialsForIdentityClient"])({
            endpointResolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$factories$2f$createCognitoIdentityPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCognitoIdentityPoolEndpointResolver"])({
                endpointOverride: authConfig.identityPoolEndpoint
            })
        });
        let clientResult;
        try {
            clientResult = await getCredentialsForIdentity({
                region
            }, {
                IdentityId: identityId,
                Logins: logins
            });
        } catch (e) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertServiceError"])(e);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"](e);
        }
        if ((clientResult === null || clientResult === void 0 ? void 0 : (_clientResult_Credentials = clientResult.Credentials) === null || _clientResult_Credentials === void 0 ? void 0 : _clientResult_Credentials.AccessKeyId) && (clientResult === null || clientResult === void 0 ? void 0 : (_clientResult_Credentials1 = clientResult.Credentials) === null || _clientResult_Credentials1 === void 0 ? void 0 : _clientResult_Credentials1.SecretKey)) {
            var _authTokens_idToken;
            this._nextCredentialsRefresh = new Date().getTime() + CREDENTIALS_TTL;
            const res = {
                credentials: {
                    accessKeyId: clientResult.Credentials.AccessKeyId,
                    secretAccessKey: clientResult.Credentials.SecretKey,
                    sessionToken: clientResult.Credentials.SessionToken,
                    expiration: clientResult.Credentials.Expiration
                },
                identityId
            };
            if (clientResult.IdentityId) {
                res.identityId = clientResult.IdentityId;
                // note: the following call removes guest identityId from the persistent store (localStorage)
                this._identityIdStore.storeIdentityId({
                    id: clientResult.IdentityId,
                    type: 'primary'
                });
            }
            // Store the credentials in-memory along with the expiration
            this._credentialsAndIdentityId = {
                ...res,
                isAuthenticatedCreds: true,
                associatedIdToken: (_authTokens_idToken = authTokens.idToken) === null || _authTokens_idToken === void 0 ? void 0 : _authTokens_idToken.toString()
            };
            return res;
        } else {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
                name: 'CredentialsException',
                message: "Cognito did not respond with either Credentials, AccessKeyId or SecretKey."
            });
        }
    }
    isPastTTL() {
        return this._nextCredentialsRefresh === undefined ? true : this._nextCredentialsRefresh <= Date.now();
    }
    hasTokenChanged(tokens) {
        var _this__credentialsAndIdentityId, _tokens_idToken;
        return !!tokens && !!((_this__credentialsAndIdentityId = this._credentialsAndIdentityId) === null || _this__credentialsAndIdentityId === void 0 ? void 0 : _this__credentialsAndIdentityId.associatedIdToken) && ((_tokens_idToken = tokens.idToken) === null || _tokens_idToken === void 0 ? void 0 : _tokens_idToken.toString()) !== this._credentialsAndIdentityId.associatedIdToken;
    }
    constructor(identityIdStore){
        this._nextCredentialsRefresh = 0;
        this._identityIdStore = identityIdStore;
    }
}
;
 //# sourceMappingURL=credentialsProvider.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/types.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthTokenStorageKeys",
    ()=>AuthTokenStorageKeys
]);
const AuthTokenStorageKeys = {
    accessToken: 'accessToken',
    idToken: 'idToken',
    oidcProvider: 'oidcProvider',
    clockDrift: 'clockDrift',
    refreshToken: 'refreshToken',
    deviceKey: 'deviceKey',
    randomPasswordKey: 'randomPasswordKey',
    deviceGroupKey: 'deviceGroupKey',
    signInDetails: 'signInDetails',
    oauthMetadata: 'oauthMetadata'
};
;
 //# sourceMappingURL=types.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/errorHelpers.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenProviderErrorCode",
    ()=>TokenProviderErrorCode,
    "assert",
    ()=>assert
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$errors$2f$createAssertionFunction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/errors/createAssertionFunction.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var TokenProviderErrorCode;
(function(TokenProviderErrorCode) {
    TokenProviderErrorCode["InvalidAuthTokens"] = "InvalidAuthTokens";
})(TokenProviderErrorCode || (TokenProviderErrorCode = {}));
const tokenValidationErrorMap = {
    [TokenProviderErrorCode.InvalidAuthTokens]: {
        message: 'Invalid tokens.',
        recoverySuggestion: 'Make sure the tokens are valid.'
    }
};
const assert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$errors$2f$createAssertionFunction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAssertionFunction"])(tokenValidationErrorMap);
;
 //# sourceMappingURL=errorHelpers.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "AUTH_KEY_PREFIX",
    ()=>AUTH_KEY_PREFIX
]);
const AUTH_KEY_PREFIX = 'CognitoIdentityServiceProvider';
;
 //# sourceMappingURL=constants.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenStore.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultTokenStore",
    ()=>DefaultTokenStore,
    "createKeysForAuthStorage",
    ()=>createKeysForAuthStorage,
    "getAuthStorageKeys",
    ()=>getAuthStorageKeys
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/singleton/Auth/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/types.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$errorHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/errorHelpers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/constants.mjs [app-client] (ecmascript)");
;
;
;
;
;
class DefaultTokenStore {
    getKeyValueStorage() {
        if (!this.keyValueStorage) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
                name: 'KeyValueStorageNotFoundException',
                message: 'KeyValueStorage was not found in TokenStore'
            });
        }
        return this.keyValueStorage;
    }
    setKeyValueStorage(keyValueStorage) {
        this.keyValueStorage = keyValueStorage;
    }
    setAuthConfig(authConfig) {
        this.authConfig = authConfig;
    }
    async loadTokens() {
        // TODO(v6): migration logic should be here
        // Reading V5 tokens old format
        try {
            const authKeys = await this.getAuthKeys();
            const accessTokenString = await this.getKeyValueStorage().getItem(authKeys.accessToken);
            if (!accessTokenString) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
                    name: 'NoSessionFoundException',
                    message: 'Auth session was not found. Make sure to call signIn.'
                });
            }
            const accessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJWT"])(accessTokenString);
            const itString = await this.getKeyValueStorage().getItem(authKeys.idToken);
            const idToken = itString ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJWT"])(itString) : undefined;
            var _ref;
            const refreshToken = (_ref = await this.getKeyValueStorage().getItem(authKeys.refreshToken)) !== null && _ref !== void 0 ? _ref : undefined;
            var _ref1;
            const clockDriftString = (_ref1 = await this.getKeyValueStorage().getItem(authKeys.clockDrift)) !== null && _ref1 !== void 0 ? _ref1 : '0';
            const clockDrift = Number.parseInt(clockDriftString);
            const signInDetails = await this.getKeyValueStorage().getItem(authKeys.signInDetails);
            var _ref2;
            const tokens = {
                accessToken,
                idToken,
                refreshToken,
                deviceMetadata: (_ref2 = await this.getDeviceMetadata()) !== null && _ref2 !== void 0 ? _ref2 : undefined,
                clockDrift,
                username: await this.getLastAuthUser()
            };
            if (signInDetails) {
                tokens.signInDetails = JSON.parse(signInDetails);
            }
            return tokens;
        } catch (err) {
            return null;
        }
    }
    async storeTokens(tokens) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$errorHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assert"])(tokens !== undefined, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$errorHelpers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenProviderErrorCode"].InvalidAuthTokens);
        const lastAuthUser = tokens.username;
        await this.getKeyValueStorage().setItem(this.getLastAuthUserKey(), lastAuthUser);
        const authKeys = await this.getAuthKeys();
        await this.getKeyValueStorage().setItem(authKeys.accessToken, tokens.accessToken.toString());
        if (tokens.idToken) {
            await this.getKeyValueStorage().setItem(authKeys.idToken, tokens.idToken.toString());
        } else {
            await this.getKeyValueStorage().removeItem(authKeys.idToken);
        }
        if (tokens.refreshToken) {
            await this.getKeyValueStorage().setItem(authKeys.refreshToken, tokens.refreshToken);
        } else {
            await this.getKeyValueStorage().removeItem(authKeys.refreshToken);
        }
        if (tokens.deviceMetadata) {
            if (tokens.deviceMetadata.deviceKey) {
                await this.getKeyValueStorage().setItem(authKeys.deviceKey, tokens.deviceMetadata.deviceKey);
            }
            if (tokens.deviceMetadata.deviceGroupKey) {
                await this.getKeyValueStorage().setItem(authKeys.deviceGroupKey, tokens.deviceMetadata.deviceGroupKey);
            }
            await this.getKeyValueStorage().setItem(authKeys.randomPasswordKey, tokens.deviceMetadata.randomPassword);
        }
        if (tokens.signInDetails) {
            await this.getKeyValueStorage().setItem(authKeys.signInDetails, JSON.stringify(tokens.signInDetails));
        } else {
            await this.getKeyValueStorage().removeItem(authKeys.signInDetails);
        }
        await this.getKeyValueStorage().setItem(authKeys.clockDrift, "".concat(tokens.clockDrift));
    }
    async clearTokens() {
        const authKeys = await this.getAuthKeys();
        // Not calling clear because it can remove data that is not managed by AuthTokenStore
        await Promise.all([
            this.getKeyValueStorage().removeItem(authKeys.accessToken),
            this.getKeyValueStorage().removeItem(authKeys.idToken),
            this.getKeyValueStorage().removeItem(authKeys.clockDrift),
            this.getKeyValueStorage().removeItem(authKeys.refreshToken),
            this.getKeyValueStorage().removeItem(authKeys.signInDetails),
            this.getKeyValueStorage().removeItem(this.getLastAuthUserKey()),
            this.getKeyValueStorage().removeItem(authKeys.oauthMetadata)
        ]);
    }
    async getDeviceMetadata(username) {
        const authKeys = await this.getAuthKeys(username);
        const deviceKey = await this.getKeyValueStorage().getItem(authKeys.deviceKey);
        const deviceGroupKey = await this.getKeyValueStorage().getItem(authKeys.deviceGroupKey);
        const randomPassword = await this.getKeyValueStorage().getItem(authKeys.randomPasswordKey);
        return randomPassword && deviceGroupKey && deviceKey ? {
            deviceKey,
            deviceGroupKey,
            randomPassword
        } : null;
    }
    async clearDeviceMetadata(username) {
        const authKeys = await this.getAuthKeys(username);
        await Promise.all([
            this.getKeyValueStorage().removeItem(authKeys.deviceKey),
            this.getKeyValueStorage().removeItem(authKeys.deviceGroupKey),
            this.getKeyValueStorage().removeItem(authKeys.randomPasswordKey)
        ]);
    }
    async getAuthKeys(username) {
        var _this_authConfig;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])((_this_authConfig = this.authConfig) === null || _this_authConfig === void 0 ? void 0 : _this_authConfig.Cognito);
        const lastAuthUser = username !== null && username !== void 0 ? username : await this.getLastAuthUser();
        return createKeysForAuthStorage(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_KEY_PREFIX"], "".concat(this.authConfig.Cognito.userPoolClientId, ".").concat(lastAuthUser));
    }
    getLastAuthUserKey() {
        var _this_authConfig;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])((_this_authConfig = this.authConfig) === null || _this_authConfig === void 0 ? void 0 : _this_authConfig.Cognito);
        const identifier = this.authConfig.Cognito.userPoolClientId;
        return "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AUTH_KEY_PREFIX"], ".").concat(identifier, ".LastAuthUser");
    }
    async getLastAuthUser() {
        var _ref;
        const lastAuthUser = (_ref = await this.getKeyValueStorage().getItem(this.getLastAuthUserKey())) !== null && _ref !== void 0 ? _ref : 'username';
        return lastAuthUser;
    }
    async setOAuthMetadata(metadata) {
        const { oauthMetadata: oauthMetadataKey } = await this.getAuthKeys();
        await this.getKeyValueStorage().setItem(oauthMetadataKey, JSON.stringify(metadata));
    }
    async getOAuthMetadata() {
        const { oauthMetadata: oauthMetadataKey } = await this.getAuthKeys();
        const oauthMetadata = await this.getKeyValueStorage().getItem(oauthMetadataKey);
        return oauthMetadata && JSON.parse(oauthMetadata);
    }
}
const createKeysForAuthStorage = (provider, identifier)=>{
    return getAuthStorageKeys(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthTokenStorageKeys"])("".concat(provider), identifier);
};
function getAuthStorageKeys(authKeys) {
    const keys = Object.values({
        ...authKeys
    });
    return (prefix, identifier)=>keys.reduce((acc, authKey)=>({
                ...acc,
                [authKey]: "".concat(prefix, ".").concat(identifier, ".").concat(authKey)
            }), {});
}
;
 //# sourceMappingURL=TokenStore.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/types.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "IdentityIdStorageKeys",
    ()=>IdentityIdStorageKeys
]);
const IdentityIdStorageKeys = {
    identityId: 'identityId'
};
;
 //# sourceMappingURL=types.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/IdentityIdStore.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultIdentityIdStore",
    ()=>DefaultIdentityIdStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Logger/ConsoleLogger.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/singleton/Auth/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$TokenStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/types.mjs [app-client] (ecmascript)");
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsoleLogger"]('DefaultIdentityIdStore');
class DefaultIdentityIdStore {
    setAuthConfig(authConfigParam) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertIdentityPoolIdConfig"])(authConfigParam.Cognito);
        this.authConfig = authConfigParam;
        this._authKeys = createKeysForAuthStorage('Cognito', authConfigParam.Cognito.identityPoolId);
    }
    async loadIdentityId() {
        var _this_authConfig;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertIdentityPoolIdConfig"])((_this_authConfig = this.authConfig) === null || _this_authConfig === void 0 ? void 0 : _this_authConfig.Cognito);
        try {
            if (this._primaryIdentityId) {
                return {
                    id: this._primaryIdentityId,
                    type: 'primary'
                };
            } else {
                const storedIdentityId = await this.keyValueStorage.getItem(this._authKeys.identityId);
                if (storedIdentityId) {
                    this._hasGuestIdentityId = true;
                    return {
                        id: storedIdentityId,
                        type: 'guest'
                    };
                }
                return null;
            }
        } catch (err) {
            logger.log('Error getting stored IdentityId.', err);
            return null;
        }
    }
    async storeIdentityId(identity) {
        var _this_authConfig;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertIdentityPoolIdConfig"])((_this_authConfig = this.authConfig) === null || _this_authConfig === void 0 ? void 0 : _this_authConfig.Cognito);
        if (identity.type === 'guest') {
            this.keyValueStorage.setItem(this._authKeys.identityId, identity.id);
            // Clear in-memory storage of primary identityId
            this._primaryIdentityId = undefined;
            this._hasGuestIdentityId = true;
        } else {
            this._primaryIdentityId = identity.id;
            // Clear locally stored guest id
            if (this._hasGuestIdentityId) {
                this.keyValueStorage.removeItem(this._authKeys.identityId);
                this._hasGuestIdentityId = false;
            }
        }
    }
    async clearIdentityId() {
        this._primaryIdentityId = undefined;
        await this.keyValueStorage.removeItem(this._authKeys.identityId);
    }
    constructor(keyValueStorage){
        this._authKeys = {};
        this._hasGuestIdentityId = false;
        this.keyValueStorage = keyValueStorage;
    }
}
const createKeysForAuthStorage = (provider, identifier)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$TokenStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthStorageKeys"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IdentityIdStorageKeys"])("com.amplify.".concat(provider), identifier);
};
;
 //# sourceMappingURL=IdentityIdStore.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cognitoCredentialsProvider",
    ()=>cognitoCredentialsProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$storage$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/storage/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$IdentityIdStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/IdentityIdStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$credentialsProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/credentialsProvider/credentialsProvider.mjs [app-client] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Cognito specific implmentation of the CredentialsProvider interface
 * that manages setting and getting of AWS Credentials.
 *
 * @throws configuration expections: `InvalidIdentityPoolIdException`
 *  - Auth errors that may arise from misconfiguration.
 * @throws service expections: {@link GetCredentialsForIdentityException}, {@link GetIdException}
 *
 */ const cognitoCredentialsProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$credentialsProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CognitoAWSCredentialsAndIdentityIdProvider"](new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$credentialsProvider$2f$IdentityIdStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultIdentityIdStore"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$storage$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultStorage"]));
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * The service name used to sign requests if the API requires authentication.
 */ __turbopack_context__.s([
    "COGNITO_IDP_SERVICE_NAME",
    ()=>COGNITO_IDP_SERVICE_NAME
]);
const COGNITO_IDP_SERVICE_NAME = 'cognito-idp';
;
 //# sourceMappingURL=constants.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/cognitoUserPoolEndpointResolver.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cognitoUserPoolEndpointResolver",
    ()=>cognitoUserPoolEndpointResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$endpoints$2f$getDnsSuffix$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/endpoints/getDnsSuffix.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/amplifyUrl/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/constants.mjs [app-client] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const cognitoUserPoolEndpointResolver = (param)=>{
    let { region } = param;
    return {
        url: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrl"]("https://".concat(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COGNITO_IDP_SERVICE_NAME"], ".").concat(region, ".").concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$endpoints$2f$getDnsSuffix$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDnsSuffix"])(region)))
    };
};
;
 //# sourceMappingURL=cognitoUserPoolEndpointResolver.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/factories/createCognitoUserPoolEndpointResolver.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCognitoUserPoolEndpointResolver",
    ()=>createCognitoUserPoolEndpointResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/amplifyUrl/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$cognitoUserPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/cognitoUserPoolEndpointResolver.mjs [app-client] (ecmascript)");
;
;
const createCognitoUserPoolEndpointResolver = (param)=>{
    let { endpointOverride } = param;
    return (input)=>{
        if (endpointOverride) {
            return {
                url: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrl"](endpointOverride)
            };
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$cognitoUserPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cognitoUserPoolEndpointResolver"])(input);
    };
};
;
 //# sourceMappingURL=createCognitoUserPoolEndpointResolver.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/shared/serde/createUserPoolSerializer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "createUserPoolSerializer",
    ()=>createUserPoolSerializer
]);
const createUserPoolSerializer = (operation)=>(input, endpoint)=>{
        const headers = getSharedHeaders(operation);
        const body = JSON.stringify(input);
        return buildHttpRpcRequest(endpoint, headers, body);
    };
const getSharedHeaders = (operation)=>({
        'content-type': 'application/x-amz-json-1.1',
        'x-amz-target': "AWSCognitoIdentityProviderService.".concat(operation)
    });
const buildHttpRpcRequest = (param, headers, body)=>{
    let { url } = param;
    return {
        headers,
        url,
        body,
        method: 'POST'
    };
};
;
 //# sourceMappingURL=createUserPoolSerializer.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/shared/serde/createUserPoolDeserializer.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUserPoolDeserializer",
    ()=>createUserPoolDeserializer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$serde$2f$json$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/serde/json.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/utils/assertServiceError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createUserPoolDeserializer = ()=>async (response)=>{
        if (response.statusCode >= 300) {
            const error = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$serde$2f$json$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJsonError"])(response);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertServiceError"])(error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
                name: error.name,
                message: error.message,
                metadata: error.$metadata
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$serde$2f$json$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJsonBody"])(response);
    };
;
 //# sourceMappingURL=createUserPoolDeserializer.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/shared/handler/cognitoUserPoolTransferHandler.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cognitoUserPoolTransferHandler",
    ()=>cognitoUserPoolTransferHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$internal$2f$composeTransferHandler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/internal/composeTransferHandler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$handlers$2f$aws$2f$unauthenticated$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/handlers/aws/unauthenticated.mjs [app-client] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * A Cognito Identity-specific middleware that disables caching for all requests.
 */ const disableCacheMiddlewareFactory = ()=>(next, _)=>async function disableCacheMiddleware(request) {
            request.headers['cache-control'] = 'no-store';
            return next(request);
        };
/**
 * A Cognito Identity-specific transfer handler that does NOT sign requests, and
 * disables caching.
 *
 * @internal
 */ const cognitoUserPoolTransferHandler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$internal$2f$composeTransferHandler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeTransferHandler"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$handlers$2f$aws$2f$unauthenticated$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unauthenticatedHandler"], [
    disableCacheMiddlewareFactory
]);
;
 //# sourceMappingURL=cognitoUserPoolTransferHandler.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_SERVICE_CLIENT_API_CONFIG",
    ()=>DEFAULT_SERVICE_CLIENT_API_CONFIG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$middleware$2f$retry$2f$defaultRetryDecider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/middleware/retry/defaultRetryDecider.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$serde$2f$json$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/serde/json.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$middleware$2f$retry$2f$jitteredBackoff$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/middleware/retry/jitteredBackoff.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Platform/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/constants.mjs [app-client] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const DEFAULT_SERVICE_CLIENT_API_CONFIG = {
    service: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COGNITO_IDP_SERVICE_NAME"],
    retryDecider: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$middleware$2f$retry$2f$defaultRetryDecider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRetryDecider"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$serde$2f$json$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseJsonError"]),
    computeDelay: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$middleware$2f$retry$2f$jitteredBackoff$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jitteredBackoff"],
    get userAgentValue () {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAmplifyUserAgent"])();
    },
    cache: 'no-store'
};
;
 //# sourceMappingURL=constants.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/createGetTokensFromRefreshTokenClient.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGetTokensFromRefreshTokenClient",
    ()=>createGetTokensFromRefreshTokenClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$internal$2f$composeServiceApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/internal/composeServiceApi.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$shared$2f$serde$2f$createUserPoolSerializer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/shared/serde/createUserPoolSerializer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$shared$2f$serde$2f$createUserPoolDeserializer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/shared/serde/createUserPoolDeserializer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$shared$2f$handler$2f$cognitoUserPoolTransferHandler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/shared/handler/cognitoUserPoolTransferHandler.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/constants.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createGetTokensFromRefreshTokenClient = (config)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$internal$2f$composeServiceApi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeServiceApi"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$shared$2f$handler$2f$cognitoUserPoolTransferHandler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cognitoUserPoolTransferHandler"], (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$shared$2f$serde$2f$createUserPoolSerializer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUserPoolSerializer"])('GetTokensFromRefreshToken'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$shared$2f$serde$2f$createUserPoolDeserializer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUserPoolDeserializer"])(), {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SERVICE_CLIENT_API_CONFIG"],
        ...config
    });
;
 //# sourceMappingURL=createGetTokensFromRefreshTokenClient.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/refreshAuthTokens.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "refreshAuthTokens",
    ()=>refreshAuthTokens,
    "refreshAuthTokensWithoutDedupe",
    ()=>refreshAuthTokensWithoutDedupe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$deDupeAsyncFunction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/deDupeAsyncFunction.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/singleton/Auth/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$parsers$2f$regionParsers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/parsers/regionParsers.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/types.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$factories$2f$createCognitoUserPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/factories/createCognitoUserPoolEndpointResolver.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$createGetTokensFromRefreshTokenClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/foundation/factories/serviceClients/cognitoIdentityProvider/createGetTokensFromRefreshTokenClient.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const refreshAuthTokensFunction = async (param)=>{
    let { tokens, authConfig, username } = param;
    var _tokens_deviceMetadata;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(authConfig === null || authConfig === void 0 ? void 0 : authConfig.Cognito);
    const { userPoolId, userPoolClientId, userPoolEndpoint } = authConfig.Cognito;
    const region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$parsers$2f$regionParsers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRegionFromUserPoolId"])(userPoolId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertAuthTokensWithRefreshToken"])(tokens);
    const getTokensFromRefreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$foundation$2f$factories$2f$serviceClients$2f$cognitoIdentityProvider$2f$createGetTokensFromRefreshTokenClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGetTokensFromRefreshTokenClient"])({
        endpointResolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$factories$2f$createCognitoUserPoolEndpointResolver$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCognitoUserPoolEndpointResolver"])({
            endpointOverride: userPoolEndpoint
        })
    });
    const { AuthenticationResult } = await getTokensFromRefreshToken({
        region
    }, {
        ClientId: userPoolClientId,
        RefreshToken: tokens.refreshToken,
        DeviceKey: (_tokens_deviceMetadata = tokens.deviceMetadata) === null || _tokens_deviceMetadata === void 0 ? void 0 : _tokens_deviceMetadata.deviceKey
    });
    var _AuthenticationResult_AccessToken;
    const accessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJWT"])((_AuthenticationResult_AccessToken = AuthenticationResult === null || AuthenticationResult === void 0 ? void 0 : AuthenticationResult.AccessToken) !== null && _AuthenticationResult_AccessToken !== void 0 ? _AuthenticationResult_AccessToken : '');
    const idToken = (AuthenticationResult === null || AuthenticationResult === void 0 ? void 0 : AuthenticationResult.IdToken) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decodeJWT"])(AuthenticationResult.IdToken) : undefined;
    const { iat } = accessToken.payload;
    // This should never happen. If it does, it's a bug from the service.
    if (!iat) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
            name: 'iatNotFoundException',
            message: 'iat not found in access token'
        });
    }
    const clockDrift = iat * 1000 - new Date().getTime();
    var _AuthenticationResult_RefreshToken;
    return {
        accessToken,
        idToken,
        clockDrift,
        refreshToken: (_AuthenticationResult_RefreshToken = AuthenticationResult === null || AuthenticationResult === void 0 ? void 0 : AuthenticationResult.RefreshToken) !== null && _AuthenticationResult_RefreshToken !== void 0 ? _AuthenticationResult_RefreshToken : tokens.refreshToken,
        username
    };
};
const refreshAuthTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$deDupeAsyncFunction$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deDupeAsyncFunction"])(refreshAuthTokensFunction);
const refreshAuthTokensWithoutDedupe = refreshAuthTokensFunction;
;
 //# sourceMappingURL=refreshAuthTokens.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/signInWithRedirectStore.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultOAuthStore",
    ()=>DefaultOAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/singleton/Auth/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$TokenStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/types.mjs [app-client] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const V5_HOSTED_UI_KEY = 'amplify-signin-with-hostedUI';
const name = 'CognitoIdentityServiceProvider';
class DefaultOAuthStore {
    async clearOAuthInflightData() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        await Promise.all([
            this.keyValueStorage.removeItem(authKeys.inflightOAuth),
            this.keyValueStorage.removeItem(authKeys.oauthPKCE),
            this.keyValueStorage.removeItem(authKeys.oauthState)
        ]);
    }
    async clearOAuthData() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        await this.clearOAuthInflightData();
        await this.keyValueStorage.removeItem(V5_HOSTED_UI_KEY); // remove in case a customer migrated an App from v5 to v6
        return this.keyValueStorage.removeItem(authKeys.oauthSignIn);
    }
    loadOAuthState() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        return this.keyValueStorage.getItem(authKeys.oauthState);
    }
    storeOAuthState(state) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        return this.keyValueStorage.setItem(authKeys.oauthState, state);
    }
    loadPKCE() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        return this.keyValueStorage.getItem(authKeys.oauthPKCE);
    }
    storePKCE(pkce) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        return this.keyValueStorage.setItem(authKeys.oauthPKCE, pkce);
    }
    setAuthConfig(authConfigParam) {
        this.cognitoConfig = authConfigParam;
    }
    async loadOAuthInFlight() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        return await this.keyValueStorage.getItem(authKeys.inflightOAuth) === 'true';
    }
    async storeOAuthInFlight(inflight) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        await this.keyValueStorage.setItem(authKeys.inflightOAuth, "".concat(inflight));
    }
    async loadOAuthSignIn() {
        var _this;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        const isLegacyHostedUISignIn = await this.keyValueStorage.getItem(V5_HOSTED_UI_KEY);
        var _split;
        const [isOAuthSignIn, preferPrivateSession] = (_split = (_this = await this.keyValueStorage.getItem(authKeys.oauthSignIn)) === null || _this === void 0 ? void 0 : _this.split(',')) !== null && _split !== void 0 ? _split : [];
        return {
            isOAuthSignIn: isOAuthSignIn === 'true' || isLegacyHostedUISignIn === 'true',
            preferPrivateSession: preferPrivateSession === 'true'
        };
    }
    async storeOAuthSignIn(oauthSignIn) {
        let preferPrivateSession = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])(this.cognitoConfig);
        const authKeys = createKeysForAuthStorage(name, this.cognitoConfig.userPoolClientId);
        await this.keyValueStorage.setItem(authKeys.oauthSignIn, "".concat(oauthSignIn, ",").concat(preferPrivateSession));
    }
    constructor(keyValueStorage){
        this.keyValueStorage = keyValueStorage;
    }
}
const createKeysForAuthStorage = (provider, identifier)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$TokenStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthStorageKeys"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OAuthStorageKeys"])(provider, identifier);
};
;
 //# sourceMappingURL=signInWithRedirectStore.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/oauth/oAuthStore.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "oAuthStore",
    ()=>oAuthStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$storage$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/storage/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$signInWithRedirectStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/signInWithRedirectStore.mjs [app-client] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const oAuthStore = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$signInWithRedirectStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultOAuthStore"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$storage$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultStorage"]);
;
 //# sourceMappingURL=oAuthStore.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/oauth/inflightPromise.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "addInflightPromise",
    ()=>addInflightPromise,
    "resolveAndClearInflightPromises",
    ()=>resolveAndClearInflightPromises
]);
const inflightPromises = [];
const addInflightPromise = (resolver)=>{
    inflightPromises.push(resolver);
};
const resolveAndClearInflightPromises = ()=>{
    while(inflightPromises.length){
        var _inflightPromises_pop;
        (_inflightPromises_pop = inflightPromises.pop()) === null || _inflightPromises_pop === void 0 ? void 0 : _inflightPromises_pop();
    }
};
;
 //# sourceMappingURL=inflightPromise.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenOrchestrator.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TokenOrchestrator",
    ()=>TokenOrchestrator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Hub/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$isBrowser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/isBrowser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/singleton/Auth/utils/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$isTokenExpired$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/isTokenExpired.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$types$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/types/errors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/utils/assertServiceError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/errors/AuthError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$oauth$2f$oAuthStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/oauth/oAuthStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$oauth$2f$inflightPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/oauth/inflightPromise.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class TokenOrchestrator {
    setAuthConfig(authConfig) {
        __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$oauth$2f$oAuthStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["oAuthStore"].setAuthConfig(authConfig.Cognito);
        this.authConfig = authConfig;
    }
    setTokenRefresher(tokenRefresher) {
        this.tokenRefresher = tokenRefresher;
    }
    setAuthTokenStore(tokenStore) {
        this.tokenStore = tokenStore;
    }
    getTokenStore() {
        if (!this.tokenStore) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
                name: 'EmptyTokenStoreException',
                message: 'TokenStore not set'
            });
        }
        return this.tokenStore;
    }
    getTokenRefresher() {
        if (!this.tokenRefresher) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$AuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthError"]({
                name: 'EmptyTokenRefresherException',
                message: 'TokenRefresher not set'
            });
        }
        return this.tokenRefresher;
    }
    async getTokens(options) {
        var _tokens_idToken_payload, _tokens_idToken, _tokens_accessToken_payload, _tokens_accessToken;
        let tokens;
        try {
            var _this_authConfig;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$Auth$2f$utils$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertTokenProviderConfig"])((_this_authConfig = this.authConfig) === null || _this_authConfig === void 0 ? void 0 : _this_authConfig.Cognito);
        } catch (_err) {
            // Token provider not configured
            return null;
        }
        await this.waitForInflightOAuth();
        this.inflightPromise = undefined;
        tokens = await this.getTokenStore().loadTokens();
        const username = await this.getTokenStore().getLastAuthUser();
        if (tokens === null) {
            return null;
        }
        var _tokens_idToken_payload_exp, _tokens_clockDrift;
        const idTokenExpired = !!(tokens === null || tokens === void 0 ? void 0 : tokens.idToken) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$isTokenExpired$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTokenExpired"])({
            expiresAt: ((_tokens_idToken_payload_exp = (_tokens_idToken = tokens.idToken) === null || _tokens_idToken === void 0 ? void 0 : (_tokens_idToken_payload = _tokens_idToken.payload) === null || _tokens_idToken_payload === void 0 ? void 0 : _tokens_idToken_payload.exp) !== null && _tokens_idToken_payload_exp !== void 0 ? _tokens_idToken_payload_exp : 0) * 1000,
            clockDrift: (_tokens_clockDrift = tokens.clockDrift) !== null && _tokens_clockDrift !== void 0 ? _tokens_clockDrift : 0
        });
        var _tokens_accessToken_payload_exp, _tokens_clockDrift1;
        const accessTokenExpired = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$isTokenExpired$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isTokenExpired"])({
            expiresAt: ((_tokens_accessToken_payload_exp = (_tokens_accessToken = tokens.accessToken) === null || _tokens_accessToken === void 0 ? void 0 : (_tokens_accessToken_payload = _tokens_accessToken.payload) === null || _tokens_accessToken_payload === void 0 ? void 0 : _tokens_accessToken_payload.exp) !== null && _tokens_accessToken_payload_exp !== void 0 ? _tokens_accessToken_payload_exp : 0) * 1000,
            clockDrift: (_tokens_clockDrift1 = tokens.clockDrift) !== null && _tokens_clockDrift1 !== void 0 ? _tokens_clockDrift1 : 0
        });
        if ((options === null || options === void 0 ? void 0 : options.forceRefresh) || idTokenExpired || accessTokenExpired) {
            tokens = await this.refreshTokens({
                tokens,
                username
            });
            if (tokens === null) {
                return null;
            }
        }
        return {
            accessToken: tokens === null || tokens === void 0 ? void 0 : tokens.accessToken,
            idToken: tokens === null || tokens === void 0 ? void 0 : tokens.idToken,
            signInDetails: tokens === null || tokens === void 0 ? void 0 : tokens.signInDetails
        };
    }
    async refreshTokens(param) {
        let { tokens, username } = param;
        try {
            const { signInDetails } = tokens;
            const newTokens = await this.getTokenRefresher()({
                tokens,
                authConfig: this.authConfig,
                username
            });
            newTokens.signInDetails = signInDetails;
            await this.setTokens({
                tokens: newTokens
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hub"].dispatch('auth', {
                event: 'tokenRefresh'
            }, 'Auth', __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMPLIFY_SYMBOL"]);
            return newTokens;
        } catch (err) {
            return this.handleErrors(err);
        }
    }
    handleErrors(err) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$errors$2f$utils$2f$assertServiceError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertServiceError"])(err);
        if (err.name !== __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$types$2f$errors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyErrorCode"].NetworkError) {
            // TODO(v6): Check errors on client
            this.clearTokens();
        }
        __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hub"].dispatch('auth', {
            event: 'tokenRefresh_failure',
            data: {
                error: err
            }
        }, 'Auth', __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMPLIFY_SYMBOL"]);
        if (err.name.startsWith('NotAuthorizedException')) {
            return null;
        }
        throw err;
    }
    async setTokens(param) {
        let { tokens } = param;
        return this.getTokenStore().storeTokens(tokens);
    }
    async clearTokens() {
        return this.getTokenStore().clearTokens();
    }
    getDeviceMetadata(username) {
        return this.getTokenStore().getDeviceMetadata(username);
    }
    clearDeviceMetadata(username) {
        return this.getTokenStore().clearDeviceMetadata(username);
    }
    setOAuthMetadata(metadata) {
        return this.getTokenStore().setOAuthMetadata(metadata);
    }
    getOAuthMetadata() {
        return this.getTokenStore().getOAuthMetadata();
    }
    constructor(){
        this.waitForInflightOAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$isBrowser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBrowser"])() ? async ()=>{
            if (!await __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$oauth$2f$oAuthStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["oAuthStore"].loadOAuthInFlight()) {
                return;
            }
            if (this.inflightPromise) {
                return this.inflightPromise;
            }
            // when there is valid oauth config and there is an inflight oauth flow, try
            // to block async calls that require fetching tokens before the oauth flow completes
            // e.g. getCurrentUser, fetchAuthSession etc.
            this.inflightPromise = new Promise((resolve, _reject)=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$oauth$2f$inflightPromise$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addInflightPromise"])(resolve);
            });
            return this.inflightPromise;
        } : async ()=>{
        // no-op for non-browser environments
        };
    }
}
;
 //# sourceMappingURL=TokenOrchestrator.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/CognitoUserPoolsTokenProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CognitoUserPoolsTokenProvider",
    ()=>CognitoUserPoolsTokenProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$storage$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/storage/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$refreshAuthTokens$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/utils/refreshAuthTokens.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$TokenStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenStore.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$TokenOrchestrator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/TokenOrchestrator.mjs [app-client] (ecmascript)");
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
class CognitoUserPoolsTokenProvider {
    getTokens() {
        let { forceRefresh } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
            forceRefresh: false
        };
        return this.tokenOrchestrator.getTokens({
            forceRefresh
        });
    }
    setKeyValueStorage(keyValueStorage) {
        this.authTokenStore.setKeyValueStorage(keyValueStorage);
    }
    setAuthConfig(authConfig) {
        this.authTokenStore.setAuthConfig(authConfig);
        this.tokenOrchestrator.setAuthConfig(authConfig);
    }
    constructor(){
        this.authTokenStore = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$TokenStore$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DefaultTokenStore"]();
        this.authTokenStore.setKeyValueStorage(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$storage$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultStorage"]);
        this.tokenOrchestrator = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$TokenOrchestrator$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TokenOrchestrator"]();
        this.tokenOrchestrator.setAuthTokenStore(this.authTokenStore);
        this.tokenOrchestrator.setTokenRefresher(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$utils$2f$refreshAuthTokens$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refreshAuthTokens"]);
    }
}
;
 //# sourceMappingURL=CognitoUserPoolsTokenProvider.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/tokenProvider.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cognitoUserPoolsTokenProvider",
    ()=>cognitoUserPoolsTokenProvider,
    "tokenOrchestrator",
    ()=>tokenOrchestrator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$CognitoUserPoolsTokenProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/auth/dist/esm/providers/cognito/tokenProvider/CognitoUserPoolsTokenProvider.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * The default provider for the JWT access token and ID token issued from the configured Cognito user pool. It manages
 * the refresh and storage of the tokens. It stores the tokens in `window.localStorage` if available, and falls back to
 * in-memory storage if not.
 */ const cognitoUserPoolsTokenProvider = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$auth$2f$dist$2f$esm$2f$providers$2f$cognito$2f$tokenProvider$2f$CognitoUserPoolsTokenProvider$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CognitoUserPoolsTokenProvider"]();
const { tokenOrchestrator } = cognitoUserPoolsTokenProvider;
;
 //# sourceMappingURL=tokenProvider.mjs.map
}),
]);

//# sourceMappingURL=6361e_%40aws-amplify_auth_dist_esm_712fb788._.js.map