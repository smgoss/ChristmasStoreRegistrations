module.exports = [
"[project]/christmas-store-registration/node_modules/graphql/jsutils/isObjectLike.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>isObjectLike
]);
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}
function isObjectLike(value) {
    return _typeof(value) == 'object' && value !== null;
}
}),
"[project]/christmas-store-registration/node_modules/graphql/polyfills/symbols.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// In ES2015 (or a polyfilled) environment, this will be Symbol.iterator
// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
__turbopack_context__.s([
    "SYMBOL_ASYNC_ITERATOR",
    ()=>SYMBOL_ASYNC_ITERATOR,
    "SYMBOL_ITERATOR",
    ()=>SYMBOL_ITERATOR,
    "SYMBOL_TO_STRING_TAG",
    ()=>SYMBOL_TO_STRING_TAG
]);
var SYMBOL_ITERATOR = typeof Symbol === 'function' && Symbol.iterator != null ? Symbol.iterator : '@@iterator'; // In ES2017 (or a polyfilled) environment, this will be Symbol.asyncIterator
var SYMBOL_ASYNC_ITERATOR = typeof Symbol === 'function' && Symbol.asyncIterator != null ? Symbol.asyncIterator : '@@asyncIterator'; // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
var SYMBOL_TO_STRING_TAG = typeof Symbol === 'function' && Symbol.toStringTag != null ? Symbol.toStringTag : '@@toStringTag';
}),
"[project]/christmas-store-registration/node_modules/graphql/language/location.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Represents a location in a Source.
 */ /**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */ __turbopack_context__.s([
    "getLocation",
    ()=>getLocation
]);
function getLocation(source, position) {
    var lineRegexp = /\r\n|[\n\r]/g;
    var line = 1;
    var column = position + 1;
    var match;
    while((match = lineRegexp.exec(source.body)) && match.index < position){
        line += 1;
        column = position + 1 - (match.index + match[0].length);
    }
    return {
        line: line,
        column: column
    };
}
}),
"[project]/christmas-store-registration/node_modules/graphql/language/printLocation.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "printLocation",
    ()=>printLocation,
    "printSourceLocation",
    ()=>printSourceLocation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/location.mjs [app-ssr] (ecmascript)");
;
function printLocation(location) {
    return printSourceLocation(location.source, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLocation"])(location.source, location.start));
}
function printSourceLocation(source, sourceLocation) {
    var firstLineColumnOffset = source.locationOffset.column - 1;
    var body = whitespace(firstLineColumnOffset) + source.body;
    var lineIndex = sourceLocation.line - 1;
    var lineOffset = source.locationOffset.line - 1;
    var lineNum = sourceLocation.line + lineOffset;
    var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
    var columnNum = sourceLocation.column + columnOffset;
    var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
    var lines = body.split(/\r\n|[\n\r]/g);
    var locationLine = lines[lineIndex]; // Special case for minified documents
    if (locationLine.length > 120) {
        var subLineIndex = Math.floor(columnNum / 80);
        var subLineColumnNum = columnNum % 80;
        var subLines = [];
        for(var i = 0; i < locationLine.length; i += 80){
            subLines.push(locationLine.slice(i, i + 80));
        }
        return locationStr + printPrefixedLines([
            [
                "".concat(lineNum),
                subLines[0]
            ]
        ].concat(subLines.slice(1, subLineIndex + 1).map(function(subLine) {
            return [
                '',
                subLine
            ];
        }), [
            [
                ' ',
                whitespace(subLineColumnNum - 1) + '^'
            ],
            [
                '',
                subLines[subLineIndex + 1]
            ]
        ]));
    }
    return locationStr + printPrefixedLines([
        [
            "".concat(lineNum - 1),
            lines[lineIndex - 1]
        ],
        [
            "".concat(lineNum),
            locationLine
        ],
        [
            '',
            whitespace(columnNum - 1) + '^'
        ],
        [
            "".concat(lineNum + 1),
            lines[lineIndex + 1]
        ]
    ]);
}
function printPrefixedLines(lines) {
    var existingLines = lines.filter(function(_ref) {
        var _ = _ref[0], line = _ref[1];
        return line !== undefined;
    });
    var padLen = Math.max.apply(Math, existingLines.map(function(_ref2) {
        var prefix = _ref2[0];
        return prefix.length;
    }));
    return existingLines.map(function(_ref3) {
        var prefix = _ref3[0], line = _ref3[1];
        return leftPad(padLen, prefix) + (line ? ' | ' + line : ' |');
    }).join('\n');
}
function whitespace(len) {
    return Array(len + 1).join(' ');
}
function leftPad(len, str) {
    return whitespace(len - str.length) + str;
}
}),
"[project]/christmas-store-registration/node_modules/graphql/error/GraphQLError.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GraphQLError",
    ()=>GraphQLError,
    "printError",
    ()=>printError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$isObjectLike$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/isObjectLike.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$polyfills$2f$symbols$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/polyfills/symbols.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/location.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printLocation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/printLocation.mjs [app-ssr] (ecmascript)");
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
            });
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
        }
    }
    return target;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
;
;
;
;
var GraphQLError = /*#__PURE__*/ function(_Error) {
    _inherits(GraphQLError, _Error);
    var _super = _createSuper(GraphQLError);
    /**
   * An array of { line, column } locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */ /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */ /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */ /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */ /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */ /**
   * The original error thrown from a field resolver during execution.
   */ /**
   * Extension fields to add to the formatted error.
   */ function GraphQLError(message, nodes, source, positions, path, originalError, extensions) {
        var _nodeLocations, _nodeLocations2, _nodeLocations3;
        var _this;
        _classCallCheck(this, GraphQLError);
        _this = _super.call(this, message);
        _this.name = 'GraphQLError';
        _this.originalError = originalError !== null && originalError !== void 0 ? originalError : undefined; // Compute list of blame nodes.
        _this.nodes = undefinedIfEmpty(Array.isArray(nodes) ? nodes : nodes ? [
            nodes
        ] : undefined);
        var nodeLocations = [];
        for(var _i2 = 0, _ref3 = (_this$nodes = _this.nodes) !== null && _this$nodes !== void 0 ? _this$nodes : []; _i2 < _ref3.length; _i2++){
            var _this$nodes;
            var _ref4 = _ref3[_i2];
            var loc = _ref4.loc;
            if (loc != null) {
                nodeLocations.push(loc);
            }
        }
        nodeLocations = undefinedIfEmpty(nodeLocations); // Compute locations in the source for the given nodes/positions.
        _this.source = source !== null && source !== void 0 ? source : (_nodeLocations = nodeLocations) === null || _nodeLocations === void 0 ? void 0 : _nodeLocations[0].source;
        _this.positions = positions !== null && positions !== void 0 ? positions : (_nodeLocations2 = nodeLocations) === null || _nodeLocations2 === void 0 ? void 0 : _nodeLocations2.map(function(loc) {
            return loc.start;
        });
        _this.locations = positions && source ? positions.map(function(pos) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLocation"])(source, pos);
        }) : (_nodeLocations3 = nodeLocations) === null || _nodeLocations3 === void 0 ? void 0 : _nodeLocations3.map(function(loc) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$location$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLocation"])(loc.source, loc.start);
        });
        _this.path = path !== null && path !== void 0 ? path : undefined;
        var originalExtensions = originalError === null || originalError === void 0 ? void 0 : originalError.extensions;
        if (extensions == null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$isObjectLike$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(originalExtensions)) {
            _this.extensions = _objectSpread({}, originalExtensions);
        } else {
            _this.extensions = extensions !== null && extensions !== void 0 ? extensions : {};
        } // By being enumerable, JSON.stringify will include bellow properties in the resulting output.
        // This ensures that the simplest possible GraphQL service adheres to the spec.
        Object.defineProperties(_assertThisInitialized(_this), {
            message: {
                enumerable: true
            },
            locations: {
                enumerable: _this.locations != null
            },
            path: {
                enumerable: _this.path != null
            },
            extensions: {
                enumerable: _this.extensions != null && Object.keys(_this.extensions).length > 0
            },
            name: {
                enumerable: false
            },
            nodes: {
                enumerable: false
            },
            source: {
                enumerable: false
            },
            positions: {
                enumerable: false
            },
            originalError: {
                enumerable: false
            }
        }); // Include (non-enumerable) stack trace.
        if (originalError !== null && originalError !== void 0 && originalError.stack) {
            Object.defineProperty(_assertThisInitialized(_this), 'stack', {
                value: originalError.stack,
                writable: true,
                configurable: true
            });
            return _possibleConstructorReturn(_this);
        } // istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError);
        } else {
            Object.defineProperty(_assertThisInitialized(_this), 'stack', {
                value: Error().stack,
                writable: true,
                configurable: true
            });
        }
        return _this;
    }
    _createClass(GraphQLError, [
        {
            key: "toString",
            value: function toString() {
                return printError(this);
            } // FIXME: workaround to not break chai comparisons, should be remove in v16
        },
        {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$polyfills$2f$symbols$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SYMBOL_TO_STRING_TAG"],
            get: function get() {
                return 'Object';
            }
        }
    ]);
    return GraphQLError;
}(/*#__PURE__*/ _wrapNativeSuper(Error));
function undefinedIfEmpty(array) {
    return array === undefined || array.length === 0 ? undefined : array;
}
function printError(error) {
    var output = error.message;
    if (error.nodes) {
        for(var _i4 = 0, _error$nodes2 = error.nodes; _i4 < _error$nodes2.length; _i4++){
            var node = _error$nodes2[_i4];
            if (node.loc) {
                output += '\n\n' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printLocation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["printLocation"])(node.loc);
            }
        }
    } else if (error.source && error.locations) {
        for(var _i6 = 0, _error$locations2 = error.locations; _i6 < _error$locations2.length; _i6++){
            var location = _error$locations2[_i6];
            output += '\n\n' + (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$printLocation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["printSourceLocation"])(error.source, location);
        }
    }
    return output;
}
}),
"[project]/christmas-store-registration/node_modules/graphql/error/syntaxError.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "syntaxError",
    ()=>syntaxError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/error/GraphQLError.mjs [app-ssr] (ecmascript)");
