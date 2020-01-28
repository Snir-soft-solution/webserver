"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ISError = /** @class */ (function () {
    function ISError(message) {
        this.message = message;
        this.message = message;
    }
    ISError.prototype.error = function () {
        return this.message;
    };
    return ISError;
}());
exports.ISError = ISError;
