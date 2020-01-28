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
Object.defineProperty(exports, "__esModule", { value: true });
var platforms_1 = require("./platforms");
var Validation = /** @class */ (function () {
    function Validation(platform) {
        this.platform = platform;
        this.platform = platform;
    }
    Validation.prototype.validateModel = function (model) {
        switch (this.platform) {
            case platforms_1.MOBILE:
                return this.asMobile(model);
            case platforms_1.WEBISTE:
                return this.asWebSite(model);
            case platforms_1.WEBAPP:
                return this.asWebApp(model);
            default:
                return {};
        }
    };
    Validation.prototype.asMobile = function (model) {
        this.cValidate.MOBILE(model);
        return model;
    };
    Validation.prototype.asWebSite = function (model) {
        return model;
    };
    Validation.prototype.asWebApp = function (model) {
        return {};
    };
    Validation.prototype.error = function (err) {
        return __assign({}, err);
    };
    Object.defineProperty(Validation.prototype, "cValidate", {
        /**
         * Validation as Cotation
         */
        get: function () {
            return {
                MOBILE: function (model) {
                },
                WEBISTE: platforms_1.WEBISTE,
                WEBAPP: platforms_1.WEBAPP
            };
        },
        enumerable: true,
        configurable: true
    });
    Validation.prototype.Mobile = function () {
    };
    return Validation;
}());
exports.Validation = Validation;
