module.exports = [
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolveOwnerFields.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Given an introspection schema model, returns all owner fields.
 *
 * @param model Model from an introspection schema
 * @returns List of owner field names
 */ __turbopack_context__.s([
    "resolveOwnerFields",
    ()=>resolveOwnerFields
]);
function resolveOwnerFields(model) {
    const ownerFields = new Set();
    for (const attr of model.attributes || []){
        if (isAuthAttribute(attr)) {
            for (const rule of attr.properties.rules){
                if (rule.allow === 'owner') {
                    ownerFields.add(rule.ownerField || 'owner');
                } else if (rule.allow === 'groups' && rule.groupsField !== undefined) {
                    // only valid for dynamic group(s)
                    // static group auth will have an array of predefined groups in the attribute, groups: string[]
                    // but `groupsField` will be undefined
                    ownerFields.add(rule.groupsField);
                }
            }
        }
    }
    return Array.from(ownerFields);
}
/**
 * Type guard that identifies an auth attribute with an attached rules list that
 * specifies an `allow` attribute at a minimum.
 *
 * @param attribute Any object. Ideally a model introspection schema model attribute
 * @returns True if given object is an auth attribute
 */ function isAuthAttribute(attribute) {
    if (attribute?.type === 'auth') {
        if (typeof attribute?.properties === 'object') {
            if (Array.isArray(attribute?.properties?.rules)) {
                return (attribute?.properties?.rules).every((rule)=>!!rule.allow);
            }
        }
    }
    return false;
}
;
 //# sourceMappingURL=resolveOwnerFields.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/stringTransformation.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @param s string to capitalize
 * @returns capitalized string
 */ __turbopack_context__.s([
    "capitalize",
    ()=>capitalize
]);
function capitalize(s) {
    return `${s[0].toUpperCase()}${s.slice(1)}`;
}
;
 //# sourceMappingURL=stringTransformation.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Executes an `async` resolver function, providing the `Promise`-to-be-returned as the
 * first argument to the resolver so that the resolver can refer to the `Promise` that
 * external callers will see.
 *
 * ```ts
 * const outer = selfAwareAsync(async inner => {
 *  console.log(outer === inner); // true
 * });
 * ```
 *
 * This utility exists to reduce boilerplate in cases where promise resolving code needs
 * to track or register its "own" `Promise` *as seen by the caller* in some way. E.g.,
 * when mapping `Promise` chains for `client.cancel()`.
 *
 * @param resolver
 * @returns
 */ __turbopack_context__.s([
    "selfAwareAsync",
    ()=>selfAwareAsync
]);
function selfAwareAsync(resolver) {
    let resolve;
    let reject;
    const resultPromise = new Promise((res, rej)=>{
        resolve = res;
        reject = rej;
    });
    resolver(resultPromise).then((result)=>{
        resolve(result);
    }).catch((error)=>{
        reject(error);
    });
    return resultPromise;
}
;
 //# sourceMappingURL=selfAwareAsync.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A map of cancellable promise "extensions".
 *
 * Each entry value must either be a directly `cancel()`-able promise, or must
 * refer to another entry.
 *
 * When cancellation of a promise is requested, cancel
 * will check to see if the promise exists in the map. If it does, it pulls
 * the value and repeats the check. If not, it will perform the underlying
 * cancel operation.
 */ __turbopack_context__.s([
    "extendCancellability",
    ()=>extendCancellability,
    "upgradeClientCancellation",
    ()=>upgradeClientCancellation
]);
const promiseMap = new WeakMap();
function extendCancellability(existingCancellablePromise, newPromiseToRegister) {
    promiseMap.set(newPromiseToRegister, existingCancellablePromise);
    return existingCancellablePromise.finally(()=>{
        promiseMap.delete(newPromiseToRegister);
    });
}
/**
 * Wraps the existing `cancel()` method with logic to iteratively search for
 * the corresponding base level promise, if needed, that the core graphql client
 * knows how to cancel.
 *
 * @param client
 */ function upgradeClientCancellation(client) {
    const innerCancel = client.cancel.bind(client);
    client.cancel = function(promise, message) {
        const visited = new Set();
        let targetPromise = promise;
        while(targetPromise && promiseMap.has(targetPromise)){
            if (visited.has(targetPromise)) throw new Error('A cycle was detected in the modeled graphql cancellation chain. This is a bug. Please report it!');
            visited.add(targetPromise);
            targetPromise = promiseMap.get(targetPromise);
        }
        // call `innerCancel` with `targetPromise!` to defer to existing implementation
        // on how to handle `null | undefined` or otherwise "non-cancellable" objects.
        return innerCancel(targetPromise, message);
    };
}
;
 //# sourceMappingURL=cancellation.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authModeParams",
    ()=>authModeParams,
    "buildGraphQLVariables",
    ()=>buildGraphQLVariables,
    "customSelectionSetToIR",
    ()=>customSelectionSetToIR,
    "flattenItems",
    ()=>flattenItems,
    "generateGraphQLDocument",
    ()=>generateGraphQLDocument,
    "generateSelectionSet",
    ()=>generateSelectionSet,
    "getCustomHeaders",
    ()=>getCustomHeaders,
    "getDefaultSelectionSetForNonModelWithIR",
    ()=>getDefaultSelectionSetForNonModelWithIR,
    "graphQLOperationsInfo",
    ()=>graphQLOperationsInfo,
    "initializeModel",
    ()=>initializeModel,
    "normalizeMutationInput",
    ()=>normalizeMutationInput,
    "selectionSetIRToString",
    ()=>selectionSetIRToString
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$resolveOwnerFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolveOwnerFields.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$stringTransformation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/stringTransformation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs [app-route] (ecmascript)");
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
const connectionType = {
    HAS_ONE: 'HAS_ONE',
    HAS_MANY: 'HAS_MANY',
    BELONGS_TO: 'BELONGS_TO'
};
// When generating an SK's KeyConditionInput name, string-like types map to String
const skGraphQlFieldTypeMap = {
    ID: 'ID',
    String: 'String',
    AWSDate: 'String',
    AWSTime: 'String',
    AWSDateTime: 'String',
    AWSTimestamp: 'Int',
    AWSEmail: 'String',
    AWSPhone: 'String',
    AWSURL: 'String',
    AWSIPAddress: 'String',
    AWSJSON: 'String',
    Boolean: 'Boolean',
    Int: 'Int',
    Float: 'Float'
};
// move to util
const resolvedSkName = (sk)=>{
    if (sk.length === 1) {
        return sk[0];
    } else {
        return sk.reduce((acc, curr, idx)=>{
            if (idx === 0) {
                return curr;
            } else {
                return acc + (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$stringTransformation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capitalize"])(curr);
            }
        }, '');
    }
};
/**
 * Crawls a model tree, starting with a given **individual** model instance record, looking
 * for related hasMany children to extract from their `items` containers.
 *
 * E.g., if we have a record like this:
 *
 * ```js
 * {
 *   id: 'some-id',
 *   children: {
 *     items: [
 *       { name: 'a' }
 *       { name: 'b' }
 *       { name: 'c' }
 *     ]
 *   }
 * }
 * ```
 *
 * And if `children` refers to *an array of another model* (as opposed to a custom type),
 * the `items` will be extracted. We do this because `items` is just the mechanism for nesting
 * child records -- we don't want customers to have to dig the items out in application code.
 * Ultimately, we return this "flattened" structure:
 *
 * ```js
 * {
 *   id: 'some-id',
 *   children: [
 *     { name: 'a' }
 *     { name: 'b' }
 *     { name: 'c' }
 *   ]
 * }
 * ```
 *
 * Notably, an identical record could be the result of a nested custom type that contains an
 * `items` property. This will *not* be flattened, because in that case the `items` property is
 * actually part of the customer's schema. Similarly if a model contains an explicit `items` field.
 *
 * @param modelIntrospection Top-level model introspection schema.
 * @param modelName The name of the model. Can be `undefined`. E.g., for customOperation return types.
 * @param modelRecord The individual "model instance record" to normalize.
 */ const flattenItems = (modelIntrospection, modelName, modelRecord)=>{
    if (!modelRecord) return null;
    const mapped = {};
    for (const [fieldName, value] of Object.entries(modelRecord)){
        const fieldDef = modelName ? modelIntrospection.models[modelName]?.fields[fieldName] : undefined;
        const dvPair = {
            fieldDef,
            value
        };
        if (isRelatedModelItemsArrayPair(dvPair)) {
            mapped[fieldName] = dvPair.value.items.map((itemValue)=>flattenItems(modelIntrospection, dvPair.fieldDef.type.model, itemValue));
        } else if (isRelatedModelProperty(fieldDef)) {
            mapped[fieldName] = flattenItems(modelIntrospection, fieldDef.type.model, value);
        } else {
            mapped[fieldName] = value;
        }
    }
    return mapped;
};
/**
 * Determines whether the given field definition and associated result value
 * represent a related model array from a HasMany-type relationship.
 *
 * @param dv Pair of field definition and associated result value
 * @returns
 */ function isRelatedModelItemsArrayPair(dv) {
    return typeof dv.fieldDef?.type === 'object' && 'model' in dv.fieldDef.type && typeof dv.fieldDef.type.model === 'string' && dv.fieldDef.isArray && Array.isArray(dv.value?.items);
}
/**
 * Determines whether the given field definition represents a relationship
 * to another model.
 *
 * @param fieldDef
 * @returns
 */ function isRelatedModelProperty(fieldDef) {
    return typeof fieldDef?.type === 'object' && 'model' in fieldDef.type && typeof fieldDef.type.model === 'string';
}
// TODO: this should accept single result to support CRUD methods; create helper for array/list
function initializeModel(client, modelName, result, modelIntrospection, authMode, authToken, context = false) {
    const introModel = modelIntrospection.models[modelName];
    const introModelFields = introModel.fields;
    const modelFields = Object.entries(introModelFields).filter(([_, field])=>field?.type?.model !== undefined).map(([fieldName])=>fieldName);
    return result.map((record)=>{
        if (record === null || record === undefined) {
            return record;
        }
        const initializedRelationshipFields = {};
        for (const fieldName of modelFields){
            const modelField = introModelFields[fieldName];
            const modelFieldType = modelField?.type;
            const relatedModelName = modelFieldType.model;
            const relatedModel = modelIntrospection.models[relatedModelName];
            const relatedModelPKFieldName = relatedModel.primaryKeyInfo.primaryKeyFieldName;
            const relatedModelSKFieldNames = relatedModel.primaryKeyInfo.sortKeyFieldNames;
            const relationType = modelField.association?.connectionType;
            let connectionFields = [];
            if (modelField.association && 'associatedWith' in modelField.association) {
                connectionFields = modelField.association.associatedWith;
            }
            const targetNames = [];
            if (modelField.association && 'targetNames' in modelField.association) {
                targetNames.push(...modelField.association.targetNames);
            }
            switch(relationType){
                case connectionType.BELONGS_TO:
                    {
                        const sortKeyValues = relatedModelSKFieldNames.reduce(// TODO(Eslint): is this implementation correct?
                        // eslint-disable-next-line array-callback-return
                        (acc, curVal)=>{
                            if (record[curVal]) {
                                acc[curVal] = record[curVal];
                            }
                            return acc;
                        }, {});
                        // if get is disabled on the related model
                        if (client.models[relatedModelName]?.get === undefined) {
                            break;
                        }
                        if (context) {
                            initializedRelationshipFields[fieldName] = (contextSpec, options)=>{
                                if (record[targetNames[0]]) {
                                    return client.models[relatedModelName].get(contextSpec, {
                                        [relatedModelPKFieldName]: record[targetNames[0]],
                                        ...sortKeyValues
                                    }, {
                                        authMode: options?.authMode || authMode,
                                        authToken: options?.authToken || authToken
                                    });
                                }
                                return {
                                    data: null
                                };
                            };
                        } else {
                            initializedRelationshipFields[fieldName] = (options)=>{
                                if (record[targetNames[0]]) {
                                    return client.models[relatedModelName].get({
                                        [relatedModelPKFieldName]: record[targetNames[0]],
                                        ...sortKeyValues
                                    }, {
                                        authMode: options?.authMode || authMode,
                                        authToken: options?.authToken || authToken
                                    });
                                }
                                return {
                                    data: null
                                };
                            };
                        }
                        break;
                    }
                case connectionType.HAS_ONE:
                case connectionType.HAS_MANY:
                    {
                        /**
                     * If the loader is a HAS_ONE, we just need to attempt to grab the first item
                     * from the result.
                     */ const mapResult = relationType === connectionType.HAS_ONE ? (result)=>{
                            return {
                                data: result?.data.shift() || null,
                                errors: result.errors,
                                extensions: result.extensions
                            };
                        } : (result)=>result;
                        const parentPk = introModel.primaryKeyInfo.primaryKeyFieldName;
                        const parentSK = introModel.primaryKeyInfo.sortKeyFieldNames;
                        // M:N check - TODO: refactor
                        const relatedModelField = relatedModel.fields[connectionFields[0]];
                        const relatedModelFieldType = relatedModelField.type;
                        if (relatedModelFieldType.model) {
                            let relatedTargetNames = [];
                            if (relatedModelField.association && 'targetNames' in relatedModelField.association) {
                                relatedTargetNames = relatedModelField.association?.targetNames;
                            }
                            const hasManyFilter = relatedTargetNames.map((field, idx)=>{
                                if (idx === 0) {
                                    return {
                                        [field]: {
                                            eq: record[parentPk]
                                        }
                                    };
                                }
                                return {
                                    [field]: {
                                        eq: record[parentSK[idx - 1]]
                                    }
                                };
                            });
                            // if list is disabled on the related model
                            if (client.models[relatedModelName]?.list === undefined) {
                                break;
                            }
                            if (context) {
                                initializedRelationshipFields[fieldName] = (contextSpec, options)=>{
                                    if (record[parentPk]) {
                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selfAwareAsync"])(async (resultPromise)=>{
                                            const basePromise = client.models[relatedModelName].list(contextSpec, {
                                                filter: {
                                                    and: hasManyFilter
                                                },
                                                limit: options?.limit,
                                                nextToken: options?.nextToken,
                                                authMode: options?.authMode || authMode,
                                                authToken: options?.authToken || authToken
                                            });
                                            const extendedBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendCancellability"])(basePromise, resultPromise);
                                            return mapResult(await extendedBase);
                                        });
                                    }
                                    return [];
                                };
                            } else {
                                initializedRelationshipFields[fieldName] = (options)=>{
                                    if (record[parentPk]) {
                                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selfAwareAsync"])(async (resultPromise)=>{
                                            const basePromise = client.models[relatedModelName].list({
                                                filter: {
                                                    and: hasManyFilter
                                                },
                                                limit: options?.limit,
                                                nextToken: options?.nextToken,
                                                authMode: options?.authMode || authMode,
                                                authToken: options?.authToken || authToken
                                            });
                                            const extendedBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendCancellability"])(basePromise, resultPromise);
                                            return mapResult(await extendedBase);
                                        });
                                    }
                                    return [];
                                };
                            }
                            break;
                        }
                        const hasManyFilter = connectionFields.map((field, idx)=>{
                            if (idx === 0) {
                                return {
                                    [field]: {
                                        eq: record[parentPk]
                                    }
                                };
                            }
                            return {
                                [field]: {
                                    eq: record[parentSK[idx - 1]]
                                }
                            };
                        });
                        // if list is disabled on the related model
                        if (client.models[relatedModelName]?.list === undefined) {
                            break;
                        }
                        if (context) {
                            initializedRelationshipFields[fieldName] = (contextSpec, options)=>{
                                if (record[parentPk]) {
                                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selfAwareAsync"])(async (resultPromise)=>{
                                        const basePromise = client.models[relatedModelName].list(contextSpec, {
                                            filter: {
                                                and: hasManyFilter
                                            },
                                            limit: options?.limit,
                                            nextToken: options?.nextToken,
                                            authMode: options?.authMode || authMode,
                                            authToken: options?.authToken || authToken
                                        });
                                        const extendedBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendCancellability"])(basePromise, resultPromise);
                                        return mapResult(await extendedBase);
                                    });
                                }
                                return [];
                            };
                        } else {
                            initializedRelationshipFields[fieldName] = (options)=>{
                                if (record[parentPk]) {
                                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selfAwareAsync"])(async (resultPromise)=>{
                                        const basePromise = client.models[relatedModelName].list({
                                            filter: {
                                                and: hasManyFilter
                                            },
                                            limit: options?.limit,
                                            nextToken: options?.nextToken,
                                            authMode: options?.authMode || authMode,
                                            authToken: options?.authToken || authToken
                                        });
                                        const extendedBase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendCancellability"])(basePromise, resultPromise);
                                        return mapResult(await extendedBase);
                                    });
                                }
                                return [];
                            };
                        }
                        break;
                    }
            }
        }
        return {
            ...record,
            ...initializedRelationshipFields
        };
    });
}
const graphQLOperationsInfo = {
    CREATE: {
        operationPrefix: 'create',
        usePlural: false
    },
    GET: {
        operationPrefix: 'get',
        usePlural: false
    },
    UPDATE: {
        operationPrefix: 'update',
        usePlural: false
    },
    DELETE: {
        operationPrefix: 'delete',
        usePlural: false
    },
    LIST: {
        operationPrefix: 'list',
        usePlural: true
    },
    INDEX_QUERY: {
        operationPrefix: '',
        usePlural: false
    },
    ONCREATE: {
        operationPrefix: 'onCreate',
        usePlural: false
    },
    ONUPDATE: {
        operationPrefix: 'onUpdate',
        usePlural: false
    },
    ONDELETE: {
        operationPrefix: 'onDelete',
        usePlural: false
    },
    OBSERVEQUERY: {
        operationPrefix: 'observeQuery',
        usePlural: false
    }
};
const SELECTION_SET_WILDCARD = '*';
const getDefaultSelectionSetForNonModelWithIR = (nonModelDefinition, modelIntrospection)=>{
    const { fields } = nonModelDefinition;
    const mappedFields = Object.values(fields).map(({ type, name })=>{
        if (typeof type.enum === 'string') {
            return [
                name,
                FIELD_IR
            ];
        }
        if (typeof type.nonModel === 'string') {
            return [
                name,
                getDefaultSelectionSetForNonModelWithIR(modelIntrospection.nonModels[type.nonModel], modelIntrospection)
            ];
        }
        if (typeof type === 'string') {
            return [
                name,
                FIELD_IR
            ];
        }
        return undefined;
    }).filter((pair)=>pair !== undefined);
    return Object.fromEntries(mappedFields);
};
const getDefaultSelectionSetForModelWithIR = (modelDefinition, modelIntrospection)=>{
    const { fields } = modelDefinition;
    const mappedFields = Object.values(fields).map(({ type, name })=>{
        if (typeof type.enum === 'string' || typeof type === 'string') {
            return [
                name,
                FIELD_IR
            ];
        }
        if (typeof type.nonModel === 'string') {
            return [
                name,
                getDefaultSelectionSetForNonModelWithIR(modelIntrospection.nonModels[type.nonModel], modelIntrospection)
            ];
        }
        return undefined;
    }).filter((pair)=>pair !== undefined);
    const ownerFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$resolveOwnerFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveOwnerFields"])(modelDefinition).map((field)=>[
            field,
            FIELD_IR
        ]);
    return Object.fromEntries(mappedFields.concat(ownerFields));
};
function defaultSelectionSetForModel(modelDefinition) {
    // fields that are explicitly part of the graphql schema; not
    // inferred from owner auth rules.
    const { fields } = modelDefinition;
    const explicitFields = Object.values(fields)// Default selection set omits model fields
    .map(({ type, name })=>{
        if (typeof type === 'string') return name;
        if (typeof type === 'object') {
            if (typeof type?.enum === 'string') {
                return name;
            } else if (typeof type?.nonModel === 'string') {
                return `${name}.${SELECTION_SET_WILDCARD}`;
            }
        }
        return undefined;
    }).filter(Boolean);
    // fields used for owner auth rules that may or may not also
    // be explicit on the model.
    const ownerFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$resolveOwnerFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveOwnerFields"])(modelDefinition);
    return Array.from(new Set(explicitFields.concat(ownerFields)));
}
const FIELD_IR = '';
/**
 * Generates nested Custom Selection Set IR from path
 *
 * @param modelDefinitions
 * @param modelName
 * @param selectionSet - array of object paths
 * @example
 * ### Given
 * `selectionSet = ['id', 'comments.post.id']`
 * ### Returns
 * ```ts
 * {
 *   id: '',
 *   comments: {
 *     items: { post: { id: '' } }
 *   }
 * }
 * ```
 */ function customSelectionSetToIR(modelIntrospection, modelName, selectionSet) {
    const dotNotationToObject = (path, modelOrNonModelName)=>{
        const [fieldName, ...rest] = path.split('.');
        const nested = rest[0];
        const modelOrNonModelDefinition = modelIntrospection.models[modelOrNonModelName] ?? modelIntrospection.nonModels[modelOrNonModelName];
        const modelOrNonModelFields = modelOrNonModelDefinition?.fields;
        const relatedModel = modelOrNonModelFields?.[fieldName]?.type?.model;
        const relatedModelDefinition = modelIntrospection.models[relatedModel];
        const relatedNonModel = modelOrNonModelFields?.[fieldName]?.type?.nonModel;
        const relatedNonModelDefinition = modelIntrospection.nonModels[relatedNonModel];
        const isModelOrNonModelOrFieldType = relatedModelDefinition ? 'model' : relatedNonModelDefinition ? 'nonModel' : 'field';
        if (isModelOrNonModelOrFieldType === 'nonModel') {
            let result = {};
            if (!nested) {
                throw Error(`${fieldName} must declare a wildcard (*) or a field of custom type ${relatedNonModel}`);
            }
            if (nested === SELECTION_SET_WILDCARD) {
                result = {
                    [fieldName]: getDefaultSelectionSetForNonModelWithIR(relatedNonModelDefinition, modelIntrospection)
                };
            } else {
                result = {
                    [fieldName]: dotNotationToObject(rest.join('.'), relatedNonModel)
                };
            }
            return result;
        } else if (isModelOrNonModelOrFieldType === 'model') {
            let result = {};
            if (!nested) {
                throw Error(`${fieldName} must declare a wildcard (*) or a field of model ${relatedModel}`);
            }
            if (nested === SELECTION_SET_WILDCARD) {
                const nestedRelatedModelDefinition = modelIntrospection.models[relatedModel];
                result = {
                    [fieldName]: getDefaultSelectionSetForModelWithIR(nestedRelatedModelDefinition, modelIntrospection)
                };
            } else {
                result = {
                    [fieldName]: dotNotationToObject(rest.join('.'), relatedModel)
                };
            }
            if (modelOrNonModelFields[fieldName]?.isArray) {
                result = {
                    [fieldName]: {
                        items: result[fieldName]
                    }
                };
            }
            return result;
        } else {
            const modelField = modelOrNonModelFields?.[fieldName];
            const nonModelDefinition = modelIntrospection.nonModels[modelOrNonModelName];
            const nonModelField = nonModelDefinition?.fields?.[fieldName];
            if (!nonModelDefinition) {
                const isOwnerField = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$resolveOwnerFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveOwnerFields"])(modelOrNonModelDefinition).includes(fieldName);
                if (!modelField && !isOwnerField) {
                    throw Error(`${fieldName} is not a field of model ${modelOrNonModelName}`);
                }
            } else {
                if (!nonModelField) {
                    throw Error(`${fieldName} is not a field of custom type ${modelOrNonModelName}`);
                }
            }
            return {
                [fieldName]: FIELD_IR
            };
        }
    };
    return selectionSet.reduce((resultObj, path)=>deepMergeSelectionSetObjects(dotNotationToObject(path, modelName), resultObj), {});
}
/**
 * Stringifies selection set IR
 * * @example
 * ### Given
 * ```ts
 * {
 *   id: '',
 *   comments: {
 *     items: { post: { id: '' } }
 *   }
 * }
 * ```
 * ### Returns
 * `'id comments { items { post { id } } }'`
 */ function selectionSetIRToString(obj) {
    const res = [];
    Object.entries(obj).forEach(([fieldName, value])=>{
        if (value === FIELD_IR) {
            res.push(fieldName);
        } else if (typeof value === 'object' && value !== null) {
            if (value?.items) {
                res.push(fieldName, '{', 'items', '{', selectionSetIRToString(value.items), '}', '}');
            } else {
                res.push(fieldName, '{', selectionSetIRToString(value), '}');
            }
        }
    });
    return res.join(' ');
}
/**
 * Recursively merges selection set objects from `source` onto `target`.
 *
 * `target` will be updated. `source` will be left alone.
 *
 * @param source The object to merge into target.
 * @param target The object to be mutated.
 */ function deepMergeSelectionSetObjects(source, target) {
    const isObject = (obj)=>obj && typeof obj === 'object';
    for(const key in source){
        // This verification avoids 'Prototype Pollution' issue
        if (!Object.prototype.hasOwnProperty.call(source, key)) continue;
        if (Object.prototype.hasOwnProperty.call(target, key) && isObject(target[key])) {
            deepMergeSelectionSetObjects(source[key], target[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
function generateSelectionSet(modelIntrospection, modelName, selectionSet) {
    const modelDefinition = modelIntrospection.models[modelName];
    const selSetIr = customSelectionSetToIR(modelIntrospection, modelName, selectionSet ?? defaultSelectionSetForModel(modelDefinition));
    const selSetString = selectionSetIRToString(selSetIr);
    return selSetString;
}
function generateGraphQLDocument(modelIntrospection, modelDefinition, modelOperation, listArgs, indexMeta) {
    const { name, pluralName, fields, primaryKeyInfo: { isCustomPrimaryKey, primaryKeyFieldName, sortKeyFieldNames }, attributes } = modelDefinition;
    // Use pascal case of the model name to generate the operations and the arguments.
    // This is required to be in sync with the resources generated by the GraphQL transformers.
    const namePascalCase = name.charAt(0).toUpperCase() + name.slice(1);
    const pluralNamePascalCase = pluralName.charAt(0).toUpperCase() + pluralName.slice(1);
    const { operationPrefix, usePlural } = graphQLOperationsInfo[modelOperation];
    const { selectionSet } = listArgs || {};
    let graphQLFieldName;
    let indexQueryArgs;
    if (operationPrefix) {
        graphQLFieldName = `${operationPrefix}${usePlural ? pluralNamePascalCase : namePascalCase}`;
    } else if (indexMeta) {
        const { queryField, pk, sk = [] } = indexMeta;
        graphQLFieldName = queryField;
        /**
         * **a. Single field SK** -> single arg where name is the field name and the type is `Model${gqlFieldType}KeyConditionInput` (nullable)
         *  Note: string-like data types e.g.,  AWSDateTime, AWSEmail, AWSPhone, etc. should map to String. See `skGraphQlFieldTypeMap` above
         * @example
         * ```
         * sk1: ModelStringKeyConditionInput
         * ```
         *
         * **b. Composite SK** -> single arg where the name is camelCase concatenation of all the field names that comprise the SK
         *  and the type is `Model${modelName}${keyAttributeName}CompositeKeyConditionInput` (nullable)
         * @example
         * ```
         * sk1Sk2: ModelMyModelMyModelByPkAndSk1AndSk2CompositeKeyConditionInput
         */ let skQueryArgs = {};
        if (sk.length === 1) {
            const [skField] = sk;
            const type = typeof fields[skField].type === 'string' ? fields[skField].type : 'String';
            const normalizedType = skGraphQlFieldTypeMap[type];
            skQueryArgs = {
                [skField]: `Model${normalizedType}KeyConditionInput`
            };
        } else if (sk.length > 1) {
            const compositeSkArgName = resolvedSkName(sk);
            const keyName = attributes?.find((attr)=>attr?.properties?.queryField === queryField)?.properties?.name;
            skQueryArgs = {
                [compositeSkArgName]: `Model${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$stringTransformation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capitalize"])(name)}${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$stringTransformation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capitalize"])(keyName)}CompositeKeyConditionInput`
            };
        }
        indexQueryArgs = {
            [pk]: `${Object.prototype.hasOwnProperty.call(fields[pk].type, 'enum') ? fields[pk].type.enum // AppSync schema sets enum type as the type of the enum fields that's used as PK
             : fields[pk].type}!`,
            ...skQueryArgs
        };
    } else {
        throw new Error('Error generating GraphQL Document - invalid operation name');
    }
    let graphQLOperationType;
    let graphQLSelectionSet;
    let graphQLArguments;
    const selectionSetFields = generateSelectionSet(modelIntrospection, name, selectionSet);
    // default PK args for get and list operations
    // modified below for CPK
    const getPkArgs = {
        [primaryKeyFieldName]: `${fields[primaryKeyFieldName].type}!`
    };
    const listPkArgs = {};
    /**
     * Generate query field args for the SK if it's defined
     *
     * **1. Get queries** require each SK field to be present as a separate arg where the type is the field's GraphQL scalar type (non-nullable)
     * @example
     * ```
     * sk1: String!, sk2: Int!
     * ```
     *
     * **2. List queries**
     *
     * **a. Single field SK** -> single arg where name is the field name and the type is `Model${gqlFieldType}KeyConditionInput` (nullable)
     *      Note: string-like data types e.g.,  AWSDateTime, AWSEmail, AWSPhone, etc. should map to String. See `skGraphQlFieldTypeMap` above
     * @example
     * ```
     * sk1: ModelStringKeyConditionInput
     * ```
     *
     * **b. Composite SK** -> single arg where the name is camelCase concatenation of all the field names that comprise the SK
     *  and the type is `Model${modelName}PrimaryCompositeKeyConditionInput` (nullable)
     * @example
     * ```
     * sk1Sk2: ModelMyModelPrimaryCompositeKeyConditionInput
     * ```
     */ const generateSkArgs = (op)=>{
        if (sortKeyFieldNames.length === 0) return {};
        if (op === 'get') {
            return sortKeyFieldNames.reduce((acc, fieldName)=>{
                const fieldType = fields[fieldName].type;
                if (op === 'get') {
                    acc[fieldName] = `${fieldType}!`; // ! - SK args are non-nullable in Get queries
                }
                return acc;
            }, {});
        } else {
            // list SK
            if (sortKeyFieldNames.length === 1) {
                // Single SK
                const [sk] = sortKeyFieldNames;
                const type = typeof fields[sk].type === 'string' ? fields[sk].type : 'String';
                const normalizedType = skGraphQlFieldTypeMap[type];
                return {
                    [sk]: `Model${normalizedType}KeyConditionInput`
                };
            } else {
                // Composite SK
                const compositeSkArgName = resolvedSkName(sortKeyFieldNames);
                return {
                    [compositeSkArgName]: `Model${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$stringTransformation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["capitalize"])(name)}PrimaryCompositeKeyConditionInput`
                };
            }
        }
    };
    if (isCustomPrimaryKey) {
        Object.assign(getPkArgs, generateSkArgs('get'));
        Object.assign(listPkArgs, {
            // PK is only included in list query field args in the generated GQL
            // when explicitly specifying PK with .identifier(['fieldName']) or @primaryKey in the schema definition
            [primaryKeyFieldName]: `${fields[primaryKeyFieldName].type}`,
            sortDirection: 'ModelSortDirection'
        }, generateSkArgs('list'));
    }
    switch(modelOperation){
        case 'CREATE':
        case 'UPDATE':
        case 'DELETE':
            graphQLArguments ?? (graphQLArguments = {
                input: `${operationPrefix.charAt(0).toLocaleUpperCase() + operationPrefix.slice(1)}${namePascalCase}Input!`
            });
            graphQLOperationType ?? (graphQLOperationType = 'mutation');
        // TODO(Eslint): this this case clause correct without the break statement?
        // eslint-disable-next-line no-fallthrough
        case 'GET':
            graphQLArguments ?? (graphQLArguments = getPkArgs);
            graphQLSelectionSet ?? (graphQLSelectionSet = selectionSetFields);
        // TODO(Eslint): this this case clause correct without the break statement?
        // eslint-disable-next-line no-fallthrough
        case 'LIST':
            graphQLArguments ?? (graphQLArguments = {
                ...listPkArgs,
                // eslint doesn't like the ts-ignore, because it thinks it's unnecessary.
                // But TS doesn't like the `filter: ...` because it think it will always be
                // overwritten. (it won't be.) so, we need to ignore the TS error and then
                // ignore the eslint error on the ts-ignore.
                // eslint-disable-next-line
                // @ts-ignore
                filter: `Model${namePascalCase}FilterInput`,
                limit: 'Int',
                nextToken: 'String'
            });
            graphQLOperationType ?? (graphQLOperationType = 'query');
            graphQLSelectionSet ?? (graphQLSelectionSet = `items { ${selectionSetFields} } nextToken __typename`);
        // TODO(Eslint): this this case clause correct without the break statement?
        // eslint-disable-next-line no-fallthrough
        case 'INDEX_QUERY':
            graphQLArguments ?? (graphQLArguments = {
                ...indexQueryArgs,
                filter: `Model${namePascalCase}FilterInput`,
                sortDirection: 'ModelSortDirection',
                limit: 'Int',
                nextToken: 'String'
            });
            graphQLOperationType ?? (graphQLOperationType = 'query');
            graphQLSelectionSet ?? (graphQLSelectionSet = `items { ${selectionSetFields} } nextToken __typename`);
        // TODO(Eslint): this this case clause correct without the break statement?
        // eslint-disable-next-line no-fallthrough
        case 'ONCREATE':
        case 'ONUPDATE':
        case 'ONDELETE':
            graphQLArguments ?? (graphQLArguments = {
                filter: `ModelSubscription${namePascalCase}FilterInput`
            });
            graphQLOperationType ?? (graphQLOperationType = 'subscription');
            graphQLSelectionSet ?? (graphQLSelectionSet = selectionSetFields);
            break;
        case 'OBSERVEQUERY':
        default:
            throw new Error('Internal error: Attempted to generate graphql document for observeQuery. Please report this error.');
    }
    const graphQLDocument = `${graphQLOperationType}${graphQLArguments ? `(${Object.entries(graphQLArguments).map(([fieldName, type])=>`$${fieldName}: ${type}`)})` : ''} { ${graphQLFieldName}${graphQLArguments ? `(${Object.keys(graphQLArguments).map((fieldName)=>`${fieldName}: $${fieldName}`)})` : ''} { ${graphQLSelectionSet} } }`;
    return graphQLDocument;
}
function buildGraphQLVariables(modelDefinition, operation, arg, modelIntrospection, indexMeta) {
    const { fields, primaryKeyInfo: { isCustomPrimaryKey, primaryKeyFieldName, sortKeyFieldNames } } = modelDefinition;
    const skName = sortKeyFieldNames?.length && resolvedSkName(sortKeyFieldNames);
    let variables = {};
    // TODO: process input
    switch(operation){
        case 'CREATE':
            variables = {
                input: arg ? normalizeMutationInput(arg, modelDefinition, modelIntrospection) : {}
            };
            break;
        case 'UPDATE':
            // readonly fields are not  updated
            variables = {
                input: arg ? Object.fromEntries(Object.entries(normalizeMutationInput(arg, modelDefinition, modelIntrospection)).filter(([fieldName])=>{
                    // omit field from update input
                    // if exists in fields and marked read only
                    // if does not exist in fields but implicitly added to schema via ownership
                    return fields[fieldName] ? !fields[fieldName].isReadOnly : !(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$resolveOwnerFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveOwnerFields"])(modelDefinition).includes(fieldName);
                })) : {}
            };
            break;
        case 'GET':
        case 'DELETE':
            // only identifiers are sent
            if (arg) {
                variables = isCustomPrimaryKey ? [
                    primaryKeyFieldName,
                    ...sortKeyFieldNames
                ].reduce((acc, fieldName)=>{
                    acc[fieldName] = arg[fieldName];
                    return acc;
                }, {}) : {
                    [primaryKeyFieldName]: arg[primaryKeyFieldName]
                };
            }
            if (operation === 'DELETE') {
                variables = {
                    input: variables
                };
            }
            break;
        case 'LIST':
            if (arg?.filter) {
                variables.filter = arg.filter;
            }
            if (arg?.sortDirection) {
                variables.sortDirection = arg.sortDirection;
            }
            if (arg && arg[primaryKeyFieldName]) {
                variables[primaryKeyFieldName] = arg[primaryKeyFieldName];
            }
            if (skName && arg && arg[skName]) {
                variables[skName] = arg[skName];
            }
            if (arg?.nextToken) {
                variables.nextToken = arg.nextToken;
            }
            if (arg?.limit) {
                variables.limit = arg.limit;
            }
            break;
        case 'INDEX_QUERY':
            {
                const { pk, sk = [] } = indexMeta;
                const indexQuerySkName = sk?.length && resolvedSkName(sk);
                variables[pk] = arg[pk];
                if (indexQuerySkName && arg && arg[indexQuerySkName]) {
                    variables[indexQuerySkName] = arg[indexQuerySkName];
                }
                if (arg?.filter) {
                    variables.filter = arg.filter;
                }
                if (arg?.sortDirection) {
                    variables.sortDirection = arg.sortDirection;
                }
                if (arg?.nextToken) {
                    variables.nextToken = arg.nextToken;
                }
                if (arg?.limit) {
                    variables.limit = arg.limit;
                }
                break;
            }
        case 'ONCREATE':
        case 'ONUPDATE':
        case 'ONDELETE':
            if (arg?.filter) {
                variables = {
                    filter: arg.filter
                };
            }
            break;
        case 'OBSERVEQUERY':
            throw new Error('Internal error: Attempted to build variables for observeQuery. Please report this error.');
        default:
            {
                const exhaustiveCheck = operation;
                throw new Error(`Unhandled operation case: ${exhaustiveCheck}`);
            }
    }
    return variables;
}
/**
 * Iterates over mutation input values and resolves any model inputs to their corresponding join fields/values
 *
 * @example
 * ### Usage
 * ```ts
 * const result = normalizeMutationInput({ post: post }, model, modelDefinition);
 * ```
 * ### Result
 * ```ts
 * { postId: "abc123" }
 * ```
 *
 */ function normalizeMutationInput(mutationInput, model, modelIntrospection) {
    const { fields } = model;
    const normalized = {};
    Object.entries(mutationInput).forEach(([inputFieldName, inputValue])=>{
        const fieldType = fields[inputFieldName]?.type;
        const relatedModelName = fieldType?.model;
        if (relatedModelName) {
            const association = fields[inputFieldName]?.association;
            const relatedModelDef = modelIntrospection.models[relatedModelName];
            const relatedModelPkInfo = relatedModelDef.primaryKeyInfo;
            if (association?.connectionType === connectionType.HAS_ONE) {
                const associationHasOne = association;
                associationHasOne.targetNames.forEach((targetName, idx)=>{
                    const associatedFieldName = associationHasOne.associatedWith[idx];
                    normalized[targetName] = inputValue[associatedFieldName];
                });
            }
            if (association?.connectionType === connectionType.BELONGS_TO) {
                const associationBelongsTo = association;
                associationBelongsTo.targetNames.forEach((targetName, idx)=>{
                    if (idx === 0) {
                        const associatedFieldName = relatedModelPkInfo.primaryKeyFieldName;
                        normalized[targetName] = inputValue[associatedFieldName];
                    } else {
                        const associatedFieldName = relatedModelPkInfo.sortKeyFieldNames[idx - 1];
                        normalized[targetName] = inputValue[associatedFieldName];
                    }
                });
            }
        } else {
            normalized[inputFieldName] = inputValue;
        }
    });
    return normalized;
}
/**
 * Produces a parameter object that can contains auth mode/token overrides
 * only if present in either `options` (first) or configured on the `client`
 * as a fallback.
 *
 * @param client Configured client from `generateClient`
 * @param options Args/Options object from call site.
 * @returns
 */ function authModeParams(client, getInternals, options = {}) {
    const internals = getInternals(client);
    return {
        authMode: options.authMode || internals.authMode,
        authToken: options.authToken || internals.authToken
    };
}
/**
 * Retrieves custom headers from either the client or request options.
 * @param client V6Client | V6ClientSSRRequest | V6ClientSSRCookies - for extracting client headers
 * @param requestHeaders {@link CustomHeaders} - request headers
 * @returns custom headers as {@link CustomHeaders}
 */ function getCustomHeaders(client, getInternals, requestHeaders) {
    let headers = getInternals(client).headers || {};
    // Individual request headers will take precedence over client headers.
    // We intentionally do *not* merge client and request headers.
    if (requestHeaders) {
        headers = requestHeaders;
    }
    return headers;
}
;
 //# sourceMappingURL=APIClient.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
// import { GraphQLFormattedError } from '@aws-amplify/data-schema-types';
/**
 * Handle errors for list return types (list and index query operations)
 */ __turbopack_context__.s([
    "handleListGraphQlError",
    ()=>handleListGraphQlError,
    "handleSingularGraphQlError",
    ()=>handleSingularGraphQlError
]);
function handleListGraphQlError(error) {
    if (error?.errors) {
        // graphql errors pass through
        return {
            ...error,
            data: []
        };
    } else {
        // non-graphql errors are re-thrown
        throw error;
    }
}
/**
 * Handle errors for singular return types (create, get, update, delete operations)
 */ function handleSingularGraphQlError(error) {
    if (error.errors) {
        // graphql errors pass through
        return {
            ...error,
            data: null
        };
    } else {
        // non-graphql errors are re-thrown
        throw error;
    }
}
;
 //# sourceMappingURL=utils.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Symbol used for internal user agent overrides.
 *
 * @internal
 * This symbol is intended for internal use within the Amplify library.
 * It may change or be removed in future versions without notice.
 * External usage of this symbol is discouraged and may lead to unexpected behavior.
 */ __turbopack_context__.s([
    "AiAction",
    ()=>AiAction,
    "INTERNAL_USER_AGENT_OVERRIDE",
    ()=>INTERNAL_USER_AGENT_OVERRIDE,
    "createUserAgentOverride",
    ()=>createUserAgentOverride,
    "getCustomUserAgentDetails",
    ()=>getCustomUserAgentDetails
]);
const INTERNAL_USER_AGENT_OVERRIDE = Symbol('INTERNAL_USER_AGENT_OVERRIDE');
var AiAction;
(function(AiAction) {
    AiAction["CreateConversation"] = "1";
    AiAction["GetConversation"] = "2";
    AiAction["ListConversations"] = "3";
    AiAction["DeleteConversation"] = "4";
    AiAction["SendMessage"] = "5";
    AiAction["ListMessages"] = "6";
    AiAction["OnStreamEvent"] = "7";
    AiAction["Generation"] = "8";
    AiAction["UpdateConversation"] = "9";
})(AiAction || (AiAction = {}));
const getCustomUserAgentDetails = (action)=>({
        category: 'ai',
        action
    });
/**
 * Creates a user agent override object based on custom details.
 *
 * @internal
 * This function is intended for internal use within the Amplify library.
 * It may change or be removed in future versions without notice.
 *
 * @param customUserAgentDetails - Optional custom user agent details
 * @returns An object with INTERNAL_USER_AGENT_OVERRIDE symbol as key and customUserAgentDetails as value, or undefined if no details provided
 */ function createUserAgentOverride(customUserAgentDetails) {
    return customUserAgentDetails ? {
        [INTERNAL_USER_AGENT_OVERRIDE]: customUserAgentDetails
    } : undefined;
}
;
 //# sourceMappingURL=getCustomUserAgentDetails.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "customOpFactory",
    ()=>customOpFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/rxjs/dist/cjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
/**
 * Type guard for checking whether a Custom Operation argument is a contextSpec object
 */ const argIsContextSpec = (arg)=>{
    return typeof arg?.token?.value === 'symbol';
};
/**
 * Builds an operation function, embedded with all client and context data, that
 * can be attached to a client as a custom query or mutation.
 *
 * If we have this source schema:
 *
 * ```typescript
 * a.schema({
 *   echo: a.query()
 *     .arguments({input: a.string().required()})
 *     .returns(a.string())
 * })
 * ```
 *
 * Our model intro schema will contain an entry like this:
 *
 * ```ts
 * {
 *   queries: {
 *     echo: {
 *       name: "echo",
 *       isArray: false,
 *       type: 'String',
 *       isRequired: false,
 *       arguments: {
 *         input: {
 *           name: 'input',
 *           isArray: false,
 *           type: String,
 *           isRequired: true
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * The `echo` object is used to build the `echo' method that goes here:
 *
 * ```typescript
 * const client = generateClent()
 * const { data } = await client.queries.echo({input: 'a string'});
 * //                                    ^
 * //                                    |
 * //                                    +-- This one right here.
 * //
 * ```
 *
 *
 * @param client The client to run graphql queries through.
 * @param modelIntrospection The model introspection schema the op comes from.
 * @param operationType The broad category of graphql operation.
 * @param operation The operation definition from the introspection schema.
 * @param useContext Whether the function needs to accept an SSR context.
 * @returns The operation function to attach to query, mutations, etc.
 */ function customOpFactory(client, modelIntrospection, operationType, operation, useContext, getInternals, customUserAgentDetails) {
    // .arguments() are defined for the custom operation in the schema builder
    // and are present in the model introspection schema
    const argsDefined = operation.arguments !== undefined;
    const op = (...args)=>{
        // options is always the last argument
        const options = args[args.length - 1];
        let contextSpec;
        let arg;
        if (useContext) {
            if (argIsContextSpec(args[0])) {
                contextSpec = args[0];
            } else {
                throw new Error(`Invalid first argument passed to ${operation.name}. Expected contextSpec`);
            }
        }
        if (argsDefined) {
            if (useContext) {
                arg = args[1];
            } else {
                arg = args[0];
            }
        }
        if (operationType === 'subscription') {
            return _opSubscription(// subscriptions are only enabled on the clientside
            client, modelIntrospection, operation, getInternals, arg, options, customUserAgentDetails);
        }
        return _op(client, modelIntrospection, operationType, operation, getInternals, arg, options, contextSpec, customUserAgentDetails);
    };
    return op;
}
/**
 * Runtime test and type guard to check whether `o[field]` is a `String`.
 *
 * ```typescript
 * if (hasStringField(o, 'prop')) {
 *   const s = o.prop;
 *   //    ^? const s: string
 * }
 * ```
 *
 * @param o Object to inspect
 * @param field Field to look for
 * @returns Boolean: `true` if the `o[field]` is a `string`
 */ function hasStringField(o, field) {
    return typeof o[field] === 'string';
}
function isEnumType(type) {
    return type instanceof Object && 'enum' in type;
}
function isInputType(type) {
    return type instanceof Object && 'input' in type;
}
/**
 * @param argDef A single argument definition from a custom operation
 * @returns A string naming the base type including the `!` if the arg is required.
 */ function argumentBaseTypeString({ type, isRequired }) {
    const requiredFlag = isRequired ? '!' : '';
    if (isEnumType(type)) {
        return `${type.enum}${requiredFlag}`;
    }
    if (isInputType(type)) {
        return `${type.input}${requiredFlag}`;
    }
    return `${type}${requiredFlag}`;
}
/**
 * Generates "outer" arguments string for a custom operation. For example,
 * in this operation:
 *
 * ```graphql
 * query MyQuery(InputString: String!) {
 *   echoString(InputString: $InputString)
 * }
 * ```
 *
 * This function returns the top/outer level arguments as a string:
 *
 * ```json
 * "InputString: String!"
 * ```
 *
 * @param operation Operation object from model introspection schema.
 * @returns "outer" arguments string
 */ function outerArguments(operation) {
    if (operation.arguments === undefined) {
        return '';
    }
    const args = Object.entries(operation.arguments).map(([k, argument])=>{
        const baseType = argumentBaseTypeString(argument);
        const finalType = argument.isArray ? `[${baseType}]${argument.isArrayNullable ? '' : '!'}` : baseType;
        return `$${k}: ${finalType}`;
    }).join(', ');
    return args.length > 0 ? `(${args})` : '';
}
/**
 * Generates "inner" arguments string for a custom operation. For example,
 * in this operation:
 *
 * ```graphql
 * query MyQuery(InputString: String!) {
 *   echoString(InputString: $InputString)
 * }
 * ```
 *
 * This function returns the inner arguments as a string:
 *
 * ```json
 * "InputString: $InputString"
 * ```
 *
 * @param operation Operation object from model introspection schema.
 * @returns "outer" arguments string
 */ function innerArguments(operation) {
    if (operation.arguments === undefined) {
        return '';
    }
    const args = Object.keys(operation.arguments).map((k)=>`${k}: $${k}`).join(', ');
    return args.length > 0 ? `(${args})` : '';
}
/**
 * Generates the selection set string for a custom operation. This is slightly
 * different than the selection set generation for models. If the custom op returns
 * a primitive or enum types, it doesn't require a selection set at all.
 *
 * E.g., the graphql might look like this:
 *
 * ```graphql
 * query MyQuery {
 *   echoString(inputString: "whatever")
 * }
 * #                                     ^
 * #                                     |
 * #                                     +-- no selection set
 * ```
 *
 * Non-primitive return type selection set generation will be similar to other
 * model operations.
 *
 * @param modelIntrospection The full code-generated introspection schema.
 * @param operation The operation object from the schema.
 * @returns The selection set as a string.
 */ function operationSelectionSet(modelIntrospection, operation) {
    if (hasStringField(operation, 'type') || hasStringField(operation.type, 'enum')) {
        return '';
    } else if (hasStringField(operation.type, 'nonModel')) {
        const nonModel = modelIntrospection.nonModels[operation.type.nonModel];
        return `{${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selectionSetIRToString"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDefaultSelectionSetForNonModelWithIR"])(nonModel, modelIntrospection))}}`;
    } else if (hasStringField(operation.type, 'model')) {
        return `{${(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateSelectionSet"])(modelIntrospection, operation.type.model)}}`;
    } else {
        return '';
    }
}
/**
 * Maps an arguments objec to graphql variables, removing superfluous args and
 * screaming loudly when required args are missing.
 *
 * @param operation The operation to construct graphql request variables for.
 * @param args The arguments to map variables from.
 * @returns The graphql variables object.
 */ function operationVariables(operation, args = {}) {
    const variables = {};
    if (operation.arguments === undefined) {
        return variables;
    }
    for (const argDef of Object.values(operation.arguments)){
        if (typeof args[argDef.name] !== 'undefined') {
            variables[argDef.name] = args[argDef.name];
        } else if (argDef.isRequired) {
            // At this point, the variable is both required and missing: We don't need
            // to continue. The operation is expected to fail.
            throw new Error(`${operation.name} requires arguments '${argDef.name}'`);
        }
    }
    return variables;
}
/**
 * Executes an operation from the given model intro schema against a client, returning
 * a fully instantiated model when relevant.
 *
 * @param client The client to operate `graphql()` calls through.
 * @param modelIntrospection The model intro schema to construct requests from.
 * @param operationType The high level graphql operation type.
 * @param operation The specific operation name, args, return type details.
 * @param args The arguments to provide to the operation as variables.
 * @param options Request options like headers, etc.
 * @param context SSR context if relevant.
 * @returns Result from the graphql request, model-instantiated when relevant.
 */ function _op(client, modelIntrospection, operationType, operation, getInternals, args, options, context, customUserAgentDetails) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selfAwareAsync"])(async (resultPromise)=>{
        const { name: operationName } = operation;
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authModeParams"])(client, getInternals, options);
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomHeaders"])(client, getInternals, options?.headers);
        const outerArgsString = outerArguments(operation);
        const innerArgsString = innerArguments(operation);
        const selectionSet = operationSelectionSet(modelIntrospection, operation);
        const returnTypeModelName = hasStringField(operation.type, 'model') ? operation.type.model : undefined;
        const query = `
    ${operationType.toLocaleLowerCase()}${outerArgsString} {
      ${operationName}${innerArgsString} ${selectionSet}
    }
  `;
        const variables = operationVariables(operation, args);
        const userAgentOverride = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUserAgentOverride"])(customUserAgentDetails);
        try {
            const basePromise = context ? client.graphql(context, {
                ...auth,
                query,
                variables
            }, headers) : client.graphql({
                ...auth,
                query,
                variables,
                ...userAgentOverride
            }, headers);
            const extendedPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendCancellability"])(basePromise, resultPromise);
            const { data, extensions } = await extendedPromise;
            // flatten response
            if (data) {
                const [key] = Object.keys(data);
                const isArrayResult = Array.isArray(data[key]);
                // TODO: when adding support for custom selection set, flattening will need
                // to occur recursively. For now, it's expected that related models are not
                // present in the result. Only FK's are present. Any related model properties
                // should be replaced with lazy loaders under the current implementation.
                const flattenedResult = isArrayResult ? data[key].filter((x)=>x) : data[key];
                // TODO: custom selection set. current selection set is default selection set only
                // custom selection set requires data-schema-type + runtime updates above.
                const initialized = returnTypeModelName ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, returnTypeModelName, isArrayResult ? flattenedResult : [
                    flattenedResult
                ], modelIntrospection, auth.authMode, auth.authToken, !!context) : flattenedResult;
                return {
                    data: !isArrayResult && Array.isArray(initialized) ? initialized.shift() : initialized,
                    extensions
                };
            } else {
                return {
                    data: null,
                    extensions
                };
            }
        } catch (error) {
            /**
             * The `data` type returned by `error` here could be:
             * 1) `null`
             * 2) an empty object
             * 3) "populated" but with a `null` value `{ getPost: null }`
             * 4) an actual record `{ getPost: { id: '1', title: 'Hello, World!' } }`
             */ const { data, errors } = error;
            /**
             * `data` is not `null`, and is not an empty object:
             */ if (data && Object.keys(data).length !== 0 && errors) {
                const [key] = Object.keys(data);
                const isArrayResult = Array.isArray(data[key]);
                // TODO: when adding support for custom selection set, flattening will need
                // to occur recursively. For now, it's expected that related models are not
                // present in the result. Only FK's are present. Any related model properties
                // should be replaced with lazy loaders under the current implementation.
                const flattenedResult = isArrayResult ? data[key].filter((x)=>x) : data[key];
                /**
                 * `flattenedResult` could be `null` here (e.g. `data: { getPost: null }`)
                 * if `flattenedResult`, result is an actual record:
                 */ if (flattenedResult) {
                    // TODO: custom selection set. current selection set is default selection set only
                    // custom selection set requires data-schema-type + runtime updates above.
                    const initialized = returnTypeModelName ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, returnTypeModelName, isArrayResult ? flattenedResult : [
                        flattenedResult
                    ], modelIntrospection, auth.authMode, auth.authToken, !!context) : flattenedResult;
                    return {
                        data: !isArrayResult && Array.isArray(initialized) ? initialized.shift() : initialized,
                        errors
                    };
                } else {
                    // was `data: { getPost: null }`)
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleSingularGraphQlError"])(error);
                }
            } else {
                // `data` is `null`:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleSingularGraphQlError"])(error);
            }
        }
    });
}
/**
 * Executes an operation from the given model intro schema against a client, returning
 * a fully instantiated model when relevant.
 *
 * @param client The client to operate `graphql()` calls through.
 * @param modelIntrospection The model intro schema to construct requests from.
 * @param operation The specific operation name, args, return type details.
 * @param args The arguments to provide to the operation as variables.
 * @param options Request options like headers, etc.
 * @returns Result from the graphql request, model-instantiated when relevant.
 */ function _opSubscription(client, modelIntrospection, operation, getInternals, args, options, customUserAgentDetails) {
    const operationType = 'subscription';
    const { name: operationName } = operation;
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authModeParams"])(client, getInternals, options);
    const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomHeaders"])(client, getInternals, options?.headers);
    const outerArgsString = outerArguments(operation);
    const innerArgsString = innerArguments(operation);
    const selectionSet = operationSelectionSet(modelIntrospection, operation);
    const returnTypeModelName = hasStringField(operation.type, 'model') ? operation.type.model : undefined;
    const query = `
    ${operationType.toLocaleLowerCase()}${outerArgsString} {
      ${operationName}${innerArgsString} ${selectionSet}
    }
  `;
    const variables = operationVariables(operation, args);
    const userAgentOverride = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUserAgentOverride"])(customUserAgentDetails);
    const observable = client.graphql({
        ...auth,
        query,
        variables,
        ...userAgentOverride
    }, headers);
    return observable.pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])((value)=>{
        const [key] = Object.keys(value.data);
        const data = value.data[key];
        const [initialized] = returnTypeModelName ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, returnTypeModelName, [
            data
        ], modelIntrospection, auth.authMode, auth.authToken) : [
            data
        ];
        return initialized;
    }));
}
;
 //# sourceMappingURL=custom.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/generateCustomOperationsProperty.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateCustomMutationsProperty",
    ()=>generateCustomMutationsProperty,
    "generateCustomOperationsProperty",
    ()=>generateCustomOperationsProperty,
    "generateCustomQueriesProperty",
    ()=>generateCustomQueriesProperty,
    "generateCustomSubscriptionsProperty",
    ()=>generateCustomSubscriptionsProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs [app-route] (ecmascript)");
