module.exports = [
"[project]/christmas-store-registration/.next-internal/server/app/api/register/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/christmas-store-registration/amplify_outputs.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"auth\":{\"user_pool_id\":\"us-east-1_vwgchbYC8\",\"aws_region\":\"us-east-1\",\"user_pool_client_id\":\"1dsj6m1frqcp4lq23aeie2kaea\",\"identity_pool_id\":\"us-east-1:ce2d84ed-1506-42b9-8394-2e402b5fd311\",\"mfa_methods\":[],\"standard_required_attributes\":[\"email\"],\"username_attributes\":[\"email\"],\"user_verification_types\":[\"email\"],\"groups\":[{\"admin\":{\"precedence\":0}}],\"mfa_configuration\":\"NONE\",\"password_policy\":{\"min_length\":8,\"require_lowercase\":true,\"require_numbers\":true,\"require_symbols\":true,\"require_uppercase\":true},\"unauthenticated_identities_enabled\":true},\"data\":{\"url\":\"https://ps5sezumsvcmloznr4nryeodka.appsync-api.us-east-1.amazonaws.com/graphql\",\"aws_region\":\"us-east-1\",\"api_key\":\"da2-aiwlbul6rrhxflgxabtagr7kfa\",\"default_authorization_type\":\"API_KEY\",\"authorization_types\":[\"AMAZON_COGNITO_USER_POOLS\",\"AWS_IAM\"],\"model_introspection\":{\"version\":1,\"models\":{\"Registration\":{\"name\":\"Registration\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"firstName\":{\"name\":\"firstName\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"lastName\":{\"name\":\"lastName\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"email\":{\"name\":\"email\",\"isArray\":false,\"type\":\"AWSEmail\",\"isRequired\":true,\"attributes\":[]},\"phone\":{\"name\":\"phone\",\"isArray\":false,\"type\":\"AWSPhone\",\"isRequired\":true,\"attributes\":[]},\"numberOfKids\":{\"name\":\"numberOfKids\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":true,\"attributes\":[]},\"children\":{\"name\":\"children\",\"isArray\":true,\"type\":{\"model\":\"Child\"},\"isRequired\":false,\"attributes\":[],\"isArrayNullable\":true,\"association\":{\"connectionType\":\"HAS_MANY\",\"associatedWith\":[\"registrationId\"]}},\"timeSlot\":{\"name\":\"timeSlot\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"needsChildcare\":{\"name\":\"needsChildcare\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":true,\"attributes\":[]},\"referredBy\":{\"name\":\"referredBy\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"inviteToken\":{\"name\":\"inviteToken\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"inviteUsed\":{\"name\":\"inviteUsed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"isConfirmed\":{\"name\":\"isConfirmed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"registrationDate\":{\"name\":\"registrationDate\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"attendanceConfirmed\":{\"name\":\"attendanceConfirmed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"attendanceConfirmedAt\":{\"name\":\"attendanceConfirmedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"isCancelled\":{\"name\":\"isCancelled\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"cancelledAt\":{\"name\":\"cancelledAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"confirmationToken\":{\"name\":\"confirmationToken\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"Registrations\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\",\"create\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"Child\":{\"name\":\"Child\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"registrationId\":{\"name\":\"registrationId\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"age\":{\"name\":\"age\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"gender\":{\"name\":\"gender\",\"isArray\":false,\"type\":{\"enum\":\"ChildGender\"},\"isRequired\":false,\"attributes\":[]},\"registration\":{\"name\":\"registration\",\"isArray\":false,\"type\":{\"model\":\"Registration\"},\"isRequired\":false,\"attributes\":[],\"association\":{\"connectionType\":\"BELONGS_TO\",\"targetNames\":[\"registrationId\"]}},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"Children\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\",\"create\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"TimeSlotConfig\":{\"name\":\"TimeSlotConfig\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"timeSlot\":{\"name\":\"timeSlot\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"maxCapacity\":{\"name\":\"maxCapacity\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":true,\"attributes\":[]},\"currentRegistrations\":{\"name\":\"currentRegistrations\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":false,\"attributes\":[]},\"isActive\":{\"name\":\"isActive\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"TimeSlotConfigs\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"InviteLink\":{\"name\":\"InviteLink\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"token\":{\"name\":\"token\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"email\":{\"name\":\"email\",\"isArray\":false,\"type\":\"AWSEmail\",\"isRequired\":false,\"attributes\":[]},\"isUsed\":{\"name\":\"isUsed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"usedAt\":{\"name\":\"usedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"InviteLinks\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"RegistrationConfig\":{\"name\":\"RegistrationConfig\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"isRegistrationOpen\":{\"name\":\"isRegistrationOpen\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"inviteOnlyMode\":{\"name\":\"inviteOnlyMode\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"scheduledCloseDate\":{\"name\":\"scheduledCloseDate\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"autoCloseEnabled\":{\"name\":\"autoCloseEnabled\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"closureMessage\":{\"name\":\"closureMessage\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"updatedBy\":{\"name\":\"updatedBy\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"RegistrationConfigs\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"key\",\"properties\":{\"fields\":[\"id\"]}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}}},\"enums\":{\"ChildGender\":{\"name\":\"ChildGender\",\"values\":[\"boy\",\"girl\"]}},\"nonModels\":{}}},\"version\":\"1.4\"}"));}),
"[project]/christmas-store-registration/src/lib/amplify.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$aws$2d$amplify$2f$dist$2f$esm$2f$initSingleton$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__DefaultAmplify__as__Amplify$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/aws-amplify/dist/esm/initSingleton.mjs [app-route] (ecmascript) <export DefaultAmplify as Amplify>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$amplify_outputs$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/amplify_outputs.json (json)");
;
;
// Single place to configure Amplify on both client/server where needed
if (!__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$aws$2d$amplify$2f$dist$2f$esm$2f$initSingleton$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__DefaultAmplify__as__Amplify$3e$__["Amplify"].getConfig()?.Auth) {
    __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$aws$2d$amplify$2f$dist$2f$esm$2f$initSingleton$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__DefaultAmplify__as__Amplify$3e$__["Amplify"].configure(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$amplify_outputs$2e$json__$28$json$29$__["default"]);
}
 // side-effect module
}),
"[project]/christmas-store-registration/src/app/api/register/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2f$dist$2f$esm$2f$API$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/api/dist/esm/API.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$src$2f$lib$2f$amplify$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/src/lib/amplify.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/zod/dist/esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/zod/dist/esm/v3/index.js [app-route] (ecmascript)");
;
;
;
;
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$api$2f$dist$2f$esm$2f$API$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateClient"])();
// In-memory rate limiting (best-effort; use durable store in production)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP
const rateMap = new Map();
function getClientIp(req) {
    const xff = req.headers.get('x-forwarded-for');
    if (xff) return xff.split(',')[0].trim();
    const xfci = req.headers.get('x-client-ip');
    if (xfci) return xfci;
    return 'unknown';
}
function checkRateLimit(req) {
    const ip = getClientIp(req);
    const now = Date.now();
    const rec = rateMap.get(ip);
    if (!rec || now - rec.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateMap.set(ip, {
            count: 1,
            windowStart: now
        });
        return true;
    }
    if (rec.count >= RATE_LIMIT_MAX) return false;
    rec.count += 1;
    return true;
}
// Per-timeSlot in-memory mutex to reduce race conditions on capacity
const slotQueues = new Map();
async function withSlotLock(slotKey, fn) {
    const prev = slotQueues.get(slotKey) || Promise.resolve();
    let release;
    const next = new Promise((res)=>release = res);
    slotQueues.set(slotKey, prev.then(()=>next));
    await prev;
    try {
        return await fn();
    } finally{
        // @ts-ignore release is assigned above
        release();
        // Cleanup if this is the last queued promise
        const current = slotQueues.get(slotKey);
        if (current === next) slotQueues.delete(slotKey);
    }
}
const ChildSchema = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    age: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].union([
        __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string(),
        __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].number()
    ]),
    gender: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].enum([
        'boy',
        'girl'
    ])
});
const RegistrationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].object({
    firstName: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().trim().min(1),
    lastName: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().trim().min(1),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().trim().email(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().trim().min(7),
    numberOfKids: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].number().int().min(0),
    timeSlot: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().trim().min(1),
    needsChildcare: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].boolean(),
    referredBy: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional(),
    inviteToken: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional(),
    children: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].array(ChildSchema).optional(),
    recaptchaToken: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$zod$2f$dist$2f$esm$2f$v3$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["z"].string().optional()
});
async function POST(req) {
    try {
        if (!checkRateLimit(req)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Too many requests. Please try again later.'
            }, {
                status: 429
            });
        }
        const json = await req.json();
        const parsed = RegistrationSchema.safeParse(json);
        if (!parsed.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid input',
                details: parsed.error.flatten()
            }, {
                status: 400
            });
        }
        const { firstName, lastName, email, phone, numberOfKids, timeSlot, needsChildcare, referredBy, inviteToken, children = [], recaptchaToken } = parsed.data;
        // Verify reCAPTCHA if configured
        if (process.env.RECAPTCHA_SECRET) {
            if (!recaptchaToken) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Captcha verification is required'
                }, {
                    status: 400
                });
            }
            try {
                const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        secret: process.env.RECAPTCHA_SECRET,
                        response: recaptchaToken
                    }).toString()
                });
                const data = await resp.json();
                if (!data.success) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Captcha verification failed'
                    }, {
                        status: 400
                    });
                }
            } catch (e) {
                console.error('reCAPTCHA verify error', e);
                return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Captcha verification error'
                }, {
                    status: 400
                });
            }
        }
        // Check duplicates on server
        const [emailCheck, phoneCheck] = await Promise.all([
            client.models.Registration.list({
                filter: {
                    email: {
                        eq: email
                    }
                }
            }),
            client.models.Registration.list({
                filter: {
                    phone: {
                        eq: phone
                    }
                }
            })
        ]);
        if (emailCheck.data?.length) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Someone is already registered with this email address'
            }, {
                status: 409
            });
        }
        if (phoneCheck.data?.length) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Someone is already registered with this phone number'
            }, {
                status: 409
            });
        }
        // Enforce registration status
        const { data: configData } = await client.models.RegistrationConfig.list();
        const config = configData?.[0];
        if (config) {
            if (!config.isRegistrationOpen) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: config.closureMessage || 'Registration is currently closed.'
                }, {
                    status: 403
                });
            }
            if (config.inviteOnlyMode && !inviteToken) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Registration is invite-only. An invite token is required.'
                }, {
                    status: 403
                });
            }
        }
        // Optional: delegate to durable reservation Lambda if configured
        if (process.env.RESERVE_FUNCTION_NAME) {
            try {
                const { LambdaClient, InvokeCommand } = await __turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/dist-es/index.js [app-route] (ecmascript, async loader)");
                const lc = new LambdaClient({});
                const ivk = new InvokeCommand({
                    FunctionName: process.env.RESERVE_FUNCTION_NAME,
                    Payload: new TextEncoder().encode(JSON.stringify({
                        input: {
                            firstName,
                            lastName,
                            email,
                            phone,
                            numberOfKids,
                            timeSlot,
                            needsChildcare,
                            referredBy,
                            inviteToken,
                            children
                        }
                    }))
                });
                const res = await lc.send(ivk);
                const payloadStr = res.Payload ? new TextDecoder().decode(res.Payload) : '{}';
                const payload = JSON.parse(payloadStr || '{}');
                if (payload?.ok) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        id: payload.id
                    }, {
                        status: 201
                    });
                } else {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: payload?.error || 'Reservation failed'
                    }, {
                        status: 409
                    });
                }
            } catch (e) {
                console.error('Durable reservation failed; falling back', e);
            // fall through to local lock path
            }
        }
        // Wrap the entire capacity check + create in a per-slot lock
        return await withSlotLock(timeSlot, async ()=>{
            // Capacity check (pre-create)
            const { data: slotList } = await client.models.TimeSlotConfig.list({
                filter: {
                    timeSlot: {
                        eq: timeSlot
                    }
                }
            });
            const slot = slotList?.[0];
            if (!slot) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Selected time slot is not available'
                }, {
                    status: 400
                });
            }
            const { data: regsInSlot } = await client.models.Registration.list({
                filter: {
                    timeSlot: {
                        eq: timeSlot
                    },
                    isCancelled: {
                        ne: true
                    }
                }
            });
            const currentCount = regsInSlot?.length ?? 0;
            if (currentCount >= (slot.maxCapacity || 0)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'This time slot is full'
                }, {
                    status: 409
                });
            }
            // If invite token is present, validate not used
            if (inviteToken) {
                const { data: invites } = await client.models.InviteLink.list({
                    filter: {
                        token: {
                            eq: inviteToken
                        }
                    }
                });
                const invite = invites?.[0];
                if (!invite || invite.isUsed) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Invalid or already used invite token'
                    }, {
                        status: 400
                    });
                }
            }
            // Create registration
            const now = new Date().toISOString();
            const regResult = await client.models.Registration.create({
                firstName,
                lastName,
                email,
                phone,
                numberOfKids,
                timeSlot,
                needsChildcare,
                referredBy: referredBy || undefined,
                inviteToken,
                registrationDate: now
            });
            const reg = regResult.data;
            if (!reg) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Failed to create registration'
                }, {
                    status: 500
                });
            }
            // Create child records if provided
            if (Array.isArray(children) && numberOfKids > 0) {
                for (const child of children){
                    if (!child) continue;
                    await client.models.Child.create({
                        registrationId: reg.id,
                        age: child.age,
                        gender: child.gender
                    });
                }
            }
            // Post-create capacity recheck to reduce race conditions
            const { data: regsInSlotAfter } = await client.models.Registration.list({
                filter: {
                    timeSlot: {
                        eq: timeSlot
                    },
                    isCancelled: {
                        ne: true
                    }
                }
            });
            const newCount = regsInSlotAfter?.length ?? 0;
            if (newCount > (slot.maxCapacity || 0)) {
                // Roll back this registration
                await client.models.Registration.delete({
                    id: reg.id
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'This time slot just filled up. Please choose another.'
                }, {
                    status: 409
                });
            }
            // Mark invite as used (best effort) if applicable
            if (inviteToken) {
                const { data: invites2 } = await client.models.InviteLink.list({
                    filter: {
                        token: {
                            eq: inviteToken
                        }
                    }
                });
                const invite2 = invites2?.[0];
                if (invite2 && !invite2.isUsed) {
                    await client.models.InviteLink.update({
                        id: invite2.id,
                        isUsed: true,
                        usedAt: now
                    });
                }
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                id: reg.id
            }, {
                status: 201
            });
        });
    } catch (err) {
        console.error('Registration error:', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__88a7d30f._.js.map