;
function syntaxError(source, position, description) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$GraphQLError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GraphQLError"]("Syntax Error: ".concat(description), undefined, source, [
        position
    ]);
}
}),
"[project]/christmas-store-registration/node_modules/graphql/language/kinds.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * The set of allowed kind values for AST nodes.
 */ __turbopack_context__.s([
    "Kind",
    ()=>Kind
]);
var Kind = Object.freeze({
    // Name
    NAME: 'Name',
    // Document
    DOCUMENT: 'Document',
    OPERATION_DEFINITION: 'OperationDefinition',
    VARIABLE_DEFINITION: 'VariableDefinition',
    SELECTION_SET: 'SelectionSet',
    FIELD: 'Field',
    ARGUMENT: 'Argument',
    // Fragments
    FRAGMENT_SPREAD: 'FragmentSpread',
    INLINE_FRAGMENT: 'InlineFragment',
    FRAGMENT_DEFINITION: 'FragmentDefinition',
    // Values
    VARIABLE: 'Variable',
    INT: 'IntValue',
    FLOAT: 'FloatValue',
    STRING: 'StringValue',
    BOOLEAN: 'BooleanValue',
    NULL: 'NullValue',
    ENUM: 'EnumValue',
    LIST: 'ListValue',
    OBJECT: 'ObjectValue',
    OBJECT_FIELD: 'ObjectField',
    // Directives
    DIRECTIVE: 'Directive',
    // Types
    NAMED_TYPE: 'NamedType',
    LIST_TYPE: 'ListType',
    NON_NULL_TYPE: 'NonNullType',
    // Type System Definitions
    SCHEMA_DEFINITION: 'SchemaDefinition',
    OPERATION_TYPE_DEFINITION: 'OperationTypeDefinition',
    // Type Definitions
    SCALAR_TYPE_DEFINITION: 'ScalarTypeDefinition',
    OBJECT_TYPE_DEFINITION: 'ObjectTypeDefinition',
    FIELD_DEFINITION: 'FieldDefinition',
    INPUT_VALUE_DEFINITION: 'InputValueDefinition',
    INTERFACE_TYPE_DEFINITION: 'InterfaceTypeDefinition',
    UNION_TYPE_DEFINITION: 'UnionTypeDefinition',
    ENUM_TYPE_DEFINITION: 'EnumTypeDefinition',
    ENUM_VALUE_DEFINITION: 'EnumValueDefinition',
    INPUT_OBJECT_TYPE_DEFINITION: 'InputObjectTypeDefinition',
    // Directive Definitions
    DIRECTIVE_DEFINITION: 'DirectiveDefinition',
    // Type System Extensions
    SCHEMA_EXTENSION: 'SchemaExtension',
    // Type Extensions
    SCALAR_TYPE_EXTENSION: 'ScalarTypeExtension',
    OBJECT_TYPE_EXTENSION: 'ObjectTypeExtension',
    INTERFACE_TYPE_EXTENSION: 'InterfaceTypeExtension',
    UNION_TYPE_EXTENSION: 'UnionTypeExtension',
    ENUM_TYPE_EXTENSION: 'EnumTypeExtension',
    INPUT_OBJECT_TYPE_EXTENSION: 'InputObjectTypeExtension'
}); /**
 * The enum type representing the possible kind values of AST nodes.
 */ 
}),
"[project]/christmas-store-registration/node_modules/graphql/jsutils/invariant.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>invariant
]);
function invariant(condition, message) {
    var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')
    if (!booleanCondition) {
        throw new Error(message != null ? message : 'Unexpected invariant triggered.');
    }
}
}),
"[project]/christmas-store-registration/node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// istanbul ignore next (See: 'https://github.com/graphql/graphql-js/issues/2317')
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var nodejsCustomInspectSymbol = typeof Symbol === 'function' && typeof Symbol.for === 'function' ? Symbol.for('nodejs.util.inspect.custom') : undefined;
const __TURBOPACK__default__export__ = nodejsCustomInspectSymbol;
}),
"[project]/christmas-store-registration/node_modules/graphql/jsutils/defineInspect.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>defineInspect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$invariant$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/invariant.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$nodejsCustomInspectSymbol$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs [app-ssr] (ecmascript)");
;
;
function defineInspect(classObject) {
    var fn = classObject.prototype.toJSON;
    typeof fn === 'function' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$invariant$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(0);
    classObject.prototype.inspect = fn; // istanbul ignore else (See: 'https://github.com/graphql/graphql-js/issues/2317')
    if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$nodejsCustomInspectSymbol$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]) {
        classObject.prototype[__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$nodejsCustomInspectSymbol$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]] = fn;
    }
}
}),
"[project]/christmas-store-registration/node_modules/graphql/language/ast.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Location",
    ()=>Location,
    "Token",
    ()=>Token,
    "isNode",
    ()=>isNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$defineInspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/defineInspect.mjs [app-ssr] (ecmascript)");
