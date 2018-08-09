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
const SessionDAO_1 = require("./SessionDAO");
class DefaultSessionManager {
    constructor(sessionDAO, config) {
        this.sessionDAO = sessionDAO || new SessionDAO_1.SessionDAO(config);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let session = new Session_1.Session();
            yield this.sessionDAO.create(session);
            return session;
        });
    }
    ;
    getSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = yield this.sessionDAO.readSession(sessionId);
            if (session) {
                try {
                    session.validate();
                }
                catch (e) {
                    console.log(e);
                    return null;
                }
            }
            if (session && session.isExpired()) {
                yield this.sessionDAO.delete(session);
            }
            return session;
        });
    }
    ;
    update(session) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sessionDAO.update(session);
        });
    }
    ;
}
exports.DefaultSessionManager = DefaultSessionManager;
