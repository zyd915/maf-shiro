"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathMatcher_1 = require("./PathMatcher");
const FilterManager_1 = require("./FilterManager");
class FiltersResolver {
    constructor() {
        this.matcher = new PathMatcher_1.PathMatcher();
        this.filterManager = new FilterManager_1.FilterManager();
    }
    setMatcher(matcher) {
        this.matcher = matcher;
    }
    getMatcher() {
        return this.matcher;
    }
    setFilterManager(filterManager) {
        this.filterManager = filterManager;
    }
    getFilterManager() {
        return this.filterManager;
    }
    resolve(req, res) {
        let path = req.url;
        let patterns = this.filterManager.getChainNames();
        for (let patten of patterns) {
            if (this.pathMatches(patten, path)) {
                let proxy = this.filterManager.proxy(patten);
                if (proxy)
                    proxy(req, res);
                return;
            }
        }
    }
    pathMatches(pattern, path) {
        let pathMatcher = this.getMatcher();
        return pathMatcher.match(pattern, path);
    }
}
exports.FiltersResolver = FiltersResolver;