;
const operationTypeMap = {
    queries: 'query',
    mutations: 'mutation',
    subscriptions: 'subscription'
};
function generateCustomOperationsProperty(client, config, operationsType, getInternals) {
    // some bundlers end up with `Amplify.configure` being called *after* generate client.
    // if that occurs, we need to *not error* while we wait. handling for late configuration
    // occurs in `generateClient()`. we do not need to subscribe to Hub events here.
    if (!config) {
        return {};
    }
    const modelIntrospection = config.modelIntrospection;
    // model intro schema might be absent if there's not actually a configured GraphQL API
    if (!modelIntrospection) {
        return {};
    }
    // custom operations will be absent from model intro schema if no custom ops
    // are present on the source schema.
    const operations = modelIntrospection[operationsType];
    if (!operations) {
        return {};
    }
    const ops = {};
    const useContext = getInternals(client).amplify === null;
    for (const operation of Object.values(operations)){
        ops[operation.name] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customOpFactory"])(client, modelIntrospection, operationTypeMap[operationsType], operation, useContext, getInternals);
    }
    return ops;
}
function generateCustomMutationsProperty(client, config, getInternals) {
    return generateCustomOperationsProperty(client, config, 'mutations', getInternals);
}
function generateCustomQueriesProperty(client, config, getInternals) {
    return generateCustomOperationsProperty(client, config, 'queries', getInternals);
}
function generateCustomSubscriptionsProperty(client, config, getInternals) {
    return generateCustomOperationsProperty(client, config, 'subscriptions', getInternals);
}
;
 //# sourceMappingURL=generateCustomOperationsProperty.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFactory",
    ()=>getFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
