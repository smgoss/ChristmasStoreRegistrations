module.exports = [
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLambdaHttpAuthSchemeParametersProvider",
    ()=>defaultLambdaHttpAuthSchemeParametersProvider,
    "defaultLambdaHttpAuthSchemeProvider",
    ()=>defaultLambdaHttpAuthSchemeProvider,
    "resolveHttpAuthSchemeConfig",
    ()=>resolveHttpAuthSchemeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$resolveAwsSdkSigV4Config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/resolveAwsSdkSigV4Config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-middleware/dist-es/getSmithyContext.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-middleware/dist-es/normalizeProvider.js [app-route] (ecmascript)");
;
;
const defaultLambdaHttpAuthSchemeParametersProvider = async (config, context, input)=>{
    return {
        operation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$getSmithyContext$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSmithyContext"])(context).operation,
        region: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.region)() || (()=>{
            throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
    };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "lambda",
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
const defaultLambdaHttpAuthSchemeProvider = (authParameters)=>{
    const options = [];
    switch(authParameters.operation){
        default:
            {
                options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
            }
    }
    return options;
};
const resolveHttpAuthSchemeConfig = (config)=>{
    const config_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$resolveAwsSdkSigV4Config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAwsSdkSigV4Config"])(config);
    return Object.assign(config_0, {
        authSchemePreference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$middleware$2f$dist$2d$es$2f$normalizeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeProvider"])(config.authSchemePreference ?? [])
    });
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/auth/httpAuthExtensionConfiguration.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
        defaultSigningName: "lambda"
    });
};
const commonParams = {
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
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/endpoint/ruleset.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ruleSet",
    ()=>ruleSet
]);
const s = "required", t = "fn", u = "argv", v = "ref";
const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = {
    [s]: false,
    "type": "String"
}, i = {
    [s]: true,
    "default": false,
    "type": "Boolean"
}, j = {
    [v]: "Endpoint"
}, k = {
    [t]: c,
    [u]: [
        {
            [v]: "UseFIPS"
        },
        true
    ]
}, l = {
    [t]: c,
    [u]: [
        {
            [v]: "UseDualStack"
        },
        true
    ]
}, m = {}, n = {
    [t]: "getAttr",
    [u]: [
        {
            [v]: g
        },
        "supportsFIPS"
    ]
}, o = {
    [t]: c,
    [u]: [
        true,
        {
            [t]: "getAttr",
            [u]: [
                {
                    [v]: g
                },
                "supportsDualStack"
            ]
        }
    ]
}, p = [
    k
], q = [
    l
], r = [
    {
        [v]: "Region"
    }
];
const _data = {
    version: "1.0",
    parameters: {
        Region: h,
        UseDualStack: i,
        UseFIPS: i,
        Endpoint: h
    },
    rules: [
        {
            conditions: [
                {
                    [t]: b,
                    [u]: [
                        j
                    ]
                }
            ],
            rules: [
                {
                    conditions: p,
                    error: "Invalid Configuration: FIPS and custom endpoint are not supported",
                    type: d
                },
                {
                    conditions: q,
                    error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                    type: d
                },
                {
                    endpoint: {
                        url: j,
                        properties: m,
                        headers: m
                    },
                    type: e
                }
            ],
            type: f
        },
        {
            conditions: [
                {
                    [t]: b,
                    [u]: r
                }
            ],
            rules: [
                {
                    conditions: [
                        {
                            [t]: "aws.partition",
                            [u]: r,
                            assign: g
                        }
                    ],
                    rules: [
                        {
                            conditions: [
                                k,
                                l
                            ],
                            rules: [
                                {
                                    conditions: [
                                        {
                                            [t]: c,
                                            [u]: [
                                                a,
                                                n
                                            ]
                                        },
                                        o
                                    ],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://lambda-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: m,
                                                headers: m
                                            },
                                            type: e
                                        }
                                    ],
                                    type: f
                                },
                                {
                                    error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                                    type: d
                                }
                            ],
                            type: f
                        },
                        {
                            conditions: p,
                            rules: [
                                {
                                    conditions: [
                                        {
                                            [t]: c,
                                            [u]: [
                                                n,
                                                a
                                            ]
                                        }
                                    ],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://lambda-fips.{Region}.{PartitionResult#dnsSuffix}",
                                                properties: m,
                                                headers: m
                                            },
                                            type: e
                                        }
                                    ],
                                    type: f
                                },
                                {
                                    error: "FIPS is enabled but this partition does not support FIPS",
                                    type: d
                                }
                            ],
                            type: f
                        },
                        {
                            conditions: q,
                            rules: [
                                {
                                    conditions: [
                                        o
                                    ],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://lambda.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: m,
                                                headers: m
                                            },
                                            type: e
                                        }
                                    ],
                                    type: f
                                },
                                {
                                    error: "DualStack is enabled but this partition does not support DualStack",
                                    type: d
                                }
                            ],
                            type: f
                        },
                        {
                            endpoint: {
                                url: "https://lambda.{Region}.{PartitionResult#dnsSuffix}",
                                properties: m,
                                headers: m
                            },
                            type: e
                        }
                    ],
                    type: f
                }
            ],
            type: f
        },
        {
            error: "Invalid Configuration: Missing Region",
            type: d
        }
    ]
};
const ruleSet = _data;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/endpoint/endpointResolver.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultEndpointResolver",
    ()=>defaultEndpointResolver
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/util-endpoints/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$aws$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/util-endpoints/dist-es/aws.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-endpoints/dist-es/utils/customEndpointFunctions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$cache$2f$EndpointCache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-endpoints/dist-es/cache/EndpointCache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveEndpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-endpoints/dist-es/resolveEndpoint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$endpoint$2f$ruleset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/endpoint/ruleset.js [app-route] (ecmascript)");
;
;
;
const cache = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$cache$2f$EndpointCache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndpointCache"]({
    size: 50,
    params: [
        "Endpoint",
        "Region",
        "UseDualStack",
        "UseFIPS"
    ]
});
const defaultEndpointResolver = (endpointParams, context = {})=>{
    return cache.get(endpointParams, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$resolveEndpoint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEndpoint"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$endpoint$2f$ruleset$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ruleSet"], {
            endpointParams: endpointParams,
            logger: context.logger
        }));
};
__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$endpoints$2f$dist$2d$es$2f$utils$2f$customEndpointFunctions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customEndpointFunctions"].aws = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$endpoints$2f$dist$2d$es$2f$aws$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["awsEndpointFunctions"];
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/runtimeConfig.shared.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntimeConfig",
    ()=>getRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/AwsSdkSigV4Signer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/NoOpLogger.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/url-parser/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-base64/dist-es/fromBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-base64/dist-es/toBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-utf8/dist-es/fromUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-utf8/dist-es/toUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$endpoint$2f$endpointResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/endpoint/endpointResolver.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const getRuntimeConfig = (config)=>{
    return {
        apiVersion: "2015-03-31",
        base64Decoder: config?.base64Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBase64"],
        base64Encoder: config?.base64Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBase64"],
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$endpoint$2f$endpointResolver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultEndpointResolver"],
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultLambdaHttpAuthSchemeProvider"],
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc)=>ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$AwsSdkSigV4Signer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AwsSdkSigV4Signer"]()
            }
        ],
        logger: config?.logger ?? new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$NoOpLogger$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NoOpLogger"](),
        serviceId: config?.serviceId ?? "Lambda",
        urlParser: config?.urlParser ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$url$2d$parser$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseUrl"],
        utf8Decoder: config?.utf8Decoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$fromUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromUtf8"],
        utf8Encoder: config?.utf8Encoder ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"]
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/runtimeConfig.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntimeConfig",
    ()=>getRuntimeConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$package$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/package.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$NODE_AUTH_SCHEME_PREFERENCE_OPTIONS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/httpAuthSchemes/aws_sdk/NODE_AUTH_SCHEME_PREFERENCE_OPTIONS.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/client/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-node/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$node$2f$dist$2d$es$2f$defaultProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-node/dist-es/defaultProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/util-user-agent-node/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$nodeAppIdConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/util-user-agent-node/dist-es/nodeAppIdConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/util-user-agent-node/dist-es/defaultUserAgent.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/config-resolver/dist-es/regionConfig/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseDualstackEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseDualstackEndpointConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseFipsEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/config-resolver/dist-es/endpointsConfig/NodeUseFipsEndpointConfigOptions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$node$2f$dist$2d$es$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/eventstream-serde-node/dist-es/provider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$hash$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/hash-node/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/middleware-retry/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/node-config-provider/dist-es/configLoader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/node-http-handler/dist-es/node-http-handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$body$2d$length$2d$node$2f$dist$2d$es$2f$calculateBodyLength$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-body-length-node/dist-es/calculateBodyLength.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-retry/dist-es/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$runtimeConfig$2e$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/runtimeConfig.shared.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$defaults$2d$mode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/defaults-mode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$resolveDefaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-defaults-mode-node/dist-es/resolveDefaultsModeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/emitWarningIfUnsupportedVersion.js [app-route] (ecmascript)");
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
;
const getRuntimeConfig = (config)=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["emitWarningIfUnsupportedVersion"])(process.version);
    const defaultsMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$defaults$2d$mode$2d$node$2f$dist$2d$es$2f$resolveDefaultsModeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveDefaultsModeConfig"])(config);
    const defaultConfigProvider = ()=>defaultsMode().then(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$defaults$2d$mode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfigsForDefaultMode"]);
    const clientSharedValues = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$runtimeConfig$2e$shared$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRuntimeConfig"])(config);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$emitWarningIfUnsupportedVersion$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["emitWarningIfUnsupportedVersion"])(process.version);
    const loaderConfig = {
        profile: config?.profile,
        logger: clientSharedValues.logger
    };
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        authSchemePreference: config?.authSchemePreference ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$httpAuthSchemes$2f$aws_sdk$2f$NODE_AUTH_SCHEME_PREFERENCE_OPTIONS$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_AUTH_SCHEME_PREFERENCE_OPTIONS"], loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$body$2d$length$2d$node$2f$dist$2d$es$2f$calculateBodyLength$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateBodyLength"],
        credentialDefaultProvider: config?.credentialDefaultProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$node$2f$dist$2d$es$2f$defaultProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultProvider"],
        defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$defaultUserAgent$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDefaultUserAgentProvider"])({
            serviceId: clientSharedValues.serviceId,
            clientVersion: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$package$2e$json__$28$json$29$__["default"].version
        }),
        eventStreamSerdeProvider: config?.eventStreamSerdeProvider ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$node$2f$dist$2d$es$2f$provider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eventStreamSerdeProvider"],
        maxAttempts: config?.maxAttempts ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_MAX_ATTEMPT_CONFIG_OPTIONS"], config),
        region: config?.region ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_OPTIONS"], {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_REGION_CONFIG_FILE_OPTIONS"],
            ...loaderConfig
        }),
        requestHandler: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NodeHttpHandler"].create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])({
            ...__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_RETRY_MODE_CONFIG_OPTIONS"],
            default: async ()=>(await defaultConfigProvider()).retryMode || __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$retry$2f$dist$2d$es$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_RETRY_MODE"]
        }, config),
        sha256: config?.sha256 ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$hash$2d$node$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Hash"].bind(null, "sha256"),
        streamCollector: config?.streamCollector ?? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["streamCollector"],
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseDualstackEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS"], loaderConfig),
        useFipsEndpoint: config?.useFipsEndpoint ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$endpointsConfig$2f$NodeUseFipsEndpointConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS"], loaderConfig),
        userAgentAppId: config?.userAgentAppId ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$config$2d$provider$2f$dist$2d$es$2f$configLoader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadConfig"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$util$2d$user$2d$agent$2d$node$2f$dist$2d$es$2f$nodeAppIdConfigOptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NODE_APP_ID_CONFIG_OPTIONS"], loaderConfig)
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/runtimeExtensions.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveRuntimeExtensions",
    ()=>resolveRuntimeExtensions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/region-config-resolver/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/region-config-resolver/dist-es/extensions/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/protocol-http/dist-es/extensions/httpExtensionConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/extensions/defaultExtensionConfiguration.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/auth/httpAuthExtensionConfiguration.js [app-route] (ecmascript)");
