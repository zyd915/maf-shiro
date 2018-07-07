"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_ = require("./check_");
function toJsonReplacer(key, value) {
    var val = value;
    // if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
    //     val = undefined;
    // }
    return val;
}
function toJson(obj, pretty) {
    if (check_.isUndefined(obj))
        return undefined;
    if (!check_.isNumber(pretty)) {
        pretty = pretty ? 2 : null;
    }
    return JSON.stringify(obj, toJsonReplacer, pretty);
}
exports.toJson = toJson;
function fromJson(json) {
    return check_.isString(json) ? JSON.parse(json) : json;
}
exports.fromJson = fromJson;
