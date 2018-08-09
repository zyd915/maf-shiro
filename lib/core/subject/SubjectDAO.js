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
const SecurityUtils_1 = require("../../SecurityUtils");
const json_1 = require("../../util/json_");
const SubjectContext_1 = require("./SubjectContext");
class SubjectDAO {
    constructor(securityManager) {
        this.securityManager = securityManager || SecurityUtils_1.SecurityUtils.securityManager;
    }
    save(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionId = subject.sessionId;
            let subjectContext = subject.toSubjectContext();
            let session = yield this.securityManager.getSession(sessionId);
            if (session) {
                session.setAttribute(SubjectDAO.SUBJECT_SESSION_KEY, json_1.toJson(subjectContext.toJsonObj()));
                yield this.securityManager.update(session);
            }
        });
    }
    get(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = null;
            let session = yield this.securityManager.getSession(sessionId);
            if (session) {
                let jsonObj = json_1.fromJson(yield session.getAttribute(SubjectDAO.SUBJECT_SESSION_KEY));
                if (jsonObj) {
                    let subjectContext = new SubjectContext_1.SubjectContext();
                    yield subjectContext.fromJsonObj(jsonObj);
                    subject = yield this.securityManager.createSubject(subjectContext);
                    subject.setSession(session);
                }
            }
            return subject;
        });
    }
    delete(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = yield this.securityManager.getSession(sessionId);
            if (session) {
                yield session.removeAttribute(SubjectDAO.SUBJECT_SESSION_KEY);
            }
        });
    }
}
SubjectDAO.SUBJECT_SESSION_KEY = 'SUBJECT';
exports.SubjectDAO = SubjectDAO;
