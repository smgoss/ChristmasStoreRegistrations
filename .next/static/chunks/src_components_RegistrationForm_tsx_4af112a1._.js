(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// Ensure Amplify is configured
const amplifyConfig = {
    "auth": {
        "user_pool_id": "us-east-1_vwgchbYC8",
        "aws_region": "us-east-1",
        "user_pool_client_id": "1dsj6m1frqcp4lq23aeie2kaea",
        "identity_pool_id": "us-east-1:ce2d84ed-1506-42b9-8394-2e402b5fd311",
        "mfa_methods": [],
        "standard_required_attributes": [
            "email"
        ],
        "username_attributes": [
            "email"
        ],
        "user_verification_types": [
            "email"
        ],
        "groups": [
            {
                "admin": {
                    "precedence": 0
                }
            }
        ],
        "mfa_configuration": "NONE",
        "password_policy": {
            "min_length": 8,
            "require_lowercase": true,
            "require_numbers": true,
            "require_symbols": true,
            "require_uppercase": true
        },
        "unauthenticated_identities_enabled": true
    },
    "data": {
        "url": "https://ps5sezumsvcmloznr4nryeodka.appsync-api.us-east-1.amazonaws.com/graphql",
        "aws_region": "us-east-1",
        "api_key": "da2-aiwlbul6rrhxflgxabtagr7kfa",
        "default_authorization_type": "API_KEY",
        "authorization_types": [
            "AMAZON_COGNITO_USER_POOLS",
            "AWS_IAM"
        ]
    },
    "version": "1.4"
};
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$aws$2d$amplify$2f$dist$2f$esm$2f$initSingleton$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__DefaultAmplify__as__Amplify$3e$__["Amplify"].configure(amplifyConfig);
const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$amplify$2f$api$2f$dist$2f$esm$2f$API$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateClient"])();
const TIME_SLOTS = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30'
];
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegistrationForm.useEffect": ()=>{
            // Load time slot capacities
            loadTimeSlotCapacities();
        }
    }["RegistrationForm.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RegistrationForm.useEffect": ()=>{
            // Update children array when numberOfKids changes
            const newChildren = [];
            for(let i = 0; i < formData.numberOfKids; i++){
                newChildren.push(formData.children[i] || {
                    age: 1,
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
            const { data } = await client.models.TimeSlotConfig.list();
            const capacities = {};
            data.forEach((config)=>{
                capacities[config.timeSlot] = {
                    max: config.maxCapacity || 0,
                    current: config.currentRegistrations || 0
                };
            });
            setTimeSlotCapacities(capacities);
        } catch (error) {
            console.error('Error loading time slot capacities:', error);
        }
    };
    const validateForm = async ()=>{
        const newErrors = {};
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
                if (child.age < 1 || child.age > 18) {
                    newErrors["child_".concat(index, "_age")] = 'Age must be between 1 and 18';
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
                // Update time slot capacity
                const currentSlot = timeSlotCapacities[formData.timeSlot];
                if (currentSlot) {
                    // Find and update the time slot config
                    const { data: timeSlotConfigs } = await client.models.TimeSlotConfig.list({
                        filter: {
                            timeSlot: {
                                eq: formData.timeSlot
                            }
                        }
                    });
                    if (timeSlotConfigs[0]) {
                        await client.models.TimeSlotConfig.update({
                            id: timeSlotConfigs[0].id,
                            currentRegistrations: currentSlot.current + 1
                        });
                    }
                }
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
                        lineNumber: 262,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-4",
                        children: "Thank you for registering for the Christmas Store. You will receive a confirmation email shortly."
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-green-50 p-4 rounded-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Name:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 267,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    formData.firstName,
                                    " ",
                                    formData.lastName
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Email:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 268,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    formData.email
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Time Slot:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 269,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    formData.timeSlot
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Number of Children:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 270,
                                        columnNumber: 16
                                    }, this),
                                    " ",
                                    formData.numberOfKids
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 270,
                                columnNumber: 13
                            }, this),
                            formData.needsChildcare && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Childcare:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 271,
                                        columnNumber: 44
                                    }, this),
                                    " Yes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 271,
                                columnNumber: 41
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 266,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 261,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/RegistrationForm.tsx",
            lineNumber: 260,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold text-center mb-6 text-red-600",
                children: "Christmas Store Registration"
            }, void 0, false, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 280,
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
                        lineNumber: 284,
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
                                        lineNumber: 289,
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
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this),
                                    errors.firstName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-sm mt-1",
                                        children: errors.firstName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 299,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm font-medium text-gray-700 mb-1",
                                        children: "Last Name *"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 303,
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
                                        lineNumber: 306,
                                        columnNumber: 13
                                    }, this),
                                    errors.lastName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-500 text-sm mt-1",
                                        children: errors.lastName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 313,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Email Address *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 318,
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
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm mt-1",
                                children: errors.email
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 328,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Phone Number *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 332,
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
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm mt-1",
                                children: errors.phone
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 342,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Number of Children (18 and under) *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 346,
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
                                lineNumber: 349,
                                columnNumber: 11
                            }, this),
                            errors.numberOfKids && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm mt-1",
                                children: errors.numberOfKids
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 358,
                                columnNumber: 35
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    formData.numberOfKids > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium text-gray-900 mb-3",
                                children: "Children Information"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 363,
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
                                                        lineNumber: 368,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: "1",
                                                        max: "18",
                                                        value: child.age,
                                                        onChange: (e)=>{
                                                            const newChildren = [
                                                                ...formData.children
                                                            ];
                                                            newChildren[index].age = parseInt(e.target.value) || 1;
                                                            setFormData((prev)=>({
                                                                    ...prev,
                                                                    children: newChildren
                                                                }));
                                                        },
                                                        className: "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 21
                                                    }, this),
                                                    errors["child_".concat(index, "_age")] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-red-500 text-sm mt-1",
                                                        children: errors["child_".concat(index, "_age")]
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                lineNumber: 367,
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
                                                        lineNumber: 389,
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
                                                                lineNumber: 402,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "girl",
                                                                children: "Girl"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                                lineNumber: 403,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                                lineNumber: 388,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/components/RegistrationForm.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 362,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Preferred Time Slot *"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 413,
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
                                        lineNumber: 422,
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
                                            lineNumber: 429,
                                            columnNumber: 17
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 416,
                                columnNumber: 11
                            }, this),
                            errors.timeSlot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-red-500 text-sm mt-1",
                                children: errors.timeSlot
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 435,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 412,
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
                                    lineNumber: 440,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-gray-700",
                                    children: "I need childcare during my shopping time"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RegistrationForm.tsx",
                                    lineNumber: 446,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RegistrationForm.tsx",
                            lineNumber: 439,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 438,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm font-medium text-gray-700 mb-1",
                                children: "Were you referred by any agency or person? (optional)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/RegistrationForm.tsx",
                                lineNumber: 453,
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
                                lineNumber: 456,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                        children: loading ? 'Submitting...' : 'Register for Christmas Store'
                    }, void 0, false, {
                        fileName: "[project]/src/components/RegistrationForm.tsx",
                        lineNumber: 465,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RegistrationForm.tsx",
                lineNumber: 282,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RegistrationForm.tsx",
        lineNumber: 279,
        columnNumber: 5
    }, this);
}
_s(RegistrationForm, "Y6RhL2ROirqBeWr/sdk3jQnjRgc=");
_c = RegistrationForm;
var _c;
__turbopack_context__.k.register(_c, "RegistrationForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_RegistrationForm_tsx_4af112a1._.js.map