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
class CmfCache {
    constructor(diskCache) {
        this.instanceId = new Date().getTime();
        this.diskCache = diskCache;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.diskCache.get(key);
        });
    }
    put(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.diskCache.reset(key, value);
            return value;
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = yield this.diskCache.get(key);
            yield this.diskCache.del(key);
            return value;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.diskCache.cleancache();
        });
    }
    size() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.diskCache.currentsize;
        });
    }
    keys() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.diskCache.keys();
        });
    }
}
exports.CmfCache = CmfCache;
