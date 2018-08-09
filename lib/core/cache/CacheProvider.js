"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmfCacheManager_1 = require("./impl/cache-manager-fs/CmfCacheManager");
const NodeCacheManager_1 = require("./impl/node-cache/NodeCacheManager");
const RedisCacheManager_1 = require("./impl/redis/RedisCacheManager");
class CacheProvider {
    static getCache(type, config) {
        let cache = null, cacheManager = null;
        if (type === "node" /* nodecache */) {
            cacheManager = new NodeCacheManager_1.NodeCacheManager(config);
        }
        else if (type === "redis" /* redis */) {
            cacheManager = new RedisCacheManager_1.RedisCacheManager(config);
        }
        else {
            cacheManager = new CmfCacheManager_1.CmfCacheManager(config);
        }
        if (cacheManager) {
            cacheManager.init();
            cache = cacheManager.getCache();
        }
        return cache;
    }
}
exports.CacheProvider = CacheProvider;
