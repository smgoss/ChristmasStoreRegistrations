(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/amplify_outputs.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"auth\":{\"user_pool_id\":\"us-east-1_vwgchbYC8\",\"aws_region\":\"us-east-1\",\"user_pool_client_id\":\"1dsj6m1frqcp4lq23aeie2kaea\",\"identity_pool_id\":\"us-east-1:ce2d84ed-1506-42b9-8394-2e402b5fd311\",\"mfa_methods\":[],\"standard_required_attributes\":[\"email\"],\"username_attributes\":[\"email\"],\"user_verification_types\":[\"email\"],\"groups\":[{\"admin\":{\"precedence\":0}}],\"mfa_configuration\":\"NONE\",\"password_policy\":{\"min_length\":8,\"require_lowercase\":true,\"require_numbers\":true,\"require_symbols\":true,\"require_uppercase\":true},\"unauthenticated_identities_enabled\":true},\"data\":{\"url\":\"https://ps5sezumsvcmloznr4nryeodka.appsync-api.us-east-1.amazonaws.com/graphql\",\"aws_region\":\"us-east-1\",\"api_key\":\"da2-aiwlbul6rrhxflgxabtagr7kfa\",\"default_authorization_type\":\"API_KEY\",\"authorization_types\":[\"AMAZON_COGNITO_USER_POOLS\",\"AWS_IAM\"],\"model_introspection\":{\"version\":1,\"models\":{\"Registration\":{\"name\":\"Registration\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"firstName\":{\"name\":\"firstName\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"lastName\":{\"name\":\"lastName\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"email\":{\"name\":\"email\",\"isArray\":false,\"type\":\"AWSEmail\",\"isRequired\":true,\"attributes\":[]},\"phone\":{\"name\":\"phone\",\"isArray\":false,\"type\":\"AWSPhone\",\"isRequired\":true,\"attributes\":[]},\"numberOfKids\":{\"name\":\"numberOfKids\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":true,\"attributes\":[]},\"children\":{\"name\":\"children\",\"isArray\":true,\"type\":{\"model\":\"Child\"},\"isRequired\":false,\"attributes\":[],\"isArrayNullable\":true,\"association\":{\"connectionType\":\"HAS_MANY\",\"associatedWith\":[\"registrationId\"]}},\"timeSlot\":{\"name\":\"timeSlot\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"needsChildcare\":{\"name\":\"needsChildcare\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":true,\"attributes\":[]},\"referredBy\":{\"name\":\"referredBy\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"inviteToken\":{\"name\":\"inviteToken\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"inviteUsed\":{\"name\":\"inviteUsed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"isConfirmed\":{\"name\":\"isConfirmed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"registrationDate\":{\"name\":\"registrationDate\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"attendanceConfirmed\":{\"name\":\"attendanceConfirmed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"attendanceConfirmedAt\":{\"name\":\"attendanceConfirmedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"isCancelled\":{\"name\":\"isCancelled\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"cancelledAt\":{\"name\":\"cancelledAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"confirmationToken\":{\"name\":\"confirmationToken\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"Registrations\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\",\"create\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"Child\":{\"name\":\"Child\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"registrationId\":{\"name\":\"registrationId\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"age\":{\"name\":\"age\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"gender\":{\"name\":\"gender\",\"isArray\":false,\"type\":{\"enum\":\"ChildGender\"},\"isRequired\":false,\"attributes\":[]},\"registration\":{\"name\":\"registration\",\"isArray\":false,\"type\":{\"model\":\"Registration\"},\"isRequired\":false,\"attributes\":[],\"association\":{\"connectionType\":\"BELONGS_TO\",\"targetNames\":[\"registrationId\"]}},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"Children\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\",\"create\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"TimeSlotConfig\":{\"name\":\"TimeSlotConfig\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"timeSlot\":{\"name\":\"timeSlot\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"maxCapacity\":{\"name\":\"maxCapacity\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":true,\"attributes\":[]},\"currentRegistrations\":{\"name\":\"currentRegistrations\",\"isArray\":false,\"type\":\"Int\",\"isRequired\":false,\"attributes\":[]},\"isActive\":{\"name\":\"isActive\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"TimeSlotConfigs\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"InviteLink\":{\"name\":\"InviteLink\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"ID\",\"isRequired\":true,\"attributes\":[]},\"token\":{\"name\":\"token\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"email\":{\"name\":\"email\",\"isArray\":false,\"type\":\"AWSEmail\",\"isRequired\":false,\"attributes\":[]},\"isUsed\":{\"name\":\"isUsed\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"usedAt\":{\"name\":\"usedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"InviteLinks\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}},\"RegistrationConfig\":{\"name\":\"RegistrationConfig\",\"fields\":{\"id\":{\"name\":\"id\",\"isArray\":false,\"type\":\"String\",\"isRequired\":true,\"attributes\":[]},\"isRegistrationOpen\":{\"name\":\"isRegistrationOpen\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"inviteOnlyMode\":{\"name\":\"inviteOnlyMode\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"scheduledCloseDate\":{\"name\":\"scheduledCloseDate\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"autoCloseEnabled\":{\"name\":\"autoCloseEnabled\",\"isArray\":false,\"type\":\"Boolean\",\"isRequired\":false,\"attributes\":[]},\"closureMessage\":{\"name\":\"closureMessage\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"updatedBy\":{\"name\":\"updatedBy\",\"isArray\":false,\"type\":\"String\",\"isRequired\":false,\"attributes\":[]},\"updatedAt\":{\"name\":\"updatedAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[]},\"createdAt\":{\"name\":\"createdAt\",\"isArray\":false,\"type\":\"AWSDateTime\",\"isRequired\":false,\"attributes\":[],\"isReadOnly\":true}},\"syncable\":true,\"pluralName\":\"RegistrationConfigs\",\"attributes\":[{\"type\":\"model\",\"properties\":{}},{\"type\":\"key\",\"properties\":{\"fields\":[\"id\"]}},{\"type\":\"auth\",\"properties\":{\"rules\":[{\"allow\":\"public\",\"provider\":\"apiKey\",\"operations\":[\"read\"]},{\"groupClaim\":\"cognito:groups\",\"provider\":\"userPools\",\"allow\":\"groups\",\"operations\":[\"read\",\"create\",\"update\",\"delete\"],\"groups\":[\"admin\"]}]}}],\"primaryKeyInfo\":{\"isCustomPrimaryKey\":false,\"primaryKeyFieldName\":\"id\",\"sortKeyFieldNames\":[]}}},\"enums\":{\"ChildGender\":{\"name\":\"ChildGender\",\"values\":[\"boy\",\"girl\"]}},\"nonModels\":{}}},\"version\":\"1.4\"}"));}),
"[project]/src/components/RegistrationForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegistrationForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$api$2f$dist$2f$esm$2f$API$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@aws-amplify/api/dist/esm/API.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aws$2d$amplify$2f$dist$2f$esm$2f$initSingleton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__DefaultAmplify__as__Amplify$3e$__ = __turbopack_context__.i("[project]/node_modules/aws-amplify/dist/esm/initSingleton.mjs [app-client] (ecmascript) <export DefaultAmplify as Amplify>");
var __TURBOPACK__imported__module__$5b$project$5d2f$amplify_outputs$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/amplify_outputs.json (json)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aws$2d$amplify$2f$dist$2f$esm$2f$initSingleton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__DefaultAmplify__as__Amplify$3e$__["Amplify"].configure(__TURBOPACK__imported__module__$5b$project$5d2f$amplify_outputs$2e$json__$28$json$29$__["default"]);
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$api$2f$dist$2f$esm$2f$API$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateClient"])();
function RegistrationForm() {
    let { inviteToken, onRegistrationComplete, prefillEmail } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        firstName: '',
        lastName: '',
        email: prefillEmail || '',
        phone: '',
        numberOfKids: 0,
        timeSlot: '',
        needsChildcare: false,
        referredBy: '',
        children: []
    });
    const [timeSlotCapacities, setTimeSlotCapacities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [registrationConfig, setRegistrationConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [configLoading, setConfigLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegistrationForm.useEffect": ()=>{
            // Load time slot capacities and registration config
            loadTimeSlotCapacities();
            loadRegistrationConfig();
        }
    }["RegistrationForm.useEffect"], []);
    const loadRegistrationConfig = async ()=>{
        try {
            setConfigLoading(true);
            const { data: configData } = await client.models.RegistrationConfig.list();
            const config = configData === null || configData === void 0 ? void 0 : configData[0];
            setRegistrationConfig(config);
            // Check if we need to auto-close based on scheduled date
            if ((config === null || config === void 0 ? void 0 : config.autoCloseEnabled) && config.scheduledCloseDate) {
                const now = new Date();
                const scheduledDate = new Date(config.scheduledCloseDate);
                if (now >= scheduledDate && config.isRegistrationOpen) {
                    // Auto-close registration
                    await client.models.RegistrationConfig.update({
                        id: config.id,
                        isRegistrationOpen: false,
                        updatedAt: new Date().toISOString()
                    });
                    setRegistrationConfig((prev)=>prev ? {
                            ...prev,
                            isRegistrationOpen: false
                        } : null);
                }
            }
        } catch (error) {
            console.error('Error loading registration config:', error);
        } finally{
            setConfigLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegistrationForm.useEffect": ()=>{
            // Update children array when numberOfKids changes
            const newChildren = [];
            for(let i = 0; i < formData.numberOfKids; i++){
                newChildren.push(formData.children[i] || {
                    age: '',
                    gender: 'boy'
                });
            }
            setFormData({
                "RegistrationForm.useEffect": (prev)=>({
                        ...prev,
                        children: newChildren
                    })
            }["RegistrationForm.useEffect"]);
        }
    }["RegistrationForm.useEffect"], [
        formData.numberOfKids
    ]); // eslint-disable-line react-hooks/exhaustive-deps
    const loadTimeSlotCapacities = async ()=>{
        try {
            // Load time slot configurations
            const { data: timeSlotData } = await client.models.TimeSlotConfig.list();
            // Load all registrations to calculate actual counts
            const { data: registrationData } = await client.models.Registration.list();
            const capacities = {};
            timeSlotData.forEach((config)=>{
                // Calculate actual registration count for this time slot
                const actualCount = registrationData ? registrationData.filter((reg)=>reg.timeSlot === config.timeSlot && !reg.isCancelled).length : 0;
                capacities[config.timeSlot] = {
                    max: config.maxCapacity || 0,
                    current: actualCount
                };
            });
            setTimeSlotCapacities(capacities);
        } catch (error) {
            console.error('Error loading time slot capacities:', error);
        }
    };
    const validateForm = async ()=>{
        const newErrors = {};
        // Check registration status first
        if (!(registrationConfig === null || registrationConfig === void 0 ? void 0 : registrationConfig.isRegistrationOpen)) {
            newErrors.general = (registrationConfig === null || registrationConfig === void 0 ? void 0 : registrationConfig.closureMessage) || 'Registration is currently closed.';
            setErrors(newErrors);
            return false;
        }
        // Check invite-only mode
        if ((registrationConfig === null || registrationConfig === void 0 ? void 0 : registrationConfig.inviteOnlyMode) && !inviteToken) {
            newErrors.general = 'Registration is currently invite-only. Please use the invite link you received.';
            setErrors(newErrors);
            return false;
        }
        // If in invite-only mode, validate the invite token
        if ((registrationConfig === null || registrationConfig === void 0 ? void 0 : registrationConfig.inviteOnlyMode) && inviteToken) {
            try {
                const { data: inviteData } = await client.models.InviteLink.list({
                    filter: {
                        token: {
                            eq: inviteToken
                        }
                    }
                });
                const invite = inviteData === null || inviteData === void 0 ? void 0 : inviteData[0];
                if (!invite) {
                    newErrors.general = 'Invalid invite link. Please contact us for assistance.';
                    setErrors(newErrors);
                    return false;
                }
                if (invite.isUsed) {
                    newErrors.general = 'This invite link has already been used.';
                    setErrors(newErrors);
                    return false;
                }
            } catch (error) {
                console.error('Error validating invite token:', error);
                newErrors.general = 'Error validating invite. Please try again.';
                setErrors(newErrors);
                return false;
            }
        }
        // Basic validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
        if (formData.numberOfKids < 0) {
            newErrors.numberOfKids = 'Number of kids cannot be negative';
        }
        // Validate children info if numberOfKids > 0
        if (formData.numberOfKids > 0) {
            formData.children.forEach((child, index)=>{
                if (child.age !== '<1' && (typeof child.age !== 'number' || child.age < 1 || child.age > 18)) {
                    newErrors["child_".concat(index, "_age")] = 'Please select a valid age';
                }
            });
        }
        // Check for duplicate email
        try {
            const { data: existingRegistrations } = await client.models.Registration.list({
                filter: {
                    email: {
                        eq: formData.email
                    }
                }
            });
            if (existingRegistrations.length > 0) {
                newErrors.email = 'Someone is already registered with this email address';
            }
        } catch (error) {
            console.error('Error checking email:', error);
        }
        // Check for duplicate phone
        try {
            const { data: existingRegistrations } = await client.models.Registration.list({
                filter: {
                    phone: {
                        eq: formData.phone
                    }
                }
            });
            if (existingRegistrations.length > 0) {
                newErrors.phone = 'Someone is already registered with this phone number';
            }
        } catch (error) {
            console.error('Error checking phone:', error);
        }
        // Check time slot availability
        const slotCapacity = timeSlotCapacities[formData.timeSlot];
        if (slotCapacity && slotCapacity.current >= slotCapacity.max) {
            newErrors.timeSlot = 'This time slot is full';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const isValid = await validateForm();
            if (!isValid) {
                setLoading(false);
                return;
            }
            // Create registration
            const registrationResult = await client.models.Registration.create({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                numberOfKids: formData.numberOfKids,
                timeSlot: formData.timeSlot,
                needsChildcare: formData.needsChildcare,
                referredBy: formData.referredBy || undefined,
                inviteToken: inviteToken,
                registrationDate: new Date().toISOString()
            });
            if (registrationResult.data) {
                // Create child records
                if (formData.numberOfKids > 0) {
                    await Promise.all(formData.children.map((child)=>client.models.Child.create({
                            registrationId: registrationResult.data.id,
                            age: child.age,
                            gender: child.gender
                        })));
                }
                // Note: Time slot capacity is now calculated dynamically, no need to update manually
                setSubmitted(true);
                // Call completion callback for invite tokens
                if (onRegistrationComplete) {
                    onRegistrationComplete();
                }
            }
        } catch (error) {
            console.error('Error submitting registration:', error);
            setErrors({
                submit: 'An error occurred while submitting your registration. Please try again.'
            });
        } finally{
            setLoading(false);
        }
    };
    if (submitted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-green-600 mb-4",
                        children: "Registration Successful!"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-4",
                        children: "Thank you for registering for the Christmas Store. You will receive a confirmation email shortly."
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 302,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-50 p-4 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Name:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 306,
                                        columnNumber: 42
                                    }, this),
                                    " ",
                                    formData.firstName,
                                    " ",
                                    formData.lastName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 306,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Email:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 307,
                                        columnNumber: 42
                                    }, this),
                                    " ",
                                    formData.email
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Time Slot:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 308,
                                        columnNumber: 42
                                    }, this),
                                    " ",
                                    formData.timeSlot
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Number of Children:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 309,
                                        columnNumber: 42
                                    }, this),
                                    " ",
                                    formData.numberOfKids
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 309,
                                columnNumber: 13
                            }, this),
                            formData.needsChildcare && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Childcare:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 310,
                                        columnNumber: 70
                                    }, this),
                                    " Yes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 310,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 300,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RegistrationForm.tsx",
            lineNumber: 299,
            columnNumber: 7
        }, this);
    }
    // Show loading state while checking registration config
    if (configLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-4",
                        children: "🔄"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 322,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-gray-700",
                        children: "Checking registration status..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 323,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 321,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RegistrationForm.tsx",
            lineNumber: 320,
            columnNumber: 7
        }, this);
    }
    // Show registration closed message if registration is not open
    if (!(registrationConfig === null || registrationConfig === void 0 ? void 0 : registrationConfig.isRegistrationOpen)) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-4",
                        children: "🔒"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 334,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-red-600 mb-4",
                        children: "Registration Closed"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 335,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 p-6 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-800",
                            children: (registrationConfig === null || registrationConfig === void 0 ? void 0 : registrationConfig.closureMessage) || 'Registration is currently closed. Please check back later.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/RegistrationForm.tsx",
                            lineNumber: 337,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 336,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-6 pt-6 border-t border-gray-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500",
                            children: "🎅 Questions? Contact us and we'll be happy to help! 🤶"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RegistrationForm.tsx",
                            lineNumber: 342,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 341,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 333,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RegistrationForm.tsx",
            lineNumber: 332,
            columnNumber: 7
        }, this);
    }
    // Show invite-only message if registration is invite-only and no token provided
    if ((registrationConfig === null || registrationConfig === void 0 ? void 0 : registrationConfig.inviteOnlyMode) && !inviteToken) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-4",
                        children: "📧"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-orange-600 mb-4",
                        children: "Invite Only Registration"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-orange-50 p-6 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-orange-800 mb-4",
                                children: "Registration is currently limited to invited participants only."
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-orange-700",
                                children: "If you received an invitation email, please click the registration link in that email to continue."
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 362,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 358,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-6 pt-6 border-t border-gray-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500",
                            children: "🎅 Questions about invitations? Contact us and we'll be happy to help! 🤶"
                        }, void 0, false, {
                            fileName: "[project]/src/components/RegistrationForm.tsx",
                            lineNumber: 367,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 355,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RegistrationForm.tsx",
            lineNumber: 354,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-6xl mb-4",
                        children: BRANDING.locationEmoji
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mb-2",
                        style: {
                            color: BRANDING.primaryColor
                        },
                        children: "Christmas Store Registration"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold mb-2",
                        style: {
                            color: BRANDING.secondaryColor
                        },
                        children: LOCATION_NAME
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: LOCATION_ADDRESS
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 378,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-6",
                children: [
                    errors.submit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 p-4 rounded-lg text-red-600",
                        children: errors.submit
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 391,
                        columnNumber: 11
                    }, this),
                    errors.general && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 p-4 rounded-lg text-red-600",
                        children: errors.general
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "First Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 400,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.firstName,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    firstName: e.target.value
                                                })),
                                        className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 403,
                                        columnNumber: 13
                                    }, this),
                                    errors.firstName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-sm mt-1",
                                        children: errors.firstName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 410,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 399,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Last Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 414,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: formData.lastName,
                                        onChange: (e)=>setFormData((prev)=>({
                                                    ...prev,
                                                    lastName: e.target.value
                                                })),
                                        className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 417,
                                        columnNumber: 13
                                    }, this),
                                    errors.lastName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-sm mt-1",
                                        children: errors.lastName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 424,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 413,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Email Address *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                value: formData.email,
                                onChange: (e)=>setFormData((prev)=>({
                                            ...prev,
                                            email: e.target.value
                                        })),
                                className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 432,
                                columnNumber: 11
                            }, this),
                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm mt-1",
                                children: errors.email
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 439,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 428,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Phone Number *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 443,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "tel",
                                value: formData.phone,
                                onChange: (e)=>setFormData((prev)=>({
                                            ...prev,
                                            phone: e.target.value
                                        })),
                                className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 446,
                                columnNumber: 11
                            }, this),
                            errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm mt-1",
                                children: errors.phone
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 453,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Number of Children (18 and under) *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: "0",
                                max: "20",
                                value: formData.numberOfKids,
                                onChange: (e)=>setFormData((prev)=>({
                                            ...prev,
                                            numberOfKids: parseInt(e.target.value) || 0
                                        })),
                                className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 460,
                                columnNumber: 11
                            }, this),
                            errors.numberOfKids && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm mt-1",
                                children: errors.numberOfKids
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 469,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 456,
                        columnNumber: 9
                    }, this),
                    formData.numberOfKids > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium text-gray-900 mb-3",
                                children: "Children Information"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: formData.children.map((child, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                        children: [
                                                            "Child ",
                                                            index + 1,
                                                            " Age"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: child.age,
                                                        onChange: (e)=>{
                                                            const newChildren = [
                                                                ...formData.children
                                                            ];
                                                            const value = e.target.value;
                                                            newChildren[index].age = value === '<1' ? '<1' : parseInt(value);
                                                            setFormData((prev)=>({
                                                                    ...prev,
                                                                    children: newChildren
                                                                }));
                                                        },
                                                        className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                                        required: true,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                children: "Select age"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                                lineNumber: 493,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "<1",
                                                                children: "<1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                                lineNumber: 494,
                                                                columnNumber: 23
                                                            }, this),
                                                            Array.from({
                                                                length: 18
                                                            }, (_, i)=>i + 1).map((age)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: age,
                                                                    children: age
                                                                }, age, false, {
                                                                    fileName: "[project]/src/components/RegistrationForm.tsx",
                                                                    lineNumber: 496,
                                                                    columnNumber: 25
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                                        lineNumber: 482,
                                                        columnNumber: 21
                                                    }, this),
                                                    errors["child_".concat(index, "_age")] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-red-500 text-sm mt-1",
                                                        children: errors["child_".concat(index, "_age")]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                lineNumber: 478,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                                        children: [
                                                            "Child ",
                                                            index + 1,
                                                            " Gender"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: child.gender,
                                                        onChange: (e)=>{
                                                            const newChildren = [
                                                                ...formData.children
                                                            ];
                                                            newChildren[index].gender = e.target.value;
                                                            setFormData((prev)=>({
                                                                    ...prev,
                                                                    children: newChildren
                                                                }));
                                                        },
                                                        className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                                        required: true,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "boy",
                                                                children: "Boy"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                                lineNumber: 517,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "girl",
                                                                children: "Girl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                                lineNumber: 518,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                                        lineNumber: 507,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                lineNumber: 503,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 477,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 475,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Preferred Time Slot *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 528,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: formData.timeSlot,
                                onChange: (e)=>setFormData((prev)=>({
                                            ...prev,
                                            timeSlot: e.target.value
                                        })),
                                className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                required: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select a time slot"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 537,
                                        columnNumber: 13
                                    }, this),
                                    TIME_SLOTS.map((slot)=>{
                                        const capacity = timeSlotCapacities[slot];
                                        const isFull = capacity && capacity.current >= capacity.max;
                                        const availableText = capacity ? " (".concat(capacity.current, "/").concat(capacity.max, " registered)") : '';
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: slot,
                                            disabled: isFull,
                                            children: [
                                                slot,
                                                availableText,
                                                isFull ? ' - FULL' : ''
                                            ]
                                        }, slot, true, {
                                            fileName: "[project]/src/components/RegistrationForm.tsx",
                                            lineNumber: 544,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this),
                            errors.timeSlot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm mt-1",
                                children: errors.timeSlot
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 550,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 527,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: formData.needsChildcare,
                                    onChange: (e)=>setFormData((prev)=>({
                                                ...prev,
                                                needsChildcare: e.target.checked
                                            })),
                                    className: "rounded border-gray-300 text-red-600 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RegistrationForm.tsx",
                                    lineNumber: 555,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-gray-700",
                                    children: "I need childcare during my shopping time"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RegistrationForm.tsx",
                                    lineNumber: 561,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RegistrationForm.tsx",
                            lineNumber: 554,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 553,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Were you referred by any agency or person? (optional)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 568,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: formData.referredBy,
                                onChange: (e)=>setFormData((prev)=>({
                                            ...prev,
                                            referredBy: e.target.value
                                        })),
                                className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                placeholder: "Agency name or person's name"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 571,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 567,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "w-full py-3 px-6 rounded-md font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                        style: {
                            backgroundColor: BRANDING.primaryColor,
                            ':hover': {
                                backgroundColor: BRANDING.secondaryColor
                            }
                        },
                        children: loading ? 'Submitting...' : '🎁 Register for Christmas Store'
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-8 pt-6 border-t border-gray-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-gray-800 mb-2",
                                        children: "Questions?"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 594,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 mb-1",
                                        children: [
                                            "📧 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "mailto:".concat(CONTACT_EMAIL),
                                                className: "text-blue-600 hover:underline",
                                                children: CONTACT_EMAIL
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                lineNumber: 596,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 595,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 mb-1",
                                        children: [
                                            "📞 ",
                                            CHURCH_INFO.phone
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 600,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600",
                                        children: [
                                            "🌐 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: CHURCH_INFO.website,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "text-blue-600 hover:underline",
                                                children: "pathwayvineyard.com"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                lineNumber: 604,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 603,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 593,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500",
                                children: "🎅 Thank you for being part of our Christmas Store community! 🤶"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 609,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 592,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 389,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RegistrationForm.tsx",
        lineNumber: 377,
        columnNumber: 5
    }, this);
}
_s(RegistrationForm, "wl3h1u5i61AW+c4ocT0ICqXkkj4=");
_c = RegistrationForm;
var _c;
__turbopack_context__.k.register(_c, "RegistrationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_2952d93d._.js.map