;
;
;
;
const resolveRuntimeExtensions = (runtimeConfig, extensions)=>{
    const extensionConfiguration = Object.assign((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAwsRegionExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpHandlerExtensionConfiguration"])(runtimeConfig), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpAuthExtensionConfiguration"])(runtimeConfig));
    extensions.forEach((extension)=>extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$region$2d$config$2d$resolver$2f$dist$2d$es$2f$extensions$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAwsRegionExtensionConfiguration"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$extensions$2f$defaultExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveDefaultRuntimeConfig"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$extensions$2f$httpExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpHandlerRuntimeConfig"])(extensionConfiguration), (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$auth$2f$httpAuthExtensionConfiguration$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpAuthRuntimeConfig"])(extensionConfiguration));
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LambdaClient",
    ()=>LambdaClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/middleware-host-header/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/middleware-logger/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/middleware-logger/dist-es/loggerMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$recursion$2d$detection$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/middleware-recursion-detection/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/middleware-user-agent/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/middleware-user-agent/dist-es/user-agent-middleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/middleware-user-agent/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$resolveRegionConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/config-resolver/dist-es/regionConfig/resolveRegionConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$DefaultIdentityProviderConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/util-identity-and-auth/DefaultIdentityProviderConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$getHttpAuthSchemeEndpointRuleSetPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/middleware-http-auth-scheme/getHttpAuthSchemeEndpointRuleSetPlugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$getHttpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/middleware-http-signing/getHttpSigningMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$config$2d$resolver$2f$dist$2d$es$2f$EventStreamSerdeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/eventstream-serde-config-resolver/dist-es/EventStreamSerdeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$content$2d$length$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/middleware-content-length/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$resolveEndpointConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/middleware-endpoint/dist-es/resolveEndpointConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$retryMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/middleware-retry/dist-es/retryMiddleware.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/middleware-retry/dist-es/configurations.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/auth/httpAuthSchemeProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/endpoint/EndpointParameters.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$runtimeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/runtimeConfig.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$runtimeExtensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/runtimeExtensions.js [app-route] (ecmascript)");
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
;
class LambdaClient extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"] {
    config;
    constructor(...[configuration]){
        const _config_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$runtimeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRuntimeConfig"])(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$endpoint$2f$EndpointParameters$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveClientEndpointParameters"])(_config_0);
        const _config_2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveUserAgentConfig"])(_config_1);
        const _config_3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$configurations$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRetryConfig"])(_config_2);
        const _config_4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$config$2d$resolver$2f$dist$2d$es$2f$regionConfig$2f$resolveRegionConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRegionConfig"])(_config_3);
        const _config_5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHostHeaderConfig"])(_config_4);
        const _config_6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$endpoint$2f$dist$2d$es$2f$resolveEndpointConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEndpointConfig"])(_config_5);
        const _config_7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$eventstream$2d$serde$2d$config$2d$resolver$2f$dist$2d$es$2f$EventStreamSerdeConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveEventStreamSerdeConfig"])(_config_6);
        const _config_8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveHttpAuthSchemeConfig"])(_config_7);
        const _config_9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$runtimeExtensions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveRuntimeExtensions"])(_config_8, configuration?.extensions || []);
        this.config = _config_9;
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$user$2d$agent$2f$dist$2d$es$2f$user$2d$agent$2d$middleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserAgentPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$retry$2f$dist$2d$es$2f$retryMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRetryPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$middleware$2d$content$2d$length$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getContentLengthPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$host$2d$header$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHostHeaderPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$logger$2f$dist$2d$es$2f$loggerMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLoggerPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$middleware$2d$recursion$2d$detection$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getRecursionDetectionPlugin"])(this.config));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$auth$2d$scheme$2f$getHttpAuthSchemeEndpointRuleSetPlugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpAuthSchemeEndpointRuleSetPlugin"])(this.config, {
            httpAuthSchemeParametersProvider: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$auth$2f$httpAuthSchemeProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultLambdaHttpAuthSchemeParametersProvider"],
            identityProviderConfigProvider: async (config)=>new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$util$2d$identity$2d$and$2d$auth$2f$DefaultIdentityProviderConfig$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DefaultIdentityProviderConfig"]({
                    "aws.auth#sigv4": config.credentials
                })
        }));
        this.middlewareStack.use((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$middleware$2d$http$2d$signing$2f$getHttpSigningMiddleware$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getHttpSigningPlugin"])(this.config));
    }
    destroy() {
        super.destroy();
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LambdaClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"],
    "__Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Client"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/client.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/LambdaServiceException.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LambdaServiceException",
    ()=>LambdaServiceException
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/exceptions.js [app-route] (ecmascript)");
;
;
class LambdaServiceException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$exceptions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceException"] {
    constructor(options){
        super(options);
        Object.setPrototypeOf(this, LambdaServiceException.prototype);
    }
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/models_0.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApplicationLogLevel",
    ()=>ApplicationLogLevel,
    "Architecture",
    ()=>Architecture,
    "CodeSigningConfigNotFoundException",
    ()=>CodeSigningConfigNotFoundException,
    "CodeSigningPolicy",
    ()=>CodeSigningPolicy,
    "CodeStorageExceededException",
    ()=>CodeStorageExceededException,
    "CodeVerificationFailedException",
    ()=>CodeVerificationFailedException,
    "CreateFunctionRequestFilterSensitiveLog",
    ()=>CreateFunctionRequestFilterSensitiveLog,
    "EC2AccessDeniedException",
    ()=>EC2AccessDeniedException,
    "EC2ThrottledException",
    ()=>EC2ThrottledException,
    "EC2UnexpectedException",
    ()=>EC2UnexpectedException,
    "EFSIOException",
    ()=>EFSIOException,
    "EFSMountConnectivityException",
    ()=>EFSMountConnectivityException,
    "EFSMountFailureException",
    ()=>EFSMountFailureException,
    "EFSMountTimeoutException",
    ()=>EFSMountTimeoutException,
    "ENILimitReachedException",
    ()=>ENILimitReachedException,
    "EndPointType",
    ()=>EndPointType,
    "EnvironmentErrorFilterSensitiveLog",
    ()=>EnvironmentErrorFilterSensitiveLog,
    "EnvironmentFilterSensitiveLog",
    ()=>EnvironmentFilterSensitiveLog,
    "EnvironmentResponseFilterSensitiveLog",
    ()=>EnvironmentResponseFilterSensitiveLog,
    "EventSourceMappingMetric",
    ()=>EventSourceMappingMetric,
    "EventSourcePosition",
    ()=>EventSourcePosition,
    "FullDocument",
    ()=>FullDocument,
    "FunctionCodeFilterSensitiveLog",
    ()=>FunctionCodeFilterSensitiveLog,
    "FunctionConfigurationFilterSensitiveLog",
    ()=>FunctionConfigurationFilterSensitiveLog,
    "FunctionResponseType",
    ()=>FunctionResponseType,
    "FunctionUrlAuthType",
    ()=>FunctionUrlAuthType,
    "FunctionVersion",
    ()=>FunctionVersion,
    "GetFunctionResponseFilterSensitiveLog",
    ()=>GetFunctionResponseFilterSensitiveLog,
    "ImageConfigErrorFilterSensitiveLog",
    ()=>ImageConfigErrorFilterSensitiveLog,
    "ImageConfigResponseFilterSensitiveLog",
    ()=>ImageConfigResponseFilterSensitiveLog,
    "InvalidCodeSignatureException",
    ()=>InvalidCodeSignatureException,
    "InvalidParameterValueException",
    ()=>InvalidParameterValueException,
    "InvalidRequestContentException",
    ()=>InvalidRequestContentException,
    "InvalidRuntimeException",
    ()=>InvalidRuntimeException,
    "InvalidSecurityGroupIDException",
    ()=>InvalidSecurityGroupIDException,
    "InvalidSubnetIDException",
    ()=>InvalidSubnetIDException,
    "InvalidZipFileException",
    ()=>InvalidZipFileException,
    "InvocationRequestFilterSensitiveLog",
    ()=>InvocationRequestFilterSensitiveLog,
    "InvocationResponseFilterSensitiveLog",
    ()=>InvocationResponseFilterSensitiveLog,
    "InvocationType",
    ()=>InvocationType,
    "InvokeAsyncRequestFilterSensitiveLog",
    ()=>InvokeAsyncRequestFilterSensitiveLog,
    "InvokeMode",
    ()=>InvokeMode,
    "InvokeResponseStreamUpdateFilterSensitiveLog",
    ()=>InvokeResponseStreamUpdateFilterSensitiveLog,
    "InvokeWithResponseStreamRequestFilterSensitiveLog",
    ()=>InvokeWithResponseStreamRequestFilterSensitiveLog,
    "InvokeWithResponseStreamResponseEvent",
    ()=>InvokeWithResponseStreamResponseEvent,
    "InvokeWithResponseStreamResponseEventFilterSensitiveLog",
    ()=>InvokeWithResponseStreamResponseEventFilterSensitiveLog,
    "InvokeWithResponseStreamResponseFilterSensitiveLog",
    ()=>InvokeWithResponseStreamResponseFilterSensitiveLog,
    "KMSAccessDeniedException",
    ()=>KMSAccessDeniedException,
    "KMSDisabledException",
    ()=>KMSDisabledException,
    "KMSInvalidStateException",
    ()=>KMSInvalidStateException,
    "KMSNotFoundException",
    ()=>KMSNotFoundException,
    "KafkaSchemaRegistryAuthType",
    ()=>KafkaSchemaRegistryAuthType,
    "KafkaSchemaValidationAttribute",
    ()=>KafkaSchemaValidationAttribute,
    "LastUpdateStatus",
    ()=>LastUpdateStatus,
    "LastUpdateStatusReasonCode",
    ()=>LastUpdateStatusReasonCode,
    "LayerVersionContentInputFilterSensitiveLog",
    ()=>LayerVersionContentInputFilterSensitiveLog,
    "ListFunctionsResponseFilterSensitiveLog",
    ()=>ListFunctionsResponseFilterSensitiveLog,
    "ListVersionsByFunctionResponseFilterSensitiveLog",
    ()=>ListVersionsByFunctionResponseFilterSensitiveLog,
    "LogFormat",
    ()=>LogFormat,
    "LogType",
    ()=>LogType,
    "PackageType",
    ()=>PackageType,
    "PolicyLengthExceededException",
    ()=>PolicyLengthExceededException,
    "PreconditionFailedException",
    ()=>PreconditionFailedException,
    "ProvisionedConcurrencyConfigNotFoundException",
    ()=>ProvisionedConcurrencyConfigNotFoundException,
    "ProvisionedConcurrencyStatusEnum",
    ()=>ProvisionedConcurrencyStatusEnum,
    "PublishLayerVersionRequestFilterSensitiveLog",
    ()=>PublishLayerVersionRequestFilterSensitiveLog,
    "RecursiveInvocationException",
    ()=>RecursiveInvocationException,
    "RecursiveLoop",
    ()=>RecursiveLoop,
    "RequestTooLargeException",
    ()=>RequestTooLargeException,
    "ResourceConflictException",
    ()=>ResourceConflictException,
    "ResourceInUseException",
    ()=>ResourceInUseException,
    "ResourceNotFoundException",
    ()=>ResourceNotFoundException,
    "ResourceNotReadyException",
    ()=>ResourceNotReadyException,
    "ResponseStreamingInvocationType",
    ()=>ResponseStreamingInvocationType,
    "Runtime",
    ()=>Runtime,
    "RuntimeVersionConfigFilterSensitiveLog",
    ()=>RuntimeVersionConfigFilterSensitiveLog,
    "RuntimeVersionErrorFilterSensitiveLog",
    ()=>RuntimeVersionErrorFilterSensitiveLog,
    "SchemaRegistryEventRecordFormat",
    ()=>SchemaRegistryEventRecordFormat,
    "ServiceException",
    ()=>ServiceException,
    "SnapStartApplyOn",
    ()=>SnapStartApplyOn,
    "SnapStartException",
    ()=>SnapStartException,
    "SnapStartNotReadyException",
    ()=>SnapStartNotReadyException,
    "SnapStartOptimizationStatus",
    ()=>SnapStartOptimizationStatus,
    "SnapStartTimeoutException",
    ()=>SnapStartTimeoutException,
    "SourceAccessType",
    ()=>SourceAccessType,
    "State",
    ()=>State,
    "StateReasonCode",
    ()=>StateReasonCode,
    "SubnetIPAddressLimitReachedException",
    ()=>SubnetIPAddressLimitReachedException,
    "SystemLogLevel",
    ()=>SystemLogLevel,
    "ThrottleReason",
    ()=>ThrottleReason,
    "TooManyRequestsException",
    ()=>TooManyRequestsException,
    "TracingMode",
    ()=>TracingMode,
    "UnsupportedMediaTypeException",
    ()=>UnsupportedMediaTypeException,
    "UpdateFunctionCodeRequestFilterSensitiveLog",
    ()=>UpdateFunctionCodeRequestFilterSensitiveLog,
    "UpdateFunctionConfigurationRequestFilterSensitiveLog",
    ()=>UpdateFunctionConfigurationRequestFilterSensitiveLog,
    "UpdateRuntimeOn",
    ()=>UpdateRuntimeOn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/LambdaServiceException.js [app-route] (ecmascript) <locals>");
;
;
class InvalidParameterValueException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "InvalidParameterValueException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "InvalidParameterValueException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, InvalidParameterValueException.prototype);
        this.Type = opts.Type;
    }
}
class PolicyLengthExceededException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "PolicyLengthExceededException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "PolicyLengthExceededException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, PolicyLengthExceededException.prototype);
        this.Type = opts.Type;
    }
}
class PreconditionFailedException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "PreconditionFailedException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "PreconditionFailedException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, PreconditionFailedException.prototype);
        this.Type = opts.Type;
    }
}
class ResourceConflictException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "ResourceConflictException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "ResourceConflictException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ResourceConflictException.prototype);
        this.Type = opts.Type;
    }
}
class ResourceNotFoundException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "ResourceNotFoundException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class ServiceException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "ServiceException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "ServiceException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, ServiceException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
const ThrottleReason = {
    CallerRateLimitExceeded: "CallerRateLimitExceeded",
    ConcurrentInvocationLimitExceeded: "ConcurrentInvocationLimitExceeded",
    ConcurrentSnapshotCreateLimitExceeded: "ConcurrentSnapshotCreateLimitExceeded",
    FunctionInvocationRateLimitExceeded: "FunctionInvocationRateLimitExceeded",
    ReservedFunctionConcurrentInvocationLimitExceeded: "ReservedFunctionConcurrentInvocationLimitExceeded",
    ReservedFunctionInvocationRateLimitExceeded: "ReservedFunctionInvocationRateLimitExceeded"
};
class TooManyRequestsException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "TooManyRequestsException";
    $fault = "client";
    retryAfterSeconds;
    Type;
    Reason;
    constructor(opts){
        super({
            name: "TooManyRequestsException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, TooManyRequestsException.prototype);
        this.retryAfterSeconds = opts.retryAfterSeconds;
        this.Type = opts.Type;
        this.Reason = opts.Reason;
    }
}
const FunctionUrlAuthType = {
    AWS_IAM: "AWS_IAM",
    NONE: "NONE"
};
const KafkaSchemaRegistryAuthType = {
    BASIC_AUTH: "BASIC_AUTH",
    CLIENT_CERTIFICATE_TLS_AUTH: "CLIENT_CERTIFICATE_TLS_AUTH",
    SERVER_ROOT_CA_CERTIFICATE: "SERVER_ROOT_CA_CERTIFICATE"
};
const SchemaRegistryEventRecordFormat = {
    JSON: "JSON",
    SOURCE: "SOURCE"
};
const KafkaSchemaValidationAttribute = {
    KEY: "KEY",
    VALUE: "VALUE"
};
const ApplicationLogLevel = {
    Debug: "DEBUG",
    Error: "ERROR",
    Fatal: "FATAL",
    Info: "INFO",
    Trace: "TRACE",
    Warn: "WARN"
};
const Architecture = {
    arm64: "arm64",
    x86_64: "x86_64"
};
const CodeSigningPolicy = {
    Enforce: "Enforce",
    Warn: "Warn"
};
const FullDocument = {
    Default: "Default",
    UpdateLookup: "UpdateLookup"
};
const FunctionResponseType = {
    ReportBatchItemFailures: "ReportBatchItemFailures"
};
const EventSourceMappingMetric = {
    EventCount: "EventCount"
};
const EndPointType = {
    KAFKA_BOOTSTRAP_SERVERS: "KAFKA_BOOTSTRAP_SERVERS"
};
const SourceAccessType = {
    BASIC_AUTH: "BASIC_AUTH",
    CLIENT_CERTIFICATE_TLS_AUTH: "CLIENT_CERTIFICATE_TLS_AUTH",
    SASL_SCRAM_256_AUTH: "SASL_SCRAM_256_AUTH",
    SASL_SCRAM_512_AUTH: "SASL_SCRAM_512_AUTH",
    SERVER_ROOT_CA_CERTIFICATE: "SERVER_ROOT_CA_CERTIFICATE",
    VIRTUAL_HOST: "VIRTUAL_HOST",
    VPC_SECURITY_GROUP: "VPC_SECURITY_GROUP",
    VPC_SUBNET: "VPC_SUBNET"
};
const EventSourcePosition = {
    AT_TIMESTAMP: "AT_TIMESTAMP",
    LATEST: "LATEST",
    TRIM_HORIZON: "TRIM_HORIZON"
};
class ResourceInUseException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "ResourceInUseException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "ResourceInUseException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ResourceInUseException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class CodeSigningConfigNotFoundException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "CodeSigningConfigNotFoundException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "CodeSigningConfigNotFoundException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, CodeSigningConfigNotFoundException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class CodeStorageExceededException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "CodeStorageExceededException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "CodeStorageExceededException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, CodeStorageExceededException.prototype);
        this.Type = opts.Type;
    }
}
class CodeVerificationFailedException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "CodeVerificationFailedException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "CodeVerificationFailedException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, CodeVerificationFailedException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
const LogFormat = {
    Json: "JSON",
    Text: "Text"
};
const SystemLogLevel = {
    Debug: "DEBUG",
    Info: "INFO",
    Warn: "WARN"
};
const PackageType = {
    Image: "Image",
    Zip: "Zip"
};
const Runtime = {
    dotnet6: "dotnet6",
    dotnet8: "dotnet8",
    dotnetcore10: "dotnetcore1.0",
    dotnetcore20: "dotnetcore2.0",
    dotnetcore21: "dotnetcore2.1",
    dotnetcore31: "dotnetcore3.1",
    go1x: "go1.x",
    java11: "java11",
    java17: "java17",
    java21: "java21",
    java8: "java8",
    java8al2: "java8.al2",
    nodejs: "nodejs",
    nodejs10x: "nodejs10.x",
    nodejs12x: "nodejs12.x",
    nodejs14x: "nodejs14.x",
    nodejs16x: "nodejs16.x",
    nodejs18x: "nodejs18.x",
    nodejs20x: "nodejs20.x",
    nodejs22x: "nodejs22.x",
    nodejs43: "nodejs4.3",
    nodejs43edge: "nodejs4.3-edge",
    nodejs610: "nodejs6.10",
    nodejs810: "nodejs8.10",
    provided: "provided",
    providedal2: "provided.al2",
    providedal2023: "provided.al2023",
    python27: "python2.7",
    python310: "python3.10",
    python311: "python3.11",
    python312: "python3.12",
    python313: "python3.13",
    python36: "python3.6",
    python37: "python3.7",
    python38: "python3.8",
    python39: "python3.9",
    ruby25: "ruby2.5",
    ruby27: "ruby2.7",
    ruby32: "ruby3.2",
    ruby33: "ruby3.3",
    ruby34: "ruby3.4"
};
const SnapStartApplyOn = {
    None: "None",
    PublishedVersions: "PublishedVersions"
};
const TracingMode = {
    Active: "Active",
    PassThrough: "PassThrough"
};
const LastUpdateStatus = {
    Failed: "Failed",
    InProgress: "InProgress",
    Successful: "Successful"
};
const LastUpdateStatusReasonCode = {
    DisabledKMSKey: "DisabledKMSKey",
    EFSIOError: "EFSIOError",
    EFSMountConnectivityError: "EFSMountConnectivityError",
    EFSMountFailure: "EFSMountFailure",
    EFSMountTimeout: "EFSMountTimeout",
    EniLimitExceeded: "EniLimitExceeded",
    FunctionError: "FunctionError",
    ImageAccessDenied: "ImageAccessDenied",
    ImageDeleted: "ImageDeleted",
    InsufficientRolePermissions: "InsufficientRolePermissions",
    InternalError: "InternalError",
    InvalidConfiguration: "InvalidConfiguration",
    InvalidImage: "InvalidImage",
    InvalidRuntime: "InvalidRuntime",
    InvalidSecurityGroup: "InvalidSecurityGroup",
    InvalidStateKMSKey: "InvalidStateKMSKey",
    InvalidSubnet: "InvalidSubnet",
    InvalidZipFileException: "InvalidZipFileException",
    KMSKeyAccessDenied: "KMSKeyAccessDenied",
    KMSKeyNotFound: "KMSKeyNotFound",
    SubnetOutOfIPAddresses: "SubnetOutOfIPAddresses"
};
const SnapStartOptimizationStatus = {
    Off: "Off",
    On: "On"
};
const State = {
    Active: "Active",
    Failed: "Failed",
    Inactive: "Inactive",
    Pending: "Pending"
};
const StateReasonCode = {
    Creating: "Creating",
    DisabledKMSKey: "DisabledKMSKey",
    EFSIOError: "EFSIOError",
    EFSMountConnectivityError: "EFSMountConnectivityError",
    EFSMountFailure: "EFSMountFailure",
    EFSMountTimeout: "EFSMountTimeout",
    EniLimitExceeded: "EniLimitExceeded",
    FunctionError: "FunctionError",
    Idle: "Idle",
    ImageAccessDenied: "ImageAccessDenied",
    ImageDeleted: "ImageDeleted",
    InsufficientRolePermissions: "InsufficientRolePermissions",
    InternalError: "InternalError",
    InvalidConfiguration: "InvalidConfiguration",
    InvalidImage: "InvalidImage",
    InvalidRuntime: "InvalidRuntime",
    InvalidSecurityGroup: "InvalidSecurityGroup",
    InvalidStateKMSKey: "InvalidStateKMSKey",
    InvalidSubnet: "InvalidSubnet",
    InvalidZipFileException: "InvalidZipFileException",
    KMSKeyAccessDenied: "KMSKeyAccessDenied",
    KMSKeyNotFound: "KMSKeyNotFound",
    Restoring: "Restoring",
    SubnetOutOfIPAddresses: "SubnetOutOfIPAddresses"
};
class InvalidCodeSignatureException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "InvalidCodeSignatureException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "InvalidCodeSignatureException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, InvalidCodeSignatureException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
const InvokeMode = {
    BUFFERED: "BUFFERED",
    RESPONSE_STREAM: "RESPONSE_STREAM"
};
const RecursiveLoop = {
    Allow: "Allow",
    Terminate: "Terminate"
};
const UpdateRuntimeOn = {
    Auto: "Auto",
    FunctionUpdate: "FunctionUpdate",
    Manual: "Manual"
};
class EC2AccessDeniedException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "EC2AccessDeniedException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "EC2AccessDeniedException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, EC2AccessDeniedException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class EC2ThrottledException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "EC2ThrottledException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "EC2ThrottledException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, EC2ThrottledException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class EC2UnexpectedException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "EC2UnexpectedException";
    $fault = "server";
    Type;
    Message;
    EC2ErrorCode;
    constructor(opts){
        super({
            name: "EC2UnexpectedException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, EC2UnexpectedException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
        this.EC2ErrorCode = opts.EC2ErrorCode;
    }
}
class EFSIOException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "EFSIOException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "EFSIOException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, EFSIOException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class EFSMountConnectivityException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "EFSMountConnectivityException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "EFSMountConnectivityException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, EFSMountConnectivityException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class EFSMountFailureException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "EFSMountFailureException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "EFSMountFailureException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, EFSMountFailureException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class EFSMountTimeoutException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "EFSMountTimeoutException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "EFSMountTimeoutException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, EFSMountTimeoutException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class ENILimitReachedException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "ENILimitReachedException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "ENILimitReachedException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, ENILimitReachedException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class InvalidRequestContentException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "InvalidRequestContentException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "InvalidRequestContentException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, InvalidRequestContentException.prototype);
        this.Type = opts.Type;
    }
}
class InvalidRuntimeException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "InvalidRuntimeException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "InvalidRuntimeException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, InvalidRuntimeException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class InvalidSecurityGroupIDException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "InvalidSecurityGroupIDException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "InvalidSecurityGroupIDException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, InvalidSecurityGroupIDException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class InvalidSubnetIDException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "InvalidSubnetIDException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "InvalidSubnetIDException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, InvalidSubnetIDException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class InvalidZipFileException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "InvalidZipFileException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "InvalidZipFileException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, InvalidZipFileException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
const InvocationType = {
    DryRun: "DryRun",
    Event: "Event",
    RequestResponse: "RequestResponse"
};
const LogType = {
    None: "None",
    Tail: "Tail"
};
class KMSAccessDeniedException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "KMSAccessDeniedException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "KMSAccessDeniedException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, KMSAccessDeniedException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class KMSDisabledException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "KMSDisabledException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "KMSDisabledException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, KMSDisabledException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class KMSInvalidStateException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "KMSInvalidStateException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "KMSInvalidStateException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, KMSInvalidStateException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class KMSNotFoundException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "KMSNotFoundException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "KMSNotFoundException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, KMSNotFoundException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class RecursiveInvocationException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "RecursiveInvocationException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "RecursiveInvocationException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, RecursiveInvocationException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class RequestTooLargeException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "RequestTooLargeException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "RequestTooLargeException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, RequestTooLargeException.prototype);
        this.Type = opts.Type;
    }
}
class ResourceNotReadyException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "ResourceNotReadyException";
    $fault = "server";
    Type;
    constructor(opts){
        super({
            name: "ResourceNotReadyException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, ResourceNotReadyException.prototype);
        this.Type = opts.Type;
    }
}
class SnapStartException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "SnapStartException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "SnapStartException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, SnapStartException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class SnapStartNotReadyException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "SnapStartNotReadyException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "SnapStartNotReadyException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, SnapStartNotReadyException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class SnapStartTimeoutException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "SnapStartTimeoutException";
    $fault = "client";
    Type;
    Message;
    constructor(opts){
        super({
            name: "SnapStartTimeoutException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, SnapStartTimeoutException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class SubnetIPAddressLimitReachedException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "SubnetIPAddressLimitReachedException";
    $fault = "server";
    Type;
    Message;
    constructor(opts){
        super({
            name: "SubnetIPAddressLimitReachedException",
            $fault: "server",
            ...opts
        });
        Object.setPrototypeOf(this, SubnetIPAddressLimitReachedException.prototype);
        this.Type = opts.Type;
        this.Message = opts.Message;
    }
}
class UnsupportedMediaTypeException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "UnsupportedMediaTypeException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "UnsupportedMediaTypeException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, UnsupportedMediaTypeException.prototype);
        this.Type = opts.Type;
    }
}
const ResponseStreamingInvocationType = {
    DryRun: "DryRun",
    RequestResponse: "RequestResponse"
};
var InvokeWithResponseStreamResponseEvent;
(function(InvokeWithResponseStreamResponseEvent) {
    InvokeWithResponseStreamResponseEvent.visit = (value, visitor)=>{
        if (value.PayloadChunk !== undefined) return visitor.PayloadChunk(value.PayloadChunk);
        if (value.InvokeComplete !== undefined) return visitor.InvokeComplete(value.InvokeComplete);
        return visitor._(value.$unknown[0], value.$unknown[1]);
    };
})(InvokeWithResponseStreamResponseEvent || (InvokeWithResponseStreamResponseEvent = {}));
const FunctionVersion = {
    ALL: "ALL"
};
const ProvisionedConcurrencyStatusEnum = {
    FAILED: "FAILED",
    IN_PROGRESS: "IN_PROGRESS",
    READY: "READY"
};
class ProvisionedConcurrencyConfigNotFoundException extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"] {
    name = "ProvisionedConcurrencyConfigNotFoundException";
    $fault = "client";
    Type;
    constructor(opts){
        super({
            name: "ProvisionedConcurrencyConfigNotFoundException",
            $fault: "client",
            ...opts
        });
        Object.setPrototypeOf(this, ProvisionedConcurrencyConfigNotFoundException.prototype);
        this.Type = opts.Type;
    }
}
const FunctionCodeFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.ZipFile && {
            ZipFile: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const EnvironmentFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Variables && {
            Variables: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const CreateFunctionRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Code && {
            Code: FunctionCodeFilterSensitiveLog(obj.Code)
        },
        ...obj.Environment && {
            Environment: EnvironmentFilterSensitiveLog(obj.Environment)
        }
    });
const EnvironmentErrorFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Message && {
            Message: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const EnvironmentResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Variables && {
            Variables: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        },
        ...obj.Error && {
            Error: EnvironmentErrorFilterSensitiveLog(obj.Error)
        }
    });
const ImageConfigErrorFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Message && {
            Message: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const ImageConfigResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Error && {
            Error: ImageConfigErrorFilterSensitiveLog(obj.Error)
        }
    });
const RuntimeVersionErrorFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Message && {
            Message: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const RuntimeVersionConfigFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Error && {
            Error: RuntimeVersionErrorFilterSensitiveLog(obj.Error)
        }
    });
const FunctionConfigurationFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Environment && {
            Environment: EnvironmentResponseFilterSensitiveLog(obj.Environment)
        },
        ...obj.ImageConfigResponse && {
            ImageConfigResponse: ImageConfigResponseFilterSensitiveLog(obj.ImageConfigResponse)
        },
        ...obj.RuntimeVersionConfig && {
            RuntimeVersionConfig: RuntimeVersionConfigFilterSensitiveLog(obj.RuntimeVersionConfig)
        }
    });
const GetFunctionResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Configuration && {
            Configuration: FunctionConfigurationFilterSensitiveLog(obj.Configuration)
        }
    });
const InvocationRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Payload && {
            Payload: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const InvocationResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Payload && {
            Payload: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const InvokeAsyncRequestFilterSensitiveLog = (obj)=>({
        ...obj
    });
const InvokeWithResponseStreamRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Payload && {
            Payload: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const InvokeResponseStreamUpdateFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Payload && {
            Payload: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const InvokeWithResponseStreamResponseEventFilterSensitiveLog = (obj)=>{
    if (obj.PayloadChunk !== undefined) return {
        PayloadChunk: InvokeResponseStreamUpdateFilterSensitiveLog(obj.PayloadChunk)
    };
    if (obj.InvokeComplete !== undefined) return {
        InvokeComplete: obj.InvokeComplete
    };
    if (obj.$unknown !== undefined) return {
        [obj.$unknown[0]]: "UNKNOWN"
    };
};
const InvokeWithResponseStreamResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.EventStream && {
            EventStream: "STREAMING_CONTENT"
        }
    });
const ListFunctionsResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Functions && {
            Functions: obj.Functions.map((item)=>FunctionConfigurationFilterSensitiveLog(item))
        }
    });
const UpdateFunctionCodeRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.ZipFile && {
            ZipFile: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const UpdateFunctionConfigurationRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Environment && {
            Environment: EnvironmentFilterSensitiveLog(obj.Environment)
        }
    });
const ListVersionsByFunctionResponseFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Versions && {
            Versions: obj.Versions.map((item)=>FunctionConfigurationFilterSensitiveLog(item))
        }
    });
const LayerVersionContentInputFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.ZipFile && {
            ZipFile: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SENSITIVE_STRING"]
        }
    });
const PublishLayerVersionRequestFilterSensitiveLog = (obj)=>({
        ...obj,
        ...obj.Content && {
            Content: LayerVersionContentInputFilterSensitiveLog(obj.Content)
        }
    });
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApplicationLogLevel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplicationLogLevel"],
    "Architecture",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Architecture"],
    "CodeSigningConfigNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeSigningConfigNotFoundException"],
    "CodeSigningPolicy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeSigningPolicy"],
    "CodeStorageExceededException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeStorageExceededException"],
    "CodeVerificationFailedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeVerificationFailedException"],
    "CreateFunctionRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateFunctionRequestFilterSensitiveLog"],
    "EC2AccessDeniedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EC2AccessDeniedException"],
    "EC2ThrottledException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EC2ThrottledException"],
    "EC2UnexpectedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EC2UnexpectedException"],
    "EFSIOException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EFSIOException"],
    "EFSMountConnectivityException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EFSMountConnectivityException"],
    "EFSMountFailureException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EFSMountFailureException"],
    "EFSMountTimeoutException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EFSMountTimeoutException"],
    "ENILimitReachedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENILimitReachedException"],
    "EndPointType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndPointType"],
    "EnvironmentErrorFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EnvironmentErrorFilterSensitiveLog"],
    "EnvironmentFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EnvironmentFilterSensitiveLog"],
    "EnvironmentResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EnvironmentResponseFilterSensitiveLog"],
    "EventSourceMappingMetric",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventSourceMappingMetric"],
    "EventSourcePosition",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventSourcePosition"],
    "FullDocument",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FullDocument"],
    "FunctionCodeFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionCodeFilterSensitiveLog"],
    "FunctionConfigurationFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionConfigurationFilterSensitiveLog"],
    "FunctionResponseType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionResponseType"],
    "FunctionUrlAuthType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionUrlAuthType"],
    "FunctionVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionVersion"],
    "GetFunctionResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionResponseFilterSensitiveLog"],
    "ImageConfigErrorFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageConfigErrorFilterSensitiveLog"],
    "ImageConfigResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageConfigResponseFilterSensitiveLog"],
    "InvalidCodeSignatureException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidCodeSignatureException"],
    "InvalidParameterValueException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidParameterValueException"],
    "InvalidRequestContentException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidRequestContentException"],
    "InvalidRuntimeException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidRuntimeException"],
    "InvalidSecurityGroupIDException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidSecurityGroupIDException"],
    "InvalidSubnetIDException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidSubnetIDException"],
    "InvalidZipFileException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidZipFileException"],
    "InvocationRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvocationRequestFilterSensitiveLog"],
    "InvocationResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvocationResponseFilterSensitiveLog"],
    "InvocationType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvocationType"],
    "InvokeAsyncRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeAsyncRequestFilterSensitiveLog"],
    "InvokeMode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeMode"],
    "InvokeResponseStreamUpdateFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeResponseStreamUpdateFilterSensitiveLog"],
    "InvokeWithResponseStreamRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamRequestFilterSensitiveLog"],
    "InvokeWithResponseStreamResponseEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamResponseEvent"],
    "InvokeWithResponseStreamResponseEventFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamResponseEventFilterSensitiveLog"],
    "InvokeWithResponseStreamResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamResponseFilterSensitiveLog"],
    "KMSAccessDeniedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KMSAccessDeniedException"],
    "KMSDisabledException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KMSDisabledException"],
    "KMSInvalidStateException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KMSInvalidStateException"],
    "KMSNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KMSNotFoundException"],
    "KafkaSchemaRegistryAuthType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KafkaSchemaRegistryAuthType"],
    "KafkaSchemaValidationAttribute",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KafkaSchemaValidationAttribute"],
    "LastUpdateStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LastUpdateStatus"],
    "LastUpdateStatusReasonCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LastUpdateStatusReasonCode"],
    "LayerVersionContentInputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LayerVersionContentInputFilterSensitiveLog"],
    "ListFunctionsResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListFunctionsResponseFilterSensitiveLog"],
    "ListVersionsByFunctionResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListVersionsByFunctionResponseFilterSensitiveLog"],
    "LogFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LogFormat"],
    "LogType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LogType"],
    "PackageType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PackageType"],
    "PolicyLengthExceededException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PolicyLengthExceededException"],
    "PreconditionFailedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PreconditionFailedException"],
    "ProvisionedConcurrencyConfigNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProvisionedConcurrencyConfigNotFoundException"],
    "ProvisionedConcurrencyStatusEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProvisionedConcurrencyStatusEnum"],
    "PublishLayerVersionRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublishLayerVersionRequestFilterSensitiveLog"],
    "RecursiveInvocationException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecursiveInvocationException"],
    "RecursiveLoop",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecursiveLoop"],
    "RequestTooLargeException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestTooLargeException"],
    "ResourceConflictException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceConflictException"],
    "ResourceInUseException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceInUseException"],
    "ResourceNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotFoundException"],
    "ResourceNotReadyException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotReadyException"],
    "ResponseStreamingInvocationType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResponseStreamingInvocationType"],
    "Runtime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Runtime"],
    "RuntimeVersionConfigFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RuntimeVersionConfigFilterSensitiveLog"],
    "RuntimeVersionErrorFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RuntimeVersionErrorFilterSensitiveLog"],
    "SchemaRegistryEventRecordFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SchemaRegistryEventRecordFormat"],
    "ServiceException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceException"],
    "SnapStartApplyOn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartApplyOn"],
    "SnapStartException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartException"],
    "SnapStartNotReadyException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartNotReadyException"],
    "SnapStartOptimizationStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartOptimizationStatus"],
    "SnapStartTimeoutException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartTimeoutException"],
    "SourceAccessType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SourceAccessType"],
    "State",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"],
    "StateReasonCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StateReasonCode"],
    "SubnetIPAddressLimitReachedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SubnetIPAddressLimitReachedException"],
    "SystemLogLevel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemLogLevel"],
    "ThrottleReason",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ThrottleReason"],
    "TooManyRequestsException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TooManyRequestsException"],
    "TracingMode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TracingMode"],
    "UnsupportedMediaTypeException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedMediaTypeException"],
    "UpdateFunctionCodeRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateFunctionCodeRequestFilterSensitiveLog"],
    "UpdateFunctionConfigurationRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateFunctionConfigurationRequestFilterSensitiveLog"],
    "UpdateRuntimeOn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateRuntimeOn"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$models_0$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/models_0.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/Lambda.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lambda",
    ()=>Lambda
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$create$2d$aggregated$2d$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/smithy-client/dist-es/create-aggregated-client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$AddLayerVersionPermissionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/AddLayerVersionPermissionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$AddPermissionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/AddPermissionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateAliasCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/CreateAliasCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/CreateCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateEventSourceMappingCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/CreateEventSourceMappingCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/CreateFunctionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateFunctionUrlConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/CreateFunctionUrlConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteAliasCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteAliasCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteEventSourceMappingCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteEventSourceMappingCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteFunctionCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteFunctionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionConcurrencyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteFunctionConcurrencyCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionEventInvokeConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteFunctionEventInvokeConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionUrlConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteFunctionUrlConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteLayerVersionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteLayerVersionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteProvisionedConcurrencyConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/DeleteProvisionedConcurrencyConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetAccountSettingsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetAccountSettingsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetAliasCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetAliasCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetEventSourceMappingCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetEventSourceMappingCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConcurrencyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionConcurrencyCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionConfigurationCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionEventInvokeConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionEventInvokeConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionRecursionConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionRecursionConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionUrlConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionUrlConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetLayerVersionByArnCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetLayerVersionByArnCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetLayerVersionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetLayerVersionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetLayerVersionPolicyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetLayerVersionPolicyCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetPolicyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetPolicyCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetProvisionedConcurrencyConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetProvisionedConcurrencyConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetRuntimeManagementConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetRuntimeManagementConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$InvokeAsyncCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/InvokeAsyncCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$InvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/InvokeCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$InvokeWithResponseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/InvokeWithResponseStreamCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListAliasesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListAliasesCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListCodeSigningConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListCodeSigningConfigsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListEventSourceMappingsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListEventSourceMappingsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionEventInvokeConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListFunctionEventInvokeConfigsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionsByCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListFunctionsByCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListFunctionsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionUrlConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListFunctionUrlConfigsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListLayersCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListLayersCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListLayerVersionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListLayerVersionsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListProvisionedConcurrencyConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListProvisionedConcurrencyConfigsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListTagsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListTagsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListVersionsByFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListVersionsByFunctionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PublishLayerVersionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/PublishLayerVersionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PublishVersionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/PublishVersionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutFunctionCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/PutFunctionCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutFunctionConcurrencyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/PutFunctionConcurrencyCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutFunctionEventInvokeConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/PutFunctionEventInvokeConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutFunctionRecursionConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/PutFunctionRecursionConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutProvisionedConcurrencyConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/PutProvisionedConcurrencyConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutRuntimeManagementConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/PutRuntimeManagementConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$RemoveLayerVersionPermissionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/RemoveLayerVersionPermissionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$RemovePermissionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/RemovePermissionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$TagResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/TagResourceCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UntagResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/UntagResourceCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateAliasCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/UpdateAliasCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/UpdateCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateEventSourceMappingCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/UpdateEventSourceMappingCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateFunctionCodeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/UpdateFunctionCodeCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/UpdateFunctionConfigurationCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateFunctionEventInvokeConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/UpdateFunctionEventInvokeConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateFunctionUrlConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/UpdateFunctionUrlConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
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
const commands = {
    AddLayerVersionPermissionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$AddLayerVersionPermissionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AddLayerVersionPermissionCommand"],
    AddPermissionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$AddPermissionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AddPermissionCommand"],
    CreateAliasCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateAliasCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreateAliasCommand"],
    CreateCodeSigningConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreateCodeSigningConfigCommand"],
    CreateEventSourceMappingCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateEventSourceMappingCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreateEventSourceMappingCommand"],
    CreateFunctionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreateFunctionCommand"],
    CreateFunctionUrlConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$CreateFunctionUrlConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CreateFunctionUrlConfigCommand"],
    DeleteAliasCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteAliasCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteAliasCommand"],
    DeleteCodeSigningConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteCodeSigningConfigCommand"],
    DeleteEventSourceMappingCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteEventSourceMappingCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteEventSourceMappingCommand"],
    DeleteFunctionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteFunctionCommand"],
    DeleteFunctionCodeSigningConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteFunctionCodeSigningConfigCommand"],
    DeleteFunctionConcurrencyCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionConcurrencyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteFunctionConcurrencyCommand"],
    DeleteFunctionEventInvokeConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionEventInvokeConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteFunctionEventInvokeConfigCommand"],
    DeleteFunctionUrlConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteFunctionUrlConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteFunctionUrlConfigCommand"],
    DeleteLayerVersionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteLayerVersionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteLayerVersionCommand"],
    DeleteProvisionedConcurrencyConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$DeleteProvisionedConcurrencyConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DeleteProvisionedConcurrencyConfigCommand"],
    GetAccountSettingsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetAccountSettingsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetAccountSettingsCommand"],
    GetAliasCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetAliasCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetAliasCommand"],
    GetCodeSigningConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetCodeSigningConfigCommand"],
    GetEventSourceMappingCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetEventSourceMappingCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetEventSourceMappingCommand"],
    GetFunctionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionCommand"],
    GetFunctionCodeSigningConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionCodeSigningConfigCommand"],
    GetFunctionConcurrencyCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConcurrencyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionConcurrencyCommand"],
    GetFunctionConfigurationCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionConfigurationCommand"],
    GetFunctionEventInvokeConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionEventInvokeConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionEventInvokeConfigCommand"],
    GetFunctionRecursionConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionRecursionConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionRecursionConfigCommand"],
    GetFunctionUrlConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionUrlConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionUrlConfigCommand"],
    GetLayerVersionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetLayerVersionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetLayerVersionCommand"],
    GetLayerVersionByArnCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetLayerVersionByArnCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetLayerVersionByArnCommand"],
    GetLayerVersionPolicyCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetLayerVersionPolicyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetLayerVersionPolicyCommand"],
    GetPolicyCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetPolicyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetPolicyCommand"],
    GetProvisionedConcurrencyConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetProvisionedConcurrencyConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetProvisionedConcurrencyConfigCommand"],
    GetRuntimeManagementConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetRuntimeManagementConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetRuntimeManagementConfigCommand"],
    InvokeCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$InvokeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeCommand"],
    InvokeAsyncCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$InvokeAsyncCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeAsyncCommand"],
    InvokeWithResponseStreamCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$InvokeWithResponseStreamCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["InvokeWithResponseStreamCommand"],
    ListAliasesCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListAliasesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListAliasesCommand"],
    ListCodeSigningConfigsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListCodeSigningConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListCodeSigningConfigsCommand"],
    ListEventSourceMappingsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListEventSourceMappingsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListEventSourceMappingsCommand"],
    ListFunctionEventInvokeConfigsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionEventInvokeConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFunctionEventInvokeConfigsCommand"],
    ListFunctionsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFunctionsCommand"],
    ListFunctionsByCodeSigningConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionsByCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFunctionsByCodeSigningConfigCommand"],
    ListFunctionUrlConfigsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionUrlConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFunctionUrlConfigsCommand"],
    ListLayersCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListLayersCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListLayersCommand"],
    ListLayerVersionsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListLayerVersionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListLayerVersionsCommand"],
    ListProvisionedConcurrencyConfigsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListProvisionedConcurrencyConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListProvisionedConcurrencyConfigsCommand"],
    ListTagsCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListTagsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListTagsCommand"],
    ListVersionsByFunctionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListVersionsByFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListVersionsByFunctionCommand"],
    PublishLayerVersionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PublishLayerVersionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PublishLayerVersionCommand"],
    PublishVersionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PublishVersionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PublishVersionCommand"],
    PutFunctionCodeSigningConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutFunctionCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PutFunctionCodeSigningConfigCommand"],
    PutFunctionConcurrencyCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutFunctionConcurrencyCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PutFunctionConcurrencyCommand"],
    PutFunctionEventInvokeConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutFunctionEventInvokeConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PutFunctionEventInvokeConfigCommand"],
    PutFunctionRecursionConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutFunctionRecursionConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PutFunctionRecursionConfigCommand"],
    PutProvisionedConcurrencyConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutProvisionedConcurrencyConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PutProvisionedConcurrencyConfigCommand"],
    PutRuntimeManagementConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$PutRuntimeManagementConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PutRuntimeManagementConfigCommand"],
    RemoveLayerVersionPermissionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$RemoveLayerVersionPermissionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RemoveLayerVersionPermissionCommand"],
    RemovePermissionCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$RemovePermissionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["RemovePermissionCommand"],
    TagResourceCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$TagResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["TagResourceCommand"],
    UntagResourceCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UntagResourceCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UntagResourceCommand"],
    UpdateAliasCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateAliasCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UpdateAliasCommand"],
    UpdateCodeSigningConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UpdateCodeSigningConfigCommand"],
    UpdateEventSourceMappingCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateEventSourceMappingCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UpdateEventSourceMappingCommand"],
    UpdateFunctionCodeCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateFunctionCodeCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UpdateFunctionCodeCommand"],
    UpdateFunctionConfigurationCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UpdateFunctionConfigurationCommand"],
    UpdateFunctionEventInvokeConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateFunctionEventInvokeConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UpdateFunctionEventInvokeConfigCommand"],
    UpdateFunctionUrlConfigCommand: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$UpdateFunctionUrlConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["UpdateFunctionUrlConfigCommand"]
};
class Lambda extends __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"] {
}
(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$smithy$2d$client$2f$dist$2d$es$2f$create$2d$aggregated$2d$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAggregatedClient"])(commands, Lambda);
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
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
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/Interfaces.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListAliasesPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListAliases",
    ()=>paginateListAliases
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListAliasesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListAliasesCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListAliases = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListAliasesCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListAliasesCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListCodeSigningConfigsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListCodeSigningConfigs",
    ()=>paginateListCodeSigningConfigs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListCodeSigningConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListCodeSigningConfigsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListCodeSigningConfigs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListCodeSigningConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListCodeSigningConfigsCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListEventSourceMappingsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListEventSourceMappings",
    ()=>paginateListEventSourceMappings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListEventSourceMappingsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListEventSourceMappingsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListEventSourceMappings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListEventSourceMappingsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListEventSourceMappingsCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListFunctionEventInvokeConfigsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListFunctionEventInvokeConfigs",
    ()=>paginateListFunctionEventInvokeConfigs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionEventInvokeConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListFunctionEventInvokeConfigsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListFunctionEventInvokeConfigs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionEventInvokeConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFunctionEventInvokeConfigsCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListFunctionUrlConfigsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListFunctionUrlConfigs",
    ()=>paginateListFunctionUrlConfigs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionUrlConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListFunctionUrlConfigsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListFunctionUrlConfigs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionUrlConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFunctionUrlConfigsCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListFunctionsByCodeSigningConfigPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListFunctionsByCodeSigningConfig",
    ()=>paginateListFunctionsByCodeSigningConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionsByCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListFunctionsByCodeSigningConfigCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListFunctionsByCodeSigningConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionsByCodeSigningConfigCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFunctionsByCodeSigningConfigCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListFunctionsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListFunctions",
    ()=>paginateListFunctions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListFunctionsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListFunctions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListFunctionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListFunctionsCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListLayerVersionsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListLayerVersions",
    ()=>paginateListLayerVersions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListLayerVersionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListLayerVersionsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListLayerVersions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListLayerVersionsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListLayerVersionsCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListLayersPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListLayers",
    ()=>paginateListLayers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListLayersCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListLayersCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListLayers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListLayersCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListLayersCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListProvisionedConcurrencyConfigsPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListProvisionedConcurrencyConfigs",
    ()=>paginateListProvisionedConcurrencyConfigs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListProvisionedConcurrencyConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListProvisionedConcurrencyConfigsCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListProvisionedConcurrencyConfigs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListProvisionedConcurrencyConfigsCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListProvisionedConcurrencyConfigsCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListVersionsByFunctionPaginator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListVersionsByFunction",
    ()=>paginateListVersionsByFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/pagination/createPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListVersionsByFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/ListVersionsByFunctionCommand.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript) <locals>");
