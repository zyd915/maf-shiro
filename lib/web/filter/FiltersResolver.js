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
        return __awaiter(this, void 0, void 0, function* () {
            let path = req.url;
            let patterns = this.filterManager.getChainNames();
            for (let patten of patterns) {
                if (this.pathMatches(patten, path)) {
                    let proxy = this.filterManager.proxy(patten);
                    if (proxy) {
                        return yield proxy(req, res);
                    }
                }
            }
            return true;
        });
    }
    pathMatches(pattern, path) {
        let pathMatcher = this.getMatcher();
        return pathMatcher.match(pattern, path);
    }
}
exports.FiltersResolver = FiltersResolver;
