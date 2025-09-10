(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/types/index.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GraphQLAuthError",
    ()=>GraphQLAuthError,
    "__amplify",
    ()=>__amplify,
    "__apiKey",
    ()=>__apiKey,
    "__authMode",
    ()=>__authMode,
    "__authToken",
    ()=>__authToken,
    "__endpoint",
    ()=>__endpoint,
    "__headers",
    ()=>__headers,
    "getInternals",
    ()=>getInternals
]);
;
var GraphQLAuthError;
(function(GraphQLAuthError) {
    GraphQLAuthError["NO_API_KEY"] = "No api-key configured";
    GraphQLAuthError["NO_CURRENT_USER"] = "No current user";
    GraphQLAuthError["NO_CREDENTIALS"] = "No credentials";
    GraphQLAuthError["NO_FEDERATED_JWT"] = "No federated jwt";
    GraphQLAuthError["NO_AUTH_TOKEN"] = "No auth token specified";
})(GraphQLAuthError || (GraphQLAuthError = {}));
const __amplify = Symbol('amplify');
const __authMode = Symbol('authMode');
const __authToken = Symbol('authToken');
const __apiKey = Symbol('apiKey');
const __headers = Symbol('headers');
const __endpoint = Symbol('endpoint');
function getInternals(client) {
    const c = client;
    return {
        amplify: c[__amplify],
        apiKey: c[__apiKey],
        authMode: c[__authMode],
        authToken: c[__authToken],
        endpoint: c[__endpoint],
        headers: c[__headers]
    };
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/utils/runtimeTypeGuards/isApiGraphQLProviderConfig.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "isApiGraphQLConfig",
    ()=>isApiGraphQLConfig
]);
function isApiGraphQLConfig(apiGraphQLConfig) {
    return apiGraphQLConfig !== undefined;
}
;
 //# sourceMappingURL=isApiGraphQLProviderConfig.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/utils/runtimeTypeGuards/isConfigureEventWithResourceConfig.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "isConfigureEventWithResourceConfig",
    ()=>isConfigureEventWithResourceConfig
]);
function isConfigureEventWithResourceConfig(payload) {
    return payload.event === 'configure';
}
;
 //# sourceMappingURL=isConfigureEventWithResourceConfig.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/constants.mjs [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AWS_APPSYNC_REALTIME_HEADERS",
    ()=>AWS_APPSYNC_REALTIME_HEADERS,
    "CONNECTION_INIT_TIMEOUT",
    ()=>CONNECTION_INIT_TIMEOUT,
    "CONNECTION_STATE_CHANGE",
    ()=>CONNECTION_STATE_CHANGE,
    "DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT",
    ()=>DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT,
    "DEFAULT_KEEP_ALIVE_HEARTBEAT_TIMEOUT",
    ()=>DEFAULT_KEEP_ALIVE_HEARTBEAT_TIMEOUT,
    "DEFAULT_KEEP_ALIVE_TIMEOUT",
    ()=>DEFAULT_KEEP_ALIVE_TIMEOUT,
    "MAX_DELAY_MS",
    ()=>MAX_DELAY_MS,
    "MESSAGE_TYPES",
    ()=>MESSAGE_TYPES,
    "NON_RETRYABLE_CODES",
    ()=>NON_RETRYABLE_CODES,
    "NON_RETRYABLE_ERROR_TYPES",
    ()=>NON_RETRYABLE_ERROR_TYPES,
    "RECONNECT_DELAY",
    ()=>RECONNECT_DELAY,
    "RECONNECT_INTERVAL",
    ()=>RECONNECT_INTERVAL,
    "SOCKET_STATUS",
    ()=>SOCKET_STATUS,
    "START_ACK_TIMEOUT",
    ()=>START_ACK_TIMEOUT,
    "SUBSCRIPTION_STATUS",
    ()=>SUBSCRIPTION_STATUS
]);
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const MAX_DELAY_MS = 5000;
const NON_RETRYABLE_CODES = [
    400,
    401,
    403
];
const NON_RETRYABLE_ERROR_TYPES = [
    'BadRequestException',
    'UnauthorizedException'
];
const CONNECTION_STATE_CHANGE = 'ConnectionStateChange';
var MESSAGE_TYPES;
(function(MESSAGE_TYPES) {
    /**
     * Client -> Server message.
     * This message type is the first message after handshake and this will initialize AWS AppSync RealTime communication
     */ MESSAGE_TYPES["GQL_CONNECTION_INIT"] = "connection_init";
    /**
     * Server -> Client message
     * This message type is in case there is an issue with AWS AppSync RealTime when establishing connection
     */ MESSAGE_TYPES["GQL_CONNECTION_ERROR"] = "connection_error";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_CONNECTION_INIT message
     */ MESSAGE_TYPES["GQL_CONNECTION_ACK"] = "connection_ack";
    /**
     * Client -> Server message.
     * This message type is for register subscriptions with AWS AppSync RealTime
     */ MESSAGE_TYPES["GQL_START"] = "start";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_START message
     */ MESSAGE_TYPES["GQL_START_ACK"] = "start_ack";
    /**
     * Server -> Client message.
     * This message type is for subscription message from AWS AppSync RealTime or Events
     */ MESSAGE_TYPES["DATA"] = "data";
    /**
     * Server -> Client message.
     * This message type helps the client to know is still receiving messages from AWS AppSync RealTime
     */ MESSAGE_TYPES["GQL_CONNECTION_KEEP_ALIVE"] = "ka";
    /**
     * Client -> Server message.
     * This message type is for unregister subscriptions with AWS AppSync RealTime
     */ MESSAGE_TYPES["GQL_STOP"] = "stop";
    /**
     * Server -> Client message.
     * This message type is for the ack response from AWS AppSync RealTime for GQL_STOP message
     */ MESSAGE_TYPES["GQL_COMPLETE"] = "complete";
    /**
     * Server -> Client message.
     * This message type is for sending error messages from AWS AppSync RealTime to the client
     */ MESSAGE_TYPES["GQL_ERROR"] = "error";
    /**
     * Client -> Server message.
     * This message type is for registering subscriptions with Events
     */ MESSAGE_TYPES["EVENT_SUBSCRIBE"] = "subscribe";
    /**
     * Client -> Server message.
     * This message type is for publishing a message with Events
     */ MESSAGE_TYPES["EVENT_PUBLISH"] = "publish";
    /**
     * Server -> Client message.
     * Server acknowledges successful subscription
     */ MESSAGE_TYPES["EVENT_SUBSCRIBE_ACK"] = "subscribe_success";
    /**
     * Server -> Client message.
     * Server acknowledges successful publish
     */ MESSAGE_TYPES["EVENT_PUBLISH_ACK"] = "publish_success";
    /**
     * Client -> Server message.
     * This message type is for unregister subscriptions with AWS AppSync RealTime
     */ MESSAGE_TYPES["EVENT_STOP"] = "unsubscribe";
    /**
     * Server -> Client message.
     * This is the ack response from AWS AppSync Events to EVENT_STOP message
     */ MESSAGE_TYPES["EVENT_COMPLETE"] = "unsubscribe_success";
})(MESSAGE_TYPES || (MESSAGE_TYPES = {}));
var SUBSCRIPTION_STATUS;
(function(SUBSCRIPTION_STATUS) {
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["PENDING"] = 0] = "PENDING";
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["CONNECTED"] = 1] = "CONNECTED";
    SUBSCRIPTION_STATUS[SUBSCRIPTION_STATUS["FAILED"] = 2] = "FAILED";
})(SUBSCRIPTION_STATUS || (SUBSCRIPTION_STATUS = {}));
var SOCKET_STATUS;
(function(SOCKET_STATUS) {
    SOCKET_STATUS[SOCKET_STATUS["CLOSED"] = 0] = "CLOSED";
    SOCKET_STATUS[SOCKET_STATUS["READY"] = 1] = "READY";
    SOCKET_STATUS[SOCKET_STATUS["CONNECTING"] = 2] = "CONNECTING";
})(SOCKET_STATUS || (SOCKET_STATUS = {}));
const AWS_APPSYNC_REALTIME_HEADERS = {
    accept: 'application/json, text/javascript',
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=UTF-8'
};
/**
 * Time in milleseconds to wait for GQL_CONNECTION_INIT message
 */ const CONNECTION_INIT_TIMEOUT = 15000;
/**
 * Time in milleseconds to wait for GQL_START_ACK message
 */ const START_ACK_TIMEOUT = 15000;
/**
 * Default Time in milleseconds to wait for GQL_CONNECTION_KEEP_ALIVE message
 */ const DEFAULT_KEEP_ALIVE_TIMEOUT = 5 * 60 * 1000;
/**
 * Default Time in milleseconds between monitoring checks of keep alive status
 */ const DEFAULT_KEEP_ALIVE_HEARTBEAT_TIMEOUT = 5 * 1000;
/**
 * Default Time in milleseconds to alert for missed GQL_CONNECTION_KEEP_ALIVE message
 */ const DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT = 65 * 1000;
/**
 * Default delay time in milleseconds between when reconnect is triggered vs when it is attempted
 */ const RECONNECT_DELAY = 5 * 1000;
/**
 * Default interval time in milleseconds between when reconnect is re-attempted
 */ const RECONNECT_INTERVAL = 60 * 1000;