;
;
function getFactory(client, modelIntrospection, model, operation, getInternals, useContext = false, customUserAgentDetails) {
    const getWithContext = (contextSpec, arg, options)=>{
        return _get(client, modelIntrospection, model, arg, options, operation, getInternals, contextSpec, customUserAgentDetails);
    };
    const get = (arg, options)=>{
        return _get(client, modelIntrospection, model, arg, options, operation, getInternals, undefined, customUserAgentDetails);
    };
    return useContext ? getWithContext : get;
}
function _get(client, modelIntrospection, model, arg, options, operation, getInternals, context, customUserAgentDetails) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selfAwareAsync"])(async (resultPromise)=>{
        const { name } = model;
        const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGraphQLDocument"])(modelIntrospection, model, operation, options);
        const variables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildGraphQLVariables"])(model, operation, arg, modelIntrospection);
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authModeParams"])(client, getInternals, options);
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomHeaders"])(client, getInternals, options?.headers);
        const userAgentOverride = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUserAgentOverride"])(customUserAgentDetails);
        try {
            const basePromise = context ? client.graphql(context, {
                ...auth,
                query,
                variables
            }, headers) : client.graphql({
                ...auth,
                query,
                variables,
                ...userAgentOverride
            }, headers);
            const extendedPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendCancellability"])(basePromise, resultPromise);
            const { data, extensions } = await extendedPromise;
            // flatten response
            if (data) {
                const [key] = Object.keys(data);
                const flattenedResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenItems"])(modelIntrospection, name, data[key]);
                if (flattenedResult === null) {
                    return {
                        data: null,
                        extensions
                    };
                } else if (options?.selectionSet) {
                    return {
                        data: flattenedResult,
                        extensions
                    };
                } else {
                    // TODO: refactor to avoid destructuring here
                    const [initialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, name, [
                        flattenedResult
                    ], modelIntrospection, auth.authMode, auth.authToken, !!context);
                    return {
                        data: initialized,
                        extensions
                    };
                }
            } else {
                return {
                    data: null,
                    extensions
                };
            }
        } catch (error) {
            /**
             * The `data` type returned by `error` here could be:
             * 1) `null`
             * 2) an empty object
             * 3) "populated" but with a `null` value `{ getPost: null }`
             * 4) an actual record `{ getPost: { id: '1', title: 'Hello, World!' } }`
             */ const { data, errors } = error;
            /**
             * `data` is not `null`, and is not an empty object:
             */ if (data && Object.keys(data).length !== 0 && errors) {
                const [key] = Object.keys(data);
                const flattenedResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenItems"])(modelIntrospection, name, data[key]);
                /**
                 * `flattenedResult` could be `null` here (e.g. `data: { getPost: null }`)
                 * if `flattenedResult`, result is an actual record:
                 */ if (flattenedResult) {
                    if (options?.selectionSet) {
                        return {
                            data: flattenedResult,
                            errors
                        };
                    } else {
                        // TODO: refactor to avoid destructuring here
                        const [initialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, name, [
                            flattenedResult
                        ], modelIntrospection, auth.authMode, auth.authToken, !!context);
                        return {
                            data: initialized,
                            errors
                        };
                    }
                } else {
                    // was `data: { getPost: null }`)
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleSingularGraphQlError"])(error);
                }
            } else {
                // `data` is `null`:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleSingularGraphQlError"])(error);
            }
        }
    });
}
;
 //# sourceMappingURL=get.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listFactory",
    ()=>listFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
