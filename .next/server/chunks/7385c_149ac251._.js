module.exports = [
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/shared-ini-file-loader/dist-es/mergeConfigFiles.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeConfigFiles",
    ()=>mergeConfigFiles
]);
const mergeConfigFiles = (...files)=>{
    const merged = {};
    for (const file of files){
        for (const [key, values] of Object.entries(file)){
            if (merged[key] !== undefined) {
                Object.assign(merged[key], values);
            } else {
                merged[key] = values;
            }
        }
    }
    return merged;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/shared-ini-file-loader/dist-es/parseKnownFiles.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseKnownFiles",
    ()=>parseKnownFiles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/shared-ini-file-loader/dist-es/loadSharedConfigFiles.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$mergeConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/shared-ini-file-loader/dist-es/mergeConfigFiles.js [app-route] (ecmascript)");
;
;
const parseKnownFiles = async (init)=>{
    const parsedFiles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$loadSharedConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadSharedConfigFiles"])(init);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$mergeConfigFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mergeConfigFiles"])(parsedFiles.configFile, parsedFiles.credentialsFile);
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveCredentialSource.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveCredentialSource",
    ()=>resolveCredentialSource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$chain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/property-provider/dist-es/chain.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)");
;
;
const resolveCredentialSource = (credentialSource, profileName, logger)=>{
    const sourceProvidersMap = {
        EcsContainer: async (options)=>{
            const { fromHttp } = await __turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-http/dist-es/index.js [app-route] (ecmascript, async loader)");
            const { fromContainerMetadata } = await __turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/credential-provider-imds/dist-es/index.js [app-route] (ecmascript, async loader)");
            logger?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer");
            return async ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$chain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["chain"])(fromHttp(options ?? {}), fromContainerMetadata(options))().then(setNamedProvider);
        },
        Ec2InstanceMetadata: async (options)=>{
            logger?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
            const { fromInstanceMetadata } = await __turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/credential-provider-imds/dist-es/index.js [app-route] (ecmascript, async loader)");
            return async ()=>fromInstanceMetadata(options)().then(setNamedProvider);
        },
        Environment: async (options)=>{
            logger?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
            const { fromEnv } = await __turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-env/dist-es/index.js [app-route] (ecmascript, async loader)");
            return async ()=>fromEnv(options)().then(setNamedProvider);
        }
    };
    if (credentialSource in sourceProvidersMap) {
        return sourceProvidersMap[credentialSource];
    } else {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](`Unsupported credential source in profile ${profileName}. Got ${credentialSource}, ` + `expected EcsContainer or Ec2InstanceMetadata or Environment.`, {
            logger
        });
    }
};
const setNamedProvider = (creds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveAssumeRoleCredentials.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAssumeRoleProfile",
    ()=>isAssumeRoleProfile,
    "resolveAssumeRoleCredentials",
    ()=>resolveAssumeRoleCredentials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getProfileName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/shared-ini-file-loader/dist-es/getProfileName.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveCredentialSource$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveCredentialSource.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveProfileData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveProfileData.js [app-route] (ecmascript)");
;
;
;
;
;
const isAssumeRoleProfile = (arg, { profile = "default", logger } = {})=>{
    return Boolean(arg) && typeof arg === "object" && typeof arg.role_arn === "string" && [
        "undefined",
        "string"
    ].indexOf(typeof arg.role_session_name) > -1 && [
        "undefined",
        "string"
    ].indexOf(typeof arg.external_id) > -1 && [
        "undefined",
        "string"
    ].indexOf(typeof arg.mfa_serial) > -1 && (isAssumeRoleWithSourceProfile(arg, {
        profile,
        logger
    }) || isCredentialSourceProfile(arg, {
        profile,
        logger
    }));
};
const isAssumeRoleWithSourceProfile = (arg, { profile, logger })=>{
    const withSourceProfile = typeof arg.source_profile === "string" && typeof arg.credential_source === "undefined";
    if (withSourceProfile) {
        logger?.debug?.(`    ${profile} isAssumeRoleWithSourceProfile source_profile=${arg.source_profile}`);
    }
    return withSourceProfile;
};
const isCredentialSourceProfile = (arg, { profile, logger })=>{
    const withProviderProfile = typeof arg.credential_source === "string" && typeof arg.source_profile === "undefined";
    if (withProviderProfile) {
        logger?.debug?.(`    ${profile} isCredentialSourceProfile credential_source=${arg.credential_source}`);
    }
    return withProviderProfile;
};
const resolveAssumeRoleCredentials = async (profileName, profiles, options, visitedProfiles = {})=>{
    options.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
    const profileData = profiles[profileName];
    const { source_profile, region } = profileData;
    if (!options.roleAssumer) {
        const { getDefaultRoleAssumer } = await __turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/nested-clients/dist-es/submodules/sts/index.js [app-route] (ecmascript, async loader)");
        options.roleAssumer = getDefaultRoleAssumer({
            ...options.clientConfig,
            credentialProviderLogger: options.logger,
            parentClientConfig: {
                ...options?.parentClientConfig,
                region: region ?? options?.parentClientConfig?.region
            }
        }, options.clientPlugins);
    }
    if (source_profile && source_profile in visitedProfiles) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](`Detected a cycle attempting to resolve credentials for profile` + ` ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getProfileName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProfileName"])(options)}. Profiles visited: ` + Object.keys(visitedProfiles).join(", "), {
            logger: options.logger
        });
    }
    options.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${source_profile ? `source_profile=[${source_profile}]` : `profile=[${profileName}]`}`);
    const sourceCredsProvider = source_profile ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveProfileData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveProfileData"])(source_profile, profiles, options, {
        ...visitedProfiles,
        [source_profile]: true
    }, isCredentialSourceWithoutRoleArn(profiles[source_profile] ?? {})) : (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveCredentialSource$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveCredentialSource"])(profileData.credential_source, profileName, options.logger)(options))();
    if (isCredentialSourceWithoutRoleArn(profileData)) {
        return sourceCredsProvider.then((creds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
    } else {
        const params = {
            RoleArn: profileData.role_arn,
            RoleSessionName: profileData.role_session_name || `aws-sdk-js-${Date.now()}`,
            ExternalId: profileData.external_id,
            DurationSeconds: parseInt(profileData.duration_seconds || "3600", 10)
        };
        const { mfa_serial } = profileData;
        if (mfa_serial) {
            if (!options.mfaCodeProvider) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](`Profile ${profileName} requires multi-factor authentication, but no MFA code callback was provided.`, {
                    logger: options.logger,
                    tryNextLink: false
                });
            }
            params.SerialNumber = mfa_serial;
            params.TokenCode = await options.mfaCodeProvider(mfa_serial);
        }
        const sourceCreds = await sourceCredsProvider;
        return options.roleAssumer(sourceCreds, params).then((creds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
    }
};
const isCredentialSourceWithoutRoleArn = (section)=>{
    return !section.role_arn && !!section.credential_source;
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveProcessCredentials.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isProcessProfile",
    ()=>isProcessProfile,
    "resolveProcessCredentials",
    ()=>resolveProcessCredentials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
;
const isProcessProfile = (arg)=>Boolean(arg) && typeof arg === "object" && typeof arg.credential_process === "string";
const resolveProcessCredentials = async (options, profile)=>__turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-process/dist-es/index.js [app-route] (ecmascript, async loader)").then(({ fromProcess })=>fromProcess({
            ...options,
            profile
        })().then((creds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_PROFILE_PROCESS", "v")));
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveSsoCredentials.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isSsoProfile",
    ()=>isSsoProfile,
    "resolveSsoCredentials",
    ()=>resolveSsoCredentials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
;
const resolveSsoCredentials = async (profile, profileData, options = {})=>{
    const { fromSSO } = await __turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-sso/dist-es/index.js [app-route] (ecmascript, async loader)");
    return fromSSO({
        profile,
        logger: options.logger,
        parentClientConfig: options.parentClientConfig,
        clientConfig: options.clientConfig
    })().then((creds)=>{
        if (profileData.sso_session) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_PROFILE_SSO", "r");
        } else {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_PROFILE_SSO_LEGACY", "t");
        }
    });
};
const isSsoProfile = (arg)=>arg && (typeof arg.sso_start_url === "string" || typeof arg.sso_account_id === "string" || typeof arg.sso_session === "string" || typeof arg.sso_region === "string" || typeof arg.sso_role_name === "string");
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveStaticCredentials.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isStaticCredsProfile",
    ()=>isStaticCredsProfile,
    "resolveStaticCredentials",
    ()=>resolveStaticCredentials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
;
const isStaticCredsProfile = (arg)=>Boolean(arg) && typeof arg === "object" && typeof arg.aws_access_key_id === "string" && typeof arg.aws_secret_access_key === "string" && [
        "undefined",
        "string"
    ].indexOf(typeof arg.aws_session_token) > -1 && [
        "undefined",
        "string"
    ].indexOf(typeof arg.aws_account_id) > -1;
const resolveStaticCredentials = async (profile, options)=>{
    options?.logger?.debug("@aws-sdk/credential-provider-ini - resolveStaticCredentials");
    const credentials = {
        accessKeyId: profile.aws_access_key_id,
        secretAccessKey: profile.aws_secret_access_key,
        sessionToken: profile.aws_session_token,
        ...profile.aws_credential_scope && {
            credentialScope: profile.aws_credential_scope
        },
        ...profile.aws_account_id && {
            accountId: profile.aws_account_id
        }
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(credentials, "CREDENTIALS_PROFILE", "n");
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveWebIdentityCredentials.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isWebIdentityProfile",
    ()=>isWebIdentityProfile,
    "resolveWebIdentityCredentials",
    ()=>resolveWebIdentityCredentials
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/core/dist-es/submodules/client/setCredentialFeature.js [app-route] (ecmascript)");
;
const isWebIdentityProfile = (arg)=>Boolean(arg) && typeof arg === "object" && typeof arg.web_identity_token_file === "string" && typeof arg.role_arn === "string" && [
        "undefined",
        "string"
    ].indexOf(typeof arg.role_session_name) > -1;
const resolveWebIdentityCredentials = async (profile, options)=>__turbopack_context__.A("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-web-identity/dist-es/index.js [app-route] (ecmascript, async loader)").then(({ fromTokenFile })=>fromTokenFile({
            webIdentityTokenFile: profile.web_identity_token_file,
            roleArn: profile.role_arn,
            roleSessionName: profile.role_session_name,
            roleAssumerWithWebIdentity: options.roleAssumerWithWebIdentity,
            logger: options.logger,
            parentClientConfig: options.parentClientConfig
        })().then((creds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$core$2f$dist$2d$es$2f$submodules$2f$client$2f$setCredentialFeature$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCredentialFeature"])(creds, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q")));
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveProfileData.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveProfileData",
    ()=>resolveProfileData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/property-provider/dist-es/CredentialsProviderError.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveAssumeRoleCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveAssumeRoleCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveProcessCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveProcessCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveSsoCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveSsoCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveStaticCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveStaticCredentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveWebIdentityCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveWebIdentityCredentials.js [app-route] (ecmascript)");
;
;
;
;
;
;
const resolveProfileData = async (profileName, profiles, options, visitedProfiles = {}, isAssumeRoleRecursiveCall = false)=>{
    const data = profiles[profileName];
    if (Object.keys(visitedProfiles).length > 0 && (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveStaticCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isStaticCredsProfile"])(data)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveStaticCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveStaticCredentials"])(data, options);
    }
    if (isAssumeRoleRecursiveCall || (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveAssumeRoleCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isAssumeRoleProfile"])(data, {
        profile: profileName,
        logger: options.logger
    })) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveAssumeRoleCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveAssumeRoleCredentials"])(profileName, profiles, options, visitedProfiles);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveStaticCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isStaticCredsProfile"])(data)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveStaticCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveStaticCredentials"])(data, options);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveWebIdentityCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isWebIdentityProfile"])(data)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveWebIdentityCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveWebIdentityCredentials"])(data, options);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveProcessCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isProcessProfile"])(data)) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveProcessCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveProcessCredentials"])(options, profileName);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveSsoCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSsoProfile"])(data)) {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveSsoCredentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveSsoCredentials"])(profileName, data, options);
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$property$2d$provider$2f$dist$2d$es$2f$CredentialsProviderError$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CredentialsProviderError"](`Could not resolve credentials using profile: [${profileName}] in configuration/credentials file(s).`, {
        logger: options.logger
    });
};
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/fromIni.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromIni",
    ()=>fromIni
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getProfileName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/shared-ini-file-loader/dist-es/getProfileName.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$parseKnownFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@smithy/shared-ini-file-loader/dist-es/parseKnownFiles.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveProfileData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/resolveProfileData.js [app-route] (ecmascript)");
;
;
const fromIni = (_init = {})=>async ({ callerClientConfig } = {})=>{
        const init = {
            ..._init,
            parentClientConfig: {
                ...callerClientConfig,
                ..._init.parentClientConfig
            }
        };
        init.logger?.debug("@aws-sdk/credential-provider-ini - fromIni");
        const profiles = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$parseKnownFiles$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseKnownFiles"])(init);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$resolveProfileData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveProfileData"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$smithy$2f$shared$2d$ini$2d$file$2d$loader$2f$dist$2d$es$2f$getProfileName$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getProfileName"])({
            profile: _init.profile ?? callerClientConfig?.profile
        }), profiles, init);
    };
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$fromIni$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/fromIni.js [app-route] (ecmascript)");
;
}),
"[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fromIni",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$fromIni$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromIni"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$lambda$2f$node_modules$2f40$aws$2d$sdk$2f$credential$2d$provider$2d$ini$2f$dist$2d$es$2f$fromIni$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-sdk/client-lambda/node_modules/@aws-sdk/credential-provider-ini/dist-es/fromIni.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=7385c_149ac251._.js.map