;
 //# sourceMappingURL=constants.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/types/PubSub.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONTROL_MSG",
    ()=>CONTROL_MSG,
    "ConnectionState",
    ()=>ConnectionState
]);
var CONTROL_MSG;
(function(CONTROL_MSG) {
    CONTROL_MSG["CONNECTION_CLOSED"] = "Connection closed";
    CONTROL_MSG["CONNECTION_FAILED"] = "Connection failed";
    CONTROL_MSG["REALTIME_SUBSCRIPTION_INIT_ERROR"] = "AppSync Realtime subscription init error";
    CONTROL_MSG["SUBSCRIPTION_ACK"] = "Subscription ack";
    CONTROL_MSG["TIMEOUT_DISCONNECT"] = "Timeout disconnect";
})(CONTROL_MSG || (CONTROL_MSG = {}));
/** @enum {string} */ var ConnectionState;
(function(ConnectionState) {
    /*
     * The connection is alive and healthy
     */ ConnectionState["Connected"] = "Connected";
    /*
     * The connection is alive, but the connection is offline
     */ ConnectionState["ConnectedPendingNetwork"] = "ConnectedPendingNetwork";
    /*
     * The connection has been disconnected while in use
     */ ConnectionState["ConnectionDisrupted"] = "ConnectionDisrupted";
    /*
     * The connection has been disconnected and the network is offline
     */ ConnectionState["ConnectionDisruptedPendingNetwork"] = "ConnectionDisruptedPendingNetwork";
    /*
     * The connection is in the process of connecting
     */ ConnectionState["Connecting"] = "Connecting";
    /*
     * The connection is not in use and is being disconnected
     */ ConnectionState["ConnectedPendingDisconnect"] = "ConnectedPendingDisconnect";
    /*
     * The connection is not in use and has been disconnected
     */ ConnectionState["Disconnected"] = "Disconnected";
    /*
     * The connection is alive, but a keep alive message has been missed
     */ ConnectionState["ConnectedPendingKeepAlive"] = "ConnectedPendingKeepAlive";
})(ConnectionState || (ConnectionState = {}));
;
 //# sourceMappingURL=PubSub.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/ReachabilityMonitor/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReachabilityMonitor",
    ()=>ReachabilityMonitor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Reachability$2f$Reachability$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Reachability/Reachability.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const ReachabilityMonitor = ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Reachability$2f$Reachability$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Reachability"]().networkMonitor();
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/ConnectionStateMonitor.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONNECTION_CHANGE",
    ()=>CONNECTION_CHANGE,
    "ConnectionStateMonitor",
    ()=>ConnectionStateMonitor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$Observable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/rxjs/dist/esm5/internal/Observable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$operators$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/rxjs/dist/esm5/internal/operators/map.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$operators$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/rxjs/dist/esm5/internal/operators/filter.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/types/PubSub.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ReachabilityMonitor$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/ReachabilityMonitor/index.mjs [app-client] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const CONNECTION_CHANGE = {
    KEEP_ALIVE_MISSED: {
        keepAliveState: 'unhealthy'
    },
    KEEP_ALIVE: {
        keepAliveState: 'healthy'
    },
    CONNECTION_ESTABLISHED: {
        connectionState: 'connected'
    },
    CONNECTION_FAILED: {
        intendedConnectionState: 'disconnected',
        connectionState: 'disconnected'
    },
    CLOSING_CONNECTION: {
        intendedConnectionState: 'disconnected'
    },
    OPENING_CONNECTION: {
        intendedConnectionState: 'connected',
        connectionState: 'connecting'
    },
    CLOSED: {
        connectionState: 'disconnected'
    },
    ONLINE: {
        networkState: 'connected'
    },
    OFFLINE: {
        networkState: 'disconnected'
    }
};
class ConnectionStateMonitor {
    /**
     * Turn network state monitoring on if it isn't on already
     */ enableNetworkMonitoring() {
        var // If no initial network state was discovered, stop trying
        _this__initialNetworkStateSubscription;
        (_this__initialNetworkStateSubscription = this._initialNetworkStateSubscription) === null || _this__initialNetworkStateSubscription === void 0 ? void 0 : _this__initialNetworkStateSubscription.unsubscribe();
        // Maintain the network state based on the reachability monitor
        if (this._networkMonitoringSubscription === undefined) {
            this._networkMonitoringSubscription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ReachabilityMonitor$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReachabilityMonitor"])().subscribe((param)=>{
                let { online } = param;
                this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
            });
        }
    }
    /**
     * Turn network state monitoring off if it isn't off already
     */ disableNetworkMonitoring() {
        var _this__networkMonitoringSubscription;
        (_this__networkMonitoringSubscription = this._networkMonitoringSubscription) === null || _this__networkMonitoringSubscription === void 0 ? void 0 : _this__networkMonitoringSubscription.unsubscribe();
        this._networkMonitoringSubscription = undefined;
    }
    /**
     * Get the observable that allows us to monitor the connection state
     *
     * @returns {Observable<ConnectionState>} - The observable that emits ConnectionState updates
     */ get connectionStateObservable() {
        let previous;
        // The linked state aggregates state changes to any of the network, connection,
        // intendedConnection and keepAliveHealth. Some states will change these independent
        // states without changing the overall connection state.
        // After translating from linked states to ConnectionState, then remove any duplicates
        return this._linkedConnectionStateObservable.pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$operators$2f$map$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["map"])((value)=>{
            return this.connectionStatesTranslator(value);
        })).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$operators$2f$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filter"])((current)=>{
            const toInclude = current !== previous;
            previous = current;
            return toInclude;
        }));
    }
    /*
     * Updates local connection state and emits the full state to the observer.
     */ record(statusUpdates) {
        var _this__linkedConnectionStateObserver;
        // Maintain the network monitor
        if (statusUpdates.intendedConnectionState === 'connected') {
            this.enableNetworkMonitoring();
        } else if (statusUpdates.intendedConnectionState === 'disconnected') {
            this.disableNetworkMonitoring();
        }
        // Maintain the socket state
        const newSocketStatus = {
            ...this._linkedConnectionState,
            ...statusUpdates
        };
        this._linkedConnectionState = {
            ...newSocketStatus
        };
        (_this__linkedConnectionStateObserver = this._linkedConnectionStateObserver) === null || _this__linkedConnectionStateObserver === void 0 ? void 0 : _this__linkedConnectionStateObserver.next(this._linkedConnectionState);
    }
    /*
     * Translate the ConnectionState structure into a specific ConnectionState string literal union
     */ connectionStatesTranslator(param) {
        let { connectionState, networkState, intendedConnectionState, keepAliveState } = param;
        if (connectionState === 'connected' && networkState === 'disconnected') return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectedPendingNetwork;
        if (connectionState === 'connected' && intendedConnectionState === 'disconnected') return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectedPendingDisconnect;
        if (connectionState === 'disconnected' && intendedConnectionState === 'connected' && networkState === 'disconnected') return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectionDisruptedPendingNetwork;
        if (connectionState === 'disconnected' && intendedConnectionState === 'connected') return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectionDisrupted;
        if (connectionState === 'connected' && keepAliveState === 'unhealthy') return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectedPendingKeepAlive;
        // All remaining states directly correspond to the connection state
        if (connectionState === 'connecting') return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].Connecting;
        if (connectionState === 'disconnected') return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].Disconnected;
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].Connected;
    }
    constructor(){
        this._networkMonitoringSubscription = undefined;
        this._linkedConnectionState = {
            networkState: 'connected',
            connectionState: 'disconnected',
            intendedConnectionState: 'disconnected',
            keepAliveState: 'healthy'
        };
        // Attempt to update the state with the current actual network state
        this._initialNetworkStateSubscription = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ReachabilityMonitor$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReachabilityMonitor"])().subscribe((param)=>{
            let { online } = param;
            var _this__initialNetworkStateSubscription;
            this.record(online ? CONNECTION_CHANGE.ONLINE : CONNECTION_CHANGE.OFFLINE);
            (_this__initialNetworkStateSubscription = this._initialNetworkStateSubscription) === null || _this__initialNetworkStateSubscription === void 0 ? void 0 : _this__initialNetworkStateSubscription.unsubscribe();
        });
        this._linkedConnectionStateObservable = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$Observable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Observable"]((connectionStateObserver)=>{
            connectionStateObserver.next(this._linkedConnectionState);
            this._linkedConnectionStateObserver = connectionStateObserver;
        });
    }
}
;
 //# sourceMappingURL=ConnectionStateMonitor.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/ReconnectionMonitor.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReconnectEvent",
    ()=>ReconnectEvent,
    "ReconnectionMonitor",
    ()=>ReconnectionMonitor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/constants.mjs [app-client] (ecmascript) <locals>");
