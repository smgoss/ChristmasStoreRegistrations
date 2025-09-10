module.exports = [
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpRequest",
    ()=>HttpRequest
]);
class HttpRequest {
    constructor(options){
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
        this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
        this.username = options.username;
        this.password = options.password;
        this.fragment = options.fragment;
    }
    static clone(request) {
        const cloned = new HttpRequest({
            ...request,
            headers: {
                ...request.headers
            }
        });
        if (cloned.query) {
            cloned.query = cloneQuery(cloned.query);
        }
        return cloned;
    }
    static isInstance(request) {
        if (!request) {
            return false;
        }
        const req = request;
        return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
    }
    clone() {
        return HttpRequest.clone(this);
    }
}
function cloneQuery(query) {
    return Object.keys(query).reduce((carry, paramName)=>{
        const param = query[paramName];
        return {
            ...carry,
            [paramName]: Array.isArray(param) ? [
                ...param
            ] : param
        };
    }, {});
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-host-header/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHostHeaderPlugin",
    ()=>getHostHeaderPlugin,
    "hostHeaderMiddleware",
    ()=>hostHeaderMiddleware,
    "hostHeaderMiddlewareOptions",
    ()=>hostHeaderMiddlewareOptions,
    "resolveHostHeaderConfig",
    ()=>resolveHostHeaderConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
;
function resolveHostHeaderConfig(input) {
    return input;
}
const hostHeaderMiddleware = (options)=>(next)=>async (args)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].isInstance(args.request)) return next(args);
            const { request } = args;
            const { handlerProtocol = "" } = options.requestHandler.metadata || {};
            if (handlerProtocol.indexOf("h2") >= 0 && !request.headers[":authority"]) {
                delete request.headers["host"];
                request.headers[":authority"] = request.hostname + (request.port ? ":" + request.port : "");
            } else if (!request.headers["host"]) {
                let host = request.hostname;
                if (request.port != null) host += `:${request.port}`;
                request.headers["host"] = host;
            }
            return next(args);
        };
const hostHeaderMiddlewareOptions = {
    name: "hostHeaderMiddleware",
    step: "build",
    priority: "low",
    tags: [
        "HOST"
    ],
    override: true
};
const getHostHeaderPlugin = (options)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(hostHeaderMiddleware(options), hostHeaderMiddlewareOptions);
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getLoggerPlugin",
    ()=>getLoggerPlugin,
    "loggerMiddleware",
    ()=>loggerMiddleware,
    "loggerMiddlewareOptions",
    ()=>loggerMiddlewareOptions
]);
const loggerMiddleware = ()=>(next, context)=>async (args)=>{
            try {
                const response = await next(args);
                const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
                const { overrideInputFilterSensitiveLog, overrideOutputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
                const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
                const outputFilterSensitiveLog = overrideOutputFilterSensitiveLog ?? context.outputFilterSensitiveLog;
                const { $metadata, ...outputWithoutMetadata } = response.output;
                logger?.info?.({
                    clientName,
                    commandName,
                    input: inputFilterSensitiveLog(args.input),
                    output: outputFilterSensitiveLog(outputWithoutMetadata),
                    metadata: $metadata
                });
                return response;
            } catch (error) {
                const { clientName, commandName, logger, dynamoDbDocumentClientOptions = {} } = context;
                const { overrideInputFilterSensitiveLog } = dynamoDbDocumentClientOptions;
                const inputFilterSensitiveLog = overrideInputFilterSensitiveLog ?? context.inputFilterSensitiveLog;
                logger?.error?.({
                    clientName,
                    commandName,
                    input: inputFilterSensitiveLog(args.input),
                    error,
                    metadata: error.$metadata
                });
                throw error;
            }
        };
const loggerMiddlewareOptions = {
    name: "loggerMiddleware",
    tags: [
        "LOGGER"
    ],
    step: "initialize",
    override: true
};
const getLoggerPlugin = (options)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(loggerMiddleware(), loggerMiddlewareOptions);
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-logger/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js [app-route] (ecmascript)");
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addRecursionDetectionMiddlewareOptions",
    ()=>addRecursionDetectionMiddlewareOptions,
    "getRecursionDetectionPlugin",
    ()=>getRecursionDetectionPlugin,
    "recursionDetectionMiddleware",
    ()=>recursionDetectionMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
;
const TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
const ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
const ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
const recursionDetectionMiddleware = (options)=>(next)=>async (args)=>{
            const { request } = args;
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].isInstance(request) || options.runtime !== "node") {
                return next(args);
            }
            const traceIdHeader = Object.keys(request.headers ?? {}).find((h)=>h.toLowerCase() === TRACE_ID_HEADER_NAME.toLowerCase()) ?? TRACE_ID_HEADER_NAME;
            if (request.headers.hasOwnProperty(traceIdHeader)) {
                return next(args);
            }
            const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
            const traceId = process.env[ENV_TRACE_ID];
            const nonEmptyString = (str)=>typeof str === "string" && str.length > 0;
            if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
                request.headers[TRACE_ID_HEADER_NAME] = traceId;
            }
            return next({
                ...args,
                request
            });
        };
const addRecursionDetectionMiddlewareOptions = {
    step: "build",
    tags: [
        "RECURSION_DETECTION"
    ],
    name: "recursionDetectionMiddleware",
    override: true,
    priority: "low"
};
const getRecursionDetectionPlugin = (options)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(recursionDetectionMiddleware(options), addRecursionDetectionMiddlewareOptions);
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/normalizeProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeProvider",
    ()=>normalizeProvider
]);
const normalizeProvider = (input)=>{
    if (typeof input === "function") return input;
    const promisified = Promise.resolve(input);
    return ()=>promisified;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_UA_APP_ID",
    ()=>DEFAULT_UA_APP_ID,
    "resolveUserAgentConfig",
    ()=>resolveUserAgentConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/normalizeProvider.js [app-route] (ecmascript)");
;
const DEFAULT_UA_APP_ID = undefined;
function isValidUserAgentAppId(appId) {
    if (appId === undefined) {
        return true;
    }
    return typeof appId === "string" && appId.length <= 50;
}
function resolveUserAgentConfig(input) {
    const normalizedAppIdProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(input.userAgentAppId ?? DEFAULT_UA_APP_ID);
    const { customUserAgent } = input;
    return Object.assign(input, {
        customUserAgent: typeof customUserAgent === "string" ? [
            [
                customUserAgent
            ]
        ] : customUserAgent,
        userAgentAppId: async ()=>{
            const appId = await normalizedAppIdProvider();
            if (!isValidUserAgentAppId(appId)) {
                const logger = input.logger?.constructor?.name === "NoOpLogger" || !input.logger ? console : input.logger;
                if (typeof appId !== "string") {
                    logger?.warn("userAgentAppId must be a string or undefined.");
                } else if (appId.length > 50) {
                    logger?.warn("The provided userAgentAppId exceeds the maximum length of 50 characters.");
                }
            }
            return appId;
        }
    });
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "customEndpointFunctions",
    ()=>customEndpointFunctions
]);
const customEndpointFunctions = {};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isValidHostLabel",
    ()=>isValidHostLabel
]);
const VALID_HOST_LABEL_REGEX = new RegExp(`^(?!.*-$)(?!-)[a-zA-Z0-9-]{1,63}$`);
const isValidHostLabel = (value, allowSubDomains = false)=>{
    if (!allowSubDomains) {
        return VALID_HOST_LABEL_REGEX.test(value);
    }
    const labels = value.split(".");
    for (const label of labels){
        if (!isValidHostLabel(label)) {
            return false;
        }
    }
    return true;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isIpAddress",
    ()=>isIpAddress
]);
const IP_V4_REGEX = new RegExp(`^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$`);
const isIpAddress = (value)=>IP_V4_REGEX.test(value) || value.startsWith("[") && value.endsWith("]");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isVirtualHostableS3Bucket",
    ()=>isVirtualHostableS3Bucket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isValidHostLabel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isIpAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isIpAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js [app-route] (ecmascript)");
;
;
const isVirtualHostableS3Bucket = (value, allowSubDomains = false)=>{
    if (allowSubDomains) {
        for (const label of value.split(".")){
            if (!isVirtualHostableS3Bucket(label)) {
                return false;
            }
        }
        return true;
    }
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isValidHostLabel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidHostLabel"])(value)) {
        return false;
    }
    if (value.length < 3 || value.length > 63) {
        return false;
    }
    if (value !== value.toLowerCase()) {
        return false;
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isIpAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isIpAddress"])(value)) {
        return false;
    }
    return true;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseArn",
    ()=>parseArn
]);
const ARN_DELIMITER = ":";
const RESOURCE_DELIMITER = "/";
const parseArn = (value)=>{
    const segments = value.split(ARN_DELIMITER);
    if (segments.length < 6) return null;
    const [arn, partition, service, region, accountId, ...resourcePath] = segments;
    if (arn !== "arn" || partition === "" || service === "" || resourcePath.join(ARN_DELIMITER) === "") return null;
    const resourceId = resourcePath.map((resource)=>resource.split(RESOURCE_DELIMITER)).flat();
    return {
        partition,
        service,
        region,
        accountId,
        resourceId
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"partitions\":[{\"id\":\"aws\",\"outputs\":{\"dnsSuffix\":\"amazonaws.com\",\"dualStackDnsSuffix\":\"api.aws\",\"implicitGlobalRegion\":\"us-east-1\",\"name\":\"aws\",\"supportsDualStack\":true,\"supportsFIPS\":true},\"regionRegex\":\"^(us|eu|ap|sa|ca|me|af|il|mx)\\\\-\\\\w+\\\\-\\\\d+$\",\"regions\":{\"af-south-1\":{\"description\":\"Africa (Cape Town)\"},\"ap-east-1\":{\"description\":\"Asia Pacific (Hong Kong)\"},\"ap-east-2\":{\"description\":\"Asia Pacific (Taipei)\"},\"ap-northeast-1\":{\"description\":\"Asia Pacific (Tokyo)\"},\"ap-northeast-2\":{\"description\":\"Asia Pacific (Seoul)\"},\"ap-northeast-3\":{\"description\":\"Asia Pacific (Osaka)\"},\"ap-south-1\":{\"description\":\"Asia Pacific (Mumbai)\"},\"ap-south-2\":{\"description\":\"Asia Pacific (Hyderabad)\"},\"ap-southeast-1\":{\"description\":\"Asia Pacific (Singapore)\"},\"ap-southeast-2\":{\"description\":\"Asia Pacific (Sydney)\"},\"ap-southeast-3\":{\"description\":\"Asia Pacific (Jakarta)\"},\"ap-southeast-4\":{\"description\":\"Asia Pacific (Melbourne)\"},\"ap-southeast-5\":{\"description\":\"Asia Pacific (Malaysia)\"},\"ap-southeast-6\":{\"description\":\"Asia Pacific (New Zealand)\"},\"ap-southeast-7\":{\"description\":\"Asia Pacific (Thailand)\"},\"aws-global\":{\"description\":\"aws global region\"},\"ca-central-1\":{\"description\":\"Canada (Central)\"},\"ca-west-1\":{\"description\":\"Canada West (Calgary)\"},\"eu-central-1\":{\"description\":\"Europe (Frankfurt)\"},\"eu-central-2\":{\"description\":\"Europe (Zurich)\"},\"eu-north-1\":{\"description\":\"Europe (Stockholm)\"},\"eu-south-1\":{\"description\":\"Europe (Milan)\"},\"eu-south-2\":{\"description\":\"Europe (Spain)\"},\"eu-west-1\":{\"description\":\"Europe (Ireland)\"},\"eu-west-2\":{\"description\":\"Europe (London)\"},\"eu-west-3\":{\"description\":\"Europe (Paris)\"},\"il-central-1\":{\"description\":\"Israel (Tel Aviv)\"},\"me-central-1\":{\"description\":\"Middle East (UAE)\"},\"me-south-1\":{\"description\":\"Middle East (Bahrain)\"},\"mx-central-1\":{\"description\":\"Mexico (Central)\"},\"sa-east-1\":{\"description\":\"South America (Sao Paulo)\"},\"us-east-1\":{\"description\":\"US East (N. Virginia)\"},\"us-east-2\":{\"description\":\"US East (Ohio)\"},\"us-west-1\":{\"description\":\"US West (N. California)\"},\"us-west-2\":{\"description\":\"US West (Oregon)\"}}},{\"id\":\"aws-cn\",\"outputs\":{\"dnsSuffix\":\"amazonaws.com.cn\",\"dualStackDnsSuffix\":\"api.amazonwebservices.com.cn\",\"implicitGlobalRegion\":\"cn-northwest-1\",\"name\":\"aws-cn\",\"supportsDualStack\":true,\"supportsFIPS\":true},\"regionRegex\":\"^cn\\\\-\\\\w+\\\\-\\\\d+$\",\"regions\":{\"aws-cn-global\":{\"description\":\"aws-cn global region\"},\"cn-north-1\":{\"description\":\"China (Beijing)\"},\"cn-northwest-1\":{\"description\":\"China (Ningxia)\"}}},{\"id\":\"aws-eusc\",\"outputs\":{\"dnsSuffix\":\"amazonaws.eu\",\"dualStackDnsSuffix\":\"api.amazonwebservices.eu\",\"implicitGlobalRegion\":\"eusc-de-east-1\",\"name\":\"aws-eusc\",\"supportsDualStack\":true,\"supportsFIPS\":true},\"regionRegex\":\"^eusc\\\\-(de)\\\\-\\\\w+\\\\-\\\\d+$\",\"regions\":{\"eusc-de-east-1\":{\"description\":\"EU (Germany)\"}}},{\"id\":\"aws-iso\",\"outputs\":{\"dnsSuffix\":\"c2s.ic.gov\",\"dualStackDnsSuffix\":\"api.aws.ic.gov\",\"implicitGlobalRegion\":\"us-iso-east-1\",\"name\":\"aws-iso\",\"supportsDualStack\":false,\"supportsFIPS\":true},\"regionRegex\":\"^us\\\\-iso\\\\-\\\\w+\\\\-\\\\d+$\",\"regions\":{\"aws-iso-global\":{\"description\":\"aws-iso global region\"},\"us-iso-east-1\":{\"description\":\"US ISO East\"},\"us-iso-west-1\":{\"description\":\"US ISO WEST\"}}},{\"id\":\"aws-iso-b\",\"outputs\":{\"dnsSuffix\":\"sc2s.sgov.gov\",\"dualStackDnsSuffix\":\"api.aws.scloud\",\"implicitGlobalRegion\":\"us-isob-east-1\",\"name\":\"aws-iso-b\",\"supportsDualStack\":false,\"supportsFIPS\":true},\"regionRegex\":\"^us\\\\-isob\\\\-\\\\w+\\\\-\\\\d+$\",\"regions\":{\"aws-iso-b-global\":{\"description\":\"aws-iso-b global region\"},\"us-isob-east-1\":{\"description\":\"US ISOB East (Ohio)\"}}},{\"id\":\"aws-iso-e\",\"outputs\":{\"dnsSuffix\":\"cloud.adc-e.uk\",\"dualStackDnsSuffix\":\"api.cloud-aws.adc-e.uk\",\"implicitGlobalRegion\":\"eu-isoe-west-1\",\"name\":\"aws-iso-e\",\"supportsDualStack\":false,\"supportsFIPS\":true},\"regionRegex\":\"^eu\\\\-isoe\\\\-\\\\w+\\\\-\\\\d+$\",\"regions\":{\"aws-iso-e-global\":{\"description\":\"aws-iso-e global region\"},\"eu-isoe-west-1\":{\"description\":\"EU ISOE West\"}}},{\"id\":\"aws-iso-f\",\"outputs\":{\"dnsSuffix\":\"csp.hci.ic.gov\",\"dualStackDnsSuffix\":\"api.aws.hci.ic.gov\",\"implicitGlobalRegion\":\"us-isof-south-1\",\"name\":\"aws-iso-f\",\"supportsDualStack\":false,\"supportsFIPS\":true},\"regionRegex\":\"^us\\\\-isof\\\\-\\\\w+\\\\-\\\\d+$\",\"regions\":{\"aws-iso-f-global\":{\"description\":\"aws-iso-f global region\"},\"us-isof-east-1\":{\"description\":\"US ISOF EAST\"},\"us-isof-south-1\":{\"description\":\"US ISOF SOUTH\"}}},{\"id\":\"aws-us-gov\",\"outputs\":{\"dnsSuffix\":\"amazonaws.com\",\"dualStackDnsSuffix\":\"api.aws\",\"implicitGlobalRegion\":\"us-gov-west-1\",\"name\":\"aws-us-gov\",\"supportsDualStack\":true,\"supportsFIPS\":true},\"regionRegex\":\"^us\\\\-gov\\\\-\\\\w+\\\\-\\\\d+$\",\"regions\":{\"aws-us-gov-global\":{\"description\":\"aws-us-gov global region\"},\"us-gov-east-1\":{\"description\":\"AWS GovCloud (US-East)\"},\"us-gov-west-1\":{\"description\":\"AWS GovCloud (US-West)\"}}}],\"version\":\"1.1\"}"));}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserAgentPrefix",
    ()=>getUserAgentPrefix,
    "partition",
    ()=>partition,
    "setPartitionInfo",
    ()=>setPartitionInfo,
    "useDefaultPartitionInfo",
    ()=>useDefaultPartitionInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$partitions$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partitions.json (json)");
;
let selectedPartitionsInfo = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$partitions$2e$json__$28$json$29$__["default"];
let selectedUserAgentPrefix = "";
const partition = (value)=>{
    const { partitions } = selectedPartitionsInfo;
    for (const partition of partitions){
        const { regions, outputs } = partition;
        for (const [region, regionData] of Object.entries(regions)){
            if (region === value) {
                return {
                    ...outputs,
                    ...regionData
                };
            }
        }
    }
    for (const partition of partitions){
        const { regionRegex, outputs } = partition;
        if (new RegExp(regionRegex).test(value)) {
            return {
                ...outputs
            };
        }
    }
    const DEFAULT_PARTITION = partitions.find((partition)=>partition.id === "aws");
    if (!DEFAULT_PARTITION) {
        throw new Error("Provided region was not found in the partition array or regex," + " and default partition with id 'aws' doesn't exist.");
    }
    return {
        ...DEFAULT_PARTITION.outputs
    };
};
const setPartitionInfo = (partitionsInfo, userAgentPrefix = "")=>{
    selectedPartitionsInfo = partitionsInfo;
    selectedUserAgentPrefix = userAgentPrefix;
};
const useDefaultPartitionInfo = ()=>{
    setPartitionInfo(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$partitions$2e$json__$28$json$29$__["default"], "");
};
const getUserAgentPrefix = ()=>selectedUserAgentPrefix;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/aws.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "awsEndpointFunctions",
    ()=>awsEndpointFunctions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$isVirtualHostableS3Bucket$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/isVirtualHostableS3Bucket.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$parseArn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/parseArn.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$partition$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js [app-route] (ecmascript)");
;
;
;
;
const awsEndpointFunctions = {
    isVirtualHostableS3Bucket: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$isVirtualHostableS3Bucket$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isVirtualHostableS3Bucket"],
    parseArn: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$parseArn$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseArn"],
    partition: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$partition$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["partition"]
};
__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customEndpointFunctions"].aws = awsEndpointFunctions;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/querystring-parser/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseQueryString",
    ()=>parseQueryString
]);
function parseQueryString(querystring) {
    const query = {};
    querystring = querystring.replace(/^\?/, "");
    if (querystring) {
        for (const pair of querystring.split("&")){
            let [key, value = null] = pair.split("=");
            key = decodeURIComponent(key);
            if (value) {
                value = decodeURIComponent(value);
            }
            if (!(key in query)) {
                query[key] = value;
            } else if (Array.isArray(query[key])) {
                query[key].push(value);
            } else {
                query[key] = [
                    query[key],
                    value
                ];
            }
        }
    }
    return query;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/url-parser/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseUrl",
    ()=>parseUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$querystring$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/querystring-parser/dist-es/index.js [app-route] (ecmascript)");
;
const parseUrl = (url)=>{
    if (typeof url === "string") {
        return parseUrl(new URL(url));
    }
    const { hostname, pathname, port, protocol, search } = url;
    let query;
    if (search) {
        query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$querystring$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseQueryString"])(search);
    }
    return {
        hostname,
        port: port ? parseInt(port) : undefined,
        protocol,
        path: pathname,
        query
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/resolveDefaultAwsRegionalEndpointsConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveDefaultAwsRegionalEndpointsConfig",
    ()=>resolveDefaultAwsRegionalEndpointsConfig,
    "toEndpointV1",
    ()=>toEndpointV1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/url-parser/dist-es/index.js [app-route] (ecmascript)");
;
const resolveDefaultAwsRegionalEndpointsConfig = (input)=>{
    if (typeof input.endpointProvider !== "function") {
        throw new Error("@aws-sdk/util-endpoint - endpointProvider and endpoint missing in config for this client.");
    }
    const { endpoint } = input;
    if (endpoint === undefined) {
        input.endpoint = async ()=>{
            return toEndpointV1(input.endpointProvider({
                Region: typeof input.region === "function" ? await input.region() : input.region,
                UseDualStack: typeof input.useDualstackEndpoint === "function" ? await input.useDualstackEndpoint() : input.useDualstackEndpoint,
                UseFIPS: typeof input.useFipsEndpoint === "function" ? await input.useFipsEndpoint() : input.useFipsEndpoint,
                Endpoint: undefined
            }, {
                logger: input.logger
            }));
        };
    }
    return input;
};
const toEndpointV1 = (endpoint)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUrl"])(endpoint.url);
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/resolveEndpoint.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointRuleObject.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/ErrorRuleObject.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/RuleSetObject.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/TreeRuleObject.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/shared.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointRuleObject$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/EndpointRuleObject.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$ErrorRuleObject$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/ErrorRuleObject.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$RuleSetObject$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/RuleSetObject.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$TreeRuleObject$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/TreeRuleObject.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/shared.js [app-route] (ecmascript)");
;
;
;
;
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$aws$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/aws.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$partition$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isIpAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/isIpAddress.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveDefaultAwsRegionalEndpointsConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/resolveDefaultAwsRegionalEndpointsConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveEndpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/resolveEndpoint.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/types/index.js [app-route] (ecmascript) <locals>");
;
;
;
;
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/client/setFeature.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setFeature",
    ()=>setFeature
]);
function setFeature(context, feature, value) {
    if (!context.__aws_sdk_context) {
        context.__aws_sdk_context = {
            features: {}
        };
    } else if (!context.__aws_sdk_context.features) {
        context.__aws_sdk_context.features = {};
    }
    context.__aws_sdk_context.features[feature] = value;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/check-features.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkFeatures",
    ()=>checkFeatures
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/client/setFeature.js [app-route] (ecmascript)");
;
const ACCOUNT_ID_ENDPOINT_REGEX = /\d{12}\.ddb/;
async function checkFeatures(context, config, args) {
    const request = args.request;
    if (request?.headers?.["smithy-protocol"] === "rpc-v2-cbor") {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "PROTOCOL_RPC_V2_CBOR", "M");
    }
    if (typeof config.retryStrategy === "function") {
        const retryStrategy = await config.retryStrategy();
        if (typeof retryStrategy.acquireInitialRetryToken === "function") {
            if (retryStrategy.constructor?.name?.includes("Adaptive")) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "RETRY_MODE_ADAPTIVE", "F");
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "RETRY_MODE_STANDARD", "E");
            }
        } else {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "RETRY_MODE_LEGACY", "D");
        }
    }
    if (typeof config.accountIdEndpointMode === "function") {
        const endpointV2 = context.endpointV2;
        if (String(endpointV2?.url?.hostname).match(ACCOUNT_ID_ENDPOINT_REGEX)) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "ACCOUNT_ID_ENDPOINT", "O");
        }
        switch(await config.accountIdEndpointMode?.()){
            case "disabled":
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "ACCOUNT_ID_MODE_DISABLED", "Q");
                break;
            case "preferred":
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "ACCOUNT_ID_MODE_PREFERRED", "P");
                break;
            case "required":
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "ACCOUNT_ID_MODE_REQUIRED", "R");
                break;
        }
    }
    const identity = context.__smithy_context?.selectedHttpAuthScheme?.identity;
    if (identity?.$source) {
        const credentials = identity;
        if (credentials.accountId) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "RESOLVED_ACCOUNT_ID", "T");
        }
        for (const [key, value] of Object.entries(credentials.$source ?? {})){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, key, value);
        }
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SPACE",
    ()=>SPACE,
    "UA_ESCAPE_CHAR",
    ()=>UA_ESCAPE_CHAR,
    "UA_NAME_ESCAPE_REGEX",
    ()=>UA_NAME_ESCAPE_REGEX,
    "UA_NAME_SEPARATOR",
    ()=>UA_NAME_SEPARATOR,
    "UA_VALUE_ESCAPE_REGEX",
    ()=>UA_VALUE_ESCAPE_REGEX,
    "USER_AGENT",
    ()=>USER_AGENT,
    "X_AMZ_USER_AGENT",
    ()=>X_AMZ_USER_AGENT
]);
const USER_AGENT = "user-agent";
const X_AMZ_USER_AGENT = "x-amz-user-agent";
const SPACE = " ";
const UA_NAME_SEPARATOR = "/";
const UA_NAME_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w]/g;
const UA_VALUE_ESCAPE_REGEX = /[^\!\$\%\&\'\*\+\-\.\^\_\`\|\~\d\w\#]/g;
const UA_ESCAPE_CHAR = "-";
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/encode-features.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encodeFeatures",
    ()=>encodeFeatures
]);
const BYTE_LIMIT = 1024;
function encodeFeatures(features) {
    let buffer = "";
    for(const key in features){
        const val = features[key];
        if (buffer.length + val.length + 1 <= BYTE_LIMIT) {
            if (buffer.length) {
                buffer += "," + val;
            } else {
                buffer += val;
            }
            continue;
        }
        break;
    }
    return buffer;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserAgentMiddlewareOptions",
    ()=>getUserAgentMiddlewareOptions,
    "getUserAgentPlugin",
    ()=>getUserAgentPlugin,
    "userAgentMiddleware",
    ()=>userAgentMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$partition$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/lib/aws/partition.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$check$2d$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/check-features.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$encode$2d$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/encode-features.js [app-route] (ecmascript)");
;
;
;
;
;
const userAgentMiddleware = (options)=>(next, context)=>async (args)=>{
            const { request } = args;
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].isInstance(request)) {
                return next(args);
            }
            const { headers } = request;
            const userAgent = context?.userAgent?.map(escapeUserAgent) || [];
            const defaultUserAgent = (await options.defaultUserAgentProvider()).map(escapeUserAgent);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$check$2d$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkFeatures"])(context, options, args);
            const awsContext = context;
            defaultUserAgent.push(`m/${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$encode$2d$features$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeFeatures"])(Object.assign({}, context.__smithy_context?.features, awsContext.__aws_sdk_context?.features))}`);
            const customUserAgent = options?.customUserAgent?.map(escapeUserAgent) || [];
            const appId = await options.userAgentAppId();
            if (appId) {
                defaultUserAgent.push(escapeUserAgent([
                    `app/${appId}`
                ]));
            }
            const prefix = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$aws$2f$partition$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserAgentPrefix"])();
            const sdkUserAgentValue = (prefix ? [
                prefix
            ] : []).concat([
                ...defaultUserAgent,
                ...userAgent,
                ...customUserAgent
            ]).join(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPACE"]);
            const normalUAValue = [
                ...defaultUserAgent.filter((section)=>section.startsWith("aws-sdk-")),
                ...customUserAgent
            ].join(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SPACE"]);
            if (options.runtime !== "browser") {
                if (normalUAValue) {
                    headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["X_AMZ_USER_AGENT"]] = headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["X_AMZ_USER_AGENT"]] ? `${headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["USER_AGENT"]]} ${normalUAValue}` : normalUAValue;
                }
                headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["USER_AGENT"]] = sdkUserAgentValue;
            } else {
                headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["X_AMZ_USER_AGENT"]] = sdkUserAgentValue;
            }
            return next({
                ...args,
                request
            });
        };
const escapeUserAgent = (userAgentPair)=>{
    const name = userAgentPair[0].split(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UA_NAME_SEPARATOR"]).map((part)=>part.replace(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UA_NAME_ESCAPE_REGEX"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UA_ESCAPE_CHAR"])).join(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UA_NAME_SEPARATOR"]);
    const version = userAgentPair[1]?.replace(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UA_VALUE_ESCAPE_REGEX"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UA_ESCAPE_CHAR"]);
    const prefixSeparatorIndex = name.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UA_NAME_SEPARATOR"]);
    const prefix = name.substring(0, prefixSeparatorIndex);
    let uaName = name.substring(prefixSeparatorIndex + 1);
    if (prefix === "api") {
        uaName = uaName.toLowerCase();
    }
    return [
        prefix,
        uaName,
        version
    ].filter((item)=>item && item.length > 0).reduce((acc, item, index)=>{
        switch(index){
            case 0:
                return item;
            case 1:
                return `${acc}/${item}`;
            default:
                return `${acc}#${item}`;
        }
    }, "");
};
const getUserAgentMiddlewareOptions = {
    name: "getUserAgentMiddleware",
    step: "build",
    priority: "low",
    tags: [
        "SET_USER_AGENT",
        "USER_AGENT"
    ],
    override: true
};
const getUserAgentPlugin = (config)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(userAgentMiddleware(config), getUserAgentMiddlewareOptions);
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js [app-route] (ecmascript)");
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFipsRegion",
    ()=>isFipsRegion
]);
const isFipsRegion = (region)=>typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRealRegion",
    ()=>getRealRegion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$isFipsRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js [app-route] (ecmascript)");
;
const getRealRegion = (region)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$isFipsRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFipsRegion"])(region) ? [
        "fips-aws-global",
        "aws-fips"
    ].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveRegionConfig",
    ()=>resolveRegionConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$getRealRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/getRealRegion.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$isFipsRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/isFipsRegion.js [app-route] (ecmascript)");
;
;
const resolveRegionConfig = (input)=>{
    const { region, useFipsEndpoint } = input;
    if (!region) {
        throw new Error("Region is missing");
    }
    return Object.assign(input, {
        region: async ()=>{
            if (typeof region === "string") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$getRealRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRealRegion"])(region);
            }
            const providedRegion = await region();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$getRealRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRealRegion"])(providedRegion);
        },
        useFipsEndpoint: async ()=>{
            const providedRegion = typeof region === "string" ? region : await region();
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$isFipsRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFipsRegion"])(providedRegion)) {
                return true;
            }
            return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        }
    });
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultIdentityProviderConfig",
    ()=>DefaultIdentityProviderConfig
]);
class DefaultIdentityProviderConfig {
    constructor(config){
        this.authSchemes = new Map();
        for (const [key, value] of Object.entries(config)){
            if (value !== undefined) {
                this.authSchemes.set(key, value);
            }
        }
    }
    getIdentityProvider(schemeId) {
        return this.authSchemes.get(schemeId);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/middleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SMITHY_CONTEXT_KEY",
    ()=>SMITHY_CONTEXT_KEY
]);
const SMITHY_CONTEXT_KEY = "__smithy_context";
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSmithyContext",
    ()=>getSmithyContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/middleware.js [app-route] (ecmascript)");
;
const getSmithyContext = (context)=>context[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SMITHY_CONTEXT_KEY"]] || (context[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SMITHY_CONTEXT_KEY"]] = {});
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/resolveAuthOptions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveAuthOptions",
    ()=>resolveAuthOptions
]);
const resolveAuthOptions = (candidateAuthOptions, authSchemePreference)=>{
    if (!authSchemePreference || authSchemePreference.length === 0) {
        return candidateAuthOptions;
    }
    const preferredAuthOptions = [];
    for (const preferredSchemeName of authSchemePreference){
        for (const candidateAuthOption of candidateAuthOptions){
            const candidateAuthSchemeName = candidateAuthOption.schemeId.split("#")[1];
            if (candidateAuthSchemeName === preferredSchemeName) {
                preferredAuthOptions.push(candidateAuthOption);
            }
        }
    }
    for (const candidateAuthOption of candidateAuthOptions){
        if (!preferredAuthOptions.find(({ schemeId })=>schemeId === candidateAuthOption.schemeId)) {
            preferredAuthOptions.push(candidateAuthOption);
        }
    }
    return preferredAuthOptions;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "httpAuthSchemeMiddleware",
    ()=>httpAuthSchemeMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$resolveAuthOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/resolveAuthOptions.js [app-route] (ecmascript)");
;
;
function convertHttpAuthSchemesToMap(httpAuthSchemes) {
    const map = new Map();
    for (const scheme of httpAuthSchemes){
        map.set(scheme.schemeId, scheme);
    }
    return map;
}
const httpAuthSchemeMiddleware = (config, mwOptions)=>(next, context)=>async (args)=>{
            const options = config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input));
            const authSchemePreference = config.authSchemePreference ? await config.authSchemePreference() : [];
            const resolvedOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$resolveAuthOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAuthOptions"])(options, authSchemePreference);
            const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
            const smithyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSmithyContext"])(context);
            const failureReasons = [];
            for (const option of resolvedOptions){
                const scheme = authSchemes.get(option.schemeId);
                if (!scheme) {
                    failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
                    continue;
                }
                const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
                if (!identityProvider) {
                    failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
                    continue;
                }
                const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
                option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
                option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
                smithyContext.selectedHttpAuthScheme = {
                    httpAuthOption: option,
                    identity: await identityProvider(option.identityProperties),
                    signer: scheme.signer
                };
                break;
            }
            if (!smithyContext.selectedHttpAuthScheme) {
                throw new Error(failureReasons.join("\n"));
            }
            return next(args);
        };
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHttpAuthSchemeEndpointRuleSetPlugin",
    ()=>getHttpAuthSchemeEndpointRuleSetPlugin,
    "httpAuthSchemeEndpointRuleSetMiddlewareOptions",
    ()=>httpAuthSchemeEndpointRuleSetMiddlewareOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$httpAuthSchemeMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/httpAuthSchemeMiddleware.js [app-route] (ecmascript)");
;
const httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
    step: "serialize",
    tags: [
        "HTTP_AUTH_SCHEME"
    ],
    name: "httpAuthSchemeMiddleware",
    override: true,
    relation: "before",
    toMiddleware: "endpointV2Middleware"
};
const getHttpAuthSchemeEndpointRuleSetPlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider })=>({
        applyToStack: (clientStack)=>{
            clientStack.addRelativeTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$httpAuthSchemeMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["httpAuthSchemeMiddleware"])(config, {
                httpAuthSchemeParametersProvider,
                identityProviderConfigProvider
            }), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-signing/httpSigningMiddleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "httpSigningMiddleware",
    ()=>httpSigningMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js [app-route] (ecmascript)");
;
;
const defaultErrorHandler = (signingProperties)=>(error)=>{
        throw error;
    };
const defaultSuccessHandler = (httpResponse, signingProperties)=>{};
const httpSigningMiddleware = (config)=>(next, context)=>async (args)=>{
            if (!__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].isInstance(args.request)) {
                return next(args);
            }
            const smithyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSmithyContext"])(context);
            const scheme = smithyContext.selectedHttpAuthScheme;
            if (!scheme) {
                throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
            }
            const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
            const output = await next({
                ...args,
                request: await signer.sign(args.request, identity, signingProperties)
            }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
            (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
            return output;
        };
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHttpSigningPlugin",
    ()=>getHttpSigningPlugin,
    "httpSigningMiddlewareOptions",
    ()=>httpSigningMiddlewareOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$httpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-signing/httpSigningMiddleware.js [app-route] (ecmascript)");
;
const httpSigningMiddlewareOptions = {
    step: "finalizeRequest",
    tags: [
        "HTTP_SIGNING"
    ],
    name: "httpSigningMiddleware",
    aliases: [
        "apiKeyMiddleware",
        "tokenMiddleware",
        "awsAuthMiddleware"
    ],
    override: true,
    relation: "after",
    toMiddleware: "retryMiddleware"
};
const getHttpSigningPlugin = (config)=>({
        applyToStack: (clientStack)=>{
            clientStack.addRelativeTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$httpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["httpSigningMiddleware"])(config), httpSigningMiddlewareOptions);
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-content-length/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contentLengthMiddleware",
    ()=>contentLengthMiddleware,
    "contentLengthMiddlewareOptions",
    ()=>contentLengthMiddlewareOptions,
    "getContentLengthPlugin",
    ()=>getContentLengthPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
;
const CONTENT_LENGTH_HEADER = "content-length";
function contentLengthMiddleware(bodyLengthChecker) {
    return (next)=>async (args)=>{
            const request = args.request;
            if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].isInstance(request)) {
                const { body, headers } = request;
                if (body && Object.keys(headers).map((str)=>str.toLowerCase()).indexOf(CONTENT_LENGTH_HEADER) === -1) {
                    try {
                        const length = bodyLengthChecker(body);
                        request.headers = {
                            ...request.headers,
                            [CONTENT_LENGTH_HEADER]: String(length)
                        };
                    } catch (error) {}
                }
            }
            return next({
                ...args,
                request
            });
        };
}
const contentLengthMiddlewareOptions = {
    step: "build",
    tags: [
        "SET_CONTENT_LENGTH",
        "CONTENT_LENGTH"
    ],
    name: "contentLengthMiddleware",
    override: true
};
const getContentLengthPlugin = (options)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(contentLengthMiddleware(options.bodyLengthChecker), contentLengthMiddlewareOptions);
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeProvider",
    ()=>normalizeProvider
]);
const normalizeProvider = (input)=>{
    if (typeof input === "function") return input;
    const promisified = Promise.resolve(input);
    return ()=>promisified;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/ProviderError.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProviderError",
    ()=>ProviderError
]);
class ProviderError extends Error {
    constructor(message, options = true){
        let logger;
        let tryNextLink = true;
        if (typeof options === "boolean") {
            logger = undefined;
            tryNextLink = options;
        } else if (options != null && typeof options === "object") {
            logger = options.logger;
            tryNextLink = options.tryNextLink ?? true;
        }
        super(message);
        this.name = "ProviderError";
        this.tryNextLink = tryNextLink;
        Object.setPrototypeOf(this, ProviderError.prototype);
        logger?.debug?.(`@smithy/property-provider ${tryNextLink ? "->" : "(!)"} ${message}`);
    }
    static from(error, options = true) {
        return Object.assign(new this(error.message, options), error);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/chain.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "chain",
    ()=>chain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$ProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/ProviderError.js [app-route] (ecmascript)");
;
const chain = (...providers)=>async ()=>{
        if (providers.length === 0) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$ProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProviderError"]("No providers in chain");
        }
        let lastProviderError;
        for (const provider of providers){
            try {
                const credentials = await provider();
                return credentials;
            } catch (err) {
                lastProviderError = err;
                if (err?.tryNextLink) {
                    continue;
                }
                throw err;
            }
        }
        throw lastProviderError;
    };
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/memoize.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "memoize",
    ()=>memoize
]);
const memoize = (provider, isExpired, requiresRefresh)=>{
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = async ()=>{
        if (!pending) {
            pending = provider();
        }
        try {
            resolved = await pending;
            hasResult = true;
            isConstant = false;
        } finally{
            pending = undefined;
        }
        return resolved;
    };
    if (isExpired === undefined) {
        return async (options)=>{
            if (!hasResult || options?.forceRefresh) {
                resolved = await coalesceProvider();
            }
            return resolved;
        };
    }
    return async (options)=>{
        if (!hasResult || options?.forceRefresh) {
            resolved = await coalesceProvider();
        }
        if (isConstant) {
            return resolved;
        }
        if (requiresRefresh && !requiresRefresh(resolved)) {
            isConstant = true;
            return resolved;
        }
        if (isExpired(resolved)) {
            await coalesceProvider();
            return resolved;
        }
        return resolved;
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CredentialsProviderError",
    ()=>CredentialsProviderError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$ProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/ProviderError.js [app-route] (ecmascript)");
;
class CredentialsProviderError extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$ProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProviderError"] {
    constructor(message, options = true){
        super(message, options);
        this.name = "CredentialsProviderError";
        Object.setPrototypeOf(this, CredentialsProviderError.prototype);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/getSelectorName.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSelectorName",
    ()=>getSelectorName
]);
function getSelectorName(functionString) {
    try {
        const constants = new Set(Array.from(functionString.match(/([A-Z_]){3,}/g) ?? []));
        constants.delete("CONFIG");
        constants.delete("CONFIG_PREFIX_SEPARATOR");
        constants.delete("ENV");
        return [
            ...constants
        ].join(", ");
    } catch (e) {
        return functionString;
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/fromEnv.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromEnv",
    ()=>fromEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$getSelectorName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/getSelectorName.js [app-route] (ecmascript)");
;
;
const fromEnv = (envVarSelector, options)=>async ()=>{
        try {
            const config = envVarSelector(process.env, options);
            if (config === undefined) {
                throw new Error();
            }
            return config;
        } catch (e) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](e.message || `Not found in ENV: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$getSelectorName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSelectorName"])(envVarSelector.toString())}`, {
                logger: options?.logger
            });
        }
    };
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getProfileName.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_PROFILE",
    ()=>DEFAULT_PROFILE,
    "ENV_PROFILE",
    ()=>ENV_PROFILE,
    "getProfileName",
    ()=>getProfileName
]);
const ENV_PROFILE = "AWS_PROFILE";
const DEFAULT_PROFILE = "default";
const getProfileName = (init)=>init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/profile.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IniSectionType",
    ()=>IniSectionType
]);
var IniSectionType;
(function(IniSectionType) {
    IniSectionType["PROFILE"] = "profile";
    IniSectionType["SSO_SESSION"] = "sso-session";
    IniSectionType["SERVICES"] = "services";
})(IniSectionType || (IniSectionType = {}));
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigData.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getConfigData",
    ()=>getConfigData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$profile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/profile.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js [app-route] (ecmascript)");
;
;
const getConfigData = (data)=>Object.entries(data).filter(([key])=>{
        const indexOfSeparator = key.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CONFIG_PREFIX_SEPARATOR"]);
        if (indexOfSeparator === -1) {
            return false;
        }
        return Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$profile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IniSectionType"]).includes(key.substring(0, indexOfSeparator));
    }).reduce((acc, [key, value])=>{
        const indexOfSeparator = key.indexOf(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CONFIG_PREFIX_SEPARATOR"]);
        const updatedKey = key.substring(0, indexOfSeparator) === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$profile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IniSectionType"].PROFILE ? key.substring(indexOfSeparator + 1) : key;
        acc[updatedKey] = value;
        return acc;
    }, {
        ...data.default && {
            default: data.default
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getHomeDir.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHomeDir",
    ()=>getHomeDir
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const homeDirCache = {};
const getHomeDirCacheKey = ()=>{
    if (process && process.geteuid) {
        return `${process.geteuid()}`;
    }
    return "DEFAULT";
};
const getHomeDir = ()=>{
    const { HOME, USERPROFILE, HOMEPATH, HOMEDRIVE = `C:${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["sep"]}` } = process.env;
    if (HOME) return HOME;
    if (USERPROFILE) return USERPROFILE;
    if (HOMEPATH) return `${HOMEDRIVE}${HOMEPATH}`;
    const homeDirCacheKey = getHomeDirCacheKey();
    if (!homeDirCache[homeDirCacheKey]) homeDirCache[homeDirCacheKey] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["homedir"])();
    return homeDirCache[homeDirCacheKey];
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigFilepath.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENV_CONFIG_PATH",
    ()=>ENV_CONFIG_PATH,
    "getConfigFilepath",
    ()=>getConfigFilepath
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getHomeDir$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getHomeDir.js [app-route] (ecmascript)");
;
;
const ENV_CONFIG_PATH = "AWS_CONFIG_FILE";
const getConfigFilepath = ()=>process.env[ENV_CONFIG_PATH] || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getHomeDir$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHomeDir"])(), ".aws", "config");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getCredentialsFilepath.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ENV_CREDENTIALS_PATH",
    ()=>ENV_CREDENTIALS_PATH,
    "getCredentialsFilepath",
    ()=>getCredentialsFilepath
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getHomeDir$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getHomeDir.js [app-route] (ecmascript)");
;
;
const ENV_CREDENTIALS_PATH = "AWS_SHARED_CREDENTIALS_FILE";
const getCredentialsFilepath = ()=>process.env[ENV_CREDENTIALS_PATH] || (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getHomeDir$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHomeDir"])(), ".aws", "credentials");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/parseIni.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseIni",
    ()=>parseIni
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$profile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/profile.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js [app-route] (ecmascript)");
;
;
const prefixKeyRegex = /^([\w-]+)\s(["'])?([\w-@\+\.%:/]+)\2$/;
const profileNameBlockList = [
    "__proto__",
    "profile __proto__"
];
const parseIni = (iniData)=>{
    const map = {};
    let currentSection;
    let currentSubSection;
    for (const iniLine of iniData.split(/\r?\n/)){
        const trimmedLine = iniLine.split(/(^|\s)[;#]/)[0].trim();
        const isSection = trimmedLine[0] === "[" && trimmedLine[trimmedLine.length - 1] === "]";
        if (isSection) {
            currentSection = undefined;
            currentSubSection = undefined;
            const sectionName = trimmedLine.substring(1, trimmedLine.length - 1);
            const matches = prefixKeyRegex.exec(sectionName);
            if (matches) {
                const [, prefix, , name] = matches;
                if (Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$profile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IniSectionType"]).includes(prefix)) {
                    currentSection = [
                        prefix,
                        name
                    ].join(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CONFIG_PREFIX_SEPARATOR"]);
                }
            } else {
                currentSection = sectionName;
            }
            if (profileNameBlockList.includes(sectionName)) {
                throw new Error(`Found invalid profile name "${sectionName}"`);
            }
        } else if (currentSection) {
            const indexOfEqualsSign = trimmedLine.indexOf("=");
            if (![
                0,
                -1
            ].includes(indexOfEqualsSign)) {
                const [name, value] = [
                    trimmedLine.substring(0, indexOfEqualsSign).trim(),
                    trimmedLine.substring(indexOfEqualsSign + 1).trim()
                ];
                if (value === "") {
                    currentSubSection = name;
                } else {
                    if (currentSubSection && iniLine.trimStart() === iniLine) {
                        currentSubSection = undefined;
                    }
                    map[currentSection] = map[currentSection] || {};
                    const key = currentSubSection ? [
                        currentSubSection,
                        name
                    ].join(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CONFIG_PREFIX_SEPARATOR"]) : name;
                    map[currentSection][key] = value;
                }
            }
        }
    }
    return map;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/slurpFile.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "slurpFile",
    ()=>slurpFile
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
const { readFile } = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"];
const filePromisesHash = {};
const slurpFile = (path, options)=>{
    if (!filePromisesHash[path] || options?.ignoreCache) {
        filePromisesHash[path] = readFile(path, "utf8");
    }
    return filePromisesHash[path];
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONFIG_PREFIX_SEPARATOR",
    ()=>CONFIG_PREFIX_SEPARATOR,
    "loadSharedConfigFiles",
    ()=>loadSharedConfigFiles
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getConfigData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigData.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getConfigFilepath$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getConfigFilepath.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getCredentialsFilepath$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getCredentialsFilepath.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getHomeDir$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getHomeDir.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$parseIni$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/parseIni.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$slurpFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/slurpFile.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const swallowError = ()=>({});
const CONFIG_PREFIX_SEPARATOR = ".";
const loadSharedConfigFiles = async (init = {})=>{
    const { filepath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getCredentialsFilepath$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCredentialsFilepath"])(), configFilepath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getConfigFilepath$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConfigFilepath"])() } = init;
    const homeDir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getHomeDir$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHomeDir"])();
    const relativeHomeDirPrefix = "~/";
    let resolvedFilepath = filepath;
    if (filepath.startsWith(relativeHomeDirPrefix)) {
        resolvedFilepath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(homeDir, filepath.slice(2));
    }
    let resolvedConfigFilepath = configFilepath;
    if (configFilepath.startsWith(relativeHomeDirPrefix)) {
        resolvedConfigFilepath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(homeDir, configFilepath.slice(2));
    }
    const parsedFiles = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$slurpFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["slurpFile"])(resolvedConfigFilepath, {
            ignoreCache: init.ignoreCache
        }).then(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$parseIni$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseIni"]).then(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getConfigData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getConfigData"]).catch(swallowError),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$slurpFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["slurpFile"])(resolvedFilepath, {
            ignoreCache: init.ignoreCache
        }).then(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$parseIni$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseIni"]).catch(swallowError)
    ]);
    return {
        configFile: parsedFiles[0],
        credentialsFile: parsedFiles[1]
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/fromSharedConfigFiles.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromSharedConfigFiles",
    ()=>fromSharedConfigFiles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getProfileName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/getProfileName.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$getSelectorName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/getSelectorName.js [app-route] (ecmascript)");
;
;
;
const fromSharedConfigFiles = (configSelector, { preferredFile = "config", ...init } = {})=>async ()=>{
        const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getProfileName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProfileName"])(init);
        const { configFile, credentialsFile } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadSharedConfigFiles"])(init);
        const profileFromCredentials = credentialsFile[profile] || {};
        const profileFromConfig = configFile[profile] || {};
        const mergedProfile = preferredFile === "config" ? {
            ...profileFromCredentials,
            ...profileFromConfig
        } : {
            ...profileFromConfig,
            ...profileFromCredentials
        };
        try {
            const cfgFile = preferredFile === "config" ? configFile : credentialsFile;
            const configValue = configSelector(mergedProfile, cfgFile);
            if (configValue === undefined) {
                throw new Error();
            }
            return configValue;
        } catch (e) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](e.message || `Not found in config files w/ profile [${profile}]: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$getSelectorName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSelectorName"])(configSelector.toString())}`, {
                logger: init.logger
            });
        }
    };
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/fromStatic.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromStatic",
    ()=>fromStatic
]);
const fromStatic = (staticValue)=>()=>Promise.resolve(staticValue);
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/fromStatic.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromStatic",
    ()=>fromStatic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$fromStatic$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/fromStatic.js [app-route] (ecmascript)");
;
const isFunction = (func)=>typeof func === "function";
const fromStatic = (defaultValue)=>isFunction(defaultValue) ? async ()=>await defaultValue() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$fromStatic$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromStatic"])(defaultValue);
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/configLoader.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadConfig",
    ()=>loadConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$chain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/chain.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$memoize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/memoize.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$fromEnv$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/fromEnv.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$fromSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/fromSharedConfigFiles.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$fromStatic$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/fromStatic.js [app-route] (ecmascript)");
;
;
;
;
const loadConfig = ({ environmentVariableSelector, configFileSelector, default: defaultValue }, configuration = {})=>{
    const { signingName, logger } = configuration;
    const envOptions = {
        signingName,
        logger
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$memoize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoize"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$chain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chain"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$fromEnv$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromEnv"])(environmentVariableSelector, envOptions), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$fromSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromSharedConfigFiles"])(configFileSelector, configuration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$fromStatic$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromStatic"])(defaultValue)));
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointUrlConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEndpointUrlConfig",
    ()=>getEndpointUrlConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js [app-route] (ecmascript)");
;
const ENV_ENDPOINT_URL = "AWS_ENDPOINT_URL";
const CONFIG_ENDPOINT_URL = "endpoint_url";
const getEndpointUrlConfig = (serviceId)=>({
        environmentVariableSelector: (env)=>{
            const serviceSuffixParts = serviceId.split(" ").map((w)=>w.toUpperCase());
            const serviceEndpointUrl = env[[
                ENV_ENDPOINT_URL,
                ...serviceSuffixParts
            ].join("_")];
            if (serviceEndpointUrl) return serviceEndpointUrl;
            const endpointUrl = env[ENV_ENDPOINT_URL];
            if (endpointUrl) return endpointUrl;
            return undefined;
        },
        configFileSelector: (profile, config)=>{
            if (config && profile.services) {
                const servicesSection = config[[
                    "services",
                    profile.services
                ].join(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CONFIG_PREFIX_SEPARATOR"])];
                if (servicesSection) {
                    const servicePrefixParts = serviceId.split(" ").map((w)=>w.toLowerCase());
                    const endpointUrl = servicesSection[[
                        servicePrefixParts.join("_"),
                        CONFIG_ENDPOINT_URL
                    ].join(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CONFIG_PREFIX_SEPARATOR"])];
                    if (endpointUrl) return endpointUrl;
                }
            }
            const endpointUrl = profile[CONFIG_ENDPOINT_URL];
            if (endpointUrl) return endpointUrl;
            return undefined;
        },
        default: undefined
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEndpointFromConfig",
    ()=>getEndpointFromConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/configLoader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$getEndpointUrlConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointUrlConfig.js [app-route] (ecmascript)");
;
;
const getEndpointFromConfig = async (serviceId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$getEndpointUrlConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointUrlConfig"])(serviceId ?? ""))();
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toEndpointV1",
    ()=>toEndpointV1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/url-parser/dist-es/index.js [app-route] (ecmascript)");
;
const toEndpointV1 = (endpoint)=>{
    if (typeof endpoint === "object") {
        if ("url" in endpoint) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUrl"])(endpoint.url);
        }
        return endpoint;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUrl"])(endpoint);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveEndpointConfig",
    ()=>resolveEndpointConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$getEndpointFromConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$toEndpointV1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js [app-route] (ecmascript)");
;
;
;
const resolveEndpointConfig = (input)=>{
    const tls = input.tls ?? true;
    const { endpoint, useDualstackEndpoint, useFipsEndpoint } = input;
    const customEndpointProvider = endpoint != null ? async ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$toEndpointV1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toEndpointV1"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(endpoint)()) : undefined;
    const isCustomEndpoint = !!endpoint;
    const resolvedConfig = Object.assign(input, {
        endpoint: customEndpointProvider,
        tls,
        isCustomEndpoint,
        useDualstackEndpoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(useDualstackEndpoint ?? false),
        useFipsEndpoint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(useFipsEndpoint ?? false)
    });
    let configuredEndpointPromise = undefined;
    resolvedConfig.serviceConfiguredEndpoint = async ()=>{
        if (input.serviceId && !configuredEndpointPromise) {
            configuredEndpointPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$getEndpointFromConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointFromConfig"])(input.serviceId);
        }
        return configuredEndpointPromise;
    };
    return resolvedConfig;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpResponse.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpResponse",
    ()=>HttpResponse
]);
class HttpResponse {
    constructor(options){
        this.statusCode = options.statusCode;
        this.reason = options.reason;
        this.headers = options.headers || {};
        this.body = options.body;
    }
    static isInstance(response) {
        if (!response) return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/service-error-classification/dist-es/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLOCK_SKEW_ERROR_CODES",
    ()=>CLOCK_SKEW_ERROR_CODES,
    "NODEJS_NETWORK_ERROR_CODES",
    ()=>NODEJS_NETWORK_ERROR_CODES,
    "NODEJS_TIMEOUT_ERROR_CODES",
    ()=>NODEJS_TIMEOUT_ERROR_CODES,
    "THROTTLING_ERROR_CODES",
    ()=>THROTTLING_ERROR_CODES,
    "TRANSIENT_ERROR_CODES",
    ()=>TRANSIENT_ERROR_CODES,
    "TRANSIENT_ERROR_STATUS_CODES",
    ()=>TRANSIENT_ERROR_STATUS_CODES
]);
const CLOCK_SKEW_ERROR_CODES = [
    "AuthFailure",
    "InvalidSignatureException",
    "RequestExpired",
    "RequestInTheFuture",
    "RequestTimeTooSkewed",
    "SignatureDoesNotMatch"
];
const THROTTLING_ERROR_CODES = [
    "BandwidthLimitExceeded",
    "EC2ThrottledException",
    "LimitExceededException",
    "PriorRequestNotComplete",
    "ProvisionedThroughputExceededException",
    "RequestLimitExceeded",
    "RequestThrottled",
    "RequestThrottledException",
    "SlowDown",
    "ThrottledException",
    "Throttling",
    "ThrottlingException",
    "TooManyRequestsException",
    "TransactionInProgressException"
];
const TRANSIENT_ERROR_CODES = [
    "TimeoutError",
    "RequestTimeout",
    "RequestTimeoutException"
];
const TRANSIENT_ERROR_STATUS_CODES = [
    500,
    502,
    503,
    504
];
const NODEJS_TIMEOUT_ERROR_CODES = [
    "ECONNRESET",
    "ECONNREFUSED",
    "EPIPE",
    "ETIMEDOUT"
];
const NODEJS_NETWORK_ERROR_CODES = [
    "EHOSTUNREACH",
    "ENETUNREACH",
    "ENOTFOUND"
];
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/service-error-classification/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBrowserNetworkError",
    ()=>isBrowserNetworkError,
    "isClockSkewCorrectedError",
    ()=>isClockSkewCorrectedError,
    "isClockSkewError",
    ()=>isClockSkewError,
    "isRetryableByTrait",
    ()=>isRetryableByTrait,
    "isServerError",
    ()=>isServerError,
    "isThrottlingError",
    ()=>isThrottlingError,
    "isTransientError",
    ()=>isTransientError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/service-error-classification/dist-es/constants.js [app-route] (ecmascript)");
;
const isRetryableByTrait = (error)=>error.$retryable !== undefined;
const isClockSkewError = (error)=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CLOCK_SKEW_ERROR_CODES"].includes(error.name);
const isClockSkewCorrectedError = (error)=>error.$metadata?.clockSkewCorrected;
const isBrowserNetworkError = (error)=>{
    const errorMessages = new Set([
        "Failed to fetch",
        "NetworkError when attempting to fetch resource",
        "The Internet connection appears to be offline",
        "Load failed",
        "Network request failed"
    ]);
    const isValid = error && error instanceof TypeError;
    if (!isValid) {
        return false;
    }
    return errorMessages.has(error.message);
};
const isThrottlingError = (error)=>error.$metadata?.httpStatusCode === 429 || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["THROTTLING_ERROR_CODES"].includes(error.name) || error.$retryable?.throttling == true;
const isTransientError = (error, depth = 0)=>isClockSkewCorrectedError(error) || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRANSIENT_ERROR_CODES"].includes(error.name) || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODEJS_TIMEOUT_ERROR_CODES"].includes(error?.code || "") || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODEJS_NETWORK_ERROR_CODES"].includes(error?.code || "") || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TRANSIENT_ERROR_STATUS_CODES"].includes(error.$metadata?.httpStatusCode || 0) || isBrowserNetworkError(error) || error.cause !== undefined && depth <= 10 && isTransientError(error.cause, depth + 1);
const isServerError = (error)=>{
    if (error.$metadata?.httpStatusCode !== undefined) {
        const statusCode = error.$metadata.httpStatusCode;
        if (500 <= statusCode && statusCode <= 599 && !isTransientError(error)) {
            return true;
        }
        return false;
    }
    return false;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoOpLogger",
    ()=>NoOpLogger
]);
class NoOpLogger {
    trace() {}
    debug() {}
    info() {}
    warn() {}
    error() {}
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_RETRY_DELAY_BASE",
    ()=>DEFAULT_RETRY_DELAY_BASE,
    "INITIAL_RETRY_TOKENS",
    ()=>INITIAL_RETRY_TOKENS,
    "INVOCATION_ID_HEADER",
    ()=>INVOCATION_ID_HEADER,
    "MAXIMUM_RETRY_DELAY",
    ()=>MAXIMUM_RETRY_DELAY,
    "NO_RETRY_INCREMENT",
    ()=>NO_RETRY_INCREMENT,
    "REQUEST_HEADER",
    ()=>REQUEST_HEADER,
    "RETRY_COST",
    ()=>RETRY_COST,
    "THROTTLING_RETRY_DELAY_BASE",
    ()=>THROTTLING_RETRY_DELAY_BASE,
    "TIMEOUT_RETRY_COST",
    ()=>TIMEOUT_RETRY_COST
]);
const DEFAULT_RETRY_DELAY_BASE = 100;
const MAXIMUM_RETRY_DELAY = 20 * 1000;
const THROTTLING_RETRY_DELAY_BASE = 500;
const INITIAL_RETRY_TOKENS = 500;
const RETRY_COST = 5;
const TIMEOUT_RETRY_COST = 10;
const NO_RETRY_INCREMENT = 1;
const INVOCATION_ID_HEADER = "amz-sdk-invocation-id";
const REQUEST_HEADER = "amz-sdk-request";
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/native.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const __TURBOPACK__default__export__ = {
    randomUUID: __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomUUID
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/rng.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>rng
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let poolPtr = rnds8Pool.length;
function rng() {
    if (poolPtr > rnds8Pool.length - 16) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomFillSync(rnds8Pool);
        poolPtr = 0;
    }
    return rnds8Pool.slice(poolPtr, poolPtr += 16);
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/regex.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/regex.js [app-route] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$regex$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "unsafeStringify",
    ()=>unsafeStringify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/validate.js [app-route] (ecmascript)");
;
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const byteToHex = [];
for(let i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
function stringify(arr, offset = 0) {
    const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$native$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/native.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/rng.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/stringify.js [app-route] (ecmascript)");
;
;
;
function v4(options, buf, offset) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$native$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].randomUUID && !buf && !options) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$native$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$rng$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$stringify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unsafeStringify"])(rnds);
}
const __TURBOPACK__default__export__ = v4;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript) <export default as v4>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "v4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isStreamingPayload",
    ()=>isStreamingPayload
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
;
const isStreamingPayload = (request)=>request?.body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Readable"] || typeof ReadableStream !== "undefined" && request?.body instanceof ReadableStream;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/util.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "asSdkError",
    ()=>asSdkError
]);
const asSdkError = (error)=>{
    if (error instanceof Error) return error;
    if (error instanceof Object) return Object.assign(new Error(), error);
    if (typeof error === "string") return new Error(error);
    return new Error(`AWS SDK error wrapper for ${error}`);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRetryAfterHint",
    ()=>getRetryAfterHint,
    "getRetryPlugin",
    ()=>getRetryPlugin,
    "retryMiddleware",
    ()=>retryMiddleware,
    "retryMiddlewareOptions",
    ()=>retryMiddlewareOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpResponse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpResponse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/service-error-classification/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/uuid/dist/esm-node/v4.js [app-route] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$isStreamingPayload$2f$isStreamingPayload$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/isStreamingPayload/isStreamingPayload.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/util.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const retryMiddleware = (options)=>(next, context)=>async (args)=>{
            let retryStrategy = await options.retryStrategy();
            const maxAttempts = await options.maxAttempts();
            if (isRetryStrategyV2(retryStrategy)) {
                retryStrategy = retryStrategy;
                let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
                let lastError = new Error();
                let attempts = 0;
                let totalRetryDelay = 0;
                const { request } = args;
                const isRequest = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].isInstance(request);
                if (isRequest) {
                    request.headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["INVOCATION_ID_HEADER"]] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
                }
                while(true){
                    try {
                        if (isRequest) {
                            request.headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["REQUEST_HEADER"]] = `attempt=${attempts + 1}; max=${maxAttempts}`;
                        }
                        const { response, output } = await next(args);
                        retryStrategy.recordSuccess(retryToken);
                        output.$metadata.attempts = attempts + 1;
                        output.$metadata.totalRetryDelay = totalRetryDelay;
                        return {
                            response,
                            output
                        };
                    } catch (e) {
                        const retryErrorInfo = getRetryErrorInfo(e);
                        lastError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asSdkError"])(e);
                        if (isRequest && (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$isStreamingPayload$2f$isStreamingPayload$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isStreamingPayload"])(request)) {
                            (context.logger instanceof __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoOpLogger"] ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
                            throw lastError;
                        }
                        try {
                            retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
                        } catch (refreshError) {
                            if (!lastError.$metadata) {
                                lastError.$metadata = {};
                            }
                            lastError.$metadata.attempts = attempts + 1;
                            lastError.$metadata.totalRetryDelay = totalRetryDelay;
                            throw lastError;
                        }
                        attempts = retryToken.getRetryCount();
                        const delay = retryToken.getRetryDelay();
                        totalRetryDelay += delay;
                        await new Promise((resolve)=>setTimeout(resolve, delay));
                    }
                }
            } else {
                retryStrategy = retryStrategy;
                if (retryStrategy?.mode) context.userAgent = [
                    ...context.userAgent || [],
                    [
                        "cfg/retry-mode",
                        retryStrategy.mode
                    ]
                ];
                return retryStrategy.retry(next, args);
            }
        };
const isRetryStrategyV2 = (retryStrategy)=>typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined";
const getRetryErrorInfo = (error)=>{
    const errorInfo = {
        error,
        errorType: getRetryErrorType(error)
    };
    const retryAfterHint = getRetryAfterHint(error.$response);
    if (retryAfterHint) {
        errorInfo.retryAfterHint = retryAfterHint;
    }
    return errorInfo;
};
const getRetryErrorType = (error)=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isThrottlingError"])(error)) return "THROTTLING";
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isTransientError"])(error)) return "TRANSIENT";
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isServerError"])(error)) return "SERVER_ERROR";
    return "CLIENT_ERROR";
};
const retryMiddlewareOptions = {
    name: "retryMiddleware",
    tags: [
        "RETRY"
    ],
    step: "finalizeRequest",
    priority: "high",
    override: true
};
const getRetryPlugin = (options)=>({
        applyToStack: (clientStack)=>{
            clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
        }
    });
const getRetryAfterHint = (response)=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpResponse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpResponse"].isInstance(response)) return;
    const retryAfterHeaderName = Object.keys(response.headers).find((key)=>key.toLowerCase() === "retry-after");
    if (!retryAfterHeaderName) return;
    const retryAfter = response.headers[retryAfterHeaderName];
    const retryAfterSeconds = Number(retryAfter);
    if (!Number.isNaN(retryAfterSeconds)) return new Date(retryAfterSeconds * 1000);
    const retryAfterDate = new Date(retryAfter);
    return retryAfterDate;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/config.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_MAX_ATTEMPTS",
    ()=>DEFAULT_MAX_ATTEMPTS,
    "DEFAULT_RETRY_MODE",
    ()=>DEFAULT_RETRY_MODE,
    "RETRY_MODES",
    ()=>RETRY_MODES
]);
var RETRY_MODES;
(function(RETRY_MODES) {
    RETRY_MODES["STANDARD"] = "standard";
    RETRY_MODES["ADAPTIVE"] = "adaptive";
})(RETRY_MODES || (RETRY_MODES = {}));
const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_RETRY_MODE = RETRY_MODES.STANDARD;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultRateLimiter",
    ()=>DefaultRateLimiter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/service-error-classification/dist-es/index.js [app-route] (ecmascript)");
;
class DefaultRateLimiter {
    constructor(options){
        this.currentCapacity = 0;
        this.enabled = false;
        this.lastMaxRate = 0;
        this.measuredTxRate = 0;
        this.requestCount = 0;
        this.lastTimestamp = 0;
        this.timeWindow = 0;
        this.beta = options?.beta ?? 0.7;
        this.minCapacity = options?.minCapacity ?? 1;
        this.minFillRate = options?.minFillRate ?? 0.5;
        this.scaleConstant = options?.scaleConstant ?? 0.4;
        this.smooth = options?.smooth ?? 0.8;
        const currentTimeInSeconds = this.getCurrentTimeInSeconds();
        this.lastThrottleTime = currentTimeInSeconds;
        this.lastTxRateBucket = Math.floor(this.getCurrentTimeInSeconds());
        this.fillRate = this.minFillRate;
        this.maxCapacity = this.minCapacity;
    }
    getCurrentTimeInSeconds() {
        return Date.now() / 1000;
    }
    async getSendToken() {
        return this.acquireTokenBucket(1);
    }
    async acquireTokenBucket(amount) {
        if (!this.enabled) {
            return;
        }
        this.refillTokenBucket();
        if (amount > this.currentCapacity) {
            const delay = (amount - this.currentCapacity) / this.fillRate * 1000;
            await new Promise((resolve)=>DefaultRateLimiter.setTimeoutFn(resolve, delay));
        }
        this.currentCapacity = this.currentCapacity - amount;
    }
    refillTokenBucket() {
        const timestamp = this.getCurrentTimeInSeconds();
        if (!this.lastTimestamp) {
            this.lastTimestamp = timestamp;
            return;
        }
        const fillAmount = (timestamp - this.lastTimestamp) * this.fillRate;
        this.currentCapacity = Math.min(this.maxCapacity, this.currentCapacity + fillAmount);
        this.lastTimestamp = timestamp;
    }
    updateClientSendingRate(response) {
        let calculatedRate;
        this.updateMeasuredRate();
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$service$2d$error$2d$classification$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isThrottlingError"])(response)) {
            const rateToUse = !this.enabled ? this.measuredTxRate : Math.min(this.measuredTxRate, this.fillRate);
            this.lastMaxRate = rateToUse;
            this.calculateTimeWindow();
            this.lastThrottleTime = this.getCurrentTimeInSeconds();
            calculatedRate = this.cubicThrottle(rateToUse);
            this.enableTokenBucket();
        } else {
            this.calculateTimeWindow();
            calculatedRate = this.cubicSuccess(this.getCurrentTimeInSeconds());
        }
        const newRate = Math.min(calculatedRate, 2 * this.measuredTxRate);
        this.updateTokenBucketRate(newRate);
    }
    calculateTimeWindow() {
        this.timeWindow = this.getPrecise(Math.pow(this.lastMaxRate * (1 - this.beta) / this.scaleConstant, 1 / 3));
    }
    cubicThrottle(rateToUse) {
        return this.getPrecise(rateToUse * this.beta);
    }
    cubicSuccess(timestamp) {
        return this.getPrecise(this.scaleConstant * Math.pow(timestamp - this.lastThrottleTime - this.timeWindow, 3) + this.lastMaxRate);
    }
    enableTokenBucket() {
        this.enabled = true;
    }
    updateTokenBucketRate(newRate) {
        this.refillTokenBucket();
        this.fillRate = Math.max(newRate, this.minFillRate);
        this.maxCapacity = Math.max(newRate, this.minCapacity);
        this.currentCapacity = Math.min(this.currentCapacity, this.maxCapacity);
    }
    updateMeasuredRate() {
        const t = this.getCurrentTimeInSeconds();
        const timeBucket = Math.floor(t * 2) / 2;
        this.requestCount++;
        if (timeBucket > this.lastTxRateBucket) {
            const currentRate = this.requestCount / (timeBucket - this.lastTxRateBucket);
            this.measuredTxRate = this.getPrecise(currentRate * this.smooth + this.measuredTxRate * (1 - this.smooth));
            this.requestCount = 0;
            this.lastTxRateBucket = timeBucket;
        }
    }
    getPrecise(num) {
        return parseFloat(num.toFixed(8));
    }
}
DefaultRateLimiter.setTimeoutFn = setTimeout;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultRetryBackoffStrategy",
    ()=>getDefaultRetryBackoffStrategy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/constants.js [app-route] (ecmascript)");
;
const getDefaultRetryBackoffStrategy = ()=>{
    let delayBase = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_RETRY_DELAY_BASE"];
    const computeNextBackoffDelay = (attempts)=>{
        return Math.floor(Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAXIMUM_RETRY_DELAY"], Math.random() * 2 ** attempts * delayBase));
    };
    const setDelayBase = (delay)=>{
        delayBase = delay;
    };
    return {
        computeNextBackoffDelay,
        setDelayBase
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDefaultRetryToken",
    ()=>createDefaultRetryToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/constants.js [app-route] (ecmascript)");
;
const createDefaultRetryToken = ({ retryDelay, retryCount, retryCost })=>{
    const getRetryCount = ()=>retryCount;
    const getRetryDelay = ()=>Math.min(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAXIMUM_RETRY_DELAY"], retryDelay);
    const getRetryCost = ()=>retryCost;
    return {
        getRetryCount,
        getRetryDelay,
        getRetryCost
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StandardRetryStrategy",
    ()=>StandardRetryStrategy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$defaultRetryBackoffStrategy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/defaultRetryBackoffStrategy.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$defaultRetryToken$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/defaultRetryToken.js [app-route] (ecmascript)");
;
;
;
;
class StandardRetryStrategy {
    constructor(maxAttempts){
        this.maxAttempts = maxAttempts;
        this.mode = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RETRY_MODES"].STANDARD;
        this.capacity = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["INITIAL_RETRY_TOKENS"];
        this.retryBackoffStrategy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$defaultRetryBackoffStrategy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultRetryBackoffStrategy"])();
        this.maxAttemptsProvider = typeof maxAttempts === "function" ? maxAttempts : async ()=>maxAttempts;
    }
    async acquireInitialRetryToken(retryTokenScope) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$defaultRetryToken$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDefaultRetryToken"])({
            retryDelay: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_RETRY_DELAY_BASE"],
            retryCount: 0
        });
    }
    async refreshRetryTokenForRetry(token, errorInfo) {
        const maxAttempts = await this.getMaxAttempts();
        if (this.shouldRetry(token, errorInfo, maxAttempts)) {
            const errorType = errorInfo.errorType;
            this.retryBackoffStrategy.setDelayBase(errorType === "THROTTLING" ? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["THROTTLING_RETRY_DELAY_BASE"] : __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_RETRY_DELAY_BASE"]);
            const delayFromErrorType = this.retryBackoffStrategy.computeNextBackoffDelay(token.getRetryCount());
            const retryDelay = errorInfo.retryAfterHint ? Math.max(errorInfo.retryAfterHint.getTime() - Date.now() || 0, delayFromErrorType) : delayFromErrorType;
            const capacityCost = this.getCapacityCost(errorType);
            this.capacity -= capacityCost;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$defaultRetryToken$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDefaultRetryToken"])({
                retryDelay,
                retryCount: token.getRetryCount() + 1,
                retryCost: capacityCost
            });
        }
        throw new Error("No retry token available");
    }
    recordSuccess(token) {
        this.capacity = Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["INITIAL_RETRY_TOKENS"], this.capacity + (token.getRetryCost() ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NO_RETRY_INCREMENT"]));
    }
    getCapacity() {
        return this.capacity;
    }
    async getMaxAttempts() {
        try {
            return await this.maxAttemptsProvider();
        } catch (error) {
            console.warn(`Max attempts provider could not resolve. Using default of ${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MAX_ATTEMPTS"]}`);
            return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MAX_ATTEMPTS"];
        }
    }
    shouldRetry(tokenToRenew, errorInfo, maxAttempts) {
        const attempts = tokenToRenew.getRetryCount() + 1;
        return attempts < maxAttempts && this.capacity >= this.getCapacityCost(errorInfo.errorType) && this.isRetryableError(errorInfo.errorType);
    }
    getCapacityCost(errorType) {
        return errorType === "TRANSIENT" ? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TIMEOUT_RETRY_COST"] : __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RETRY_COST"];
    }
    isRetryableError(errorType) {
        return errorType === "THROTTLING" || errorType === "TRANSIENT";
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdaptiveRetryStrategy",
    ()=>AdaptiveRetryStrategy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$DefaultRateLimiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/DefaultRateLimiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$StandardRetryStrategy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js [app-route] (ecmascript)");
;
;
;
class AdaptiveRetryStrategy {
    constructor(maxAttemptsProvider, options){
        this.maxAttemptsProvider = maxAttemptsProvider;
        this.mode = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RETRY_MODES"].ADAPTIVE;
        const { rateLimiter } = options ?? {};
        this.rateLimiter = rateLimiter ?? new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$DefaultRateLimiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultRateLimiter"]();
        this.standardRetryStrategy = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$StandardRetryStrategy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StandardRetryStrategy"](maxAttemptsProvider);
    }
    async acquireInitialRetryToken(retryTokenScope) {
        await this.rateLimiter.getSendToken();
        return this.standardRetryStrategy.acquireInitialRetryToken(retryTokenScope);
    }
    async refreshRetryTokenForRetry(tokenToRenew, errorInfo) {
        this.rateLimiter.updateClientSendingRate(errorInfo);
        return this.standardRetryStrategy.refreshRetryTokenForRetry(tokenToRenew, errorInfo);
    }
    recordSuccess(token) {
        this.rateLimiter.updateClientSendingRate({});
        this.standardRetryStrategy.recordSuccess(token);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/configurations.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONFIG_MAX_ATTEMPTS",
    ()=>CONFIG_MAX_ATTEMPTS,
    "CONFIG_RETRY_MODE",
    ()=>CONFIG_RETRY_MODE,
    "ENV_MAX_ATTEMPTS",
    ()=>ENV_MAX_ATTEMPTS,
    "ENV_RETRY_MODE",
    ()=>ENV_RETRY_MODE,
    "NODE_MAX_ATTEMPT_CONFIG_OPTIONS",
    ()=>NODE_MAX_ATTEMPT_CONFIG_OPTIONS,
    "NODE_RETRY_MODE_CONFIG_OPTIONS",
    ()=>NODE_RETRY_MODE_CONFIG_OPTIONS,
    "resolveRetryConfig",
    ()=>resolveRetryConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$AdaptiveRetryStrategy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/AdaptiveRetryStrategy.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$StandardRetryStrategy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/StandardRetryStrategy.js [app-route] (ecmascript)");
;
;
const ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
const CONFIG_MAX_ATTEMPTS = "max_attempts";
const NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env)=>{
        const value = env[ENV_MAX_ATTEMPTS];
        if (!value) return undefined;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error(`Environment variable ${ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
    },
    configFileSelector: (profile)=>{
        const value = profile[CONFIG_MAX_ATTEMPTS];
        if (!value) return undefined;
        const maxAttempt = parseInt(value);
        if (Number.isNaN(maxAttempt)) {
            throw new Error(`Shared config file entry ${CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
        }
        return maxAttempt;
    },
    default: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MAX_ATTEMPTS"]
};
const resolveRetryConfig = (input)=>{
    const { retryStrategy, retryMode: _retryMode, maxAttempts: _maxAttempts } = input;
    const maxAttempts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(_maxAttempts ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_MAX_ATTEMPTS"]);
    return Object.assign(input, {
        maxAttempts,
        retryStrategy: async ()=>{
            if (retryStrategy) {
                return retryStrategy;
            }
            const retryMode = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(_retryMode)();
            if (retryMode === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RETRY_MODES"].ADAPTIVE) {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$AdaptiveRetryStrategy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AdaptiveRetryStrategy"](maxAttempts);
            }
            return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$StandardRetryStrategy$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StandardRetryStrategy"](maxAttempts);
        }
    });
};
const ENV_RETRY_MODE = "AWS_RETRY_MODE";
const CONFIG_RETRY_MODE = "retry_mode";
const NODE_RETRY_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env)=>env[ENV_RETRY_MODE],
    configFileSelector: (profile)=>profile[CONFIG_RETRY_MODE],
    default: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_RETRY_MODE"]
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-stack/dist-es/MiddlewareStack.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "constructStack",
    ()=>constructStack
]);
const getAllAliases = (name, aliases)=>{
    const _aliases = [];
    if (name) {
        _aliases.push(name);
    }
    if (aliases) {
        for (const alias of aliases){
            _aliases.push(alias);
        }
    }
    return _aliases;
};
const getMiddlewareNameWithAliases = (name, aliases)=>{
    return `${name || "anonymous"}${aliases && aliases.length > 0 ? ` (a.k.a. ${aliases.join(",")})` : ""}`;
};
const constructStack = ()=>{
    let absoluteEntries = [];
    let relativeEntries = [];
    let identifyOnResolve = false;
    const entriesNameSet = new Set();
    const sort = (entries)=>entries.sort((a, b)=>stepWeights[b.step] - stepWeights[a.step] || priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"]);
    const removeByName = (toRemove)=>{
        let isRemoved = false;
        const filterCb = (entry)=>{
            const aliases = getAllAliases(entry.name, entry.aliases);
            if (aliases.includes(toRemove)) {
                isRemoved = true;
                for (const alias of aliases){
                    entriesNameSet.delete(alias);
                }
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    const removeByReference = (toRemove)=>{
        let isRemoved = false;
        const filterCb = (entry)=>{
            if (entry.middleware === toRemove) {
                isRemoved = true;
                for (const alias of getAllAliases(entry.name, entry.aliases)){
                    entriesNameSet.delete(alias);
                }
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    const cloneTo = (toStack)=>{
        absoluteEntries.forEach((entry)=>{
            toStack.add(entry.middleware, {
                ...entry
            });
        });
        relativeEntries.forEach((entry)=>{
            toStack.addRelativeTo(entry.middleware, {
                ...entry
            });
        });
        toStack.identifyOnResolve?.(stack.identifyOnResolve());
        return toStack;
    };
    const expandRelativeMiddlewareList = (from)=>{
        const expandedMiddlewareList = [];
        from.before.forEach((entry)=>{
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            } else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        expandedMiddlewareList.push(from);
        from.after.reverse().forEach((entry)=>{
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            } else {
                expandedMiddlewareList.push(...expandRelativeMiddlewareList(entry));
            }
        });
        return expandedMiddlewareList;
    };
    const getMiddlewareList = (debug = false)=>{
        const normalizedAbsoluteEntries = [];
        const normalizedRelativeEntries = [];
        const normalizedEntriesNameMap = {};
        absoluteEntries.forEach((entry)=>{
            const normalizedEntry = {
                ...entry,
                before: [],
                after: []
            };
            for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)){
                normalizedEntriesNameMap[alias] = normalizedEntry;
            }
            normalizedAbsoluteEntries.push(normalizedEntry);
        });
        relativeEntries.forEach((entry)=>{
            const normalizedEntry = {
                ...entry,
                before: [],
                after: []
            };
            for (const alias of getAllAliases(normalizedEntry.name, normalizedEntry.aliases)){
                normalizedEntriesNameMap[alias] = normalizedEntry;
            }
            normalizedRelativeEntries.push(normalizedEntry);
        });
        normalizedRelativeEntries.forEach((entry)=>{
            if (entry.toMiddleware) {
                const toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
                if (toMiddleware === undefined) {
                    if (debug) {
                        return;
                    }
                    throw new Error(`${entry.toMiddleware} is not found when adding ` + `${getMiddlewareNameWithAliases(entry.name, entry.aliases)} ` + `middleware ${entry.relation} ${entry.toMiddleware}`);
                }
                if (entry.relation === "after") {
                    toMiddleware.after.push(entry);
                }
                if (entry.relation === "before") {
                    toMiddleware.before.push(entry);
                }
            }
        });
        const mainChain = sort(normalizedAbsoluteEntries).map(expandRelativeMiddlewareList).reduce((wholeList, expandedMiddlewareList)=>{
            wholeList.push(...expandedMiddlewareList);
            return wholeList;
        }, []);
        return mainChain;
    };
    const stack = {
        add: (middleware, options = {})=>{
            const { name, override, aliases: _aliases } = options;
            const entry = {
                step: "initialize",
                priority: "normal",
                middleware,
                ...options
            };
            const aliases = getAllAliases(name, _aliases);
            if (aliases.length > 0) {
                if (aliases.some((alias)=>entriesNameSet.has(alias))) {
                    if (!override) throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
                    for (const alias of aliases){
                        const toOverrideIndex = absoluteEntries.findIndex((entry)=>entry.name === alias || entry.aliases?.some((a)=>a === alias));
                        if (toOverrideIndex === -1) {
                            continue;
                        }
                        const toOverride = absoluteEntries[toOverrideIndex];
                        if (toOverride.step !== entry.step || entry.priority !== toOverride.priority) {
                            throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware with ` + `${toOverride.priority} priority in ${toOverride.step} step cannot ` + `be overridden by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware with ` + `${entry.priority} priority in ${entry.step} step.`);
                        }
                        absoluteEntries.splice(toOverrideIndex, 1);
                    }
                }
                for (const alias of aliases){
                    entriesNameSet.add(alias);
                }
            }
            absoluteEntries.push(entry);
        },
        addRelativeTo: (middleware, options)=>{
            const { name, override, aliases: _aliases } = options;
            const entry = {
                middleware,
                ...options
            };
            const aliases = getAllAliases(name, _aliases);
            if (aliases.length > 0) {
                if (aliases.some((alias)=>entriesNameSet.has(alias))) {
                    if (!override) throw new Error(`Duplicate middleware name '${getMiddlewareNameWithAliases(name, _aliases)}'`);
                    for (const alias of aliases){
                        const toOverrideIndex = relativeEntries.findIndex((entry)=>entry.name === alias || entry.aliases?.some((a)=>a === alias));
                        if (toOverrideIndex === -1) {
                            continue;
                        }
                        const toOverride = relativeEntries[toOverrideIndex];
                        if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                            throw new Error(`"${getMiddlewareNameWithAliases(toOverride.name, toOverride.aliases)}" middleware ` + `${toOverride.relation} "${toOverride.toMiddleware}" middleware cannot be overridden ` + `by "${getMiddlewareNameWithAliases(name, _aliases)}" middleware ${entry.relation} ` + `"${entry.toMiddleware}" middleware.`);
                        }
                        relativeEntries.splice(toOverrideIndex, 1);
                    }
                }
                for (const alias of aliases){
                    entriesNameSet.add(alias);
                }
            }
            relativeEntries.push(entry);
        },
        clone: ()=>cloneTo(constructStack()),
        use: (plugin)=>{
            plugin.applyToStack(stack);
        },
        remove: (toRemove)=>{
            if (typeof toRemove === "string") return removeByName(toRemove);
            else return removeByReference(toRemove);
        },
        removeByTag: (toRemove)=>{
            let isRemoved = false;
            const filterCb = (entry)=>{
                const { tags, name, aliases: _aliases } = entry;
                if (tags && tags.includes(toRemove)) {
                    const aliases = getAllAliases(name, _aliases);
                    for (const alias of aliases){
                        entriesNameSet.delete(alias);
                    }
                    isRemoved = true;
                    return false;
                }
                return true;
            };
            absoluteEntries = absoluteEntries.filter(filterCb);
            relativeEntries = relativeEntries.filter(filterCb);
            return isRemoved;
        },
        concat: (from)=>{
            const cloned = cloneTo(constructStack());
            cloned.use(from);
            cloned.identifyOnResolve(identifyOnResolve || cloned.identifyOnResolve() || (from.identifyOnResolve?.() ?? false));
            return cloned;
        },
        applyToStack: cloneTo,
        identify: ()=>{
            return getMiddlewareList(true).map((mw)=>{
                const step = mw.step ?? mw.relation + " " + mw.toMiddleware;
                return getMiddlewareNameWithAliases(mw.name, mw.aliases) + " - " + step;
            });
        },
        identifyOnResolve (toggle) {
            if (typeof toggle === "boolean") identifyOnResolve = toggle;
            return identifyOnResolve;
        },
        resolve: (handler, context)=>{
            for (const middleware of getMiddlewareList().map((entry)=>entry.middleware).reverse()){
                handler = middleware(handler, context);
            }
            if (identifyOnResolve) {
                console.log(stack.identify());
            }
            return handler;
        }
    };
    return stack;
};
const stepWeights = {
    initialize: 5,
    serialize: 4,
    build: 3,
    finalizeRequest: 2,
    deserialize: 1
};
const priorityWeights = {
    high: 3,
    normal: 2,
    low: 1
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/client.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Client",
    ()=>Client
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$stack$2f$dist$2d$es$2f$MiddlewareStack$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-stack/dist-es/MiddlewareStack.js [app-route] (ecmascript)");
;
class Client {
    constructor(config){
        this.config = config;
        this.middlewareStack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$stack$2f$dist$2d$es$2f$MiddlewareStack$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["constructStack"])();
    }
    send(command, optionsOrCb, cb) {
        const options = typeof optionsOrCb !== "function" ? optionsOrCb : undefined;
        const callback = typeof optionsOrCb === "function" ? optionsOrCb : cb;
        const useHandlerCache = options === undefined && this.config.cacheMiddleware === true;
        let handler;
        if (useHandlerCache) {
            if (!this.handlers) {
                this.handlers = new WeakMap();
            }
            const handlers = this.handlers;
            if (handlers.has(command.constructor)) {
                handler = handlers.get(command.constructor);
            } else {
                handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
                handlers.set(command.constructor, handler);
            }
        } else {
            delete this.handlers;
            handler = command.resolveMiddleware(this.middlewareStack, this.config, options);
        }
        if (callback) {
            handler(command).then((result)=>callback(null, result.output), (err)=>callback(err)).catch(()=>{});
        } else {
            return handler(command).then((result)=>result.output);
        }
    }
    destroy() {
        this.config?.requestHandler?.destroy?.();
        delete this.handlers;
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setCredentialFeature",
    ()=>setCredentialFeature
]);
function setCredentialFeature(credentials, feature, value) {
    if (!credentials.$source) {
        credentials.$source = {};
    }
    credentials.$source[feature] = value;
    return credentials;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/util-identity-and-auth/memoizeIdentityProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EXPIRATION_MS",
    ()=>EXPIRATION_MS,
    "createIsIdentityExpiredFunction",
    ()=>createIsIdentityExpiredFunction,
    "doesIdentityRequireRefresh",
    ()=>doesIdentityRequireRefresh,
    "isIdentityExpired",
    ()=>isIdentityExpired,
    "memoizeIdentityProvider",
    ()=>memoizeIdentityProvider
]);
const createIsIdentityExpiredFunction = (expirationMs)=>(identity)=>doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs;
const EXPIRATION_MS = 300000;
const isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
const doesIdentityRequireRefresh = (identity)=>identity.expiration !== undefined;
const memoizeIdentityProvider = (provider, isExpired, requiresRefresh)=>{
    if (provider === undefined) {
        return undefined;
    }
    const normalizedProvider = typeof provider !== "function" ? async ()=>Promise.resolve(provider) : provider;
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = async (options)=>{
        if (!pending) {
            pending = normalizedProvider(options);
        }
        try {
            resolved = await pending;
            hasResult = true;
            isConstant = false;
        } finally{
            pending = undefined;
        }
        return resolved;
    };
    if (isExpired === undefined) {
        return async (options)=>{
            if (!hasResult || options?.forceRefresh) {
                resolved = await coalesceProvider(options);
            }
            return resolved;
        };
    }
    return async (options)=>{
        if (!hasResult || options?.forceRefresh) {
            resolved = await coalesceProvider(options);
        }
        if (isConstant) {
            return resolved;
        }
        if (!requiresRefresh(resolved)) {
            isConstant = true;
            return resolved;
        }
        if (isExpired(resolved)) {
            await coalesceProvider(options);
            return resolved;
        }
        return resolved;
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-hex-encoding/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromHex",
    ()=>fromHex,
    "toHex",
    ()=>toHex
]);
const SHORT_TO_HEX = {};
const HEX_TO_SHORT = {};
for(let i = 0; i < 256; i++){
    let encodedByte = i.toString(16).toLowerCase();
    if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
    }
    SHORT_TO_HEX[i] = encodedByte;
    HEX_TO_SHORT[encodedByte] = i;
}
function fromHex(encoded) {
    if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
    }
    const out = new Uint8Array(encoded.length / 2);
    for(let i = 0; i < encoded.length; i += 2){
        const encodedByte = encoded.slice(i, i + 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
            out[i / 2] = HEX_TO_SHORT[encodedByte];
        } else {
            throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
        }
    }
    return out;
}
function toHex(bytes) {
    let out = "";
    for(let i = 0; i < bytes.byteLength; i++){
        out += SHORT_TO_HEX[bytes[i]];
    }
    return out;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/is-array-buffer/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isArrayBuffer",
    ()=>isArrayBuffer
]);
const isArrayBuffer = (arg)=>typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]";
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-buffer-from/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromArrayBuffer",
    ()=>fromArrayBuffer,
    "fromString",
    ()=>fromString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$is$2d$array$2d$buffer$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/is-array-buffer/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
;
;
const fromArrayBuffer = (input, offset = 0, length = input.byteLength - offset)=>{
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$is$2d$array$2d$buffer$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArrayBuffer"])(input)) {
        throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
    }
    return __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(input, offset, length);
};
const fromString = (input, encoding)=>{
    if (typeof input !== "string") {
        throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
    }
    return encoding ? __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(input, encoding) : __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].from(input);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromUtf8",
    ()=>fromUtf8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-buffer-from/dist-es/index.js [app-route] (ecmascript)");
;
const fromUtf8 = (input)=>{
    const buf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromString"])(input, "utf8");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toUint8Array",
    ()=>toUint8Array
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)");
;
const toUint8Array = (data)=>{
    if (typeof data === "string") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"])(data);
    }
    if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }
    return new Uint8Array(data);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALGORITHM_IDENTIFIER",
    ()=>ALGORITHM_IDENTIFIER,
    "ALGORITHM_IDENTIFIER_V4A",
    ()=>ALGORITHM_IDENTIFIER_V4A,
    "ALGORITHM_QUERY_PARAM",
    ()=>ALGORITHM_QUERY_PARAM,
    "ALWAYS_UNSIGNABLE_HEADERS",
    ()=>ALWAYS_UNSIGNABLE_HEADERS,
    "AMZ_DATE_HEADER",
    ()=>AMZ_DATE_HEADER,
    "AMZ_DATE_QUERY_PARAM",
    ()=>AMZ_DATE_QUERY_PARAM,
    "AUTH_HEADER",
    ()=>AUTH_HEADER,
    "CREDENTIAL_QUERY_PARAM",
    ()=>CREDENTIAL_QUERY_PARAM,
    "DATE_HEADER",
    ()=>DATE_HEADER,
    "EVENT_ALGORITHM_IDENTIFIER",
    ()=>EVENT_ALGORITHM_IDENTIFIER,
    "EXPIRES_QUERY_PARAM",
    ()=>EXPIRES_QUERY_PARAM,
    "GENERATED_HEADERS",
    ()=>GENERATED_HEADERS,
    "HOST_HEADER",
    ()=>HOST_HEADER,
    "KEY_TYPE_IDENTIFIER",
    ()=>KEY_TYPE_IDENTIFIER,
    "MAX_CACHE_SIZE",
    ()=>MAX_CACHE_SIZE,
    "MAX_PRESIGNED_TTL",
    ()=>MAX_PRESIGNED_TTL,
    "PROXY_HEADER_PATTERN",
    ()=>PROXY_HEADER_PATTERN,
    "REGION_SET_PARAM",
    ()=>REGION_SET_PARAM,
    "SEC_HEADER_PATTERN",
    ()=>SEC_HEADER_PATTERN,
    "SHA256_HEADER",
    ()=>SHA256_HEADER,
    "SIGNATURE_HEADER",
    ()=>SIGNATURE_HEADER,
    "SIGNATURE_QUERY_PARAM",
    ()=>SIGNATURE_QUERY_PARAM,
    "SIGNED_HEADERS_QUERY_PARAM",
    ()=>SIGNED_HEADERS_QUERY_PARAM,
    "TOKEN_HEADER",
    ()=>TOKEN_HEADER,
    "TOKEN_QUERY_PARAM",
    ()=>TOKEN_QUERY_PARAM,
    "UNSIGNABLE_PATTERNS",
    ()=>UNSIGNABLE_PATTERNS,
    "UNSIGNED_PAYLOAD",
    ()=>UNSIGNED_PAYLOAD
]);
const ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
const CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
const AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
const SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
const EXPIRES_QUERY_PARAM = "X-Amz-Expires";
const SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
const TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
const REGION_SET_PARAM = "X-Amz-Region-Set";
const AUTH_HEADER = "authorization";
const AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
const DATE_HEADER = "date";
const GENERATED_HEADERS = [
    AUTH_HEADER,
    AMZ_DATE_HEADER,
    DATE_HEADER
];
const SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
const SHA256_HEADER = "x-amz-content-sha256";
const TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
const HOST_HEADER = "host";
const ALWAYS_UNSIGNABLE_HEADERS = {
    authorization: true,
    "cache-control": true,
    connection: true,
    expect: true,
    from: true,
    "keep-alive": true,
    "max-forwards": true,
    pragma: true,
    referer: true,
    te: true,
    trailer: true,
    "transfer-encoding": true,
    upgrade: true,
    "user-agent": true,
    "x-amzn-trace-id": true
};
const PROXY_HEADER_PATTERN = /^proxy-/;
const SEC_HEADER_PATTERN = /^sec-/;
const UNSIGNABLE_PATTERNS = [
    /^proxy-/i,
    /^sec-/i
];
const ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
const ALGORITHM_IDENTIFIER_V4A = "AWS4-ECDSA-P256-SHA256";
const EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
const UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
const MAX_CACHE_SIZE = 50;
const KEY_TYPE_IDENTIFIER = "aws4_request";
const MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearCredentialCache",
    ()=>clearCredentialCache,
    "createScope",
    ()=>createScope,
    "getSigningKey",
    ()=>getSigningKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-hex-encoding/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/constants.js [app-route] (ecmascript)");
;
;
;
const signingKeyCache = {};
const cacheQueue = [];
const createScope = (shortDate, region, service)=>`${shortDate}/${region}/${service}/${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KEY_TYPE_IDENTIFIER"]}`;
const getSigningKey = async (sha256Constructor, credentials, shortDate, region, service)=>{
    const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
    const cacheKey = `${shortDate}:${region}:${service}:${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(credsHash)}:${credentials.sessionToken}`;
    if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
    }
    cacheQueue.push(cacheKey);
    while(cacheQueue.length > __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_CACHE_SIZE"]){
        delete signingKeyCache[cacheQueue.shift()];
    }
    let key = `AWS4${credentials.secretAccessKey}`;
    for (const signable of [
        shortDate,
        region,
        service,
        __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KEY_TYPE_IDENTIFIER"]
    ]){
        key = await hmac(sha256Constructor, key, signable);
    }
    return signingKeyCache[cacheKey] = key;
};
const clearCredentialCache = ()=>{
    cacheQueue.length = 0;
    Object.keys(signingKeyCache).forEach((cacheKey)=>{
        delete signingKeyCache[cacheKey];
    });
};
const hmac = (ctor, secret, data)=>{
    const hash = new ctor(secret);
    hash.update((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUint8Array"])(data));
    return hash.digest();
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCanonicalHeaders",
    ()=>getCanonicalHeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/constants.js [app-route] (ecmascript)");
;
const getCanonicalHeaders = ({ headers }, unsignableHeaders, signableHeaders)=>{
    const canonical = {};
    for (const headerName of Object.keys(headers).sort()){
        if (headers[headerName] == undefined) {
            continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ALWAYS_UNSIGNABLE_HEADERS"] || unsignableHeaders?.has(canonicalHeaderName) || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROXY_HEADER_PATTERN"].test(canonicalHeaderName) || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEC_HEADER_PATTERN"].test(canonicalHeaderName)) {
            if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
                continue;
            }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
    }
    return canonical;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getPayloadHash",
    ()=>getPayloadHash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$is$2d$array$2d$buffer$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/is-array-buffer/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-hex-encoding/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/constants.js [app-route] (ecmascript)");
;
;
;
;
const getPayloadHash = async ({ headers, body }, hashConstructor)=>{
    for (const headerName of Object.keys(headers)){
        if (headerName.toLowerCase() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SHA256_HEADER"]) {
            return headers[headerName];
        }
    }
    if (body == undefined) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    } else if (typeof body === "string" || ArrayBuffer.isView(body) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$is$2d$array$2d$buffer$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isArrayBuffer"])(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUint8Array"])(body));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(await hashCtor.digest());
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UNSIGNED_PAYLOAD"];
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeaderFormatter",
    ()=>HeaderFormatter,
    "Int64",
    ()=>Int64
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-hex-encoding/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)");
;
;
class HeaderFormatter {
    format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)){
            const bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"])(headerName);
            chunks.push(Uint8Array.from([
                bytes.byteLength
            ]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes)=>carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks){
            out.set(chunk, position);
            position += chunk.byteLength;
        }
        return out;
    }
    formatHeaderValue(header) {
        switch(header.type){
            case "boolean":
                return Uint8Array.from([
                    header.value ? 0 : 1
                ]);
            case "byte":
                return Uint8Array.from([
                    2,
                    header.value
                ]);
            case "short":
                const shortView = new DataView(new ArrayBuffer(3));
                shortView.setUint8(0, 3);
                shortView.setInt16(1, header.value, false);
                return new Uint8Array(shortView.buffer);
            case "integer":
                const intView = new DataView(new ArrayBuffer(5));
                intView.setUint8(0, 4);
                intView.setInt32(1, header.value, false);
                return new Uint8Array(intView.buffer);
            case "long":
                const longBytes = new Uint8Array(9);
                longBytes[0] = 5;
                longBytes.set(header.value.bytes, 1);
                return longBytes;
            case "binary":
                const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
                binView.setUint8(0, 6);
                binView.setUint16(1, header.value.byteLength, false);
                const binBytes = new Uint8Array(binView.buffer);
                binBytes.set(header.value, 3);
                return binBytes;
            case "string":
                const utf8Bytes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"])(header.value);
                const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
                strView.setUint8(0, 7);
                strView.setUint16(1, utf8Bytes.byteLength, false);
                const strBytes = new Uint8Array(strView.buffer);
                strBytes.set(utf8Bytes, 3);
                return strBytes;
            case "timestamp":
                const tsBytes = new Uint8Array(9);
                tsBytes[0] = 8;
                tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
                return tsBytes;
            case "uuid":
                if (!UUID_PATTERN.test(header.value)) {
                    throw new Error(`Invalid UUID received: ${header.value}`);
                }
                const uuidBytes = new Uint8Array(17);
                uuidBytes[0] = 9;
                uuidBytes.set((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromHex"])(header.value.replace(/\-/g, "")), 1);
                return uuidBytes;
        }
    }
}
var HEADER_VALUE_TYPE;
(function(HEADER_VALUE_TYPE) {
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolTrue"] = 0] = "boolTrue";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["boolFalse"] = 1] = "boolFalse";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byte"] = 2] = "byte";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["short"] = 3] = "short";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["integer"] = 4] = "integer";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["long"] = 5] = "long";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["byteArray"] = 6] = "byteArray";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["string"] = 7] = "string";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["timestamp"] = 8] = "timestamp";
    HEADER_VALUE_TYPE[HEADER_VALUE_TYPE["uuid"] = 9] = "uuid";
})(HEADER_VALUE_TYPE || (HEADER_VALUE_TYPE = {}));
const UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
class Int64 {
    constructor(bytes){
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
            throw new Error("Int64 buffers must be exactly 8 bytes");
        }
    }
    static fromNumber(number) {
        if (number > 9223372036854776000 || number < -9223372036854776000) {
            throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for(let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256){
            bytes[i] = remaining;
        }
        if (number < 0) {
            negate(bytes);
        }
        return new Int64(bytes);
    }
    valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 0b10000000;
        if (negative) {
            negate(bytes);
        }
        return parseInt((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(bytes), 16) * (negative ? -1 : 1);
    }
    toString() {
        return String(this.valueOf());
    }
}
function negate(bytes) {
    for(let i = 0; i < 8; i++){
        bytes[i] ^= 0xff;
    }
    for(let i = 7; i > -1; i--){
        bytes[i]++;
        if (bytes[i] !== 0) break;
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/headerUtil.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteHeader",
    ()=>deleteHeader,
    "getHeaderValue",
    ()=>getHeaderValue,
    "hasHeader",
    ()=>hasHeader
]);
const hasHeader = (soughtHeader, headers)=>{
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)){
        if (soughtHeader === headerName.toLowerCase()) {
            return true;
        }
    }
    return false;
};
const getHeaderValue = (soughtHeader, headers)=>{
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)){
        if (soughtHeader === headerName.toLowerCase()) {
            return headers[headerName];
        }
    }
    return undefined;
};
const deleteHeader = (soughtHeader, headers)=>{
    soughtHeader = soughtHeader.toLowerCase();
    for (const headerName of Object.keys(headers)){
        if (soughtHeader === headerName.toLowerCase()) {
            delete headers[headerName];
        }
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "moveHeadersToQuery",
    ()=>moveHeadersToQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
;
const moveHeadersToQuery = (request, options = {})=>{
    const { headers, query = {} } = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].clone(request);
    for (const name of Object.keys(headers)){
        const lname = name.toLowerCase();
        if (lname.slice(0, 6) === "x-amz-" && !options.unhoistableHeaders?.has(lname) || options.hoistableHeaders?.has(lname)) {
            query[name] = headers[name];
            delete headers[name];
        }
    }
    return {
        ...request,
        headers,
        query
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/prepareRequest.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prepareRequest",
    ()=>prepareRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/constants.js [app-route] (ecmascript)");
;
;
const prepareRequest = (request)=>{
    request = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].clone(request);
    for (const headerName of Object.keys(request.headers)){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GENERATED_HEADERS"].indexOf(headerName.toLowerCase()) > -1) {
            delete request.headers[headerName];
        }
    }
    return request;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "escapeUri",
    ()=>escapeUri
]);
const escapeUri = (uri)=>encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode);
const hexEncode = (c)=>`%${c.charCodeAt(0).toString(16).toUpperCase()}`;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCanonicalQuery",
    ()=>getCanonicalQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/constants.js [app-route] (ecmascript)");
;
;
const getCanonicalQuery = ({ query = {} })=>{
    const keys = [];
    const serialized = {};
    for (const key of Object.keys(query)){
        if (key.toLowerCase() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIGNATURE_HEADER"]) {
            continue;
        }
        const encodedKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeUri"])(key);
        keys.push(encodedKey);
        const value = query[key];
        if (typeof value === "string") {
            serialized[encodedKey] = `${encodedKey}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeUri"])(value)}`;
        } else if (Array.isArray(value)) {
            serialized[encodedKey] = value.slice(0).reduce((encoded, value)=>encoded.concat([
                    `${encodedKey}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeUri"])(value)}`
                ]), []).sort().join("&");
        }
    }
    return keys.sort().map((key)=>serialized[key]).filter((serialized)=>serialized).join("&");
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/utilDate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "iso8601",
    ()=>iso8601,
    "toDate",
    ()=>toDate
]);
const iso8601 = (time)=>toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z");
const toDate = (time)=>{
    if (typeof time === "number") {
        return new Date(time * 1000);
    }
    if (typeof time === "string") {
        if (Number(time)) {
            return new Date(Number(time) * 1000);
        }
        return new Date(time);
    }
    return time;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignatureV4Base",
    ()=>SignatureV4Base
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-hex-encoding/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getCanonicalQuery$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/getCanonicalQuery.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$utilDate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/utilDate.js [app-route] (ecmascript)");
;
;
;
;
;
;
class SignatureV4Base {
    constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }){
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(region);
        this.credentialProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(credentials);
    }
    createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getCanonicalQuery$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCanonicalQuery"])(request)}
${sortedHeaders.map((name)=>`${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
    }
    async createStringToSign(longDate, credentialScope, canonicalRequest, algorithmIdentifier) {
        const hash = new this.sha256();
        hash.update((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUint8Array"])(canonicalRequest));
        const hashedRequest = await hash.digest();
        return `${algorithmIdentifier}
${longDate}
${credentialScope}
${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(hashedRequest)}`;
    }
    getCanonicalPath({ path }) {
        if (this.uriEscapePath) {
            const normalizedPathSegments = [];
            for (const pathSegment of path.split("/")){
                if (pathSegment?.length === 0) continue;
                if (pathSegment === ".") continue;
                if (pathSegment === "..") {
                    normalizedPathSegments.pop();
                } else {
                    normalizedPathSegments.push(pathSegment);
                }
            }
            const normalizedPath = `${path?.startsWith("/") ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && path?.endsWith("/") ? "/" : ""}`;
            const doubleEncoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeUri"])(normalizedPath);
            return doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
    }
    validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" || typeof credentials.accessKeyId !== "string" || typeof credentials.secretAccessKey !== "string") {
            throw new Error("Resolved credential object is not valid");
        }
    }
    formatDate(now) {
        const longDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$utilDate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["iso8601"])(now).replace(/[\-:]/g, "");
        return {
            longDate,
            shortDate: longDate.slice(0, 8)
        };
    }
    getCanonicalHeaderList(headers) {
        return Object.keys(headers).sort().join(";");
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/SignatureV4.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignatureV4",
    ()=>SignatureV4
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-hex-encoding/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$credentialDerivation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/credentialDerivation.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getCanonicalHeaders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/getCanonicalHeaders.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getPayloadHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/getPayloadHash.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$HeaderFormatter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/HeaderFormatter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$headerUtil$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/headerUtil.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$moveHeadersToQuery$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/moveHeadersToQuery.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$prepareRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/prepareRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$SignatureV4Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/SignatureV4Base.js [app-route] (ecmascript)");
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
class SignatureV4 extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$SignatureV4Base$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignatureV4Base"] {
    constructor({ applyChecksum, credentials, region, service, sha256, uriEscapePath = true }){
        super({
            applyChecksum,
            credentials,
            region,
            service,
            sha256,
            uriEscapePath
        });
        this.headerFormatter = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$HeaderFormatter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HeaderFormatter"]();
    }
    async presign(originalRequest, options = {}) {
        const { signingDate = new Date(), expiresIn = 3600, unsignableHeaders, unhoistableHeaders, signableHeaders, hoistableHeaders, signingRegion, signingService } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { longDate, shortDate } = this.formatDate(signingDate);
        if (expiresIn > __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_PRESIGNED_TTL"]) {
            return Promise.reject("Signature version 4 presigned URLs" + " must have an expiration date less than one week in" + " the future");
        }
        const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$credentialDerivation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createScope"])(shortDate, region, signingService ?? this.service);
        const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$moveHeadersToQuery$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["moveHeadersToQuery"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$prepareRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prepareRequest"])(originalRequest), {
            unhoistableHeaders,
            hoistableHeaders
        });
        if (credentials.sessionToken) {
            request.query[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_QUERY_PARAM"]] = credentials.sessionToken;
        }
        request.query[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ALGORITHM_QUERY_PARAM"]] = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ALGORITHM_IDENTIFIER"];
        request.query[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CREDENTIAL_QUERY_PARAM"]] = `${credentials.accessKeyId}/${scope}`;
        request.query[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AMZ_DATE_QUERY_PARAM"]] = longDate;
        request.query[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EXPIRES_QUERY_PARAM"]] = expiresIn.toString(10);
        const canonicalHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getCanonicalHeaders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCanonicalHeaders"])(request, unsignableHeaders, signableHeaders);
        request.query[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIGNED_HEADERS_QUERY_PARAM"]] = this.getCanonicalHeaderList(canonicalHeaders);
        request.query[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIGNATURE_QUERY_PARAM"]] = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getPayloadHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPayloadHash"])(originalRequest, this.sha256)));
        return request;
    }
    async sign(toSign, options) {
        if (typeof toSign === "string") {
            return this.signString(toSign, options);
        } else if (toSign.headers && toSign.payload) {
            return this.signEvent(toSign, options);
        } else if (toSign.message) {
            return this.signMessage(toSign, options);
        } else {
            return this.signRequest(toSign, options);
        }
    }
    async signEvent({ headers, payload }, { signingDate = new Date(), priorSignature, signingRegion, signingService }) {
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate, longDate } = this.formatDate(signingDate);
        const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$credentialDerivation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createScope"])(shortDate, region, signingService ?? this.service);
        const hashedPayload = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getPayloadHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPayloadHash"])({
            headers: {},
            body: payload
        }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(await hash.digest());
        const stringToSign = [
            __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EVENT_ALGORITHM_IDENTIFIER"],
            longDate,
            scope,
            priorSignature,
            hashedHeaders,
            hashedPayload
        ].join("\n");
        return this.signString(stringToSign, {
            signingDate,
            signingRegion: region,
            signingService
        });
    }
    async signMessage(signableMessage, { signingDate = new Date(), signingRegion, signingService }) {
        const promise = this.signEvent({
            headers: this.headerFormatter.format(signableMessage.message.headers),
            payload: signableMessage.message.body
        }, {
            signingDate,
            signingRegion,
            signingService,
            priorSignature: signableMessage.priorSignature
        });
        return promise.then((signature)=>{
            return {
                message: signableMessage.message,
                signature
            };
        });
    }
    async signString(stringToSign, { signingDate = new Date(), signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate } = this.formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUint8Array"])(stringToSign));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(await hash.digest());
    }
    async signRequest(requestToSign, { signingDate = new Date(), signableHeaders, unsignableHeaders, signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$prepareRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prepareRequest"])(requestToSign);
        const { longDate, shortDate } = this.formatDate(signingDate);
        const scope = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$credentialDerivation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createScope"])(shortDate, region, signingService ?? this.service);
        request.headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AMZ_DATE_HEADER"]] = longDate;
        if (credentials.sessionToken) {
            request.headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_HEADER"]] = credentials.sessionToken;
        }
        const payloadHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getPayloadHash$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPayloadHash"])(request, this.sha256);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$headerUtil$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasHeader"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SHA256_HEADER"], request.headers) && this.applyChecksum) {
            request.headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SHA256_HEADER"]] = payloadHash;
        }
        const canonicalHeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$getCanonicalHeaders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCanonicalHeaders"])(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(longDate, scope, this.getSigningKey(credentials, region, shortDate, signingService), this.createCanonicalRequest(request, canonicalHeaders, payloadHash));
        request.headers[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AUTH_HEADER"]] = `${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ALGORITHM_IDENTIFIER"]} ` + `Credential=${credentials.accessKeyId}/${scope}, ` + `SignedHeaders=${this.getCanonicalHeaderList(canonicalHeaders)}, ` + `Signature=${signature}`;
        return request;
    }
    async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ALGORITHM_IDENTIFIER"]);
        const hash = new this.sha256(await keyPromise);
        hash.update((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUint8Array"])(stringToSign));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(await hash.digest());
    }
    getSigningKey(credentials, region, shortDate, service) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$credentialDerivation$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSigningKey"])(this.sha256, credentials, shortDate, region, service || this.service);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveAWSSDKSigV4Config",
    ()=>resolveAWSSDKSigV4Config,
    "resolveAwsSdkSigV4Config",
    ()=>resolveAwsSdkSigV4Config
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$memoizeIdentityProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/util-identity-and-auth/memoizeIdentityProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/normalizeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$SignatureV4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/signature-v4/dist-es/SignatureV4.js [app-route] (ecmascript)");
;
;
;
const resolveAwsSdkSigV4Config = (config)=>{
    let inputCredentials = config.credentials;
    let isUserSupplied = !!config.credentials;
    let resolvedCredentials = undefined;
    Object.defineProperty(config, "credentials", {
        set (credentials) {
            if (credentials && credentials !== inputCredentials && credentials !== resolvedCredentials) {
                isUserSupplied = true;
            }
            inputCredentials = credentials;
            const memoizedProvider = normalizeCredentialProvider(config, {
                credentials: inputCredentials,
                credentialDefaultProvider: config.credentialDefaultProvider
            });
            const boundProvider = bindCallerConfig(config, memoizedProvider);
            if (isUserSupplied && !boundProvider.attributed) {
                resolvedCredentials = async (options)=>boundProvider(options).then((creds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_CODE", "e"));
                resolvedCredentials.memoized = boundProvider.memoized;
                resolvedCredentials.configBound = boundProvider.configBound;
                resolvedCredentials.attributed = true;
            } else {
                resolvedCredentials = boundProvider;
            }
        },
        get () {
            return resolvedCredentials;
        },
        enumerable: true,
        configurable: true
    });
    config.credentials = inputCredentials;
    const { signingEscapePath = true, systemClockOffset = config.systemClockOffset || 0, sha256 } = config;
    let signer;
    if (config.signer) {
        signer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.signer);
    } else if (config.regionInfoProvider) {
        signer = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.region)().then(async (region)=>[
                    await config.regionInfoProvider(region, {
                        useFipsEndpoint: await config.useFipsEndpoint(),
                        useDualstackEndpoint: await config.useDualstackEndpoint()
                    }) || {},
                    region
                ]).then(([regionInfo, region])=>{
                const { signingRegion, signingService } = regionInfo;
                config.signingRegion = config.signingRegion || signingRegion || region;
                config.signingName = config.signingName || signingService || config.serviceId;
                const params = {
                    ...config,
                    credentials: config.credentials,
                    region: config.signingRegion,
                    service: config.signingName,
                    sha256,
                    uriEscapePath: signingEscapePath
                };
                const SignerCtor = config.signerConstructor || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$SignatureV4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignatureV4"];
                return new SignerCtor(params);
            });
    } else {
        signer = async (authScheme)=>{
            authScheme = Object.assign({}, {
                name: "sigv4",
                signingName: config.signingName || config.defaultSigningName,
                signingRegion: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.region)(),
                properties: {}
            }, authScheme);
            const signingRegion = authScheme.signingRegion;
            const signingService = authScheme.signingName;
            config.signingRegion = config.signingRegion || signingRegion;
            config.signingName = config.signingName || signingService || config.serviceId;
            const params = {
                ...config,
                credentials: config.credentials,
                region: config.signingRegion,
                service: config.signingName,
                sha256,
                uriEscapePath: signingEscapePath
            };
            const SignerCtor = config.signerConstructor || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$signature$2d$v4$2f$dist$2d$es$2f$SignatureV4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignatureV4"];
            return new SignerCtor(params);
        };
    }
    const resolvedConfig = Object.assign(config, {
        systemClockOffset,
        signingEscapePath,
        signer
    });
    return resolvedConfig;
};
const resolveAWSSDKSigV4Config = resolveAwsSdkSigV4Config;
function normalizeCredentialProvider(config, { credentials, credentialDefaultProvider }) {
    let credentialsProvider;
    if (credentials) {
        if (!credentials?.memoized) {
            credentialsProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$memoizeIdentityProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoizeIdentityProvider"])(credentials, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$memoizeIdentityProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isIdentityExpired"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$memoizeIdentityProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["doesIdentityRequireRefresh"]);
        } else {
            credentialsProvider = credentials;
        }
    } else {
        if (credentialDefaultProvider) {
            credentialsProvider = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(credentialDefaultProvider(Object.assign({}, config, {
                parentClientConfig: config
            })));
        } else {
            credentialsProvider = async ()=>{
                throw new Error("@aws-sdk/core::resolveAwsSdkSigV4Config - `credentials` not provided and no credentialDefaultProvider was configured.");
            };
        }
    }
    credentialsProvider.memoized = true;
    return credentialsProvider;
}
function bindCallerConfig(config, credentialsProvider) {
    if (credentialsProvider.configBound) {
        return credentialsProvider;
    }
    const fn = async (options)=>credentialsProvider({
            ...options,
            callerClientConfig: config
        });
    fn.memoized = credentialsProvider.memoized;
    fn.configBound = true;
    return fn;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultSTSHttpAuthSchemeParametersProvider",
    ()=>defaultSTSHttpAuthSchemeParametersProvider,
    "defaultSTSHttpAuthSchemeProvider",
    ()=>defaultSTSHttpAuthSchemeProvider,
    "resolveHttpAuthSchemeConfig",
    ()=>resolveHttpAuthSchemeConfig,
    "resolveStsAuthConfig",
    ()=>resolveStsAuthConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$resolveAwsSdkSigV4Config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js [app-route] (ecmascript) <locals>");
;
;
;
const defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input)=>{
    return {
        operation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSmithyContext"])(context).operation,
        region: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.region)() || (()=>{
            throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
    };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "sts",
            region: authParameters.region
        },
        propertiesExtractor: (config, context)=>({
                signingProperties: {
                    config,
                    context
                }
            })
    };
}
function createSmithyApiNoAuthHttpAuthOption(authParameters) {
    return {
        schemeId: "smithy.api#noAuth"
    };
}
const defaultSTSHttpAuthSchemeProvider = (authParameters)=>{
    const options = [];
    switch(authParameters.operation){
        case "AssumeRoleWithWebIdentity":
            {
                options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
                break;
            }
        default:
            {
                options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
            }
    }
    return options;
};
const resolveStsAuthConfig = (input)=>Object.assign(input, {
        stsClientCtor: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSClient"]
    });
const resolveHttpAuthSchemeConfig = (config)=>{
    const config_0 = resolveStsAuthConfig(config);
    const config_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$resolveAwsSdkSigV4Config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAwsSdkSigV4Config"])(config_0);
    return Object.assign(config_1, {
        authSchemePreference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.authSchemePreference ?? [])
    });
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/EndpointParameters.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commonParams",
    ()=>commonParams,
    "resolveClientEndpointParameters",
    ()=>resolveClientEndpointParameters
]);
const resolveClientEndpointParameters = (options)=>{
    return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        useGlobalEndpoint: options.useGlobalEndpoint ?? false,
        defaultSigningName: "sts"
    });
};
const commonParams = {
    UseGlobalEndpoint: {
        type: "builtInParams",
        name: "useGlobalEndpoint"
    },
    UseFIPS: {
        type: "builtInParams",
        name: "useFipsEndpoint"
    },
    Endpoint: {
        type: "builtInParams",
        name: "endpoint"
    },
    Region: {
        type: "builtInParams",
        name: "region"
    },
    UseDualStack: {
        type: "builtInParams",
        name: "useDualstackEndpoint"
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/package.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"name\":\"@aws-sdk/nested-clients\",\"version\":\"3.883.0\",\"description\":\"Nested clients for AWS SDK packages.\",\"main\":\"./dist-cjs/index.js\",\"module\":\"./dist-es/index.js\",\"types\":\"./dist-types/index.d.ts\",\"scripts\":{\"build\":\"yarn lint && concurrently 'yarn:build:cjs' 'yarn:build:es' 'yarn:build:types'\",\"build:cjs\":\"node ../../scripts/compilation/inline nested-clients\",\"build:es\":\"tsc -p tsconfig.es.json\",\"build:include:deps\":\"lerna run --scope $npm_package_name --include-dependencies build\",\"build:types\":\"tsc -p tsconfig.types.json\",\"build:types:downlevel\":\"downlevel-dts dist-types dist-types/ts3.4\",\"clean\":\"rimraf ./dist-* && rimraf *.tsbuildinfo\",\"lint\":\"node ../../scripts/validation/submodules-linter.js --pkg nested-clients\",\"test\":\"yarn g:vitest run\",\"test:watch\":\"yarn g:vitest watch\"},\"engines\":{\"node\":\">=18.0.0\"},\"author\":{\"name\":\"AWS SDK for JavaScript Team\",\"url\":\"https://aws.amazon.com/javascript/\"},\"license\":\"Apache-2.0\",\"dependencies\":{\"@aws-crypto/sha256-browser\":\"5.2.0\",\"@aws-crypto/sha256-js\":\"5.2.0\",\"@aws-sdk/core\":\"3.883.0\",\"@aws-sdk/middleware-host-header\":\"3.873.0\",\"@aws-sdk/middleware-logger\":\"3.876.0\",\"@aws-sdk/middleware-recursion-detection\":\"3.873.0\",\"@aws-sdk/middleware-user-agent\":\"3.883.0\",\"@aws-sdk/region-config-resolver\":\"3.873.0\",\"@aws-sdk/types\":\"3.862.0\",\"@aws-sdk/util-endpoints\":\"3.879.0\",\"@aws-sdk/util-user-agent-browser\":\"3.873.0\",\"@aws-sdk/util-user-agent-node\":\"3.883.0\",\"@smithy/config-resolver\":\"^4.1.5\",\"@smithy/core\":\"^3.9.2\",\"@smithy/fetch-http-handler\":\"^5.1.1\",\"@smithy/hash-node\":\"^4.0.5\",\"@smithy/invalid-dependency\":\"^4.0.5\",\"@smithy/middleware-content-length\":\"^4.0.5\",\"@smithy/middleware-endpoint\":\"^4.1.21\",\"@smithy/middleware-retry\":\"^4.1.22\",\"@smithy/middleware-serde\":\"^4.0.9\",\"@smithy/middleware-stack\":\"^4.0.5\",\"@smithy/node-config-provider\":\"^4.1.4\",\"@smithy/node-http-handler\":\"^4.1.1\",\"@smithy/protocol-http\":\"^5.1.3\",\"@smithy/smithy-client\":\"^4.5.2\",\"@smithy/types\":\"^4.3.2\",\"@smithy/url-parser\":\"^4.0.5\",\"@smithy/util-base64\":\"^4.0.0\",\"@smithy/util-body-length-browser\":\"^4.0.0\",\"@smithy/util-body-length-node\":\"^4.0.0\",\"@smithy/util-defaults-mode-browser\":\"^4.0.29\",\"@smithy/util-defaults-mode-node\":\"^4.0.29\",\"@smithy/util-endpoints\":\"^3.0.7\",\"@smithy/util-middleware\":\"^4.0.5\",\"@smithy/util-retry\":\"^4.0.7\",\"@smithy/util-utf8\":\"^4.0.0\",\"tslib\":\"^2.6.2\"},\"devDependencies\":{\"concurrently\":\"7.0.0\",\"downlevel-dts\":\"0.10.1\",\"rimraf\":\"3.0.2\",\"typescript\":\"~5.8.3\"},\"typesVersions\":{\"<4.0\":{\"dist-types/*\":[\"dist-types/ts3.4/*\"]}},\"files\":[\"./sso-oidc.d.ts\",\"./sso-oidc.js\",\"./sts.d.ts\",\"./sts.js\",\"dist-*/**\"],\"browser\":{\"./dist-es/submodules/sso-oidc/runtimeConfig\":\"./dist-es/submodules/sso-oidc/runtimeConfig.browser\",\"./dist-es/submodules/sts/runtimeConfig\":\"./dist-es/submodules/sts/runtimeConfig.browser\"},\"react-native\":{},\"homepage\":\"https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/aws/aws-sdk-js-v3.git\",\"directory\":\"packages/nested-clients\"},\"exports\":{\"./sso-oidc\":{\"types\":\"./dist-types/submodules/sso-oidc/index.d.ts\",\"module\":\"./dist-es/submodules/sso-oidc/index.js\",\"node\":\"./dist-cjs/submodules/sso-oidc/index.js\",\"import\":\"./dist-es/submodules/sso-oidc/index.js\",\"require\":\"./dist-cjs/submodules/sso-oidc/index.js\"},\"./sts\":{\"types\":\"./dist-types/submodules/sts/index.d.ts\",\"module\":\"./dist-es/submodules/sts/index.js\",\"node\":\"./dist-cjs/submodules/sts/index.js\",\"import\":\"./dist-es/submodules/sts/index.js\",\"require\":\"./dist-cjs/submodules/sts/index.js\"}}}"));}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getDateHeader.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDateHeader",
    ()=>getDateHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpResponse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpResponse.js [app-route] (ecmascript)");
;
const getDateHeader = (response)=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpResponse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpResponse"].isInstance(response) ? response.headers?.date ?? response.headers?.Date : undefined;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getSkewCorrectedDate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSkewCorrectedDate",
    ()=>getSkewCorrectedDate
]);
const getSkewCorrectedDate = (systemClockOffset)=>new Date(Date.now() + systemClockOffset);
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/isClockSkewed.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isClockSkewed",
    ()=>isClockSkewed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getSkewCorrectedDate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getSkewCorrectedDate.js [app-route] (ecmascript)");
;
const isClockSkewed = (clockTime, systemClockOffset)=>Math.abs((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getSkewCorrectedDate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSkewCorrectedDate"])(systemClockOffset).getTime() - clockTime) >= 300000;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getUpdatedSystemClockOffset.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUpdatedSystemClockOffset",
    ()=>getUpdatedSystemClockOffset
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$isClockSkewed$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/isClockSkewed.js [app-route] (ecmascript)");
;
const getUpdatedSystemClockOffset = (clockTime, currentSystemClockOffset)=>{
    const clockTimeInMs = Date.parse(clockTime);
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$isClockSkewed$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isClockSkewed"])(clockTimeInMs, currentSystemClockOffset)) {
        return clockTimeInMs - Date.now();
    }
    return currentSystemClockOffset;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AWSSDKSigV4Signer",
    ()=>AWSSDKSigV4Signer,
    "AwsSdkSigV4Signer",
    ()=>AwsSdkSigV4Signer,
    "validateSigningProperties",
    ()=>validateSigningProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getDateHeader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getDateHeader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getSkewCorrectedDate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getSkewCorrectedDate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getUpdatedSystemClockOffset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getUpdatedSystemClockOffset.js [app-route] (ecmascript)");
;
;
const throwSigningPropertyError = (name, property)=>{
    if (!property) {
        throw new Error(`Property \`${name}\` is not resolved for AWS SDK SigV4Auth`);
    }
    return property;
};
const validateSigningProperties = async (signingProperties)=>{
    const context = throwSigningPropertyError("context", signingProperties.context);
    const config = throwSigningPropertyError("config", signingProperties.config);
    const authScheme = context.endpointV2?.properties?.authSchemes?.[0];
    const signerFunction = throwSigningPropertyError("signer", config.signer);
    const signer = await signerFunction(authScheme);
    const signingRegion = signingProperties?.signingRegion;
    const signingRegionSet = signingProperties?.signingRegionSet;
    const signingName = signingProperties?.signingName;
    return {
        config,
        signer,
        signingRegion,
        signingRegionSet,
        signingName
    };
};
class AwsSdkSigV4Signer {
    async sign(httpRequest, identity, signingProperties) {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"].isInstance(httpRequest)) {
            throw new Error("The request is not an instance of `HttpRequest` and cannot be signed");
        }
        const validatedProps = await validateSigningProperties(signingProperties);
        const { config, signer } = validatedProps;
        let { signingRegion, signingName } = validatedProps;
        const handlerExecutionContext = signingProperties.context;
        if (handlerExecutionContext?.authSchemes?.length ?? 0 > 1) {
            const [first, second] = handlerExecutionContext.authSchemes;
            if (first?.name === "sigv4a" && second?.name === "sigv4") {
                signingRegion = second?.signingRegion ?? signingRegion;
                signingName = second?.signingName ?? signingName;
            }
        }
        const signedRequest = await signer.sign(httpRequest, {
            signingDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getSkewCorrectedDate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSkewCorrectedDate"])(config.systemClockOffset),
            signingRegion: signingRegion,
            signingService: signingName
        });
        return signedRequest;
    }
    errorHandler(signingProperties) {
        return (error)=>{
            const serverTime = error.ServerTime ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getDateHeader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDateHeader"])(error.$response);
            if (serverTime) {
                const config = throwSigningPropertyError("config", signingProperties.config);
                const initialSystemClockOffset = config.systemClockOffset;
                config.systemClockOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getUpdatedSystemClockOffset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUpdatedSystemClockOffset"])(serverTime, config.systemClockOffset);
                const clockSkewCorrected = config.systemClockOffset !== initialSystemClockOffset;
                if (clockSkewCorrected && error.$metadata) {
                    error.$metadata.clockSkewCorrected = true;
                }
            }
            throw error;
        };
    }
    successHandler(httpResponse, signingProperties) {
        const dateHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getDateHeader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDateHeader"])(httpResponse);
        if (dateHeader) {
            const config = throwSigningPropertyError("config", signingProperties.config);
            config.systemClockOffset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getUpdatedSystemClockOffset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUpdatedSystemClockOffset"])(dateHeader, config.systemClockOffset);
        }
    }
}
const AWSSDKSigV4Signer = AwsSdkSigV4Signer;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getArrayForCommaSeparatedString.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getArrayForCommaSeparatedString",
    ()=>getArrayForCommaSeparatedString
]);
const getArrayForCommaSeparatedString = (str)=>typeof str === "string" && str.length > 0 ? str.split(",").map((item)=>item.trim()) : [];
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getBearerTokenEnvKey.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBearerTokenEnvKey",
    ()=>getBearerTokenEnvKey
]);
const getBearerTokenEnvKey = (signingName)=>`AWS_BEARER_TOKEN_${signingName.replace(/[\s-]/g, "_").toUpperCase()}`;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NODE_AUTH_SCHEME_PREFERENCE_OPTIONS",
    ()=>NODE_AUTH_SCHEME_PREFERENCE_OPTIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getArrayForCommaSeparatedString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getArrayForCommaSeparatedString.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getBearerTokenEnvKey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/utils/getBearerTokenEnvKey.js [app-route] (ecmascript)");
;
;
const NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY = "AWS_AUTH_SCHEME_PREFERENCE";
const NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY = "auth_scheme_preference";
const NODE_AUTH_SCHEME_PREFERENCE_OPTIONS = {
    environmentVariableSelector: (env, options)=>{
        if (options?.signingName) {
            const bearerTokenKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getBearerTokenEnvKey$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBearerTokenEnvKey"])(options.signingName);
            if (bearerTokenKey in env) return [
                "httpBearerAuth"
            ];
        }
        if (!(NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY in env)) return undefined;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getArrayForCommaSeparatedString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getArrayForCommaSeparatedString"])(env[NODE_AUTH_SCHEME_PREFERENCE_ENV_KEY]);
    },
    configFileSelector: (profile)=>{
        if (!(NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY in profile)) return undefined;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$utils$2f$getArrayForCommaSeparatedString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getArrayForCommaSeparatedString"])(profile[NODE_AUTH_SCHEME_PREFERENCE_CONFIG_KEY]);
    },
    default: []
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "emitWarningIfUnsupportedVersion",
    ()=>emitWarningIfUnsupportedVersion,
    "state",
    ()=>state
]);
const state = {
    warningEmitted: false
};
const emitWarningIfUnsupportedVersion = (version)=>{
    if (version && !state.warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 18) {
        state.warningEmitted = true;
        process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`);
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/crt-availability.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "crtAvailability",
    ()=>crtAvailability
]);
const crtAvailability = {
    isCrtAvailable: false
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/is-crt-available.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isCrtAvailable",
    ()=>isCrtAvailable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$crt$2d$availability$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/crt-availability.js [app-route] (ecmascript)");
;
const isCrtAvailable = ()=>{
    if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$crt$2d$availability$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["crtAvailability"].isCrtAvailable) {
        return [
            "md/crt-avail"
        ];
    }
    return null;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDefaultUserAgentProvider",
    ()=>createDefaultUserAgentProvider,
    "defaultUserAgent",
    ()=>defaultUserAgent
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$process__$5b$external$5d$__$28$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/process [external] (process, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$is$2d$crt$2d$available$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/is-crt-available.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$crt$2d$availability$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/crt-availability.js [app-route] (ecmascript)");
;
;
;
;
const createDefaultUserAgentProvider = ({ serviceId, clientVersion })=>{
    return async (config)=>{
        const sections = [
            [
                "aws-sdk-js",
                clientVersion
            ],
            [
                "ua",
                "2.1"
            ],
            [
                `os/${(0, __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["platform"])()}`,
                (0, __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["release"])()
            ],
            [
                "lang/js"
            ],
            [
                "md/nodejs",
                `${__TURBOPACK__imported__module__$5b$externals$5d2f$process__$5b$external$5d$__$28$process$2c$__cjs$29$__["versions"].node}`
            ]
        ];
        const crtAvailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$is$2d$crt$2d$available$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCrtAvailable"])();
        if (crtAvailable) {
            sections.push(crtAvailable);
        }
        if (serviceId) {
            sections.push([
                `api/${serviceId}`,
                clientVersion
            ]);
        }
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$process__$5b$external$5d$__$28$process$2c$__cjs$29$__["env"].AWS_EXECUTION_ENV) {
            sections.push([
                `exec-env/${__TURBOPACK__imported__module__$5b$externals$5d2f$process__$5b$external$5d$__$28$process$2c$__cjs$29$__["env"].AWS_EXECUTION_ENV}`
            ]);
        }
        const appId = await config?.userAgentAppId?.();
        const resolvedUserAgent = appId ? [
            ...sections,
            [
                `app/${appId}`
            ]
        ] : [
            ...sections
        ];
        return resolvedUserAgent;
    };
};
const defaultUserAgent = createDefaultUserAgentProvider;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NODE_APP_ID_CONFIG_OPTIONS",
    ()=>NODE_APP_ID_CONFIG_OPTIONS,
    "UA_APP_ID_ENV_NAME",
    ()=>UA_APP_ID_ENV_NAME,
    "UA_APP_ID_INI_NAME",
    ()=>UA_APP_ID_INI_NAME
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js [app-route] (ecmascript)");
;
const UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
const UA_APP_ID_INI_NAME = "sdk_ua_app_id";
const UA_APP_ID_INI_NAME_DEPRECATED = "sdk-ua-app-id";
const NODE_APP_ID_CONFIG_OPTIONS = {
    environmentVariableSelector: (env)=>env[UA_APP_ID_ENV_NAME],
    configFileSelector: (profile)=>profile[UA_APP_ID_INI_NAME] ?? profile[UA_APP_ID_INI_NAME_DEPRECATED],
    default: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_UA_APP_ID"]
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$nodeAppIdConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js [app-route] (ecmascript)");
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDefaultUserAgentProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createDefaultUserAgentProvider"],
    "crtAvailability",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$crt$2d$availability$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["crtAvailability"],
    "defaultUserAgent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defaultUserAgent"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$crt$2d$availability$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/crt-availability.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NODE_REGION_CONFIG_FILE_OPTIONS",
    ()=>NODE_REGION_CONFIG_FILE_OPTIONS,
    "NODE_REGION_CONFIG_OPTIONS",
    ()=>NODE_REGION_CONFIG_OPTIONS,
    "REGION_ENV_NAME",
    ()=>REGION_ENV_NAME,
    "REGION_INI_NAME",
    ()=>REGION_INI_NAME
]);
const REGION_ENV_NAME = "AWS_REGION";
const REGION_INI_NAME = "region";
const NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env)=>env[REGION_ENV_NAME],
    configFileSelector: (profile)=>profile[REGION_INI_NAME],
    default: ()=>{
        throw new Error("Region is missing");
    }
};
const NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials"
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "booleanSelector",
    ()=>booleanSelector
]);
const booleanSelector = (obj, key, type)=>{
    if (!(key in obj)) return undefined;
    if (obj[key] === "true") return true;
    if (obj[key] === "false") return false;
    throw new Error(`Cannot load ${type} "${key}". Expected "true" or "false", got ${obj[key]}.`);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-config-provider/dist-es/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SelectorType",
    ()=>SelectorType
]);
var SelectorType;
(function(SelectorType) {
    SelectorType["ENV"] = "env";
    SelectorType["CONFIG"] = "shared config entry";
})(SelectorType || (SelectorType = {}));
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONFIG_USE_DUALSTACK_ENDPOINT",
    ()=>CONFIG_USE_DUALSTACK_ENDPOINT,
    "DEFAULT_USE_DUALSTACK_ENDPOINT",
    ()=>DEFAULT_USE_DUALSTACK_ENDPOINT,
    "ENV_USE_DUALSTACK_ENDPOINT",
    ()=>ENV_USE_DUALSTACK_ENDPOINT,
    "NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS",
    ()=>NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$booleanSelector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-config-provider/dist-es/types.js [app-route] (ecmascript)");
;
const ENV_USE_DUALSTACK_ENDPOINT = "AWS_USE_DUALSTACK_ENDPOINT";
const CONFIG_USE_DUALSTACK_ENDPOINT = "use_dualstack_endpoint";
const DEFAULT_USE_DUALSTACK_ENDPOINT = false;
const NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$booleanSelector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["booleanSelector"])(env, ENV_USE_DUALSTACK_ENDPOINT, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectorType"].ENV),
    configFileSelector: (profile)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$booleanSelector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["booleanSelector"])(profile, CONFIG_USE_DUALSTACK_ENDPOINT, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectorType"].CONFIG),
    default: false
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CONFIG_USE_FIPS_ENDPOINT",
    ()=>CONFIG_USE_FIPS_ENDPOINT,
    "DEFAULT_USE_FIPS_ENDPOINT",
    ()=>DEFAULT_USE_FIPS_ENDPOINT,
    "ENV_USE_FIPS_ENDPOINT",
    ()=>ENV_USE_FIPS_ENDPOINT,
    "NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS",
    ()=>NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$booleanSelector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-config-provider/dist-es/types.js [app-route] (ecmascript)");
;
const ENV_USE_FIPS_ENDPOINT = "AWS_USE_FIPS_ENDPOINT";
const CONFIG_USE_FIPS_ENDPOINT = "use_fips_endpoint";
const DEFAULT_USE_FIPS_ENDPOINT = false;
const NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS = {
    environmentVariableSelector: (env)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$booleanSelector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["booleanSelector"])(env, ENV_USE_FIPS_ENDPOINT, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectorType"].ENV),
    configFileSelector: (profile)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$booleanSelector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["booleanSelector"])(profile, CONFIG_USE_FIPS_ENDPOINT, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$config$2d$provider$2f$dist$2d$es$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SelectorType"].CONFIG),
    default: false
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NoAuthSigner",
    ()=>NoAuthSigner
]);
class NoAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
        return httpRequest;
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/hash-node/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hash",
    ()=>Hash
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-buffer-from/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUint8Array.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/buffer [external] (buffer, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
class Hash {
    constructor(algorithmIdentifier, secret){
        this.algorithmIdentifier = algorithmIdentifier;
        this.secret = secret;
        this.reset();
    }
    update(toHash, encoding) {
        this.hash.update((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUint8Array$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUint8Array"])(castSourceData(toHash, encoding)));
    }
    digest() {
        return Promise.resolve(this.hash.digest());
    }
    reset() {
        this.hash = this.secret ? (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])(this.algorithmIdentifier, castSourceData(this.secret)) : (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])(this.algorithmIdentifier);
    }
}
function castSourceData(toCast, encoding) {
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$buffer__$5b$external$5d$__$28$buffer$2c$__cjs$29$__["Buffer"].isBuffer(toCast)) {
        return toCast;
    }
    if (typeof toCast === "string") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromString"])(toCast, encoding);
    }
    if (ArrayBuffer.isView(toCast)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromArrayBuffer"])(toCast.buffer, toCast.byteOffset, toCast.byteLength);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromArrayBuffer"])(toCast);
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/querystring-builder/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildQueryString",
    ()=>buildQueryString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-uri-escape/dist-es/escape-uri.js [app-route] (ecmascript)");
;
function buildQueryString(query) {
    const parts = [];
    for (let key of Object.keys(query).sort()){
        const value = query[key];
        key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeUri"])(key);
        if (Array.isArray(value)) {
            for(let i = 0, iLen = value.length; i < iLen; i++){
                parts.push(`${key}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeUri"])(value[i])}`);
            }
        } else {
            let qsEntry = key;
            if (value || typeof value === "string") {
                qsEntry += `=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$uri$2d$escape$2f$dist$2d$es$2f$escape$2d$uri$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["escapeUri"])(value)}`;
            }
            parts.push(qsEntry);
        }
    }
    return parts.join("&");
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NODEJS_TIMEOUT_ERROR_CODES",
    ()=>NODEJS_TIMEOUT_ERROR_CODES
]);
const NODEJS_TIMEOUT_ERROR_CODES = [
    "ECONNRESET",
    "EPIPE",
    "ETIMEDOUT"
];
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/get-transformed-headers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTransformedHeaders",
    ()=>getTransformedHeaders
]);
const getTransformedHeaders = (headers)=>{
    const transformedHeaders = {};
    for (const name of Object.keys(headers)){
        const headerValues = headers[name];
        transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
    }
    return transformedHeaders;
};
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/timing.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "timing",
    ()=>timing
]);
const timing = {
    setTimeout: (cb, ms)=>setTimeout(cb, ms),
    clearTimeout: (timeoutId)=>clearTimeout(timeoutId)
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/set-connection-timeout.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setConnectionTimeout",
    ()=>setConnectionTimeout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/timing.js [app-route] (ecmascript)");
;
const DEFER_EVENT_LISTENER_TIME = 1000;
const setConnectionTimeout = (request, reject, timeoutInMs = 0)=>{
    if (!timeoutInMs) {
        return -1;
    }
    const registerTimeout = (offset)=>{
        const timeoutId = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].setTimeout(()=>{
            request.destroy();
            reject(Object.assign(new Error(`Socket timed out without establishing a connection within ${timeoutInMs} ms`), {
                name: "TimeoutError"
            }));
        }, timeoutInMs - offset);
        const doWithSocket = (socket)=>{
            if (socket?.connecting) {
                socket.on("connect", ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].clearTimeout(timeoutId);
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].clearTimeout(timeoutId);
            }
        };
        if (request.socket) {
            doWithSocket(request.socket);
        } else {
            request.on("socket", doWithSocket);
        }
    };
    if (timeoutInMs < 2000) {
        registerTimeout(0);
        return 0;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].setTimeout(registerTimeout.bind(null, DEFER_EVENT_LISTENER_TIME), DEFER_EVENT_LISTENER_TIME);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/set-socket-keep-alive.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setSocketKeepAlive",
    ()=>setSocketKeepAlive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/timing.js [app-route] (ecmascript)");
;
const DEFER_EVENT_LISTENER_TIME = 3000;
const setSocketKeepAlive = (request, { keepAlive, keepAliveMsecs }, deferTimeMs = DEFER_EVENT_LISTENER_TIME)=>{
    if (keepAlive !== true) {
        return -1;
    }
    const registerListener = ()=>{
        if (request.socket) {
            request.socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
        } else {
            request.on("socket", (socket)=>{
                socket.setKeepAlive(keepAlive, keepAliveMsecs || 0);
            });
        }
    };
    if (deferTimeMs === 0) {
        registerListener();
        return 0;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].setTimeout(registerListener, deferTimeMs);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/set-socket-timeout.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setSocketTimeout",
    ()=>setSocketTimeout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/node-http-handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/timing.js [app-route] (ecmascript)");
;
;
const DEFER_EVENT_LISTENER_TIME = 3000;
const setSocketTimeout = (request, reject, timeoutInMs = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_REQUEST_TIMEOUT"])=>{
    const registerTimeout = (offset)=>{
        const timeout = timeoutInMs - offset;
        const onTimeout = ()=>{
            request.destroy();
            reject(Object.assign(new Error(`Connection timed out after ${timeoutInMs} ms`), {
                name: "TimeoutError"
            }));
        };
        if (request.socket) {
            request.socket.setTimeout(timeout, onTimeout);
            request.on("close", ()=>request.socket?.removeListener("timeout", onTimeout));
        } else {
            request.setTimeout(timeout, onTimeout);
        }
    };
    if (0 < timeoutInMs && timeoutInMs < 6000) {
        registerTimeout(0);
        return 0;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].setTimeout(registerTimeout.bind(null, timeoutInMs === 0 ? 0 : DEFER_EVENT_LISTENER_TIME), DEFER_EVENT_LISTENER_TIME);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/write-request-body.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "writeRequestBody",
    ()=>writeRequestBody
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/timing.js [app-route] (ecmascript)");
;
;
const MIN_WAIT_TIME = 6000;
async function writeRequestBody(httpRequest, request, maxContinueTimeoutMs = MIN_WAIT_TIME) {
    const headers = request.headers ?? {};
    const expect = headers["Expect"] || headers["expect"];
    let timeoutId = -1;
    let sendBody = true;
    if (expect === "100-continue") {
        sendBody = await Promise.race([
            new Promise((resolve)=>{
                timeoutId = Number(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].setTimeout(()=>resolve(true), Math.max(MIN_WAIT_TIME, maxContinueTimeoutMs)));
            }),
            new Promise((resolve)=>{
                httpRequest.on("continue", ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].clearTimeout(timeoutId);
                    resolve(true);
                });
                httpRequest.on("response", ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].clearTimeout(timeoutId);
                    resolve(false);
                });
                httpRequest.on("error", ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].clearTimeout(timeoutId);
                    resolve(false);
                });
            })
        ]);
    }
    if (sendBody) {
        writeBody(httpRequest, request.body);
    }
}
function writeBody(httpRequest, body) {
    if (body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Readable"]) {
        body.pipe(httpRequest);
        return;
    }
    if (body) {
        if (Buffer.isBuffer(body) || typeof body === "string") {
            httpRequest.end(body);
            return;
        }
        const uint8 = body;
        if (typeof uint8 === "object" && uint8.buffer && typeof uint8.byteOffset === "number" && typeof uint8.byteLength === "number") {
            httpRequest.end(Buffer.from(uint8.buffer, uint8.byteOffset, uint8.byteLength));
            return;
        }
        httpRequest.end(Buffer.from(body));
        return;
    }
    httpRequest.end();
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/node-http-handler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_REQUEST_TIMEOUT",
    ()=>DEFAULT_REQUEST_TIMEOUT,
    "NodeHttpHandler",
    ()=>NodeHttpHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpResponse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpResponse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$querystring$2d$builder$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/querystring-builder/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/http [external] (http, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/https [external] (https, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$get$2d$transformed$2d$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/get-transformed-headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$set$2d$connection$2d$timeout$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/set-connection-timeout.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$set$2d$socket$2d$keep$2d$alive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/set-socket-keep-alive.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$set$2d$socket$2d$timeout$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/set-socket-timeout.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/timing.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$write$2d$request$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/write-request-body.js [app-route] (ecmascript)");
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
const DEFAULT_REQUEST_TIMEOUT = 0;
class NodeHttpHandler {
    static create(instanceOrOptions) {
        if (typeof instanceOrOptions?.handle === "function") {
            return instanceOrOptions;
        }
        return new NodeHttpHandler(instanceOrOptions);
    }
    static checkSocketUsage(agent, socketWarningTimestamp, logger = console) {
        const { sockets, requests, maxSockets } = agent;
        if (typeof maxSockets !== "number" || maxSockets === Infinity) {
            return socketWarningTimestamp;
        }
        const interval = 15000;
        if (Date.now() - interval < socketWarningTimestamp) {
            return socketWarningTimestamp;
        }
        if (sockets && requests) {
            for(const origin in sockets){
                const socketsInUse = sockets[origin]?.length ?? 0;
                const requestsEnqueued = requests[origin]?.length ?? 0;
                if (socketsInUse >= maxSockets && requestsEnqueued >= 2 * maxSockets) {
                    logger?.warn?.(`@smithy/node-http-handler:WARN - socket usage at capacity=${socketsInUse} and ${requestsEnqueued} additional requests are enqueued.
See https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/node-configuring-maxsockets.html
or increase socketAcquisitionWarningTimeout=(millis) in the NodeHttpHandler config.`);
                    return Date.now();
                }
            }
        }
        return socketWarningTimestamp;
    }
    constructor(options){
        this.socketWarningTimestamp = 0;
        this.metadata = {
            handlerProtocol: "http/1.1"
        };
        this.configProvider = new Promise((resolve, reject)=>{
            if (typeof options === "function") {
                options().then((_options)=>{
                    resolve(this.resolveDefaultConfig(_options));
                }).catch(reject);
            } else {
                resolve(this.resolveDefaultConfig(options));
            }
        });
    }
    resolveDefaultConfig(options) {
        const { requestTimeout, connectionTimeout, socketTimeout, socketAcquisitionWarningTimeout, httpAgent, httpsAgent } = options || {};
        const keepAlive = true;
        const maxSockets = 50;
        return {
            connectionTimeout,
            requestTimeout: requestTimeout ?? socketTimeout,
            socketAcquisitionWarningTimeout,
            httpAgent: (()=>{
                if (httpAgent instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__["Agent"] || typeof httpAgent?.destroy === "function") {
                    return httpAgent;
                }
                return new __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__["Agent"]({
                    keepAlive,
                    maxSockets,
                    ...httpAgent
                });
            })(),
            httpsAgent: (()=>{
                if (httpsAgent instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__["Agent"] || typeof httpsAgent?.destroy === "function") {
                    return httpsAgent;
                }
                return new __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__["Agent"]({
                    keepAlive,
                    maxSockets,
                    ...httpsAgent
                });
            })(),
            logger: console
        };
    }
    destroy() {
        this.config?.httpAgent?.destroy();
        this.config?.httpsAgent?.destroy();
    }
    async handle(request, { abortSignal, requestTimeout } = {}) {
        if (!this.config) {
            this.config = await this.configProvider;
        }
        return new Promise((_resolve, _reject)=>{
            let writeRequestBodyPromise = undefined;
            const timeouts = [];
            const resolve = async (arg)=>{
                await writeRequestBodyPromise;
                timeouts.forEach(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].clearTimeout);
                _resolve(arg);
            };
            const reject = async (arg)=>{
                await writeRequestBodyPromise;
                timeouts.forEach(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].clearTimeout);
                _reject(arg);
            };
            if (!this.config) {
                throw new Error("Node HTTP request handler config is not resolved");
            }
            if (abortSignal?.aborted) {
                const abortError = new Error("Request aborted");
                abortError.name = "AbortError";
                reject(abortError);
                return;
            }
            const isSSL = request.protocol === "https:";
            const agent = isSSL ? this.config.httpsAgent : this.config.httpAgent;
            timeouts.push(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].setTimeout(()=>{
                this.socketWarningTimestamp = NodeHttpHandler.checkSocketUsage(agent, this.socketWarningTimestamp, this.config.logger);
            }, this.config.socketAcquisitionWarningTimeout ?? (this.config.requestTimeout ?? 2000) + (this.config.connectionTimeout ?? 1000)));
            const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$querystring$2d$builder$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildQueryString"])(request.query || {});
            let auth = undefined;
            if (request.username != null || request.password != null) {
                const username = request.username ?? "";
                const password = request.password ?? "";
                auth = `${username}:${password}`;
            }
            let path = request.path;
            if (queryString) {
                path += `?${queryString}`;
            }
            if (request.fragment) {
                path += `#${request.fragment}`;
            }
            let hostname = request.hostname ?? "";
            if (hostname[0] === "[" && hostname.endsWith("]")) {
                hostname = request.hostname.slice(1, -1);
            } else {
                hostname = request.hostname;
            }
            const nodeHttpsOptions = {
                headers: request.headers,
                host: hostname,
                method: request.method,
                path,
                port: request.port,
                agent,
                auth
            };
            const requestFunc = isSSL ? __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__["request"] : __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__["request"];
            const req = requestFunc(nodeHttpsOptions, (res)=>{
                const httpResponse = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpResponse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpResponse"]({
                    statusCode: res.statusCode || -1,
                    reason: res.statusMessage,
                    headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$get$2d$transformed$2d$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTransformedHeaders"])(res.headers),
                    body: res
                });
                resolve({
                    response: httpResponse
                });
            });
            req.on("error", (err)=>{
                if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODEJS_TIMEOUT_ERROR_CODES"].includes(err.code)) {
                    reject(Object.assign(err, {
                        name: "TimeoutError"
                    }));
                } else {
                    reject(err);
                }
            });
            if (abortSignal) {
                const onAbort = ()=>{
                    req.destroy();
                    const abortError = new Error("Request aborted");
                    abortError.name = "AbortError";
                    reject(abortError);
                };
                if (typeof abortSignal.addEventListener === "function") {
                    const signal = abortSignal;
                    signal.addEventListener("abort", onAbort, {
                        once: true
                    });
                    req.once("close", ()=>signal.removeEventListener("abort", onAbort));
                } else {
                    abortSignal.onabort = onAbort;
                }
            }
            const effectiveRequestTimeout = requestTimeout ?? this.config.requestTimeout;
            timeouts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$set$2d$connection$2d$timeout$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setConnectionTimeout"])(req, reject, this.config.connectionTimeout));
            timeouts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$set$2d$socket$2d$timeout$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setSocketTimeout"])(req, reject, effectiveRequestTimeout));
            const httpAgent = nodeHttpsOptions.agent;
            if (typeof httpAgent === "object" && "keepAlive" in httpAgent) {
                timeouts.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$set$2d$socket$2d$keep$2d$alive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setSocketKeepAlive"])(req, {
                    keepAlive: httpAgent.keepAlive,
                    keepAliveMsecs: httpAgent.keepAliveMsecs
                }));
            }
            writeRequestBodyPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$write$2d$request$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeRequestBody"])(req, request, effectiveRequestTimeout).catch((e)=>{
                timeouts.forEach(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$timing$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timing"].clearTimeout);
                return _reject(e);
            });
        });
    }
    updateHttpClientConfig(key, value) {
        this.config = undefined;
        this.configProvider = this.configProvider.then((config)=>{
            return {
                ...config,
                [key]: value
            };
        });
    }
    httpHandlerConfigs() {
        return this.config ?? {};
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/stream-collector/collector.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Collector",
    ()=>Collector
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
;
class Collector extends __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Writable"] {
    constructor(){
        super(...arguments);
        this.bufferedBytes = [];
    }
    _write(chunk, encoding, callback) {
        this.bufferedBytes.push(chunk);
        callback();
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "streamCollector",
    ()=>streamCollector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$collector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/stream-collector/collector.js [app-route] (ecmascript)");
;
const streamCollector = (stream)=>{
    if (isReadableStreamInstance(stream)) {
        return collectReadableStream(stream);
    }
    return new Promise((resolve, reject)=>{
        const collector = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$collector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Collector"]();
        stream.pipe(collector);
        stream.on("error", (err)=>{
            collector.end();
            reject(err);
        });
        collector.on("error", reject);
        collector.on("finish", function() {
            const bytes = new Uint8Array(Buffer.concat(this.bufferedBytes));
            resolve(bytes);
        });
    });
};
const isReadableStreamInstance = (stream)=>typeof ReadableStream === "function" && stream instanceof ReadableStream;
async function collectReadableStream(stream) {
    const chunks = [];
    const reader = stream.getReader();
    let isDone = false;
    let length = 0;
    while(!isDone){
        const { done, value } = await reader.read();
        if (value) {
            chunks.push(value);
            length += value.length;
        }
        isDone = done;
    }
    const collected = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks){
        collected.set(chunk, offset);
        offset += chunk.length;
    }
    return collected;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-body-length-node/dist-es/calculateBodyLength.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateBodyLength",
    ()=>calculateBodyLength
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
const calculateBodyLength = (body)=>{
    if (!body) {
        return 0;
    }
    if (typeof body === "string") {
        return Buffer.byteLength(body);
    } else if (typeof body.byteLength === "number") {
        return body.byteLength;
    } else if (typeof body.size === "number") {
        return body.size;
    } else if (typeof body.start === "number" && typeof body.end === "number") {
        return body.end + 1 - body.start;
    } else if (typeof body.path === "string" || Buffer.isBuffer(body.path)) {
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["lstatSync"])(body.path).size;
    } else if (typeof body.fd === "number") {
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["fstatSync"])(body.fd).size;
    }
    throw new Error(`Body Length computation failed for ${body}`);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-base64/dist-es/fromBase64.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromBase64",
    ()=>fromBase64
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-buffer-from/dist-es/index.js [app-route] (ecmascript)");
;
const BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
const fromBase64 = (input)=>{
    if (input.length * 3 % 4 !== 0) {
        throw new TypeError(`Incorrect padding on base64 string.`);
    }
    if (!BASE64_REGEX.exec(input)) {
        throw new TypeError(`Invalid base64 string.`);
    }
    const buffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromString"])(input, "base64");
    return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-base64/dist-es/toBase64.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toBase64",
    ()=>toBase64
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-buffer-from/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)");
;
;
const toBase64 = (_input)=>{
    let input;
    if (typeof _input === "string") {
        input = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"])(_input);
    } else {
        input = _input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromArrayBuffer"])(input.buffer, input.byteOffset, input.byteLength).toString("base64");
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUtf8.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toUtf8",
    ()=>toUtf8
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-buffer-from/dist-es/index.js [app-route] (ecmascript)");
;
const toUtf8 = (input)=>{
    if (typeof input === "string") {
        return input;
    }
    if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromArrayBuffer"])(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EndpointCache",
    ()=>EndpointCache
]);
class EndpointCache {
    constructor({ size, params }){
        this.data = new Map();
        this.parameters = [];
        this.capacity = size ?? 50;
        if (params) {
            this.parameters = params;
        }
    }
    get(endpointParams, resolver) {
        const key = this.hash(endpointParams);
        if (key === false) {
            return resolver();
        }
        if (!this.data.has(key)) {
            if (this.data.size > this.capacity + 10) {
                const keys = this.data.keys();
                let i = 0;
                while(true){
                    const { value, done } = keys.next();
                    this.data.delete(value);
                    if (done || ++i > 10) {
                        break;
                    }
                }
            }
            this.data.set(key, resolver());
        }
        return this.data.get(key);
    }
    size() {
        return this.data.size;
    }
    hash(endpointParams) {
        let buffer = "";
        const { parameters } = this;
        if (parameters.length === 0) {
            return false;
        }
        for (const param of parameters){
            const val = String(endpointParams[param] ?? "");
            if (val.includes("|;")) {
                return false;
            }
            buffer += val + "|;";
        }
        return buffer;
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "debugId",
    ()=>debugId
]);
const debugId = "endpoints";
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toDebugString",
    ()=>toDebugString
]);
function toDebugString(input) {
    if (typeof input !== "object" || input == null) {
        return input;
    }
    if ("ref" in input) {
        return `$${toDebugString(input.ref)}`;
    }
    if ("fn" in input) {
        return `${input.fn}(${(input.argv || []).map(toDebugString).join(", ")})`;
    }
    return JSON.stringify(input, null, 2);
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EndpointError",
    ()=>EndpointError
]);
class EndpointError extends Error {
    constructor(message){
        super(message);
        this.name = "EndpointError";
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "booleanEquals",
    ()=>booleanEquals
]);
const booleanEquals = (value1, value2)=>value1 === value2;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAttrPathList",
    ()=>getAttrPathList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
;
const getAttrPathList = (path)=>{
    const parts = path.split(".");
    const pathList = [];
    for (const part of parts){
        const squareBracketIndex = part.indexOf("[");
        if (squareBracketIndex !== -1) {
            if (part.indexOf("]") !== part.length - 1) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Path: '${path}' does not end with ']'`);
            }
            const arrayIndex = part.slice(squareBracketIndex + 1, -1);
            if (Number.isNaN(parseInt(arrayIndex))) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Invalid array index: '${arrayIndex}' in path: '${path}'`);
            }
            if (squareBracketIndex !== 0) {
                pathList.push(part.slice(0, squareBracketIndex));
            }
            pathList.push(arrayIndex);
        } else {
            pathList.push(part);
        }
    }
    return pathList;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAttr",
    ()=>getAttr
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$getAttrPathList$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/getAttrPathList.js [app-route] (ecmascript)");
;
;
const getAttr = (value, path)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$getAttrPathList$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAttrPathList"])(path).reduce((acc, index)=>{
        if (typeof acc !== "object") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Index '${index}' in '${path}' not found in '${JSON.stringify(value)}'`);
        } else if (Array.isArray(acc)) {
            return acc[parseInt(index)];
        }
        return acc[index];
    }, value);
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSet",
    ()=>isSet
]);
const isSet = (value)=>value != null;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/not.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "not",
    ()=>not
]);
const not = (value)=>!value;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/endpoint.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EndpointURLScheme",
    ()=>EndpointURLScheme
]);
var EndpointURLScheme;
(function(EndpointURLScheme) {
    EndpointURLScheme["HTTP"] = "http";
    EndpointURLScheme["HTTPS"] = "https";
})(EndpointURLScheme || (EndpointURLScheme = {}));
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseURL",
    ()=>parseURL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$endpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/endpoint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isIpAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/isIpAddress.js [app-route] (ecmascript)");
;
;
const DEFAULT_PORTS = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$endpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointURLScheme"].HTTP]: 80,
    [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$endpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointURLScheme"].HTTPS]: 443
};
const parseURL = (value)=>{
    const whatwgURL = (()=>{
        try {
            if (value instanceof URL) {
                return value;
            }
            if (typeof value === "object" && "hostname" in value) {
                const { hostname, port, protocol = "", path = "", query = {} } = value;
                const url = new URL(`${protocol}//${hostname}${port ? `:${port}` : ""}${path}`);
                url.search = Object.entries(query).map(([k, v])=>`${k}=${v}`).join("&");
                return url;
            }
            return new URL(value);
        } catch (error) {
            return null;
        }
    })();
    if (!whatwgURL) {
        console.error(`Unable to parse ${JSON.stringify(value)} as a whatwg URL.`);
        return null;
    }
    const urlString = whatwgURL.href;
    const { host, hostname, pathname, protocol, search } = whatwgURL;
    if (search) {
        return null;
    }
    const scheme = protocol.slice(0, -1);
    if (!Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$endpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointURLScheme"]).includes(scheme)) {
        return null;
    }
    const isIp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isIpAddress$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isIpAddress"])(hostname);
    const inputContainsDefaultPort = urlString.includes(`${host}:${DEFAULT_PORTS[scheme]}`) || typeof value === "string" && value.includes(`${host}:${DEFAULT_PORTS[scheme]}`);
    const authority = `${host}${inputContainsDefaultPort ? `:${DEFAULT_PORTS[scheme]}` : ``}`;
    return {
        scheme,
        authority,
        path: pathname,
        normalizedPath: pathname.endsWith("/") ? pathname : `${pathname}/`,
        isIp
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stringEquals",
    ()=>stringEquals
]);
const stringEquals = (value1, value2)=>value1 === value2;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/substring.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "substring",
    ()=>substring
]);
const substring = (input, start, stop, reverse)=>{
    if (start >= stop || input.length < stop) {
        return null;
    }
    if (!reverse) {
        return input.substring(start, stop);
    }
    return input.substring(input.length - stop, input.length - start);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uriEncode",
    ()=>uriEncode
]);
const uriEncode = (value)=>encodeURIComponent(value).replace(/[!*'()]/g, (c)=>`%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "endpointFunctions",
    ()=>endpointFunctions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$booleanEquals$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/booleanEquals.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$getAttr$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isSet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/isSet.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isValidHostLabel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/isValidHostLabel.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$not$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/not.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$parseURL$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/parseURL.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$stringEquals$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/stringEquals.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$substring$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/substring.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$uriEncode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/uriEncode.js [app-route] (ecmascript)");
;
const endpointFunctions = {
    booleanEquals: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$booleanEquals$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["booleanEquals"],
    getAttr: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$getAttr$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAttr"],
    isSet: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isSet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSet"],
    isValidHostLabel: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$isValidHostLabel$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidHostLabel"],
    not: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$not$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["not"],
    parseURL: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$parseURL$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseURL"],
    stringEquals: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$stringEquals$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stringEquals"],
    substring: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$substring$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["substring"],
    uriEncode: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$uriEncode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uriEncode"]
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateTemplate",
    ()=>evaluateTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$getAttr$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/lib/getAttr.js [app-route] (ecmascript)");
;
const evaluateTemplate = (template, options)=>{
    const evaluatedTemplateArr = [];
    const templateContext = {
        ...options.endpointParams,
        ...options.referenceRecord
    };
    let currentIndex = 0;
    while(currentIndex < template.length){
        const openingBraceIndex = template.indexOf("{", currentIndex);
        if (openingBraceIndex === -1) {
            evaluatedTemplateArr.push(template.slice(currentIndex));
            break;
        }
        evaluatedTemplateArr.push(template.slice(currentIndex, openingBraceIndex));
        const closingBraceIndex = template.indexOf("}", openingBraceIndex);
        if (closingBraceIndex === -1) {
            evaluatedTemplateArr.push(template.slice(openingBraceIndex));
            break;
        }
        if (template[openingBraceIndex + 1] === "{" && template[closingBraceIndex + 1] === "}") {
            evaluatedTemplateArr.push(template.slice(openingBraceIndex + 1, closingBraceIndex));
            currentIndex = closingBraceIndex + 2;
        }
        const parameterName = template.substring(openingBraceIndex + 1, closingBraceIndex);
        if (parameterName.includes("#")) {
            const [refName, attrName] = parameterName.split("#");
            evaluatedTemplateArr.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$lib$2f$getAttr$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAttr"])(templateContext[refName], attrName));
        } else {
            evaluatedTemplateArr.push(templateContext[parameterName]);
        }
        currentIndex = closingBraceIndex + 1;
    }
    return evaluatedTemplateArr.join("");
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getReferenceValue",
    ()=>getReferenceValue
]);
const getReferenceValue = ({ ref }, options)=>{
    const referenceRecord = {
        ...options.endpointParams,
        ...options.referenceRecord
    };
    return referenceRecord[ref];
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateExpression",
    ()=>evaluateExpression
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$callFunction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateTemplate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getReferenceValue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getReferenceValue.js [app-route] (ecmascript)");
;
;
;
;
const evaluateExpression = (obj, keyName, options)=>{
    if (typeof obj === "string") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateTemplate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateTemplate"])(obj, options);
    } else if (obj["fn"]) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$callFunction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callFunction"])(obj, options);
    } else if (obj["ref"]) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getReferenceValue$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getReferenceValue"])(obj, options);
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`'${keyName}': ${String(obj)} is not a string, function or reference.`);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callFunction",
    ()=>callFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$endpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/endpointFunctions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateExpression$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js [app-route] (ecmascript)");
;
;
;
const callFunction = ({ fn, argv }, options)=>{
    const evaluatedArgs = argv.map((arg)=>[
            "boolean",
            "number"
        ].includes(typeof arg) ? arg : (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateExpression$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateExpression"])(arg, "arg", options));
    const fnSegments = fn.split(".");
    if (fnSegments[0] in __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customEndpointFunctions"] && fnSegments[1] != null) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customEndpointFunctions"][fnSegments[0]][fnSegments[1]](...evaluatedArgs);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$endpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["endpointFunctions"][fn](...evaluatedArgs);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateCondition",
    ()=>evaluateCondition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$callFunction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/callFunction.js [app-route] (ecmascript)");
;
;
;
const evaluateCondition = ({ assign, ...fnArgs }, options)=>{
    if (assign && assign in options.referenceRecord) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`'${assign}' is already defined in Reference Record.`);
    }
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$callFunction$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["callFunction"])(fnArgs, options);
    options.logger?.debug?.(`${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["debugId"]} evaluateCondition: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDebugString"])(fnArgs)} = ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDebugString"])(value)}`);
    return {
        result: value === "" ? true : !!value,
        ...assign != null && {
            toAssign: {
                name: assign,
                value
            }
        }
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateConditions",
    ()=>evaluateConditions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateCondition$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateCondition.js [app-route] (ecmascript)");
;
;
const evaluateConditions = (conditions = [], options)=>{
    const conditionsReferenceRecord = {};
    for (const condition of conditions){
        const { result, toAssign } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateCondition$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateCondition"])(condition, {
            ...options,
            referenceRecord: {
                ...options.referenceRecord,
                ...conditionsReferenceRecord
            }
        });
        if (!result) {
            return {
                result
            };
        }
        if (toAssign) {
            conditionsReferenceRecord[toAssign.name] = toAssign.value;
            options.logger?.debug?.(`${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["debugId"]} assign: ${toAssign.name} := ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDebugString"])(toAssign.value)}`);
        }
    }
    return {
        result: true,
        referenceRecord: conditionsReferenceRecord
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEndpointHeaders",
    ()=>getEndpointHeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateExpression$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js [app-route] (ecmascript)");
;
;
const getEndpointHeaders = (headers, options)=>Object.entries(headers).reduce((acc, [headerKey, headerVal])=>({
            ...acc,
            [headerKey]: headerVal.map((headerValEntry)=>{
                const processedExpr = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateExpression$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateExpression"])(headerValEntry, "Header value entry", options);
                if (typeof processedExpr !== "string") {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Header '${headerKey}' value '${processedExpr}' is not a string`);
                }
                return processedExpr;
            })
        }), {});
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEndpointProperty",
    ()=>getEndpointProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateTemplate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTemplate.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointProperties$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js [app-route] (ecmascript)");
;
;
;
const getEndpointProperty = (property, options)=>{
    if (Array.isArray(property)) {
        return property.map((propertyEntry)=>getEndpointProperty(propertyEntry, options));
    }
    switch(typeof property){
        case "string":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateTemplate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateTemplate"])(property, options);
        case "object":
            if (property === null) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Unexpected endpoint property: ${property}`);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointProperties$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointProperties"])(property, options);
        case "boolean":
            return property;
        default:
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Unexpected endpoint property type: ${typeof property}`);
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEndpointProperties",
    ()=>getEndpointProperties
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointProperty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperty.js [app-route] (ecmascript)");
;
const getEndpointProperties = (properties, options)=>Object.entries(properties).reduce((acc, [propertyKey, propertyVal])=>({
            ...acc,
            [propertyKey]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointProperty$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointProperty"])(propertyVal, options)
        }), {});
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEndpointUrl",
    ()=>getEndpointUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateExpression$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js [app-route] (ecmascript)");
;
;
const getEndpointUrl = (endpointUrl, options)=>{
    const expression = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateExpression$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateExpression"])(endpointUrl, "Endpoint URL", options);
    if (typeof expression === "string") {
        try {
            return new URL(expression);
        } catch (error) {
            console.error(`Failed to construct URL with ${expression}`, error);
            throw error;
        }
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Endpoint URL must be a string, got ${typeof expression}`);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateEndpointRule",
    ()=>evaluateEndpointRule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateConditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointHeaders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointHeaders.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointProperties$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointProperties.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointUrl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/getEndpointUrl.js [app-route] (ecmascript)");
;
;
;
;
;
const evaluateEndpointRule = (endpointRule, options)=>{
    const { conditions, endpoint } = endpointRule;
    const { result, referenceRecord } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateConditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateConditions"])(conditions, options);
    if (!result) {
        return;
    }
    const endpointRuleOptions = {
        ...options,
        referenceRecord: {
            ...options.referenceRecord,
            ...referenceRecord
        }
    };
    const { url, properties, headers } = endpoint;
    options.logger?.debug?.(`${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["debugId"]} Resolving endpoint from template: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDebugString"])(endpoint)}`);
    return {
        ...headers != undefined && {
            headers: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointHeaders$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointHeaders"])(headers, endpointRuleOptions)
        },
        ...properties != undefined && {
            properties: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointProperties$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointProperties"])(properties, endpointRuleOptions)
        },
        url: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$getEndpointUrl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointUrl"])(url, endpointRuleOptions)
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateErrorRule",
    ()=>evaluateErrorRule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateConditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateExpression$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateExpression.js [app-route] (ecmascript)");
;
;
;
const evaluateErrorRule = (errorRule, options)=>{
    const { conditions, error } = errorRule;
    const { result, referenceRecord } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateConditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateConditions"])(conditions, options);
    if (!result) {
        return;
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateExpression$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateExpression"])(error, "Error", {
        ...options,
        referenceRecord: {
            ...options.referenceRecord,
            ...referenceRecord
        }
    }));
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateTreeRule",
    ()=>evaluateTreeRule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateConditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateConditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateRules$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js [app-route] (ecmascript)");
;
;
const evaluateTreeRule = (treeRule, options)=>{
    const { conditions, rules } = treeRule;
    const { result, referenceRecord } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateConditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateConditions"])(conditions, options);
    if (!result) {
        return;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateRules$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateRules"])(rules, {
        ...options,
        referenceRecord: {
            ...options.referenceRecord,
            ...referenceRecord
        }
    });
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "evaluateRules",
    ()=>evaluateRules
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateEndpointRule$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateEndpointRule.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateErrorRule$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateErrorRule.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateTreeRule$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateTreeRule.js [app-route] (ecmascript)");
;
;
;
;
const evaluateRules = (rules, options)=>{
    for (const rule of rules){
        if (rule.type === "endpoint") {
            const endpointOrUndefined = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateEndpointRule$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateEndpointRule"])(rule, options);
            if (endpointOrUndefined) {
                return endpointOrUndefined;
            }
        } else if (rule.type === "error") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateErrorRule$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateErrorRule"])(rule, options);
        } else if (rule.type === "tree") {
            const endpointOrUndefined = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateTreeRule$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateTreeRule"])(rule, options);
            if (endpointOrUndefined) {
                return endpointOrUndefined;
            }
        } else {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Unknown endpoint rule: ${rule}`);
        }
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Rules evaluation failed`);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveEndpoint",
    ()=>resolveEndpoint
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/debugId.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/debug/toDebugString.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/types/EndpointError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateRules$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/evaluateRules.js [app-route] (ecmascript)");
;
;
;
const resolveEndpoint = (ruleSetObject, options)=>{
    const { endpointParams, logger } = options;
    const { parameters, rules } = ruleSetObject;
    options.logger?.debug?.(`${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["debugId"]} Initial EndpointParams: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDebugString"])(endpointParams)}`);
    const paramsWithDefault = Object.entries(parameters).filter(([, v])=>v.default != null).map(([k, v])=>[
            k,
            v.default
        ]);
    if (paramsWithDefault.length > 0) {
        for (const [paramKey, paramDefaultValue] of paramsWithDefault){
            endpointParams[paramKey] = endpointParams[paramKey] ?? paramDefaultValue;
        }
    }
    const requiredParams = Object.entries(parameters).filter(([, v])=>v.required).map(([k])=>k);
    for (const requiredParam of requiredParams){
        if (endpointParams[requiredParam] == null) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$types$2f$EndpointError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointError"](`Missing required parameter: '${requiredParam}'`);
        }
    }
    const endpoint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$evaluateRules$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluateRules"])(rules, {
        endpointParams,
        logger,
        referenceRecord: {}
    });
    options.logger?.debug?.(`${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$debugId$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["debugId"]} Resolved endpoint: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$debug$2f$toDebugString$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toDebugString"])(endpoint)}`);
    return endpoint;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/ruleset.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ruleSet",
    ()=>ruleSet
]);
const F = "required", G = "type", H = "fn", I = "argv", J = "ref";
const a = false, b = true, c = "booleanEquals", d = "stringEquals", e = "sigv4", f = "sts", g = "us-east-1", h = "endpoint", i = "https://sts.{Region}.{PartitionResult#dnsSuffix}", j = "tree", k = "error", l = "getAttr", m = {
    [F]: false,
    [G]: "String"
}, n = {
    [F]: true,
    "default": false,
    [G]: "Boolean"
}, o = {
    [J]: "Endpoint"
}, p = {
    [H]: "isSet",
    [I]: [
        {
            [J]: "Region"
        }
    ]
}, q = {
    [J]: "Region"
}, r = {
    [H]: "aws.partition",
    [I]: [
        q
    ],
    "assign": "PartitionResult"
}, s = {
    [J]: "UseFIPS"
}, t = {
    [J]: "UseDualStack"
}, u = {
    "url": "https://sts.amazonaws.com",
    "properties": {
        "authSchemes": [
            {
                "name": e,
                "signingName": f,
                "signingRegion": g
            }
        ]
    },
    "headers": {}
}, v = {}, w = {
    "conditions": [
        {
            [H]: d,
            [I]: [
                q,
                "aws-global"
            ]
        }
    ],
    [h]: u,
    [G]: h
}, x = {
    [H]: c,
    [I]: [
        s,
        true
    ]
}, y = {
    [H]: c,
    [I]: [
        t,
        true
    ]
}, z = {
    [H]: l,
    [I]: [
        {
            [J]: "PartitionResult"
        },
        "supportsFIPS"
    ]
}, A = {
    [J]: "PartitionResult"
}, B = {
    [H]: c,
    [I]: [
        true,
        {
            [H]: l,
            [I]: [
                A,
                "supportsDualStack"
            ]
        }
    ]
}, C = [
    {
        [H]: "isSet",
        [I]: [
            o
        ]
    }
], D = [
    x
], E = [
    y
];
const _data = {
    version: "1.0",
    parameters: {
        Region: m,
        UseDualStack: n,
        UseFIPS: n,
        Endpoint: m,
        UseGlobalEndpoint: n
    },
    rules: [
        {
            conditions: [
                {
                    [H]: c,
                    [I]: [
                        {
                            [J]: "UseGlobalEndpoint"
                        },
                        b
                    ]
                },
                {
                    [H]: "not",
                    [I]: C
                },
                p,
                r,
                {
                    [H]: c,
                    [I]: [
                        s,
                        a
                    ]
                },
                {
                    [H]: c,
                    [I]: [
                        t,
                        a
                    ]
                }
            ],
            rules: [
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "ap-northeast-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "ap-south-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "ap-southeast-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "ap-southeast-2"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                w,
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "ca-central-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "eu-central-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "eu-north-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "eu-west-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "eu-west-2"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "eu-west-3"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "sa-east-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                g
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "us-east-2"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "us-west-1"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    conditions: [
                        {
                            [H]: d,
                            [I]: [
                                q,
                                "us-west-2"
                            ]
                        }
                    ],
                    endpoint: u,
                    [G]: h
                },
                {
                    endpoint: {
                        url: i,
                        properties: {
                            authSchemes: [
                                {
                                    name: e,
                                    signingName: f,
                                    signingRegion: "{Region}"
                                }
                            ]
                        },
                        headers: v
                    },
                    [G]: h
                }
            ],
            [G]: j
        },
        {
            conditions: C,
            rules: [
                {
                    conditions: D,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    [G]: k
                },
                {
                    conditions: E,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    [G]: k
                },
                {
                    endpoint: {
                        url: o,
                        properties: v,
                        headers: v
                    },
                    [G]: h
                }
            ],
            [G]: j
        },
        {
            conditions: [
                p
            ],
            rules: [
                {
                    conditions: [
                        r
                    ],
                    rules: [
                        {
                            conditions: [
                                x,
                                y
                            ],
                            rules: [
                                {
                                    conditions: [
                                        {
                                            [H]: c,
                                            [I]: [
                                                b,
                                                z
                                            ]
                                        },
                                        B
                                    ],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: v,
                                                headers: v
                                            },
                                            [G]: h
                                        }
                                    ],
                                    [G]: j
                                },
                                {
                                    error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                                    [G]: k
                                }
                            ],
                            [G]: j
                        },
                        {
                            conditions: D,
                            rules: [
                                {
                                    conditions: [
                                        {
                                            [H]: c,
                                            [I]: [
                                                z,
                                                b
                                            ]
                                        }
                                    ],
                                    rules: [
                                        {
                                            conditions: [
                                                {
                                                    [H]: d,
                                                    [I]: [
                                                        {
                                                            [H]: l,
                                                            [I]: [
                                                                A,
                                                                "name"
                                                            ]
                                                        },
                                                        "aws-us-gov"
                                                    ]
                                                }
                                            ],
                                            endpoint: {
                                                url: "https://sts.{Region}.amazonaws.com",
                                                properties: v,
                                                headers: v
                                            },
                                            [G]: h
                                        },
                                        {
                                            endpoint: {
                                                url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                                properties: v,
                                                headers: v
                                            },
                                            [G]: h
                                        }
                                    ],
                                    [G]: j
                                },
                                {
                                    error: "FIPS is enabled but this partition does not support FIPS",
                                    [G]: k
                                }
                            ],
                            [G]: j
                        },
                        {
                            conditions: E,
                            rules: [
                                {
                                    conditions: [
                                        B
                                    ],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: v,
                                                headers: v
                                            },
                                            [G]: h
                                        }
                                    ],
                                    [G]: j
                                },
                                {
                                    error: "DualStack is enabled but this partition does not support DualStack",
                                    [G]: k
                                }
                            ],
                            [G]: j
                        },
                        w,
                        {
                            endpoint: {
                                url: i,
                                properties: v,
                                headers: v
                            },
                            [G]: h
                        }
                    ],
                    [G]: j
                }
            ],
            [G]: j
        },
        {
            error: "Invalid Configuration: Missing Region",
            [G]: k
        }
    ]
};
const ruleSet = _data;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/endpointResolver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultEndpointResolver",
    ()=>defaultEndpointResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$aws$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-endpoints/dist-es/aws.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$cache$2f$EndpointCache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveEndpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$ruleset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/ruleset.js [app-route] (ecmascript)");
;
;
;
const cache = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$cache$2f$EndpointCache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointCache"]({
    size: 50,
    params: [
        "Endpoint",
        "Region",
        "UseDualStack",
        "UseFIPS",
        "UseGlobalEndpoint"
    ]
});
const defaultEndpointResolver = (endpointParams, context = {})=>{
    return cache.get(endpointParams, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveEndpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEndpoint"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$ruleset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ruleSet"], {
            endpointParams: endpointParams,
            logger: context.logger
        }));
};
__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customEndpointFunctions"].aws = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$aws$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsEndpointFunctions"];
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeConfig.shared.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntimeConfig",
    ()=>getRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$httpAuthSchemes$2f$noAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/url-parser/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-base64/dist-es/fromBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-base64/dist-es/toBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$endpointResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/endpointResolver.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
const getRuntimeConfig = (config)=>{
    return {
        apiVersion: "2011-06-15",
        base64Decoder: config?.base64Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBase64"],
        base64Encoder: config?.base64Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBase64"],
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$endpointResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultEndpointResolver"],
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultSTSHttpAuthSchemeProvider"],
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc)=>ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AwsSdkSigV4Signer"]()
            },
            {
                schemeId: "smithy.api#noAuth",
                identityProvider: (ipc)=>ipc.getIdentityProvider("smithy.api#noAuth") || (async ()=>({})),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$httpAuthSchemes$2f$noAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoAuthSigner"]()
            }
        ],
        logger: config?.logger ?? new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoOpLogger"](),
        serviceId: config?.serviceId ?? "STS",
        urlParser: config?.urlParser ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUrl"],
        utf8Decoder: config?.utf8Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"],
        utf8Encoder: config?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"]
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/defaults-mode.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadConfigsForDefaultMode",
    ()=>loadConfigsForDefaultMode
]);
const loadConfigsForDefaultMode = (mode)=>{
    switch(mode){
        case "standard":
            return {
                retryMode: "standard",
                connectionTimeout: 3100
            };
        case "in-region":
            return {
                retryMode: "standard",
                connectionTimeout: 1100
            };
        case "cross-region":
            return {
                retryMode: "standard",
                connectionTimeout: 3100
            };
        case "mobile":
            return {
                retryMode: "standard",
                connectionTimeout: 30000
            };
        default:
            return {};
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-defaults-mode-node/dist-es/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AWS_DEFAULT_REGION_ENV",
    ()=>AWS_DEFAULT_REGION_ENV,
    "AWS_EXECUTION_ENV",
    ()=>AWS_EXECUTION_ENV,
    "AWS_REGION_ENV",
    ()=>AWS_REGION_ENV,
    "DEFAULTS_MODE_OPTIONS",
    ()=>DEFAULTS_MODE_OPTIONS,
    "ENV_IMDS_DISABLED",
    ()=>ENV_IMDS_DISABLED,
    "IMDS_REGION_PATH",
    ()=>IMDS_REGION_PATH
]);
const AWS_EXECUTION_ENV = "AWS_EXECUTION_ENV";
const AWS_REGION_ENV = "AWS_REGION";
const AWS_DEFAULT_REGION_ENV = "AWS_DEFAULT_REGION";
const ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
const DEFAULTS_MODE_OPTIONS = [
    "in-region",
    "cross-region",
    "mobile",
    "standard",
    "legacy"
];
const IMDS_REGION_PATH = "/latest/meta-data/placement/region";
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-defaults-mode-node/dist-es/defaultsModeConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NODE_DEFAULTS_MODE_CONFIG_OPTIONS",
    ()=>NODE_DEFAULTS_MODE_CONFIG_OPTIONS
]);
const AWS_DEFAULTS_MODE_ENV = "AWS_DEFAULTS_MODE";
const AWS_DEFAULTS_MODE_CONFIG = "defaults_mode";
const NODE_DEFAULTS_MODE_CONFIG_OPTIONS = {
    environmentVariableSelector: (env)=>{
        return env[AWS_DEFAULTS_MODE_ENV];
    },
    configFileSelector: (profile)=>{
        return profile[AWS_DEFAULTS_MODE_CONFIG];
    },
    default: "legacy"
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-defaults-mode-node/dist-es/resolveDefaultsModeConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveDefaultsModeConfig",
    ()=>resolveDefaultsModeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/configLoader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$memoize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/property-provider/dist-es/memoize.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-defaults-mode-node/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$defaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-defaults-mode-node/dist-es/defaultsModeConfig.js [app-route] (ecmascript)");
;
;
;
;
;
const resolveDefaultsModeConfig = ({ region = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_OPTIONS"]), defaultsMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$defaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_DEFAULTS_MODE_CONFIG_OPTIONS"]) } = {})=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$memoize$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoize"])(async ()=>{
        const mode = typeof defaultsMode === "function" ? await defaultsMode() : defaultsMode;
        switch(mode?.toLowerCase()){
            case "auto":
                return resolveNodeDefaultsModeAuto(region);
            case "in-region":
            case "cross-region":
            case "mobile":
            case "standard":
            case "legacy":
                return Promise.resolve(mode?.toLocaleLowerCase());
            case undefined:
                return Promise.resolve("legacy");
            default:
                throw new Error(`Invalid parameter for "defaultsMode", expect ${__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULTS_MODE_OPTIONS"].join(", ")}, got ${mode}`);
        }
    });
const resolveNodeDefaultsModeAuto = async (clientRegion)=>{
    if (clientRegion) {
        const resolvedRegion = typeof clientRegion === "function" ? await clientRegion() : clientRegion;
        const inferredRegion = await inferPhysicalRegion();
        if (!inferredRegion) {
            return "standard";
        }
        if (resolvedRegion === inferredRegion) {
            return "in-region";
        } else {
            return "cross-region";
        }
    }
    return "standard";
};
const inferPhysicalRegion = async ()=>{
    if (process.env[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AWS_EXECUTION_ENV"]] && (process.env[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AWS_REGION_ENV"]] || process.env[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AWS_DEFAULT_REGION_ENV"]])) {
        return process.env[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AWS_REGION_ENV"]] ?? process.env[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AWS_DEFAULT_REGION_ENV"]];
    }
    if (!process.env[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENV_IMDS_DISABLED"]]) {
        try {
            const { getInstanceMetadataEndpoint, httpRequest } = await __turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/credential-provider-imds/dist-es/index.js [app-route] (ecmascript, async loader)");
            const endpoint = await getInstanceMetadataEndpoint();
            return (await httpRequest({
                ...endpoint,
                path: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IMDS_REGION_PATH"]
            })).toString();
        } catch (e) {}
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "emitWarningIfUnsupportedVersion",
    ()=>emitWarningIfUnsupportedVersion
]);
let warningEmitted = false;
const emitWarningIfUnsupportedVersion = (version)=>{
    if (version && !warningEmitted && parseInt(version.substring(1, version.indexOf("."))) < 16) {
        warningEmitted = true;
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntimeConfig",
    ()=>getRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$package$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/package.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$NODE_AUTH_SCHEME_PREFERENCE_OPTIONS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$nodeAppIdConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseDualstackEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseFipsEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$httpAuthSchemes$2f$noAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/util-identity-and-auth/httpAuthSchemes/noAuth.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$hash$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/hash-node/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-config-provider/dist-es/configLoader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/node-http-handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$body$2d$length$2d$node$2f$dist$2d$es$2f$calculateBodyLength$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-body-length-node/dist-es/calculateBodyLength.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-retry/dist-es/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$runtimeConfig$2e$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeConfig.shared.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$defaults$2d$mode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/defaults-mode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$resolveDefaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-defaults-mode-node/dist-es/resolveDefaultsModeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)");
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
const getRuntimeConfig = (config)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["emitWarningIfUnsupportedVersion"])(process.version);
    const defaultsMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$resolveDefaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveDefaultsModeConfig"])(config);
    const defaultConfigProvider = ()=>defaultsMode().then(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$defaults$2d$mode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfigsForDefaultMode"]);
    const clientSharedValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$runtimeConfig$2e$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRuntimeConfig"])(config);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["emitWarningIfUnsupportedVersion"])(process.version);
    const loaderConfig = {
        profile: config?.profile,
        logger: clientSharedValues.logger
    };
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        authSchemePreference: config?.authSchemePreference ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$NODE_AUTH_SCHEME_PREFERENCE_OPTIONS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_AUTH_SCHEME_PREFERENCE_OPTIONS"], loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$body$2d$length$2d$node$2f$dist$2d$es$2f$calculateBodyLength$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateBodyLength"],
        defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDefaultUserAgentProvider"])({
            serviceId: clientSharedValues.serviceId,
            clientVersion: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$package$2e$json__$28$json$29$__["default"].version
        }),
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc)=>ipc.getIdentityProvider("aws.auth#sigv4") || (async (idProps)=>await config.credentialDefaultProvider(idProps?.__config || {})()),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AwsSdkSigV4Signer"]()
            },
            {
                schemeId: "smithy.api#noAuth",
                identityProvider: (ipc)=>ipc.getIdentityProvider("smithy.api#noAuth") || (async ()=>({})),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$httpAuthSchemes$2f$noAuth$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoAuthSigner"]()
            }
        ],
        maxAttempts: config?.maxAttempts ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_MAX_ATTEMPT_CONFIG_OPTIONS"], config),
        region: config?.region ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_OPTIONS"], {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_FILE_OPTIONS"],
            ...loaderConfig
        }),
        requestHandler: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NodeHttpHandler"].create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_RETRY_MODE_CONFIG_OPTIONS"],
            default: async ()=>(await defaultConfigProvider()).retryMode || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_RETRY_MODE"]
        }, config),
        sha256: config?.sha256 ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$hash$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hash"].bind(null, "sha256"),
        streamCollector: config?.streamCollector ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["streamCollector"],
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseDualstackEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS"], loaderConfig),
        useFipsEndpoint: config?.useFipsEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseFipsEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS"], loaderConfig),
        userAgentAppId: config?.userAgentAppId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$nodeAppIdConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_APP_ID_CONFIG_OPTIONS"], loaderConfig)
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAwsRegionExtensionConfiguration",
    ()=>getAwsRegionExtensionConfiguration,
    "resolveAwsRegionExtensionConfiguration",
    ()=>resolveAwsRegionExtensionConfiguration
]);
const getAwsRegionExtensionConfiguration = (runtimeConfig)=>{
    return {
        setRegion (region) {
            runtimeConfig.region = region;
        },
        region () {
            return runtimeConfig.region;
        }
    };
};
const resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration)=>{
    return {
        region: awsRegionExtensionConfiguration.region()
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/config.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NODE_REGION_CONFIG_FILE_OPTIONS",
    ()=>NODE_REGION_CONFIG_FILE_OPTIONS,
    "NODE_REGION_CONFIG_OPTIONS",
    ()=>NODE_REGION_CONFIG_OPTIONS,
    "REGION_ENV_NAME",
    ()=>REGION_ENV_NAME,
    "REGION_INI_NAME",
    ()=>REGION_INI_NAME
]);
const REGION_ENV_NAME = "AWS_REGION";
const REGION_INI_NAME = "region";
const NODE_REGION_CONFIG_OPTIONS = {
    environmentVariableSelector: (env)=>env[REGION_ENV_NAME],
    configFileSelector: (profile)=>profile[REGION_INI_NAME],
    default: ()=>{
        throw new Error("Region is missing");
    }
};
const NODE_REGION_CONFIG_FILE_OPTIONS = {
    preferredFile: "credentials"
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFipsRegion",
    ()=>isFipsRegion
]);
const isFipsRegion = (region)=>typeof region === "string" && (region.startsWith("fips-") || region.endsWith("-fips"));
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/getRealRegion.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRealRegion",
    ()=>getRealRegion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$isFipsRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js [app-route] (ecmascript)");
;
const getRealRegion = (region)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$isFipsRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFipsRegion"])(region) ? [
        "fips-aws-global",
        "aws-fips"
    ].includes(region) ? "us-east-1" : region.replace(/fips-(dkr-|prod-)?|-fips/, "") : region;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/resolveRegionConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveRegionConfig",
    ()=>resolveRegionConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$getRealRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/getRealRegion.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$isFipsRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/isFipsRegion.js [app-route] (ecmascript)");
;
;
const resolveRegionConfig = (input)=>{
    const { region, useFipsEndpoint } = input;
    if (!region) {
        throw new Error("Region is missing");
    }
    return Object.assign(input, {
        region: async ()=>{
            if (typeof region === "string") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$getRealRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRealRegion"])(region);
            }
            const providedRegion = await region();
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$getRealRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRealRegion"])(providedRegion);
        },
        useFipsEndpoint: async ()=>{
            const providedRegion = typeof region === "string" ? region : await region();
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$isFipsRegion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isFipsRegion"])(providedRegion)) {
                return true;
            }
            return typeof useFipsEndpoint !== "function" ? Promise.resolve(!!useFipsEndpoint) : useFipsEndpoint();
        }
    });
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$resolveRegionConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/resolveRegionConfig.js [app-route] (ecmascript)");
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/regionConfig/index.js [app-route] (ecmascript) <locals>");
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHttpHandlerExtensionConfiguration",
    ()=>getHttpHandlerExtensionConfiguration,
    "resolveHttpHandlerRuntimeConfig",
    ()=>resolveHttpHandlerRuntimeConfig
]);
const getHttpHandlerExtensionConfiguration = (runtimeConfig)=>{
    return {
        setHttpHandler (handler) {
            runtimeConfig.httpHandler = handler;
        },
        httpHandler () {
            return runtimeConfig.httpHandler;
        },
        updateHttpClientConfig (key, value) {
            runtimeConfig.httpHandler?.updateHttpClientConfig(key, value);
        },
        httpHandlerConfigs () {
            return runtimeConfig.httpHandler.httpHandlerConfigs();
        }
    };
};
const resolveHttpHandlerRuntimeConfig = (httpHandlerExtensionConfiguration)=>{
    return {
        httpHandler: httpHandlerExtensionConfiguration.httpHandler()
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/extensions/checksum.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlgorithmId",
    ()=>AlgorithmId,
    "getChecksumConfiguration",
    ()=>getChecksumConfiguration,
    "resolveChecksumRuntimeConfig",
    ()=>resolveChecksumRuntimeConfig
]);
var AlgorithmId;
(function(AlgorithmId) {
    AlgorithmId["MD5"] = "md5";
    AlgorithmId["CRC32"] = "crc32";
    AlgorithmId["CRC32C"] = "crc32c";
    AlgorithmId["SHA1"] = "sha1";
    AlgorithmId["SHA256"] = "sha256";
})(AlgorithmId || (AlgorithmId = {}));
const getChecksumConfiguration = (runtimeConfig)=>{
    const checksumAlgorithms = [];
    if (runtimeConfig.sha256 !== undefined) {
        checksumAlgorithms.push({
            algorithmId: ()=>AlgorithmId.SHA256,
            checksumConstructor: ()=>runtimeConfig.sha256
        });
    }
    if (runtimeConfig.md5 != undefined) {
        checksumAlgorithms.push({
            algorithmId: ()=>AlgorithmId.MD5,
            checksumConstructor: ()=>runtimeConfig.md5
        });
    }
    return {
        addChecksumAlgorithm (algo) {
            checksumAlgorithms.push(algo);
        },
        checksumAlgorithms () {
            return checksumAlgorithms;
        }
    };
};
const resolveChecksumRuntimeConfig = (clientConfig)=>{
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm)=>{
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/extensions/checksum.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getChecksumConfiguration",
    ()=>getChecksumConfiguration,
    "resolveChecksumRuntimeConfig",
    ()=>resolveChecksumRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$extensions$2f$checksum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/extensions/checksum.js [app-route] (ecmascript)");
;
;
const getChecksumConfiguration = (runtimeConfig)=>{
    const checksumAlgorithms = [];
    for(const id in __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$extensions$2f$checksum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmId"]){
        const algorithmId = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$extensions$2f$checksum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AlgorithmId"][id];
        if (runtimeConfig[algorithmId] === undefined) {
            continue;
        }
        checksumAlgorithms.push({
            algorithmId: ()=>algorithmId,
            checksumConstructor: ()=>runtimeConfig[algorithmId]
        });
    }
    return {
        addChecksumAlgorithm (algo) {
            checksumAlgorithms.push(algo);
        },
        checksumAlgorithms () {
            return checksumAlgorithms;
        }
    };
};
const resolveChecksumRuntimeConfig = (clientConfig)=>{
    const runtimeConfig = {};
    clientConfig.checksumAlgorithms().forEach((checksumAlgorithm)=>{
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
    });
    return runtimeConfig;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/extensions/retry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRetryConfiguration",
    ()=>getRetryConfiguration,
    "resolveRetryRuntimeConfig",
    ()=>resolveRetryRuntimeConfig
]);
const getRetryConfiguration = (runtimeConfig)=>{
    return {
        setRetryStrategy (retryStrategy) {
            runtimeConfig.retryStrategy = retryStrategy;
        },
        retryStrategy () {
            return runtimeConfig.retryStrategy;
        }
    };
};
const resolveRetryRuntimeConfig = (retryStrategyConfiguration)=>{
    const runtimeConfig = {};
    runtimeConfig.retryStrategy = retryStrategyConfiguration.retryStrategy();
    return runtimeConfig;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDefaultClientConfiguration",
    ()=>getDefaultClientConfiguration,
    "getDefaultExtensionConfiguration",
    ()=>getDefaultExtensionConfiguration,
    "resolveDefaultRuntimeConfig",
    ()=>resolveDefaultRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$checksum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/extensions/checksum.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$retry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/extensions/retry.js [app-route] (ecmascript)");
;
;
const getDefaultExtensionConfiguration = (runtimeConfig)=>{
    return Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$checksum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getChecksumConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$retry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRetryConfiguration"])(runtimeConfig));
};
const getDefaultClientConfiguration = getDefaultExtensionConfiguration;
const resolveDefaultRuntimeConfig = (config)=>{
    return Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$checksum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["resolveChecksumRuntimeConfig"])(config), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$retry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRetryRuntimeConfig"])(config));
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/auth/httpAuthExtensionConfiguration.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getHttpAuthExtensionConfiguration",
    ()=>getHttpAuthExtensionConfiguration,
    "resolveHttpAuthRuntimeConfig",
    ()=>resolveHttpAuthRuntimeConfig
]);
const getHttpAuthExtensionConfiguration = (runtimeConfig)=>{
    const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
    let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
    let _credentials = runtimeConfig.credentials;
    return {
        setHttpAuthScheme (httpAuthScheme) {
            const index = _httpAuthSchemes.findIndex((scheme)=>scheme.schemeId === httpAuthScheme.schemeId);
            if (index === -1) {
                _httpAuthSchemes.push(httpAuthScheme);
            } else {
                _httpAuthSchemes.splice(index, 1, httpAuthScheme);
            }
        },
        httpAuthSchemes () {
            return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider (httpAuthSchemeProvider) {
            _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider () {
            return _httpAuthSchemeProvider;
        },
        setCredentials (credentials) {
            _credentials = credentials;
        },
        credentials () {
            return _credentials;
        }
    };
};
const resolveHttpAuthRuntimeConfig = (config)=>{
    return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials()
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeExtensions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveRuntimeExtensions",
    ()=>resolveRuntimeExtensions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/auth/httpAuthExtensionConfiguration.js [app-route] (ecmascript)");
;
;
;
;
const resolveRuntimeExtensions = (runtimeConfig, extensions)=>{
    const extensionConfiguration = Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAwsRegionExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpHandlerExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpAuthExtensionConfiguration"])(runtimeConfig));
    extensions.forEach((extension)=>extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAwsRegionExtensionConfiguration"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveDefaultRuntimeConfig"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpHandlerRuntimeConfig"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpAuthRuntimeConfig"])(extensionConfiguration));
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STSClient",
    ()=>STSClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-host-header/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-logger/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$recursion$2d$detection$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$resolveRegionConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$DefaultIdentityProviderConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$getHttpAuthSchemeEndpointRuleSetPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$getHttpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$content$2d$length$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-content-length/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$resolveEndpointConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$retryMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-retry/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$runtimeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$runtimeExtensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/runtimeExtensions.js [app-route] (ecmascript)");
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
class STSClient extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"] {
    config;
    constructor(...[configuration]){
        const _config_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$runtimeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRuntimeConfig"])(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveClientEndpointParameters"])(_config_0);
        const _config_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveUserAgentConfig"])(_config_1);
        const _config_3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRetryConfig"])(_config_2);
        const _config_4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$resolveRegionConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRegionConfig"])(_config_3);
        const _config_5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHostHeaderConfig"])(_config_4);
        const _config_6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$resolveEndpointConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEndpointConfig"])(_config_5);
        const _config_7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpAuthSchemeConfig"])(_config_6);
        const _config_8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$runtimeExtensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRuntimeExtensions"])(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserAgentPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$retryMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRetryPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$content$2d$length$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getContentLengthPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHostHeaderPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLoggerPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$recursion$2d$detection$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecursionDetectionPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$getHttpAuthSchemeEndpointRuleSetPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpAuthSchemeEndpointRuleSetPlugin"])(this.config, {
            httpAuthSchemeParametersProvider: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultSTSHttpAuthSchemeParametersProvider"],
            identityProviderConfigProvider: async (config)=>new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$DefaultIdentityProviderConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultIdentityProviderConfig"]({
                    "aws.auth#sigv4": config.credentials
                })
        }));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$getHttpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpSigningPlugin"])(this.config));
    }
    destroy() {
        super.destroy();
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAggregatedClient",
    ()=>createAggregatedClient
]);
const createAggregatedClient = (commands, Client)=>{
    for (const command of Object.keys(commands)){
        const CommandCtor = commands[command];
        const methodImpl = async function(args, optionsOrCb, cb) {
            const command = new CommandCtor(args);
            if (typeof optionsOrCb === "function") {
                this.send(command, optionsOrCb);
            } else if (typeof cb === "function") {
                if (typeof optionsOrCb !== "object") throw new Error(`Expected http options but got ${typeof optionsOrCb}`);
                this.send(command, optionsOrCb || {}, cb);
            } else {
                return this.send(command, optionsOrCb);
            }
        };
        const methodName = (command[0].toLowerCase() + command.slice(1)).replace(/Command$/, "");
        Client.prototype[methodName] = methodImpl;
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-serde/dist-es/deserializerMiddleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deserializerMiddleware",
    ()=>deserializerMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpResponse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpResponse.js [app-route] (ecmascript)");
;
const deserializerMiddleware = (options, deserializer)=>(next, context)=>async (args)=>{
            const { response } = await next(args);
            try {
                const parsed = await deserializer(response, options);
                return {
                    response,
                    output: parsed
                };
            } catch (error) {
                Object.defineProperty(error, "$response", {
                    value: response
                });
                if (!("$metadata" in error)) {
                    const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
                    try {
                        error.message += "\n  " + hint;
                    } catch (e) {
                        if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") {
                            console.warn(hint);
                        } else {
                            context.logger?.warn?.(hint);
                        }
                    }
                    if (typeof error.$responseBodyText !== "undefined") {
                        if (error.$response) {
                            error.$response.body = error.$responseBodyText;
                        }
                    }
                    try {
                        if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpResponse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpResponse"].isInstance(response)) {
                            const { headers = {} } = response;
                            const headerEntries = Object.entries(headers);
                            error.$metadata = {
                                httpStatusCode: response.statusCode,
                                requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
                                extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
                                cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
                            };
                        }
                    } catch (e) {}
                }
                throw error;
            }
        };
const findHeader = (pattern, headers)=>{
    return (headers.find(([k])=>{
        return k.match(pattern);
    }) || [
        void 0,
        void 1
    ])[1];
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-serde/dist-es/serializerMiddleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializerMiddleware",
    ()=>serializerMiddleware
]);
const serializerMiddleware = (options, serializer)=>(next, context)=>async (args)=>{
            const endpointConfig = options;
            const endpoint = context.endpointV2?.url && endpointConfig.urlParser ? async ()=>endpointConfig.urlParser(context.endpointV2.url) : endpointConfig.endpoint;
            if (!endpoint) {
                throw new Error("No valid endpoint provider available.");
            }
            const request = await serializer(args.input, {
                ...options,
                endpoint
            });
            return next({
                ...args,
                request
            });
        };
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deserializerMiddlewareOption",
    ()=>deserializerMiddlewareOption,
    "getSerdePlugin",
    ()=>getSerdePlugin,
    "serializerMiddlewareOption",
    ()=>serializerMiddlewareOption
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$deserializerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-serde/dist-es/deserializerMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serializerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-serde/dist-es/serializerMiddleware.js [app-route] (ecmascript)");
;
;
const deserializerMiddlewareOption = {
    name: "deserializerMiddleware",
    step: "deserialize",
    tags: [
        "DESERIALIZER"
    ],
    override: true
};
const serializerMiddlewareOption = {
    name: "serializerMiddleware",
    step: "serialize",
    tags: [
        "SERIALIZER"
    ],
    override: true
};
function getSerdePlugin(config, serializer, deserializer) {
    return {
        applyToStack: (commandStack)=>{
            commandStack.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$deserializerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deserializerMiddleware"])(config, deserializer), deserializerMiddlewareOption);
            commandStack.add((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serializerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializerMiddleware"])(config, serializer), serializerMiddlewareOption);
        }
    };
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/setFeature.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setFeature",
    ()=>setFeature
]);
function setFeature(context, feature, value) {
    if (!context.__smithy_context) {
        context.__smithy_context = {
            features: {}
        };
    } else if (!context.__smithy_context.features) {
        context.__smithy_context.features = {};
    }
    context.__smithy_context.features[feature] = value;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DOT_PATTERN",
    ()=>DOT_PATTERN,
    "S3_HOSTNAME_PATTERN",
    ()=>S3_HOSTNAME_PATTERN,
    "isArnBucketName",
    ()=>isArnBucketName,
    "isDnsCompatibleBucketName",
    ()=>isDnsCompatibleBucketName,
    "resolveParamsForS3",
    ()=>resolveParamsForS3
]);
const resolveParamsForS3 = async (endpointParams)=>{
    const bucket = endpointParams?.Bucket || "";
    if (typeof endpointParams.Bucket === "string") {
        endpointParams.Bucket = bucket.replace(/#/g, encodeURIComponent("#")).replace(/\?/g, encodeURIComponent("?"));
    }
    if (isArnBucketName(bucket)) {
        if (endpointParams.ForcePathStyle === true) {
            throw new Error("Path-style addressing cannot be used with ARN buckets");
        }
    } else if (!isDnsCompatibleBucketName(bucket) || bucket.indexOf(".") !== -1 && !String(endpointParams.Endpoint).startsWith("http:") || bucket.toLowerCase() !== bucket || bucket.length < 3) {
        endpointParams.ForcePathStyle = true;
    }
    if (endpointParams.DisableMultiRegionAccessPoints) {
        endpointParams.disableMultiRegionAccessPoints = true;
        endpointParams.DisableMRAP = true;
    }
    return endpointParams;
};
const DOMAIN_PATTERN = /^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/;
const IP_ADDRESS_PATTERN = /(\d+\.){3}\d+/;
const DOTS_PATTERN = /\.\./;
const DOT_PATTERN = /\./;
const S3_HOSTNAME_PATTERN = /^(.+\.)?s3(-fips)?(\.dualstack)?[.-]([a-z0-9-]+)\./;
const isDnsCompatibleBucketName = (bucketName)=>DOMAIN_PATTERN.test(bucketName) && !IP_ADDRESS_PATTERN.test(bucketName) && !DOTS_PATTERN.test(bucketName);
const isArnBucketName = (bucketName)=>{
    const [arn, partition, service, , , bucket] = bucketName.split(":");
    const isArn = arn === "arn" && bucketName.split(":").length >= 6;
    const isValidArn = Boolean(isArn && partition && service && bucket);
    if (isArn && !isValidArn) {
        throw new Error(`Invalid ARN: ${bucketName} was an invalid ARN.`);
    }
    return isValidArn;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConfigValueProvider",
    ()=>createConfigValueProvider
]);
const createConfigValueProvider = (configKey, canonicalEndpointParamKey, config)=>{
    const configProvider = async ()=>{
        const configValue = config[configKey] ?? config[canonicalEndpointParamKey];
        if (typeof configValue === "function") {
            return configValue();
        }
        return configValue;
    };
    if (configKey === "credentialScope" || canonicalEndpointParamKey === "CredentialScope") {
        return async ()=>{
            const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
            const configValue = credentials?.credentialScope ?? credentials?.CredentialScope;
            return configValue;
        };
    }
    if (configKey === "accountId" || canonicalEndpointParamKey === "AccountId") {
        return async ()=>{
            const credentials = typeof config.credentials === "function" ? await config.credentials() : config.credentials;
            const configValue = credentials?.accountId ?? credentials?.AccountId;
            return configValue;
        };
    }
    if (configKey === "endpoint" || canonicalEndpointParamKey === "endpoint") {
        return async ()=>{
            if (config.isCustomEndpoint === false) {
                return undefined;
            }
            const endpoint = await configProvider();
            if (endpoint && typeof endpoint === "object") {
                if ("url" in endpoint) {
                    return endpoint.url.href;
                }
                if ("hostname" in endpoint) {
                    const { protocol, hostname, port, path } = endpoint;
                    return `${protocol}//${hostname}${port ? ":" + port : ""}${path}`;
                }
            }
            return endpoint;
        };
    }
    return configProvider;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEndpointFromInstructions",
    ()=>getEndpointFromInstructions,
    "resolveParams",
    ()=>resolveParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$service$2d$customizations$2f$s3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/service-customizations/s3.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$createConfigValueProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/createConfigValueProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$getEndpointFromConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$toEndpointV1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/toEndpointV1.js [app-route] (ecmascript)");
;
;
;
;
const getEndpointFromInstructions = async (commandInput, instructionsSupplier, clientConfig, context)=>{
    if (!clientConfig.isCustomEndpoint) {
        let endpointFromConfig;
        if (clientConfig.serviceConfiguredEndpoint) {
            endpointFromConfig = await clientConfig.serviceConfiguredEndpoint();
        } else {
            endpointFromConfig = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$getEndpointFromConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointFromConfig"])(clientConfig.serviceId);
        }
        if (endpointFromConfig) {
            clientConfig.endpoint = ()=>Promise.resolve((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$toEndpointV1$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toEndpointV1"])(endpointFromConfig));
            clientConfig.isCustomEndpoint = true;
        }
    }
    const endpointParams = await resolveParams(commandInput, instructionsSupplier, clientConfig);
    if (typeof clientConfig.endpointProvider !== "function") {
        throw new Error("config.endpointProvider is not set.");
    }
    const endpoint = clientConfig.endpointProvider(endpointParams, context);
    return endpoint;
};
const resolveParams = async (commandInput, instructionsSupplier, clientConfig)=>{
    const endpointParams = {};
    const instructions = instructionsSupplier?.getEndpointParameterInstructions?.() || {};
    for (const [name, instruction] of Object.entries(instructions)){
        switch(instruction.type){
            case "staticContextParams":
                endpointParams[name] = instruction.value;
                break;
            case "contextParams":
                endpointParams[name] = commandInput[instruction.name];
                break;
            case "clientContextParams":
            case "builtInParams":
                endpointParams[name] = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$createConfigValueProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createConfigValueProvider"])(instruction.name, name, clientConfig)();
                break;
            case "operationContextParams":
                endpointParams[name] = instruction.get(commandInput);
                break;
            default:
                throw new Error("Unrecognized endpoint parameter instruction: " + JSON.stringify(instruction));
        }
    }
    if (Object.keys(instructions).length === 0) {
        Object.assign(endpointParams, clientConfig);
    }
    if (String(clientConfig.serviceId).toLowerCase() === "s3") {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$service$2d$customizations$2f$s3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveParamsForS3"])(endpointParams);
    }
    return endpointParams;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "endpointMiddleware",
    ()=>endpointMiddleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/setFeature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$getEndpointFromInstructions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/adaptors/getEndpointFromInstructions.js [app-route] (ecmascript)");
;
;
;
const endpointMiddleware = ({ config, instructions })=>{
    return (next, context)=>async (args)=>{
            if (config.isCustomEndpoint) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$setFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setFeature"])(context, "ENDPOINT_OVERRIDE", "N");
            }
            const endpoint = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$adaptors$2f$getEndpointFromInstructions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointFromInstructions"])(args.input, {
                getEndpointParameterInstructions () {
                    return instructions;
                }
            }, {
                ...config
            }, context);
            context.endpointV2 = endpoint;
            context.authSchemes = endpoint.properties?.authSchemes;
            const authScheme = context.authSchemes?.[0];
            if (authScheme) {
                context["signing_region"] = authScheme.signingRegion;
                context["signing_service"] = authScheme.signingName;
                const smithyContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSmithyContext"])(context);
                const httpAuthOption = smithyContext?.selectedHttpAuthScheme?.httpAuthOption;
                if (httpAuthOption) {
                    httpAuthOption.signingProperties = Object.assign(httpAuthOption.signingProperties || {}, {
                        signing_region: authScheme.signingRegion,
                        signingRegion: authScheme.signingRegion,
                        signing_service: authScheme.signingName,
                        signingName: authScheme.signingName,
                        signingRegionSet: authScheme.signingRegionSet
                    }, authScheme.properties);
                }
            }
            return next({
                ...args
            });
        };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "endpointMiddlewareOptions",
    ()=>endpointMiddlewareOptions,
    "getEndpointPlugin",
    ()=>getEndpointPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$endpointMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/endpointMiddleware.js [app-route] (ecmascript)");
;
;
const endpointMiddlewareOptions = {
    step: "serialize",
    tags: [
        "ENDPOINT_PARAMETERS",
        "ENDPOINT_V2",
        "ENDPOINT"
    ],
    name: "endpointV2Middleware",
    override: true,
    relation: "before",
    toMiddleware: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializerMiddlewareOption"].name
};
const getEndpointPlugin = (config, instructions)=>({
        applyToStack: (clientStack)=>{
            clientStack.addRelativeTo((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$endpointMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["endpointMiddleware"])({
                config,
                instructions
            }), endpointMiddlewareOptions);
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/deref.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deref",
    ()=>deref
]);
const deref = (schemaRef)=>{
    if (typeof schemaRef === "function") {
        return schemaRef();
    }
    return schemaRef;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypeRegistry",
    ()=>TypeRegistry
]);
class TypeRegistry {
    constructor(namespace, schemas = new Map()){
        this.namespace = namespace;
        this.schemas = schemas;
    }
    static for(namespace) {
        if (!TypeRegistry.registries.has(namespace)) {
            TypeRegistry.registries.set(namespace, new TypeRegistry(namespace));
        }
        return TypeRegistry.registries.get(namespace);
    }
    register(shapeId, schema) {
        const qualifiedName = this.normalizeShapeId(shapeId);
        const registry = TypeRegistry.for(this.getNamespace(shapeId));
        registry.schemas.set(qualifiedName, schema);
    }
    getSchema(shapeId) {
        const id = this.normalizeShapeId(shapeId);
        if (!this.schemas.has(id)) {
            throw new Error(`@smithy/core/schema - schema not found for ${id}`);
        }
        return this.schemas.get(id);
    }
    getBaseException() {
        for (const [id, schema] of this.schemas.entries()){
            if (id.startsWith("smithy.ts.sdk.synthetic.") && id.endsWith("ServiceException")) {
                return schema;
            }
        }
        return undefined;
    }
    find(predicate) {
        return [
            ...this.schemas.values()
        ].find(predicate);
    }
    destroy() {
        TypeRegistry.registries.delete(this.namespace);
        this.schemas.clear();
    }
    normalizeShapeId(shapeId) {
        if (shapeId.includes("#")) {
            return shapeId;
        }
        return this.namespace + "#" + shapeId;
    }
    getNamespace(shapeId) {
        return this.normalizeShapeId(shapeId).split("#")[0];
    }
}
TypeRegistry.registries = new Map();
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/Schema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Schema",
    ()=>Schema
]);
class Schema {
    constructor(name, traits){
        this.name = name;
        this.traits = traits;
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/ListSchema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ListSchema",
    ()=>ListSchema,
    "list",
    ()=>list
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$TypeRegistry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$Schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/Schema.js [app-route] (ecmascript)");
;
;
class ListSchema extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$Schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Schema"] {
    constructor(name, traits, valueSchema){
        super(name, traits);
        this.name = name;
        this.traits = traits;
        this.valueSchema = valueSchema;
        this.symbol = ListSchema.symbol;
    }
    static [Symbol.hasInstance](lhs) {
        const isPrototype = ListSchema.prototype.isPrototypeOf(lhs);
        if (!isPrototype && typeof lhs === "object" && lhs !== null) {
            const list = lhs;
            return list.symbol === ListSchema.symbol;
        }
        return isPrototype;
    }
}
ListSchema.symbol = Symbol.for("@smithy/core/schema::ListSchema");
function list(namespace, name, traits = {}, valueSchema) {
    const schema = new ListSchema(namespace + "#" + name, traits, typeof valueSchema === "function" ? valueSchema() : valueSchema);
    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$TypeRegistry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeRegistry"].for(namespace).register(name, schema);
    return schema;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/MapSchema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapSchema",
    ()=>MapSchema,
    "map",
    ()=>map
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$TypeRegistry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$Schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/Schema.js [app-route] (ecmascript)");
;
;
class MapSchema extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$Schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Schema"] {
    constructor(name, traits, keySchema, valueSchema){
        super(name, traits);
        this.name = name;
        this.traits = traits;
        this.keySchema = keySchema;
        this.valueSchema = valueSchema;
        this.symbol = MapSchema.symbol;
    }
    static [Symbol.hasInstance](lhs) {
        const isPrototype = MapSchema.prototype.isPrototypeOf(lhs);
        if (!isPrototype && typeof lhs === "object" && lhs !== null) {
            const map = lhs;
            return map.symbol === MapSchema.symbol;
        }
        return isPrototype;
    }
}
MapSchema.symbol = Symbol.for("@smithy/core/schema::MapSchema");
function map(namespace, name, traits = {}, keySchema, valueSchema) {
    const schema = new MapSchema(namespace + "#" + name, traits, keySchema, typeof valueSchema === "function" ? valueSchema() : valueSchema);
    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$TypeRegistry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeRegistry"].for(namespace).register(name, schema);
    return schema;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/sentinels.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SCHEMA",
    ()=>SCHEMA
]);
const SCHEMA = {
    BLOB: 21,
    STREAMING_BLOB: 42,
    BOOLEAN: 2,
    STRING: 0,
    NUMERIC: 1,
    BIG_INTEGER: 17,
    BIG_DECIMAL: 19,
    DOCUMENT: 15,
    TIMESTAMP_DEFAULT: 4,
    TIMESTAMP_DATE_TIME: 5,
    TIMESTAMP_HTTP_DATE: 6,
    TIMESTAMP_EPOCH_SECONDS: 7,
    LIST_MODIFIER: 64,
    MAP_MODIFIER: 128
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/SimpleSchema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SimpleSchema",
    ()=>SimpleSchema,
    "sim",
    ()=>sim
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$TypeRegistry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$Schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/Schema.js [app-route] (ecmascript)");
;
;
class SimpleSchema extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$Schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Schema"] {
    constructor(name, schemaRef, traits){
        super(name, traits);
        this.name = name;
        this.schemaRef = schemaRef;
        this.traits = traits;
        this.symbol = SimpleSchema.symbol;
    }
    static [Symbol.hasInstance](lhs) {
        const isPrototype = SimpleSchema.prototype.isPrototypeOf(lhs);
        if (!isPrototype && typeof lhs === "object" && lhs !== null) {
            const sim = lhs;
            return sim.symbol === SimpleSchema.symbol;
        }
        return isPrototype;
    }
}
SimpleSchema.symbol = Symbol.for("@smithy/core/schema::SimpleSchema");
function sim(namespace, name, schemaRef, traits) {
    const schema = new SimpleSchema(namespace + "#" + name, schemaRef, traits);
    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$TypeRegistry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeRegistry"].for(namespace).register(name, schema);
    return schema;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/StructureSchema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StructureSchema",
    ()=>StructureSchema,
    "struct",
    ()=>struct
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$TypeRegistry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/TypeRegistry.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$Schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/Schema.js [app-route] (ecmascript)");
;
;
class StructureSchema extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$Schema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Schema"] {
    constructor(name, traits, memberNames, memberList){
        super(name, traits);
        this.name = name;
        this.traits = traits;
        this.memberNames = memberNames;
        this.memberList = memberList;
        this.symbol = StructureSchema.symbol;
        this.members = {};
        for(let i = 0; i < memberNames.length; ++i){
            this.members[memberNames[i]] = Array.isArray(memberList[i]) ? memberList[i] : [
                memberList[i],
                0
            ];
        }
    }
    static [Symbol.hasInstance](lhs) {
        const isPrototype = StructureSchema.prototype.isPrototypeOf(lhs);
        if (!isPrototype && typeof lhs === "object" && lhs !== null) {
            const struct = lhs;
            return struct.symbol === StructureSchema.symbol;
        }
        return isPrototype;
    }
}
StructureSchema.symbol = Symbol.for("@smithy/core/schema::StructureSchema");
function struct(namespace, name, traits, memberNames, memberList) {
    const schema = new StructureSchema(namespace + "#" + name, traits, memberNames, memberList);
    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$TypeRegistry$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TypeRegistry"].for(namespace).register(name, schema);
    return schema;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/NormalizedSchema.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NormalizedSchema",
    ()=>NormalizedSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$deref$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/deref.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$ListSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/ListSchema.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$MapSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/MapSchema.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/sentinels.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$SimpleSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/SimpleSchema.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$StructureSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/StructureSchema.js [app-route] (ecmascript)");
;
;
;
;
;
;
class NormalizedSchema {
    constructor(ref, memberName){
        this.ref = ref;
        this.memberName = memberName;
        this.symbol = NormalizedSchema.symbol;
        const traitStack = [];
        let _ref = ref;
        let schema = ref;
        this._isMemberSchema = false;
        while(Array.isArray(_ref)){
            traitStack.push(_ref[1]);
            _ref = _ref[0];
            schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$deref$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deref"])(_ref);
            this._isMemberSchema = true;
        }
        if (traitStack.length > 0) {
            this.memberTraits = {};
            for(let i = traitStack.length - 1; i >= 0; --i){
                const traitSet = traitStack[i];
                Object.assign(this.memberTraits, NormalizedSchema.translateTraits(traitSet));
            }
        } else {
            this.memberTraits = 0;
        }
        if (schema instanceof NormalizedSchema) {
            this.name = schema.name;
            this.traits = schema.traits;
            this._isMemberSchema = schema._isMemberSchema;
            this.schema = schema.schema;
            this.memberTraits = Object.assign({}, schema.getMemberTraits(), this.getMemberTraits());
            this.normalizedTraits = void 0;
            this.ref = schema.ref;
            this.memberName = memberName ?? schema.memberName;
            return;
        }
        this.schema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$deref$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deref"])(schema);
        if (this.schema && typeof this.schema === "object") {
            this.traits = this.schema?.traits ?? {};
        } else {
            this.traits = 0;
        }
        this.name = (typeof this.schema === "object" ? this.schema?.name : void 0) ?? this.memberName ?? this.getSchemaName();
        if (this._isMemberSchema && !memberName) {
            throw new Error(`@smithy/core/schema - NormalizedSchema member schema ${this.getName(true)} must initialize with memberName argument.`);
        }
    }
    static [Symbol.hasInstance](lhs) {
        const isPrototype = NormalizedSchema.prototype.isPrototypeOf(lhs);
        if (!isPrototype && typeof lhs === "object" && lhs !== null) {
            const ns = lhs;
            return ns.symbol === NormalizedSchema.symbol;
        }
        return isPrototype;
    }
    static of(ref, memberName) {
        if (ref instanceof NormalizedSchema) {
            return ref;
        }
        return new NormalizedSchema(ref, memberName);
    }
    static translateTraits(indicator) {
        if (typeof indicator === "object") {
            return indicator;
        }
        indicator = indicator | 0;
        const traits = {};
        if ((indicator & 1) === 1) {
            traits.httpLabel = 1;
        }
        if ((indicator >> 1 & 1) === 1) {
            traits.idempotent = 1;
        }
        if ((indicator >> 2 & 1) === 1) {
            traits.idempotencyToken = 1;
        }
        if ((indicator >> 3 & 1) === 1) {
            traits.sensitive = 1;
        }
        if ((indicator >> 4 & 1) === 1) {
            traits.httpPayload = 1;
        }
        if ((indicator >> 5 & 1) === 1) {
            traits.httpResponseCode = 1;
        }
        if ((indicator >> 6 & 1) === 1) {
            traits.httpQueryParams = 1;
        }
        return traits;
    }
    static memberFrom(memberSchema, memberName) {
        if (memberSchema instanceof NormalizedSchema) {
            memberSchema.memberName = memberName;
            memberSchema._isMemberSchema = true;
            return memberSchema;
        }
        return new NormalizedSchema(memberSchema, memberName);
    }
    getSchema() {
        if (this.schema instanceof NormalizedSchema) {
            return this.schema = this.schema.getSchema();
        }
        if (this.schema instanceof __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$SimpleSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SimpleSchema"]) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$deref$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deref"])(this.schema.schemaRef);
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$deref$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deref"])(this.schema);
    }
    getName(withNamespace = false) {
        if (!withNamespace) {
            if (this.name && this.name.includes("#")) {
                return this.name.split("#")[1];
            }
        }
        return this.name || undefined;
    }
    getMemberName() {
        if (!this.isMemberSchema()) {
            throw new Error(`@smithy/core/schema - cannot get member name on non-member schema: ${this.getName(true)}`);
        }
        return this.memberName;
    }
    isMemberSchema() {
        return this._isMemberSchema;
    }
    isUnitSchema() {
        return this.getSchema() === "unit";
    }
    isListSchema() {
        const inner = this.getSchema();
        if (typeof inner === "number") {
            return inner >= __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].LIST_MODIFIER && inner < __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].MAP_MODIFIER;
        }
        return inner instanceof __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$ListSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListSchema"];
    }
    isMapSchema() {
        const inner = this.getSchema();
        if (typeof inner === "number") {
            return inner >= __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].MAP_MODIFIER && inner <= 255;
        }
        return inner instanceof __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$MapSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MapSchema"];
    }
    isDocumentSchema() {
        return this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].DOCUMENT;
    }
    isStructSchema() {
        const inner = this.getSchema();
        return inner !== null && typeof inner === "object" && "members" in inner || inner instanceof __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$StructureSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StructureSchema"];
    }
    isBlobSchema() {
        return this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].BLOB || this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].STREAMING_BLOB;
    }
    isTimestampSchema() {
        const schema = this.getSchema();
        return typeof schema === "number" && schema >= __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].TIMESTAMP_DEFAULT && schema <= __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].TIMESTAMP_EPOCH_SECONDS;
    }
    isStringSchema() {
        return this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].STRING;
    }
    isBooleanSchema() {
        return this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].BOOLEAN;
    }
    isNumericSchema() {
        return this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].NUMERIC;
    }
    isBigIntegerSchema() {
        return this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].BIG_INTEGER;
    }
    isBigDecimalSchema() {
        return this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].BIG_DECIMAL;
    }
    isStreaming() {
        const streaming = !!this.getMergedTraits().streaming;
        if (streaming) {
            return true;
        }
        return this.getSchema() === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].STREAMING_BLOB;
    }
    isIdempotencyToken() {
        if (typeof this.traits === "number") {
            return (this.traits & 0b0100) === 0b0100;
        } else if (typeof this.traits === "object") {
            return !!this.traits.idempotencyToken;
        }
        return false;
    }
    getMergedTraits() {
        if (this.normalizedTraits) {
            return this.normalizedTraits;
        }
        this.normalizedTraits = {
            ...this.getOwnTraits(),
            ...this.getMemberTraits()
        };
        return this.normalizedTraits;
    }
    getMemberTraits() {
        return NormalizedSchema.translateTraits(this.memberTraits);
    }
    getOwnTraits() {
        return NormalizedSchema.translateTraits(this.traits);
    }
    getKeySchema() {
        if (this.isDocumentSchema()) {
            return NormalizedSchema.memberFrom([
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].DOCUMENT,
                0
            ], "key");
        }
        if (!this.isMapSchema()) {
            throw new Error(`@smithy/core/schema - cannot get key schema for non-map schema: ${this.getName(true)}`);
        }
        const schema = this.getSchema();
        if (typeof schema === "number") {
            return NormalizedSchema.memberFrom([
                63 & schema,
                0
            ], "key");
        }
        return NormalizedSchema.memberFrom([
            schema.keySchema,
            0
        ], "key");
    }
    getValueSchema() {
        const schema = this.getSchema();
        if (typeof schema === "number") {
            if (this.isMapSchema()) {
                return NormalizedSchema.memberFrom([
                    63 & schema,
                    0
                ], "value");
            } else if (this.isListSchema()) {
                return NormalizedSchema.memberFrom([
                    63 & schema,
                    0
                ], "member");
            }
        }
        if (schema && typeof schema === "object") {
            if (this.isStructSchema()) {
                throw new Error(`cannot call getValueSchema() with StructureSchema ${this.getName(true)}`);
            }
            const collection = schema;
            if ("valueSchema" in collection) {
                if (this.isMapSchema()) {
                    return NormalizedSchema.memberFrom([
                        collection.valueSchema,
                        0
                    ], "value");
                } else if (this.isListSchema()) {
                    return NormalizedSchema.memberFrom([
                        collection.valueSchema,
                        0
                    ], "member");
                }
            }
        }
        if (this.isDocumentSchema()) {
            return NormalizedSchema.memberFrom([
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].DOCUMENT,
                0
            ], "value");
        }
        throw new Error(`@smithy/core/schema - the schema ${this.getName(true)} does not have a value member.`);
    }
    hasMemberSchema(member) {
        if (this.isStructSchema()) {
            const struct = this.getSchema();
            return member in struct.members;
        }
        return false;
    }
    getMemberSchema(member) {
        if (this.isStructSchema()) {
            const struct = this.getSchema();
            if (!(member in struct.members)) {
                throw new Error(`@smithy/core/schema - the schema ${this.getName(true)} does not have a member with name=${member}.`);
            }
            return NormalizedSchema.memberFrom(struct.members[member], member);
        }
        if (this.isDocumentSchema()) {
            return NormalizedSchema.memberFrom([
                __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].DOCUMENT,
                0
            ], member);
        }
        throw new Error(`@smithy/core/schema - the schema ${this.getName(true)} does not have members.`);
    }
    getMemberSchemas() {
        const { schema } = this;
        const struct = schema;
        if (!struct || typeof struct !== "object") {
            return {};
        }
        if ("members" in struct) {
            const buffer = {};
            for (const member of struct.memberNames){
                buffer[member] = this.getMemberSchema(member);
            }
            return buffer;
        }
        return {};
    }
    getEventStreamMember() {
        if (this.isStructSchema()) {
            for (const [memberName, memberSchema] of this.structIterator()){
                if (memberSchema.isStreaming() && memberSchema.isStructSchema()) {
                    return memberName;
                }
            }
        }
        return "";
    }
    *structIterator() {
        if (this.isUnitSchema()) {
            return;
        }
        if (!this.isStructSchema()) {
            throw new Error("@smithy/core/schema - cannot acquire structIterator on non-struct schema.");
        }
        const struct = this.getSchema();
        for(let i = 0; i < struct.memberNames.length; ++i){
            yield [
                struct.memberNames[i],
                NormalizedSchema.memberFrom([
                    struct.memberList[i],
                    0
                ], struct.memberNames[i])
            ];
        }
    }
    getSchemaName() {
        const schema = this.getSchema();
        if (typeof schema === "number") {
            const _schema = 63 & schema;
            const container = 192 & schema;
            const type = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"]).find(([, value])=>{
                return value === _schema;
            })?.[0] ?? "Unknown";
            switch(container){
                case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].MAP_MODIFIER:
                    return `${type}Map`;
                case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$sentinels$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SCHEMA"].LIST_MODIFIER:
                    return `${type}List`;
                case 0:
                    return type;
            }
        }
        return "Unknown";
    }
}
NormalizedSchema.symbol = Symbol.for("@smithy/core/schema::NormalizedSchema");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/schemaLogFilter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "schemaLogFilter",
    ()=>schemaLogFilter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$NormalizedSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/schema/schemas/NormalizedSchema.js [app-route] (ecmascript)");
;
const SENSITIVE_STRING = "***SensitiveInformation***";
function schemaLogFilter(schema, data) {
    if (data == null) {
        return data;
    }
    const ns = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$schema$2f$schemas$2f$NormalizedSchema$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NormalizedSchema"].of(schema);
    if (ns.getMergedTraits().sensitive) {
        return SENSITIVE_STRING;
    }
    if (ns.isListSchema()) {
        const isSensitive = !!ns.getValueSchema().getMergedTraits().sensitive;
        if (isSensitive) {
            return SENSITIVE_STRING;
        }
    } else if (ns.isMapSchema()) {
        const isSensitive = !!ns.getKeySchema().getMergedTraits().sensitive || !!ns.getValueSchema().getMergedTraits().sensitive;
        if (isSensitive) {
            return SENSITIVE_STRING;
        }
    } else if (ns.isStructSchema() && typeof data === "object") {
        const object = data;
        const newObject = {};
        for (const [member, memberNs] of ns.structIterator()){
            if (object[member] != null) {
                newObject[member] = schemaLogFilter(memberNs, object[member]);
            }
        }
        return newObject;
    }
    return data;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Command",
    ()=>Command
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$stack$2f$dist$2d$es$2f$MiddlewareStack$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-stack/dist-es/MiddlewareStack.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/types/dist-es/middleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$schemaLogFilter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/schemaLogFilter.js [app-route] (ecmascript)");
;
;
;
class Command {
    constructor(){
        this.middlewareStack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$stack$2f$dist$2d$es$2f$MiddlewareStack$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["constructStack"])();
    }
    static classBuilder() {
        return new ClassBuilder();
    }
    resolveMiddlewareWithContext(clientStack, configuration, options, { middlewareFn, clientName, commandName, inputFilterSensitiveLog, outputFilterSensitiveLog, smithyContext, additionalContext, CommandCtor }) {
        for (const mw of middlewareFn.bind(this)(CommandCtor, clientStack, configuration, options)){
            this.middlewareStack.use(mw);
        }
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog,
            outputFilterSensitiveLog,
            [__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$types$2f$dist$2d$es$2f$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SMITHY_CONTEXT_KEY"]]: {
                commandInstance: this,
                ...smithyContext
            },
            ...additionalContext
        };
        const { requestHandler } = configuration;
        return stack.resolve((request)=>requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
}
class ClassBuilder {
    constructor(){
        this._init = ()=>{};
        this._ep = {};
        this._middlewareFn = ()=>[];
        this._commandName = "";
        this._clientName = "";
        this._additionalContext = {};
        this._smithyContext = {};
        this._inputFilterSensitiveLog = undefined;
        this._outputFilterSensitiveLog = undefined;
        this._serializer = null;
        this._deserializer = null;
    }
    init(cb) {
        this._init = cb;
    }
    ep(endpointParameterInstructions) {
        this._ep = endpointParameterInstructions;
        return this;
    }
    m(middlewareSupplier) {
        this._middlewareFn = middlewareSupplier;
        return this;
    }
    s(service, operation, smithyContext = {}) {
        this._smithyContext = {
            service,
            operation,
            ...smithyContext
        };
        return this;
    }
    c(additionalContext = {}) {
        this._additionalContext = additionalContext;
        return this;
    }
    n(clientName, commandName) {
        this._clientName = clientName;
        this._commandName = commandName;
        return this;
    }
    f(inputFilter = (_)=>_, outputFilter = (_)=>_) {
        this._inputFilterSensitiveLog = inputFilter;
        this._outputFilterSensitiveLog = outputFilter;
        return this;
    }
    ser(serializer) {
        this._serializer = serializer;
        return this;
    }
    de(deserializer) {
        this._deserializer = deserializer;
        return this;
    }
    sc(operation) {
        this._operationSchema = operation;
        this._smithyContext.operationSchema = operation;
        return this;
    }
    build() {
        const closure = this;
        let CommandRef;
        return CommandRef = class extends Command {
            static getEndpointParameterInstructions() {
                return closure._ep;
            }
            constructor(...[input]){
                super();
                this.serialize = closure._serializer;
                this.deserialize = closure._deserializer;
                this.input = input ?? {};
                closure._init(this);
                this.schema = closure._operationSchema;
            }
            resolveMiddleware(stack, configuration, options) {
                return this.resolveMiddlewareWithContext(stack, configuration, options, {
                    CommandCtor: CommandRef,
                    middlewareFn: closure._middlewareFn,
                    clientName: closure._clientName,
                    commandName: closure._commandName,
                    inputFilterSensitiveLog: closure._inputFilterSensitiveLog ?? (closure._operationSchema ? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$schemaLogFilter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaLogFilter"].bind(null, closure._operationSchema.input) : (_)=>_),
                    outputFilterSensitiveLog: closure._outputFilterSensitiveLog ?? (closure._operationSchema ? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$schemaLogFilter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["schemaLogFilter"].bind(null, closure._operationSchema.output) : (_)=>_),
                    smithyContext: closure._smithyContext,
                    additionalContext: closure._additionalContext
                });
            }
        };
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SENSITIVE_STRING",
    ()=>SENSITIVE_STRING
]);
const SENSITIVE_STRING = "***SensitiveInformation***";
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/exceptions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ServiceException",
    ()=>ServiceException,
    "decorateServiceException",
    ()=>decorateServiceException
]);
class ServiceException extends Error {
    constructor(options){
        super(options.message);
        Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype);
        this.name = options.name;
        this.$fault = options.$fault;
        this.$metadata = options.$metadata;
    }
    static isInstance(value) {
        if (!value) return false;
        const candidate = value;
        return ServiceException.prototype.isPrototypeOf(candidate) || Boolean(candidate.$fault) && Boolean(candidate.$metadata) && (candidate.$fault === "client" || candidate.$fault === "server");
    }
    static [Symbol.hasInstance](instance) {
        if (!instance) return false;
        const candidate = instance;
        if (this === ServiceException) {
            return ServiceException.isInstance(instance);
        }
        if (ServiceException.isInstance(instance)) {
            if (candidate.name && this.name) {
                return this.prototype.isPrototypeOf(instance) || candidate.name === this.name;
            }
            return this.prototype.isPrototypeOf(instance);
        }
        return false;
    }
}
const decorateServiceException = (exception, additions = {})=>{
    Object.entries(additions).filter(([, v])=>v !== undefined).forEach(([k, v])=>{
        if (exception[k] == undefined || exception[k] === "") {
            exception[k] = v;
        }
    });
    const message = exception.message || exception.Message || "UnknownError";
    exception.message = message;
    delete exception.Message;
    return exception;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/STSServiceException.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STSServiceException",
    ()=>STSServiceException
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/exceptions.js [app-route] (ecmascript)");
;
;
class STSServiceException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceException"] {
    constructor(options){
        super(options);
        Object.setPrototypeOf(this, STSServiceException.prototype);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/models_0.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssumeRoleResponseFilterSensitiveLog",
    ()=>AssumeRoleResponseFilterSensitiveLog,
    "AssumeRoleWithWebIdentityRequestFilterSensitiveLog",
    ()=>AssumeRoleWithWebIdentityRequestFilterSensitiveLog,
    "AssumeRoleWithWebIdentityResponseFilterSensitiveLog",
    ()=>AssumeRoleWithWebIdentityResponseFilterSensitiveLog,
    "CredentialsFilterSensitiveLog",
    ()=>CredentialsFilterSensitiveLog,
    "ExpiredTokenException",
    ()=>ExpiredTokenException,
    "IDPCommunicationErrorException",
    ()=>IDPCommunicationErrorException,
    "IDPRejectedClaimException",
    ()=>IDPRejectedClaimException,
    "InvalidIdentityTokenException",
    ()=>InvalidIdentityTokenException,
    "MalformedPolicyDocumentException",
    ()=>MalformedPolicyDocumentException,
    "PackedPolicyTooLargeException",
    ()=>PackedPolicyTooLargeException,
    "RegionDisabledException",
    ()=>RegionDisabledException
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/STSServiceException.js [app-route] (ecmascript) <locals>");
;
;
const CredentialsFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.SecretAccessKey && {
            SecretAccessKey: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const AssumeRoleResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Credentials && {
            Credentials: CredentialsFilterSensitiveLog(obj.Credentials)
        }
    });
class ExpiredTokenException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"] {
    name = "ExpiredTokenException";
    $fault = "client";
    constructor(opts){
        super({
            name: "ExpiredTokenException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ExpiredTokenException.prototype);
    }
}
class MalformedPolicyDocumentException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"] {
    name = "MalformedPolicyDocumentException";
    $fault = "client";
    constructor(opts){
        super({
            name: "MalformedPolicyDocumentException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
    }
}
class PackedPolicyTooLargeException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"] {
    name = "PackedPolicyTooLargeException";
    $fault = "client";
    constructor(opts){
        super({
            name: "PackedPolicyTooLargeException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
    }
}
class RegionDisabledException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"] {
    name = "RegionDisabledException";
    $fault = "client";
    constructor(opts){
        super({
            name: "RegionDisabledException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, RegionDisabledException.prototype);
    }
}
class IDPRejectedClaimException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"] {
    name = "IDPRejectedClaimException";
    $fault = "client";
    constructor(opts){
        super({
            name: "IDPRejectedClaimException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
    }
}
class InvalidIdentityTokenException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"] {
    name = "InvalidIdentityTokenException";
    $fault = "client";
    constructor(opts){
        super({
            name: "InvalidIdentityTokenException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
    }
}
const AssumeRoleWithWebIdentityRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.WebIdentityToken && {
            WebIdentityToken: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const AssumeRoleWithWebIdentityResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Credentials && {
            Credentials: CredentialsFilterSensitiveLog(obj.Credentials)
        }
    });
class IDPCommunicationErrorException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"] {
    name = "IDPCommunicationErrorException";
    $fault = "client";
    constructor(opts){
        super({
            name: "IDPCommunicationErrorException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/get-value-from-text-node.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getValueFromTextNode",
    ()=>getValueFromTextNode
]);
const getValueFromTextNode = (obj)=>{
    const textNodeName = "#text";
    for(const key in obj){
        if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== undefined) {
            obj[key] = obj[key][textNodeName];
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
            obj[key] = getValueFromTextNode(obj[key]);
        }
    }
    return obj;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildOptions",
    ()=>buildOptions,
    "defaultOptions",
    ()=>defaultOptions
]);
const defaultOptions = {
    preserveOrder: false,
    attributeNamePrefix: '@_',
    attributesGroupName: false,
    textNodeName: '#text',
    ignoreAttributes: true,
    removeNSPrefix: false,
    allowBooleanAttributes: false,
    //ignoreRootElement : false,
    parseTagValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataPropName: false,
    numberParseOptions: {
        hex: true,
        leadingZeros: true,
        eNotation: true
    },
    tagValueProcessor: function(tagName, val) {
        return val;
    },
    attributeValueProcessor: function(attrName, val) {
        return val;
    },
    stopNodes: [],
    alwaysCreateTextNode: false,
    isArray: ()=>false,
    commentPropName: false,
    unpairedTags: [],
    processEntities: true,
    htmlEntities: false,
    ignoreDeclaration: false,
    ignorePiTags: false,
    transformTagName: false,
    transformAttributeName: false,
    updateTag: function(tagName, jPath, attrs) {
        return tagName;
    },
    // skipEmptyListItem: false
    captureMetaData: false
};
const buildOptions = function(options) {
    return Object.assign({}, defaultOptions, options);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/util.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAllMatches",
    ()=>getAllMatches,
    "getValue",
    ()=>getValue,
    "isEmptyObject",
    ()=>isEmptyObject,
    "isExist",
    ()=>isExist,
    "isName",
    ()=>isName,
    "merge",
    ()=>merge,
    "nameRegexp",
    ()=>nameRegexp
]);
'use strict';
const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
const regexName = new RegExp('^' + nameRegexp + '$');
function getAllMatches(string, regex) {
    const matches = [];
    let match = regex.exec(string);
    while(match){
        const allmatches = [];
        allmatches.startIndex = regex.lastIndex - match[0].length;
        const len = match.length;
        for(let index = 0; index < len; index++){
            allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
    }
    return matches;
}
const isName = function(string) {
    const match = regexName.exec(string);
    return !(match === null || typeof match === 'undefined');
};
function isExist(v) {
    return typeof v !== 'undefined';
}
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
function merge(target, a, arrayMode) {
    if (a) {
        const keys = Object.keys(a); // will return an array of own properties
        const len = keys.length; //don't make it inline
        for(let i = 0; i < len; i++){
            if (arrayMode === 'strict') {
                target[keys[i]] = [
                    a[keys[i]]
                ];
            } else {
                target[keys[i]] = a[keys[i]];
            }
        }
    }
}
function getValue(v) {
    if (exports.isExist(v)) {
        return v;
    } else {
        return '';
    }
} // const fakeCall = function(a) {return a;};
 // const fakeCallNoReturn = function() {};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/xmlNode.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>XmlNode
]);
'use strict';
let METADATA_SYMBOL;
if (typeof Symbol !== "function") {
    METADATA_SYMBOL = "@@xmlMetadata";
} else {
    METADATA_SYMBOL = Symbol("XML Node Metadata");
}
class XmlNode {
    constructor(tagname){
        this.tagname = tagname;
        this.child = []; //nested tags, text, cdata, comments in order
        this[":@"] = {}; //attributes map
    }
    add(key, val) {
        // this.child.push( {name : key, val: val, isCdata: isCdata });
        if (key === "__proto__") key = "#__proto__";
        this.child.push({
            [key]: val
        });
    }
    addChild(node, startIndex) {
        if (node.tagname === "__proto__") node.tagname = "#__proto__";
        if (node[":@"] && Object.keys(node[":@"]).length > 0) {
            this.child.push({
                [node.tagname]: node.child,
                [":@"]: node[":@"]
            });
        } else {
            this.child.push({
                [node.tagname]: node.child
            });
        }
        // if requested, add the startIndex
        if (startIndex !== undefined) {
            // Note: for now we just overwrite the metadata. If we had more complex metadata,
            // we might need to do an object append here:  metadata = { ...metadata, startIndex }
            this.child[this.child.length - 1][METADATA_SYMBOL] = {
                startIndex
            };
        }
    }
    /** symbol used for metadata */ static getMetaDataSymbol() {
        return METADATA_SYMBOL;
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>readDocType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/util.js [app-route] (ecmascript)");
;
function readDocType(xmlData, i) {
    const entities = {};
    if (xmlData[i + 3] === 'O' && xmlData[i + 4] === 'C' && xmlData[i + 5] === 'T' && xmlData[i + 6] === 'Y' && xmlData[i + 7] === 'P' && xmlData[i + 8] === 'E') {
        i = i + 9;
        let angleBracketsCount = 1;
        let hasBody = false, comment = false;
        let exp = "";
        for(; i < xmlData.length; i++){
            if (xmlData[i] === '<' && !comment) {
                if (hasBody && hasSeq(xmlData, "!ENTITY", i)) {
                    i += 7;
                    let entityName, val;
                    [entityName, val, i] = readEntityExp(xmlData, i + 1);
                    if (val.indexOf("&") === -1) entities[entityName] = {
                        regx: RegExp(`&${entityName};`, "g"),
                        val: val
                    };
                } else if (hasBody && hasSeq(xmlData, "!ELEMENT", i)) {
                    i += 8; //Not supported
                    const { index } = readElementExp(xmlData, i + 1);
                    i = index;
                } else if (hasBody && hasSeq(xmlData, "!ATTLIST", i)) {
                    i += 8; //Not supported
                // const {index} = readAttlistExp(xmlData,i+1);
                // i = index;
                } else if (hasBody && hasSeq(xmlData, "!NOTATION", i)) {
                    i += 9; //Not supported
                    const { index } = readNotationExp(xmlData, i + 1);
                    i = index;
                } else if (hasSeq(xmlData, "!--", i)) comment = true;
                else throw new Error(`Invalid DOCTYPE`);
                angleBracketsCount++;
                exp = "";
            } else if (xmlData[i] === '>') {
                if (comment) {
                    if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
                        comment = false;
                        angleBracketsCount--;
                    }
                } else {
                    angleBracketsCount--;
                }
                if (angleBracketsCount === 0) {
                    break;
                }
            } else if (xmlData[i] === '[') {
                hasBody = true;
            } else {
                exp += xmlData[i];
            }
        }
        if (angleBracketsCount !== 0) {
            throw new Error(`Unclosed DOCTYPE`);
        }
    } else {
        throw new Error(`Invalid Tag instead of DOCTYPE`);
    }
    return {
        entities,
        i
    };
}
const skipWhitespace = (data, index)=>{
    while(index < data.length && /\s/.test(data[index])){
        index++;
    }
    return index;
};
function readEntityExp(xmlData, i) {
    //External entities are not supported
    //    <!ENTITY ext SYSTEM "http://normal-website.com" >
    //Parameter entities are not supported
    //    <!ENTITY entityname "&anotherElement;">
    //Internal entities are supported
    //    <!ENTITY entityname "replacement text">
    // Skip leading whitespace after <!ENTITY
    i = skipWhitespace(xmlData, i);
    // Read entity name
    let entityName = "";
    while(i < xmlData.length && !/\s/.test(xmlData[i]) && xmlData[i] !== '"' && xmlData[i] !== "'"){
        entityName += xmlData[i];
        i++;
    }
    validateEntityName(entityName);
    // Skip whitespace after entity name
    i = skipWhitespace(xmlData, i);
    // Check for unsupported constructs (external entities or parameter entities)
    if (xmlData.substring(i, i + 6).toUpperCase() === "SYSTEM") {
        throw new Error("External entities are not supported");
    } else if (xmlData[i] === "%") {
        throw new Error("Parameter entities are not supported");
    }
    // Read entity value (internal entity)
    let entityValue = "";
    [i, entityValue] = readIdentifierVal(xmlData, i, "entity");
    i--;
    return [
        entityName,
        entityValue,
        i
    ];
}
function readNotationExp(xmlData, i) {
    // Skip leading whitespace after <!NOTATION
    i = skipWhitespace(xmlData, i);
    // Read notation name
    let notationName = "";
    while(i < xmlData.length && !/\s/.test(xmlData[i])){
        notationName += xmlData[i];
        i++;
    }
    validateEntityName(notationName);
    // Skip whitespace after notation name
    i = skipWhitespace(xmlData, i);
    // Check identifier type (SYSTEM or PUBLIC)
    const identifierType = xmlData.substring(i, i + 6).toUpperCase();
    if (identifierType !== "SYSTEM" && identifierType !== "PUBLIC") {
        throw new Error(`Expected SYSTEM or PUBLIC, found "${identifierType}"`);
    }
    i += identifierType.length;
    // Skip whitespace after identifier type
    i = skipWhitespace(xmlData, i);
    // Read public identifier (if PUBLIC)
    let publicIdentifier = null;
    let systemIdentifier = null;
    if (identifierType === "PUBLIC") {
        [i, publicIdentifier] = readIdentifierVal(xmlData, i, "publicIdentifier");
        // Skip whitespace after public identifier
        i = skipWhitespace(xmlData, i);
        // Optionally read system identifier
        if (xmlData[i] === '"' || xmlData[i] === "'") {
            [i, systemIdentifier] = readIdentifierVal(xmlData, i, "systemIdentifier");
        }
    } else if (identifierType === "SYSTEM") {
        // Read system identifier (mandatory for SYSTEM)
        [i, systemIdentifier] = readIdentifierVal(xmlData, i, "systemIdentifier");
        if (!systemIdentifier) {
            throw new Error("Missing mandatory system identifier for SYSTEM notation");
        }
    }
    return {
        notationName,
        publicIdentifier,
        systemIdentifier,
        index: --i
    };
}
function readIdentifierVal(xmlData, i, type) {
    let identifierVal = "";
    const startChar = xmlData[i];
    if (startChar !== '"' && startChar !== "'") {
        throw new Error(`Expected quoted string, found "${startChar}"`);
    }
    i++;
    while(i < xmlData.length && xmlData[i] !== startChar){
        identifierVal += xmlData[i];
        i++;
    }
    if (xmlData[i] !== startChar) {
        throw new Error(`Unterminated ${type} value`);
    }
    i++;
    return [
        i,
        identifierVal
    ];
}
function readElementExp(xmlData, i) {
    // <!ELEMENT br EMPTY>
    // <!ELEMENT div ANY>
    // <!ELEMENT title (#PCDATA)>
    // <!ELEMENT book (title, author+)>
    // <!ELEMENT name (content-model)>
    // Skip leading whitespace after <!ELEMENT
    i = skipWhitespace(xmlData, i);
    // Read element name
    let elementName = "";
    while(i < xmlData.length && !/\s/.test(xmlData[i])){
        elementName += xmlData[i];
        i++;
    }
    // Validate element name
    if (!validateEntityName(elementName)) {
        throw new Error(`Invalid element name: "${elementName}"`);
    }
    // Skip whitespace after element name
    i = skipWhitespace(xmlData, i);
    let contentModel = "";
    // Expect '(' to start content model
    if (xmlData[i] === "E" && hasSeq(xmlData, "MPTY", i)) i += 4;
    else if (xmlData[i] === "A" && hasSeq(xmlData, "NY", i)) i += 2;
    else if (xmlData[i] === "(") {
        i++; // Move past '('
        // Read content model
        while(i < xmlData.length && xmlData[i] !== ")"){
            contentModel += xmlData[i];
            i++;
        }
        if (xmlData[i] !== ")") {
            throw new Error("Unterminated content model");
        }
    } else {
        throw new Error(`Invalid Element Expression, found "${xmlData[i]}"`);
    }
    return {
        elementName,
        contentModel: contentModel.trim(),
        index: i
    };
}
function readAttlistExp(xmlData, i) {
    // Skip leading whitespace after <!ATTLIST
    i = skipWhitespace(xmlData, i);
    // Read element name
    let elementName = "";
    while(i < xmlData.length && !/\s/.test(xmlData[i])){
        elementName += xmlData[i];
        i++;
    }
    // Validate element name
    validateEntityName(elementName);
    // Skip whitespace after element name
    i = skipWhitespace(xmlData, i);
    // Read attribute name
    let attributeName = "";
    while(i < xmlData.length && !/\s/.test(xmlData[i])){
        attributeName += xmlData[i];
        i++;
    }
    // Validate attribute name
    if (!validateEntityName(attributeName)) {
        throw new Error(`Invalid attribute name: "${attributeName}"`);
    }
    // Skip whitespace after attribute name
    i = skipWhitespace(xmlData, i);
    // Read attribute type
    let attributeType = "";
    if (xmlData.substring(i, i + 8).toUpperCase() === "NOTATION") {
        attributeType = "NOTATION";
        i += 8; // Move past "NOTATION"
        // Skip whitespace after "NOTATION"
        i = skipWhitespace(xmlData, i);
        // Expect '(' to start the list of notations
        if (xmlData[i] !== "(") {
            throw new Error(`Expected '(', found "${xmlData[i]}"`);
        }
        i++; // Move past '('
        // Read the list of allowed notations
        let allowedNotations = [];
        while(i < xmlData.length && xmlData[i] !== ")"){
            let notation = "";
            while(i < xmlData.length && xmlData[i] !== "|" && xmlData[i] !== ")"){
                notation += xmlData[i];
                i++;
            }
            // Validate notation name
            notation = notation.trim();
            if (!validateEntityName(notation)) {
                throw new Error(`Invalid notation name: "${notation}"`);
            }
            allowedNotations.push(notation);
            // Skip '|' separator or exit loop
            if (xmlData[i] === "|") {
                i++; // Move past '|'
                i = skipWhitespace(xmlData, i); // Skip optional whitespace after '|'
            }
        }
        if (xmlData[i] !== ")") {
            throw new Error("Unterminated list of notations");
        }
        i++; // Move past ')'
        // Store the allowed notations as part of the attribute type
        attributeType += " (" + allowedNotations.join("|") + ")";
    } else {
        // Handle simple types (e.g., CDATA, ID, IDREF, etc.)
        while(i < xmlData.length && !/\s/.test(xmlData[i])){
            attributeType += xmlData[i];
            i++;
        }
        // Validate simple attribute type
        const validTypes = [
            "CDATA",
            "ID",
            "IDREF",
            "IDREFS",
            "ENTITY",
            "ENTITIES",
            "NMTOKEN",
            "NMTOKENS"
        ];
        if (!validTypes.includes(attributeType.toUpperCase())) {
            throw new Error(`Invalid attribute type: "${attributeType}"`);
        }
    }
    // Skip whitespace after attribute type
    i = skipWhitespace(xmlData, i);
    // Read default value
    let defaultValue = "";
    if (xmlData.substring(i, i + 8).toUpperCase() === "#REQUIRED") {
        defaultValue = "#REQUIRED";
        i += 8;
    } else if (xmlData.substring(i, i + 7).toUpperCase() === "#IMPLIED") {
        defaultValue = "#IMPLIED";
        i += 7;
    } else {
        [i, defaultValue] = readIdentifierVal(xmlData, i, "ATTLIST");
    }
    return {
        elementName,
        attributeName,
        attributeType,
        defaultValue,
        index: i
    };
}
function hasSeq(data, seq, i) {
    for(let j = 0; j < seq.length; j++){
        if (seq[j] !== data[i + j + 1]) return false;
    }
    return true;
}
function validateEntityName(name) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isName"])(name)) return name;
    else throw new Error(`Invalid entity name ${name}`);
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/strnum/strnum.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>toNumber
]);
const hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
const numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
// const octRegex = /^0x[a-z0-9]+/;
// const binRegex = /0x[a-z0-9]+/;
const consider = {
    hex: true,
    // oct: false,
    leadingZeros: true,
    decimalPoint: "\.",
    eNotation: true
};
function toNumber(str, options = {}) {
    options = Object.assign({}, consider, options);
    if (!str || typeof str !== "string") return str;
    let trimmedStr = str.trim();
    if (options.skipLike !== undefined && options.skipLike.test(trimmedStr)) return str;
    else if (str === "0") return 0;
    else if (options.hex && hexRegex.test(trimmedStr)) {
        return parse_int(trimmedStr, 16);
    // }else if (options.oct && octRegex.test(str)) {
    //     return Number.parseInt(val, 8);
    } else if (trimmedStr.search(/.+[eE].+/) !== -1) {
        return resolveEnotation(str, trimmedStr, options);
    // }else if (options.parseBin && binRegex.test(str)) {
    //     return Number.parseInt(val, 2);
    } else {
        //separate negative sign, leading zeros, and rest number
        const match = numRegex.exec(trimmedStr);
        // +00.123 => [ , '+', '00', '.123', ..
        if (match) {
            const sign = match[1] || "";
            const leadingZeros = match[2];
            let numTrimmedByZeros = trimZeros(match[3]); //complete num without leading zeros
            const decimalAdjacentToLeadingZeros = sign ? str[leadingZeros.length + 1] === "." : str[leadingZeros.length] === ".";
            //trim ending zeros for floating number
            if (!options.leadingZeros //leading zeros are not allowed
             && (leadingZeros.length > 1 || leadingZeros.length === 1 && !decimalAdjacentToLeadingZeros)) {
                // 00, 00.3, +03.24, 03, 03.24
                return str;
            } else {
                const num = Number(trimmedStr);
                const parsedStr = String(num);
                if (num === 0) return num;
                if (parsedStr.search(/[eE]/) !== -1) {
                    if (options.eNotation) return num;
                    else return str;
                } else if (trimmedStr.indexOf(".") !== -1) {
                    if (parsedStr === "0") return num; //0.0
                    else if (parsedStr === numTrimmedByZeros) return num; //0.456. 0.79000
                    else if (parsedStr === `${sign}${numTrimmedByZeros}`) return num;
                    else return str;
                }
                let n = leadingZeros ? numTrimmedByZeros : trimmedStr;
                if (leadingZeros) {
                    // -009 => -9
                    return n === parsedStr || sign + n === parsedStr ? num : str;
                } else {
                    // +9
                    return n === parsedStr || n === sign + parsedStr ? num : str;
                }
            }
        } else {
            return str;
        }
    }
}
const eNotationRegx = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
function resolveEnotation(str, trimmedStr, options) {
    if (!options.eNotation) return str;
    const notation = trimmedStr.match(eNotationRegx);
    if (notation) {
        let sign = notation[1] || "";
        const eChar = notation[3].indexOf("e") === -1 ? "E" : "e";
        const leadingZeros = notation[2];
        const eAdjacentToLeadingZeros = sign ? str[leadingZeros.length + 1] === eChar : str[leadingZeros.length] === eChar;
        if (leadingZeros.length > 1 && eAdjacentToLeadingZeros) return str;
        else if (leadingZeros.length === 1 && (notation[3].startsWith(`.${eChar}`) || notation[3][0] === eChar)) {
            return Number(trimmedStr);
        } else if (options.leadingZeros && !eAdjacentToLeadingZeros) {
            //remove leading 0s
            trimmedStr = (notation[1] || "") + notation[3];
            return Number(trimmedStr);
        } else return str;
    } else {
        return str;
    }
}
/**
 * 
 * @param {string} numStr without leading zeros
 * @returns 
 */ function trimZeros(numStr) {
    if (numStr && numStr.indexOf(".") !== -1) {
        numStr = numStr.replace(/0+$/, ""); //remove ending zeros
        if (numStr === ".") numStr = "0";
        else if (numStr[0] === ".") numStr = "0" + numStr;
        else if (numStr[numStr.length - 1] === ".") numStr = numStr.substring(0, numStr.length - 1);
        return numStr;
    }
    return numStr;
}
function parse_int(numStr, base) {
    //polyfill
    if (parseInt) return parseInt(numStr, base);
    else if (Number.parseInt) return Number.parseInt(numStr, base);
    else if (window && window.parseInt) return window.parseInt(numStr, base);
    else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/ignoreAttributes.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>getIgnoreAttributesFn
]);
function getIgnoreAttributesFn(ignoreAttributes) {
    if (typeof ignoreAttributes === 'function') {
        return ignoreAttributes;
    }
    if (Array.isArray(ignoreAttributes)) {
        return (attrName)=>{
            for (const pattern of ignoreAttributes){
                if (typeof pattern === 'string' && attrName === pattern) {
                    return true;
                }
                if (pattern instanceof RegExp && pattern.test(attrName)) {
                    return true;
                }
            }
        };
    }
    return ()=>false;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderedObjParser
]);
///@ts-check
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/util.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/xmlNode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$DocTypeReader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$strnum$2f$strnum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/strnum/strnum.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$ignoreAttributes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/ignoreAttributes.js [app-route] (ecmascript)");
'use strict';
;
;
;
;
;
class OrderedObjParser {
    constructor(options){
        this.options = options;
        this.currentNode = null;
        this.tagsNodeStack = [];
        this.docTypeEntities = {};
        this.lastEntities = {
            "apos": {
                regex: /&(apos|#39|#x27);/g,
                val: "'"
            },
            "gt": {
                regex: /&(gt|#62|#x3E);/g,
                val: ">"
            },
            "lt": {
                regex: /&(lt|#60|#x3C);/g,
                val: "<"
            },
            "quot": {
                regex: /&(quot|#34|#x22);/g,
                val: "\""
            }
        };
        this.ampEntity = {
            regex: /&(amp|#38|#x26);/g,
            val: "&"
        };
        this.htmlEntities = {
            "space": {
                regex: /&(nbsp|#160);/g,
                val: " "
            },
            // "lt" : { regex: /&(lt|#60);/g, val: "<" },
            // "gt" : { regex: /&(gt|#62);/g, val: ">" },
            // "amp" : { regex: /&(amp|#38);/g, val: "&" },
            // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
            // "apos" : { regex: /&(apos|#39);/g, val: "'" },
            "cent": {
                regex: /&(cent|#162);/g,
                val: "¢"
            },
            "pound": {
                regex: /&(pound|#163);/g,
                val: "£"
            },
            "yen": {
                regex: /&(yen|#165);/g,
                val: "¥"
            },
            "euro": {
                regex: /&(euro|#8364);/g,
                val: "€"
            },
            "copyright": {
                regex: /&(copy|#169);/g,
                val: "©"
            },
            "reg": {
                regex: /&(reg|#174);/g,
                val: "®"
            },
            "inr": {
                regex: /&(inr|#8377);/g,
                val: "₹"
            },
            "num_dec": {
                regex: /&#([0-9]{1,7});/g,
                val: (_, str)=>String.fromCodePoint(Number.parseInt(str, 10))
            },
            "num_hex": {
                regex: /&#x([0-9a-fA-F]{1,6});/g,
                val: (_, str)=>String.fromCodePoint(Number.parseInt(str, 16))
            }
        };
        this.addExternalEntities = addExternalEntities;
        this.parseXml = parseXml;
        this.parseTextData = parseTextData;
        this.resolveNameSpace = resolveNameSpace;
        this.buildAttributesMap = buildAttributesMap;
        this.isItStopNode = isItStopNode;
        this.replaceEntitiesValue = replaceEntitiesValue;
        this.readStopNodeData = readStopNodeData;
        this.saveTextToParentTag = saveTextToParentTag;
        this.addChild = addChild;
        this.ignoreAttributesFn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$ignoreAttributes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(this.options.ignoreAttributes);
    }
}
function addExternalEntities(externalEntities) {
    const entKeys = Object.keys(externalEntities);
    for(let i = 0; i < entKeys.length; i++){
        const ent = entKeys[i];
        this.lastEntities[ent] = {
            regex: new RegExp("&" + ent + ";", "g"),
            val: externalEntities[ent]
        };
    }
}
/**
 * @param {string} val
 * @param {string} tagName
 * @param {string} jPath
 * @param {boolean} dontTrim
 * @param {boolean} hasAttributes
 * @param {boolean} isLeafNode
 * @param {boolean} escapeEntities
 */ function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
    if (val !== undefined) {
        if (this.options.trimValues && !dontTrim) {
            val = val.trim();
        }
        if (val.length > 0) {
            if (!escapeEntities) val = this.replaceEntitiesValue(val);
            const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
            if (newval === null || newval === undefined) {
                //don't parse
                return val;
            } else if (typeof newval !== typeof val || newval !== val) {
                //overwrite
                return newval;
            } else if (this.options.trimValues) {
                return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
            } else {
                const trimmedVal = val.trim();
                if (trimmedVal === val) {
                    return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
                } else {
                    return val;
                }
            }
        }
    }
}
function resolveNameSpace(tagname) {
    if (this.options.removeNSPrefix) {
        const tags = tagname.split(':');
        const prefix = tagname.charAt(0) === '/' ? '/' : '';
        if (tags[0] === 'xmlns') {
            return '';
        }
        if (tags.length === 2) {
            tagname = prefix + tags[1];
        }
    }
    return tagname;
}
//TODO: change regex to capture NS
//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])([\\s\\S]*?)\\3)?', 'gm');
function buildAttributesMap(attrStr, jPath, tagName) {
    if (this.options.ignoreAttributes !== true && typeof attrStr === 'string') {
        // attrStr = attrStr.replace(/\r?\n/g, ' ');
        //attrStr = attrStr || attrStr.trim();
        const matches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllMatches"])(attrStr, attrsRegx);
        const len = matches.length; //don't make it inline
        const attrs = {};
        for(let i = 0; i < len; i++){
            const attrName = this.resolveNameSpace(matches[i][1]);
            if (this.ignoreAttributesFn(attrName, jPath)) {
                continue;
            }
            let oldVal = matches[i][4];
            let aName = this.options.attributeNamePrefix + attrName;
            if (attrName.length) {
                if (this.options.transformAttributeName) {
                    aName = this.options.transformAttributeName(aName);
                }
                if (aName === "__proto__") aName = "#__proto__";
                if (oldVal !== undefined) {
                    if (this.options.trimValues) {
                        oldVal = oldVal.trim();
                    }
                    oldVal = this.replaceEntitiesValue(oldVal);
                    const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
                    if (newVal === null || newVal === undefined) {
                        //don't parse
                        attrs[aName] = oldVal;
                    } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
                        //overwrite
                        attrs[aName] = newVal;
                    } else {
                        //parse
                        attrs[aName] = parseValue(oldVal, this.options.parseAttributeValue, this.options.numberParseOptions);
                    }
                } else if (this.options.allowBooleanAttributes) {
                    attrs[aName] = true;
                }
            }
        }
        if (!Object.keys(attrs).length) {
            return;
        }
        if (this.options.attributesGroupName) {
            const attrCollection = {};
            attrCollection[this.options.attributesGroupName] = attrs;
            return attrCollection;
        }
        return attrs;
    }
}
const parseXml = function(xmlData) {
    xmlData = xmlData.replace(/\r\n?/g, "\n"); //TODO: remove this line
    const xmlObj = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]('!xml');
    let currentNode = xmlObj;
    let textData = "";
    let jPath = "";
    for(let i = 0; i < xmlData.length; i++){
        const ch = xmlData[i];
        if (ch === '<') {
            // const nextIndex = i+1;
            // const _2ndChar = xmlData[nextIndex];
            if (xmlData[i + 1] === '/') {
                const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
                let tagName = xmlData.substring(i + 2, closeIndex).trim();
                if (this.options.removeNSPrefix) {
                    const colonIndex = tagName.indexOf(":");
                    if (colonIndex !== -1) {
                        tagName = tagName.substr(colonIndex + 1);
                    }
                }
                if (this.options.transformTagName) {
                    tagName = this.options.transformTagName(tagName);
                }
                if (currentNode) {
                    textData = this.saveTextToParentTag(textData, currentNode, jPath);
                }
                //check if last tag of nested tag was unpaired tag
                const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
                if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
                    throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
                }
                let propIndex = 0;
                if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
                    propIndex = jPath.lastIndexOf('.', jPath.lastIndexOf('.') - 1);
                    this.tagsNodeStack.pop();
                } else {
                    propIndex = jPath.lastIndexOf(".");
                }
                jPath = jPath.substring(0, propIndex);
                currentNode = this.tagsNodeStack.pop(); //avoid recursion, set the parent tag scope
                textData = "";
                i = closeIndex;
            } else if (xmlData[i + 1] === '?') {
                let tagData = readTagExp(xmlData, i, false, "?>");
                if (!tagData) throw new Error("Pi Tag is not closed.");
                textData = this.saveTextToParentTag(textData, currentNode, jPath);
                if (this.options.ignoreDeclaration && tagData.tagName === "?xml" || this.options.ignorePiTags) {} else {
                    const childNode = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](tagData.tagName);
                    childNode.add(this.options.textNodeName, "");
                    if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
                        childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
                    }
                    this.addChild(currentNode, childNode, jPath, i);
                }
                i = tagData.closeIndex + 1;
            } else if (xmlData.substr(i + 1, 3) === '!--') {
                const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
                if (this.options.commentPropName) {
                    const comment = xmlData.substring(i + 4, endIndex - 2);
                    textData = this.saveTextToParentTag(textData, currentNode, jPath);
                    currentNode.add(this.options.commentPropName, [
                        {
                            [this.options.textNodeName]: comment
                        }
                    ]);
                }
                i = endIndex;
            } else if (xmlData.substr(i + 1, 2) === '!D') {
                const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$DocTypeReader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(xmlData, i);
                this.docTypeEntities = result.entities;
                i = result.i;
            } else if (xmlData.substr(i + 1, 2) === '![') {
                const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
                const tagExp = xmlData.substring(i + 9, closeIndex);
                textData = this.saveTextToParentTag(textData, currentNode, jPath);
                let val = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
                if (val == undefined) val = "";
                //cdata should be set even if it is 0 length string
                if (this.options.cdataPropName) {
                    currentNode.add(this.options.cdataPropName, [
                        {
                            [this.options.textNodeName]: tagExp
                        }
                    ]);
                } else {
                    currentNode.add(this.options.textNodeName, val);
                }
                i = closeIndex + 2;
            } else {
                let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
                let tagName = result.tagName;
                const rawTagName = result.rawTagName;
                let tagExp = result.tagExp;
                let attrExpPresent = result.attrExpPresent;
                let closeIndex = result.closeIndex;
                if (this.options.transformTagName) {
                    tagName = this.options.transformTagName(tagName);
                }
                //save text as child node
                if (currentNode && textData) {
                    if (currentNode.tagname !== '!xml') {
                        //when nested tag is found
                        textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
                    }
                }
                //check if last tag was unpaired tag
                const lastTag = currentNode;
                if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
                    currentNode = this.tagsNodeStack.pop();
                    jPath = jPath.substring(0, jPath.lastIndexOf("."));
                }
                if (tagName !== xmlObj.tagname) {
                    jPath += jPath ? "." + tagName : tagName;
                }
                const startIndex = i;
                if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
                    let tagContent = "";
                    //self-closing tag
                    if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                        if (tagName[tagName.length - 1] === "/") {
                            tagName = tagName.substr(0, tagName.length - 1);
                            jPath = jPath.substr(0, jPath.length - 1);
                            tagExp = tagName;
                        } else {
                            tagExp = tagExp.substr(0, tagExp.length - 1);
                        }
                        i = result.closeIndex;
                    } else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
                        i = result.closeIndex;
                    } else {
                        //read until closing tag is found
                        const result = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
                        if (!result) throw new Error(`Unexpected end of ${rawTagName}`);
                        i = result.i;
                        tagContent = result.tagContent;
                    }
                    const childNode = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](tagName);
                    if (tagName !== tagExp && attrExpPresent) {
                        childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                    }
                    if (tagContent) {
                        tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
                    }
                    jPath = jPath.substr(0, jPath.lastIndexOf("."));
                    childNode.add(this.options.textNodeName, tagContent);
                    this.addChild(currentNode, childNode, jPath, startIndex);
                } else {
                    //selfClosing tag
                    if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                        if (tagName[tagName.length - 1] === "/") {
                            tagName = tagName.substr(0, tagName.length - 1);
                            jPath = jPath.substr(0, jPath.length - 1);
                            tagExp = tagName;
                        } else {
                            tagExp = tagExp.substr(0, tagExp.length - 1);
                        }
                        if (this.options.transformTagName) {
                            tagName = this.options.transformTagName(tagName);
                        }
                        const childNode = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](tagName);
                        if (tagName !== tagExp && attrExpPresent) {
                            childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                        }
                        this.addChild(currentNode, childNode, jPath, startIndex);
                        jPath = jPath.substr(0, jPath.lastIndexOf("."));
                    } else {
                        const childNode = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](tagName);
                        this.tagsNodeStack.push(currentNode);
                        if (tagName !== tagExp && attrExpPresent) {
                            childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
                        }
                        this.addChild(currentNode, childNode, jPath, startIndex);
                        currentNode = childNode;
                    }
                    textData = "";
                    i = closeIndex;
                }
            }
        } else {
            textData += xmlData[i];
        }
    }
    return xmlObj.child;
};
function addChild(currentNode, childNode, jPath, startIndex) {
    // unset startIndex if not requested
    if (!this.options.captureMetaData) startIndex = undefined;
    const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
    if (result === false) {} else if (typeof result === "string") {
        childNode.tagname = result;
        currentNode.addChild(childNode, startIndex);
    } else {
        currentNode.addChild(childNode, startIndex);
    }
}
const replaceEntitiesValue = function(val) {
    if (this.options.processEntities) {
        for(let entityName in this.docTypeEntities){
            const entity = this.docTypeEntities[entityName];
            val = val.replace(entity.regx, entity.val);
        }
        for(let entityName in this.lastEntities){
            const entity = this.lastEntities[entityName];
            val = val.replace(entity.regex, entity.val);
        }
        if (this.options.htmlEntities) {
            for(let entityName in this.htmlEntities){
                const entity = this.htmlEntities[entityName];
                val = val.replace(entity.regex, entity.val);
            }
        }
        val = val.replace(this.ampEntity.regex, this.ampEntity.val);
    }
    return val;
};
function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
    if (textData) {
        if (isLeafNode === undefined) isLeafNode = currentNode.child.length === 0;
        textData = this.parseTextData(textData, currentNode.tagname, jPath, false, currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false, isLeafNode);
        if (textData !== undefined && textData !== "") currentNode.add(this.options.textNodeName, textData);
        textData = "";
    }
    return textData;
}
//TODO: use jPath to simplify the logic
/**
 * 
 * @param {string[]} stopNodes 
 * @param {string} jPath
 * @param {string} currentTagName 
 */ function isItStopNode(stopNodes, jPath, currentTagName) {
    const allNodesExp = "*." + currentTagName;
    for(const stopNodePath in stopNodes){
        const stopNodeExp = stopNodes[stopNodePath];
        if (allNodesExp === stopNodeExp || jPath === stopNodeExp) return true;
    }
    return false;
}
/**
 * Returns the tag Expression and where it is ending handling single-double quotes situation
 * @param {string} xmlData 
 * @param {number} i starting index
 * @returns 
 */ function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
    let attrBoundary;
    let tagExp = "";
    for(let index = i; index < xmlData.length; index++){
        let ch = xmlData[index];
        if (attrBoundary) {
            if (ch === attrBoundary) attrBoundary = ""; //reset
        } else if (ch === '"' || ch === "'") {
            attrBoundary = ch;
        } else if (ch === closingChar[0]) {
            if (closingChar[1]) {
                if (xmlData[index + 1] === closingChar[1]) {
                    return {
                        data: tagExp,
                        index: index
                    };
                }
            } else {
                return {
                    data: tagExp,
                    index: index
                };
            }
        } else if (ch === '\t') {
            ch = " ";
        }
        tagExp += ch;
    }
}
function findClosingIndex(xmlData, str, i, errMsg) {
    const closingIndex = xmlData.indexOf(str, i);
    if (closingIndex === -1) {
        throw new Error(errMsg);
    } else {
        return closingIndex + str.length - 1;
    }
}
function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
    const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
    if (!result) return;
    let tagExp = result.data;
    const closeIndex = result.index;
    const separatorIndex = tagExp.search(/\s/);
    let tagName = tagExp;
    let attrExpPresent = true;
    if (separatorIndex !== -1) {
        tagName = tagExp.substring(0, separatorIndex);
        tagExp = tagExp.substring(separatorIndex + 1).trimStart();
    }
    const rawTagName = tagName;
    if (removeNSPrefix) {
        const colonIndex = tagName.indexOf(":");
        if (colonIndex !== -1) {
            tagName = tagName.substr(colonIndex + 1);
            attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
        }
    }
    return {
        tagName: tagName,
        tagExp: tagExp,
        closeIndex: closeIndex,
        attrExpPresent: attrExpPresent,
        rawTagName: rawTagName
    };
}
/**
 * find paired tag for a stop node
 * @param {string} xmlData 
 * @param {string} tagName 
 * @param {number} i 
 */ function readStopNodeData(xmlData, tagName, i) {
    const startIndex = i;
    // Starting at 1 since we already have an open tag
    let openTagCount = 1;
    for(; i < xmlData.length; i++){
        if (xmlData[i] === "<") {
            if (xmlData[i + 1] === "/") {
                const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
                let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
                if (closeTagName === tagName) {
                    openTagCount--;
                    if (openTagCount === 0) {
                        return {
                            tagContent: xmlData.substring(startIndex, i),
                            i: closeIndex
                        };
                    }
                }
                i = closeIndex;
            } else if (xmlData[i + 1] === '?') {
                const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
                i = closeIndex;
            } else if (xmlData.substr(i + 1, 3) === '!--') {
                const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
                i = closeIndex;
            } else if (xmlData.substr(i + 1, 2) === '![') {
                const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
                i = closeIndex;
            } else {
                const tagData = readTagExp(xmlData, i, '>');
                if (tagData) {
                    const openTagName = tagData && tagData.tagName;
                    if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
                        openTagCount++;
                    }
                    i = tagData.closeIndex;
                }
            }
        }
    } //end for loop
}
function parseValue(val, shouldParse, options) {
    if (shouldParse && typeof val === 'string') {
        //console.log(options)
        const newval = val.trim();
        if (newval === 'true') return true;
        else if (newval === 'false') return false;
        else return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$strnum$2f$strnum$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(val, options);
    } else {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isExist"])(val)) {
            return val;
        } else {
            return '';
        }
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/node2json.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>prettify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/xmlNode.js [app-route] (ecmascript)");
'use strict';
;
const METADATA_SYMBOL = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getMetaDataSymbol();
function prettify(node, options) {
    return compress(node, options);
}
/**
 * 
 * @param {array} arr 
 * @param {object} options 
 * @param {string} jPath 
 * @returns object
 */ function compress(arr, options, jPath) {
    let text;
    const compressedObj = {};
    for(let i = 0; i < arr.length; i++){
        const tagObj = arr[i];
        const property = propName(tagObj);
        let newJpath = "";
        if (jPath === undefined) newJpath = property;
        else newJpath = jPath + "." + property;
        if (property === options.textNodeName) {
            if (text === undefined) text = tagObj[property];
            else text += "" + tagObj[property];
        } else if (property === undefined) {
            continue;
        } else if (tagObj[property]) {
            let val = compress(tagObj[property], options, newJpath);
            const isLeaf = isLeafTag(val, options);
            if (tagObj[METADATA_SYMBOL] !== undefined) {
                val[METADATA_SYMBOL] = tagObj[METADATA_SYMBOL]; // copy over metadata
            }
            if (tagObj[":@"]) {
                assignAttributes(val, tagObj[":@"], newJpath, options);
            } else if (Object.keys(val).length === 1 && val[options.textNodeName] !== undefined && !options.alwaysCreateTextNode) {
                val = val[options.textNodeName];
            } else if (Object.keys(val).length === 0) {
                if (options.alwaysCreateTextNode) val[options.textNodeName] = "";
                else val = "";
            }
            if (compressedObj[property] !== undefined && compressedObj.hasOwnProperty(property)) {
                if (!Array.isArray(compressedObj[property])) {
                    compressedObj[property] = [
                        compressedObj[property]
                    ];
                }
                compressedObj[property].push(val);
            } else {
                //TODO: if a node is not an array, then check if it should be an array
                //also determine if it is a leaf node
                if (options.isArray(property, newJpath, isLeaf)) {
                    compressedObj[property] = [
                        val
                    ];
                } else {
                    compressedObj[property] = val;
                }
            }
        }
    }
    // if(text && text.length > 0) compressedObj[options.textNodeName] = text;
    if (typeof text === "string") {
        if (text.length > 0) compressedObj[options.textNodeName] = text;
    } else if (text !== undefined) compressedObj[options.textNodeName] = text;
    return compressedObj;
}
function propName(obj) {
    const keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++){
        const key = keys[i];
        if (key !== ":@") return key;
    }
}
function assignAttributes(obj, attrMap, jpath, options) {
    if (attrMap) {
        const keys = Object.keys(attrMap);
        const len = keys.length; //don't make it inline
        for(let i = 0; i < len; i++){
            const atrrName = keys[i];
            if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
                obj[atrrName] = [
                    attrMap[atrrName]
                ];
            } else {
                obj[atrrName] = attrMap[atrrName];
            }
        }
    }
}
function isLeafTag(obj, options) {
    const { textNodeName } = options;
    const propCount = Object.keys(obj).length;
    if (propCount === 0) {
        return true;
    }
    if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
        return true;
    }
    return false;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/validator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validate",
    ()=>validate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/util.js [app-route] (ecmascript)");
'use strict';
;
const defaultOptions = {
    allowBooleanAttributes: false,
    unpairedTags: []
};
function validate(xmlData, options) {
    options = Object.assign({}, defaultOptions, options);
    //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
    //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
    //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
    const tags = [];
    let tagFound = false;
    //indicates that the root tag has been closed (aka. depth 0 has been reached)
    let reachedRoot = false;
    if (xmlData[0] === '\ufeff') {
        // check for byte order mark (BOM)
        xmlData = xmlData.substr(1);
    }
    for(let i = 0; i < xmlData.length; i++){
        if (xmlData[i] === '<' && xmlData[i + 1] === '?') {
            i += 2;
            i = readPI(xmlData, i);
            if (i.err) return i;
        } else if (xmlData[i] === '<') {
            //starting of tag
            //read until you reach to '>' avoiding any '>' in attribute value
            let tagStartPos = i;
            i++;
            if (xmlData[i] === '!') {
                i = readCommentAndCDATA(xmlData, i);
                continue;
            } else {
                let closingTag = false;
                if (xmlData[i] === '/') {
                    //closing tag
                    closingTag = true;
                    i++;
                }
                //read tagname
                let tagName = '';
                for(; i < xmlData.length && xmlData[i] !== '>' && xmlData[i] !== ' ' && xmlData[i] !== '\t' && xmlData[i] !== '\n' && xmlData[i] !== '\r'; i++){
                    tagName += xmlData[i];
                }
                tagName = tagName.trim();
                //console.log(tagName);
                if (tagName[tagName.length - 1] === '/') {
                    //self closing tag without attributes
                    tagName = tagName.substring(0, tagName.length - 1);
                    //continue;
                    i--;
                }
                if (!validateTagName(tagName)) {
                    let msg;
                    if (tagName.trim().length === 0) {
                        msg = "Invalid space after '<'.";
                    } else {
                        msg = "Tag '" + tagName + "' is an invalid name.";
                    }
                    return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
                }
                const result = readAttributeStr(xmlData, i);
                if (result === false) {
                    return getErrorObject('InvalidAttr', "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
                }
                let attrStr = result.value;
                i = result.index;
                if (attrStr[attrStr.length - 1] === '/') {
                    //self closing tag
                    const attrStrStart = i - attrStr.length;
                    attrStr = attrStr.substring(0, attrStr.length - 1);
                    const isValid = validateAttributeString(attrStr, options);
                    if (isValid === true) {
                        tagFound = true;
                    //continue; //text may presents after self closing tag
                    } else {
                        //the result from the nested function returns the position of the error within the attribute
                        //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
                        //this gives us the absolute index in the entire xml, which we can use to find the line at last
                        return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
                    }
                } else if (closingTag) {
                    if (!result.tagClosed) {
                        return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
                    } else if (attrStr.trim().length > 0) {
                        return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
                    } else if (tags.length === 0) {
                        return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
                    } else {
                        const otg = tags.pop();
                        if (tagName !== otg.tagName) {
                            let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                            return getErrorObject('InvalidTag', "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
                        }
                        //when there are no more tags, we reached the root level.
                        if (tags.length == 0) {
                            reachedRoot = true;
                        }
                    }
                } else {
                    const isValid = validateAttributeString(attrStr, options);
                    if (isValid !== true) {
                        //the result from the nested function returns the position of the error within the attribute
                        //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
                        //this gives us the absolute index in the entire xml, which we can use to find the line at last
                        return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
                    }
                    //if the root level has been reached before ...
                    if (reachedRoot === true) {
                        return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
                    } else if (options.unpairedTags.indexOf(tagName) !== -1) {
                    //don't push into stack
                    } else {
                        tags.push({
                            tagName,
                            tagStartPos
                        });
                    }
                    tagFound = true;
                }
                //skip tag text value
                //It may include comments and CDATA value
                for(i++; i < xmlData.length; i++){
                    if (xmlData[i] === '<') {
                        if (xmlData[i + 1] === '!') {
                            //comment or CADATA
                            i++;
                            i = readCommentAndCDATA(xmlData, i);
                            continue;
                        } else if (xmlData[i + 1] === '?') {
                            i = readPI(xmlData, ++i);
                            if (i.err) return i;
                        } else {
                            break;
                        }
                    } else if (xmlData[i] === '&') {
                        const afterAmp = validateAmpersand(xmlData, i);
                        if (afterAmp == -1) return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                        i = afterAmp;
                    } else {
                        if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                            return getErrorObject('InvalidXml', "Extra text at the end", getLineNumberForPosition(xmlData, i));
                        }
                    }
                } //end of reading tag text value
                if (xmlData[i] === '<') {
                    i--;
                }
            }
        } else {
            if (isWhiteSpace(xmlData[i])) {
                continue;
            }
            return getErrorObject('InvalidChar', "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
    }
    if (!tagFound) {
        return getErrorObject('InvalidXml', 'Start tag expected.', 1);
    } else if (tags.length == 1) {
        return getErrorObject('InvalidTag', "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
    } else if (tags.length > 0) {
        return getErrorObject('InvalidXml', "Invalid '" + JSON.stringify(tags.map((t)=>t.tagName), null, 4).replace(/\r?\n/g, '') + "' found.", {
            line: 1,
            col: 1
        });
    }
    return true;
}
;
function isWhiteSpace(char) {
    return char === ' ' || char === '\t' || char === '\n' || char === '\r';
}
/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */ function readPI(xmlData, i) {
    const start = i;
    for(; i < xmlData.length; i++){
        if (xmlData[i] == '?' || xmlData[i] == ' ') {
            //tagname
            const tagname = xmlData.substr(start, i - start);
            if (i > 5 && tagname === 'xml') {
                return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
            } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
                //check if valid attribut string
                i++;
                break;
            } else {
                continue;
            }
        }
    }
    return i;
}
function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
        //comment
        for(i += 3; i < xmlData.length; i++){
            if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
                i += 2;
                break;
            }
        }
    } else if (xmlData.length > i + 8 && xmlData[i + 1] === 'D' && xmlData[i + 2] === 'O' && xmlData[i + 3] === 'C' && xmlData[i + 4] === 'T' && xmlData[i + 5] === 'Y' && xmlData[i + 6] === 'P' && xmlData[i + 7] === 'E') {
        let angleBracketsCount = 1;
        for(i += 8; i < xmlData.length; i++){
            if (xmlData[i] === '<') {
                angleBracketsCount++;
            } else if (xmlData[i] === '>') {
                angleBracketsCount--;
                if (angleBracketsCount === 0) {
                    break;
                }
            }
        }
    } else if (xmlData.length > i + 9 && xmlData[i + 1] === '[' && xmlData[i + 2] === 'C' && xmlData[i + 3] === 'D' && xmlData[i + 4] === 'A' && xmlData[i + 5] === 'T' && xmlData[i + 6] === 'A' && xmlData[i + 7] === '[') {
        for(i += 8; i < xmlData.length; i++){
            if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
                i += 2;
                break;
            }
        }
    }
    return i;
}
const doubleQuote = '"';
const singleQuote = "'";
/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */ function readAttributeStr(xmlData, i) {
    let attrStr = '';
    let startChar = '';
    let tagClosed = false;
    for(; i < xmlData.length; i++){
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
            if (startChar === '') {
                startChar = xmlData[i];
            } else if (startChar !== xmlData[i]) {
            //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
            } else {
                startChar = '';
            }
        } else if (xmlData[i] === '>') {
            if (startChar === '') {
                tagClosed = true;
                break;
            }
        }
        attrStr += xmlData[i];
    }
    if (startChar !== '') {
        return false;
    }
    return {
        value: attrStr,
        index: i,
        tagClosed: tagClosed
    };
}
/**
 * Select all the attributes whether valid or invalid.
 */ const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');
//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""
function validateAttributeString(attrStr, options) {
    //console.log("start:"+attrStr+":end");
    //if(attrStr.trim().length === 0) return true; //empty string
    const matches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllMatches"])(attrStr, validAttrStrRegxp);
    const attrNames = {};
    for(let i = 0; i < matches.length; i++){
        if (matches[i][1].length === 0) {
            //nospace before attribute name: a="sd"b="saf"
            return getErrorObject('InvalidAttr', "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] !== undefined && matches[i][4] === undefined) {
            return getErrorObject('InvalidAttr', "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
            //independent attribute: ab
            return getErrorObject('InvalidAttr', "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
        }
        /* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */ const attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
            return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
        }
        if (!attrNames.hasOwnProperty(attrName)) {
            //check for duplicate attribute.
            attrNames[attrName] = 1;
        } else {
            return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
        }
    }
    return true;
}
function validateNumberAmpersand(xmlData, i) {
    let re = /\d/;
    if (xmlData[i] === 'x') {
        i++;
        re = /[\da-fA-F]/;
    }
    for(; i < xmlData.length; i++){
        if (xmlData[i] === ';') return i;
        if (!xmlData[i].match(re)) break;
    }
    return -1;
}
function validateAmpersand(xmlData, i) {
    // https://www.w3.org/TR/xml/#dt-charref
    i++;
    if (xmlData[i] === ';') return -1;
    if (xmlData[i] === '#') {
        i++;
        return validateNumberAmpersand(xmlData, i);
    }
    let count = 0;
    for(; i < xmlData.length; i++, count++){
        if (xmlData[i].match(/\w/) && count < 20) continue;
        if (xmlData[i] === ';') break;
        return -1;
    }
    return i;
}
function getErrorObject(code, message, lineNumber) {
    return {
        err: {
            code: code,
            msg: message,
            line: lineNumber.line || lineNumber,
            col: lineNumber.col
        }
    };
}
function validateAttrName(attrName) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isName"])(attrName);
}
// const startsWithXML = /^xml/i;
function validateTagName(tagname) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isName"])(tagname) /* && !tagname.match(startsWithXML) */ ;
}
//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData, index) {
    const lines = xmlData.substring(0, index).split(/\r?\n/);
    return {
        line: lines.length,
        // column number is last line's length + 1, because column numbering starts at 1:
        col: lines[lines.length - 1].length + 1
    };
}
//this function returns the position of the first character of match within attrStr
function getPositionFromMatch(match) {
    return match.startIndex + match[1].length;
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>XMLParser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$OptionsBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$OrderedObjParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$node2json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/node2json.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/validator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/xmlNode.js [app-route] (ecmascript)");
;
;
;
;
;
class XMLParser {
    constructor(options){
        this.externalEntities = {};
        this.options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$OptionsBuilder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildOptions"])(options);
    }
    /**
     * Parse XML dats to JS object 
     * @param {string|Buffer} xmlData 
     * @param {boolean|Object} validationOption 
     */ parse(xmlData, validationOption) {
        if (typeof xmlData === "string") {} else if (xmlData.toString) {
            xmlData = xmlData.toString();
        } else {
            throw new Error("XML data is accepted in String or Bytes[] form.");
        }
        if (validationOption) {
            if (validationOption === true) validationOption = {}; //validate with default options
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$validator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validate"])(xmlData, validationOption);
            if (result !== true) {
                throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
            }
        }
        const orderedObjParser = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$OrderedObjParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if (this.options.preserveOrder || orderedResult === undefined) return orderedResult;
        else return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$node2json$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(orderedResult, this.options);
    }
    /**
     * Add Entity which is not by default supported by this library
     * @param {string} key 
     * @param {string} value 
     */ addEntity(key, value) {
        if (value.indexOf("&") !== -1) {
            throw new Error("Entity value can't have '&'");
        } else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
            throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
        } else if (value === "&") {
            throw new Error("An entity with value '&' is not permitted");
        } else {
            this.externalEntities[key] = value;
        }
    }
    /**
     * Returns a Symbol that can be used to access the metadata
     * property on a node.
     * 
     * If Symbol is not available in the environment, an ordinary property is used
     * and the name of the property is here returned.
     * 
     * The XMLMetaData property is only present when `captureMetaData`
     * is true in the options.
     */ static getMetaDataSymbol() {
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$xmlNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].getMetaDataSymbol();
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js [app-route] (ecmascript) <export default as XMLParser>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "XMLParser",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$XMLParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$XMLParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-stream/dist-es/blob/transforms.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transformFromString",
    ()=>transformFromString,
    "transformToString",
    ()=>transformToString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-base64/dist-es/fromBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-base64/dist-es/toBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$Uint8ArrayBlobAdapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-stream/dist-es/blob/Uint8ArrayBlobAdapter.js [app-route] (ecmascript)");
;
;
;
function transformToString(payload, encoding = "utf-8") {
    if (encoding === "base64") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBase64"])(payload);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"])(payload);
}
function transformFromString(str, encoding) {
    if (encoding === "base64") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$Uint8ArrayBlobAdapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uint8ArrayBlobAdapter"].mutate((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBase64"])(str));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$Uint8ArrayBlobAdapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uint8ArrayBlobAdapter"].mutate((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"])(str));
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-stream/dist-es/blob/Uint8ArrayBlobAdapter.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Uint8ArrayBlobAdapter",
    ()=>Uint8ArrayBlobAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$transforms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-stream/dist-es/blob/transforms.js [app-route] (ecmascript)");
;
class Uint8ArrayBlobAdapter extends Uint8Array {
    static fromString(source, encoding = "utf-8") {
        switch(typeof source){
            case "string":
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$transforms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transformFromString"])(source, encoding);
            default:
                throw new Error(`Unsupported conversion from ${typeof source} to Uint8ArrayBlobAdapter.`);
        }
    }
    static mutate(source) {
        Object.setPrototypeOf(source, Uint8ArrayBlobAdapter.prototype);
        return source;
    }
    transformToString(encoding = "utf-8") {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$transforms$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transformToString"])(this, encoding);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/protocols/collect-stream-body.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "collectBody",
    ()=>collectBody
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$Uint8ArrayBlobAdapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-stream/dist-es/blob/Uint8ArrayBlobAdapter.js [app-route] (ecmascript)");
;
const collectBody = async (streamBody = new Uint8Array(), context)=>{
    if (streamBody instanceof Uint8Array) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$Uint8ArrayBlobAdapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uint8ArrayBlobAdapter"].mutate(streamBody);
    }
    if (!streamBody) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$Uint8ArrayBlobAdapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uint8ArrayBlobAdapter"].mutate(new Uint8Array());
    }
    const fromContext = context.streamCollector(streamBody);
    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$blob$2f$Uint8ArrayBlobAdapter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uint8ArrayBlobAdapter"].mutate(await fromContext);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/protocols/common.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "collectBodyString",
    ()=>collectBodyString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$collect$2d$stream$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/protocols/collect-stream-body.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/util-utf8/dist-es/toUtf8.js [app-route] (ecmascript)");
;
;
const collectBodyString = (streamBody, context)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$collect$2d$stream$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["collectBody"])(streamBody, context).then((body)=>(context?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"])(body));
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/parseXmlBody.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadRestXmlErrorCode",
    ()=>loadRestXmlErrorCode,
    "parseXmlBody",
    ()=>parseXmlBody,
    "parseXmlErrorBody",
    ()=>parseXmlErrorBody
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$get$2d$value$2d$from$2d$text$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/get-value-from-text-node.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$XMLParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__XMLParser$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js [app-route] (ecmascript) <export default as XMLParser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/protocols/common.js [app-route] (ecmascript)");
;
;
;
const parseXmlBody = (streamBody, context)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$common$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["collectBodyString"])(streamBody, context).then((encoded)=>{
        if (encoded.length) {
            const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$XMLParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__XMLParser$3e$__["XMLParser"]({
                attributeNamePrefix: "",
                htmlEntities: true,
                ignoreAttributes: false,
                ignoreDeclaration: true,
                parseTagValue: false,
                trimValues: false,
                tagValueProcessor: (_, val)=>val.trim() === "" && val.includes("\n") ? "" : undefined
            });
            parser.addEntity("#xD", "\r");
            parser.addEntity("#10", "\n");
            let parsedObj;
            try {
                parsedObj = parser.parse(encoded, true);
            } catch (e) {
                if (e && typeof e === "object") {
                    Object.defineProperty(e, "$responseBodyText", {
                        value: encoded
                    });
                }
                throw e;
            }
            const textNodeName = "#text";
            const key = Object.keys(parsedObj)[0];
            const parsedObjToReturn = parsedObj[key];
            if (parsedObjToReturn[textNodeName]) {
                parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
                delete parsedObjToReturn[textNodeName];
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$get$2d$value$2d$from$2d$text$2d$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getValueFromTextNode"])(parsedObjToReturn);
        }
        return {};
    });
const parseXmlErrorBody = async (errorBody, context)=>{
    const value = await parseXmlBody(errorBody, context);
    if (value.Error) {
        value.Error.message = value.Error.message ?? value.Error.Message;
    }
    return value;
};
const loadRestXmlErrorCode = (output, data)=>{
    if (data?.Error?.Code !== undefined) {
        return data.Error.Code;
    }
    if (data?.Code !== undefined) {
        return data.Code;
    }
    if (output.statusCode == 404) {
        return "NotFound";
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/serde/parse-utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "expectBoolean",
    ()=>expectBoolean,
    "expectByte",
    ()=>expectByte,
    "expectFloat32",
    ()=>expectFloat32,
    "expectInt",
    ()=>expectInt,
    "expectInt32",
    ()=>expectInt32,
    "expectLong",
    ()=>expectLong,
    "expectNonNull",
    ()=>expectNonNull,
    "expectNumber",
    ()=>expectNumber,
    "expectObject",
    ()=>expectObject,
    "expectShort",
    ()=>expectShort,
    "expectString",
    ()=>expectString,
    "expectUnion",
    ()=>expectUnion,
    "handleFloat",
    ()=>handleFloat,
    "limitedParseDouble",
    ()=>limitedParseDouble,
    "limitedParseFloat",
    ()=>limitedParseFloat,
    "limitedParseFloat32",
    ()=>limitedParseFloat32,
    "logger",
    ()=>logger,
    "parseBoolean",
    ()=>parseBoolean,
    "strictParseByte",
    ()=>strictParseByte,
    "strictParseDouble",
    ()=>strictParseDouble,
    "strictParseFloat",
    ()=>strictParseFloat,
    "strictParseFloat32",
    ()=>strictParseFloat32,
    "strictParseInt",
    ()=>strictParseInt,
    "strictParseInt32",
    ()=>strictParseInt32,
    "strictParseLong",
    ()=>strictParseLong,
    "strictParseShort",
    ()=>strictParseShort
]);
const parseBoolean = (value)=>{
    switch(value){
        case "true":
            return true;
        case "false":
            return false;
        default:
            throw new Error(`Unable to parse boolean value "${value}"`);
    }
};
const expectBoolean = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "number") {
        if (value === 0 || value === 1) {
            logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (value === 0) {
            return false;
        }
        if (value === 1) {
            return true;
        }
    }
    if (typeof value === "string") {
        const lower = value.toLowerCase();
        if (lower === "false" || lower === "true") {
            logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
        }
        if (lower === "false") {
            return false;
        }
        if (lower === "true") {
            return true;
        }
    }
    if (typeof value === "boolean") {
        return value;
    }
    throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
};
const expectNumber = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        const parsed = parseFloat(value);
        if (!Number.isNaN(parsed)) {
            if (String(parsed) !== String(value)) {
                logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
            }
            return parsed;
        }
    }
    if (typeof value === "number") {
        return value;
    }
    throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
};
const MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
const expectFloat32 = (value)=>{
    const expected = expectNumber(value);
    if (expected !== undefined && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
        if (Math.abs(expected) > MAX_FLOAT) {
            throw new TypeError(`Expected 32-bit float, got ${value}`);
        }
    }
    return expected;
};
const expectLong = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    if (Number.isInteger(value) && !Number.isNaN(value)) {
        return value;
    }
    throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
};
const expectInt = expectLong;
const expectInt32 = (value)=>expectSizedInt(value, 32);
const expectShort = (value)=>expectSizedInt(value, 16);
const expectByte = (value)=>expectSizedInt(value, 8);
const expectSizedInt = (value, size)=>{
    const expected = expectLong(value);
    if (expected !== undefined && castInt(expected, size) !== expected) {
        throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
    }
    return expected;
};
const castInt = (value, size)=>{
    switch(size){
        case 32:
            return Int32Array.of(value)[0];
        case 16:
            return Int16Array.of(value)[0];
        case 8:
            return Int8Array.of(value)[0];
    }
};
const expectNonNull = (value, location)=>{
    if (value === null || value === undefined) {
        if (location) {
            throw new TypeError(`Expected a non-null value for ${location}`);
        }
        throw new TypeError("Expected a non-null value");
    }
    return value;
};
const expectObject = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "object" && !Array.isArray(value)) {
        return value;
    }
    const receivedType = Array.isArray(value) ? "array" : typeof value;
    throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
};
const expectString = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value === "string") {
        return value;
    }
    if ([
        "boolean",
        "number",
        "bigint"
    ].includes(typeof value)) {
        logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
        return String(value);
    }
    throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
};
const expectUnion = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    const asObject = expectObject(value);
    const setKeys = Object.entries(asObject).filter(([, v])=>v != null).map(([k])=>k);
    if (setKeys.length === 0) {
        throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
    }
    if (setKeys.length > 1) {
        throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
    }
    return asObject;
};
const strictParseDouble = (value)=>{
    if (typeof value == "string") {
        return expectNumber(parseNumber(value));
    }
    return expectNumber(value);
};
const strictParseFloat = strictParseDouble;
const strictParseFloat32 = (value)=>{
    if (typeof value == "string") {
        return expectFloat32(parseNumber(value));
    }
    return expectFloat32(value);
};
const NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
const parseNumber = (value)=>{
    const matches = value.match(NUMBER_REGEX);
    if (matches === null || matches[0].length !== value.length) {
        throw new TypeError(`Expected real number, got implicit NaN`);
    }
    return parseFloat(value);
};
const limitedParseDouble = (value)=>{
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectNumber(value);
};
const handleFloat = limitedParseDouble;
const limitedParseFloat = limitedParseDouble;
const limitedParseFloat32 = (value)=>{
    if (typeof value == "string") {
        return parseFloatString(value);
    }
    return expectFloat32(value);
};
const parseFloatString = (value)=>{
    switch(value){
        case "NaN":
            return NaN;
        case "Infinity":
            return Infinity;
        case "-Infinity":
            return -Infinity;
        default:
            throw new Error(`Unable to parse float value: ${value}`);
    }
};
const strictParseLong = (value)=>{
    if (typeof value === "string") {
        return expectLong(parseNumber(value));
    }
    return expectLong(value);
};
const strictParseInt = strictParseLong;
const strictParseInt32 = (value)=>{
    if (typeof value === "string") {
        return expectInt32(parseNumber(value));
    }
    return expectInt32(value);
};
const strictParseShort = (value)=>{
    if (typeof value === "string") {
        return expectShort(parseNumber(value));
    }
    return expectShort(value);
};
const strictParseByte = (value)=>{
    if (typeof value === "string") {
        return expectByte(parseNumber(value));
    }
    return expectByte(value);
};
const stackTraceWarning = (message)=>{
    return String(new TypeError(message).stack || message).split("\n").slice(0, 5).filter((s)=>!s.includes("stackTraceWarning")).join("\n");
};
const logger = {
    warn: console.warn
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/protocols/extended-encode-uri-component.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extendedEncodeURIComponent",
    ()=>extendedEncodeURIComponent
]);
function extendedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "dateToUtcString",
    ()=>dateToUtcString,
    "parseEpochTimestamp",
    ()=>parseEpochTimestamp,
    "parseRfc3339DateTime",
    ()=>parseRfc3339DateTime,
    "parseRfc3339DateTimeWithOffset",
    ()=>parseRfc3339DateTimeWithOffset,
    "parseRfc7231DateTime",
    ()=>parseRfc7231DateTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/serde/parse-utils.js [app-route] (ecmascript)");
;
const DAYS = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
function dateToUtcString(date) {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const dayOfWeek = date.getUTCDay();
    const dayOfMonthInt = date.getUTCDate();
    const hoursInt = date.getUTCHours();
    const minutesInt = date.getUTCMinutes();
    const secondsInt = date.getUTCSeconds();
    const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
    const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
    return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year} ${hoursString}:${minutesString}:${secondsString} GMT`;
}
const RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
const parseRfc3339DateTime = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
    const year = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseShort"])(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    return buildDate(year, month, day, {
        hours,
        minutes,
        seconds,
        fractionalMilliseconds
    });
};
const RFC3339_WITH_OFFSET = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
const parseRfc3339DateTimeWithOffset = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339_WITH_OFFSET.exec(value);
    if (!match) {
        throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
    const year = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseShort"])(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    const date = buildDate(year, month, day, {
        hours,
        minutes,
        seconds,
        fractionalMilliseconds
    });
    if (offsetStr.toUpperCase() != "Z") {
        date.setTime(date.getTime() - parseOffsetToMilliseconds(offsetStr));
    }
    return date;
};
const IMF_FIXDATE = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
const RFC_850_DATE = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
const ASC_TIME = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
const parseRfc7231DateTime = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    if (typeof value !== "string") {
        throw new TypeError("RFC-7231 date-times must be expressed as strings");
    }
    let match = IMF_FIXDATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return buildDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseShort"])(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds
        });
    }
    match = RFC_850_DATE.exec(value);
    if (match) {
        const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
        return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds
        }));
    }
    match = ASC_TIME.exec(value);
    if (match) {
        const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
        return buildDate((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseShort"])(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), {
            hours,
            minutes,
            seconds,
            fractionalMilliseconds
        });
    }
    throw new TypeError("Invalid RFC-7231 date-time value");
};
const parseEpochTimestamp = (value)=>{
    if (value === null || value === undefined) {
        return undefined;
    }
    let valueAsDouble;
    if (typeof value === "number") {
        valueAsDouble = value;
    } else if (typeof value === "string") {
        valueAsDouble = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseDouble"])(value);
    } else if (typeof value === "object" && value.tag === 1) {
        valueAsDouble = value.value;
    } else {
        throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
    }
    if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) {
        throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
    }
    return new Date(Math.round(valueAsDouble * 1000));
};
const buildDate = (year, month, day, time)=>{
    const adjustedMonth = month - 1;
    validateDayOfMonth(year, adjustedMonth, day);
    return new Date(Date.UTC(year, adjustedMonth, day, parseDateValue(time.hours, "hour", 0, 23), parseDateValue(time.minutes, "minute", 0, 59), parseDateValue(time.seconds, "seconds", 0, 60), parseMilliseconds(time.fractionalMilliseconds)));
};
const parseTwoDigitYear = (value)=>{
    const thisYear = new Date().getUTCFullYear();
    const valueInThisCentury = Math.floor(thisYear / 100) * 100 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseShort"])(stripLeadingZeroes(value));
    if (valueInThisCentury < thisYear) {
        return valueInThisCentury + 100;
    }
    return valueInThisCentury;
};
const FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1000;
const adjustRfc850Year = (input)=>{
    if (input.getTime() - new Date().getTime() > FIFTY_YEARS_IN_MILLIS) {
        return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
    }
    return input;
};
const parseMonthByShortName = (value)=>{
    const monthIdx = MONTHS.indexOf(value);
    if (monthIdx < 0) {
        throw new TypeError(`Invalid month: ${value}`);
    }
    return monthIdx + 1;
};
const DAYS_IN_MONTH = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];
const validateDayOfMonth = (year, month, day)=>{
    let maxDays = DAYS_IN_MONTH[month];
    if (month === 1 && isLeapYear(year)) {
        maxDays = 29;
    }
    if (day > maxDays) {
        throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year}: ${day}`);
    }
};
const isLeapYear = (year)=>{
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
const parseDateValue = (value, type, lower, upper)=>{
    const dateVal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseByte"])(stripLeadingZeroes(value));
    if (dateVal < lower || dateVal > upper) {
        throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
    }
    return dateVal;
};
const parseMilliseconds = (value)=>{
    if (value === null || value === undefined) {
        return 0;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseFloat32"])("0." + value) * 1000;
};
const parseOffsetToMilliseconds = (value)=>{
    const directionStr = value[0];
    let direction = 1;
    if (directionStr == "+") {
        direction = 1;
    } else if (directionStr == "-") {
        direction = -1;
    } else {
        throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
    }
    const hour = Number(value.substring(1, 3));
    const minute = Number(value.substring(4, 6));
    return direction * (hour * 60 + minute) * 60 * 1000;
};
const stripLeadingZeroes = (value)=>{
    let idx = 0;
    while(idx < value.length - 1 && value.charAt(idx) === "0"){
        idx++;
    }
    if (idx === 0) {
        return value;
    }
    return value.slice(idx);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/default-error-handler.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "throwDefaultError",
    ()=>throwDefaultError,
    "withBaseException",
    ()=>withBaseException
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/exceptions.js [app-route] (ecmascript)");
;
const throwDefaultError = ({ output, parsedBody, exceptionCtor, errorCode })=>{
    const $metadata = deserializeMetadata(output);
    const statusCode = $metadata.httpStatusCode ? $metadata.httpStatusCode + "" : undefined;
    const response = new exceptionCtor({
        name: parsedBody?.code || parsedBody?.Code || errorCode || statusCode || "UnknownError",
        $fault: "client",
        $metadata
    });
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(response, parsedBody);
};
const withBaseException = (ExceptionCtor)=>{
    return ({ output, parsedBody, errorCode })=>{
        throwDefaultError({
            output,
            parsedBody,
            exceptionCtor: ExceptionCtor,
            errorCode
        });
    };
};
const deserializeMetadata = (output)=>({
        httpStatusCode: output.statusCode,
        requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"]
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/protocols/Aws_query.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "de_AssumeRoleCommand",
    ()=>de_AssumeRoleCommand,
    "de_AssumeRoleWithWebIdentityCommand",
    ()=>de_AssumeRoleWithWebIdentityCommand,
    "se_AssumeRoleCommand",
    ()=>se_AssumeRoleCommand,
    "se_AssumeRoleWithWebIdentityCommand",
    ()=>se_AssumeRoleWithWebIdentityCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$xml$2f$parseXmlBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/protocols/xml/parseXmlBody.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$collect$2d$stream$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/protocols/collect-stream-body.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/exceptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/serde/parse-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$extended$2d$encode$2d$uri$2d$component$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/protocols/extended-encode-uri-component.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$default$2d$error$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/default-error-handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/STSServiceException.js [app-route] (ecmascript) <locals>");
;
;
;
;
;
const se_AssumeRoleCommand = async (input, context)=>{
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_AssumeRoleRequest(input, context),
        [_A]: _AR,
        [_V]: _
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const se_AssumeRoleWithWebIdentityCommand = async (input, context)=>{
    const headers = SHARED_HEADERS;
    let body;
    body = buildFormUrlencodedString({
        ...se_AssumeRoleWithWebIdentityRequest(input, context),
        [_A]: _ARWWI,
        [_V]: _
    });
    return buildHttpRpcRequest(context, headers, "/", undefined, body);
};
const de_AssumeRoleCommand = async (output, context)=>{
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$xml$2f$parseXmlBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseXmlBody"])(output.body, context);
    let contents = {};
    contents = de_AssumeRoleResponse(data.AssumeRoleResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents
    };
    return response;
};
const de_AssumeRoleWithWebIdentityCommand = async (output, context)=>{
    if (output.statusCode >= 300) {
        return de_CommandError(output, context);
    }
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$xml$2f$parseXmlBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseXmlBody"])(output.body, context);
    let contents = {};
    contents = de_AssumeRoleWithWebIdentityResponse(data.AssumeRoleWithWebIdentityResult, context);
    const response = {
        $metadata: deserializeMetadata(output),
        ...contents
    };
    return response;
};
const de_CommandError = async (output, context)=>{
    const parsedOutput = {
        ...output,
        body: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$xml$2f$parseXmlBody$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseXmlErrorBody"])(output.body, context)
    };
    const errorCode = loadQueryErrorCode(output, parsedOutput.body);
    switch(errorCode){
        case "ExpiredTokenException":
        case "com.amazonaws.sts#ExpiredTokenException":
            throw await de_ExpiredTokenExceptionRes(parsedOutput, context);
        case "MalformedPolicyDocument":
        case "com.amazonaws.sts#MalformedPolicyDocumentException":
            throw await de_MalformedPolicyDocumentExceptionRes(parsedOutput, context);
        case "PackedPolicyTooLarge":
        case "com.amazonaws.sts#PackedPolicyTooLargeException":
            throw await de_PackedPolicyTooLargeExceptionRes(parsedOutput, context);
        case "RegionDisabledException":
        case "com.amazonaws.sts#RegionDisabledException":
            throw await de_RegionDisabledExceptionRes(parsedOutput, context);
        case "IDPCommunicationError":
        case "com.amazonaws.sts#IDPCommunicationErrorException":
            throw await de_IDPCommunicationErrorExceptionRes(parsedOutput, context);
        case "IDPRejectedClaim":
        case "com.amazonaws.sts#IDPRejectedClaimException":
            throw await de_IDPRejectedClaimExceptionRes(parsedOutput, context);
        case "InvalidIdentityToken":
        case "com.amazonaws.sts#InvalidIdentityTokenException":
            throw await de_InvalidIdentityTokenExceptionRes(parsedOutput, context);
        default:
            const parsedBody = parsedOutput.body;
            return throwDefaultError({
                output,
                parsedBody: parsedBody.Error,
                errorCode
            });
    }
};
const de_ExpiredTokenExceptionRes = async (parsedOutput, context)=>{
    const body = parsedOutput.body;
    const deserialized = de_ExpiredTokenException(body.Error, context);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpiredTokenException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, body);
};
const de_IDPCommunicationErrorExceptionRes = async (parsedOutput, context)=>{
    const body = parsedOutput.body;
    const deserialized = de_IDPCommunicationErrorException(body.Error, context);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDPCommunicationErrorException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, body);
};
const de_IDPRejectedClaimExceptionRes = async (parsedOutput, context)=>{
    const body = parsedOutput.body;
    const deserialized = de_IDPRejectedClaimException(body.Error, context);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDPRejectedClaimException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, body);
};
const de_InvalidIdentityTokenExceptionRes = async (parsedOutput, context)=>{
    const body = parsedOutput.body;
    const deserialized = de_InvalidIdentityTokenException(body.Error, context);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidIdentityTokenException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, body);
};
const de_MalformedPolicyDocumentExceptionRes = async (parsedOutput, context)=>{
    const body = parsedOutput.body;
    const deserialized = de_MalformedPolicyDocumentException(body.Error, context);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MalformedPolicyDocumentException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, body);
};
const de_PackedPolicyTooLargeExceptionRes = async (parsedOutput, context)=>{
    const body = parsedOutput.body;
    const deserialized = de_PackedPolicyTooLargeException(body.Error, context);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PackedPolicyTooLargeException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, body);
};
const de_RegionDisabledExceptionRes = async (parsedOutput, context)=>{
    const body = parsedOutput.body;
    const deserialized = de_RegionDisabledException(body.Error, context);
    const exception = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegionDisabledException"]({
        $metadata: deserializeMetadata(parsedOutput),
        ...deserialized
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateServiceException"])(exception, body);
};
const se_AssumeRoleRequest = (input, context)=>{
    const entries = {};
    if (input[_RA] != null) {
        entries[_RA] = input[_RA];
    }
    if (input[_RSN] != null) {
        entries[_RSN] = input[_RSN];
    }
    if (input[_PA] != null) {
        const memberEntries = se_policyDescriptorListType(input[_PA], context);
        if (input[_PA]?.length === 0) {
            entries.PolicyArns = [];
        }
        Object.entries(memberEntries).forEach(([key, value])=>{
            const loc = `PolicyArns.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_P] != null) {
        entries[_P] = input[_P];
    }
    if (input[_DS] != null) {
        entries[_DS] = input[_DS];
    }
    if (input[_T] != null) {
        const memberEntries = se_tagListType(input[_T], context);
        if (input[_T]?.length === 0) {
            entries.Tags = [];
        }
        Object.entries(memberEntries).forEach(([key, value])=>{
            const loc = `Tags.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_TTK] != null) {
        const memberEntries = se_tagKeyListType(input[_TTK], context);
        if (input[_TTK]?.length === 0) {
            entries.TransitiveTagKeys = [];
        }
        Object.entries(memberEntries).forEach(([key, value])=>{
            const loc = `TransitiveTagKeys.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_EI] != null) {
        entries[_EI] = input[_EI];
    }
    if (input[_SN] != null) {
        entries[_SN] = input[_SN];
    }
    if (input[_TC] != null) {
        entries[_TC] = input[_TC];
    }
    if (input[_SI] != null) {
        entries[_SI] = input[_SI];
    }
    if (input[_PC] != null) {
        const memberEntries = se_ProvidedContextsListType(input[_PC], context);
        if (input[_PC]?.length === 0) {
            entries.ProvidedContexts = [];
        }
        Object.entries(memberEntries).forEach(([key, value])=>{
            const loc = `ProvidedContexts.${key}`;
            entries[loc] = value;
        });
    }
    return entries;
};
const se_AssumeRoleWithWebIdentityRequest = (input, context)=>{
    const entries = {};
    if (input[_RA] != null) {
        entries[_RA] = input[_RA];
    }
    if (input[_RSN] != null) {
        entries[_RSN] = input[_RSN];
    }
    if (input[_WIT] != null) {
        entries[_WIT] = input[_WIT];
    }
    if (input[_PI] != null) {
        entries[_PI] = input[_PI];
    }
    if (input[_PA] != null) {
        const memberEntries = se_policyDescriptorListType(input[_PA], context);
        if (input[_PA]?.length === 0) {
            entries.PolicyArns = [];
        }
        Object.entries(memberEntries).forEach(([key, value])=>{
            const loc = `PolicyArns.${key}`;
            entries[loc] = value;
        });
    }
    if (input[_P] != null) {
        entries[_P] = input[_P];
    }
    if (input[_DS] != null) {
        entries[_DS] = input[_DS];
    }
    return entries;
};
const se_policyDescriptorListType = (input, context)=>{
    const entries = {};
    let counter = 1;
    for (const entry of input){
        if (entry === null) {
            continue;
        }
        const memberEntries = se_PolicyDescriptorType(entry, context);
        Object.entries(memberEntries).forEach(([key, value])=>{
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const se_PolicyDescriptorType = (input, context)=>{
    const entries = {};
    if (input[_a] != null) {
        entries[_a] = input[_a];
    }
    return entries;
};
const se_ProvidedContext = (input, context)=>{
    const entries = {};
    if (input[_PAr] != null) {
        entries[_PAr] = input[_PAr];
    }
    if (input[_CA] != null) {
        entries[_CA] = input[_CA];
    }
    return entries;
};
const se_ProvidedContextsListType = (input, context)=>{
    const entries = {};
    let counter = 1;
    for (const entry of input){
        if (entry === null) {
            continue;
        }
        const memberEntries = se_ProvidedContext(entry, context);
        Object.entries(memberEntries).forEach(([key, value])=>{
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const se_Tag = (input, context)=>{
    const entries = {};
    if (input[_K] != null) {
        entries[_K] = input[_K];
    }
    if (input[_Va] != null) {
        entries[_Va] = input[_Va];
    }
    return entries;
};
const se_tagKeyListType = (input, context)=>{
    const entries = {};
    let counter = 1;
    for (const entry of input){
        if (entry === null) {
            continue;
        }
        entries[`member.${counter}`] = entry;
        counter++;
    }
    return entries;
};
const se_tagListType = (input, context)=>{
    const entries = {};
    let counter = 1;
    for (const entry of input){
        if (entry === null) {
            continue;
        }
        const memberEntries = se_Tag(entry, context);
        Object.entries(memberEntries).forEach(([key, value])=>{
            entries[`member.${counter}.${key}`] = value;
        });
        counter++;
    }
    return entries;
};
const de_AssumedRoleUser = (output, context)=>{
    const contents = {};
    if (output[_ARI] != null) {
        contents[_ARI] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_ARI]);
    }
    if (output[_Ar] != null) {
        contents[_Ar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_Ar]);
    }
    return contents;
};
const de_AssumeRoleResponse = (output, context)=>{
    const contents = {};
    if (output[_C] != null) {
        contents[_C] = de_Credentials(output[_C], context);
    }
    if (output[_ARU] != null) {
        contents[_ARU] = de_AssumedRoleUser(output[_ARU], context);
    }
    if (output[_PPS] != null) {
        contents[_PPS] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseInt32"])(output[_PPS]);
    }
    if (output[_SI] != null) {
        contents[_SI] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_SI]);
    }
    return contents;
};
const de_AssumeRoleWithWebIdentityResponse = (output, context)=>{
    const contents = {};
    if (output[_C] != null) {
        contents[_C] = de_Credentials(output[_C], context);
    }
    if (output[_SFWIT] != null) {
        contents[_SFWIT] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_SFWIT]);
    }
    if (output[_ARU] != null) {
        contents[_ARU] = de_AssumedRoleUser(output[_ARU], context);
    }
    if (output[_PPS] != null) {
        contents[_PPS] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strictParseInt32"])(output[_PPS]);
    }
    if (output[_Pr] != null) {
        contents[_Pr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_Pr]);
    }
    if (output[_Au] != null) {
        contents[_Au] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_Au]);
    }
    if (output[_SI] != null) {
        contents[_SI] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_SI]);
    }
    return contents;
};
const de_Credentials = (output, context)=>{
    const contents = {};
    if (output[_AKI] != null) {
        contents[_AKI] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_AKI]);
    }
    if (output[_SAK] != null) {
        contents[_SAK] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_SAK]);
    }
    if (output[_ST] != null) {
        contents[_ST] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_ST]);
    }
    if (output[_E] != null) {
        contents[_E] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectNonNull"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRfc3339DateTimeWithOffset"])(output[_E]));
    }
    return contents;
};
const de_ExpiredTokenException = (output, context)=>{
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_m]);
    }
    return contents;
};
const de_IDPCommunicationErrorException = (output, context)=>{
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_m]);
    }
    return contents;
};
const de_IDPRejectedClaimException = (output, context)=>{
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_m]);
    }
    return contents;
};
const de_InvalidIdentityTokenException = (output, context)=>{
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_m]);
    }
    return contents;
};
const de_MalformedPolicyDocumentException = (output, context)=>{
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_m]);
    }
    return contents;
};
const de_PackedPolicyTooLargeException = (output, context)=>{
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_m]);
    }
    return contents;
};
const de_RegionDisabledException = (output, context)=>{
    const contents = {};
    if (output[_m] != null) {
        contents[_m] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$parse$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["expectString"])(output[_m]);
    }
    return contents;
};
const deserializeMetadata = (output)=>({
        httpStatusCode: output.statusCode,
        requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"]
    });
const collectBodyString = (streamBody, context)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$collect$2d$stream$2d$body$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["collectBody"])(streamBody, context).then((body)=>context.utf8Encoder(body));
const throwDefaultError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$default$2d$error$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withBaseException"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"]);
const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body)=>{
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
        protocol,
        hostname,
        port,
        method: "POST",
        path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
        headers
    };
    if (resolvedHostname !== undefined) {
        contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
        contents.body = body;
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"](contents);
};
const SHARED_HEADERS = {
    "content-type": "application/x-www-form-urlencoded"
};
const _ = "2011-06-15";
const _A = "Action";
const _AKI = "AccessKeyId";
const _AR = "AssumeRole";
const _ARI = "AssumedRoleId";
const _ARU = "AssumedRoleUser";
const _ARWWI = "AssumeRoleWithWebIdentity";
const _Ar = "Arn";
const _Au = "Audience";
const _C = "Credentials";
const _CA = "ContextAssertion";
const _DS = "DurationSeconds";
const _E = "Expiration";
const _EI = "ExternalId";
const _K = "Key";
const _P = "Policy";
const _PA = "PolicyArns";
const _PAr = "ProviderArn";
const _PC = "ProvidedContexts";
const _PI = "ProviderId";
const _PPS = "PackedPolicySize";
const _Pr = "Provider";
const _RA = "RoleArn";
const _RSN = "RoleSessionName";
const _SAK = "SecretAccessKey";
const _SFWIT = "SubjectFromWebIdentityToken";
const _SI = "SourceIdentity";
const _SN = "SerialNumber";
const _ST = "SessionToken";
const _T = "Tags";
const _TC = "TokenCode";
const _TTK = "TransitiveTagKeys";
const _V = "Version";
const _Va = "Value";
const _WIT = "WebIdentityToken";
const _a = "arn";
const _m = "message";
const buildFormUrlencodedString = (formEntries)=>Object.entries(formEntries).map(([key, value])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$extended$2d$encode$2d$uri$2d$component$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendedEncodeURIComponent"])(key) + "=" + (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$protocols$2f$extended$2d$encode$2d$uri$2d$component$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendedEncodeURIComponent"])(value)).join("&");
const loadQueryErrorCode = (output, data)=>{
    if (data.Error?.Code !== undefined) {
        return data.Error.Code;
    }
    if (output.statusCode == 404) {
        return "NotFound";
    }
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssumeRoleCommand",
    ()=>AssumeRoleCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$protocols$2f$Aws_query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/protocols/Aws_query.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class AssumeRoleCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").f(void 0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$protocols$2f$Aws_query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_AssumeRoleCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$protocols$2f$Aws_query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_AssumeRoleCommand"]).build() {
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleWithWebIdentityCommand.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssumeRoleWithWebIdentityCommand",
    ()=>AssumeRoleWithWebIdentityCommand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-endpoint/dist-es/getEndpointPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/middleware-serde/dist-es/serdePlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/models_0.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$protocols$2f$Aws_query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/protocols/Aws_query.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
class AssumeRoleWithWebIdentityCommand extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"].classBuilder().ep(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["commonParams"]).m(function(Command, cs, config, o) {
    return [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$serde$2f$dist$2d$es$2f$serdePlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSerdePlugin"])(config, this.serialize, this.deserialize),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$getEndpointPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getEndpointPlugin"])(config, Command.getEndpointParameterInstructions())
    ];
}).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").f(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleWithWebIdentityRequestFilterSensitiveLog"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleWithWebIdentityResponseFilterSensitiveLog"]).ser(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$protocols$2f$Aws_query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["se_AssumeRoleWithWebIdentityCommand"]).de(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$protocols$2f$Aws_query$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["de_AssumeRoleWithWebIdentityCommand"]).build() {
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STS.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STS",
    ()=>STS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$create$2d$aggregated$2d$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleWithWebIdentityCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js [app-route] (ecmascript) <locals>");
;
;
;
;
const commands = {
    AssumeRoleCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AssumeRoleCommand"],
    AssumeRoleWithWebIdentityCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AssumeRoleWithWebIdentityCommand"]
};
class STS extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSClient"] {
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$create$2d$aggregated$2d$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAggregatedClient"])(commands, STS);
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleWithWebIdentityCommand.js [app-route] (ecmascript) <locals>");
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/models_0.js [app-route] (ecmascript)");
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/defaultStsRoleAssumers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decorateDefaultCredentialProvider",
    ()=>decorateDefaultCredentialProvider,
    "getDefaultRoleAssumer",
    ()=>getDefaultRoleAssumer,
    "getDefaultRoleAssumerWithWebIdentity",
    ()=>getDefaultRoleAssumerWithWebIdentity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleWithWebIdentityCommand.js [app-route] (ecmascript) <locals>");
;
;
;
const ASSUME_ROLE_DEFAULT_REGION = "us-east-1";
const getAccountIdFromAssumedRoleUser = (assumedRoleUser)=>{
    if (typeof assumedRoleUser?.Arn === "string") {
        const arnComponents = assumedRoleUser.Arn.split(":");
        if (arnComponents.length > 4 && arnComponents[4] !== "") {
            return arnComponents[4];
        }
    }
    return undefined;
};
const resolveRegion = async (_region, _parentRegion, credentialProviderLogger)=>{
    const region = typeof _region === "function" ? await _region() : _region;
    const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
    credentialProviderLogger?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (provider)`, `${parentRegion} (parent client)`, `${ASSUME_ROLE_DEFAULT_REGION} (STS default)`);
    return region ?? parentRegion ?? ASSUME_ROLE_DEFAULT_REGION;
};
const getDefaultRoleAssumer = (stsOptions, STSClient)=>{
    let stsClient;
    let closureSourceCreds;
    return async (sourceCreds, params)=>{
        closureSourceCreds = sourceCreds;
        if (!stsClient) {
            const { logger = stsOptions?.parentClientConfig?.logger, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger } = stsOptions;
            const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger);
            const isCompatibleRequestHandler = !isH2(requestHandler);
            stsClient = new STSClient({
                profile: stsOptions?.parentClientConfig?.profile,
                credentialDefaultProvider: ()=>async ()=>closureSourceCreds,
                region: resolvedRegion,
                requestHandler: isCompatibleRequestHandler ? requestHandler : undefined,
                logger: logger
            });
        }
        const { Credentials, AssumedRoleUser } = await stsClient.send(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AssumeRoleCommand"](params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
        }
        const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
        const credentials = {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
            ...Credentials.CredentialScope && {
                credentialScope: Credentials.CredentialScope
            },
            ...accountId && {
                accountId
            }
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
        return credentials;
    };
};
const getDefaultRoleAssumerWithWebIdentity = (stsOptions, STSClient)=>{
    let stsClient;
    return async (params)=>{
        if (!stsClient) {
            const { logger = stsOptions?.parentClientConfig?.logger, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger } = stsOptions;
            const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger);
            const isCompatibleRequestHandler = !isH2(requestHandler);
            stsClient = new STSClient({
                profile: stsOptions?.parentClientConfig?.profile,
                region: resolvedRegion,
                requestHandler: isCompatibleRequestHandler ? requestHandler : undefined,
                logger: logger
            });
        }
        const { Credentials, AssumedRoleUser } = await stsClient.send(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AssumeRoleWithWebIdentityCommand"](params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
        }
        const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
        const credentials = {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
            ...Credentials.CredentialScope && {
                credentialScope: Credentials.CredentialScope
            },
            ...accountId && {
                accountId
            }
        };
        if (accountId) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(credentials, "RESOLVED_ACCOUNT_ID", "T");
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
        return credentials;
    };
};
const decorateDefaultCredentialProvider = (provider)=>(input)=>provider({
            roleAssumer: getDefaultRoleAssumer(input, input.stsClientCtor),
            roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input, input.stsClientCtor),
            ...input
        });
const isH2 = (requestHandler)=>{
    return requestHandler?.metadata?.handlerProtocol === "h2";
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/defaultRoleAssumers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decorateDefaultCredentialProvider",
    ()=>decorateDefaultCredentialProvider,
    "getDefaultRoleAssumer",
    ()=>getDefaultRoleAssumer,
    "getDefaultRoleAssumerWithWebIdentity",
    ()=>getDefaultRoleAssumerWithWebIdentity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$defaultStsRoleAssumers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/defaultStsRoleAssumers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js [app-route] (ecmascript) <locals>");
;
;
const getCustomizableStsClientCtor = (baseCtor, customizations)=>{
    if (!customizations) return baseCtor;
    else return class CustomizableSTSClient extends baseCtor {
        constructor(config){
            super(config);
            for (const customization of customizations){
                this.middlewareStack.use(customization);
            }
        }
    };
};
const getDefaultRoleAssumer = (stsOptions = {}, stsPlugins)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$defaultStsRoleAssumers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultRoleAssumer"])(stsOptions, getCustomizableStsClientCtor(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSClient"], stsPlugins));
const getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$defaultStsRoleAssumers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultRoleAssumerWithWebIdentity"])(stsOptions, getCustomizableStsClientCtor(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSClient"], stsPlugins));
const decorateDefaultCredentialProvider = (provider)=>(input)=>provider({
            roleAssumer: getDefaultRoleAssumer(input),
            roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input),
            ...input
        });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STS.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$defaultRoleAssumers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/defaultRoleAssumers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/STSServiceException.js [app-route] (ecmascript) <locals>");
;
;
;
;
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STSClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSClient"],
    "__Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/client.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "AssumeRoleCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AssumeRoleCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleWithWebIdentityCommand.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Command"],
    "AssumeRoleWithWebIdentityCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AssumeRoleWithWebIdentityCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleWithWebIdentityCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$command$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/node_modules/@smithy/smithy-client/dist-es/command.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["$Command"],
    "AssumeRoleCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleCommand"],
    "AssumeRoleWithWebIdentityCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleWithWebIdentityCommand"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleCommand.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$AssumeRoleWithWebIdentityCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/AssumeRoleWithWebIdentityCommand.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssumeRoleResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleResponseFilterSensitiveLog"],
    "AssumeRoleWithWebIdentityRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleWithWebIdentityRequestFilterSensitiveLog"],
    "AssumeRoleWithWebIdentityResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleWithWebIdentityResponseFilterSensitiveLog"],
    "CredentialsFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsFilterSensitiveLog"],
    "ExpiredTokenException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpiredTokenException"],
    "IDPCommunicationErrorException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDPCommunicationErrorException"],
    "IDPRejectedClaimException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDPRejectedClaimException"],
    "InvalidIdentityTokenException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidIdentityTokenException"],
    "MalformedPolicyDocumentException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MalformedPolicyDocumentException"],
    "PackedPolicyTooLargeException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PackedPolicyTooLargeException"],
    "RegionDisabledException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegionDisabledException"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/models_0.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["$Command"],
    "AssumeRoleCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleCommand"],
    "AssumeRoleResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleResponseFilterSensitiveLog"],
    "AssumeRoleWithWebIdentityCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleWithWebIdentityCommand"],
    "AssumeRoleWithWebIdentityRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleWithWebIdentityRequestFilterSensitiveLog"],
    "AssumeRoleWithWebIdentityResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AssumeRoleWithWebIdentityResponseFilterSensitiveLog"],
    "CredentialsFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsFilterSensitiveLog"],
    "ExpiredTokenException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ExpiredTokenException"],
    "IDPCommunicationErrorException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDPCommunicationErrorException"],
    "IDPRejectedClaimException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IDPRejectedClaimException"],
    "InvalidIdentityTokenException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidIdentityTokenException"],
    "MalformedPolicyDocumentException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MalformedPolicyDocumentException"],
    "PackedPolicyTooLargeException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PackedPolicyTooLargeException"],
    "RegionDisabledException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RegionDisabledException"],
    "STS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["STS"],
    "STSClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["STSClient"],
    "STSServiceException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["STSServiceException"],
    "__Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__Client"],
    "decorateDefaultCredentialProvider",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$defaultRoleAssumers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decorateDefaultCredentialProvider"],
    "getDefaultRoleAssumer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$defaultRoleAssumers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultRoleAssumer"],
    "getDefaultRoleAssumerWithWebIdentity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$defaultRoleAssumers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultRoleAssumerWithWebIdentity"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STSClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STSClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$STS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/STS.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/commands/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$defaultRoleAssumers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/defaultRoleAssumers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$nested$2d$clients$2f$dist$2d$es$2f$submodules$2f$sts$2f$models$2f$STSServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/models/STSServiceException.js [app-route] (ecmascript) <locals>");
}),
];

//# sourceMappingURL=6361e_%40aws-sdk_nested-clients_4e1de409._.js.map