;
;
function listFactory(client, modelIntrospection, model, getInternals, context = false, customUserAgentDetails) {
    const listWithContext = (contextSpec, args)=>{
        return _list(client, modelIntrospection, model, getInternals, args, contextSpec, customUserAgentDetails);
    };
    const list = (args)=>{
        return _list(client, modelIntrospection, model, getInternals, args, undefined, customUserAgentDetails);
    };
    return context ? listWithContext : list;
}
function _list(client, modelIntrospection, model, getInternals, args, contextSpec, customUserAgentDetails) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selfAwareAsync"])(async (resultPromise)=>{
        const { name } = model;
        const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGraphQLDocument"])(modelIntrospection, model, 'LIST', args);
        const variables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildGraphQLVariables"])(model, 'LIST', args, modelIntrospection);
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authModeParams"])(client, getInternals, args);
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomHeaders"])(client, getInternals, args?.headers);
        const userAgentOverride = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUserAgentOverride"])(customUserAgentDetails);
        try {
            const basePromise = contextSpec ? client.graphql(contextSpec, {
                ...auth,
                query,
                variables
            }, headers) : client.graphql({
                ...auth,
                query,
                variables,
                ...userAgentOverride
            }, headers);
            const extendedPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendCancellability"])(basePromise, resultPromise);
            const { data, extensions } = await extendedPromise;
            // flatten response
            if (data !== undefined) {
                const [key] = Object.keys(data);
                if (data[key].items) {
                    const flattenedResult = data[key].items.map((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenItems"])(modelIntrospection, name, value));
                    // don't init if custom selection set
                    if (args?.selectionSet) {
                        return {
                            data: flattenedResult,
                            nextToken: data[key].nextToken,
                            extensions
                        };
                    } else {
                        const initialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, name, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
                        return {
                            data: initialized,
                            nextToken: data[key].nextToken,
                            extensions
                        };
                    }
                }
                return {
                    data: data[key],
                    nextToken: data[key].nextToken,
                    extensions
                };
            }
        } catch (error) {
            /**
             * The `data` type returned by `error` here could be:
             * 1) `null`
             * 2) an empty object
             * 3) "populated" but with a `null` value `data: { listPosts: null }`
             * 4) actual records `data: { listPosts: items: [{ id: '1', ...etc }] }`
             */ const { data, errors } = error;
            // `data` is not `null`, and is not an empty object:
            if (data !== undefined && data !== null && Object.keys(data).length !== 0 && errors) {
                const [key] = Object.keys(data);
                if (data[key]?.items) {
                    const flattenedResult = data[key].items.map((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenItems"])(modelIntrospection, name, value));
                    /**
                     * Check exists since `flattenedResult` could be `null`.
                     * if `flattenedResult` exists, result is an actual record.
                     */ if (flattenedResult) {
                        // don't init if custom selection set
                        if (args?.selectionSet) {
                            return {
                                data: flattenedResult,
                                nextToken: data[key]?.nextToken,
                                errors
                            };
                        } else {
                            const initialized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, name, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
                            // data is full record w/out selection set:
                            return {
                                data: initialized,
                                nextToken: data[key]?.nextToken,
                                errors
                            };
                        }
                    }
                    return {
                        data: data[key],
                        nextToken: data[key]?.nextToken,
                        errors
                    };
                } else {
                    // response is of type `data: { getPost: null }`)
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleListGraphQlError"])(error);
                }
            } else {
                // `data` is `null` or an empty object:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleListGraphQlError"])(error);
            }
        }
    });
}
;
 //# sourceMappingURL=list.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageDeserializers.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deserializeContent",
    ()=>deserializeContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@smithy/util-base64/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@smithy/util-base64/dist-es/fromBase64.js [app-route] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const deserializeContent = (content)=>content.map((block)=>{
        if (block.image) {
            return deserializeImageBlock(block);
        }
        if (block.document) {
            return deserializeDocumentBlock(block);
        }
        if (block.toolUse) {
            return deserializeToolUseBlock(block);
        }
        if (block.toolResult) {
            return deserializeToolResultBlock(block);
        }
        return removeNullsFromBlock(block);
    });
const deserializeImageBlock = ({ image })=>({
        image: {
            ...image,
            source: {
                ...image.source,
                bytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBase64"])(image.source.bytes)
            }
        }
    });
const deserializeDocumentBlock = ({ document })=>({
        document: {
            ...document,
            source: {
                ...document.source,
                bytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$fromBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fromBase64"])(document.source.bytes)
            }
        }
    });
const deserializeJsonBlock = ({ json })=>({
        json: JSON.parse(json)
    });
const deserializeToolUseBlock = ({ toolUse })=>({
        toolUse: {
            ...toolUse,
            input: JSON.parse(toolUse.input)
        }
    });
const deserializeToolResultBlock = ({ toolResult })=>({
        toolResult: {
            toolUseId: toolResult.toolUseId,
            content: toolResult.content.map((toolResultBlock)=>{
                if (toolResultBlock.image) {
                    return deserializeImageBlock(toolResultBlock);
                }
                if (toolResultBlock.json) {
                    return deserializeJsonBlock(toolResultBlock);
                }
                return removeNullsFromBlock(toolResultBlock);
            })
        }
    });
const removeNullsFromBlock = (block)=>Object.fromEntries(Object.entries(block).filter(([_, v])=>v !== null));
;
 //# sourceMappingURL=conversationMessageDeserializers.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversationMessage.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertItemToConversationMessage",
    ()=>convertItemToConversationMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$conversationMessageDeserializers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageDeserializers.mjs [app-route] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const convertItemToConversationMessage = ({ content, createdAt, id, conversationId, role })=>({
        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$conversationMessageDeserializers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deserializeContent"])(content ?? []),
        conversationId,
        createdAt,
        id,
        role
    });
;
 //# sourceMappingURL=convertItemToConversationMessage.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListMessagesFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createListMessagesFunction",
    ()=>createListMessagesFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$list$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversationMessage$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversationMessage.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createListMessagesFunction = (client, modelIntrospection, conversationId, conversationMessageModel, getInternals)=>async (input)=>{
        const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$list$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listFactory"])(client, modelIntrospection, conversationMessageModel, getInternals, false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].ListMessages));
        const { data, nextToken, errors } = await list({
            ...input,
            filter: {
                conversationId: {
                    eq: conversationId
                }
            }
        });
        return {
            data: data.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversationMessage$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertItemToConversationMessage"])(item)),
            nextToken,
            errors
        };
    };
;
 //# sourceMappingURL=createListMessagesFunction.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationStreamEventDeserializers.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "convertItemToConversationStreamEvent",
    ()=>convertItemToConversationStreamEvent
]);
const convertItemToConversationStreamEvent = ({ id, conversationId, associatedUserMessageId, contentBlockIndex, contentBlockDoneAtIndex, contentBlockDeltaIndex, contentBlockText, contentBlockToolUse, stopReason, errors })=>{
    if (errors) {
        const error = {
            id,
            conversationId,
            associatedUserMessageId,
            errors
        };
        return {
            error
        };
    }
    const next = removeNullsFromConversationStreamEvent({
        id,
        conversationId,
        associatedUserMessageId,
        contentBlockIndex,
        contentBlockDoneAtIndex,
        contentBlockDeltaIndex,
        text: contentBlockText,
        toolUse: deserializeToolUseBlock(contentBlockToolUse),
        stopReason
    });
    return {
        next
    };
};
const deserializeToolUseBlock = (contentBlockToolUse)=>{
    if (contentBlockToolUse) {
        const toolUseBlock = {
            ...contentBlockToolUse,
            input: JSON.parse(contentBlockToolUse.input)
        };
        return toolUseBlock;
    }
};
const removeNullsFromConversationStreamEvent = (block)=>Object.fromEntries(Object.entries(block).filter(([_, v])=>v !== null));
;
 //# sourceMappingURL=conversationStreamEventDeserializers.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createOnStreamEventFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOnStreamEventFunction",
    ()=>createOnStreamEventFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$conversationStreamEventDeserializers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationStreamEventDeserializers.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createOnStreamEventFunction = (client, modelIntrospection, conversationId, conversationRouteName, getInternals)=>(handler)=>{
        const { conversations } = modelIntrospection;
        // Safe guard for standalone function. When called as part of client generation, this should never be falsy.
        if (!conversations) {
            return {};
        }
        const subscribeSchema = conversations[conversationRouteName].message.subscribe;
        const subscribeOperation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customOpFactory"])(client, modelIntrospection, 'subscription', subscribeSchema, false, getInternals, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].OnStreamEvent));
        return subscribeOperation({
            conversationId
        }).subscribe((data)=>{
            const { next, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$conversationStreamEventDeserializers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertItemToConversationStreamEvent"])(data);
            if (error) handler.error(error);
            if (next) handler.next(next);
        });
    };
;
 //# sourceMappingURL=createOnStreamEventFunction.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageSerializers.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "serializeAiContext",
    ()=>serializeAiContext,
    "serializeContent",
    ()=>serializeContent,
    "serializeToolConfiguration",
    ()=>serializeToolConfiguration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@smithy/util-base64/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@smithy/util-base64/dist-es/toBase64.js [app-route] (ecmascript)");
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const serializeAiContext = (aiContext)=>JSON.stringify(aiContext);
const serializeContent = (content)=>content.map((block)=>{
        if (block.image) {
            return serializeImageBlock(block);
        }
        if (block.document) {
            return serializeDocumentBlock(block);
        }
        if (block.toolResult) {
            return serializeToolResultBlock(block);
        }
        return block;
    });
const serializeToolConfiguration = ({ tools })=>({
        tools: Object.entries(tools).map(([name, tool])=>({
                toolSpec: {
                    name,
                    description: tool.description,
                    inputSchema: {
                        json: JSON.stringify(tool.inputSchema.json)
                    }
                }
            }))
    });
const serializeImageBlock = ({ image })=>({
        image: {
            ...image,
            source: {
                ...image.source,
                bytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBase64"])(image.source.bytes)
            }
        }
    });
const serializeDocumentBlock = ({ document })=>({
        document: {
            ...document,
            source: {
                ...document.source,
                bytes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$toBase64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toBase64"])(document.source.bytes)
            }
        }
    });
const serializeJsonBlock = ({ json })=>({
        json: JSON.stringify(json)
    });
const serializeToolResultBlock = ({ toolResult })=>({
        toolResult: {
            ...toolResult,
            content: toolResult.content.map((toolResultBlock)=>{
                if (toolResultBlock.image) {
                    return serializeImageBlock(toolResultBlock);
                }
                if (toolResultBlock.json) {
                    return serializeJsonBlock(toolResultBlock);
                }
                return toolResultBlock;
            })
        }
    });
;
 //# sourceMappingURL=conversationMessageSerializers.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createSendMessageFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSendMessageFunction",
    ()=>createSendMessageFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversationMessage$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversationMessage.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$conversationMessageSerializers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/conversationMessageSerializers.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createSendMessageFunction = (client, modelIntrospection, conversationId, conversationRouteName, getInternals)=>async (input)=>{
        const { conversations } = modelIntrospection;
        // Safe guard for standalone function. When called as part of client generation, this should never be falsy.
        if (!conversations) {
            return {};
        }
        const processedInput = typeof input === 'string' ? {
            content: [
                {
                    text: input
                }
            ]
        } : input;
        const { content, aiContext, toolConfiguration } = processedInput;
        const sendSchema = conversations[conversationRouteName].message.send;
        const sendOperation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customOpFactory"])(client, modelIntrospection, 'mutation', sendSchema, false, getInternals, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].SendMessage));
        const { data, errors } = await sendOperation({
            conversationId,
            content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$conversationMessageSerializers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeContent"])(content),
            ...aiContext && {
                aiContext: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$conversationMessageSerializers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeAiContext"])(aiContext)
            },
            ...toolConfiguration && {
                toolConfiguration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$conversationMessageSerializers$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeToolConfiguration"])(toolConfiguration)
            }
        });
        return {
            data: data ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversationMessage$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertItemToConversationMessage"])(data) : data,
            errors
        };
    };
;
 //# sourceMappingURL=createSendMessageFunction.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertItemToConversation",
    ()=>convertItemToConversation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createListMessagesFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListMessagesFunction.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createOnStreamEventFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createOnStreamEventFunction.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createSendMessageFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createSendMessageFunction.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const convertItemToConversation = (client, modelIntrospection, conversationId, conversationCreatedAt, conversationUpdatedAt, conversationRouteName, conversationMessageModel, getInternals, conversationMetadata, conversationName)=>{
    if (!conversationId) {
        throw new Error(`An error occurred converting a ${conversationRouteName} conversation: Missing ID`);
    }
    return {
        id: conversationId,
        createdAt: conversationCreatedAt,
        updatedAt: conversationUpdatedAt,
        metadata: conversationMetadata,
        name: conversationName,
        onStreamEvent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createOnStreamEventFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createOnStreamEventFunction"])(client, modelIntrospection, conversationId, conversationRouteName, getInternals),
        sendMessage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createSendMessageFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSendMessageFunction"])(client, modelIntrospection, conversationId, conversationRouteName, getInternals),
        listMessages: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createListMessagesFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createListMessagesFunction"])(client, modelIntrospection, conversationId, conversationMessageModel, getInternals)
    };
};
;
 //# sourceMappingURL=convertItemToConversation.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createCreateConversationFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCreateConversationFunction",
    ()=>createCreateConversationFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createCreateConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals)=>async (input)=>{
        const { name, metadata: metadataObject } = input ?? {};
        const metadata = JSON.stringify(metadataObject);
        const createOperation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFactory"])(client, modelIntrospection, conversationModel, 'CREATE', getInternals, false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].CreateConversation));
        const { data, errors } = await createOperation({
            name,
            metadata
        });
        return {
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertItemToConversation"])(client, modelIntrospection, data?.id, data?.createdAt, data?.updatedAt, conversationRouteName, conversationMessageModel, getInternals, data?.metadata, data?.name),
            errors
        };
    };
