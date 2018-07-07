"use strict";
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
        if (this.appliedPaths.size == 0) {
            return true;
        }
        for (let [pattern, authConfig] of this.appliedPaths.entries()) {
            if (this.pathsMatch(pattern, req.url)) {
                return this.onExecute(req, res, authConfig);
            }
        }
        return true;
    }
}
exports.PathMatcherFilter = PathMatcherFilter;