;
;
;
const paginateListVersionsByFunction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$pagination$2f$createPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createPaginator"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaClient"], __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$ListVersionsByFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ListVersionsByFunctionCommand"], "Marker", "NextMarker", "MaxItems");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "paginateListAliases",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListAliasesPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListAliases"],
    "paginateListCodeSigningConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListCodeSigningConfigsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListCodeSigningConfigs"],
    "paginateListEventSourceMappings",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListEventSourceMappingsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListEventSourceMappings"],
    "paginateListFunctionEventInvokeConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListFunctionEventInvokeConfigsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFunctionEventInvokeConfigs"],
    "paginateListFunctionUrlConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListFunctionUrlConfigsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFunctionUrlConfigs"],
    "paginateListFunctions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListFunctionsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFunctions"],
    "paginateListFunctionsByCodeSigningConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListFunctionsByCodeSigningConfigPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFunctionsByCodeSigningConfig"],
    "paginateListLayerVersions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListLayerVersionsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListLayerVersions"],
    "paginateListLayers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListLayersPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListLayers"],
    "paginateListProvisionedConcurrencyConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListProvisionedConcurrencyConfigsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListProvisionedConcurrencyConfigs"],
    "paginateListVersionsByFunction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListVersionsByFunctionPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListVersionsByFunction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$Interfaces$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/Interfaces.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListAliasesPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListAliasesPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListCodeSigningConfigsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListCodeSigningConfigsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListEventSourceMappingsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListEventSourceMappingsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListFunctionEventInvokeConfigsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListFunctionEventInvokeConfigsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListFunctionUrlConfigsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListFunctionUrlConfigsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListFunctionsByCodeSigningConfigPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListFunctionsByCodeSigningConfigPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListFunctionsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListFunctionsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListLayerVersionsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListLayerVersionsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListLayersPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListLayersPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListProvisionedConcurrencyConfigsPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListProvisionedConcurrencyConfigsPaginator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$ListVersionsByFunctionPaginator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/ListVersionsByFunctionPaginator.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