;
 //# sourceMappingURL=createCreateConversationFunction.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createGetConversationFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createGetConversationFunction",
    ()=>createGetConversationFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createGetConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals)=>async ({ id })=>{
        const get = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFactory"])(client, modelIntrospection, conversationModel, 'GET', getInternals, false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].GetConversation));
        const { data, errors } = await get({
            id
        });
        return {
            data: data ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertItemToConversation"])(client, modelIntrospection, data.id, data.createdAt, data.updatedAt, conversationRouteName, conversationMessageModel, getInternals, data?.metadata, data?.name) : data,
            errors
        };
    };
;
 //# sourceMappingURL=createGetConversationFunction.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListConversationsFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createListConversationsFunction",
    ()=>createListConversationsFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$list$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createListConversationsFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals)=>async (input)=>{
        const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$list$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listFactory"])(client, modelIntrospection, conversationModel, getInternals, false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].ListConversations));
        const { data, nextToken, errors } = await list(input);
        return {
            data: data.map((datum)=>{
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertItemToConversation"])(client, modelIntrospection, datum.id, datum.createdAt, datum.updatedAt, conversationRouteName, conversationMessageModel, getInternals, datum?.metadata, datum?.name);
            }),
            nextToken,
            errors
        };
    };
;
 //# sourceMappingURL=createListConversationsFunction.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createDeleteConversationFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDeleteConversationFunction",
    ()=>createDeleteConversationFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createDeleteConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals)=>async ({ id })=>{
        const deleteOperation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFactory"])(client, modelIntrospection, conversationModel, 'DELETE', getInternals, false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].DeleteConversation));
        const { data, errors } = await deleteOperation({
            id
        });
        return {
            data: data ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertItemToConversation"])(client, modelIntrospection, data?.id, data?.createdAt, data?.updatedAt, conversationRouteName, conversationMessageModel, getInternals, data?.metadata, data?.name) : data,
            errors
        };
    };