;
var Location = /*#__PURE__*/ function() {
    /**
   * The character offset at which this Node begins.
   */ /**
   * The character offset at which this Node ends.
   */ /**
   * The Token at which this Node begins.
   */ /**
   * The Token at which this Node ends.
   */ /**
   * The Source document the AST represents.
   */ function Location(startToken, endToken, source) {
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
    }
    var _proto = Location.prototype;
    _proto.toJSON = function toJSON() {
        return {
            start: this.start,
            end: this.end
        };
    };
    return Location;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.
(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$defineInspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(Location);
var Token = /*#__PURE__*/ function() {
    /**
   * The kind of Token.
   */ /**
   * The character offset at which this Node begins.
   */ /**
   * The character offset at which this Node ends.
   */ /**
   * The 1-indexed line number on which this Token appears.
   */ /**
   * The 1-indexed column number at which this Token begins.
   */ /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   */ /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */ function Token(kind, start, end, line, column, prev, value) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column;
        this.value = value;
        this.prev = prev;
        this.next = null;
    }
    var _proto2 = Token.prototype;
    _proto2.toJSON = function toJSON() {
        return {
            kind: this.kind,
            value: this.value,
            line: this.line,
            column: this.column
        };
    };
    return Token;
}(); // Print a simplified form when appearing in `inspect` and `util.inspect`.
(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$defineInspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(Token);
function isNode(maybeNode) {
    return maybeNode != null && typeof maybeNode.kind === 'string';
} /**
 * The list of all possible AST node types.
 */ 
}),
"[project]/christmas-store-registration/node_modules/graphql/language/tokenKind.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */ __turbopack_context__.s([
    "TokenKind",
    ()=>TokenKind
]);
var TokenKind = Object.freeze({
    SOF: '<SOF>',
    EOF: '<EOF>',
    BANG: '!',
    DOLLAR: '$',
    AMP: '&',
    PAREN_L: '(',
    PAREN_R: ')',
    SPREAD: '...',
    COLON: ':',
    EQUALS: '=',
    AT: '@',
    BRACKET_L: '[',
    BRACKET_R: ']',
    BRACE_L: '{',
    PIPE: '|',
    BRACE_R: '}',
    NAME: 'Name',
    INT: 'Int',
    FLOAT: 'Float',
    STRING: 'String',
    BLOCK_STRING: 'BlockString',
    COMMENT: 'Comment'
}); /**
 * The enum type representing the token kinds values.
 */ 
}),
"[project]/christmas-store-registration/node_modules/graphql/jsutils/inspect.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>inspect
]);
/* eslint-disable flowtype/no-weak-types */ var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$nodejsCustomInspectSymbol$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/nodejsCustomInspectSymbol.mjs [app-ssr] (ecmascript)");
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}
;
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
    return formatValue(value, []);
}
function formatValue(value, seenValues) {
    switch(_typeof(value)){
        case 'string':
            return JSON.stringify(value);
        case 'function':
            return value.name ? "[function ".concat(value.name, "]") : '[function]';
        case 'object':
            if (value === null) {
                return 'null';
            }
            return formatObjectValue(value, seenValues);
        default:
            return String(value);
    }
}
function formatObjectValue(value, previouslySeenValues) {
    if (previouslySeenValues.indexOf(value) !== -1) {
        return '[Circular]';
    }
    var seenValues = [].concat(previouslySeenValues, [
        value
    ]);
    var customInspectFn = getCustomFn(value);
    if (customInspectFn !== undefined) {
        var customValue = customInspectFn.call(value); // check for infinite recursion
        if (customValue !== value) {
            return typeof customValue === 'string' ? customValue : formatValue(customValue, seenValues);
        }
    } else if (Array.isArray(value)) {
        return formatArray(value, seenValues);
    }
    return formatObject(value, seenValues);
}
function formatObject(object, seenValues) {
    var keys = Object.keys(object);
    if (keys.length === 0) {
        return '{}';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[' + getObjectTag(object) + ']';
    }
    var properties = keys.map(function(key) {
        var value = formatValue(object[key], seenValues);
        return key + ': ' + value;
    });
    return '{ ' + properties.join(', ') + ' }';
}
function formatArray(array, seenValues) {
    if (array.length === 0) {
        return '[]';
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH) {
        return '[Array]';
    }
    var len = Math.min(MAX_ARRAY_LENGTH, array.length);
    var remaining = array.length - len;
    var items = [];
    for(var i = 0; i < len; ++i){
        items.push(formatValue(array[i], seenValues));
    }
    if (remaining === 1) {
        items.push('... 1 more item');
    } else if (remaining > 1) {
        items.push("... ".concat(remaining, " more items"));
    }
    return '[' + items.join(', ') + ']';
}
function getCustomFn(object) {
    var customInspectFn = object[String(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$nodejsCustomInspectSymbol$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])];
    if (typeof customInspectFn === 'function') {
        return customInspectFn;
    }
    if (typeof object.inspect === 'function') {
        return object.inspect;
    }
}
function getObjectTag(object) {
    var tag = Object.prototype.toString.call(object).replace(/^\[object /, '').replace(/]$/, '');
    if (tag === 'Object' && typeof object.constructor === 'function') {
        var name = object.constructor.name;
        if (typeof name === 'string' && name !== '') {
            return name;
        }
    }
    return tag;
}
}),
"[project]/christmas-store-registration/node_modules/graphql/jsutils/devAssert.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>devAssert
]);
function devAssert(condition, message) {
    var booleanCondition = Boolean(condition); // istanbul ignore else (See transformation done in './resources/inlineInvariant.js')
    if (!booleanCondition) {
        throw new Error(message);
    }
}
}),
"[project]/christmas-store-registration/node_modules/graphql/jsutils/instanceOf.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/inspect.mjs [app-ssr] (ecmascript)");
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}
;
const __TURBOPACK__default__export__ = ("TURBOPACK compile-time falsy", 0) ? // eslint-disable-next-line no-shadow
"TURBOPACK unreachable" : function instanceOf(value, constructor) {
    if (value instanceof constructor) {
        return true;
    }
    if (_typeof(value) === 'object' && value !== null) {
        var _value$constructor;
        var className = constructor.prototype[Symbol.toStringTag];
        var valueClassName = Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name;
        if (className === valueClassName) {
            var stringifiedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(value);
            throw new Error("Cannot use ".concat(className, " \"").concat(stringifiedValue, "\" from another module or realm.\n\nEnsure that there is only one instance of \"graphql\" in the node_modules\ndirectory. If different versions of \"graphql\" are the dependencies of other\nrelied on modules, use \"resolutions\" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate \"graphql\" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results."));
        }
    }
    return false;
};
}),
"[project]/christmas-store-registration/node_modules/graphql/language/source.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Source",
    ()=>Source,
    "isSource",
    ()=>isSource
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$polyfills$2f$symbols$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/polyfills/symbols.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/inspect.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$devAssert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/devAssert.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$instanceOf$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/instanceOf.mjs [app-ssr] (ecmascript)");
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
;
;
;
;
var Source = /*#__PURE__*/ function() {
    function Source(body) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GraphQL request';
        var locationOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
            line: 1,
            column: 1
        };
        typeof body === 'string' || (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$devAssert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(0, "Body must be a string. Received: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(body), "."));
        this.body = body;
        this.name = name;
        this.locationOffset = locationOffset;
        this.locationOffset.line > 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$devAssert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(0, 'line in locationOffset is 1-indexed and must be positive.');
        this.locationOffset.column > 0 || (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$devAssert$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(0, 'column in locationOffset is 1-indexed and must be positive.');
    } // $FlowFixMe[unsupported-syntax] Flow doesn't support computed properties yet
    _createClass(Source, [
        {
            key: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$polyfills$2f$symbols$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SYMBOL_TO_STRING_TAG"],
            get: function get() {
                return 'Source';
            }
        }
    ]);
    return Source;
}();
function isSource(source) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$instanceOf$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(source, Source);
}
}),
"[project]/christmas-store-registration/node_modules/graphql/language/directiveLocation.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * The set of allowed directive location values.
 */ __turbopack_context__.s([
    "DirectiveLocation",
    ()=>DirectiveLocation
]);
var DirectiveLocation = Object.freeze({
    // Request Definitions
    QUERY: 'QUERY',
    MUTATION: 'MUTATION',
    SUBSCRIPTION: 'SUBSCRIPTION',
    FIELD: 'FIELD',
    FRAGMENT_DEFINITION: 'FRAGMENT_DEFINITION',
    FRAGMENT_SPREAD: 'FRAGMENT_SPREAD',
    INLINE_FRAGMENT: 'INLINE_FRAGMENT',
    VARIABLE_DEFINITION: 'VARIABLE_DEFINITION',
    // Type System Definitions
    SCHEMA: 'SCHEMA',
    SCALAR: 'SCALAR',
    OBJECT: 'OBJECT',
    FIELD_DEFINITION: 'FIELD_DEFINITION',
    ARGUMENT_DEFINITION: 'ARGUMENT_DEFINITION',
    INTERFACE: 'INTERFACE',
    UNION: 'UNION',
    ENUM: 'ENUM',
    ENUM_VALUE: 'ENUM_VALUE',
    INPUT_OBJECT: 'INPUT_OBJECT',
    INPUT_FIELD_DEFINITION: 'INPUT_FIELD_DEFINITION'
}); /**
 * The enum type representing the directive location values.
 */ 
}),
"[project]/christmas-store-registration/node_modules/graphql/language/blockString.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */ __turbopack_context__.s([
    "dedentBlockStringValue",
    ()=>dedentBlockStringValue,
    "getBlockStringIndentation",
    ()=>getBlockStringIndentation,
    "printBlockString",
    ()=>printBlockString
]);
function dedentBlockStringValue(rawString) {
    // Expand a block string's raw value into independent lines.
    var lines = rawString.split(/\r\n|[\n\r]/g); // Remove common indentation from all lines but first.
    var commonIndent = getBlockStringIndentation(rawString);
    if (commonIndent !== 0) {
        for(var i = 1; i < lines.length; i++){
            lines[i] = lines[i].slice(commonIndent);
        }
    } // Remove leading and trailing blank lines.
    var startLine = 0;
    while(startLine < lines.length && isBlank(lines[startLine])){
        ++startLine;
    }
    var endLine = lines.length;
    while(endLine > startLine && isBlank(lines[endLine - 1])){
        --endLine;
    } // Return a string of the lines joined with U+000A.
    return lines.slice(startLine, endLine).join('\n');
}
function isBlank(str) {
    for(var i = 0; i < str.length; ++i){
        if (str[i] !== ' ' && str[i] !== '\t') {
            return false;
        }
    }
    return true;
}
function getBlockStringIndentation(value) {
    var _commonIndent;
    var isFirstLine = true;
    var isEmptyLine = true;
    var indent = 0;
    var commonIndent = null;
    for(var i = 0; i < value.length; ++i){
        switch(value.charCodeAt(i)){
            case 13:
                //  \r
                if (value.charCodeAt(i + 1) === 10) {
                    ++i; // skip \r\n as one symbol
                }
            // falls through
            case 10:
                //  \n
                isFirstLine = false;
                isEmptyLine = true;
                indent = 0;
                break;
            case 9:
            case 32:
                //  <space>
                ++indent;
                break;
            default:
                if (isEmptyLine && !isFirstLine && (commonIndent === null || indent < commonIndent)) {
                    commonIndent = indent;
                }
                isEmptyLine = false;
        }
    }
    return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
}
function printBlockString(value) {
    var indentation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var preferMultipleLines = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isSingleLine = value.indexOf('\n') === -1;
    var hasLeadingSpace = value[0] === ' ' || value[0] === '\t';
    var hasTrailingQuote = value[value.length - 1] === '"';
    var hasTrailingSlash = value[value.length - 1] === '\\';
    var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
    var result = ''; // Format a multi-line block quote to account for leading space.
    if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
        result += '\n' + indentation;
    }
    result += indentation ? value.replace(/\n/g, '\n' + indentation) : value;
    if (printAsMultipleLines) {
        result += '\n';
    }
    return '"""' + result.replace(/"""/g, '\\"""') + '"""';
}
}),
"[project]/christmas-store-registration/node_modules/graphql/language/lexer.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lexer",
    ()=>Lexer,
    "isPunctuatorTokenKind",
    ()=>isPunctuatorTokenKind
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/error/syntaxError.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/ast.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/tokenKind.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$blockString$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/blockString.mjs [app-ssr] (ecmascript)");
;
;
;
;
var Lexer = /*#__PURE__*/ function() {
    /**
   * The previously focused non-ignored token.
   */ /**
   * The currently focused non-ignored token.
   */ /**
   * The (1-indexed) line containing the current token.
   */ /**
   * The character offset at which the current line begins.
   */ function Lexer(source) {
        var startOfFileToken = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].SOF, 0, 0, 0, 0, null);
        this.source = source;
        this.lastToken = startOfFileToken;
        this.token = startOfFileToken;
        this.line = 1;
        this.lineStart = 0;
    }
    /**
   * Advances the token stream to the next non-ignored token.
   */ var _proto = Lexer.prototype;
    _proto.advance = function advance() {
        this.lastToken = this.token;
        var token = this.token = this.lookahead();
        return token;
    };
    _proto.lookahead = function lookahead() {
        var token = this.token;
        if (token.kind !== __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EOF) {
            do {
                var _token$next;
                // Note: next is only mutable during parsing, so we cast to allow this.
                token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
            }while (token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COMMENT)
        }
        return token;
    };
    return Lexer;
}();
function isPunctuatorTokenKind(kind) {
    return kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BANG || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AMP || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].SPREAD || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AT || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_R || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PIPE || kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R;
}
function printCharCode(code) {
    return isNaN(code) ? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EOF : code < 0x007f ? JSON.stringify(String.fromCharCode(code)) : "\"\\u".concat(('00' + code.toString(16).toUpperCase()).slice(-4), "\"");
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */ function readToken(lexer, prev) {
    var source = lexer.source;
    var body = source.body;
    var bodyLength = body.length;
    var pos = prev.end;
    while(pos < bodyLength){
        var code = body.charCodeAt(pos);
        var _line = lexer.line;
        var _col = 1 + pos - lexer.lineStart; // SourceCharacter
        switch(code){
            case 0xfeff:
            case 9:
            case 32:
            case 44:
                //  ,
                ++pos;
                continue;
            case 10:
                //  \n
                ++pos;
                ++lexer.line;
                lexer.lineStart = pos;
                continue;
            case 13:
                //  \r
                if (body.charCodeAt(pos + 1) === 10) {
                    pos += 2;
                } else {
                    ++pos;
                }
                ++lexer.line;
                lexer.lineStart = pos;
                continue;
            case 33:
                //  !
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BANG, pos, pos + 1, _line, _col, prev);
            case 35:
                //  #
                return readComment(source, pos, _line, _col, prev);
            case 36:
                //  $
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR, pos, pos + 1, _line, _col, prev);
            case 38:
                //  &
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AMP, pos, pos + 1, _line, _col, prev);
            case 40:
                //  (
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L, pos, pos + 1, _line, _col, prev);
            case 41:
                //  )
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R, pos, pos + 1, _line, _col, prev);
            case 46:
                //  .
                if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
                    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].SPREAD, pos, pos + 3, _line, _col, prev);
                }
                break;
            case 58:
                //  :
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON, pos, pos + 1, _line, _col, prev);
            case 61:
                //  =
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS, pos, pos + 1, _line, _col, prev);
            case 64:
                //  @
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AT, pos, pos + 1, _line, _col, prev);
            case 91:
                //  [
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L, pos, pos + 1, _line, _col, prev);
            case 93:
                //  ]
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_R, pos, pos + 1, _line, _col, prev);
            case 123:
                // {
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, pos, pos + 1, _line, _col, prev);
            case 124:
                // |
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PIPE, pos, pos + 1, _line, _col, prev);
            case 125:
                // }
                return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R, pos, pos + 1, _line, _col, prev);
            case 34:
                //  "
                if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
                    return readBlockString(source, pos, _line, _col, prev, lexer);
                }
                return readString(source, pos, _line, _col, prev);
            case 45:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                //  9
                return readNumber(source, pos, code, _line, _col, prev);
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 95:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
                // z
                return readName(source, pos, _line, _col, prev);
        }
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, pos, unexpectedCharacterMessage(code));
    }
    var line = lexer.line;
    var col = 1 + pos - lexer.lineStart;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EOF, bodyLength, bodyLength, line, col, prev);
}
/**
 * Report a message that an unexpected character was encountered.
 */ function unexpectedCharacterMessage(code) {
    if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
        return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
    }
    if (code === 39) {
        // '
        return 'Unexpected single quote character (\'), did you mean to use a double quote (")?';
    }
    return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
}
/**
 * Reads a comment token from the source file.
 *
 * #[\u0009\u0020-\uFFFF]*
 */ function readComment(source, start, line, col, prev) {
    var body = source.body;
    var code;
    var position = start;
    do {
        code = body.charCodeAt(++position);
    }while (!isNaN(code) && (code > 0x001f || code === 0x0009))
    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
}
/**
 * Reads a number token from the source file, either a float
 * or an int depending on whether a decimal point appears.
 *
 * Int:   -?(0|[1-9][0-9]*)
 * Float: -?(0|[1-9][0-9]*)(\.[0-9]+)?((E|e)(+|-)?[0-9]+)?
 */ function readNumber(source, start, firstCode, line, col, prev) {
    var body = source.body;
    var code = firstCode;
    var position = start;
    var isFloat = false;
    if (code === 45) {
        // -
        code = body.charCodeAt(++position);
    }
    if (code === 48) {
        // 0
        code = body.charCodeAt(++position);
        if (code >= 48 && code <= 57) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
        }
    } else {
        position = readDigits(source, position, code);
        code = body.charCodeAt(position);
    }
    if (code === 46) {
        // .
        isFloat = true;
        code = body.charCodeAt(++position);
        position = readDigits(source, position, code);
        code = body.charCodeAt(position);
    }
    if (code === 69 || code === 101) {
        // E e
        isFloat = true;
        code = body.charCodeAt(++position);
        if (code === 43 || code === 45) {
            // + -
            code = body.charCodeAt(++position);
        }
        position = readDigits(source, position, code);
        code = body.charCodeAt(position);
    } // Numbers cannot be followed by . or NameStart
    if (code === 46 || isNameStart(code)) {
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](isFloat ? __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].FLOAT : __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].INT, start, position, line, col, prev, body.slice(start, position));
}
/**
 * Returns the new position in the source after reading digits.
 */ function readDigits(source, start, firstCode) {
    var body = source.body;
    var position = start;
    var code = firstCode;
    if (code >= 48 && code <= 57) {
        // 0 - 9
        do {
            code = body.charCodeAt(++position);
        }while (code >= 48 && code <= 57) // 0 - 9
        return position;
    }
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
}
/**
 * Reads a string token from the source file.
 *
 * "([^"\\\u000A\u000D]|(\\(u[0-9a-fA-F]{4}|["\\/bfnrt])))*"
 */ function readString(source, start, line, col, prev) {
    var body = source.body;
    var position = start + 1;
    var chunkStart = position;
    var code = 0;
    var value = '';
    while(position < body.length && !isNaN(code = body.charCodeAt(position)) && // not LineTerminator
    code !== 0x000a && code !== 0x000d){
        // Closing Quote (")
        if (code === 34) {
            value += body.slice(chunkStart, position);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].STRING, start, position + 1, line, col, prev, value);
        } // SourceCharacter
        if (code < 0x0020 && code !== 0x0009) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
        }
        ++position;
        if (code === 92) {
            // \
            value += body.slice(chunkStart, position - 1);
            code = body.charCodeAt(position);
            switch(code){
                case 34:
                    value += '"';
                    break;
                case 47:
                    value += '/';
                    break;
                case 92:
                    value += '\\';
                    break;
                case 98:
                    value += '\b';
                    break;
                case 102:
                    value += '\f';
                    break;
                case 110:
                    value += '\n';
                    break;
                case 114:
                    value += '\r';
                    break;
                case 116:
                    value += '\t';
                    break;
                case 117:
                    {
                        // uXXXX
                        var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));
                        if (charCode < 0) {
                            var invalidSequence = body.slice(position + 1, position + 5);
                            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
                        }
                        value += String.fromCharCode(charCode);
                        position += 4;
                        break;
                    }
                default:
                    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
            }
            ++position;
            chunkStart = position;
        }
    }
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, 'Unterminated string.');
}
/**
 * Reads a block string token from the source file.
 *
 * """("?"?(\\"""|\\(?!=""")|[^"\\]))*"""
 */ function readBlockString(source, start, line, col, prev, lexer) {
    var body = source.body;
    var position = start + 3;
    var chunkStart = position;
    var code = 0;
    var rawValue = '';
    while(position < body.length && !isNaN(code = body.charCodeAt(position))){
        // Closing Triple-Quote (""")
        if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
            rawValue += body.slice(chunkStart, position);
            return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BLOCK_STRING, start, position + 3, line, col, prev, (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$blockString$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["dedentBlockStringValue"])(rawValue));
        } // SourceCharacter
        if (code < 0x0020 && code !== 0x0009 && code !== 0x000a && code !== 0x000d) {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
        }
        if (code === 10) {
            // new line
            ++position;
            ++lexer.line;
            lexer.lineStart = position;
        } else if (code === 13) {
            // carriage return
            if (body.charCodeAt(position + 1) === 10) {
                position += 2;
            } else {
                ++position;
            }
            ++lexer.line;
            lexer.lineStart = position;
        } else if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
            rawValue += body.slice(chunkStart, position) + '"""';
            position += 4;
            chunkStart = position;
        } else {
            ++position;
        }
    }
    throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(source, position, 'Unterminated string.');
}
/**
 * Converts four hexadecimal chars to the integer that the
 * string represents. For example, uniCharCode('0','0','0','f')
 * will return 15, and uniCharCode('0','0','f','f') returns 255.
 *
 * Returns a negative number on error, if a char was invalid.
 *
 * This is implemented by noting that char2hex() returns -1 on error,
 * which means the result of ORing the char2hex() will also be negative.
 */ function uniCharCode(a, b, c, d) {
    return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
}
/**
 * Converts a hex character to its integer value.
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 on error.
 */ function char2hex(a) {
    return a >= 48 && a <= 57 ? a - 48 // 0-9
     : a >= 65 && a <= 70 ? a - 55 // A-F
     : a >= 97 && a <= 102 ? a - 87 // a-f
     : -1;
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * [_A-Za-z][_0-9A-Za-z]*
 */ function readName(source, start, line, col, prev) {
    var body = source.body;
    var bodyLength = body.length;
    var position = start + 1;
    var code = 0;
    while(position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || // _
    code >= 48 && code <= 57 || // 0-9
    code >= 65 && code <= 90 || // A-Z
    code >= 97 && code <= 122) // a-z
    ){
        ++position;
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Token"](__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME, start, position, line, col, prev, body.slice(start, position));
} // _ A-Z a-z
function isNameStart(code) {
    return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
}
}),
"[project]/christmas-store-registration/node_modules/graphql/language/parser.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Parser",
    ()=>Parser,
    "parse",
    ()=>parse,
    "parseType",
    ()=>parseType,
    "parseValue",
    ()=>parseValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/error/syntaxError.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/kinds.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/ast.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/tokenKind.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$source$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/source.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$directiveLocation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/directiveLocation.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$lexer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/lexer.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
