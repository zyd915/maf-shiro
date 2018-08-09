"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Filter_1 = require("./Filter");
const PathMatcher_1 = require("./PathMatcher");
class PathMatcherFilter extends Filter_1.AbstractFilter {
    constructor() {
        super();
        this.pathMatcher = new PathMatcher_1.PathMatcher();
        this.appliedPaths = new Map();
    }
    processPathConfig(path, config) {
        this.appliedPaths.set(path, config);
        return this;
    }
    pathsMatch(pattern, path) {
        return this.pathMatcher.match(pattern, path);
    }
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.appliedPaths.size == 0) {
                return true;
            }
            for (let [pattern, authConfig] of this.appliedPaths.entries()) {
                if (this.pathsMatch(pattern, req.url)) {
                    return yield this.onExecute(req, res, authConfig);
                }
            }
            return true;
        });
    }
}
exports.PathMatcherFilter = PathMatcherFilter;