;
var ReconnectEvent;
(function(ReconnectEvent) {
    ReconnectEvent["START_RECONNECT"] = "START_RECONNECT";
    ReconnectEvent["HALT_RECONNECT"] = "HALT_RECONNECT";
})(ReconnectEvent || (ReconnectEvent = {}));
/**
 * Captures the reconnect event logic used to determine when to reconnect to PubSub providers.
 *   Reconnect attempts are delayed by 5 seconds to let the interface settle.
 *   Attempting to reconnect only once creates unrecoverable states when the network state isn't
 *   supported by the browser, so this keeps retrying every minute until halted.
 */ class ReconnectionMonitor {
    /**
     * Add reconnect observer to the list of observers to alert on reconnect
     */ addObserver(reconnectObserver) {
        this.reconnectObservers.push(reconnectObserver);
    }
    /**
     * Given a reconnect event, start the appropriate behavior
     */ record(event) {
        if (event === ReconnectEvent.START_RECONNECT) {
            // If the reconnection hasn't been started
            if (this.reconnectSetTimeoutId === undefined && this.reconnectIntervalId === undefined) {
                this.reconnectSetTimeoutId = setTimeout(()=>{
                    // Reconnect now
                    this._triggerReconnect();
                    // Retry reconnect every periodically until it works
                    this.reconnectIntervalId = setInterval(()=>{
                        this._triggerReconnect();
                    }, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RECONNECT_INTERVAL"]);
                }, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RECONNECT_DELAY"]);
            }
        }
        if (event === ReconnectEvent.HALT_RECONNECT) {
            if (this.reconnectIntervalId) {
                clearInterval(this.reconnectIntervalId);
                this.reconnectIntervalId = undefined;
            }
            if (this.reconnectSetTimeoutId) {
                clearTimeout(this.reconnectSetTimeoutId);
                this.reconnectSetTimeoutId = undefined;
            }
        }
    }
    /**
     * Complete all reconnect observers
     */ close() {
        this.reconnectObservers.forEach((reconnectObserver)=>{
            var _reconnectObserver_complete;
            (_reconnectObserver_complete = reconnectObserver.complete) === null || _reconnectObserver_complete === void 0 ? void 0 : _reconnectObserver_complete.call(reconnectObserver);
        });
    }
    _triggerReconnect() {
        this.reconnectObservers.forEach((reconnectObserver)=>{
            var _reconnectObserver_next;
            (_reconnectObserver_next = reconnectObserver.next) === null || _reconnectObserver_next === void 0 ? void 0 : _reconnectObserver_next.call(reconnectObserver);
        });
    }
    constructor(){
        this.reconnectObservers = [];
    }
}
;
 //# sourceMappingURL=ReconnectionMonitor.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSWebSocketProvider/appsyncUrl.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "additionalHeadersFromOptions",
    ()=>additionalHeadersFromOptions,
    "getRealtimeEndpointUrl",
    ()=>getRealtimeEndpointUrl,
    "isCustomDomain",
    ()=>isCustomDomain,
    "queryParamsFromCustomHeaders",
    ()=>queryParamsFromCustomHeaders,
    "realtimeUrlWithQueryString",
    ()=>realtimeUrlWithQueryString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/amplifyUrl/index.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const protocol = 'wss://';
const standardDomainPattern = /^https:\/\/\w{26}\.appsync-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/graphql$/i;
const eventDomainPattern = /^https:\/\/\w{26}\.\w+-api\.\w{2}(?:(?:-\w{2,})+)-\d\.amazonaws.com(?:\.cn)?\/event$/i;
const customDomainPath = '/realtime';
const isCustomDomain = (url)=>{
    return url.match(standardDomainPattern) === null;
};
const isEventDomain = (url)=>url.match(eventDomainPattern) !== null;
const getRealtimeEndpointUrl = (appSyncGraphqlEndpoint)=>{
    let realtimeEndpoint = appSyncGraphqlEndpoint !== null && appSyncGraphqlEndpoint !== void 0 ? appSyncGraphqlEndpoint : '';
    if (isEventDomain(realtimeEndpoint)) {
        realtimeEndpoint = realtimeEndpoint.concat(customDomainPath).replace('ddpg-api', 'grt-gamma').replace('appsync-api', 'appsync-realtime-api');
    } else if (isCustomDomain(realtimeEndpoint)) {
        realtimeEndpoint = realtimeEndpoint.concat(customDomainPath);
    } else {
        realtimeEndpoint = realtimeEndpoint.replace('appsync-api', 'appsync-realtime-api').replace('gogi-beta', 'grt-beta').replace('ddpg-api', 'grt-gamma');
    }
    realtimeEndpoint = realtimeEndpoint.replace('https://', protocol).replace('http://', protocol);
    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrl"](realtimeEndpoint);
};
/**
 * Strips out `Authorization` header if present
 */ const extractNonAuthHeaders = (headers)=>{
    if (!headers) {
        return {};
    }
    if ('Authorization' in headers) {
        const { Authorization: _, ...nonAuthHeaders } = headers;
        return nonAuthHeaders;
    }
    return headers;
};
/**
 *
 * @param headers - http headers
 * @returns uri-encoded query parameters derived from custom headers
 */ const queryParamsFromCustomHeaders = (headers)=>{
    const nonAuthHeaders = extractNonAuthHeaders(headers);
    const params = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrlSearchParams"]();
    Object.entries(nonAuthHeaders).forEach((param)=>{
        let [k, v] = param;
        params.append(k, v);
    });
    return params;
};
/**
 * Normalizes AppSync realtime endpoint URL
 *
 * @param appSyncGraphqlEndpoint - AppSync endpointUri from config
 * @param urlParams - URLSearchParams
 * @returns fully resolved string realtime endpoint URL
 */ const realtimeUrlWithQueryString = (appSyncGraphqlEndpoint, urlParams)=>{
    const realtimeEndpointUrl = getRealtimeEndpointUrl(appSyncGraphqlEndpoint);
    // preserves any query params a customer might manually set in the configuration
    const existingParams = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrlSearchParams"](realtimeEndpointUrl.search);
    for (const [k, v] of urlParams.entries()){
        existingParams.append(k, v);
    }
    realtimeEndpointUrl.search = existingParams.toString();
    return realtimeEndpointUrl.toString();
};
// TODO: move to separate file?
const additionalHeadersFromOptions = async (options)=>{
    const { appSyncGraphqlEndpoint, query, libraryConfigHeaders = ()=>({}), additionalHeaders = {}, authToken } = options;
    let additionalCustomHeaders = {};
    const _libraryConfigHeaders = await libraryConfigHeaders();
    if (typeof additionalHeaders === 'function') {
        const requestOptions = {
            url: appSyncGraphqlEndpoint || '',
            queryString: query || ''
        };
        additionalCustomHeaders = await additionalHeaders(requestOptions);
    } else {
        additionalCustomHeaders = additionalHeaders;
    }
    // if an authorization header is set, have the explicit, operation-level authToken take precedence
    if (authToken) {
        additionalCustomHeaders = {
            ...additionalCustomHeaders,
            Authorization: authToken
        };
    }
    return {
        additionalCustomHeaders,
        libraryConfigHeaders: _libraryConfigHeaders
    };
};
;
 //# sourceMappingURL=appsyncUrl.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSWebSocketProvider/authHeaders.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "awsRealTimeHeaderBasedAuth",
    ()=>awsRealTimeHeaderBasedAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Logger/ConsoleLogger.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$apis$2f$fetchAuthSession$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/singleton/apis/fetchAuthSession.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$middleware$2f$signing$2f$signer$2f$signatureV4$2f$signRequest$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/clients/middleware/signing/signer/signatureV4/signRequest.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/amplifyUrl/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/constants.mjs [app-client] (ecmascript) <locals>");
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsoleLogger"]('AWSAppSyncRealTimeProvider Auth');
const awsAuthTokenHeader = async (param)=>{
    let { host } = param;
    var _session_tokens_accessToken, _session_tokens;
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$apis$2f$fetchAuthSession$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAuthSession"])();
    return {
        Authorization: session === null || session === void 0 ? void 0 : (_session_tokens = session.tokens) === null || _session_tokens === void 0 ? void 0 : (_session_tokens_accessToken = _session_tokens.accessToken) === null || _session_tokens_accessToken === void 0 ? void 0 : _session_tokens_accessToken.toString(),
        host
    };
};
const awsRealTimeApiKeyHeader = async (param)=>{
    let { apiKey, host } = param;
    const dt = new Date();
    const dtStr = dt.toISOString().replace(/[:-]|\.\d{3}/g, '');
    return {
        host,
        'x-amz-date': dtStr,
        'x-api-key': apiKey
    };
};
const awsRealTimeIAMHeader = async (param)=>{
    let { payload, canonicalUri, appSyncGraphqlEndpoint, region } = param;
    const endpointInfo = {
        region,
        service: 'appsync'
    };
    const creds = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$singleton$2f$apis$2f$fetchAuthSession$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAuthSession"])()).credentials;
    const request = {
        url: "".concat(appSyncGraphqlEndpoint).concat(canonicalUri),
        data: payload,
        method: 'POST',
        headers: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AWS_APPSYNC_REALTIME_HEADERS"]
        }
    };
    const signedParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$clients$2f$middleware$2f$signing$2f$signer$2f$signatureV4$2f$signRequest$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signRequest"])({
        headers: request.headers,
        method: request.method,
        url: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrl"](request.url),
        body: request.data
    }, {
        credentials: creds,
        signingRegion: endpointInfo.region,
        signingService: endpointInfo.service
    });
    return signedParams.headers;
};
const customAuthHeader = async (param)=>{
    let { host, additionalCustomHeaders } = param;
    /**
     * If `additionalHeaders` was provided to the subscription as a function,
     * the headers that are returned by that function will already have been
     * provided before this function is called.
     */ if (!(additionalCustomHeaders === null || additionalCustomHeaders === void 0 ? void 0 : additionalCustomHeaders.Authorization)) {
        throw new Error('No auth token specified');
    }
    return {
        Authorization: additionalCustomHeaders.Authorization,
        host
    };
};
const awsRealTimeHeaderBasedAuth = async (param)=>{
    let { apiKey, authenticationType, canonicalUri, appSyncGraphqlEndpoint, region, additionalCustomHeaders, payload } = param;
    const headerHandler = {
        apiKey: awsRealTimeApiKeyHeader,
        iam: awsRealTimeIAMHeader,
        oidc: awsAuthTokenHeader,
        userPool: awsAuthTokenHeader,
        lambda: customAuthHeader,
        none: customAuthHeader
    };
    if (!authenticationType || !headerHandler[authenticationType]) {
        logger.debug("Authentication type ".concat(authenticationType, " not supported"));
        return undefined;
    } else {
        const handler = headerHandler[authenticationType];
        const host = appSyncGraphqlEndpoint ? new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrl"](appSyncGraphqlEndpoint).host : undefined;
        const resolvedApiKey = authenticationType === 'apiKey' ? apiKey : undefined;
        logger.debug("Authenticating with ".concat(JSON.stringify(authenticationType)));
        const result = await handler({
            payload,
            canonicalUri,
            appSyncGraphqlEndpoint,
            apiKey: resolvedApiKey,
            region,
            host,
            additionalCustomHeaders
        });
        return result;
    }
};
;
 //# sourceMappingURL=authHeaders.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSWebSocketProvider/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AWSWebSocketProvider",
    ()=>AWSWebSocketProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$Observable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/rxjs/dist/esm5/internal/Observable.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/error/GraphQLError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Logger/ConsoleLogger.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Hub/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$retry$2f$NonRetryableError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/retry/NonRetryableError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUuid$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/amplifyUuid/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$retry$2f$isNonRetryableError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/retry/isNonRetryableError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$convert$2f$base64$2f$base64Encoder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/convert/base64/base64Encoder.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$retry$2f$jitteredExponentialRetry$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/retry/jitteredExponentialRetry.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/types/PubSub.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/constants.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/ConnectionStateMonitor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ReconnectionMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/ReconnectionMonitor.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$appsyncUrl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSWebSocketProvider/appsyncUrl.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$authHeaders$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSWebSocketProvider/authHeaders.mjs [app-client] (ecmascript)");
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
const dispatchApiEvent = (payload)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hub"].dispatch('api', payload, 'PubSub', __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMPLIFY_SYMBOL"]);
};
class AWSWebSocketProvider {
    /**
     * Mark the socket closed and release all active listeners
     */ close() {
        // Mark the socket closed both in status and the connection monitor
        this.socketStatus = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].CLOSED;
        this.connectionStateMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONNECTION_CHANGE"].CONNECTION_FAILED);
        // Turn off the subscription monitor Hub publishing
        this.connectionStateMonitorSubscription.unsubscribe();
        // Complete all reconnect observers
        this.reconnectionMonitor.close();
        return new Promise((resolve, reject)=>{
            if (this.awsRealTimeSocket) {
                this.awsRealTimeSocket.onclose = (_)=>{
                    this._closeSocket();
                    this.subscriptionObserverMap = new Map();
                    this.awsRealTimeSocket = undefined;
                    resolve();
                };
                this.awsRealTimeSocket.onerror = (err)=>{
                    reject(err);
                };
                this.awsRealTimeSocket.close();
            } else {
                resolve();
            }
        });
    }
    subscribe(options, customUserAgentDetails) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$Observable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Observable"]((observer)=>{
            if (!(options === null || options === void 0 ? void 0 : options.appSyncGraphqlEndpoint)) {
                observer.error({
                    errors: [
                        {
                            ...new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLError"]("Subscribe only available for AWS AppSync endpoint")
                        }
                    ]
                });
                observer.complete();
                return;
            }
            let subscriptionStartInProgress = false;
            const subscriptionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUuid$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["amplifyUuid"])();
            const startSubscription = ()=>{
                if (!subscriptionStartInProgress) {
                    subscriptionStartInProgress = true;
                    this._startSubscriptionWithAWSAppSyncRealTime({
                        options,
                        observer,
                        subscriptionId,
                        customUserAgentDetails
                    }).catch((err)=>{
                        this.logger.debug("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].REALTIME_SUBSCRIPTION_INIT_ERROR, ": ").concat(err));
                        this._closeSocket();
                    }).finally(()=>{
                        subscriptionStartInProgress = false;
                    });
                }
            };
            // Add an observable to the reconnection list to manage reconnection for this subscription
            const reconnectSubscription = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$Observable$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Observable"]((reconnectSubscriptionObserver)=>{
                this.reconnectionMonitor.addObserver(reconnectSubscriptionObserver);
            }).subscribe(()=>{
                startSubscription();
            });
            startSubscription();
            return async ()=>{
                await this._cleanupSubscription(subscriptionId, reconnectSubscription);
            };
        });
    }
    async connect(options) {
        if (this.socketStatus === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].READY) {
            return;
        }
        await this._connectWebSocket(options);
    }
    async publish(options, customUserAgentDetails) {
        if (this.socketStatus !== __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].READY) {
            throw new Error('Subscription has not been initialized');
        }
        return this._publishMessage(options, customUserAgentDetails);
    }
    async _connectWebSocket(options) {
        const { apiKey, appSyncGraphqlEndpoint, authenticationType, region } = options;
        const { additionalCustomHeaders } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$appsyncUrl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["additionalHeadersFromOptions"])(options);
        this.connectionStateMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONNECTION_CHANGE"].OPENING_CONNECTION);
        await this._initializeWebSocketConnection({
            apiKey,
            appSyncGraphqlEndpoint,
            authenticationType,
            region,
            additionalCustomHeaders
        });
    }
    async _publishMessage(options, customUserAgentDetails) {
        const subscriptionId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUuid$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["amplifyUuid"])();
        const { additionalCustomHeaders, libraryConfigHeaders } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$appsyncUrl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["additionalHeadersFromOptions"])(options);
        const serializedSubscriptionMessage = await this._prepareSubscriptionPayload({
            options,
            subscriptionId,
            customUserAgentDetails,
            additionalCustomHeaders,
            libraryConfigHeaders,
            publish: true
        });
        return new Promise((resolve, reject)=>{
            if (this.awsRealTimeSocket) {
                const publishListener = (event)=>{
                    const data = JSON.parse(event.data);
                    if (data.id === subscriptionId && data.type === 'publish_success') {
                        this.awsRealTimeSocket && this.awsRealTimeSocket.removeEventListener('message', publishListener);
                        cleanup();
                        resolve();
                    }
                    if (data.errors && data.errors.length > 0) {
                        const errorTypes = data.errors.map((error)=>error.errorType);
                        cleanup();
                        reject(new Error("Publish errors: ".concat(errorTypes.join(', '))));
                    }
                };
                const errorListener = (error)=>{
                    cleanup();
                    reject(new Error("WebSocket error: ".concat(error)));
                };
                const closeListener = ()=>{
                    cleanup();
                    reject(new Error('WebSocket is closed'));
                };
                const cleanup = ()=>{
                    var _this_awsRealTimeSocket, _this_awsRealTimeSocket1, _this_awsRealTimeSocket2;
                    (_this_awsRealTimeSocket = this.awsRealTimeSocket) === null || _this_awsRealTimeSocket === void 0 ? void 0 : _this_awsRealTimeSocket.removeEventListener('message', publishListener);
                    (_this_awsRealTimeSocket1 = this.awsRealTimeSocket) === null || _this_awsRealTimeSocket1 === void 0 ? void 0 : _this_awsRealTimeSocket1.removeEventListener('error', errorListener);
                    (_this_awsRealTimeSocket2 = this.awsRealTimeSocket) === null || _this_awsRealTimeSocket2 === void 0 ? void 0 : _this_awsRealTimeSocket2.removeEventListener('close', closeListener);
                };
                this.awsRealTimeSocket.addEventListener('message', publishListener);
                this.awsRealTimeSocket.addEventListener('error', errorListener);
                this.awsRealTimeSocket.addEventListener('close', closeListener);
                this.awsRealTimeSocket.send(serializedSubscriptionMessage);
            } else {
                reject(new Error('WebSocket is not connected'));
            }
        });
    }
    async _cleanupSubscription(subscriptionId, reconnectSubscription) {
        // Cleanup reconnection subscription
        reconnectSubscription === null || reconnectSubscription === void 0 ? void 0 : reconnectSubscription.unsubscribe();
        // Cleanup after unsubscribing or observer.complete was called after _startSubscriptionWithAWSAppSyncRealTime
        try {
            // Waiting that subscription has been connected before trying to unsubscribe
            await this._waitForSubscriptionToBeConnected(subscriptionId);
            const { subscriptionState } = this.subscriptionObserverMap.get(subscriptionId) || {};
            if (!subscriptionState) {
                // subscription already unsubscribed
                return;
            }
            if (subscriptionState === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SUBSCRIPTION_STATUS"].CONNECTED) {
                this._sendUnsubscriptionMessage(subscriptionId);
            } else {
                throw new Error('Subscription never connected');
            }
        } catch (err) {
            this.logger.debug("Error while unsubscribing ".concat(err));
        } finally{
            this._removeSubscriptionObserver(subscriptionId);
        }
    }
    // Monitor the connection state and pass changes along to Hub
    _startConnectionStateMonitoring() {
        return this.connectionStateMonitor.connectionStateObservable.subscribe((connectionState)=>{
            dispatchApiEvent({
                event: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CONNECTION_STATE_CHANGE"],
                data: {
                    provider: this,
                    connectionState
                },
                message: "Connection state is ".concat(connectionState)
            });
            this.connectionState = connectionState;
            // Trigger START_RECONNECT when the connection is disrupted
            if (connectionState === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectionDisrupted) {
                this.reconnectionMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ReconnectionMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReconnectEvent"].START_RECONNECT);
            }
            // Trigger HALT_RECONNECT to halt reconnection attempts when the state is anything other than
            // ConnectionDisrupted or Connecting
            if ([
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].Connected,
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectedPendingDisconnect,
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectedPendingKeepAlive,
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectedPendingNetwork,
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectionDisruptedPendingNetwork,
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].Disconnected
            ].includes(connectionState)) {
                this.reconnectionMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ReconnectionMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReconnectEvent"].HALT_RECONNECT);
            }
        });
    }
    async _startSubscriptionWithAWSAppSyncRealTime(param) {
        let { options, observer, subscriptionId, customUserAgentDetails } = param;
        const { query, variables } = options;
        this.subscriptionObserverMap.set(subscriptionId, {
            observer,
            query: query !== null && query !== void 0 ? query : '',
            variables: variables !== null && variables !== void 0 ? variables : {},
            subscriptionState: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SUBSCRIPTION_STATUS"].PENDING,
            startAckTimeoutId: undefined
        });
        const { additionalCustomHeaders, libraryConfigHeaders } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$appsyncUrl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["additionalHeadersFromOptions"])(options);
        const serializedSubscriptionMessage = await this._prepareSubscriptionPayload({
            options,
            subscriptionId,
            customUserAgentDetails,
            additionalCustomHeaders,
            libraryConfigHeaders
        });
        try {
            await this._connectWebSocket(options);
        } catch (err) {
            this._logStartSubscriptionError(subscriptionId, observer, err);
            return;
        }
        var _this_subscriptionObserverMap_get;
        // Potential race condition can occur when unsubscribe is called during _initializeWebSocketConnection.
        // E.g.unsubscribe gets invoked prior to finishing WebSocket handshake or START_ACK.
        // Both subscriptionFailedCallback and subscriptionReadyCallback are used to synchronized this.
        const { subscriptionFailedCallback, subscriptionReadyCallback } = (_this_subscriptionObserverMap_get = this.subscriptionObserverMap.get(subscriptionId)) !== null && _this_subscriptionObserverMap_get !== void 0 ? _this_subscriptionObserverMap_get : {};
        // This must be done before sending the message in order to be listening immediately
        this.subscriptionObserverMap.set(subscriptionId, {
            observer,
            subscriptionState: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SUBSCRIPTION_STATUS"].PENDING,
            query: query !== null && query !== void 0 ? query : '',
            variables: variables !== null && variables !== void 0 ? variables : {},
            subscriptionReadyCallback,
            subscriptionFailedCallback,
            startAckTimeoutId: setTimeout(()=>{
                this._timeoutStartSubscriptionAck(subscriptionId);
            }, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["START_ACK_TIMEOUT"])
        });
        if (this.awsRealTimeSocket) {
            this.awsRealTimeSocket.send(serializedSubscriptionMessage);
        }
    }
    // Log logic for start subscription failures
    _logStartSubscriptionError(subscriptionId, observer, err) {
        this.logger.debug({
            err
        });
        var _err_message;
        const message = String((_err_message = err.message) !== null && _err_message !== void 0 ? _err_message : '');
        // Resolving to give the state observer time to propogate the update
        this._closeSocket();
        // Capture the error only when the network didn't cause disruption
        if (this.connectionState !== __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionState"].ConnectionDisruptedPendingNetwork) {
            // When the error is non-retriable, error out the observable
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$retry$2f$isNonRetryableError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isNonRetryableError"])(err)) {
                observer.error({
                    errors: [
                        {
                            ...new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLError"]("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].CONNECTION_FAILED, ": ").concat(message))
                        }
                    ]
                });
            } else {
                this.logger.debug("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].CONNECTION_FAILED, ": ").concat(message));
            }
            const { subscriptionFailedCallback } = this.subscriptionObserverMap.get(subscriptionId) || {};
            // Notify concurrent unsubscription
            if (typeof subscriptionFailedCallback === 'function') {
                subscriptionFailedCallback();
            }
        }
    }
    // Waiting that subscription has been connected before trying to unsubscribe
    async _waitForSubscriptionToBeConnected(subscriptionId) {
        const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
        if (subscriptionObserver) {
            const { subscriptionState } = subscriptionObserver;
            // This in case unsubscribe is invoked before sending start subscription message
            if (subscriptionState === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SUBSCRIPTION_STATUS"].PENDING) {
                return new Promise((resolve, reject)=>{
                    const { observer, subscriptionState: observedSubscriptionState, variables, query } = subscriptionObserver;
                    this.subscriptionObserverMap.set(subscriptionId, {
                        observer,
                        subscriptionState: observedSubscriptionState,
                        variables,
                        query,
                        subscriptionReadyCallback: resolve,
                        subscriptionFailedCallback: reject
                    });
                });
            }
        }
    }
    _sendUnsubscriptionMessage(subscriptionId) {
        try {
            if (this.awsRealTimeSocket && this.awsRealTimeSocket.readyState === WebSocket.OPEN && this.socketStatus === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].READY) {
                // Preparing unsubscribe message to stop receiving messages for that subscription
                const unsubscribeMessage = this._unsubscribeMessage(subscriptionId);
                const stringToAWSRealTime = JSON.stringify(unsubscribeMessage);
                this.awsRealTimeSocket.send(stringToAWSRealTime);
            }
        } catch (err) {
            // If GQL_STOP is not sent because of disconnection issue, then there is nothing the client can do
            this.logger.debug({
                err
            });
        }
    }
    _removeSubscriptionObserver(subscriptionId) {
        this.subscriptionObserverMap.delete(subscriptionId);
        // Verifying 1000ms after removing subscription in case there are new subscription unmount/mount
        if (!this.allowNoSubscriptions) {
            setTimeout(this._closeSocketIfRequired.bind(this), 1000);
        }
    }
    _closeSocketIfRequired() {
        if (this.subscriptionObserverMap.size > 0) {
            // Active subscriptions on the WebSocket
            return;
        }
        if (!this.awsRealTimeSocket) {
            this.socketStatus = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].CLOSED;
            return;
        }
        this.connectionStateMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONNECTION_CHANGE"].CLOSING_CONNECTION);
        if (this.awsRealTimeSocket.bufferedAmount > 0) {
            // Still data on the WebSocket
            setTimeout(this._closeSocketIfRequired.bind(this), 1000);
        } else {
            this.logger.debug('closing WebSocket...');
            const tempSocket = this.awsRealTimeSocket;
            // Cleaning callbacks to avoid race condition, socket still exists
            tempSocket.onclose = null;
            tempSocket.onerror = null;
            tempSocket.close(1000);
            this.awsRealTimeSocket = undefined;
            this.socketStatus = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].CLOSED;
            this._closeSocket();
        }
    }
    maintainKeepAlive() {
        this.keepAliveTimestamp = Date.now();
    }
    keepAliveHeartbeat(connectionTimeoutMs) {
        const currentTime = Date.now();
        // Check for missed KA message
        if (currentTime - this.keepAliveTimestamp > __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DEFAULT_KEEP_ALIVE_ALERT_TIMEOUT"]) {
            this.connectionStateMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONNECTION_CHANGE"].KEEP_ALIVE_MISSED);
        } else {
            this.connectionStateMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONNECTION_CHANGE"].KEEP_ALIVE);
        }
        // Recognize we are disconnected if we haven't seen messages in the keep alive timeout period
        if (currentTime - this.keepAliveTimestamp > connectionTimeoutMs) {
            this._errorDisconnect(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].TIMEOUT_DISCONNECT);
        }
    }
    _handleIncomingSubscriptionMessage(message) {
        if (typeof message.data !== 'string') {
            return;
        }
        const [isData, data] = this._handleSubscriptionData(message);
        if (isData) {
            this.maintainKeepAlive();
            return;
        }
        const { type, id, payload } = data;
        const { observer = null, query = '', variables = {}, startAckTimeoutId, subscriptionReadyCallback, subscriptionFailedCallback } = this.subscriptionObserverMap.get(id) || {};
        if (type === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].GQL_START_ACK || type === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].EVENT_SUBSCRIBE_ACK) {
            this.logger.debug("subscription ready for ".concat(JSON.stringify({
                query,
                variables
            })));
            if (typeof subscriptionReadyCallback === 'function') {
                subscriptionReadyCallback();
            }
            if (startAckTimeoutId) clearTimeout(startAckTimeoutId);
            dispatchApiEvent({
                event: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].SUBSCRIPTION_ACK,
                data: {
                    query,
                    variables
                },
                message: 'Connection established for subscription'
            });
            const subscriptionState = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SUBSCRIPTION_STATUS"].CONNECTED;
            if (observer) {
                this.subscriptionObserverMap.set(id, {
                    observer,
                    query,
                    variables,
                    startAckTimeoutId: undefined,
                    subscriptionState,
                    subscriptionReadyCallback,
                    subscriptionFailedCallback
                });
            }
            this.connectionStateMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONNECTION_CHANGE"].CONNECTION_ESTABLISHED);
            return;
        }
        if (type === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].GQL_CONNECTION_KEEP_ALIVE) {
            this.maintainKeepAlive();
            return;
        }
        if (type === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].GQL_ERROR) {
            const subscriptionState = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SUBSCRIPTION_STATUS"].FAILED;
            if (observer) {
                this.subscriptionObserverMap.set(id, {
                    observer,
                    query,
                    variables,
                    startAckTimeoutId,
                    subscriptionReadyCallback,
                    subscriptionFailedCallback,
                    subscriptionState
                });
                this.logger.debug("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].CONNECTION_FAILED, ": ").concat(JSON.stringify(payload !== null && payload !== void 0 ? payload : data)));
                observer.error({
                    errors: [
                        {
                            ...new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLError"]("".concat(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].CONNECTION_FAILED, ": ").concat(JSON.stringify(payload !== null && payload !== void 0 ? payload : data)))
                        }
                    ]
                });
                if (startAckTimeoutId) clearTimeout(startAckTimeoutId);
                if (typeof subscriptionFailedCallback === 'function') {
                    subscriptionFailedCallback();
                }
            }
        }
    }
    _errorDisconnect(msg) {
        this.logger.debug("Disconnect error: ".concat(msg));
        if (this.awsRealTimeSocket) {
            this._closeSocket();
            this.awsRealTimeSocket.close();
        }
        this.socketStatus = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].CLOSED;
    }
    _closeSocket() {
        if (this.keepAliveHeartbeatIntervalId) {
            clearInterval(this.keepAliveHeartbeatIntervalId);
            this.keepAliveHeartbeatIntervalId = undefined;
        }
        this.connectionStateMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONNECTION_CHANGE"].CLOSED);
    }
    _timeoutStartSubscriptionAck(subscriptionId) {
        const subscriptionObserver = this.subscriptionObserverMap.get(subscriptionId);
        if (subscriptionObserver) {
            const { observer, query, variables } = subscriptionObserver;
            if (!observer) {
                return;
            }
            this.subscriptionObserverMap.set(subscriptionId, {
                observer,
                query,
                variables,
                subscriptionState: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SUBSCRIPTION_STATUS"].FAILED
            });
            this._closeSocket();
            this.logger.debug('timeoutStartSubscription', JSON.stringify({
                query,
                variables
            }));
        }
    }
    _initializeWebSocketConnection(param) {
        let { appSyncGraphqlEndpoint, authenticationType, apiKey, region, additionalCustomHeaders } = param;
        if (this.socketStatus === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].READY) {
            return;
        }
        // TODO(Eslint): refactor to now use async function as the promise executor
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject)=>{
            this.promiseArray.push({
                res: resolve,
                rej: reject
            });
            if (this.socketStatus === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].CLOSED) {
                try {
                    this.socketStatus = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].CONNECTING;
                    // Empty payload on connect
                    const payloadString = '{}';
                    const authHeader = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$authHeaders$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["awsRealTimeHeaderBasedAuth"])({
                        authenticationType,
                        payload: payloadString,
                        canonicalUri: this.wsConnectUri,
                        apiKey,
                        appSyncGraphqlEndpoint,
                        region,
                        additionalCustomHeaders
                    });
                    const headerString = authHeader ? JSON.stringify(authHeader) : '';
                    // base64url-encoded string
                    const encodedHeader = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$convert$2f$base64$2f$base64Encoder$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64Encoder"].convert(headerString, {
                        urlSafe: true,
                        skipPadding: true
                    });
                    const authTokenSubprotocol = "header-".concat(encodedHeader);
                    const queryParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$appsyncUrl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["queryParamsFromCustomHeaders"])(additionalCustomHeaders);
                    const awsRealTimeUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$appsyncUrl$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["realtimeUrlWithQueryString"])(appSyncGraphqlEndpoint, queryParams);
                    await this._establishRetryableConnection(awsRealTimeUrl, authTokenSubprotocol);
                    this.promiseArray.forEach((param)=>{
                        let { res } = param;
                        this.logger.debug('Notifying connection successful');
                        res();
                    });
                    this.socketStatus = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].READY;
                    this.promiseArray = [];
                } catch (err) {
                    this.logger.debug('Connection exited with', err);
                    this.promiseArray.forEach((param)=>{
                        let { rej } = param;
                        rej(err);
                    });
                    this.promiseArray = [];
                    if (this.awsRealTimeSocket && this.awsRealTimeSocket.readyState === WebSocket.OPEN) {
                        this.awsRealTimeSocket.close(3001);
                    }
                    this.awsRealTimeSocket = undefined;
                    this.socketStatus = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].CLOSED;
                }
            }
        });
    }
    async _establishRetryableConnection(awsRealTimeUrl, subprotocol) {
        this.logger.debug("Establishing retryable connection");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$retry$2f$jitteredExponentialRetry$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jitteredExponentialRetry"])(this._establishConnection.bind(this), [
            awsRealTimeUrl,
            subprotocol
        ], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAX_DELAY_MS"]);
    }
    async _openConnection(awsRealTimeUrl, subprotocol) {
        return new Promise((resolve, reject)=>{
            const newSocket = this._getNewWebSocket(awsRealTimeUrl, [
                this.wsProtocolName,
                subprotocol
            ]);
            newSocket.onerror = ()=>{
                this.logger.debug("WebSocket connection error");
            };
            newSocket.onclose = ()=>{
                this._closeSocket();
                reject(new Error('Connection handshake error'));
            };
            newSocket.onopen = ()=>{
                this.awsRealTimeSocket = newSocket;
                resolve();
            };
        });
    }
    _getNewWebSocket(url, protocol) {
        return new WebSocket(url, protocol);
    }
    async _initiateHandshake() {
        return new Promise((resolve, reject)=>{
            if (!this.awsRealTimeSocket) {
                reject(new Error('awsRealTimeSocket undefined'));
                return;
            }
            let ackOk = false;
            this.awsRealTimeSocket.onerror = (error)=>{
                this.logger.debug("WebSocket error ".concat(JSON.stringify(error)));
            };
            this.awsRealTimeSocket.onclose = (event)=>{
                this.logger.debug("WebSocket closed ".concat(event.reason));
                this._closeSocket();
                reject(new Error(JSON.stringify(event)));
            };
            this.awsRealTimeSocket.onmessage = (message)=>{
                if (typeof message.data !== 'string') {
                    return;
                }
                this.logger.debug("subscription message from AWS AppSyncRealTime: ".concat(message.data, " "));
                const data = JSON.parse(message.data);
                const { type } = data;
                const connectionTimeoutMs = this._extractConnectionTimeout(data);
                if (type === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].GQL_CONNECTION_ACK) {
                    ackOk = true;
                    this._registerWebsocketHandlers(connectionTimeoutMs);
                    resolve('Connected to AWS AppSyncRealTime');
                    return;
                }
                if (type === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].GQL_CONNECTION_ERROR) {
                    const { errorType, errorCode } = this._extractErrorCodeAndType(data);
                    // TODO(Eslint): refactor to reject an Error object instead of a plain object
                    // eslint-disable-next-line prefer-promise-reject-errors
                    reject({
                        errorType,
                        errorCode
                    });
                }
            };
            const gqlInit = {
                type: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].GQL_CONNECTION_INIT
            };
            this.awsRealTimeSocket.send(JSON.stringify(gqlInit));
            const checkAckOk = (targetAckOk)=>{
                if (!targetAckOk) {
                    this.connectionStateMonitor.record(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONNECTION_CHANGE"].CONNECTION_FAILED);
                    reject(new Error("Connection timeout: ack from AWSAppSyncRealTime was not received after ".concat(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CONNECTION_INIT_TIMEOUT"], " ms")));
                }
            };
            setTimeout(()=>{
                checkAckOk(ackOk);
            }, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CONNECTION_INIT_TIMEOUT"]);
        });
    }
    _registerWebsocketHandlers(connectionTimeoutMs) {
        if (!this.awsRealTimeSocket) {
            return;
        }
        // Set up a keep alive heartbeat for this connection
        this.keepAliveHeartbeatIntervalId = setInterval(()=>{
            this.keepAliveHeartbeat(connectionTimeoutMs);
        }, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DEFAULT_KEEP_ALIVE_HEARTBEAT_TIMEOUT"]);
        this.awsRealTimeSocket.onmessage = this._handleIncomingSubscriptionMessage.bind(this);
        this.awsRealTimeSocket.onerror = (err)=>{
            this.logger.debug(err);
            this._errorDisconnect(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].CONNECTION_CLOSED);
        };
        this.awsRealTimeSocket.onclose = (event)=>{
            this.logger.debug("WebSocket closed ".concat(event.reason));
            this._closeSocket();
            this._errorDisconnect(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$PubSub$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTROL_MSG"].CONNECTION_CLOSED);
        };
    }
    constructor(args){
        this.subscriptionObserverMap = new Map();
        this.allowNoSubscriptions = false;
        this.socketStatus = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SOCKET_STATUS"].CLOSED;
        this.keepAliveTimestamp = Date.now();
        this.promiseArray = [];
        this.connectionStateMonitor = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ConnectionStateMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConnectionStateMonitor"]();
        this.reconnectionMonitor = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$ReconnectionMonitor$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReconnectionMonitor"]();
        /**
         * Open WebSocket connection & perform handshake
         * Ref: https://docs.aws.amazon.com/appsync/latest/devguide/real-time-websocket-client.html#appsynclong-real-time-websocket-client-implementation-guide-for-graphql-subscriptions
         *
         * @param subprotocol -
         */ this._establishConnection = async (awsRealTimeUrl, subprotocol)=>{
            this.logger.debug("Establishing WebSocket connection to ".concat(awsRealTimeUrl));
            try {
                await this._openConnection(awsRealTimeUrl, subprotocol);
                await this._initiateHandshake();
            } catch (err) {
                const { errorType, errorCode } = err;
                if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NON_RETRYABLE_CODES"].includes(errorCode) || // Event API does not currently return `errorCode`. This may change in the future.
                // For now fall back to also checking known non-retryable error types
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NON_RETRYABLE_ERROR_TYPES"].includes(errorType)) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$retry$2f$NonRetryableError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NonRetryableError"](errorType);
                } else if (errorType) {
                    throw new Error(errorType);
                } else {
                    throw err;
                }
            }
        };
        this.logger = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsoleLogger"](args.providerName);
        this.wsProtocolName = args.wsProtocolName;
        this.wsConnectUri = args.connectUri;
        this.connectionStateMonitorSubscription = this._startConnectionStateMonitoring();
    }
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSAppSyncRealTimeProvider/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AWSAppSyncRealTimeProvider",
    ()=>AWSAppSyncRealTimeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Platform/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/constants.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSWebSocketProvider/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$authHeaders$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSWebSocketProvider/authHeaders.mjs [app-client] (ecmascript)");
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const PROVIDER_NAME = 'AWSAppSyncRealTimeProvider';
const WS_PROTOCOL_NAME = 'graphql-ws';
const CONNECT_URI = '/connect';
class AWSAppSyncRealTimeProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AWSWebSocketProvider"] {
    getProviderName() {
        return PROVIDER_NAME;
    }
    subscribe(options, customUserAgentDetails) {
        return super.subscribe(options, customUserAgentDetails);
    }
    async _prepareSubscriptionPayload(param) {
        let { options, subscriptionId, customUserAgentDetails, additionalCustomHeaders, libraryConfigHeaders } = param;
        const { appSyncGraphqlEndpoint, authenticationType, query, variables, apiKey, region } = options;
        const data = {
            query,
            variables
        };
        const serializedData = JSON.stringify(data);
        const headers = {
            ...await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSWebSocketProvider$2f$authHeaders$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["awsRealTimeHeaderBasedAuth"])({
                apiKey,
                appSyncGraphqlEndpoint,
                authenticationType,
                payload: serializedData,
                canonicalUri: '',
                region,
                additionalCustomHeaders
            }),
            ...libraryConfigHeaders,
            ...additionalCustomHeaders,
            [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["USER_AGENT_HEADER"]]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAmplifyUserAgent"])(customUserAgentDetails)
        };
        const subscriptionMessage = {
            id: subscriptionId,
            payload: {
                data: serializedData,
                extensions: {
                    authorization: {
                        ...headers
                    }
                }
            },
            type: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].GQL_START
        };
        const serializedSubscriptionMessage = JSON.stringify(subscriptionMessage);
        return serializedSubscriptionMessage;
    }
    _handleSubscriptionData(message) {
        this.logger.debug("subscription message from AWS AppSync RealTime: ".concat(message.data));
        const { id = '', payload, type } = JSON.parse(String(message.data));
        const { observer = null, query = '', variables = {} } = this.subscriptionObserverMap.get(id) || {};
        this.logger.debug({
            id,
            observer,
            query,
            variables
        });
        if (type === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].DATA && payload && payload.data) {
            if (observer) {
                observer.next(payload);
            } else {
                this.logger.debug("observer not found for id: ".concat(id));
            }
            return [
                true,
                {
                    id,
                    type,
                    payload
                }
            ];
        }
        return [
            false,
            {
                id,
                type,
                payload
            }
        ];
    }
    _unsubscribeMessage(subscriptionId) {
        return {
            id: subscriptionId,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MESSAGE_TYPES"].GQL_STOP
        };
    }
    _extractConnectionTimeout(data) {
        const { payload: { connectionTimeoutMs = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DEFAULT_KEEP_ALIVE_TIMEOUT"] } = {} } = data;
        return connectionTimeoutMs;
    }
    _extractErrorCodeAndType(data) {
        const { payload: { errors: [{ errorType = '', errorCode = 0 } = {}] = [] } = {} } = data;
        return {
            errorCode,
            errorType
        };
    }
    constructor(){
        super({
            providerName: PROVIDER_NAME,
            wsProtocolName: WS_PROTOCOL_NAME,
            connectUri: CONNECT_URI
        });
    }
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/GraphQLApiError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GraphQLApiError",
    ()=>GraphQLApiError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$errors$2f$AmplifyError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/errors/AmplifyError.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */ class GraphQLApiError extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$errors$2f$AmplifyError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyError"] {
    constructor(params){
        super(params);
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        this.constructor = GraphQLApiError;
        Object.setPrototypeOf(this, GraphQLApiError.prototype);
    }
}
;
 //# sourceMappingURL=GraphQLApiError.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/validation.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "APIValidationErrorCode",
    ()=>APIValidationErrorCode,
    "validationErrorMap",
    ()=>validationErrorMap
]);
var APIValidationErrorCode;
(function(APIValidationErrorCode) {
    APIValidationErrorCode["NoAuthSession"] = "NoAuthSession";
    APIValidationErrorCode["NoRegion"] = "NoRegion";
    APIValidationErrorCode["NoCustomEndpoint"] = "NoCustomEndpoint";
})(APIValidationErrorCode || (APIValidationErrorCode = {}));
const validationErrorMap = {
    [APIValidationErrorCode.NoAuthSession]: {
        message: 'Auth session should not be empty.'
    },
    // TODO: re-enable when working in all test environments:
    // [APIValidationErrorCode.NoEndpoint]: {
    // 	message: 'Missing endpoint',
    // },
    [APIValidationErrorCode.NoRegion]: {
        message: 'Missing region.'
    },
    [APIValidationErrorCode.NoCustomEndpoint]: {
        message: 'Custom endpoint region is present without custom endpoint.'
    }
};
;
 //# sourceMappingURL=validation.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/assertValidationError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assertValidationError",
    ()=>assertValidationError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/GraphQLApiError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/validation.mjs [app-client] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */ function assertValidationError(assertion, name) {
    const { message, recoverySuggestion } = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validationErrorMap"][name];
    if (!assertion) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLApiError"]({
            name,
            message,
            recoverySuggestion
        });
    }
}
;
 //# sourceMappingURL=assertValidationError.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/resolveConfig.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveConfig",
    ()=>resolveConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Logger/ConsoleLogger.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$assertValidationError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/assertValidationError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/validation.mjs [app-client] (ecmascript)");
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const logger = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Logger$2f$ConsoleLogger$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConsoleLogger"]('GraphQLAPI resolveConfig');
/**
 * @internal
 */ const resolveConfig = (amplify)=>{
    var _config_API, _config_API1;
    const config = amplify.getConfig();
    if (!((_config_API = config.API) === null || _config_API === void 0 ? void 0 : _config_API.GraphQL)) {
        logger.warn('The API configuration is missing. This is likely due to Amplify.configure() not being called prior to generateClient().');
    }
    var _config_API_GraphQL;
    const { apiKey, customEndpoint, customEndpointRegion, defaultAuthMode, endpoint, region } = (_config_API_GraphQL = (_config_API1 = config.API) === null || _config_API1 === void 0 ? void 0 : _config_API1.GraphQL) !== null && _config_API_GraphQL !== void 0 ? _config_API_GraphQL : {};
    // TODO: re-enable when working in all test environments:
    // assertValidationError(!!endpoint, APIValidationErrorCode.NoEndpoint);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$assertValidationError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assertValidationError"])(!(!customEndpoint && customEndpointRegion), __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$validation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APIValidationErrorCode"].NoCustomEndpoint);
    return {
        apiKey,
        customEndpoint,
        customEndpointRegion,
        defaultAuthMode,
        endpoint,
        region
    };
};
;
 //# sourceMappingURL=resolveConfig.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/resolveLibraryOptions.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */ __turbopack_context__.s([
    "resolveLibraryOptions",
    ()=>resolveLibraryOptions
]);
const resolveLibraryOptions = (amplify)=>{
    var _amplify_libraryOptions_API_GraphQL, _amplify_libraryOptions_API, _amplify_libraryOptions, _amplify_libraryOptions_API_GraphQL1, _amplify_libraryOptions_API1, _amplify_libraryOptions1;
    const headers = (_amplify_libraryOptions = amplify.libraryOptions) === null || _amplify_libraryOptions === void 0 ? void 0 : (_amplify_libraryOptions_API = _amplify_libraryOptions.API) === null || _amplify_libraryOptions_API === void 0 ? void 0 : (_amplify_libraryOptions_API_GraphQL = _amplify_libraryOptions_API.GraphQL) === null || _amplify_libraryOptions_API_GraphQL === void 0 ? void 0 : _amplify_libraryOptions_API_GraphQL.headers;
    const withCredentials = (_amplify_libraryOptions1 = amplify.libraryOptions) === null || _amplify_libraryOptions1 === void 0 ? void 0 : (_amplify_libraryOptions_API1 = _amplify_libraryOptions1.API) === null || _amplify_libraryOptions_API1 === void 0 ? void 0 : (_amplify_libraryOptions_API_GraphQL1 = _amplify_libraryOptions_API1.GraphQL) === null || _amplify_libraryOptions_API_GraphQL1 === void 0 ? void 0 : _amplify_libraryOptions_API_GraphQL1.withCredentials;
    return {
        headers,
        withCredentials
    };
};
;
 //# sourceMappingURL=resolveLibraryOptions.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/repackageAuthError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Checks to see if the given response or subscription message contains an
 * Unauthorized error. If it does, it changes the error message to include instructions
 * for the app developer.
 */ __turbopack_context__.s([
    "repackageUnauthorizedError",
    ()=>repackageUnauthorizedError
]);
function repackageUnauthorizedError(content) {
    if (content.errors && Array.isArray(content.errors)) {
        content.errors.forEach((e)=>{
            if (isUnauthorizedError(e)) {
                e.message = 'Unauthorized';
                e.recoverySuggestion = "If you're calling an Amplify-generated API, make sure " + "to set the \"authMode\" in generateClient({ authMode: '...' }) to the backend authorization " + "rule's auth provider ('apiKey', 'userPool', 'iam', 'oidc', 'lambda')";
            }
        });
    }
    return content;
}
function isUnauthorizedError(error) {
    var _error_originalError_name, _error_originalError, _error_message, _error_message1;
    // Error pattern corresponding to appsync calls
    if (error === null || error === void 0 ? void 0 : (_error_originalError = error.originalError) === null || _error_originalError === void 0 ? void 0 : (_error_originalError_name = _error_originalError.name) === null || _error_originalError_name === void 0 ? void 0 : _error_originalError_name.startsWith('UnauthorizedException')) {
        return true;
    }
    // Error pattern corresponding to appsync subscriptions
    if (((_error_message = error.message) === null || _error_message === void 0 ? void 0 : _error_message.startsWith('Connection failed:')) && ((_error_message1 = error.message) === null || _error_message1 === void 0 ? void 0 : _error_message1.includes('Permission denied'))) {
        return true;
    }
    return false;
}
;
 //# sourceMappingURL=repackageAuthError.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/constants.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NO_API_KEY",
    ()=>NO_API_KEY,
    "NO_AUTH_TOKEN_HEADER",
    ()=>NO_AUTH_TOKEN_HEADER,
    "NO_ENDPOINT",
    ()=>NO_ENDPOINT,
    "NO_SIGNED_IN_USER",
    ()=>NO_SIGNED_IN_USER,
    "NO_VALID_AUTH_TOKEN",
    ()=>NO_VALID_AUTH_TOKEN,
    "NO_VALID_CREDENTIALS",
    ()=>NO_VALID_CREDENTIALS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/types/index.mjs [app-client] (ecmascript) <locals>");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const NO_API_KEY = {
    name: 'NoApiKey',
    // ideal: No API key configured.
    message: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GraphQLAuthError"].NO_API_KEY,
    recoverySuggestion: 'The API request was made with `authMode: "apiKey"` but no API Key was passed into `Amplify.configure()`. Review if your API key is passed into the `Amplify.configure()` function.'
};
const NO_VALID_CREDENTIALS = {
    name: 'NoCredentials',
    // ideal: No auth credentials available.
    message: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GraphQLAuthError"].NO_CREDENTIALS,
    recoverySuggestion: 'The API request was made with `authMode: "iam"` but no authentication credentials are available.\n\nIf you intended to make a request using an authenticated role, review if your user is signed in before making the request.\n\nIf you intend to make a request using an unauthenticated role or also known as "guest access", verify if "Auth.Cognito.allowGuestAccess" is set to "true" in the `Amplify.configure()` function.'
};
const NO_VALID_AUTH_TOKEN = {
    name: 'NoValidAuthTokens',
    // ideal: No valid JWT auth token provided to make the API request..
    message: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GraphQLAuthError"].NO_FEDERATED_JWT,
    recoverySuggestion: 'If you intended to make an authenticated API request, review if the current user is signed in.'
};
const NO_SIGNED_IN_USER = {
    name: 'NoSignedUser',
    // ideal: Couldn't retrieve authentication credentials to make the API request.
    message: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GraphQLAuthError"].NO_CURRENT_USER,
    recoverySuggestion: 'Review the underlying exception field for more details. If you intended to make an authenticated API request, review if the current user is signed in.'
};
const NO_AUTH_TOKEN_HEADER = {
    name: 'NoAuthorizationHeader',
    // ideal: Authorization header not specified.
    message: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GraphQLAuthError"].NO_AUTH_TOKEN,
    recoverySuggestion: 'The API request was made with `authMode: "lambda"` but no `authToken` is set. Review if a valid authToken is passed into the request options or in the `Amplify.configure()` function.'
};
const NO_ENDPOINT = {
    name: 'NoEndpoint',
    message: 'No GraphQL endpoint configured in `Amplify.configure()`.',
    recoverySuggestion: 'Review if the GraphQL API endpoint is set in the `Amplify.configure()` function.'
};
;
 //# sourceMappingURL=constants.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/createGraphQLResultWithError.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGraphQLResultWithError",
    ()=>createGraphQLResultWithError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/error/GraphQLError.mjs [app-client] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createGraphQLResultWithError = (error)=>{
    return {
        data: {},
        errors: [
            new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLError"](error.message, null, null, null, null, error)
        ]
    };
};
;
 //# sourceMappingURL=createGraphQLResultWithError.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "isGraphQLResponseWithErrors",
    ()=>isGraphQLResponseWithErrors
]);
function isGraphQLResponseWithErrors(response) {
    if (!response) {
        return false;
    }
    const r = response;
    return Array.isArray(r.errors) && r.errors.length > 0;
}
;
 //# sourceMappingURL=isGraphQLResponseWithErrors.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/graphqlAuth.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "headerBasedAuth",
    ()=>headerBasedAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/GraphQLApiError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/constants.mjs [app-client] (ecmascript)");
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
async function headerBasedAuth(amplify, authMode, apiKey) {
    let additionalHeaders = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    let headers = {};
    switch(authMode){
        case 'apiKey':
            if (!apiKey) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLApiError"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NO_API_KEY"]);
            }
            headers = {
                'X-Api-Key': apiKey
            };
            break;
        case 'iam':
            {
                const session = await amplify.Auth.fetchAuthSession();
                if (session.credentials === undefined) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLApiError"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NO_VALID_CREDENTIALS"]);
                }
                break;
            }
        case 'oidc':
        case 'userPool':
            {
                let token;
                try {
                    var _tokens;
                    token = (_tokens = (await amplify.Auth.fetchAuthSession()).tokens) === null || _tokens === void 0 ? void 0 : _tokens.accessToken.toString();
                } catch (e) {
                    // fetchAuthSession failed
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLApiError"]({
                        ...__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NO_SIGNED_IN_USER"],
                        underlyingError: e
                    });
                }
                // `fetchAuthSession()` succeeded but didn't return `tokens`.
                // This may happen when unauthenticated access is enabled and there is
                // no user signed in.
                if (!token) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLApiError"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NO_VALID_AUTH_TOKEN"]);
                }
                headers = {
                    Authorization: token
                };
                break;
            }
        case 'lambda':
            if (typeof additionalHeaders === 'object' && !additionalHeaders.Authorization) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLApiError"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NO_AUTH_TOKEN_HEADER"]);
            }
            headers = {
                Authorization: additionalHeaders.Authorization
            };
            break;
    }
    return headers;
}
;
 //# sourceMappingURL=graphqlAuth.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/InternalGraphQLAPI.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InternalGraphQLAPI",
    ()=>InternalGraphQLAPI,
    "InternalGraphQLAPIClass",
    ()=>InternalGraphQLAPIClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/parser.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/printer.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$operators$2f$catchError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/rxjs/dist/esm5/internal/operators/catchError.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/utils/amplifyUrl/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Platform/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$rest$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-rest/dist/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$rest$2f$dist$2f$esm$2f$errors$2f$CanceledError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-rest/dist/esm/errors/CanceledError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$rest$2f$dist$2f$esm$2f$internals$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-rest/dist/esm/internals/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$rest$2f$dist$2f$esm$2f$apis$2f$common$2f$internalPost$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-rest/dist/esm/apis/common/internalPost.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSAppSyncRealTimeProvider$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/Providers/AWSAppSyncRealTimeProvider/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$resolveConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/resolveConfig.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$resolveLibraryOptions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/resolveLibraryOptions.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$repackageAuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/repackageAuthError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/constants.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/GraphQLApiError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$createGraphQLResultWithError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/utils/errors/createGraphQLResultWithError.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isGraphQLResponseWithErrors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/utils/runtimeTypeGuards/isGraphQLResponseWithErrors.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$graphqlAuth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/graphqlAuth.mjs [app-client] (ecmascript)");
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
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const USER_AGENT_HEADER = 'x-amz-user-agent';
const isAmplifyInstance = (amplify)=>{
    return typeof amplify !== 'function';
};
/**
 * Export Cloud Logic APIs
 */ class InternalGraphQLAPIClass {
    getModuleName() {
        return 'InternalGraphQLAPI';
    }
    /**
     * to get the operation type
     * @param operation
     */ getGraphqlOperationType(operation) {
        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"])(operation);
        const definitions = doc.definitions;
        const [{ operation: operationType }] = definitions;
        return operationType;
    }
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
     * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
     */ graphql(amplify, param, additionalHeaders, customUserAgentDetails) {
        let { query: paramQuery, variables = {}, authMode, authToken, endpoint, apiKey } = param;
        const query = typeof paramQuery === 'string' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"])(paramQuery) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$parser$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parse"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["print"])(paramQuery));
        const [operationDef = {}] = query.definitions.filter((def)=>def.kind === 'OperationDefinition');
        const { operation: operationType } = operationDef;
        const headers = additionalHeaders || {};
        switch(operationType){
            case 'query':
            case 'mutation':
                {
                    const abortController = new AbortController();
                    let responsePromise;
                    if (isAmplifyInstance(amplify)) {
                        responsePromise = this._graphql(amplify, {
                            query,
                            variables,
                            authMode,
                            apiKey,
                            endpoint
                        }, headers, abortController, customUserAgentDetails, authToken);
                    } else {
                        // NOTE: this wrapper function must be await-able so the Amplify server context manager can
                        // destroy the context only after it completes
                        const wrapper = async (amplifyInstance)=>{
                            const result = await this._graphql(amplifyInstance, {
                                query,
                                variables,
                                authMode,
                                apiKey,
                                endpoint
                            }, headers, abortController, customUserAgentDetails, authToken);
                            return result;
                        };
                        responsePromise = amplify(wrapper);
                    }
                    this._api.updateRequestToBeCancellable(responsePromise, abortController);
                    return responsePromise;
                }
            case 'subscription':
                return this._graphqlSubscribe(amplify, {
                    query,
                    variables,
                    authMode,
                    apiKey,
                    endpoint
                }, headers, customUserAgentDetails, authToken);
            default:
                throw new Error("invalid operation type: ".concat(operationType));
        }
    }
    async _graphql(amplify, param) {
        let { query, variables, authMode: authModeOverride, endpoint: endpointOverride, apiKey: apiKeyOverride } = param, additionalHeaders = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, abortController = arguments.length > 3 ? arguments[3] : void 0, customUserAgentDetails = arguments.length > 4 ? arguments[4] : void 0, authToken = arguments.length > 5 ? arguments[5] : void 0;
        const { apiKey, region, endpoint: appSyncGraphqlEndpoint, customEndpoint, customEndpointRegion, defaultAuthMode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$resolveConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveConfig"])(amplify);
        const initialAuthMode = authModeOverride || defaultAuthMode || 'iam';
        // identityPool is an alias for iam. TODO: remove 'iam' in v7
        const authMode = initialAuthMode === 'identityPool' ? 'iam' : initialAuthMode;
        /**
         * Retrieve library options from Amplify configuration.
         * `customHeaders` here are from the Amplify configuration options,
         * and are for non-AppSync endpoints only. These are *not* the same as
         * `additionalHeaders`, which are custom headers that are either 1)
         * included when configuring the API client or 2) passed along with
         * individual requests.
         */ const { headers: customHeaders, withCredentials } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$resolveLibraryOptions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLibraryOptions"])(amplify);
        /**
         * Client or request-specific custom headers that may or may not be
         * returned by a function:
         */ let additionalCustomHeaders;
        if (typeof additionalHeaders === 'function') {
            const requestOptions = {
                method: 'POST',
                url: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrl"](endpointOverride || customEndpoint || appSyncGraphqlEndpoint || '').toString(),
                queryString: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["print"])(query)
            };
            additionalCustomHeaders = await additionalHeaders(requestOptions);
        } else {
            additionalCustomHeaders = additionalHeaders;
        }
        // if an authorization header is set, have the explicit authToken take precedence
        if (authToken) {
            additionalCustomHeaders = {
                ...additionalCustomHeaders,
                Authorization: authToken
            };
        }
        const authHeaders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$graphqlAuth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["headerBasedAuth"])(amplify, authMode, apiKeyOverride !== null && apiKeyOverride !== void 0 ? apiKeyOverride : apiKey, additionalCustomHeaders);
        const headers = {
            ...!customEndpoint && authHeaders,
            /**
             * Custom endpoint headers.
             * If there is both a custom endpoint and custom region present, we get the headers.
             * If there is a custom endpoint but no region, we return an empty object.
             * If neither are present, we return an empty object.
             */ ...customEndpoint && (customEndpointRegion ? authHeaders : {}) || {},
            // Custom headers included in Amplify configuration options:
            ...customHeaders && await customHeaders({
                query: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["print"])(query),
                variables
            }),
            // Custom headers from individual requests or API client configuration:
            ...additionalCustomHeaders,
            // User agent headers:
            ...!customEndpoint && {
                [USER_AGENT_HEADER]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAmplifyUserAgent"])(customUserAgentDetails)
            }
        };
        const body = {
            query: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["print"])(query),
            variables: variables || null
        };
        let signingServiceInfo;
        /**
         * We do not send the signing service info to the REST API under the
         * following conditions (i.e. it will not sign the request):
         *   - there is a custom endpoint but no region
         *   - the auth mode is `none`, or `apiKey`
         *   - the auth mode is a type other than the types listed below
         */ if (customEndpoint && !customEndpointRegion || authMode !== 'oidc' && authMode !== 'userPool' && authMode !== 'iam' && authMode !== 'lambda') {
            signingServiceInfo = undefined;
        } else {
            signingServiceInfo = {
                service: !customEndpointRegion ? 'appsync' : 'execute-api',
                region: !customEndpointRegion ? region : customEndpointRegion
            };
        }
        const endpoint = endpointOverride || customEndpoint || appSyncGraphqlEndpoint;
        if (!endpoint) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$createGraphQLResultWithError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGraphQLResultWithError"])(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$GraphQLApiError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLApiError"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$constants$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NO_ENDPOINT"]));
        }
        let response;
        try {
            // 	// // See the inline doc of the REST `post()` API for possible errors to be thrown.
            // 	// // As these errors are catastrophic they should be caught and handled by GraphQL
            // 	// // API consumers.
            const { body: responseBody } = await this._api.post(amplify, {
                url: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$utils$2f$amplifyUrl$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmplifyUrl"](endpoint),
                options: {
                    headers,
                    body,
                    signingServiceInfo,
                    withCredentials
                },
                abortController
            });
            response = await responseBody.json();
        } catch (error) {
            if (this.isCancelError(error)) {
                throw error;
            }
            response = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$createGraphQLResultWithError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createGraphQLResultWithError"])(error);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isGraphQLResponseWithErrors$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isGraphQLResponseWithErrors"])(response)) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$repackageAuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["repackageUnauthorizedError"])(response);
        }
        return response;
    }
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param {any} error - Any error
     * @return {boolean} - A boolean indicating if the error was from an api request cancellation
     */ isCancelError(error) {
        return this._api.isCancelErrorREST(error);
    }
    /**
     * Cancels an inflight request. Only applicable for graphql queries and mutations
     * @param {any} request - request to cancel
     * @returns - A boolean indicating if the request was cancelled
     */ cancel(request, message) {
        return this._api.cancelREST(request, message);
    }
    _graphqlSubscribe(amplify, param) {
        let { query, variables, authMode: authModeOverride, apiKey: apiKeyOverride, endpoint } = param, additionalHeaders = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, customUserAgentDetails = arguments.length > 3 ? arguments[3] : void 0, authToken = arguments.length > 4 ? arguments[4] : void 0;
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$resolveConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveConfig"])(amplify);
        const initialAuthMode = authModeOverride || (config === null || config === void 0 ? void 0 : config.defaultAuthMode) || 'iam';
        // identityPool is an alias for iam. TODO: remove 'iam' in v7
        const authMode = initialAuthMode === 'identityPool' ? 'iam' : initialAuthMode;
        /**
         * Retrieve library options from Amplify configuration.
         * `libraryConfigHeaders` are from the Amplify configuration options,
         * and will not be overwritten by other custom headers. These are *not*
         * the same as `additionalHeaders`, which are custom headers that are
         * either 1)included when configuring the API client or 2) passed along
         * with individual requests.
         */ const { headers: libraryConfigHeaders } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$resolveLibraryOptions$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveLibraryOptions"])(amplify);
        const appSyncGraphqlEndpoint = endpoint !== null && endpoint !== void 0 ? endpoint : config === null || config === void 0 ? void 0 : config.endpoint;
        // TODO: This could probably be an exception. But, lots of tests rely on
        // attempting to connect to nowhere. So, I'm treating as the opposite of
        // a Chesterton's fence for now. (A fence I shouldn't build, because I don't
        // know why somethings depends on its absence!)
        const memoKey = appSyncGraphqlEndpoint !== null && appSyncGraphqlEndpoint !== void 0 ? appSyncGraphqlEndpoint : 'none';
        var _this_appSyncRealTime_get;
        const realtimeProvider = (_this_appSyncRealTime_get = this.appSyncRealTime.get(memoKey)) !== null && _this_appSyncRealTime_get !== void 0 ? _this_appSyncRealTime_get : new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$Providers$2f$AWSAppSyncRealTimeProvider$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AWSAppSyncRealTimeProvider"]();
        this.appSyncRealTime.set(memoKey, realtimeProvider);
        return realtimeProvider.subscribe({
            query: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printer$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["print"])(query),
            variables,
            appSyncGraphqlEndpoint,
            region: config === null || config === void 0 ? void 0 : config.region,
            authenticationType: authMode,
            apiKey: apiKeyOverride !== null && apiKeyOverride !== void 0 ? apiKeyOverride : config === null || config === void 0 ? void 0 : config.apiKey,
            additionalHeaders,
            authToken,
            libraryConfigHeaders
        }, customUserAgentDetails).pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$esm5$2f$internal$2f$operators$2f$catchError$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["catchError"])((e)=>{
            if (e.errors) {
                throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$utils$2f$errors$2f$repackageAuthError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["repackageUnauthorizedError"])(e);
            }
            throw e;
        }));
    }
    constructor(){
        /**
         * @private
         */ this.appSyncRealTime = new Map();
        this._api = {
            post: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$rest$2f$dist$2f$esm$2f$apis$2f$common$2f$internalPost$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["post"],
            cancelREST: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$rest$2f$dist$2f$esm$2f$apis$2f$common$2f$internalPost$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancel"],
            isCancelErrorREST: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$rest$2f$dist$2f$esm$2f$errors$2f$CanceledError$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCancelError"],
            updateRequestToBeCancellable: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$rest$2f$dist$2f$esm$2f$apis$2f$common$2f$internalPost$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateRequestToBeCancellable"]
        };
    }
}
const InternalGraphQLAPI = new InternalGraphQLAPIClass();
;
 //# sourceMappingURL=InternalGraphQLAPI.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/GraphQLAPI.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GraphQLAPI",
    ()=>GraphQLAPI,
    "GraphQLAPIClass",
    ()=>GraphQLAPIClass,
    "graphqlOperation",
    ()=>graphqlOperation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Platform/types.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$InternalGraphQLAPI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/InternalGraphQLAPI.mjs [app-client] (ecmascript)");
