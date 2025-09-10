module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[project]/amplify_outputs.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"auth\":{\"user_pool_id\":\"us-east-1_vwgchbYC8\",\"aws_region\":\"us-east-1\",\"user_pool_client_id\":\"1dsj6m1frqcp4lq23aeie2kaea\",\"identity_pool_id\":\"us-east-1:ce2d84ed-1506-42b9-8394-2e402b5fd311\",\"mfa_methods\":[],\"standard_required_attributes\":[\"email\"],\"username_attributes\":[\"email\"],\"user_verification_types\":[\"email\"],\"groups\":[{\"admin\":{\"precedence\":0}}],\"mfa_configuration\":\"NONE\",\"password_policy\":{\"min_length\":8,\"require_lowercase\":true,\"require_numbers\":true,\"require_symbols\":true,\"require_uppercase\":true},\"unauthenticated_identities_enabled\":true},\"data\":{\"url\":\"https://ps5sezumsvcmloznr4nryeodka.appsync-api.us-east-1.amazonaws.com/graphql\",\"aws_region\":\"us-east-1\",\"api_key\":\"da2-aiwlbul6rrhxflgxabtagr7kfa\",\"default_authorization_type\":\"API_KEY\",\"authorization_types\":[\"AMAZON_COGNITO_USER_POOLS\",\"AWS_IAM\"],\"model_introspection\":{\"version\":1,\"models\":{\"Registration\":{\"name\":\"Registration\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"firstName\":{\"name\":\"firstName\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"lastName\":{\"name\":\"lastName\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"email\":{\"name\":\"email\",\"isArray\":false,\"type\":\"AWSEmail\",\"isRequired\":true,\"attributes\":[]},\"phone\":{\"name\":\"phone\",\"isArray\":false,\"type\":\"AWSPhone\",\"isRequired\":true,\"attributes\":[]},\"numberOfKids\":{\"name\":\"numberOfKids\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":true,\"attributes\":[]},\"children\":{\"name\":\"children\",\"isArray\":true,\"type\":{\"model\":\"Child\"},\"isRequired\":false,\"attributes\":[],\"isArrayNullable\":true,\"association\":{\"connectionType\":\"HAS_MANY\",\"associatedWith\":[\"registrationId\"]}},\"timeSlot\":{\"name\":\"timeSlot\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"needsChildcare\":{\"name\":\"needsChildcare\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":true,\"attributes\":[]},\"referredBy\":{\"name\":\"referredBy\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"inviteToken\":{\"name\":\"inviteToken\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"inviteUsed\":{\"name\":\"inviteUsed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"isConfirmed\":{\"name\":\"isConfirmed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"registrationDate\":{\"name\":\"registrationDate\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"attendanceConfirmed\":{\"name\":\"attendanceConfirmed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"attendanceConfirmedAt\":{\"name\":\"attendanceConfirmedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"isCancelled\":{\"name\":\"isCancelled\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"cancelledAt\":{\"name\":\"cancelledAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"confirmationToken\":{\"name\":\"confirmationToken\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"Registrations\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\",\"create\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"Child\":{\"name\":\"Child\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"registrationId\":{\"name\":\"registrationId\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"age\":{\"name\":\"age\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"gender\":{\"name\":\"gender\",\"isArray\":false,\"type\":{\"enum\":\"ChildGender\"},\"isRequired\":false,\"attributes\":[]},\"registration\":{\"name\":\"registration\",\"isArray\":false,\"type\":{\"model\":\"Registration\"},\"isRequired\":false,\"attributes\":[],\"association\":{\"connectionType\":\"BELONGS_TO\",\"targetNames\":[\"registrationId\"]}},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"Children\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\",\"create\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"TimeSlotConfig\":{\"name\":\"TimeSlotConfig\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"timeSlot\":{\"name\":\"timeSlot\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"maxCapacity\":{\"name\":\"maxCapacity\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":true,\"attributes\":[]},\"currentRegistrations\":{\"name\":\"currentRegistrations\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":false,\"attributes\":[]},\"isActive\":{\"name\":\"isActive\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"TimeSlotConfigs\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"InviteLink\":{\"name\":\"InviteLink\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"token\":{\"name\":\"token\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"email\":{\"name\":\"email\",\"isArray\":false,\"type\":\"AWSEmail\",\"isRequired\":false,\"attributes\":[]},\"isUsed\":{\"name\":\"isUsed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"usedAt\":{\"name\":\"usedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"InviteLinks\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"RegistrationConfig\":{\"name\":\"RegistrationConfig\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"isRegistrationOpen\":{\"name\":\"isRegistrationOpen\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"inviteOnlyMode\":{\"name\":\"inviteOnlyMode\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"scheduledCloseDate\":{\"name\":\"scheduledCloseDate\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"autoCloseEnabled\":{\"name\":\"autoCloseEnabled\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"closureMessage\":{\"name\":\"closureMessage\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"updatedBy\":{\"name\":\"updatedBy\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"RegistrationConfigs\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"key\",\"properties\":{\"fields\":[\"id\"]}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}}},\"enums\":{\"ChildGender\":{\"name\":\"ChildGender\",\"values\":[\"boy\",\"girl\"]}},\"nonModels\":{}}},\"version\":\"1.4\"}"));}),
"[project]/config/location1.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"locationName\":\"Pathway Vineyard Lewiston Campus\",\"shortName\":\"Lewiston Campus\",\"locationAddress\":\"Lewiston, Maine\",\"timeSlots\":[\"09:00\",\"09:30\",\"10:00\",\"10:30\",\"11:00\",\"11:30\"],\"defaultCapacity\":20,\"contactEmail\":\"lewiston@pathwayvineyard.com\",\"fromEmail\":\"noreply@pathwayvineyard.com\",\"branding\":{\"primaryColor\":\"#7c3aed\",\"secondaryColor\":\"#059669\",\"locationEmoji\":\"⛪\",\"campusColor\":\"purple\"},\"churchInfo\":{\"website\":\"https://pathwayvineyard.com\",\"phone\":\"(207) 555-0100\"}}"));}),
"[project]/config/location2.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"locationName\":\"Pathway Vineyard Brunswick Campus\",\"shortName\":\"Brunswick Campus\",\"locationAddress\":\"Brunswick, Maine\",\"timeSlots\":[\"10:00\",\"10:30\",\"11:00\",\"11:30\",\"12:00\",\"12:30\"],\"defaultCapacity\":25,\"contactEmail\":\"brunswick@pathwayvineyard.com\",\"fromEmail\":\"noreply@pathwayvineyard.com\",\"branding\":{\"primaryColor\":\"#059669\",\"secondaryColor\":\"#dc2626\",\"locationEmoji\":\"⛪\",\"campusColor\":\"green\"},\"churchInfo\":{\"website\":\"https://pathwayvineyard.com\",\"phone\":\"(207) 555-0200\"}}"));}),
"[project]/config/location3.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"locationName\":\"Pathway Vineyard Gray-New Gloucester Campus\",\"shortName\":\"Gray-New Gloucester Campus\",\"locationAddress\":\"Gray-New Gloucester, Maine\",\"timeSlots\":[\"08:30\",\"09:00\",\"09:30\",\"10:00\",\"10:30\",\"11:00\"],\"defaultCapacity\":15,\"contactEmail\":\"gray@pathwayvineyard.com\",\"fromEmail\":\"noreply@pathwayvineyard.com\",\"branding\":{\"primaryColor\":\"#dc2626\",\"secondaryColor\":\"#f59e0b\",\"locationEmoji\":\"⛪\",\"campusColor\":\"red\"},\"churchInfo\":{\"website\":\"https://pathwayvineyard.com\",\"phone\":\"(207) 555-0300\"}}"));}),
"[project]/src/hooks/useLocationConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLocationConfig",
    ()=>useLocationConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
