"use strict";
// import * as paths from 'path';
Object.defineProperty(exports, "__esModule", { value: true });
const cache_manager = require("cache-manager");
const cache_manager_fs = require("cache-manager-fs");
const CmfCache_1 = require("./CmfCache");
class CmfCacheManager {
    constructor(config) {
        this.config = config || {};
    }
    init() {
        let options = {
            ttl: 60 * 60 /* seconds */,
            maxsize: 1000 * 1000 * 1000 /* max size in bytes on disk */,
            path: 'diskcache',
            preventfill: false,
            fillcallback: null,
            zip: false,
            reviveBuffers: true,
        };
        let diskCache = cache_manager.caching({ store: cache_manager_fs, options: Object.assign(options, this.config) });
        this.cache = new CmfCache_1.CmfCache(diskCache);
    }
    getCache(cacheKey) {
        return this.cache;
    }
    destroy() {
    }
}
exports.CmfCacheManager = CmfCacheManager;