;
;
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionActive.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "waitForFunctionActive",
    ()=>waitForFunctionActive,
    "waitUntilFunctionActive",
    ()=>waitUntilFunctionActive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/waiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/createWaiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionConfigurationCommand.js [app-route] (ecmascript) <locals>");
;
;
const checkState = async (client, input)=>{
    let reason;
    try {
        const result = await client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionConfigurationCommand"](input));
        reason = result;
        try {
            const returnComparator = ()=>{
                return result.State;
            };
            if (returnComparator() === "Active") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].SUCCESS,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.State;
            };
            if (returnComparator() === "Failed") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].FAILURE,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.State;
            };
            if (returnComparator() === "Pending") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
                    reason
                };
            }
        } catch (e) {}
    } catch (exception) {
        reason = exception;
    }
    return {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
        reason
    };
};
const waitForFunctionActive = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 5,
        maxDelay: 300
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
};
const waitUntilFunctionActive = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 5,
        maxDelay: 300
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExceptions"])(result);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionActiveV2.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "waitForFunctionActiveV2",
    ()=>waitForFunctionActiveV2,
    "waitUntilFunctionActiveV2",
    ()=>waitUntilFunctionActiveV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/waiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/createWaiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionCommand.js [app-route] (ecmascript) <locals>");
