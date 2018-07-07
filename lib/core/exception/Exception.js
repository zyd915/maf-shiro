"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Exception {
    constructor(msg, subEx) {
        this.msg = msg;
        this.subEx = subEx;
    }
}
exports.Exception = Exception;
