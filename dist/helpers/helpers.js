"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundValues = function (num, dec) {
    if ((typeof num !== 'number') || (typeof dec !== 'number'))
        return false;
    var num_sign = num >= 0 ? 1 : -1;
    return (Math.round((num * Math.pow(10, dec)) + (num_sign * 0.0001)) / Math.pow(10, dec)).toFixed(dec).replace('.', ',');
};
/**
 *
 * @param {any} x
 */
exports.NumberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
exports.CodeGenerator = function () {
    var _code = "";
    var type = "abcdefghijklmnopqsrtuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 10; i++) {
        var pos = Math.floor(Math.random() * type.length);
        _code += type.charAt(pos);
    }
    return _code;
};
exports.isEmpty = function (input) { return !input || Object.keys(input).length === 0; };
exports.isEqualToZero = function (input) { return input === 0; };
