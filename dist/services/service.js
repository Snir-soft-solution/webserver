"use strict";
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
var consumeGraphql_1 = __importDefault(require("./consumeGraphql"));
var config_1 = require("../helpers/config");
var pessoa_1 = __importDefault(require("../modules/Pessoa/pessoa"));
var cotation_1 = __importDefault(require("../modules/Cotacao/cotation"));
var types_1 = require("./types");
var helpers_1 = require("../helpers/helpers");
var Service = /** @class */ (function () {
    function Service(platform, uri) {
        this.platform = platform;
        this.uri = uri;
        this.uri = uri || config_1.DEFAULT_URI;
        this.platform = platform.toUpperCase();
    }
    Service.prototype.getStatus = function () {
        return {
            uri: this.uri,
            platform: this.platform
        };
    };
    Object.defineProperty(Service.prototype, "task", {
        get: function () {
            var _this = this;
            return {
                get: function (obj, callback) {
                    if (typeof obj !== 'object')
                        throw new Error('O valor do parametro deve ser um objecto.');
                    return consumeGraphql_1.default.get(obj).run(_this.uri, callback);
                },
                insert: function (obj) {
                    if (!obj.hasOwnProperty('table'))
                        throw new Error('Deve passar a propriedade "table".');
                    if (!obj.hasOwnProperty('values'))
                        throw new Error('Deve passar a propriedade "value".');
                    return consumeGraphql_1.default.add(obj).run(_this.uri);
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Service.prototype.storePessoa = function (model) {
        var _a, _b;
        var type = model.type;
        var _instance = new pessoa_1.default({ pessoa: "" });
        if (((_a = type) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === types_1.PESSOAS.SINGULAR) {
            _instance.onSave();
        }
        else if (((_b = type) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === types_1.PESSOAS.COLETIVO) {
        }
    };
    /**
     *  Cotações
     *  Aqui terá todas as funções que vai lida com os Cotações
     */
    Service.prototype.storeCotacao = function (config) {
        var output = config.output, data = config.data, type = config.type, table = config.table;
        table = table || 'Cotacao';
        output = output || 'idCotacao';
        var _instance = new cotation_1.default(data);
        if (_instance.onInsert(type.toUpperCase()) !== true)
            return new Error("AS");
        return this.task.insert({ table: table, values: data, properties: output });
    };
    Object.defineProperty(Service.prototype, "auth", {
        /**
         * Autenticação
         *  Aqui terá todas as funções que vai lida com os questionario
         */
        get: function () {
            var _this = this;
            return {
                signIn: function (obj, properties) {
                    return consumeGraphql_1.default.signIn(obj, properties).run(_this.uri);
                },
                signUp: function (obj, properties) {
                    var email = obj.email, confirmarPassword = obj.confirmarPassword, password = obj.password, username = obj.username;
                    if (username.trim().split(' ').length !== 1)
                        return _this.throwError({ message: 'Username não deve conter espaço em branco', });
                    if (helpers_1.isEmpty(confirmarPassword) || helpers_1.isEmpty(password) || password !== confirmarPassword) {
                        return _this.throwError({ message: 'Palavra passe vazio ou a palavra passa não está igual com a palavra passa de confirmação', });
                    }
                    if (helpers_1.isEmpty(email))
                        return consumeGraphql_1.default.storeUser(obj, properties).run(_this.uri);
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Service.prototype.throwError = function (msm) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(msm);
                    })];
            });
        });
    };
    return Service;
}());
exports.Service = Service;