;
;
;
function isGraphQLOptionsWithOverride(options) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTERNAL_USER_AGENT_OVERRIDE"] in options;
}
const graphqlOperation = function(query) {
    let variables = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, authToken = arguments.length > 2 ? arguments[2] : void 0;
    return {
        query,
        variables,
        authToken
    };
};
/**
 * Export Cloud Logic APIs
 */ class GraphQLAPIClass extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$InternalGraphQLAPI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InternalGraphQLAPIClass"] {
    getModuleName() {
        return 'GraphQLAPI';
    }
    /**
     * Executes a GraphQL operation
     *
     * @param options - GraphQL Options
     * @param [additionalHeaders] - headers to merge in after any `libraryConfigHeaders` set in the config
     * @returns An Observable if the query is a subscription query, else a promise of the graphql result.
     */ graphql(amplify, options, additionalHeaders) {
        const userAgentDetails = {
            category: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Category"].API,
            action: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Platform$2f$types$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiAction"].GraphQl
        };
        if (isGraphQLOptionsWithOverride(options)) {
            const { [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INTERNAL_USER_AGENT_OVERRIDE"]]: internalUserAgentOverride, ...cleanOptions } = options;
            return super.graphql(amplify, cleanOptions, additionalHeaders, {
                ...userAgentDetails,
                ...internalUserAgentOverride
            });
        }
        return super.graphql(amplify, options, additionalHeaders, {
            ...userAgentDetails
        });
    }
    /**
     * Checks to see if an error thrown is from an api request cancellation
     * @param error - Any error
     * @returns A boolean indicating if the error was from an api request cancellation
     */ isCancelError(error) {
        return super.isCancelError(error);
    }
    /**
     * Cancels an inflight request. Only applicable for graphql queries and mutations
     * @param {any} request - request to cancel
     * @returns A boolean indicating if the request was cancelled
     */ cancel(request, message) {
        return super.cancel(request, message);
    }
}
const GraphQLAPI = new GraphQLAPIClass();
;
 //# sourceMappingURL=GraphQLAPI.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/v6.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cancel",
    ()=>cancel,
    "graphql",
    ()=>graphql,
    "isCancelError",
    ()=>isCancelError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$GraphQLAPI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/GraphQLAPI.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/types/index.mjs [app-client] (ecmascript) <locals>");
;
;
/**
 * Invokes graphql operations against a graphql service, providing correct input and
 * output types if Amplify-generated graphql from a recent version of the CLI/codegen
 * are used *or* correct typing is provided via the type argument.
 *
 * Amplify-generated "branded" graphql queries will look similar to this:
 *
 * ```ts
 *                               //
 *                               // |-- branding
 *                               // v
 * export const getModel = `...` as GeneratedQuery<
 * 	GetModelQueryVariables,
 * 	GetModelQuery
 * >;
 * ```
 *
 * If this branding is not in your generated graphql, update to a newer version of
 * CLI/codegen and regenerate your graphql using `amplify codegen`.
 *
 * ## Using Amplify-generated graphql
 *
 * ```ts
 * import * as queries from './graphql/queries';
 *
 * //
 * //    |-- correctly typed graphql response containing a Widget
 * //    v
 * const queryResult = await graphql({
 * 	query: queries.getWidget,
 * 	variables: {
 * 		id: "abc", // <-- type hinted/enforced
 * 	},
 * });
 *
 * //
 * //    |-- a correctly typed Widget
 * //    v
 * const fetchedWidget = queryResult.data?.getWidget!;
 * ```
 *
 * ## Custom input + result types
 *
 * To provide input types (`variables`) and result types:
 *
 * ```ts
 * type GetById_NameOnly = {
 * 	variables: {
 * 		id: string
 * 	},
 * 	result: Promise<{
 * 		data: { getWidget: { name: string } }
 * 	}>
 * }
 *
 * //
 * //    |-- type is GetById_NameOnly["result"]
 * //    v
 * const result = graphql<GetById_NameOnly>({
 * 	query: "...",
 * 	variables: { id: "abc" }  // <-- type of GetById_NameOnly["variables"]
 * });
 * ```
 *
 * ## Custom result type only
 *
 * To specify result types only, use a type that is *not* in the `{variables, result}` shape:
 *
 * ```ts
 * type MyResultType = Promise<{
 * 	data: {
 * 		getWidget: { name: string }
 * 	}
 * }>
 *
 * //
 * //    |-- type is MyResultType
 * //    v
 * const result = graphql<MyResultType>({query: "..."});
 * ```
 *
 * @param options
 * @param additionalHeaders
 */ function graphql(options, additionalHeaders) {
    // inject client-level auth
    const internals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getInternals"])(this);
    /**
     * The custom `endpoint` specific to the client
     */ const clientEndpoint = internals.endpoint;
    /**
     * The `authMode` specific to the client.
     */ const clientAuthMode = internals.authMode;
    /**
     * The `apiKey` specific to the client.
     */ const clientApiKey = internals.apiKey;
    /**
     * The most specific `authMode` wins. Setting an `endpoint` value without also
     * setting an `authMode` value is invalid. This helps to prevent customers apps
     * from unexpectedly sending auth details to endpoints the auth details do not
     * belong to.
     *
     * This is especially pronounced for `apiKey`. When both an `endpoint` *and*
     * `authMode: 'apiKey'` are provided, an explicit `apiKey` override is required
     * to prevent inadvertent sending of an API's `apiKey` to an endpoint is does
     * not belong to.
     */ options.authMode = options.authMode || clientAuthMode;
    var _options_apiKey;
    options.apiKey = (_options_apiKey = options.apiKey) !== null && _options_apiKey !== void 0 ? _options_apiKey : clientApiKey;
    options.authToken = options.authToken || internals.authToken;
    if (clientEndpoint && options.authMode === 'apiKey' && !options.apiKey) {
        throw new Error("graphql() requires an explicit `apiKey` for a custom `endpoint` when `authMode = 'apiKey'`.");
    }
    const headers = additionalHeaders || internals.headers;
    /**
     * The correctness of these typings depends on correct string branding or overrides.
     * Neither of these can actually be validated at runtime. Hence, we don't perform
     * any validation or type-guarding here.
     */ const result = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$GraphQLAPI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLAPI"].graphql(// TODO: move V6Client back into this package?
    internals.amplify, {
        ...options,
        endpoint: clientEndpoint
    }, headers);
    return result;
}
/**
 * Cancels an inflight request. Only applicable for graphql queries and mutations
 * @param {any} request - request to cancel
 * @returns - A boolean indicating if the request was cancelled
 */ function cancel(promise, message) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$GraphQLAPI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLAPI"].cancel(promise, message);
}
/**
 * Checks to see if an error thrown is from an api request cancellation
 * @param {any} error - Any error
 * @returns - A boolean indicating if the error was from an api request cancellation
 */ function isCancelError(error) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$GraphQLAPI$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GraphQLAPI"].isCancelError(error);
}
;
 //# sourceMappingURL=v6.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/generateClient.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateClient",
    ()=>generateClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/core/dist/esm/Hub/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$addSchemaToClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClient.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/types/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isApiGraphQLProviderConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/utils/runtimeTypeGuards/isApiGraphQLProviderConfig.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isConfigureEventWithResourceConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/utils/runtimeTypeGuards/isConfigureEventWithResourceConfig.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$v6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api-graphql/dist/esm/internals/v6.mjs [app-client] (ecmascript)");