;
;
const checkState = async (client, input)=>{
    let reason;
    try {
        const result = await client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionCommand"](input));
        reason = result;
        try {
            const returnComparator = ()=>{
                return result.Configuration.State;
            };
            if (returnComparator() === "Active") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].SUCCESS,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.Configuration.State;
            };
            if (returnComparator() === "Failed") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].FAILURE,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.Configuration.State;
            };
            if (returnComparator() === "Pending") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
                    reason
                };
            }
        } catch (e) {}
    } catch (exception) {
        reason = exception;
    }
    return {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
        reason
    };
};
const waitForFunctionActiveV2 = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 1,
        maxDelay: 300
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
};
const waitUntilFunctionActiveV2 = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 1,
        maxDelay: 300
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExceptions"])(result);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionExists.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "waitForFunctionExists",
    ()=>waitForFunctionExists,
    "waitUntilFunctionExists",
    ()=>waitUntilFunctionExists
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/waiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/createWaiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionCommand.js [app-route] (ecmascript) <locals>");
;
;
const checkState = async (client, input)=>{
    let reason;
    try {
        const result = await client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionCommand"](input));
        reason = result;
        return {
            state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].SUCCESS,
            reason
        };
    } catch (exception) {
        reason = exception;
        if (exception.name && exception.name == "ResourceNotFoundException") {
            return {
                state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
                reason
            };
        }
    }
    return {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
        reason
    };
};
const waitForFunctionExists = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 1,
        maxDelay: 20
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
};
const waitUntilFunctionExists = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 1,
        maxDelay: 20
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExceptions"])(result);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionUpdated.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "waitForFunctionUpdated",
    ()=>waitForFunctionUpdated,
    "waitUntilFunctionUpdated",
    ()=>waitUntilFunctionUpdated
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/waiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/createWaiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionConfigurationCommand.js [app-route] (ecmascript) <locals>");
;
;
const checkState = async (client, input)=>{
    let reason;
    try {
        const result = await client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionConfigurationCommand"](input));
        reason = result;
        try {
            const returnComparator = ()=>{
                return result.LastUpdateStatus;
            };
            if (returnComparator() === "Successful") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].SUCCESS,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.LastUpdateStatus;
            };
            if (returnComparator() === "Failed") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].FAILURE,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.LastUpdateStatus;
            };
            if (returnComparator() === "InProgress") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
                    reason
                };
            }
        } catch (e) {}
    } catch (exception) {
        reason = exception;
    }
    return {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
        reason
    };
};
const waitForFunctionUpdated = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 5,
        maxDelay: 300
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
};
const waitUntilFunctionUpdated = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 5,
        maxDelay: 300
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExceptions"])(result);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionUpdatedV2.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "waitForFunctionUpdatedV2",
    ()=>waitForFunctionUpdatedV2,
    "waitUntilFunctionUpdatedV2",
    ()=>waitUntilFunctionUpdatedV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/waiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/createWaiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionCommand.js [app-route] (ecmascript) <locals>");
;
;
const checkState = async (client, input)=>{
    let reason;
    try {
        const result = await client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionCommand"](input));
        reason = result;
        try {
            const returnComparator = ()=>{
                return result.Configuration.LastUpdateStatus;
            };
            if (returnComparator() === "Successful") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].SUCCESS,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.Configuration.LastUpdateStatus;
            };
            if (returnComparator() === "Failed") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].FAILURE,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.Configuration.LastUpdateStatus;
            };
            if (returnComparator() === "InProgress") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
                    reason
                };
            }
        } catch (e) {}
    } catch (exception) {
        reason = exception;
    }
    return {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
        reason
    };
};
const waitForFunctionUpdatedV2 = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 1,
        maxDelay: 300
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
};
const waitUntilFunctionUpdatedV2 = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 1,
        maxDelay: 300
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExceptions"])(result);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForPublishedVersionActive.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "waitForPublishedVersionActive",
    ()=>waitForPublishedVersionActive,
    "waitUntilPublishedVersionActive",
    ()=>waitUntilPublishedVersionActive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/waiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-waiter/dist-es/createWaiter.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/GetFunctionConfigurationCommand.js [app-route] (ecmascript) <locals>");