;
 //# sourceMappingURL=createDeleteConversationFunction.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createUpdateConversationFunction.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUpdateConversationFunction",
    ()=>createUpdateConversationFunction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/convertItemToConversation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createUpdateConversationFunction = (client, modelIntrospection, conversationRouteName, conversationModel, conversationMessageModel, getInternals)=>async ({ id, metadata: metadataObject, name })=>{
        const metadata = JSON.stringify(metadataObject);
        const updateOperation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFactory"])(client, modelIntrospection, conversationModel, 'UPDATE', getInternals, false, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].UpdateConversation));
        const { data, errors } = await updateOperation({
            id,
            metadata,
            name
        });
        return {
            data: data ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$convertItemToConversation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["convertItemToConversation"])(client, modelIntrospection, data?.id, data?.createdAt, data?.updatedAt, conversationRouteName, conversationMessageModel, getInternals, data?.metadata, data?.name) : data,
            errors
        };
    };
;
 //# sourceMappingURL=createUpdateConversationFunction.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateConversationsProperty.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateConversationsProperty",
    ()=>generateConversationsProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createCreateConversationFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createCreateConversationFunction.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createGetConversationFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createGetConversationFunction.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createListConversationsFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createListConversationsFunction.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createDeleteConversationFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createDeleteConversationFunction.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createUpdateConversationFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/createUpdateConversationFunction.mjs [app-route] (ecmascript)");
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function generateConversationsProperty(client, apiGraphQLConfig, getInternals) {
    const modelIntrospection = apiGraphQLConfig?.modelIntrospection;
    // conversations will be absent from model intro schema if no conversation routes
    // are present on the source schema.
    if (!modelIntrospection?.conversations) {
        return {};
    }
    const conversations = {};
    for (const { name, conversation, message, models, nonModels, enums } of Object.values(modelIntrospection.conversations)){
        const conversationModel = models[conversation.modelName];
        const conversationMessageModel = models[message.modelName];
        if (!conversationModel || !conversationMessageModel) {
            return {};
        }
        const conversationModelIntrospection = {
            ...modelIntrospection,
            models: {
                ...modelIntrospection.models,
                ...models
            },
            nonModels: {
                ...modelIntrospection.nonModels,
                ...nonModels
            },
            enums: {
                ...modelIntrospection.enums,
                ...enums
            }
        };
        conversations[name] = {
            update: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createUpdateConversationFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createUpdateConversationFunction"])(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals),
            create: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createCreateConversationFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createCreateConversationFunction"])(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals),
            get: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createGetConversationFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createGetConversationFunction"])(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals),
            delete: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createDeleteConversationFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createDeleteConversationFunction"])(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals),
            list: (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$createListConversationsFunction$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createListConversationsFunction"])(client, conversationModelIntrospection, name, conversationModel, conversationMessageModel, getInternals)
        };
    }
    return conversations;
}
;
 //# sourceMappingURL=generateConversationsProperty.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateGenerationsProperty.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateGenerationsProperty",
    ()=>generateGenerationsProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/custom.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function generateGenerationsProperty(client, apiGraphQLConfig, getInternals) {
    const modelIntrospection = apiGraphQLConfig?.modelIntrospection;
    // generations will be absent from model intro schema if no generation routes
    // are present on the source schema.
    if (!modelIntrospection?.generations) {
        return {};
    }
    const generations = {};
    for (const generation of Object.values(modelIntrospection.generations)){
        generations[generation.name] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$custom$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["customOpFactory"])(client, modelIntrospection, 'query', generation, false, getInternals, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomUserAgentDetails"])(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AiAction"].Generation));
    }
    return generations;
}
;
 //# sourceMappingURL=generateGenerationsProperty.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateEnumsProperty.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
