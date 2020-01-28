"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../helpers/config");
var consumeGraphql_1 = __importDefault(require("./consumeGraphql"));
var cotation_1 = __importDefault(require("./cotation"));
var Service = /** @class */ (function () {
    function Service(platform, uri) {
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
    Service.prototype.InsertCotacao = function (model, type, output) {
        output = output || 'idCotacao';
        var _instance = new cotation_1.default(model);
        if (_instance.onInsert(type.toUpperCase()) !== true)
            return new Error("AS");
        return this.task.insert({ table: 'Cotacao', values: model, properties: output });
    };
    return Service;
}());
exports.Service = Service;
