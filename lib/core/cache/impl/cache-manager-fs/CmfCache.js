"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CmfCache {
    constructor(diskCache) {
        this.diskCache = diskCache;
    }
    get(key) {
        return this.diskCache.get(key);
    }
    put(key, value) {
        this.diskCache.reset(key, value);
        return value;
    }
    remove(key) {
        let value = this.diskCache.get(key);
        this.diskCache.del(key);
        return value;
    }
    clear() {
        this.diskCache.cleancache();
    }
    size() {
        return this.diskCache.currentsize;
    }
    keys() {
        return this.diskCache.keys();
    }
    values() {
        return Object.values(this.diskCache.collection);
    }
}
exports.CmfCache = CmfCache;