__turbopack_context__.s([
    "generateEnumsProperty",
    ()=>generateEnumsProperty
]);
const generateEnumsProperty = (graphqlConfig)=>{
    const modelIntrospection = graphqlConfig.modelIntrospection;
    if (!modelIntrospection) {
        return {};
    }
    const enums = {};
    for (const [_, enumData] of Object.entries(modelIntrospection.enums)){
        enums[enumData.name] = {
            values: ()=>enumData.values
        };
    }
    return enums;
};
;
 //# sourceMappingURL=generateEnumsProperty.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/indexQuery.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "indexQueryFactory",
    ()=>indexQueryFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/utils.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/selfAwareAsync.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs [app-route] (ecmascript)");
;
;
;
;
function indexQueryFactory(client, modelIntrospection, model, indexMeta, getInternals, context = false) {
    const indexQueryWithContext = (contextSpec, args, options)=>{
        return _indexQuery(client, modelIntrospection, model, indexMeta, getInternals, {
            ...args,
            ...options
        }, contextSpec);
    };
    const indexQuery = (args, options)=>{
        return _indexQuery(client, modelIntrospection, model, indexMeta, getInternals, {
            ...args,
            ...options
        });
    };
    return context ? indexQueryWithContext : indexQuery;
}
function processGraphQlResponse(modelIntroSchema, modelName, result, selectionSet, modelInitializer) {
    const { data, extensions } = result;
    const [key] = Object.keys(data);
    if (data[key].items) {
        const flattenedResult = data[key].items.map((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenItems"])(modelIntroSchema, modelName, value));
        return {
            data: selectionSet ? flattenedResult : modelInitializer(flattenedResult),
            nextToken: data[key].nextToken,
            extensions
        };
    }
    // Index queries are always list queries. No `items`? No flattening needed.
    return {
        data: data[key],
        nextToken: data[key].nextToken,
        extensions
    };
}
function _indexQuery(client, modelIntrospection, model, indexMeta, getInternals, args, contextSpec) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$selfAwareAsync$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["selfAwareAsync"])(async (resultPromise)=>{
        const { name } = model;
        const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGraphQLDocument"])(modelIntrospection, model, 'INDEX_QUERY', args, indexMeta);
        const variables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildGraphQLVariables"])(model, 'INDEX_QUERY', args, modelIntrospection, indexMeta);
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authModeParams"])(client, getInternals, args);
        const modelInitializer = (flattenedResult)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, name, flattenedResult, modelIntrospection, auth.authMode, auth.authToken, !!contextSpec);
        try {
            const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomHeaders"])(client, getInternals, args?.headers);
            const graphQlParams = {
                ...auth,
                query,
                variables
            };
            const requestArgs = [
                graphQlParams,
                headers
            ];
            if (contextSpec !== undefined) {
                requestArgs.unshift(contextSpec);
            }
            const basePromise = client.graphql(...requestArgs);
            const extendedPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extendCancellability"])(basePromise, resultPromise);
            const response = await extendedPromise;
            if (response.data !== undefined) {
                return processGraphQlResponse(modelIntrospection, name, response, args?.selectionSet, modelInitializer);
            }
        } catch (error) {
            /**
             * The `data` type returned by `error` here could be:
             * 1) `null`
             * 2) an empty object
             * 3) "populated" but with a `null` value:
             *   `data: { listByExampleId: null }`
             * 4) an actual record:
             *   `data: { listByExampleId: items: [{ id: '1', ...etc } }]`
             */ const { data, errors } = error;
            // `data` is not `null`, and is not an empty object:
            if (data !== undefined && data !== null && Object.keys(data).length !== 0 && errors) {
                const [key] = Object.keys(data);
                if (data[key]?.items) {
                    const flattenedResult = data[key]?.items.map((value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenItems"])(modelIntrospection, name, value));
                    /**
                     * Check exists since `flattenedResult` could be `null`.
                     * if `flattenedResult` exists, result is an actual record.
                     */ if (flattenedResult) {
                        return {
                            data: args?.selectionSet ? flattenedResult : modelInitializer(flattenedResult),
                            nextToken: data[key]?.nextToken
                        };
                    }
                }
                // response is of type `data: { listByExampleId: null }`
                return {
                    data: data[key],
                    nextToken: data[key]?.nextToken
                };
            } else {
                // `data` is `null` or an empty object:
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$utils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleListGraphQlError"])(error);
            }
        }
    });
}
;
 //# sourceMappingURL=indexQuery.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/subscription.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "subscriptionFactory",
    ()=>subscriptionFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/rxjs/dist/cjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs [app-route] (ecmascript)");
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function subscriptionFactory(client, modelIntrospection, model, operation, getInternals) {
    const { name } = model;
    const subscription = (args)=>{
        const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGraphQLDocument"])(modelIntrospection, model, operation, args);
        const variables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildGraphQLVariables"])(model, operation, args, modelIntrospection);
        const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authModeParams"])(client, getInternals, args);
        const headers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCustomHeaders"])(client, getInternals, args?.headers);
        const observable = client.graphql({
            ...auth,
            query,
            variables
        }, headers);
        return observable.pipe((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["map"])((value)=>{
            const [key] = Object.keys(value.data);
            const data = value.data[key];
            const flattenedResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenItems"])(modelIntrospection, name, data);
            if (flattenedResult === null) {
                return null;
            } else if (args?.selectionSet) {
                return flattenedResult;
            } else {
                const [initialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeModel"])(client, name, [
                    flattenedResult
                ], modelIntrospection, auth.authMode, auth.authToken);
                return initialized;
            }
        }));
    };
    return subscription;
}
;
 //# sourceMappingURL=subscription.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolvePKFields.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Given a SchemaModel from a ModelIntrospectionSchema, returns the primary key
 * as an array of field names.
 *
 * @param model The model object
 * @returns Array of field names
 */ __turbopack_context__.s([
    "resolvePKFields",
    ()=>resolvePKFields
]);
function resolvePKFields(model) {
    const { primaryKeyFieldName, sortKeyFieldNames } = model.primaryKeyInfo;
    return [
        primaryKeyFieldName,
        ...sortKeyFieldNames
    ];
}
;
 //# sourceMappingURL=resolvePKFields.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/findIndexByFields.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Iterates through a collection to find a matching item and returns the index.
 *
 * @param needle The item to search for
 * @param haystack The collection to search
 * @param keyFields The fields used to indicate a match
 * @returns Index of `needle` in `haystack`, otherwise -1 if not found.
 */ __turbopack_context__.s([
    "findIndexByFields",
    ()=>findIndexByFields
]);
function findIndexByFields(needle, haystack, keyFields) {
    const searchObject = Object.fromEntries(keyFields.map((fieldName)=>[
            fieldName,
            needle[fieldName]
        ]));
    for(let i = 0; i < haystack.length; i++){
        if (Object.keys(searchObject).every((k)=>searchObject[k] === haystack[i][k])) {
            return i;
        }
    }
    return -1;
}
;
 //# sourceMappingURL=findIndexByFields.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/observeQuery.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "observeQueryFactory",
    ()=>observeQueryFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/rxjs/dist/cjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$resolvePKFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/resolvePKFields.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$findIndexByFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/utils/findIndexByFields.mjs [app-route] (ecmascript)");
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function observeQueryFactory(models, model) {
    const { name } = model;
    const observeQuery = (arg)=>new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Observable"]((subscriber)=>{
            // what we'll be sending to our subscribers
            const items = [];
            // To enqueue subscription messages while we collect our initial
            // result set.
            const messageQueue = [];
            // operation to take when message(s) arrive.
            // this operation will be swapped out once initial "sync" is complete
            // to immediately ingest messsages.
            let receiveMessages = (...messages)=>{
                return messageQueue.push(...messages);
            };
            // start subscriptions
            const onCreateSub = models[name].onCreate(arg).subscribe({
                next (item) {
                    receiveMessages({
                        item,
                        type: 'create'
                    });
                },
                error (error) {
                    subscriber.error({
                        type: 'onCreate',
                        error
                    });
                }
            });
            const onUpdateSub = models[name].onUpdate(arg).subscribe({
                next (item) {
                    receiveMessages({
                        item,
                        type: 'update'
                    });
                },
                error (error) {
                    subscriber.error({
                        type: 'onUpdate',
                        error
                    });
                }
            });
            const onDeleteSub = models[name].onDelete(arg).subscribe({
                next (item) {
                    receiveMessages({
                        item,
                        type: 'delete'
                    });
                },
                error (error) {
                    subscriber.error({
                        type: 'onDelete',
                        error
                    });
                }
            });
            // consumes a list of messages and sends a snapshot
            function ingestMessages(messages) {
                for (const message of messages){
                    const idx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$findIndexByFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findIndexByFields"])(message.item, items, pkFields);
                    switch(message.type){
                        case 'create':
                            if (idx < 0) items.push(message.item);
                            break;
                        case 'update':
                            if (idx >= 0) items[idx] = message.item;
                            break;
                        case 'delete':
                            if (idx >= 0) items.splice(idx, 1);
                            break;
                        default:
                            console.error('Unrecognized message in observeQuery.', message);
                    }
                }
                subscriber.next({
                    items,
                    isSynced: true
                });
            }
            const pkFields = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$utils$2f$resolvePKFields$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolvePKFields"])(model);
            // initial results
            (async ()=>{
                let firstPage = true;
                let nextToken = null;
                while(!subscriber.closed && (firstPage || nextToken)){
                    firstPage = false;
                    const { data: page, errors, nextToken: _nextToken } = await models[name].list({
                        ...arg,
                        nextToken
                    });
                    nextToken = _nextToken;
                    items.push(...page);
                    // if there are no more pages and no items we already know about
                    // that need to be merged in from sub, we're "synced"
                    const isSynced = messageQueue.length === 0 && (nextToken === null || nextToken === undefined);
                    subscriber.next({
                        items,
                        isSynced
                    });
                    if (Array.isArray(errors)) {
                        for (const error of errors){
                            subscriber.error(error);
                        }
                    }
                }
                // play through the queue
                if (messageQueue.length > 0) {
                    ingestMessages(messageQueue);
                }
                // switch the queue to write directly to the items collection
                receiveMessages = (...messages)=>{
                    ingestMessages(messages);
                    return items.length;
                };
            })();
            // when subscriber unsubscribes, tear down internal subs
            return ()=>{
                // 1. tear down internal subs
                onCreateSub.unsubscribe();
                onUpdateSub.unsubscribe();
                onDeleteSub.unsubscribe();
            // 2. there is no need to explicitly stop paging. instead, we
            // just check `subscriber.closed` above before fetching each page.
            };
        });
    return observeQuery;
}
;
 //# sourceMappingURL=observeQuery.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/clientUtils.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "excludeDisabledOps",
    ()=>excludeDisabledOps,
    "getSecondaryIndexesFromSchemaModel",
    ()=>getSecondaryIndexesFromSchemaModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/APIClient.mjs [app-route] (ecmascript)");
