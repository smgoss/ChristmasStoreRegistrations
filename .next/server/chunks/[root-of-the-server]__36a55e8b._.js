module.exports = [
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/checkUrl.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkUrl",
    ()=>checkUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)");
;
const LOOPBACK_CIDR_IPv4 = "127.0.0.0/8";
const LOOPBACK_CIDR_IPv6 = "::1/128";
const ECS_CONTAINER_HOST = "169.254.170.2";
const EKS_CONTAINER_HOST_IPv4 = "169.254.170.23";
const EKS_CONTAINER_HOST_IPv6 = "[fd00:ec2::23]";
const checkUrl = (url, logger)=>{
    if (url.protocol === "https:") {
        return;
    }
    if (url.hostname === ECS_CONTAINER_HOST || url.hostname === EKS_CONTAINER_HOST_IPv4 || url.hostname === EKS_CONTAINER_HOST_IPv6) {
        return;
    }
    if (url.hostname.includes("[")) {
        if (url.hostname === "[::1]" || url.hostname === "[0000:0000:0000:0000:0000:0000:0000:0001]") {
            return;
        }
    } else {
        if (url.hostname === "localhost") {
            return;
        }
        const ipComponents = url.hostname.split(".");
        const inRange = (component)=>{
            const num = parseInt(component, 10);
            return 0 <= num && num <= 255;
        };
        if (ipComponents[0] === "127" && inRange(ipComponents[1]) && inRange(ipComponents[2]) && inRange(ipComponents[3]) && ipComponents.length === 4) {
            return;
        }
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](`URL not accepted. It must either be HTTPS or match one of the following:
  - loopback CIDR 127.0.0.0/8 or [::1/128]
  - ECS container host 169.254.170.2
  - EKS container host 169.254.170.23 or [fd00:ec2::23]`, {
        logger
    });
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/fetch-http-handler/dist-es/stream-collector.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "streamCollector",
    ()=>streamCollector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-base64/dist-es/fromBase64.js [app-route] (ecmascript)");
;
const streamCollector = async (stream)=>{
    if (typeof Blob === "function" && stream instanceof Blob || stream.constructor?.name === "Blob") {
        if (Blob.prototype.arrayBuffer !== undefined) {
            return new Uint8Array(await stream.arrayBuffer());
        }
        return collectBlob(stream);
    }
    return collectStream(stream);
};
async function collectBlob(blob) {
    const base64 = await readToBase64(blob);
    const arrayBuffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBase64"])(base64);
    return new Uint8Array(arrayBuffer);
}
async function collectStream(stream) {
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
function readToBase64(blob) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onloadend = ()=>{
            if (reader.readyState !== 2) {
                return reject(new Error("Reader aborted too early"));
            }
            const result = reader.result ?? "";
            const commaIndex = result.indexOf(",");
            const dataOffset = commaIndex > -1 ? commaIndex + 1 : result.length;
            resolve(result.substring(dataOffset));
        };
        reader.onabort = ()=>reject(new Error("Read aborted"));
        reader.onerror = ()=>reject(reader.error);
        reader.readAsDataURL(blob);
    });
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-stream/dist-es/stream-type-check.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBlob",
    ()=>isBlob,
    "isReadableStream",
    ()=>isReadableStream
]);
const isReadableStream = (stream)=>typeof ReadableStream === "function" && (stream?.constructor?.name === ReadableStream.name || stream instanceof ReadableStream);
const isBlob = (blob)=>{
    return typeof Blob === "function" && (blob?.constructor?.name === Blob.name || blob instanceof Blob);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.browser.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sdkStreamMixin",
    ()=>sdkStreamMixin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$fetch$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/fetch-http-handler/dist-es/stream-collector.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-base64/dist-es/toBase64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-hex-encoding/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-utf8/dist-es/toUtf8.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$stream$2d$type$2d$check$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-stream/dist-es/stream-type-check.js [app-route] (ecmascript)");
;
;
;
;
;
const ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
const sdkStreamMixin = (stream)=>{
    if (!isBlobInstance(stream) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$stream$2d$type$2d$check$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isReadableStream"])(stream)) {
        const name = stream?.__proto__?.constructor?.name || stream;
        throw new Error(`Unexpected stream implementation, expect Blob or ReadableStream, got ${name}`);
    }
    let transformed = false;
    const transformToByteArray = async ()=>{
        if (transformed) {
            throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$fetch$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["streamCollector"])(stream);
    };
    const blobToWebStream = (blob)=>{
        if (typeof blob.stream !== "function") {
            throw new Error("Cannot transform payload Blob to web stream. Please make sure the Blob.stream() is polyfilled.\n" + "If you are using React Native, this API is not yet supported, see: https://react-native.canny.io/feature-requests/p/fetch-streaming-body");
        }
        return blob.stream();
    };
    return Object.assign(stream, {
        transformToByteArray: transformToByteArray,
        transformToString: async (encoding)=>{
            const buf = await transformToByteArray();
            if (encoding === "base64") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBase64"])(buf);
            } else if (encoding === "hex") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$hex$2d$encoding$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toHex"])(buf);
            } else if (encoding === undefined || encoding === "utf8" || encoding === "utf-8") {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$utf8$2f$dist$2d$es$2f$toUtf8$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toUtf8"])(buf);
            } else if (typeof TextDecoder === "function") {
                return new TextDecoder(encoding).decode(buf);
            } else {
                throw new Error("TextDecoder is not available, please make sure polyfill is provided.");
            }
        },
        transformToWebStream: ()=>{
            if (transformed) {
                throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
            }
            transformed = true;
            if (isBlobInstance(stream)) {
                return blobToWebStream(stream);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$stream$2d$type$2d$check$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isReadableStream"])(stream)) {
                return stream;
            } else {
                throw new Error(`Cannot transform payload to web stream, got ${stream}`);
            }
        }
    });
};
const isBlobInstance = (stream)=>typeof Blob === "function" && stream instanceof Blob;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sdkStreamMixin",
    ()=>sdkStreamMixin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/node-http-handler/dist-es/stream-collector/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-buffer-from/dist-es/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$sdk$2d$stream$2d$mixin$2e$browser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.browser.js [app-route] (ecmascript)");