;
;
const checkState = async (client, input)=>{
    let reason;
    try {
        const result = await client.send(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$GetFunctionConfigurationCommand$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["GetFunctionConfigurationCommand"](input));
        reason = result;
        try {
            const returnComparator = ()=>{
                return result.State;
            };
            if (returnComparator() === "Active") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].SUCCESS,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.State;
            };
            if (returnComparator() === "Failed") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].FAILURE,
                    reason
                };
            }
        } catch (e) {}
        try {
            const returnComparator = ()=>{
                return result.State;
            };
            if (returnComparator() === "Pending") {
                return {
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
                    reason
                };
            }
        } catch (e) {}
    } catch (exception) {
        reason = exception;
    }
    return {
        state: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["WaiterState"].RETRY,
        reason
    };
};
const waitForPublishedVersionActive = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 5,
        maxDelay: 1560
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
};
const waitUntilPublishedVersionActive = async (params, input)=>{
    const serviceDefaults = {
        minDelay: 5,
        maxDelay: 1560
    };
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$createWaiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createWaiter"])({
        ...serviceDefaults,
        ...params
    }, input, checkState);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$waiter$2f$dist$2d$es$2f$waiter$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExceptions"])(result);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "waitForFunctionActive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionActive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionActive"],
    "waitForFunctionActiveV2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionActiveV2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionActiveV2"],
    "waitForFunctionExists",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionExists$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionExists"],
    "waitForFunctionUpdated",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionUpdated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionUpdated"],
    "waitForFunctionUpdatedV2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionUpdatedV2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionUpdatedV2"],
    "waitForPublishedVersionActive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForPublishedVersionActive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForPublishedVersionActive"],
    "waitUntilFunctionActive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionActive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionActive"],
    "waitUntilFunctionActiveV2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionActiveV2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionActiveV2"],
    "waitUntilFunctionExists",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionExists$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionExists"],
    "waitUntilFunctionUpdated",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionUpdated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionUpdated"],
    "waitUntilFunctionUpdatedV2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionUpdatedV2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionUpdatedV2"],
    "waitUntilPublishedVersionActive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForPublishedVersionActive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilPublishedVersionActive"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionActive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionActive.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionActiveV2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionActiveV2.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionExists$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionExists.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionUpdated$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionUpdated.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForFunctionUpdatedV2$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForFunctionUpdatedV2.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$waitForPublishedVersionActive$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/waitForPublishedVersionActive.js [app-route] (ecmascript)");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$Command",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["$Command"],
    "AddLayerVersionPermissionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddLayerVersionPermissionCommand"],
    "AddPermissionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AddPermissionCommand"],
    "ApplicationLogLevel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ApplicationLogLevel"],
    "Architecture",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Architecture"],
    "CodeSigningConfigNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeSigningConfigNotFoundException"],
    "CodeSigningPolicy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeSigningPolicy"],
    "CodeStorageExceededException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeStorageExceededException"],
    "CodeVerificationFailedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CodeVerificationFailedException"],
    "CreateAliasCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateAliasCommand"],
    "CreateCodeSigningConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateCodeSigningConfigCommand"],
    "CreateEventSourceMappingCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateEventSourceMappingCommand"],
    "CreateFunctionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateFunctionCommand"],
    "CreateFunctionRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateFunctionRequestFilterSensitiveLog"],
    "CreateFunctionUrlConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CreateFunctionUrlConfigCommand"],
    "DeleteAliasCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteAliasCommand"],
    "DeleteCodeSigningConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteCodeSigningConfigCommand"],
    "DeleteEventSourceMappingCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteEventSourceMappingCommand"],
    "DeleteFunctionCodeSigningConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteFunctionCodeSigningConfigCommand"],
    "DeleteFunctionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteFunctionCommand"],
    "DeleteFunctionConcurrencyCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteFunctionConcurrencyCommand"],
    "DeleteFunctionEventInvokeConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteFunctionEventInvokeConfigCommand"],
    "DeleteFunctionUrlConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteFunctionUrlConfigCommand"],
    "DeleteLayerVersionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteLayerVersionCommand"],
    "DeleteProvisionedConcurrencyConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DeleteProvisionedConcurrencyConfigCommand"],
    "EC2AccessDeniedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EC2AccessDeniedException"],
    "EC2ThrottledException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EC2ThrottledException"],
    "EC2UnexpectedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EC2UnexpectedException"],
    "EFSIOException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EFSIOException"],
    "EFSMountConnectivityException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EFSMountConnectivityException"],
    "EFSMountFailureException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EFSMountFailureException"],
    "EFSMountTimeoutException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EFSMountTimeoutException"],
    "ENILimitReachedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ENILimitReachedException"],
    "EndPointType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EndPointType"],
    "EnvironmentErrorFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EnvironmentErrorFilterSensitiveLog"],
    "EnvironmentFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EnvironmentFilterSensitiveLog"],
    "EnvironmentResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EnvironmentResponseFilterSensitiveLog"],
    "EventSourceMappingMetric",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventSourceMappingMetric"],
    "EventSourcePosition",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EventSourcePosition"],
    "FullDocument",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FullDocument"],
    "FunctionCodeFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionCodeFilterSensitiveLog"],
    "FunctionConfigurationFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionConfigurationFilterSensitiveLog"],
    "FunctionResponseType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionResponseType"],
    "FunctionUrlAuthType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionUrlAuthType"],
    "FunctionVersion",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FunctionVersion"],
    "GetAccountSettingsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetAccountSettingsCommand"],
    "GetAliasCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetAliasCommand"],
    "GetCodeSigningConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetCodeSigningConfigCommand"],
    "GetEventSourceMappingCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetEventSourceMappingCommand"],
    "GetFunctionCodeSigningConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionCodeSigningConfigCommand"],
    "GetFunctionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionCommand"],
    "GetFunctionConcurrencyCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionConcurrencyCommand"],
    "GetFunctionConfigurationCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionConfigurationCommand"],
    "GetFunctionEventInvokeConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionEventInvokeConfigCommand"],
    "GetFunctionRecursionConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionRecursionConfigCommand"],
    "GetFunctionResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionResponseFilterSensitiveLog"],
    "GetFunctionUrlConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetFunctionUrlConfigCommand"],
    "GetLayerVersionByArnCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetLayerVersionByArnCommand"],
    "GetLayerVersionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetLayerVersionCommand"],
    "GetLayerVersionPolicyCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetLayerVersionPolicyCommand"],
    "GetPolicyCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetPolicyCommand"],
    "GetProvisionedConcurrencyConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetProvisionedConcurrencyConfigCommand"],
    "GetRuntimeManagementConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetRuntimeManagementConfigCommand"],
    "ImageConfigErrorFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageConfigErrorFilterSensitiveLog"],
    "ImageConfigResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ImageConfigResponseFilterSensitiveLog"],
    "InvalidCodeSignatureException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidCodeSignatureException"],
    "InvalidParameterValueException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidParameterValueException"],
    "InvalidRequestContentException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidRequestContentException"],
    "InvalidRuntimeException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidRuntimeException"],
    "InvalidSecurityGroupIDException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidSecurityGroupIDException"],
    "InvalidSubnetIDException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidSubnetIDException"],
    "InvalidZipFileException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvalidZipFileException"],
    "InvocationRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvocationRequestFilterSensitiveLog"],
    "InvocationResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvocationResponseFilterSensitiveLog"],
    "InvocationType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvocationType"],
    "InvokeAsyncCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeAsyncCommand"],
    "InvokeAsyncRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeAsyncRequestFilterSensitiveLog"],
    "InvokeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeCommand"],
    "InvokeMode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeMode"],
    "InvokeResponseStreamUpdateFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeResponseStreamUpdateFilterSensitiveLog"],
    "InvokeWithResponseStreamCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamCommand"],
    "InvokeWithResponseStreamRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamRequestFilterSensitiveLog"],
    "InvokeWithResponseStreamResponseEvent",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamResponseEvent"],
    "InvokeWithResponseStreamResponseEventFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamResponseEventFilterSensitiveLog"],
    "InvokeWithResponseStreamResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["InvokeWithResponseStreamResponseFilterSensitiveLog"],
    "KMSAccessDeniedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KMSAccessDeniedException"],
    "KMSDisabledException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KMSDisabledException"],
    "KMSInvalidStateException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KMSInvalidStateException"],
    "KMSNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KMSNotFoundException"],
    "KafkaSchemaRegistryAuthType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KafkaSchemaRegistryAuthType"],
    "KafkaSchemaValidationAttribute",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KafkaSchemaValidationAttribute"],
    "Lambda",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$Lambda$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Lambda"],
    "LambdaClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LambdaClient"],
    "LambdaServiceException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LambdaServiceException"],
    "LastUpdateStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LastUpdateStatus"],
    "LastUpdateStatusReasonCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LastUpdateStatusReasonCode"],
    "LayerVersionContentInputFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LayerVersionContentInputFilterSensitiveLog"],
    "ListAliasesCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListAliasesCommand"],
    "ListCodeSigningConfigsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListCodeSigningConfigsCommand"],
    "ListEventSourceMappingsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListEventSourceMappingsCommand"],
    "ListFunctionEventInvokeConfigsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListFunctionEventInvokeConfigsCommand"],
    "ListFunctionUrlConfigsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListFunctionUrlConfigsCommand"],
    "ListFunctionsByCodeSigningConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListFunctionsByCodeSigningConfigCommand"],
    "ListFunctionsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListFunctionsCommand"],
    "ListFunctionsResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListFunctionsResponseFilterSensitiveLog"],
    "ListLayerVersionsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListLayerVersionsCommand"],
    "ListLayersCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListLayersCommand"],
    "ListProvisionedConcurrencyConfigsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListProvisionedConcurrencyConfigsCommand"],
    "ListTagsCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListTagsCommand"],
    "ListVersionsByFunctionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListVersionsByFunctionCommand"],
    "ListVersionsByFunctionResponseFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ListVersionsByFunctionResponseFilterSensitiveLog"],
    "LogFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LogFormat"],
    "LogType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LogType"],
    "PackageType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PackageType"],
    "PolicyLengthExceededException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PolicyLengthExceededException"],
    "PreconditionFailedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PreconditionFailedException"],
    "ProvisionedConcurrencyConfigNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProvisionedConcurrencyConfigNotFoundException"],
    "ProvisionedConcurrencyStatusEnum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProvisionedConcurrencyStatusEnum"],
    "PublishLayerVersionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublishLayerVersionCommand"],
    "PublishLayerVersionRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublishLayerVersionRequestFilterSensitiveLog"],
    "PublishVersionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PublishVersionCommand"],
    "PutFunctionCodeSigningConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PutFunctionCodeSigningConfigCommand"],
    "PutFunctionConcurrencyCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PutFunctionConcurrencyCommand"],
    "PutFunctionEventInvokeConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PutFunctionEventInvokeConfigCommand"],
    "PutFunctionRecursionConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PutFunctionRecursionConfigCommand"],
    "PutProvisionedConcurrencyConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PutProvisionedConcurrencyConfigCommand"],
    "PutRuntimeManagementConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PutRuntimeManagementConfigCommand"],
    "RecursiveInvocationException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecursiveInvocationException"],
    "RecursiveLoop",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RecursiveLoop"],
    "RemoveLayerVersionPermissionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RemoveLayerVersionPermissionCommand"],
    "RemovePermissionCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RemovePermissionCommand"],
    "RequestTooLargeException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RequestTooLargeException"],
    "ResourceConflictException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceConflictException"],
    "ResourceInUseException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceInUseException"],
    "ResourceNotFoundException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotFoundException"],
    "ResourceNotReadyException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResourceNotReadyException"],
    "ResponseStreamingInvocationType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ResponseStreamingInvocationType"],
    "Runtime",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Runtime"],
    "RuntimeVersionConfigFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RuntimeVersionConfigFilterSensitiveLog"],
    "RuntimeVersionErrorFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RuntimeVersionErrorFilterSensitiveLog"],
    "SchemaRegistryEventRecordFormat",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SchemaRegistryEventRecordFormat"],
    "ServiceException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ServiceException"],
    "SnapStartApplyOn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartApplyOn"],
    "SnapStartException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartException"],
    "SnapStartNotReadyException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartNotReadyException"],
    "SnapStartOptimizationStatus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartOptimizationStatus"],
    "SnapStartTimeoutException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SnapStartTimeoutException"],
    "SourceAccessType",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SourceAccessType"],
    "State",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["State"],
    "StateReasonCode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StateReasonCode"],
    "SubnetIPAddressLimitReachedException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SubnetIPAddressLimitReachedException"],
    "SystemLogLevel",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SystemLogLevel"],
    "TagResourceCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TagResourceCommand"],
    "ThrottleReason",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ThrottleReason"],
    "TooManyRequestsException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TooManyRequestsException"],
    "TracingMode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TracingMode"],
    "UnsupportedMediaTypeException",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UnsupportedMediaTypeException"],
    "UntagResourceCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UntagResourceCommand"],
    "UpdateAliasCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateAliasCommand"],
    "UpdateCodeSigningConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateCodeSigningConfigCommand"],
    "UpdateEventSourceMappingCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateEventSourceMappingCommand"],
    "UpdateFunctionCodeCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateFunctionCodeCommand"],
    "UpdateFunctionCodeRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateFunctionCodeRequestFilterSensitiveLog"],
    "UpdateFunctionConfigurationCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateFunctionConfigurationCommand"],
    "UpdateFunctionConfigurationRequestFilterSensitiveLog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateFunctionConfigurationRequestFilterSensitiveLog"],
    "UpdateFunctionEventInvokeConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateFunctionEventInvokeConfigCommand"],
    "UpdateFunctionUrlConfigCommand",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateFunctionUrlConfigCommand"],
    "UpdateRuntimeOn",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["UpdateRuntimeOn"],
    "__Client",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["__Client"],
    "paginateListAliases",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListAliases"],
    "paginateListCodeSigningConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListCodeSigningConfigs"],
    "paginateListEventSourceMappings",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListEventSourceMappings"],
    "paginateListFunctionEventInvokeConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFunctionEventInvokeConfigs"],
    "paginateListFunctionUrlConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFunctionUrlConfigs"],
    "paginateListFunctions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFunctions"],
    "paginateListFunctionsByCodeSigningConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListFunctionsByCodeSigningConfig"],
    "paginateListLayerVersions",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListLayerVersions"],
    "paginateListLayers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListLayers"],
    "paginateListProvisionedConcurrencyConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListProvisionedConcurrencyConfigs"],
    "paginateListVersionsByFunction",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paginateListVersionsByFunction"],
    "waitForFunctionActive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionActive"],
    "waitForFunctionActiveV2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionActiveV2"],
    "waitForFunctionExists",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionExists"],
    "waitForFunctionUpdated",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionUpdated"],
    "waitForFunctionUpdatedV2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForFunctionUpdatedV2"],
    "waitForPublishedVersionActive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitForPublishedVersionActive"],
    "waitUntilFunctionActive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionActive"],
    "waitUntilFunctionActiveV2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionActiveV2"],
    "waitUntilFunctionExists",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionExists"],
    "waitUntilFunctionUpdated",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionUpdated"],
    "waitUntilFunctionUpdatedV2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilFunctionUpdatedV2"],
    "waitUntilPublishedVersionActive",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["waitUntilPublishedVersionActive"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$LambdaClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/LambdaClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$Lambda$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/Lambda.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$commands$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/commands/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$pagination$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/pagination/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$waiters$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/waiters/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$dist$2d$es$2f$models$2f$LambdaServiceException$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/models/LambdaServiceException.js [app-route] (ecmascript) <locals>");
}),
];

//# sourceMappingURL=6361e_%40aws-sdk_client-lambda_dist-es_36db1536._.js.map