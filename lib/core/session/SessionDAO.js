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
const Session_1 = require("./Session");
const json_1 = require("../../util/json_");
const CacheProvider_1 = require("../cache/CacheProvider");
const guid = function () {
    return __awaiter(this, void 0, void 0, function* () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return yield (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
    });
};
class SessionDAO {
    constructor(cache, config) {
        if (!!config && config.timeout) {
            this.timeout = config.timeout;
        }
        this.cache = cache || CacheProvider_1.CacheProvider.getCache('redis', config);
    }
    create(session) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionId = yield guid();
            session.setId(sessionId);
            if (this.timeout) {
                session.setTimeout(this.timeout);
            }
            yield this.cache.put(sessionId, json_1.toJson(session));
            return sessionId;
        });
    }
    ;
    readSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = null;
            let obj = json_1.fromJson(yield this.cache.get(sessionId));
            if (obj) {
                session = new Session_1.Session();
                Object.assign(session, obj);
            }
            return session;
        });
    }
    ;
    update(session) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cache.put(session.getId(), json_1.toJson(session));
        });
    }
    ;
    delete(session) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cache.remove(session.getId());
        });
    }
    ;
}
exports.SessionDAO = SessionDAO;
