"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const co = require("co");
function sync(promiseFun, ...args) {
    let result = null;
    co(function* () {
        result = yield promiseFun(args);
        console.log(result);
    });
    return result;
}
exports.sync = sync;