;
;
;
;
const ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED = "The stream has already been transformed.";
const sdkStreamMixin = (stream)=>{
    if (!(stream instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Readable"])) {
        try {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$sdk$2d$stream$2d$mixin$2e$browser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sdkStreamMixin"])(stream);
        } catch (e) {
            const name = stream?.__proto__?.constructor?.name || stream;
            throw new Error(`Unexpected stream implementation, expect Stream.Readable instance, got ${name}`);
        }
    }
    let transformed = false;
    const transformToByteArray = async ()=>{
        if (transformed) {
            throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
        }
        transformed = true;
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$stream$2d$collector$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["streamCollector"])(stream);
    };
    return Object.assign(stream, {
        transformToByteArray,
        transformToString: async (encoding)=>{
            const buf = await transformToByteArray();
            if (encoding === undefined || Buffer.isEncoding(encoding)) {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$buffer$2d$from$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromArrayBuffer"])(buf.buffer, buf.byteOffset, buf.byteLength).toString(encoding);
            } else {
                const decoder = new TextDecoder(encoding);
                return decoder.decode(buf);
            }
        },
        transformToWebStream: ()=>{
            if (transformed) {
                throw new Error(ERR_MSG_STREAM_HAS_BEEN_TRANSFORMED);
            }
            if (stream.readableFlowing !== null) {
                throw new Error("The stream has been consumed by other callbacks.");
            }
            if (typeof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Readable"].toWeb !== "function") {
                throw new Error("Readable.toWeb() is not supported. Please ensure a polyfill is available.");
            }
            transformed = true;
            return __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Readable"].toWeb(stream);
        }
    });
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/requestHelpers.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGetRequest",
    ()=>createGetRequest,
    "getCredentials",
    ()=>getCredentials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/protocol-http/dist-es/httpRequest.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/core/dist-es/submodules/serde/date-utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$sdk$2d$stream$2d$mixin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/util-stream/dist-es/sdk-stream-mixin.js [app-route] (ecmascript)");
;
;
;
;
function createGetRequest(url) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$protocol$2d$http$2f$dist$2d$es$2f$httpRequest$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpRequest"]({
        protocol: url.protocol,
        hostname: url.hostname,
        port: Number(url.port),
        path: url.pathname,
        query: Array.from(url.searchParams.entries()).reduce((acc, [k, v])=>{
            acc[k] = v;
            return acc;
        }, {}),
        fragment: url.hash
    });
}
async function getCredentials(response, logger) {
    const stream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$util$2d$stream$2f$dist$2d$es$2f$sdk$2d$stream$2d$mixin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sdkStreamMixin"])(response.body);
    const str = await stream.transformToString();
    if (response.statusCode === 200) {
        const parsed = JSON.parse(str);
        if (typeof parsed.AccessKeyId !== "string" || typeof parsed.SecretAccessKey !== "string" || typeof parsed.Token !== "string" || typeof parsed.Expiration !== "string") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"]("HTTP credential provider response not of the required format, an object matching: " + "{ AccessKeyId: string, SecretAccessKey: string, Token: string, Expiration: string(rfc3339) }", {
                logger
            });
        }
        return {
            accessKeyId: parsed.AccessKeyId,
            secretAccessKey: parsed.SecretAccessKey,
            sessionToken: parsed.Token,
            expiration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$core$2f$dist$2d$es$2f$submodules$2f$serde$2f$date$2d$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseRfc3339DateTime"])(parsed.Expiration)
        };
    }
    if (response.statusCode >= 400 && response.statusCode < 500) {
        let parsedBody = {};
        try {
            parsedBody = JSON.parse(str);
        } catch (e) {}
        throw Object.assign(new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](`Server responded with status: ${response.statusCode}`, {
            logger
        }), {
            Code: parsedBody.Code,
            Message: parsedBody.Message
        });
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](`Server responded with status: ${response.statusCode}`, {
        logger
    });
}
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/retry-wrapper.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "retryWrapper",
    ()=>retryWrapper
]);
const retryWrapper = (toRetry, maxRetries, delayMs)=>{
    return async ()=>{
        for(let i = 0; i < maxRetries; ++i){
            try {
                return await toRetry();
            } catch (e) {
                await new Promise((resolve)=>setTimeout(resolve, delayMs));
            }
        }
        return await toRetry();
    };
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/fromHttp.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromHttp",
    ()=>fromHttp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/node-http-handler/dist-es/node-http-handler.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$checkUrl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/checkUrl.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$requestHelpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/requestHelpers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$retry$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/retry-wrapper.js [app-route] (ecmascript)");
;
;
;
;
;
;
;
const AWS_CONTAINER_CREDENTIALS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
const DEFAULT_LINK_LOCAL_HOST = "http://169.254.170.2";
const AWS_CONTAINER_CREDENTIALS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
const AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE = "AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE";
const AWS_CONTAINER_AUTHORIZATION_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
const fromHttp = (options = {})=>{
    options.logger?.debug("@aws-sdk/credential-provider-http - fromHttp");
    let host;
    const relative = options.awsContainerCredentialsRelativeUri ?? process.env[AWS_CONTAINER_CREDENTIALS_RELATIVE_URI];
    const full = options.awsContainerCredentialsFullUri ?? process.env[AWS_CONTAINER_CREDENTIALS_FULL_URI];
    const token = options.awsContainerAuthorizationToken ?? process.env[AWS_CONTAINER_AUTHORIZATION_TOKEN];
    const tokenFile = options.awsContainerAuthorizationTokenFile ?? process.env[AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE];
    const warn = options.logger?.constructor?.name === "NoOpLogger" || !options.logger?.warn ? console.warn : options.logger.warn.bind(options.logger);
    if (relative && full) {
        warn("@aws-sdk/credential-provider-http: " + "you have set both awsContainerCredentialsRelativeUri and awsContainerCredentialsFullUri.");
        warn("awsContainerCredentialsFullUri will take precedence.");
    }
    if (token && tokenFile) {
        warn("@aws-sdk/credential-provider-http: " + "you have set both awsContainerAuthorizationToken and awsContainerAuthorizationTokenFile.");
        warn("awsContainerAuthorizationToken will take precedence.");
    }
    if (full) {
        host = full;
    } else if (relative) {
        host = `${DEFAULT_LINK_LOCAL_HOST}${relative}`;
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](`No HTTP credential provider host provided.
Set AWS_CONTAINER_CREDENTIALS_FULL_URI or AWS_CONTAINER_CREDENTIALS_RELATIVE_URI.`, {
            logger: options.logger
        });
    }
    const url = new URL(host);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$checkUrl$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkUrl"])(url, options.logger);
    const requestHandler = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$node$2d$http$2d$handler$2f$dist$2d$es$2f$node$2d$http$2d$handler$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NodeHttpHandler"]({
        requestTimeout: options.timeout ?? 1000,
        connectionTimeout: options.timeout ?? 1000
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$retry$2d$wrapper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["retryWrapper"])(async ()=>{
        const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$requestHelpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGetRequest"])(url);
        if (token) {
            request.headers.Authorization = token;
        } else if (tokenFile) {
            request.headers.Authorization = (await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(tokenFile)).toString();
        }
        try {
            const result = await requestHandler.handle(request);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$requestHelpers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCredentials"])(result.response).then((creds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_HTTP", "z"));
        } catch (e) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](String(e), {
                logger: options.logger
            });
        }
    }, options.maxRetries ?? 3, options.timeout ?? 1000);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$fromHttp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/fromHttp.js [app-route] (ecmascript)");
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromHttp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$fromHttp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromHttp"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$http$2f$dist$2d$es$2f$fromHttp$2f$fromHttp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/fromHttp/fromHttp.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__36a55e8b._.js.map