;
const attributeIsSecondaryIndex = (attr)=>{
    return attr.type === 'key' && // presence of `name` property distinguishes GSI from primary index
    attr.properties?.name && attr.properties?.queryField && attr.properties?.fields.length > 0;
};
const getSecondaryIndexesFromSchemaModel = (model)=>{
    const idxs = model.attributes?.filter(attributeIsSecondaryIndex).map((attr)=>{
        const queryField = attr.properties.queryField;
        const [pk, ...sk] = attr.properties.fields;
        return {
            queryField,
            pk,
            sk
        };
    });
    return idxs || [];
};
/**
 * returns graphQLOperationsInfo, but filters out operations that were disabled via model().disableOperations([...])
 */ const excludeDisabledOps = (mis, modelName)=>{
    /* Example model attributes in MIS {
      "type": "model",
      "properties": {
        "subscriptions": null,
        "mutations": { "delete": null }
        "timestamps": null
      } }*/ const modelAttrs = mis.models[modelName].attributes?.find((attr)=>attr.type === 'model');
    const coarseToFineDict = {
        queries: [
            'list',
            'get',
            'observeQuery'
        ],
        mutations: [
            'create',
            'update',
            'delete'
        ],
        subscriptions: [
            'onCreate',
            'onUpdate',
            'onDelete'
        ]
    };
    const disabledOps = [];
    if (!modelAttrs) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["graphQLOperationsInfo"];
    }
    if (modelAttrs.properties) {
        for (const [key, value] of Object.entries(modelAttrs.properties)){
            // model.properties can contain other values that are not relevant to disabling ops, e.g. timestamps
            if (!(key in coarseToFineDict)) {
                continue;
            }
            if (value === null) {
                // coarse-grained disable, e.g. "subscriptions": null,
                disabledOps.push(...coarseToFineDict[key]);
            } else if (value instanceof Object) {
                // fine-grained, e.g. "mutations": { "delete": null }
                disabledOps.push(...Object.keys(value));
            }
        }
    }
    // observeQuery only exists on the client side, so can't be explicitly disabled via schema builder.
    // It's unusable without `list`
    if (disabledOps.includes('list')) {
        disabledOps.push('observeQuery');
    }
    // graphQLOperationsInfo keys are in caps
    const disabledOpsUpper = disabledOps.map((op)=>op.toUpperCase());
    const filteredGraphQLOperations = Object.fromEntries(Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$APIClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["graphQLOperationsInfo"]).filter(([key])=>!disabledOpsUpper.includes(key)));
    return filteredGraphQLOperations;
};
;
 //# sourceMappingURL=clientUtils.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateModelsProperty.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateModelsProperty",
    ()=>generateModelsProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$list$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$indexQuery$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/indexQuery.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$subscription$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/subscription.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$observeQuery$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/observeQuery.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$clientUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/clientUtils.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
function generateModelsProperty(client, apiGraphQLConfig, getInternals) {
    const models = {};
    const modelIntrospection = apiGraphQLConfig.modelIntrospection;
    if (!modelIntrospection) {
        return {};
    }
    const SUBSCRIPTION_OPS = [
        'ONCREATE',
        'ONUPDATE',
        'ONDELETE'
    ];
    for (const model of Object.values(modelIntrospection.models)){
        const { name } = model;
        models[name] = {};
        const enabledModelOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$clientUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["excludeDisabledOps"])(modelIntrospection, name);
        Object.entries(enabledModelOps).forEach(([key, { operationPrefix }])=>{
            const operation = key;
            if (operation === 'LIST') {
                models[name][operationPrefix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$list$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listFactory"])(client, modelIntrospection, model, getInternals);
            } else if (SUBSCRIPTION_OPS.includes(operation)) {
                models[name][operationPrefix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$subscription$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["subscriptionFactory"])(client, modelIntrospection, model, operation, getInternals);
            } else if (operation === 'OBSERVEQUERY') {
                models[name][operationPrefix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$observeQuery$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["observeQueryFactory"])(models, model);
            } else {
                models[name][operationPrefix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFactory"])(client, modelIntrospection, model, operation, getInternals);
            }
        });
        const secondaryIdxs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$clientUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSecondaryIndexesFromSchemaModel"])(model);
        for (const idx of secondaryIdxs){
            models[name][idx.queryField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$indexQuery$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["indexQueryFactory"])(client, modelIntrospection, model, idx, getInternals);
        }
    }
    return models;
}
;
 //# sourceMappingURL=generateModelsProperty.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClient.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSchemaToClient",
    ()=>addSchemaToClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$generateCustomOperationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/generateCustomOperationsProperty.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateConversationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateConversationsProperty.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateGenerationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateGenerationsProperty.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateEnumsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateEnumsProperty.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateModelsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateModelsProperty.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs [app-route] (ecmascript)");
;
;
;
;
;
;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
function addSchemaToClient(client, apiGraphqlConfig, getInternals) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upgradeClientCancellation"])(client);
    client.models = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateModelsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateModelsProperty"])(client, apiGraphqlConfig, getInternals);
    client.enums = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateEnumsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateEnumsProperty"])(apiGraphqlConfig);
    client.queries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$generateCustomOperationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCustomQueriesProperty"])(client, apiGraphqlConfig, getInternals);
    client.mutations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$generateCustomOperationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCustomMutationsProperty"])(client, apiGraphqlConfig, getInternals);
    client.subscriptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$generateCustomOperationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCustomSubscriptionsProperty"])(client, apiGraphqlConfig, getInternals);
    client.conversations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateConversationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateConversationsProperty"])(client, apiGraphqlConfig, getInternals);
    client.generations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateGenerationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateGenerationsProperty"])(client, apiGraphqlConfig, getInternals);
    return client;
}
;
 //# sourceMappingURL=addSchemaToClient.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/runtimeTypeGuards/isApiGraphQLProviderConfig.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/server/generateModelsProperty.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateModelsProperty",
    ()=>generateModelsProperty
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$list$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/list.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$indexQuery$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/indexQuery.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/operations/get.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$clientUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/clientUtils.mjs [app-route] (ecmascript)");
;
;
;
;
function generateModelsProperty(client, params, getInternals) {
    const models = {};
    const { config } = params;
    const useContext = params.amplify === null;
    if (!config) {
        throw new Error('generateModelsProperty cannot retrieve Amplify config');
    }
    if (!config.API?.GraphQL) {
        return {};
    }
    const modelIntrospection = config.API.GraphQL.modelIntrospection;
    if (!modelIntrospection) {
        return {};
    }
    const SSR_UNSUPORTED_OPS = [
        'ONCREATE',
        'ONUPDATE',
        'ONDELETE',
        'OBSERVEQUERY'
    ];
    for (const model of Object.values(modelIntrospection.models)){
        const { name } = model;
        models[name] = {};
        const enabledModelOps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$clientUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["excludeDisabledOps"])(modelIntrospection, name);
        Object.entries(enabledModelOps).forEach(([key, { operationPrefix }])=>{
            const operation = key;
            // subscriptions are not supported in SSR
            if (SSR_UNSUPORTED_OPS.includes(operation)) return;
            if (operation === 'LIST') {
                models[name][operationPrefix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$list$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listFactory"])(client, modelIntrospection, model, getInternals, useContext);
            } else {
                models[name][operationPrefix] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$get$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFactory"])(client, modelIntrospection, model, operation, getInternals, useContext);
            }
        });
        const secondaryIdxs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$clientUtils$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSecondaryIndexesFromSchemaModel"])(model);
        for (const idx of secondaryIdxs){
            models[name][idx.queryField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$operations$2f$indexQuery$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["indexQueryFactory"])(client, modelIntrospection, model, idx, getInternals, useContext);
        }
    }
    return models;
}
;
 //# sourceMappingURL=generateModelsProperty.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClientWithInstance.mjs [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSchemaToClientWithInstance",
    ()=>addSchemaToClientWithInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isApiGraphQLProviderConfig$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/runtimeTypeGuards/isApiGraphQLProviderConfig.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$generateCustomOperationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/generateCustomOperationsProperty.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/cancellation.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$smithy$2f$util$2d$base64$2f$dist$2d$es$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@smithy/util-base64/dist-es/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateEnumsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/utils/clientProperties/generateEnumsProperty.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$server$2f$generateModelsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/server/generateModelsProperty.mjs [app-route] (ecmascript)");
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
// TODO: separate import path
function addSchemaToClientWithInstance(client, params, getInternals) {
    const apiGraphqlConfig = params.config?.API?.GraphQL;
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$runtimeTypeGuards$2f$isApiGraphQLProviderConfig$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isApiGraphQLConfig"])(apiGraphqlConfig)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$cancellation$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["upgradeClientCancellation"])(client);
        client.models = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$server$2f$generateModelsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateModelsProperty"])(client, params, getInternals);
        client.enums = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$utils$2f$clientProperties$2f$generateEnumsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateEnumsProperty"])(apiGraphqlConfig);
        client.queries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$generateCustomOperationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCustomQueriesProperty"])(client, apiGraphqlConfig, getInternals);
        client.mutations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$generateCustomOperationsProperty$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateCustomMutationsProperty"])(client, apiGraphqlConfig, getInternals);
    }
    return client;
}
;
 //# sourceMappingURL=addSchemaToClientWithInstance.mjs.map
}),
"[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/index.mjs [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2d$types$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema-types/dist/esm/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$addSchemaToClient$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClient.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$addSchemaToClientWithInstance$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/addSchemaToClientWithInstance.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f40$aws$2d$amplify$2f$data$2d$schema$2f$dist$2f$esm$2f$runtime$2f$internals$2f$ai$2f$getCustomUserAgentDetails$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/@aws-amplify/data-schema/dist/esm/runtime/internals/ai/getCustomUserAgentDetails.mjs [app-route] (ecmascript)"); //# sourceMappingURL=index.mjs.map
;
;
;
;
}),
];

//# sourceMappingURL=6361e_%40aws-amplify_data-schema_dist_esm_runtime_79a60993._.js.map