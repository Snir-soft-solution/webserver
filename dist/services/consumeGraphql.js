"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var helpers_1 = require("../helpers/helpers");
var GraphQL = /** @class */ (function () {
    function GraphQL() {
        this.schemma = {};
        this.tb = '';
    }
    GraphQL.prototype.generic = function (value) {
        var query = value.query, variables = value.variables, uri = value.uri;
        if (query === '')
            return console.error('you must pass some string on the query property');
        if (query !== undefined) {
            this.schemma = { query: query, variables: variables };
        }
        else {
            this.schemma = { query: query };
        }
        return fetch(uri, {
            method: "post",
            body: JSON.stringify(this.schemma),
            headers: { "Content-Type": "application/json" }
        });
    };
    GraphQL.prototype.get = function (_a) {
        var query = _a.query, table = _a.table, properties = _a.properties;
        this.tb = table;
        var val = '', props = '';
        var isSearchProps = ',$search:Boolean';
        var isSearchVal = ',search:$search';
        if (query !== undefined && query.hasOwnProperty('search')) {
            val = isSearchVal;
            props = isSearchProps;
        }
        if (query === '')
            return console.error('you must pass some string on the query property');
        if (query !== undefined) {
            this.schemma = {
                query: "query($id: String!, $consts: String " + props + ") { " + table + " (id: $id, consts: $consts " + val + ") {" + properties + "} }",
                variables: __assign({}, query)
            };
        }
        else {
            this.schemma = {
                query: "query { " + table + " {" + properties + "} }"
            };
        }
        return this;
    };
    GraphQL.prototype.add = function (_a) {
        var table = _a.table, properties = _a.properties, values = _a.values;
        this.schemma = {
            query: "mutation($obj: " + (table[0].toLowerCase() + table.substr(1, table.length)) + "Input!) { add" + table + "(obj: $obj) {" + properties + "} }",
            variables: {
                obj: values
            }
        };
        this.tb = "add" + table;
        return this;
    };
    GraphQL.prototype.update = function (_a) {
        var query = _a.query, table = _a.table, properties = _a.properties, values = _a.values;
        this.schemma = {
            query: "mutation($id: String!, $obj: " + table.toLowerCase() + "Input!) { update" + table + "(id: $id, obj: $obj) {" + properties + "} }",
            variables: {
                id: query.id,
                obj: values
            }
        };
        this.tb = "update" + table;
        return this;
    };
    GraphQL.prototype.remove = function (_a) {
        var query = _a.query, table = _a.table, properties = _a.properties;
        this.schemma = {
            query: "mutation($id: String!) { remove" + table + "(id: $id) {" + properties + "} }",
            variables: {
                id: query.id
            }
        };
        this.tb = "remove" + table;
        return this;
    };
    GraphQL.prototype.storeUser = function (objt, properties) {
        this.schemma = {
            query: "mutation($obj:registerInput!)\n                {\n                    registrar(obj:$obj)\n                    {\n                        " + properties + "\n                    }\n                }",
            variables: {
                obj: objt
            }
        };
        return this;
    };
    GraphQL.prototype.signIn = function (objt, properties) {
        this.schemma = {
            query: "query($obj:loginInput!)\n                {\n                    login(obj:$obj)\n                    {\n                       " + properties + "\n                    }\n                }",
            variables: {
                obj: objt
            }
        };
        return this;
    };
    GraphQL.prototype.run = function (uri, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post(uri, this.schemma)
                            .then(function (res) {
                            var result = { success: false, data: [] };
                            var errors = res.data.errors;
                            if (!helpers_1.isEmpty(errors))
                                throw new Error(errors[0].message);
                            result.data = res.data.data;
                            result.success = true;
                            if (callback !== undefined)
                                return callback(result);
                            return result;
                        })
                            .catch(function (err) { return err; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GraphQL;
}());
exports.default = new GraphQL();