// Import all configs
const location1Config = __turbopack_context__.r("[project]/config/location1.json (json)");
const location2Config = __turbopack_context__.r("[project]/config/location2.json (json)");
const location3Config = __turbopack_context__.r("[project]/config/location3.json (json)");
function useLocationConfig() {
    const [config, setConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(location1Config);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Get location from environment variable or URL parameter or localStorage
        const getLocationFromEnvironment = ()=>{
            // Check environment variable first
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            // Fall back to environment variable
            return process.env.NEXT_PUBLIC_LOCATION || 'location1';
        };
        const location = getLocationFromEnvironment();
        switch(location){
            case 'location1':
                setConfig(location1Config);
                break;
            case 'location2':
                setConfig(location2Config);
                break;
            case 'location3':
                setConfig(location3Config);
                break;
            default:
                setConfig(location1Config);
        }
    }, []);
    return config;
}
}),
"[project]/src/app/admin/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$ui$2d$react$2f$dist$2f$esm$2f$components$2f$Authenticator$2f$Authenticator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@aws-amplify/ui-react/dist/esm/components/Authenticator/Authenticator.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$ui$2d$react$2f$dist$2f$esm$2f$components$2f$ThemeProvider$2f$ThemeProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@aws-amplify/ui-react/dist/esm/components/ThemeProvider/ThemeProvider.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$api$2f$dist$2f$esm$2f$API$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@aws-amplify/api/dist/esm/API.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aws$2d$amplify$2f$dist$2f$esm$2f$initSingleton$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__DefaultAmplify__as__Amplify$3e$__ = __turbopack_context__.i("[project]/node_modules/aws-amplify/dist/esm/initSingleton.mjs [app-ssr] (ecmascript) <export DefaultAmplify as Amplify>");
var __TURBOPACK__imported__module__$5b$project$5d2f$amplify_outputs$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/amplify_outputs.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocationConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLocationConfig.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aws$2d$amplify$2f$dist$2f$esm$2f$initSingleton$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__DefaultAmplify__as__Amplify$3e$__["Amplify"].configure(__TURBOPACK__imported__module__$5b$project$5d2f$amplify_outputs$2e$json__$28$json$29$__["default"]);
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$api$2f$dist$2f$esm$2f$API$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateClient"])({
    authMode: 'userPool'
});
const christmasTheme = {
    name: 'christmas-theme',
    tokens: {
        colors: {
            brand: {
                primary: {
                    10: '#f0fdf4',
                    20: '#dcfce7',
                    40: '#86efac',
                    60: '#22c55e',
                    80: '#16a34a',
                    90: '#15803d',
                    100: '#14532d'
                }
            },
            background: {
                primary: '#fef7f0',
                secondary: '#fef2f2'
            }
        },
        components: {
            authenticator: {
                router: {
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                    borderRadius: '1rem'
                },
                form: {
                    padding: '2rem'
                }
            },
            button: {
                primary: {
                    backgroundColor: '{colors.brand.primary.80}',
                    _hover: {
                        backgroundColor: '{colors.brand.primary.90}'
                    }
                }
            },
            fieldset: {
                borderRadius: '0.75rem'
            },
            input: {
                borderRadius: '0.75rem'
            }
        }
    }
};
// TIME_SLOTS is now imported from locationConfig
function AdminDashboard() {
    const locationConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLocationConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLocationConfig"])();
    const { timeSlots: TIME_SLOTS, locationName: LOCATION_NAME, branding: BRANDING, defaultCapacity: DEFAULT_CAPACITY } = locationConfig;
    const [timeSlots, setTimeSlots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [registrations, setRegistrations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inviteEmail, setInviteEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingRegistration, setEditingRegistration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editFormData, setEditFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newTimeSlot, setNewTimeSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingTimeSlot, setEditingTimeSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [registrationConfig, setRegistrationConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scheduledCloseDate, setScheduledCloseDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [scheduledCloseTime, setScheduledCloseTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [customClosureMessage, setCustomClosureMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeAndLoadData = async ()=>{
            try {
                console.log('🔍 Loading admin dashboard...');
                setLoading(true);
                // Check if time slots exist first
                const { data: existingSlots } = await client.models.TimeSlotConfig.list();
                console.log('📊 Found existing slots:', existingSlots.length, existingSlots);
                if (existingSlots.length === 0) {
                    console.log('🚀 No time slots found, auto-initializing...');
                    setMessage('🔄 Setting up time slots...');
                    try {
                        // Auto-initialize time slots with location-specific capacity
                        const createPromises = TIME_SLOTS.map(async (slot, index)=>{
                            console.log(`⏰ Creating time slot ${index + 1}: ${slot}`);
                            const result = await client.models.TimeSlotConfig.create({
                                timeSlot: slot,
                                maxCapacity: DEFAULT_CAPACITY,
                                currentRegistrations: 0,
                                isActive: true
                            });
                            console.log(`✅ Created time slot: ${slot}`, result);
                            return result;
                        });
                        const results = await Promise.all(createPromises);
                        console.log('🎉 All time slots created successfully:', results.length);
                        setMessage('✅ Time slots ready! You can now manage registrations.');
                        // Small delay to show success message
                        setTimeout(()=>setMessage(''), 2000);
                    } catch (createError) {
                        console.error('❌ Error creating time slots:', createError);
                        setMessage('❌ Error setting up time slots. Please try refreshing the page.');
                    }
                }
                // Load all data (this will now include the newly created slots if any)
                console.log('📥 Loading all dashboard data...');
                await loadData();
                console.log('✅ Dashboard data loaded successfully');
            } catch (error) {
                console.error('💥 Critical error in admin dashboard:', error);
                setMessage('❌ Error loading admin dashboard. Check console and refresh the page.');
            } finally{
                setLoading(false);
            }
        };
        initializeAndLoadData();
    }, []);
    const loadData = async ()=>{
        try {
            console.log('📥 Loading data with user pool auth...');
            // Load registration configuration (singleton)
            console.log('🔍 Fetching registration config...');
            const { data: configData } = await client.models.RegistrationConfig.list();
            let config = configData?.[0];
            if (!config) {
                // Create default config if none exists
                console.log('🚀 Creating default registration config...');
                const { data: newConfig } = await client.models.RegistrationConfig.create({
                    id: 'main',
                    isRegistrationOpen: true,
                    inviteOnlyMode: false,
                    autoCloseEnabled: false,
                    closureMessage: 'Registration is currently closed. Please check back later.'
                });
                config = newConfig;
            }
            setRegistrationConfig(config);
            setCustomClosureMessage(config.closureMessage);
            // Load time slot configurations
            console.log('🔍 Fetching time slots...');
            const { data: timeSlotData, errors: timeSlotErrors } = await client.models.TimeSlotConfig.list();
            if (timeSlotErrors) {
                console.error('❌ Time slot errors:', timeSlotErrors);
                return; // Exit early if there are errors
            } else {
                console.log('✅ Time slots loaded:', timeSlotData?.length || 0, timeSlotData);
            }
            // Load registrations
            console.log('🔍 Fetching registrations...');
            const { data: registrationData, errors: registrationErrors } = await client.models.Registration.list();
            if (registrationErrors) {
                console.error('❌ Registration errors:', registrationErrors);
            } else {
                console.log('✅ Registrations loaded:', registrationData?.length || 0);
                const registrations = registrationData;
                setRegistrations(registrations);
                // Update time slot counts with actual registration data
                if (timeSlotData) {
                    const updatedTimeSlots = timeSlotData.map((slot)=>{
                        const actualCount = registrations ? registrations.filter((reg)=>reg.timeSlot === slot.timeSlot).length : 0;
                        console.log(`📊 Time slot ${slot.timeSlot}: ${actualCount} actual registrations (was showing ${slot.currentRegistrations})`);
                        return {
                            ...slot,
                            currentRegistrations: actualCount
                        };
                    });
                    // Sort time slots by time (earliest to latest)
                    const sortedTimeSlots = updatedTimeSlots.sort((a, b)=>{
                        return a.timeSlot.localeCompare(b.timeSlot);
                    });
                    setTimeSlots(sortedTimeSlots);
                }
            }
        } catch (error) {
            console.error('💥 Error loading data:', error);
            setMessage('❌ Authentication error. Please sign out and sign back in.');
        }
    };
    const initializeTimeSlots = async ()=>{
        setLoading(true);
        try {
            // Check if time slots already exist
            const { data: existingSlots } = await client.models.TimeSlotConfig.list();
            if (existingSlots.length === 0) {
                // Create default time slots with capacity of 20 each
                const promises = TIME_SLOTS.map((slot)=>client.models.TimeSlotConfig.create({
                        timeSlot: slot,
                        maxCapacity: DEFAULT_CAPACITY,
                        currentRegistrations: 0,
                        isActive: true
                    }));
                await Promise.all(promises);
                setMessage('Time slots initialized successfully with 20 people per slot!');
                loadData();
            } else {
                setMessage('Time slots already exist.');
            }
        } catch (error) {
            console.error('Error initializing time slots:', error);
            setMessage('Error initializing time slots.');
        } finally{
            setLoading(false);
        }
    };
    const updateTimeSlotCapacity = async (id, newCapacity)=>{
        if (newCapacity < 0) {
            setMessage('❌ Capacity cannot be negative!');
            return;
        }
        try {
            setLoading(true);
            await client.models.TimeSlotConfig.update({
                id,
                maxCapacity: newCapacity
            });
            // Update local state immediately for better UX
            setTimeSlots((prev)=>prev.map((slot)=>slot.id === id ? {
                        ...slot,
                        maxCapacity: newCapacity
                    } : slot));
            setMessage(`✅ Time slot capacity updated to ${newCapacity} people!`);
            // Reload data to ensure consistency
            setTimeout(()=>loadData(), 500);
        } catch (error) {
            console.error('Error updating capacity:', error);
            setMessage('❌ Error updating capacity. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    const addNewTimeSlot = async ()=>{
        if (!newTimeSlot.trim()) {
            setMessage('❌ Please enter a valid time slot!');
            return;
        }
        // Check if time slot already exists
        const exists = timeSlots.some((slot)=>slot.timeSlot === newTimeSlot);
        if (exists) {
            setMessage('❌ This time slot already exists!');
            return;
        }
        try {
            setLoading(true);
            await client.models.TimeSlotConfig.create({
                timeSlot: newTimeSlot,
                maxCapacity: DEFAULT_CAPACITY,
                currentRegistrations: 0,
                isActive: true
            });
            setMessage(`✅ New time slot "${newTimeSlot}" added successfully!`);
            setNewTimeSlot('');
            loadData();
        } catch (error) {
            console.error('Error adding time slot:', error);
            setMessage('❌ Error adding time slot. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    const updateTimeSlotTime = async (id, newTime)=>{
        if (!newTime.trim()) {
            setMessage('❌ Please enter a valid time!');
            return;
        }
        try {
            setLoading(true);
            await client.models.TimeSlotConfig.update({
                id,
                timeSlot: newTime
            });
            setMessage(`✅ Time slot updated to "${newTime}"!`);
            setEditingTimeSlot(null);
            loadData();
        } catch (error) {
            console.error('Error updating time slot:', error);
            setMessage('❌ Error updating time slot. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    const deleteTimeSlot = async (id, timeSlot)=>{
        if (!confirm(`Are you sure you want to delete the ${timeSlot} time slot? This will also delete any registrations for this time slot.`)) {
            return;
        }
        try {
            setLoading(true);
            await client.models.TimeSlotConfig.delete({
                id
            });
            setMessage(`✅ Time slot "${timeSlot}" deleted successfully!`);
            loadData();
        } catch (error) {
            console.error('Error deleting time slot:', error);
            setMessage('❌ Error deleting time slot. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    const cleanupDuplicateTimeSlots = async ()=>{
        try {
            setLoading(true);
            setMessage('🧹 Cleaning up duplicate time slots...');
            const { data: allSlots } = await client.models.TimeSlotConfig.list();
            // Group by time slot to find duplicates
            const timeSlotGroups = {};
            allSlots?.forEach((slot)=>{
                if (!timeSlotGroups[slot.timeSlot]) {
                    timeSlotGroups[slot.timeSlot] = [];
                }
                timeSlotGroups[slot.timeSlot].push(slot);
            });
            // Remove duplicates (keep the first one of each time)
            let deletedCount = 0;
            for (const [timeSlot, slots] of Object.entries(timeSlotGroups)){
                if (slots.length > 1) {
                    // Keep the first one, delete the rest
                    for(let i = 1; i < slots.length; i++){
                        await client.models.TimeSlotConfig.delete({
                            id: slots[i].id
                        });
                        deletedCount++;
                        console.log(`🗑️ Deleted duplicate time slot: ${timeSlot} (${slots[i].id})`);
                    }
                }
            }
            setMessage(`✅ Cleaned up ${deletedCount} duplicate time slots!`);
            setTimeout(()=>setMessage(''), 3000);
            // Reload data
            await loadData();
        } catch (error) {
            console.error('Error cleaning up duplicates:', error);
            setMessage('❌ Error cleaning up duplicates.');
        } finally{
            setLoading(false);
        }
    };
    const generateInviteLink = async ()=>{
        if (!inviteEmail.trim()) {
            setMessage('Please enter an email address.');
            return;
        }
        setLoading(true);
        try {
            const token = Math.random().toString(36).substr(2, 15);
            await client.models.InviteLink.create({
                token,
                email: inviteEmail,
                isUsed: false,
                createdAt: new Date().toISOString()
            });
            const inviteUrl = `${window.location.origin}/register/${token}`;
            navigator.clipboard.writeText(inviteUrl);
            setMessage(`Invite link generated and copied to clipboard: ${inviteUrl}`);
            setInviteEmail('');
        } catch (error) {
            console.error('Error generating invite link:', error);
            setMessage('Error generating invite link.');
        } finally{
            setLoading(false);
        }
    };
    const loadRegistrationConfig = async ()=>{
        try {
            const { data: configData } = await client.models.RegistrationConfig.list();
            let config = configData?.[0];
            if (config) {
                // Check if we need to auto-close based on scheduled date
                if (config.autoCloseEnabled && config.scheduledCloseDate) {
                    const now = new Date();
                    const scheduledDate = new Date(config.scheduledCloseDate);
                    if (now >= scheduledDate && config.isRegistrationOpen) {
                        // Auto-close registration
                        const updatedConfig = await client.models.RegistrationConfig.update({
                            id: config.id,
                            isRegistrationOpen: false,
                            updatedAt: new Date().toISOString(),
                            updatedBy: 'admin-check'
                        });
                        config = updatedConfig.data;
                        setMessage('🔒 Registration automatically closed based on scheduled time');
                        setTimeout(()=>setMessage(''), 3000);
                    }
                }
                setRegistrationConfig(config);
                setCustomClosureMessage(config.closureMessage);
            }
        } catch (error) {
            console.error('Error loading registration config:', error);
        }
    };
    const updateRegistrationStatus = async (field, value)=>{
        if (!registrationConfig) return;
        try {
            setLoading(true);
            const updatedConfig = await client.models.RegistrationConfig.update({
                id: registrationConfig.id,
                [field]: value,
                updatedAt: new Date().toISOString()
            });
            setRegistrationConfig(updatedConfig.data);
            setMessage(`✅ Registration ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} updated!`);
            setTimeout(()=>setMessage(''), 2000);
        } catch (error) {
            console.error('Error updating registration status:', error);
            setMessage('❌ Error updating registration settings.');
        } finally{
            setLoading(false);
        }
    };
    const toggleRegistrationOpen = ()=>{
        updateRegistrationStatus('isRegistrationOpen', !registrationConfig?.isRegistrationOpen);
    };
    const toggleInviteOnlyMode = ()=>{
        updateRegistrationStatus('inviteOnlyMode', !registrationConfig?.inviteOnlyMode);
    };
    const scheduleRegistrationClosure = async ()=>{
        if (!registrationConfig || !scheduledCloseDate) return;
        const scheduledDateTime = scheduledCloseTime ? `${scheduledCloseDate}T${scheduledCloseTime}:00.000Z` : `${scheduledCloseDate}T23:59:59.000Z`;
        try {
            setLoading(true);
            const updatedConfig = await client.models.RegistrationConfig.update({
                id: registrationConfig.id,
                scheduledCloseDate: scheduledDateTime,
                autoCloseEnabled: true,
                closureMessage: customClosureMessage || 'Registration is currently closed. Please check back later.',
                updatedAt: new Date().toISOString()
            });
            setRegistrationConfig(updatedConfig.data);
            setMessage('✅ Scheduled closure updated! Registration will automatically close at the specified time.');
            setTimeout(()=>setMessage(''), 3000);
        } catch (error) {
            console.error('Error scheduling closure:', error);
            setMessage('❌ Error scheduling registration closure.');
        } finally{
            setLoading(false);
        }
    };
    const sendConfirmationEmails = async ()=>{
        try {
            setLoading(true);
            setMessage('📧 Preparing confirmation emails...');
            // First, update all registrations with confirmation tokens
            const updatedRegistrations = await Promise.all(registrations.map(async (reg)=>{
                if (!reg.confirmationToken && !reg.isCancelled) {
                    const token = Math.random().toString(36).substr(2, 15) + Date.now().toString(36);
                    await client.models.Registration.update({
                        id: reg.id,
                        confirmationToken: token
                    });
                    return {
                        ...reg,
                        confirmationToken: token
                    };
                }
                return reg;
            }));
            // Filter out cancelled registrations
            const activeRegistrations = updatedRegistrations.filter((reg)=>!reg.isCancelled);
            if (activeRegistrations.length === 0) {
                setMessage('⚠️ No active registrations to send confirmation emails to.');
                return;
            }
            setMessage(`📧 Sending confirmation emails to ${activeRegistrations.length} registrations...`);
            // Note: In a real implementation, you would call the Lambda function here
            // For now, we'll simulate the process
            setTimeout(()=>{
                setMessage(`✅ Sent confirmation emails to ${activeRegistrations.length} registrations! Check the email inboxes.`);
                setTimeout(()=>setMessage(''), 5000);
            }, 2000);
        } catch (error) {
            console.error('Error sending confirmation emails:', error);
            setMessage('❌ Error sending confirmation emails. Please try again.');
        } finally{
            setLoading(false);
        }
    };
    const filteredRegistrations = registrations.filter((reg)=>reg.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || reg.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || reg.email.toLowerCase().includes(searchTerm.toLowerCase()) || reg.phone.includes(searchTerm) || reg.timeSlot.includes(searchTerm));
    const startEdit = (registration)=>{
        setEditingRegistration(registration.id);
        setEditFormData({
            ...registration
        });
    };
    const cancelEdit = ()=>{
        setEditingRegistration(null);
        setEditFormData(null);
    };
    const saveEdit = async ()=>{
        if (!editFormData || !editingRegistration) return;
        try {
            await client.models.Registration.update({
                id: editingRegistration,
                firstName: editFormData.firstName,
                lastName: editFormData.lastName,
                email: editFormData.email,
                phone: editFormData.phone,
                timeSlot: editFormData.timeSlot,
                numberOfKids: editFormData.numberOfKids,
                needsChildcare: editFormData.needsChildcare,
                referredBy: editFormData.referredBy
            });
            await loadData();
            setMessage('Registration updated successfully!');
            cancelEdit();
        } catch (error) {
            console.error('Error updating registration:', error);
            setMessage('Error updating registration.');
        }
    };
    const deleteRegistration = async (id)=>{
        if (!confirm('Are you sure you want to delete this registration?')) return;
        try {
            await client.models.Registration.delete({
                id
            });
            await loadData();
            setMessage('Registration deleted successfully!');
        } catch (error) {
            console.error('Error deleting registration:', error);
            setMessage('Error deleting registration.');
        }
    };
    const exportRegistrations = ()=>{
        const csvContent = [
            [
                'Name',
                'Email',
                'Phone',
                'Time Slot',
                'Number of Kids',
                'Needs Childcare',
                'Referred By',
                'Registration Date'
            ],
            ...registrations.map((reg)=>[
                    `${reg.firstName} ${reg.lastName}`,
                    reg.email,
                    reg.phone,
                    reg.timeSlot,
                    reg.numberOfKids.toString(),
                    reg.needsChildcare ? 'Yes' : 'No',
                    reg.referredBy || '',
                    new Date(reg.registrationDate).toLocaleDateString()
                ])
        ].map((row)=>row.map((cell)=>`"${cell}"`).join(',')).join('\n');
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'christmas-store-registrations.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 rounded-lg mb-8 text-white",
                style: {
                    background: `linear-gradient(135deg, ${BRANDING.primaryColor}, ${BRANDING.secondaryColor})`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-6xl mr-4",
                                children: BRANDING.locationEmoji
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 687,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl font-bold mb-2",
                                        children: "Christmas Store Admin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 689,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg opacity-90",
                                        children: LOCATION_NAME
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 690,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 688,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 686,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center opacity-80",
                        children: "Manage registrations and time slots"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 693,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 684,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 p-4 bg-blue-500 text-white rounded-lg shadow-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-2xl mr-2",
                            children: "ℹ️"
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/page.tsx",
                            lineNumber: 699,
                            columnNumber: 13
                        }, this),
                        message
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/page.tsx",
                    lineNumber: 698,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 697,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-purple-800 flex items-center mb-6",
                        children: "⚙️ Registration Settings"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 707,
                        columnNumber: 9
                    }, this),
                    registrationConfig && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border-2 border-purple-300 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-purple-700 mb-3 flex items-center",
                                        children: "🎯 Registration Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 715,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `px-3 py-2 rounded-lg font-semibold text-center ${registrationConfig.isRegistrationOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`,
                                                children: registrationConfig.isRegistrationOpen ? '✅ OPEN' : '🔴 CLOSED'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 719,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: toggleRegistrationOpen,
                                                disabled: loading,
                                                className: `w-full px-4 py-2 rounded-lg font-semibold transition-all ${registrationConfig.isRegistrationOpen ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'} disabled:opacity-50`,
                                                children: registrationConfig.isRegistrationOpen ? '🔒 Close Registration' : '🔓 Open Registration'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 727,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 718,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 714,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border-2 border-purple-300 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-purple-700 mb-3 flex items-center",
                                        children: "📧 Access Mode"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 743,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `px-3 py-2 rounded-lg font-semibold text-center ${registrationConfig.inviteOnlyMode ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`,
                                                children: registrationConfig.inviteOnlyMode ? '🔐 INVITE ONLY' : '🌐 PUBLIC'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 747,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: toggleInviteOnlyMode,
                                                disabled: loading,
                                                className: `w-full px-4 py-2 rounded-lg font-semibold transition-all ${registrationConfig.inviteOnlyMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-orange-600 hover:bg-orange-700 text-white'} disabled:opacity-50`,
                                                children: registrationConfig.inviteOnlyMode ? '🌐 Enable Public Access' : '🔐 Enable Invite Only'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 755,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 746,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 742,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border-2 border-purple-300 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-purple-700 mb-3 flex items-center",
                                        children: "⏰ Scheduled Closure"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 771,
                                        columnNumber: 15
                                    }, this),
                                    registrationConfig.scheduledCloseDate && registrationConfig.autoCloseEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-3 p-2 bg-yellow-100 text-yellow-800 rounded text-sm",
                                        children: [
                                            "📅 Scheduled: ",
                                            new Date(registrationConfig.scheduledCloseDate).toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 776,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "date",
                                                value: scheduledCloseDate,
                                                onChange: (e)=>setScheduledCloseDate(e.target.value),
                                                className: "w-full px-3 py-2 border-2 border-gray-300 rounded text-sm",
                                                placeholder: "Select date"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 782,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "time",
                                                value: scheduledCloseTime,
                                                onChange: (e)=>setScheduledCloseTime(e.target.value),
                                                className: "w-full px-3 py-2 border-2 border-gray-300 rounded text-sm",
                                                placeholder: "Select time (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 789,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: scheduleRegistrationClosure,
                                                disabled: loading || !scheduledCloseDate,
                                                className: "w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50",
                                                children: "⏰ Schedule Closure"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 796,
                                                columnNumber: 17
                                            }, this),
                                            registrationConfig?.autoCloseEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-2 border-t border-gray-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-gray-600 mb-2",
                                                        children: "🔧 Test scheduled closure (for development)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 806,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: async ()=>{
                                                            try {
                                                                setLoading(true);
                                                                // This would be used to manually trigger the auto-close function
                                                                setMessage('🔄 Checking scheduled closure...');
                                                                // For now, just reload the data to check if it should close
                                                                await loadRegistrationConfig();
                                                                setMessage('✅ Checked scheduled closure');
                                                                setTimeout(()=>setMessage(''), 2000);
                                                            } catch (error) {
                                                                setMessage('❌ Error checking scheduled closure');
                                                            } finally{
                                                                setLoading(false);
                                                            }
                                                        },
                                                        disabled: loading,
                                                        className: "w-full bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs font-medium disabled:opacity-50",
                                                        children: "🔍 Check Now"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 809,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 805,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 781,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 770,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "md:col-span-2 lg:col-span-3 bg-white border-2 border-purple-300 rounded-lg p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-purple-700 mb-3 flex items-center",
                                        children: "💬 Closure Message"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 837,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: customClosureMessage,
                                                onChange: (e)=>setCustomClosureMessage(e.target.value),
                                                className: "w-full px-3 py-2 border-2 border-gray-300 rounded text-sm h-20",
                                                placeholder: "Message shown when registration is closed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 841,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>updateRegistrationStatus('closureMessage', customClosureMessage),
                                                disabled: loading,
                                                className: "bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50",
                                                children: "💾 Save Message"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 847,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 840,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 836,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 712,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 706,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border-2 border-blue-200 rounded-lg p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-bold text-blue-800 flex items-center",
                                        children: "⏰ Time Slot Management"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 864,
                                        columnNumber: 13
                                    }, this),
                                    timeSlots.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: cleanupDuplicateTimeSlots,
                                        disabled: loading,
                                        className: "bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 font-bold disabled:opacity-50",
                                        children: "🧹 Clean Up Duplicates"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 868,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 863,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    timeSlots.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8 bg-white border-2 border-blue-200 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-4xl mb-4",
                                                children: loading ? '🔄' : '⚠️'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 881,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-blue-800 mb-2 text-lg font-semibold",
                                                children: loading ? 'Setting up time slots...' : 'Time slots not found'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 882,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-blue-600 mb-4",
                                                children: loading ? 'Please wait while we initialize the default time slots.' : 'Click the button below to create the default time slots.'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 885,
                                                columnNumber: 17
                                            }, this),
                                            !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-x-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: initializeTimeSlots,
                                                        disabled: loading,
                                                        className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-bold",
                                                        children: "🚀 Create Time Slots"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 893,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: loadData,
                                                        disabled: loading,
                                                        className: "bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold",
                                                        children: "🔄 Refresh Data"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 900,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 892,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 text-xs text-gray-500",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Debug info: timeSlots.length = ",
                                                            timeSlots.length
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 910,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "Loading state: ",
                                                            loading ? 'true' : 'false'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 911,
                                                        columnNumber: 19
                                                    }, this),
                                                    timeSlots.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Time slots found but not displaying - check console"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 912,
                                                        columnNumber: 44
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 909,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 880,
                                        columnNumber: 15
                                    }, this) : timeSlots.map((slot)=>{
                                        const percentage = slot.currentRegistrations / slot.maxCapacity * 100;
                                        const statusColor = percentage >= 100 ? 'bg-red-500' : percentage >= 80 ? 'bg-yellow-500' : 'bg-green-500';
                                        const statusEmoji = percentage >= 100 ? '🔴' : percentage >= 80 ? '🟡' : '🟢';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white border-2 border-blue-300 rounded-lg p-4 hover:shadow-lg transition-all",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            editingTimeSlot === slot.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "time",
                                                                        defaultValue: slot.timeSlot,
                                                                        onBlur: (e)=>updateTimeSlotTime(slot.id, e.target.value),
                                                                        onKeyDown: (e)=>{
                                                                            if (e.key === 'Enter') {
                                                                                updateTimeSlotTime(slot.id, e.currentTarget.value);
                                                                            }
                                                                            if (e.key === 'Escape') {
                                                                                setEditingTimeSlot(null);
                                                                            }
                                                                        },
                                                                        className: "px-3 py-1 border-2 border-blue-400 rounded font-bold text-blue-800",
                                                                        autoFocus: true
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 927,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setEditingTimeSlot(null),
                                                                        className: "text-gray-500 hover:text-gray-700",
                                                                        children: "❌"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 942,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 926,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-xl text-blue-800",
                                                                        children: [
                                                                            statusEmoji,
                                                                            " ",
                                                                            slot.timeSlot
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 951,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>setEditingTimeSlot(slot.id),
                                                                        className: "text-blue-500 hover:text-blue-700",
                                                                        children: "✏️"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 952,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 950,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-blue-600 font-semibold mt-1",
                                                                children: [
                                                                    slot.currentRegistrations,
                                                                    "/",
                                                                    slot.maxCapacity,
                                                                    " registered (",
                                                                    percentage.toFixed(0),
                                                                    "%)"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 960,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full bg-gray-200 rounded-full h-2 mt-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `${statusColor} h-2 rounded-full transition-all`,
                                                                    style: {
                                                                        width: `${Math.min(percentage, 100)}%`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                                    lineNumber: 964,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 963,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 924,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center space-x-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-blue-700 font-bold",
                                                                children: "Max:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 968,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center border-2 border-blue-300 rounded-lg overflow-hidden",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>updateTimeSlotCapacity(slot.id, Math.max(0, slot.maxCapacity - 1)),
                                                                        className: "bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 font-bold text-lg",
                                                                        disabled: loading,
                                                                        children: "−"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 970,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: slot.maxCapacity,
                                                                        onChange: (e)=>{
                                                                            const newValue = parseInt(e.target.value) || 0;
                                                                            if (newValue !== slot.maxCapacity) {
                                                                                updateTimeSlotCapacity(slot.id, newValue);
                                                                            }
                                                                        },
                                                                        onBlur: (e)=>{
                                                                            const newValue = parseInt(e.target.value) || 0;
                                                                            if (newValue !== slot.maxCapacity) {
                                                                                updateTimeSlotCapacity(slot.id, newValue);
                                                                            }
                                                                        },
                                                                        className: "w-20 px-3 py-2 text-center text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 border-0 focus:outline-none",
                                                                        min: "0",
                                                                        step: "1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 977,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>updateTimeSlotCapacity(slot.id, slot.maxCapacity + 1),
                                                                        className: "bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 font-bold text-lg",
                                                                        disabled: loading,
                                                                        children: "+"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 996,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 969,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>deleteTimeSlot(slot.id, slot.timeSlot),
                                                                className: "bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 font-bold",
                                                                disabled: loading,
                                                                children: "🗑️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1004,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 923,
                                                columnNumber: 21
                                            }, this)
                                        }, slot.id, false, {
                                            fileName: "[project]/src/app/admin/page.tsx",
                                            lineNumber: 922,
                                            columnNumber: 19
                                        }, this);
                                    }),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-gray-50 border-2 border-dashed border-blue-300 rounded-lg p-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-700 font-bold",
                                                        children: "➕ Add New Time Slot:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1021,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "time",
                                                        value: newTimeSlot,
                                                        onChange: (e)=>setNewTimeSlot(e.target.value),
                                                        placeholder: "HH:MM",
                                                        className: "px-3 py-2 border-2 border-blue-300 rounded-lg text-gray-900 font-bold focus:ring-2 focus:ring-blue-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1022,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: addNewTimeSlot,
                                                        disabled: loading || !newTimeSlot,
                                                        className: "bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-bold disabled:opacity-50",
                                                        children: "🚀 Add Time Slot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1029,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1020,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 mt-2",
                                                children: "💡 New time slots will start with 20 people capacity"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1037,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1019,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 878,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 862,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-50 border-2 border-green-200 rounded-lg p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-green-800 mb-4 flex items-center",
                                children: "🔗 Generate Invite Link"
                            }, void 0, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 1046,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-green-700 font-bold mb-2",
                                                children: "📧 Email Address (optional)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1051,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                value: inviteEmail,
                                                onChange: (e)=>setInviteEmail(e.target.value),
                                                placeholder: "recipient@example.com",
                                                className: "w-full px-4 py-3 border-2 border-green-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-green-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1054,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1050,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: generateInviteLink,
                                        disabled: loading,
                                        className: "w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 font-bold text-lg",
                                        children: loading ? '⏳ Generating...' : '🚀 Generate Invite Link'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1062,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 1049,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 1045,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 860,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-purple-50 border-2 border-purple-200 rounded-lg p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-purple-800 flex items-center",
                                children: [
                                    "👥 Registration Management (",
                                    filteredRegistrations.length,
                                    " of ",
                                    registrations.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 1076,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex space-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: sendConfirmationEmails,
                                        disabled: loading || registrations.length === 0,
                                        className: "bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-bold flex items-center disabled:opacity-50",
                                        children: loading ? '📧 Sending...' : '📧 Send Confirmation Emails'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: exportRegistrations,
                                        className: "bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-bold flex items-center",
                                        children: "📥 Export CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1087,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 1079,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 1075,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "🔍 Search by name, email, phone, or time slot...",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    className: "w-full px-4 py-3 pl-12 border-2 border-purple-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-purple-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1099,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute left-4 top-3.5 text-purple-500 text-xl",
                                    children: "🔍"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1106,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/page.tsx",
                            lineNumber: 1098,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 1097,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-blue-200 border-2 border-blue-400 p-4 rounded-lg text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl mb-2",
                                        children: "👥"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-blue-800 text-lg",
                                        children: "TOTAL REGISTRATIONS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl font-bold text-blue-900",
                                        children: registrations.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1114,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 1111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-green-200 border-2 border-green-400 p-4 rounded-lg text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl mb-2",
                                        children: "👶"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-green-800 text-lg",
                                        children: "TOTAL CHILDREN"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl font-bold text-green-900",
                                        children: registrations.reduce((sum, reg)=>sum + reg.numberOfKids, 0)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1119,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 1116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-yellow-200 border-2 border-yellow-400 p-4 rounded-lg text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-4xl mb-2",
                                        children: "🍼"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-bold text-yellow-800 text-lg",
                                        children: "NEED CHILDCARE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1125,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl font-bold text-yellow-900",
                                        children: registrations.filter((reg)=>reg.needsChildcare).length
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1126,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 1123,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 1110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: filteredRegistrations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 bg-white border-2 border-purple-200 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-6xl mb-4",
                                    children: "📝"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xl font-bold text-purple-800",
                                    children: "No registrations found"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1136,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-purple-600",
                                    children: "Try adjusting your search terms"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1137,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/page.tsx",
                            lineNumber: 1134,
                            columnNumber: 13
                        }, this) : filteredRegistrations.map((reg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border-2 border-purple-200 rounded-lg p-4 hover:shadow-lg transition-all",
                                children: editingRegistration === reg.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: editFormData?.firstName || '',
                                                    onChange: (e)=>setEditFormData((prev)=>prev ? {
                                                                ...prev,
                                                                firstName: e.target.value
                                                            } : null),
                                                    className: "px-3 py-2 border-2 border-blue-300 rounded-lg font-bold",
                                                    placeholder: "First Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                    lineNumber: 1145,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: editFormData?.lastName || '',
                                                    onChange: (e)=>setEditFormData((prev)=>prev ? {
                                                                ...prev,
                                                                lastName: e.target.value
                                                            } : null),
                                                    className: "px-3 py-2 border-2 border-blue-300 rounded-lg font-bold",
                                                    placeholder: "Last Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                    lineNumber: 1152,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    value: editFormData?.email || '',
                                                    onChange: (e)=>setEditFormData((prev)=>prev ? {
                                                                ...prev,
                                                                email: e.target.value
                                                            } : null),
                                                    className: "px-3 py-2 border-2 border-blue-300 rounded-lg font-bold",
                                                    placeholder: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                    lineNumber: 1159,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    value: editFormData?.phone || '',
                                                    onChange: (e)=>setEditFormData((prev)=>prev ? {
                                                                ...prev,
                                                                phone: e.target.value
                                                            } : null),
                                                    className: "px-3 py-2 border-2 border-blue-300 rounded-lg font-bold",
                                                    placeholder: "Phone"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                    lineNumber: 1166,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: editFormData?.timeSlot || '',
                                                    onChange: (e)=>setEditFormData((prev)=>prev ? {
                                                                ...prev,
                                                                timeSlot: e.target.value
                                                            } : null),
                                                    className: "px-3 py-2 border-2 border-blue-300 rounded-lg font-bold",
                                                    children: [
                                                        '09:00',
                                                        '09:30',
                                                        '10:00',
                                                        '10:30',
                                                        '11:00',
                                                        '11:30'
                                                    ].map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: slot,
                                                            children: slot
                                                        }, slot, false, {
                                                            fileName: "[project]/src/app/admin/page.tsx",
                                                            lineNumber: 1179,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                    lineNumber: 1173,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: editFormData?.numberOfKids || 0,
                                                    onChange: (e)=>setEditFormData((prev)=>prev ? {
                                                                ...prev,
                                                                numberOfKids: parseInt(e.target.value) || 0
                                                            } : null),
                                                    className: "px-3 py-2 border-2 border-blue-300 rounded-lg font-bold",
                                                    placeholder: "Number of Kids",
                                                    min: "0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                    lineNumber: 1182,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/page.tsx",
                                            lineNumber: 1144,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center space-x-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: editFormData?.needsChildcare || false,
                                                        onChange: (e)=>setEditFormData((prev)=>prev ? {
                                                                    ...prev,
                                                                    needsChildcare: e.target.checked
                                                                } : null),
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1193,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-gray-800",
                                                        children: "Needs Childcare"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1199,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1192,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/page.tsx",
                                            lineNumber: 1191,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex space-x-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: saveEdit,
                                                    className: "bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600",
                                                    children: "💾 Save"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                    lineNumber: 1203,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: cancelEdit,
                                                    className: "bg-gray-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-600",
                                                    children: "❌ Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/page.tsx",
                                                    lineNumber: 1206,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/page.tsx",
                                            lineNumber: 1202,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1143,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col md:flex-row md:items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xl font-bold text-purple-900",
                                                        children: [
                                                            reg.firstName,
                                                            " ",
                                                            reg.lastName
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1215,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-purple-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: "📧 Email:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1217,
                                                                        columnNumber: 58
                                                                    }, this),
                                                                    " ",
                                                                    reg.email
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1217,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-purple-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: "📱 Phone:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1218,
                                                                        columnNumber: 58
                                                                    }, this),
                                                                    " ",
                                                                    reg.phone
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1218,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-purple-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: "⏰ Time:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1219,
                                                                        columnNumber: 58
                                                                    }, this),
                                                                    " ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-blue-200 px-2 py-1 rounded font-bold",
                                                                        children: reg.timeSlot
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1219,
                                                                        columnNumber: 101
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1219,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-purple-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: "👶 Kids:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1220,
                                                                        columnNumber: 58
                                                                    }, this),
                                                                    " ",
                                                                    reg.numberOfKids
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1220,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-purple-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: "🍼 Childcare:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1222,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `px-2 py-1 rounded font-bold ml-1 ${reg.needsChildcare ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`,
                                                                        children: reg.needsChildcare ? 'YES' : 'NO'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1223,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1221,
                                                                columnNumber: 27
                                                            }, this),
                                                            reg.referredBy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-purple-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: "👤 Referred:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1228,
                                                                        columnNumber: 60
                                                                    }, this),
                                                                    " ",
                                                                    reg.referredBy
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1228,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-purple-700",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold",
                                                                        children: "📋 Status:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1231,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    reg.isCancelled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-red-200 text-red-800 px-2 py-1 rounded font-bold ml-1",
                                                                        children: "❌ CANCELLED"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1233,
                                                                        columnNumber: 31
                                                                    }, this) : reg.attendanceConfirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-green-200 text-green-800 px-2 py-1 rounded font-bold ml-1",
                                                                        children: "✅ CONFIRMED"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1235,
                                                                        columnNumber: 31
                                                                    }, this) : reg.confirmationToken ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-yellow-200 text-yellow-800 px-2 py-1 rounded font-bold ml-1",
                                                                        children: "⏳ PENDING"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1237,
                                                                        columnNumber: 31
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "bg-gray-200 text-gray-800 px-2 py-1 rounded font-bold ml-1",
                                                                        children: "📝 REGISTERED"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                                        lineNumber: 1239,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1230,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1216,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1214,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex space-x-2 mt-4 md:mt-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>startEdit(reg),
                                                        className: "bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600",
                                                        children: "✏️ Edit"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1245,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>deleteRegistration(reg.id),
                                                        className: "bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600",
                                                        children: "🗑️ Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1248,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1244,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1213,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1212,
                                    columnNumber: 19
                                }, this)
                            }, reg.id, false, {
                                fileName: "[project]/src/app/admin/page.tsx",
                                lineNumber: 1141,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/page.tsx",
                        lineNumber: 1132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 1074,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/page.tsx",
        lineNumber: 683,
        columnNumber: 5
    }, this);
}
const formFields = {
    signIn: {
        username: {
            placeholder: 'Enter your admin email',
            isRequired: true,
            label: '🎄 Admin Email'
        },
        password: {
            placeholder: 'Enter your password',
            isRequired: true,
            label: '🔐 Password'
        }
    }
};
const components = {
    Header () {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mb-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-6xl mb-4",
                    children: "🎄"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/page.tsx",
                    lineNumber: 1283,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold text-green-800 mb-2",
                    children: "Christmas Store"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/page.tsx",
                    lineNumber: 1284,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-semibold text-red-600",
                    children: "Admin Portal"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/page.tsx",
                    lineNumber: 1285,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mt-2",
                    children: "Please sign in to manage registrations"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/page.tsx",
                    lineNumber: 1286,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/admin/page.tsx",
            lineNumber: 1282,
            columnNumber: 7
        }, this);
    },
    Footer () {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mt-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-gray-500",
                children: "🎅 Ho ho ho! Welcome to the Christmas Store Admin Portal 🤶"
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 1293,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/admin/page.tsx",
            lineNumber: 1292,
            columnNumber: 7
        }, this);
    }
};
function AdminPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "df776450b320d8d0",
                children: ".amplify-authenticator{background:linear-gradient(135deg,#f0fdf4 0%,#fef2f2 50%,#f0fdf4 100%);justify-content:center;align-items:center;min-height:100vh;padding:1rem;display:flex}.amplify-authenticator>div{width:100%;max-width:400px}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$ui$2d$react$2f$dist$2f$esm$2f$components$2f$ThemeProvider$2f$ThemeProvider$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
                theme: christmasTheme,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$ui$2d$react$2f$dist$2f$esm$2f$components$2f$Authenticator$2f$Authenticator$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Authenticator"], {
                    formFields: formFields,
                    components: components,
                    hideSignUp: true,
                    socialProviders: [],
                    children: ({ signOut, user })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-df776450b320d8d0" + " " + "min-h-screen bg-gradient-to-br from-green-100 to-red-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-df776450b320d8d0" + " " + "bg-gradient-to-r from-red-600 to-green-600 text-white shadow-lg",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-df776450b320d8d0" + " " + "max-w-7xl mx-auto px-6 py-4 flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-df776450b320d8d0" + " " + "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-df776450b320d8d0" + " " + "text-3xl mr-4",
                                                        children: "🎄"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1330,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-df776450b320d8d0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                className: "jsx-df776450b320d8d0" + " " + "text-2xl font-bold",
                                                                children: "Christmas Store Admin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1332,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-df776450b320d8d0" + " " + "text-red-100",
                                                                children: [
                                                                    "Welcome, ",
                                                                    user?.signInDetails?.loginId
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/admin/page.tsx",
                                                                lineNumber: 1333,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/admin/page.tsx",
                                                        lineNumber: 1331,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1329,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: signOut,
                                                className: "jsx-df776450b320d8d0" + " " + "bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100 font-bold flex items-center",
                                                children: "🚪 Sign Out"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/page.tsx",
                                                lineNumber: 1336,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1328,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1327,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-df776450b320d8d0" + " " + "py-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminDashboard, {}, void 0, false, {
                                        fileName: "[project]/src/app/admin/page.tsx",
                                        lineNumber: 1345,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/admin/page.tsx",
                                    lineNumber: 1344,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/page.tsx",
                            lineNumber: 1326,
                            columnNumber: 13
                        }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/page.tsx",
                    lineNumber: 1319,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/page.tsx",
                lineNumber: 1318,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2e8ee3b8._.js.map