function parse(source, options) {
    var parser = new Parser(source, options);
    return parser.parseDocument();
}
function parseValue(source, options) {
    var parser = new Parser(source, options);
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].SOF);
    var value = parser.parseValueLiteral(false);
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EOF);
    return value;
}
function parseType(source, options) {
    var parser = new Parser(source, options);
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].SOF);
    var type = parser.parseTypeReference();
    parser.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EOF);
    return type;
}
var Parser = /*#__PURE__*/ function() {
    function Parser(source, options) {
        var sourceObj = (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$source$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSource"])(source) ? source : new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$source$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Source"](source);
        this._lexer = new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$lexer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Lexer"](sourceObj);
        this._options = options;
    }
    /**
   * Converts a name lex token into a name parse node.
   */ var _proto = Parser.prototype;
    _proto.parseName = function parseName() {
        var token = this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].NAME,
            value: token.value,
            loc: this.loc(token)
        };
    } // Implements the parsing rules in the Document section.
    ;
    _proto.parseDocument = function parseDocument() {
        var start = this._lexer.token;
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].DOCUMENT,
            definitions: this.many(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].SOF, this.parseDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EOF),
            loc: this.loc(start)
        };
    };
    _proto.parseDefinition = function parseDefinition() {
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME)) {
            switch(this._lexer.token.value){
                case 'query':
                case 'mutation':
                case 'subscription':
                    return this.parseOperationDefinition();
                case 'fragment':
                    return this.parseFragmentDefinition();
                case 'schema':
                case 'scalar':
                case 'type':
                case 'interface':
                case 'union':
                case 'enum':
                case 'input':
                case 'directive':
                    return this.parseTypeSystemDefinition();
                case 'extend':
                    return this.parseTypeSystemExtension();
            }
        } else if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L)) {
            return this.parseOperationDefinition();
        } else if (this.peekDescription()) {
            return this.parseTypeSystemDefinition();
        }
        throw this.unexpected();
    } // Implements the parsing rules in the Operations section.
    ;
    _proto.parseOperationDefinition = function parseOperationDefinition() {
        var start = this._lexer.token;
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L)) {
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].OPERATION_DEFINITION,
                operation: 'query',
                name: undefined,
                variableDefinitions: [],
                directives: [],
                selectionSet: this.parseSelectionSet(),
                loc: this.loc(start)
            };
        }
        var operation = this.parseOperationType();
        var name;
        if (this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME)) {
            name = this.parseName();
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].OPERATION_DEFINITION,
            operation: operation,
            name: name,
            variableDefinitions: this.parseVariableDefinitions(),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet(),
            loc: this.loc(start)
        };
    };
    _proto.parseOperationType = function parseOperationType() {
        var operationToken = this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME);
        switch(operationToken.value){
            case 'query':
                return 'query';
            case 'mutation':
                return 'mutation';
            case 'subscription':
                return 'subscription';
        }
        throw this.unexpected(operationToken);
    };
    _proto.parseVariableDefinitions = function parseVariableDefinitions() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L, this.parseVariableDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R);
    };
    _proto.parseVariableDefinition = function parseVariableDefinition() {
        var start = this._lexer.token;
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].VARIABLE_DEFINITION,
            variable: this.parseVariable(),
            type: (this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON), this.parseTypeReference()),
            defaultValue: this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS) ? this.parseValueLiteral(true) : undefined,
            directives: this.parseDirectives(true),
            loc: this.loc(start)
        };
    };
    _proto.parseVariable = function parseVariable() {
        var start = this._lexer.token;
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].VARIABLE,
            name: this.parseName(),
            loc: this.loc(start)
        };
    };
    _proto.parseSelectionSet = function parseSelectionSet() {
        var start = this._lexer.token;
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].SELECTION_SET,
            selections: this.many(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseSelection, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R),
            loc: this.loc(start)
        };
    };
    _proto.parseSelection = function parseSelection() {
        return this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].SPREAD) ? this.parseFragment() : this.parseField();
    };
    _proto.parseField = function parseField() {
        var start = this._lexer.token;
        var nameOrAlias = this.parseName();
        var alias;
        var name;
        if (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON)) {
            alias = nameOrAlias;
            name = this.parseName();
        } else {
            name = nameOrAlias;
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].FIELD,
            alias: alias,
            name: name,
            arguments: this.parseArguments(false),
            directives: this.parseDirectives(false),
            selectionSet: this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L) ? this.parseSelectionSet() : undefined,
            loc: this.loc(start)
        };
    };
    _proto.parseArguments = function parseArguments(isConst) {
        var item = isConst ? this.parseConstArgument : this.parseArgument;
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L, item, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R);
    };
    _proto.parseArgument = function parseArgument() {
        var start = this._lexer.token;
        var name = this.parseName();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].ARGUMENT,
            name: name,
            value: this.parseValueLiteral(false),
            loc: this.loc(start)
        };
    };
    _proto.parseConstArgument = function parseConstArgument() {
        var start = this._lexer.token;
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].ARGUMENT,
            name: this.parseName(),
            value: (this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON), this.parseValueLiteral(true)),
            loc: this.loc(start)
        };
    } // Implements the parsing rules in the Fragments section.
    ;
    _proto.parseFragment = function parseFragment() {
        var start = this._lexer.token;
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].SPREAD);
        var hasTypeCondition = this.expectOptionalKeyword('on');
        if (!hasTypeCondition && this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME)) {
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].FRAGMENT_SPREAD,
                name: this.parseFragmentName(),
                directives: this.parseDirectives(false),
                loc: this.loc(start)
            };
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].INLINE_FRAGMENT,
            typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet(),
            loc: this.loc(start)
        };
    };
    _proto.parseFragmentDefinition = function parseFragmentDefinition() {
        var _this$_options;
        var start = this._lexer.token;
        this.expectKeyword('fragment'); // Experimental support for defining variables within fragments changes
        // the grammar of FragmentDefinition:
        //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet
        if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].FRAGMENT_DEFINITION,
                name: this.parseFragmentName(),
                variableDefinitions: this.parseVariableDefinitions(),
                typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
                directives: this.parseDirectives(false),
                selectionSet: this.parseSelectionSet(),
                loc: this.loc(start)
            };
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
            directives: this.parseDirectives(false),
            selectionSet: this.parseSelectionSet(),
            loc: this.loc(start)
        };
    };
    _proto.parseFragmentName = function parseFragmentName() {
        if (this._lexer.token.value === 'on') {
            throw this.unexpected();
        }
        return this.parseName();
    } // Implements the parsing rules in the Values section.
    ;
    _proto.parseValueLiteral = function parseValueLiteral(isConst) {
        var token = this._lexer.token;
        switch(token.kind){
            case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L:
                return this.parseList(isConst);
            case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L:
                return this.parseObject(isConst);
            case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].INT:
                this._lexer.advance();
                return {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].INT,
                    value: token.value,
                    loc: this.loc(token)
                };
            case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].FLOAT:
                this._lexer.advance();
                return {
                    kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].FLOAT,
                    value: token.value,
                    loc: this.loc(token)
                };
            case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].STRING:
            case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BLOCK_STRING:
                return this.parseStringLiteral();
            case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME:
                this._lexer.advance();
                switch(token.value){
                    case 'true':
                        return {
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].BOOLEAN,
                            value: true,
                            loc: this.loc(token)
                        };
                    case 'false':
                        return {
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].BOOLEAN,
                            value: false,
                            loc: this.loc(token)
                        };
                    case 'null':
                        return {
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].NULL,
                            loc: this.loc(token)
                        };
                    default:
                        return {
                            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].ENUM,
                            value: token.value,
                            loc: this.loc(token)
                        };
                }
            case __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].DOLLAR:
                if (!isConst) {
                    return this.parseVariable();
                }
                break;
        }
        throw this.unexpected();
    };
    _proto.parseStringLiteral = function parseStringLiteral() {
        var token = this._lexer.token;
        this._lexer.advance();
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].STRING,
            value: token.value,
            block: token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BLOCK_STRING,
            loc: this.loc(token)
        };
    };
    _proto.parseList = function parseList(isConst) {
        var _this = this;
        var start = this._lexer.token;
        var item = function item() {
            return _this.parseValueLiteral(isConst);
        };
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].LIST,
            values: this.any(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L, item, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_R),
            loc: this.loc(start)
        };
    };
    _proto.parseObject = function parseObject(isConst) {
        var _this2 = this;
        var start = this._lexer.token;
        var item = function item() {
            return _this2.parseObjectField(isConst);
        };
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].OBJECT,
            fields: this.any(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, item, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R),
            loc: this.loc(start)
        };
    };
    _proto.parseObjectField = function parseObjectField(isConst) {
        var start = this._lexer.token;
        var name = this.parseName();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].OBJECT_FIELD,
            name: name,
            value: this.parseValueLiteral(isConst),
            loc: this.loc(start)
        };
    } // Implements the parsing rules in the Directives section.
    ;
    _proto.parseDirectives = function parseDirectives(isConst) {
        var directives = [];
        while(this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AT)){
            directives.push(this.parseDirective(isConst));
        }
        return directives;
    };
    _proto.parseDirective = function parseDirective(isConst) {
        var start = this._lexer.token;
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AT);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].DIRECTIVE,
            name: this.parseName(),
            arguments: this.parseArguments(isConst),
            loc: this.loc(start)
        };
    } // Implements the parsing rules in the Types section.
    ;
    _proto.parseTypeReference = function parseTypeReference() {
        var start = this._lexer.token;
        var type;
        if (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_L)) {
            type = this.parseTypeReference();
            this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACKET_R);
            type = {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].LIST_TYPE,
                type: type,
                loc: this.loc(start)
            };
        } else {
            type = this.parseNamedType();
        }
        if (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BANG)) {
            return {
                kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].NON_NULL_TYPE,
                type: type,
                loc: this.loc(start)
            };
        }
        return type;
    };
    _proto.parseNamedType = function parseNamedType() {
        var start = this._lexer.token;
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].NAMED_TYPE,
            name: this.parseName(),
            loc: this.loc(start)
        };
    } // Implements the parsing rules in the Type Definition section.
    ;
    _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
        // Many definitions begin with a description and require a lookahead.
        var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
        if (keywordToken.kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME) {
            switch(keywordToken.value){
                case 'schema':
                    return this.parseSchemaDefinition();
                case 'scalar':
                    return this.parseScalarTypeDefinition();
                case 'type':
                    return this.parseObjectTypeDefinition();
                case 'interface':
                    return this.parseInterfaceTypeDefinition();
                case 'union':
                    return this.parseUnionTypeDefinition();
                case 'enum':
                    return this.parseEnumTypeDefinition();
                case 'input':
                    return this.parseInputObjectTypeDefinition();
                case 'directive':
                    return this.parseDirectiveDefinition();
            }
        }
        throw this.unexpected(keywordToken);
    };
    _proto.peekDescription = function peekDescription() {
        return this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].STRING) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BLOCK_STRING);
    };
    _proto.parseDescription = function parseDescription() {
        if (this.peekDescription()) {
            return this.parseStringLiteral();
        }
    };
    _proto.parseSchemaDefinition = function parseSchemaDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        this.expectKeyword('schema');
        var directives = this.parseDirectives(true);
        var operationTypes = this.many(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseOperationTypeDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].SCHEMA_DEFINITION,
            description: description,
            directives: directives,
            operationTypes: operationTypes,
            loc: this.loc(start)
        };
    };
    _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
        var start = this._lexer.token;
        var operation = this.parseOperationType();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        var type = this.parseNamedType();
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].OPERATION_TYPE_DEFINITION,
            operation: operation,
            type: type,
            loc: this.loc(start)
        };
    };
    _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        this.expectKeyword('scalar');
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].SCALAR_TYPE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            loc: this.loc(start)
        };
    };
    _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        this.expectKeyword('type');
        var name = this.parseName();
        var interfaces = this.parseImplementsInterfaces();
        var directives = this.parseDirectives(true);
        var fields = this.parseFieldsDefinition();
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].OBJECT_TYPE_DEFINITION,
            description: description,
            name: name,
            interfaces: interfaces,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
        };
    };
    _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
        var _this$_options2;
        if (!this.expectOptionalKeyword('implements')) {
            return [];
        }
        if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
            var types = []; // Optional leading ampersand
            this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AMP);
            do {
                types.push(this.parseNamedType());
            }while (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AMP) || this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME))
            return types;
        }
        return this.delimitedMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AMP, this.parseNamedType);
    };
    _proto.parseFieldsDefinition = function parseFieldsDefinition() {
        var _this$_options3;
        // Legacy support for the SDL?
        if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L) && this._lexer.lookahead().kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R) {
            this._lexer.advance();
            this._lexer.advance();
            return [];
        }
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseFieldDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
    };
    _proto.parseFieldDefinition = function parseFieldDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        var name = this.parseName();
        var args = this.parseArgumentDefs();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        var type = this.parseTypeReference();
        var directives = this.parseDirectives(true);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].FIELD_DEFINITION,
            description: description,
            name: name,
            arguments: args,
            type: type,
            directives: directives,
            loc: this.loc(start)
        };
    };
    _proto.parseArgumentDefs = function parseArgumentDefs() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_L, this.parseInputValueDef, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PAREN_R);
    };
    _proto.parseInputValueDef = function parseInputValueDef() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        var name = this.parseName();
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].COLON);
        var type = this.parseTypeReference();
        var defaultValue;
        if (this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS)) {
            defaultValue = this.parseValueLiteral(true);
        }
        var directives = this.parseDirectives(true);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].INPUT_VALUE_DEFINITION,
            description: description,
            name: name,
            type: type,
            defaultValue: defaultValue,
            directives: directives,
            loc: this.loc(start)
        };
    };
    _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        this.expectKeyword('interface');
        var name = this.parseName();
        var interfaces = this.parseImplementsInterfaces();
        var directives = this.parseDirectives(true);
        var fields = this.parseFieldsDefinition();
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].INTERFACE_TYPE_DEFINITION,
            description: description,
            name: name,
            interfaces: interfaces,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
        };
    };
    _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        this.expectKeyword('union');
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        var types = this.parseUnionMemberTypes();
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].UNION_TYPE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            types: types,
            loc: this.loc(start)
        };
    };
    _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
        return this.expectOptionalToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].EQUALS) ? this.delimitedMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PIPE, this.parseNamedType) : [];
    };
    _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        this.expectKeyword('enum');
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        var values = this.parseEnumValuesDefinition();
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].ENUM_TYPE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            values: values,
            loc: this.loc(start)
        };
    };
    _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseEnumValueDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
    };
    _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].ENUM_VALUE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            loc: this.loc(start)
        };
    };
    _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        this.expectKeyword('input');
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        var fields = this.parseInputFieldsDefinition();
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].INPUT_OBJECT_TYPE_DEFINITION,
            description: description,
            name: name,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
        };
    };
    _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
        return this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseInputValueDef, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
    };
    _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
        var keywordToken = this._lexer.lookahead();
        if (keywordToken.kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME) {
            switch(keywordToken.value){
                case 'schema':
                    return this.parseSchemaExtension();
                case 'scalar':
                    return this.parseScalarTypeExtension();
                case 'type':
                    return this.parseObjectTypeExtension();
                case 'interface':
                    return this.parseInterfaceTypeExtension();
                case 'union':
                    return this.parseUnionTypeExtension();
                case 'enum':
                    return this.parseEnumTypeExtension();
                case 'input':
                    return this.parseInputObjectTypeExtension();
            }
        }
        throw this.unexpected(keywordToken);
    };
    _proto.parseSchemaExtension = function parseSchemaExtension() {
        var start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('schema');
        var directives = this.parseDirectives(true);
        var operationTypes = this.optionalMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_L, this.parseOperationTypeDefinition, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].BRACE_R);
        if (directives.length === 0 && operationTypes.length === 0) {
            throw this.unexpected();
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].SCHEMA_EXTENSION,
            directives: directives,
            operationTypes: operationTypes,
            loc: this.loc(start)
        };
    };
    _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
        var start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('scalar');
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        if (directives.length === 0) {
            throw this.unexpected();
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].SCALAR_TYPE_EXTENSION,
            name: name,
            directives: directives,
            loc: this.loc(start)
        };
    };
    _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
        var start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('type');
        var name = this.parseName();
        var interfaces = this.parseImplementsInterfaces();
        var directives = this.parseDirectives(true);
        var fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].OBJECT_TYPE_EXTENSION,
            name: name,
            interfaces: interfaces,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
        };
    };
    _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
        var start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('interface');
        var name = this.parseName();
        var interfaces = this.parseImplementsInterfaces();
        var directives = this.parseDirectives(true);
        var fields = this.parseFieldsDefinition();
        if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].INTERFACE_TYPE_EXTENSION,
            name: name,
            interfaces: interfaces,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
        };
    };
    _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
        var start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('union');
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        var types = this.parseUnionMemberTypes();
        if (directives.length === 0 && types.length === 0) {
            throw this.unexpected();
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].UNION_TYPE_EXTENSION,
            name: name,
            directives: directives,
            types: types,
            loc: this.loc(start)
        };
    };
    _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
        var start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('enum');
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        var values = this.parseEnumValuesDefinition();
        if (directives.length === 0 && values.length === 0) {
            throw this.unexpected();
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].ENUM_TYPE_EXTENSION,
            name: name,
            directives: directives,
            values: values,
            loc: this.loc(start)
        };
    };
    _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
        var start = this._lexer.token;
        this.expectKeyword('extend');
        this.expectKeyword('input');
        var name = this.parseName();
        var directives = this.parseDirectives(true);
        var fields = this.parseInputFieldsDefinition();
        if (directives.length === 0 && fields.length === 0) {
            throw this.unexpected();
        }
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].INPUT_OBJECT_TYPE_EXTENSION,
            name: name,
            directives: directives,
            fields: fields,
            loc: this.loc(start)
        };
    };
    _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
        var start = this._lexer.token;
        var description = this.parseDescription();
        this.expectKeyword('directive');
        this.expectToken(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].AT);
        var name = this.parseName();
        var args = this.parseArgumentDefs();
        var repeatable = this.expectOptionalKeyword('repeatable');
        this.expectKeyword('on');
        var locations = this.parseDirectiveLocations();
        return {
            kind: __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$kinds$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Kind"].DIRECTIVE_DEFINITION,
            description: description,
            name: name,
            arguments: args,
            repeatable: repeatable,
            locations: locations,
            loc: this.loc(start)
        };
    };
    _proto.parseDirectiveLocations = function parseDirectiveLocations() {
        return this.delimitedMany(__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].PIPE, this.parseDirectiveLocation);
    };
    _proto.parseDirectiveLocation = function parseDirectiveLocation() {
        var start = this._lexer.token;
        var name = this.parseName();
        if (__TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$directiveLocation$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DirectiveLocation"][name.value] !== undefined) {
            return name;
        }
        throw this.unexpected(start);
    } // Core parsing utility functions
    ;
    _proto.loc = function loc(startToken) {
        var _this$_options4;
        if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
            return new __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Location"](startToken, this._lexer.lastToken, this._lexer.source);
        }
    };
    _proto.peek = function peek(kind) {
        return this._lexer.token.kind === kind;
    };
    _proto.expectToken = function expectToken(kind) {
        var token = this._lexer.token;
        if (token.kind === kind) {
            this._lexer.advance();
            return token;
        }
        throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
    };
    _proto.expectOptionalToken = function expectOptionalToken(kind) {
        var token = this._lexer.token;
        if (token.kind === kind) {
            this._lexer.advance();
            return token;
        }
        return undefined;
    };
    _proto.expectKeyword = function expectKeyword(value) {
        var token = this._lexer.token;
        if (token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME && token.value === value) {
            this._lexer.advance();
        } else {
            throw (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, token.start, "Expected \"".concat(value, "\", found ").concat(getTokenDesc(token), "."));
        }
    };
    _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
        var token = this._lexer.token;
        if (token.kind === __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$tokenKind$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TokenKind"].NAME && token.value === value) {
            this._lexer.advance();
            return true;
        }
        return false;
    };
    _proto.unexpected = function unexpected(atToken) {
        var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$error$2f$syntaxError$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syntaxError"])(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
    };
    _proto.any = function any(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        var nodes = [];
        while(!this.expectOptionalToken(closeKind)){
            nodes.push(parseFn.call(this));
        }
        return nodes;
    };
    _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
        if (this.expectOptionalToken(openKind)) {
            var nodes = [];
            do {
                nodes.push(parseFn.call(this));
            }while (!this.expectOptionalToken(closeKind))
            return nodes;
        }
        return [];
    };
    _proto.many = function many(openKind, parseFn, closeKind) {
        this.expectToken(openKind);
        var nodes = [];
        do {
            nodes.push(parseFn.call(this));
        }while (!this.expectOptionalToken(closeKind))
        return nodes;
    };
    _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
        this.expectOptionalToken(delimiterKind);
        var nodes = [];
        do {
            nodes.push(parseFn.call(this));
        }while (this.expectOptionalToken(delimiterKind))
        return nodes;
    };
    return Parser;
}();
/**
 * A helper function to describe a token as a string for debugging.
 */ function getTokenDesc(token) {
    var value = token.value;
    return getTokenKindDesc(token.kind) + (value != null ? " \"".concat(value, "\"") : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */ function getTokenKindDesc(kind) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$lexer$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPunctuatorTokenKind"])(kind) ? "\"".concat(kind, "\"") : kind;
}
}),
"[project]/christmas-store-registration/node_modules/graphql/language/visitor.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BREAK",
    ()=>BREAK,
    "QueryDocumentKeys",
    ()=>QueryDocumentKeys,
    "getVisitFn",
    ()=>getVisitFn,
    "visit",
    ()=>visit,
    "visitInParallel",
    ()=>visitInParallel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/jsutils/inspect.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/ast.mjs [app-ssr] (ecmascript)");