;
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @private
 *
 * Creates a client that can be used to make GraphQL requests, using a provided `AmplifyClassV6`
 * compatible context object for config and auth fetching.
 *
 * @param params
 * @returns
 */ function generateClient(params) {
    var _params_amplify_getConfig_API;
    const client = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__amplify"]]: params.amplify,
        [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__authMode"]]: params.authMode,
        [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__authToken"]]: params.authToken,
        [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__apiKey"]]: 'apiKey' in params ? params.apiKey : undefined,
        [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__endpoint"]]: 'endpoint' in params ? params.endpoint : undefined,
        [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__headers"]]: params.headers,
        graphql: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$v6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["graphql"],
        cancel: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$v6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cancel"],
        isCancelError: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$v6$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isCancelError"],
        models: emptyProperty,
        enums: emptyProperty,
        queries: emptyProperty,
        mutations: emptyProperty,
        subscriptions: emptyProperty
    };
    const apiGraphqlConfig = (_params_amplify_getConfig_API = params.amplify.getConfig().API) === null || _params_amplify_getConfig_API === void 0 ? void 0 : _params_amplify_getConfig_API.GraphQL;
    if (client[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__endpoint"]]) {
        if (!client[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__authMode"]]) {
            throw new Error('generateClient() requires an explicit `authMode` when `endpoint` is provided.');
        }
        if (client[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__authMode"]] === 'apiKey' && !client[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__apiKey"]]) {
            throw new Error("generateClient() requires an explicit `apiKey` when `endpoint` is provided and `authMode = 'apiKey'`.");
        }
    }
    if (!client[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["__endpoint"]]) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isApiGraphQLProviderConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isApiGraphQLConfig"])(apiGraphqlConfig)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$addSchemaToClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addSchemaToClient"])(client, apiGraphqlConfig, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getInternals"]);
        } else {
            // This happens when the `Amplify.configure()` call gets evaluated after the `generateClient()` call.
            //
            // Cause: when the `generateClient()` and the `Amplify.configure()` calls are located in
            // different source files, script bundlers may randomly arrange their orders in the production
            // bundle.
            //
            // With the current implementation, the `client.models` instance created by `generateClient()`
            // will be rebuilt on every `Amplify.configure()` call that's provided with a valid GraphQL
            // provider configuration.
            //
            // TODO: revisit, and reverify this approach when enabling multiple clients for multi-endpoints
            // configuration.
            generateModelsPropertyOnAmplifyConfigure(client);
        }
    }
    return client;
}
const generateModelsPropertyOnAmplifyConfigure = (clientRef)=>{
    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$core$2f$dist$2f$esm$2f$Hub$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hub"].listen('core', (coreEvent)=>{
        var _coreEvent_payload_data_API;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isConfigureEventWithResourceConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isConfigureEventWithResourceConfig"])(coreEvent.payload)) {
            return;
        }
        const apiGraphQLConfig = (_coreEvent_payload_data_API = coreEvent.payload.data.API) === null || _coreEvent_payload_data_API === void 0 ? void 0 : _coreEvent_payload_data_API.GraphQL;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isApiGraphQLProviderConfig$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isApiGraphQLConfig"])(apiGraphQLConfig)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$addSchemaToClient$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addSchemaToClient"])(clientRef, apiGraphQLConfig, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2d$graphql$2f$dist$2f$esm$2f$types$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getInternals"]);
        }
    });
};
const emptyProperty = new Proxy({}, {
    get () {
        throw new Error('Client could not be generated. This is likely due to `Amplify.configure()` not being called prior to `generateClient()` or because the configuration passed to `Amplify.configure()` is missing GraphQL provider configuration.');
    }
});
;
 //# sourceMappingURL=generateClient.mjs.map
}),
]);

//# sourceMappingURL=6361e_%40aws-amplify_api-graphql_dist_esm_13662729._.js.map