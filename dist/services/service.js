"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var consumeGraphql_1 = __importDefault(require("./consumeGraphql"));
var config_1 = require("../helpers/config");
var pessoa_1 = __importDefault(require("../modules/Pessoa/pessoa"));
var cotation_1 = __importDefault(require("../modules/Cotacao/cotation"));
var types_1 = require("./types");
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
                    return consumeGraphql_1.default.storeUser(obj, properties).run(_this.uri);
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return Service;
}());
exports.Service = Service;