;
;
var QueryDocumentKeys = {
    Name: [],
    Document: [
        'definitions'
    ],
    OperationDefinition: [
        'name',
        'variableDefinitions',
        'directives',
        'selectionSet'
    ],
    VariableDefinition: [
        'variable',
        'type',
        'defaultValue',
        'directives'
    ],
    Variable: [
        'name'
    ],
    SelectionSet: [
        'selections'
    ],
    Field: [
        'alias',
        'name',
        'arguments',
        'directives',
        'selectionSet'
    ],
    Argument: [
        'name',
        'value'
    ],
    FragmentSpread: [
        'name',
        'directives'
    ],
    InlineFragment: [
        'typeCondition',
        'directives',
        'selectionSet'
    ],
    FragmentDefinition: [
        'name',
        // or removed in the future.
        'variableDefinitions',
        'typeCondition',
        'directives',
        'selectionSet'
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: [
        'values'
    ],
    ObjectValue: [
        'fields'
    ],
    ObjectField: [
        'name',
        'value'
    ],
    Directive: [
        'name',
        'arguments'
    ],
    NamedType: [
        'name'
    ],
    ListType: [
        'type'
    ],
    NonNullType: [
        'type'
    ],
    SchemaDefinition: [
        'description',
        'directives',
        'operationTypes'
    ],
    OperationTypeDefinition: [
        'type'
    ],
    ScalarTypeDefinition: [
        'description',
        'name',
        'directives'
    ],
    ObjectTypeDefinition: [
        'description',
        'name',
        'interfaces',
        'directives',
        'fields'
    ],
    FieldDefinition: [
        'description',
        'name',
        'arguments',
        'type',
        'directives'
    ],
    InputValueDefinition: [
        'description',
        'name',
        'type',
        'defaultValue',
        'directives'
    ],
    InterfaceTypeDefinition: [
        'description',
        'name',
        'interfaces',
        'directives',
        'fields'
    ],
    UnionTypeDefinition: [
        'description',
        'name',
        'directives',
        'types'
    ],
    EnumTypeDefinition: [
        'description',
        'name',
        'directives',
        'values'
    ],
    EnumValueDefinition: [
        'description',
        'name',
        'directives'
    ],
    InputObjectTypeDefinition: [
        'description',
        'name',
        'directives',
        'fields'
    ],
    DirectiveDefinition: [
        'description',
        'name',
        'arguments',
        'locations'
    ],
    SchemaExtension: [
        'directives',
        'operationTypes'
    ],
    ScalarTypeExtension: [
        'name',
        'directives'
    ],
    ObjectTypeExtension: [
        'name',
        'interfaces',
        'directives',
        'fields'
    ],
    InterfaceTypeExtension: [
        'name',
        'interfaces',
        'directives',
        'fields'
    ],
    UnionTypeExtension: [
        'name',
        'directives',
        'types'
    ],
    EnumTypeExtension: [
        'name',
        'directives',
        'values'
    ],
    InputObjectTypeExtension: [
        'name',
        'directives',
        'fields'
    ]
};
var BREAK = Object.freeze({});
function visit(root, visitor) {
    var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;
    /* eslint-disable no-undef-init */ var stack = undefined;
    var inArray = Array.isArray(root);
    var keys = [
        root
    ];
    var index = -1;
    var edits = [];
    var node = undefined;
    var key = undefined;
    var parent = undefined;
    var path = [];
    var ancestors = [];
    var newRoot = root;
    /* eslint-enable no-undef-init */ do {
        index++;
        var isLeaving = index === keys.length;
        var isEdited = isLeaving && edits.length !== 0;
        if (isLeaving) {
            key = ancestors.length === 0 ? undefined : path[path.length - 1];
            node = parent;
            parent = ancestors.pop();
            if (isEdited) {
                if (inArray) {
                    node = node.slice();
                } else {
                    var clone = {};
                    for(var _i2 = 0, _Object$keys2 = Object.keys(node); _i2 < _Object$keys2.length; _i2++){
                        var k = _Object$keys2[_i2];
                        clone[k] = node[k];
                    }
                    node = clone;
                }
                var editOffset = 0;
                for(var ii = 0; ii < edits.length; ii++){
                    var editKey = edits[ii][0];
                    var editValue = edits[ii][1];
                    if (inArray) {
                        editKey -= editOffset;
                    }
                    if (inArray && editValue === null) {
                        node.splice(editKey, 1);
                        editOffset++;
                    } else {
                        node[editKey] = editValue;
                    }
                }
            }
            index = stack.index;
            keys = stack.keys;
            edits = stack.edits;
            inArray = stack.inArray;
            stack = stack.prev;
        } else {
            key = parent ? inArray ? index : keys[index] : undefined;
            node = parent ? parent[key] : newRoot;
            if (node === null || node === undefined) {
                continue;
            }
            if (parent) {
                path.push(key);
            }
        }
        var result = void 0;
        if (!Array.isArray(node)) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(node)) {
                throw new Error("Invalid AST Node: ".concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$jsutils$2f$inspect$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(node), "."));
            }
            var visitFn = getVisitFn(visitor, node.kind, isLeaving);
            if (visitFn) {
                result = visitFn.call(visitor, node, key, parent, path, ancestors);
                if (result === BREAK) {
                    break;
                }
                if (result === false) {
                    if (!isLeaving) {
                        path.pop();
                        continue;
                    }
                } else if (result !== undefined) {
                    edits.push([
                        key,
                        result
                    ]);
                    if (!isLeaving) {
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$ast$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isNode"])(result)) {
                            node = result;
                        } else {
                            path.pop();
                            continue;
                        }
                    }
                }
            }
        }
        if (result === undefined && isEdited) {
            edits.push([
                key,
                node
            ]);
        }
        if (isLeaving) {
            path.pop();
        } else {
            var _visitorKeys$node$kin;
            stack = {
                inArray: inArray,
                index: index,
                keys: keys,
                edits: edits,
                prev: stack
            };
            inArray = Array.isArray(node);
            keys = inArray ? node : (_visitorKeys$node$kin = visitorKeys[node.kind]) !== null && _visitorKeys$node$kin !== void 0 ? _visitorKeys$node$kin : [];
            index = -1;
            edits = [];
            if (parent) {
                ancestors.push(parent);
            }
            parent = node;
        }
    }while (stack !== undefined)
    if (edits.length !== 0) {
        newRoot = edits[edits.length - 1][1];
    }
    return newRoot;
}
function visitInParallel(visitors) {
    var skipping = new Array(visitors.length);
    return {
        enter: function enter(node) {
            for(var i = 0; i < visitors.length; i++){
                if (skipping[i] == null) {
                    var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */ false);
                    if (fn) {
                        var result = fn.apply(visitors[i], arguments);
                        if (result === false) {
                            skipping[i] = node;
                        } else if (result === BREAK) {
                            skipping[i] = BREAK;
                        } else if (result !== undefined) {
                            return result;
                        }
                    }
                }
            }
        },
        leave: function leave(node) {
            for(var i = 0; i < visitors.length; i++){
                if (skipping[i] == null) {
                    var fn = getVisitFn(visitors[i], node.kind, /* isLeaving */ true);
                    if (fn) {
                        var result = fn.apply(visitors[i], arguments);
                        if (result === BREAK) {
                            skipping[i] = BREAK;
                        } else if (result !== undefined && result !== false) {
                            return result;
                        }
                    }
                } else if (skipping[i] === node) {
                    skipping[i] = null;
                }
            }
        }
    };
}
function getVisitFn(visitor, kind, isLeaving) {
    var kindVisitor = visitor[kind];
    if (kindVisitor) {
        if (!isLeaving && typeof kindVisitor === 'function') {
            // { Kind() {} }
            return kindVisitor;
        }
        var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;
        if (typeof kindSpecificVisitor === 'function') {
            // { Kind: { enter() {}, leave() {} } }
            return kindSpecificVisitor;
        }
    } else {
        var specificVisitor = isLeaving ? visitor.leave : visitor.enter;
        if (specificVisitor) {
            if (typeof specificVisitor === 'function') {
                // { enter() {}, leave() {} }
                return specificVisitor;
            }
            var specificKindVisitor = specificVisitor[kind];
            if (typeof specificKindVisitor === 'function') {
                // { enter: { Kind() {} }, leave: { Kind() {} } }
                return specificKindVisitor;
            }
        }
    }
}
}),
"[project]/christmas-store-registration/node_modules/graphql/language/printer.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "print",
    ()=>print
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$visitor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/visitor.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$blockString$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/christmas-store-registration/node_modules/graphql/language/blockString.mjs [app-ssr] (ecmascript)");
;
;
function print(ast) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$visitor$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["visit"])(ast, {
        leave: printDocASTReducer
    });
}
var MAX_LINE_LENGTH = 80; // TODO: provide better type coverage in future
var printDocASTReducer = {
    Name: function Name(node) {
        return node.value;
    },
    Variable: function Variable(node) {
        return '$' + node.name;
    },
    // Document
    Document: function Document(node) {
        return join(node.definitions, '\n\n') + '\n';
    },
    OperationDefinition: function OperationDefinition(node) {
        var op = node.operation;
        var name = node.name;
        var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
        var directives = join(node.directives, ' ');
        var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
        // the query short form.
        return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([
            op,
            join([
                name,
                varDefs
            ]),
            directives,
            selectionSet
        ], ' ');
    },
    VariableDefinition: function VariableDefinition(_ref) {
        var variable = _ref.variable, type = _ref.type, defaultValue = _ref.defaultValue, directives = _ref.directives;
        return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
    },
    SelectionSet: function SelectionSet(_ref2) {
        var selections = _ref2.selections;
        return block(selections);
    },
    Field: function Field(_ref3) {
        var alias = _ref3.alias, name = _ref3.name, args = _ref3.arguments, directives = _ref3.directives, selectionSet = _ref3.selectionSet;
        var prefix = wrap('', alias, ': ') + name;
        var argsLine = prefix + wrap('(', join(args, ', '), ')');
        if (argsLine.length > MAX_LINE_LENGTH) {
            argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
        }
        return join([
            argsLine,
            join(directives, ' '),
            selectionSet
        ], ' ');
    },
    Argument: function Argument(_ref4) {
        var name = _ref4.name, value = _ref4.value;
        return name + ': ' + value;
    },
    // Fragments
    FragmentSpread: function FragmentSpread(_ref5) {
        var name = _ref5.name, directives = _ref5.directives;
        return '...' + name + wrap(' ', join(directives, ' '));
    },
    InlineFragment: function InlineFragment(_ref6) {
        var typeCondition = _ref6.typeCondition, directives = _ref6.directives, selectionSet = _ref6.selectionSet;
        return join([
            '...',
            wrap('on ', typeCondition),
            join(directives, ' '),
            selectionSet
        ], ' ');
    },
    FragmentDefinition: function FragmentDefinition(_ref7) {
        var name = _ref7.name, typeCondition = _ref7.typeCondition, variableDefinitions = _ref7.variableDefinitions, directives = _ref7.directives, selectionSet = _ref7.selectionSet;
        return(// or removed in the future.
        "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet);
    },
    // Value
    IntValue: function IntValue(_ref8) {
        var value = _ref8.value;
        return value;
    },
    FloatValue: function FloatValue(_ref9) {
        var value = _ref9.value;
        return value;
    },
    StringValue: function StringValue(_ref10, key) {
        var value = _ref10.value, isBlockString = _ref10.block;
        return isBlockString ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$christmas$2d$store$2d$registration$2f$node_modules$2f$graphql$2f$language$2f$blockString$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["printBlockString"])(value, key === 'description' ? '' : '  ') : JSON.stringify(value);
    },
    BooleanValue: function BooleanValue(_ref11) {
        var value = _ref11.value;
        return value ? 'true' : 'false';
    },
    NullValue: function NullValue() {
        return 'null';
    },
    EnumValue: function EnumValue(_ref12) {
        var value = _ref12.value;
        return value;
    },
    ListValue: function ListValue(_ref13) {
        var values = _ref13.values;
        return '[' + join(values, ', ') + ']';
    },
    ObjectValue: function ObjectValue(_ref14) {
        var fields = _ref14.fields;
        return '{' + join(fields, ', ') + '}';
    },
    ObjectField: function ObjectField(_ref15) {
        var name = _ref15.name, value = _ref15.value;
        return name + ': ' + value;
    },
    // Directive
    Directive: function Directive(_ref16) {
        var name = _ref16.name, args = _ref16.arguments;
        return '@' + name + wrap('(', join(args, ', '), ')');
    },
    // Type
    NamedType: function NamedType(_ref17) {
        var name = _ref17.name;
        return name;
    },
    ListType: function ListType(_ref18) {
        var type = _ref18.type;
        return '[' + type + ']';
    },
    NonNullType: function NonNullType(_ref19) {
        var type = _ref19.type;
        return type + '!';
    },
    // Type System Definitions
    SchemaDefinition: addDescription(function(_ref20) {
        var directives = _ref20.directives, operationTypes = _ref20.operationTypes;
        return join([
            'schema',
            join(directives, ' '),
            block(operationTypes)
        ], ' ');
    }),
    OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
        var operation = _ref21.operation, type = _ref21.type;
        return operation + ': ' + type;
    },
    ScalarTypeDefinition: addDescription(function(_ref22) {
        var name = _ref22.name, directives = _ref22.directives;
        return join([
            'scalar',
            name,
            join(directives, ' ')
        ], ' ');
    }),
    ObjectTypeDefinition: addDescription(function(_ref23) {
        var name = _ref23.name, interfaces = _ref23.interfaces, directives = _ref23.directives, fields = _ref23.fields;
        return join([
            'type',
            name,
            wrap('implements ', join(interfaces, ' & ')),
            join(directives, ' '),
            block(fields)
        ], ' ');
    }),
    FieldDefinition: addDescription(function(_ref24) {
        var name = _ref24.name, args = _ref24.arguments, type = _ref24.type, directives = _ref24.directives;
        return name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + ': ' + type + wrap(' ', join(directives, ' '));
    }),
    InputValueDefinition: addDescription(function(_ref25) {
        var name = _ref25.name, type = _ref25.type, defaultValue = _ref25.defaultValue, directives = _ref25.directives;
        return join([
            name + ': ' + type,
            wrap('= ', defaultValue),
            join(directives, ' ')
        ], ' ');
    }),
    InterfaceTypeDefinition: addDescription(function(_ref26) {
        var name = _ref26.name, interfaces = _ref26.interfaces, directives = _ref26.directives, fields = _ref26.fields;
        return join([
            'interface',
            name,
            wrap('implements ', join(interfaces, ' & ')),
            join(directives, ' '),
            block(fields)
        ], ' ');
    }),
    UnionTypeDefinition: addDescription(function(_ref27) {
        var name = _ref27.name, directives = _ref27.directives, types = _ref27.types;
        return join([
            'union',
            name,
            join(directives, ' '),
            types && types.length !== 0 ? '= ' + join(types, ' | ') : ''
        ], ' ');
    }),
    EnumTypeDefinition: addDescription(function(_ref28) {
        var name = _ref28.name, directives = _ref28.directives, values = _ref28.values;
        return join([
            'enum',
            name,
            join(directives, ' '),
            block(values)
        ], ' ');
    }),
    EnumValueDefinition: addDescription(function(_ref29) {
        var name = _ref29.name, directives = _ref29.directives;
        return join([
            name,
            join(directives, ' ')
        ], ' ');
    }),
    InputObjectTypeDefinition: addDescription(function(_ref30) {
        var name = _ref30.name, directives = _ref30.directives, fields = _ref30.fields;
        return join([
            'input',
            name,
            join(directives, ' '),
            block(fields)
        ], ' ');
    }),
    DirectiveDefinition: addDescription(function(_ref31) {
        var name = _ref31.name, args = _ref31.arguments, repeatable = _ref31.repeatable, locations = _ref31.locations;
        return 'directive @' + name + (hasMultilineItems(args) ? wrap('(\n', indent(join(args, '\n')), '\n)') : wrap('(', join(args, ', '), ')')) + (repeatable ? ' repeatable' : '') + ' on ' + join(locations, ' | ');
    }),
    SchemaExtension: function SchemaExtension(_ref32) {
        var directives = _ref32.directives, operationTypes = _ref32.operationTypes;
        return join([
            'extend schema',
            join(directives, ' '),
            block(operationTypes)
        ], ' ');
    },
    ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
        var name = _ref33.name, directives = _ref33.directives;
        return join([
            'extend scalar',
            name,
            join(directives, ' ')
        ], ' ');
    },
    ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
        var name = _ref34.name, interfaces = _ref34.interfaces, directives = _ref34.directives, fields = _ref34.fields;
        return join([
            'extend type',
            name,
            wrap('implements ', join(interfaces, ' & ')),
            join(directives, ' '),
            block(fields)
        ], ' ');
    },
    InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
        var name = _ref35.name, interfaces = _ref35.interfaces, directives = _ref35.directives, fields = _ref35.fields;
        return join([
            'extend interface',
            name,
            wrap('implements ', join(interfaces, ' & ')),
            join(directives, ' '),
            block(fields)
        ], ' ');
    },
    UnionTypeExtension: function UnionTypeExtension(_ref36) {
        var name = _ref36.name, directives = _ref36.directives, types = _ref36.types;
        return join([
            'extend union',
            name,
            join(directives, ' '),
            types && types.length !== 0 ? '= ' + join(types, ' | ') : ''
        ], ' ');
    },
    EnumTypeExtension: function EnumTypeExtension(_ref37) {
        var name = _ref37.name, directives = _ref37.directives, values = _ref37.values;
        return join([
            'extend enum',
            name,
            join(directives, ' '),
            block(values)
        ], ' ');
    },
    InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
        var name = _ref38.name, directives = _ref38.directives, fields = _ref38.fields;
        return join([
            'extend input',
            name,
            join(directives, ' '),
            block(fields)
        ], ' ');
    }
};
function addDescription(cb) {
    return function(node) {
        return join([
            node.description,
            cb(node)
        ], '\n');
    };
}
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */ function join(maybeArray) {
    var _maybeArray$filter$jo;
    var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter(function(x) {
        return x;
    }).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : '';
}
/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */ function block(array) {
    return wrap('{\n', indent(join(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */ function wrap(start, maybeString) {
    var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    return maybeString != null && maybeString !== '' ? start + maybeString + end : '';
}
function indent(str) {
    return wrap('  ', str.replace(/\n/g, '\n  '));
}
function isMultiline(str) {
    return str.indexOf('\n') !== -1;
}
function hasMultilineItems(maybeArray) {
    return maybeArray != null && maybeArray.some(isMultiline);
}
}),
];

//# sourceMappingURL=6361e_graphql_72e2da2a._.js.map