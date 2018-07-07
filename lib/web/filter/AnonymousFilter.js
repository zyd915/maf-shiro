"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathMatcherFilter_1 = require("./PathMatcherFilter");
class AnonymousFilter extends PathMatcherFilter_1.PathMatcherFilter {
    onExecute(req, res, param) {
        return true;
    }
}
exports.AnonymousFilter = AnonymousFilter;
