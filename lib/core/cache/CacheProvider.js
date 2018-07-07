"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CmfCacheManager_1 = require("./impl/cache-manager-fs/CmfCacheManager");
class CacheProvider {
    static getCache(type) {
        let cache = null;
        if (type) {
        }
        else {
            let cacheManager = new CmfCacheManager_1.CmfCacheManager();
            cacheManager.init();
            cache = cacheManager.getCache();
        }
        return cache;
    }
}
exports.CacheProvider = CacheProvider;
