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
const Subject_1 = require("./core/subject/Subject");
const SubjectDAO_1 = require("./core/subject/SubjectDAO");
class SecurityUtils {
    static getSubject(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            // await SecurityUtils.updateSubject(sessionId);
            let subject = null;
            if (sessionId) {
                subject = yield SecurityUtils.getSubjectDAO().get(sessionId);
            }
            if (subject == null) {
                subject = new Subject_1.Subject(SecurityUtils.getSecurityManager());
            }
            return subject;
        });
    }
    static getSubjectById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionId = req.ctx.cookies.get(Subject_1.Subject.ID_KEY);
            let subject = null;
            if (sessionId) {
                subject = yield SecurityUtils.getSubject(sessionId);
            }
            return subject;
        });
    }
    static saveSubject(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SecurityUtils.getSubjectDAO().save(subject);
        });
    }
    static updateSubject(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!sessionId)
                return;
            let session = yield SecurityUtils.getSecurityManager().getSession(sessionId);
            if (session && (!session.isValid() || session.isTimedOut())) {
                yield SecurityUtils.getSubjectDAO().delete(sessionId);
            }
        });
    }
    static removeSubject(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield SecurityUtils.getSubjectDAO().delete(sessionId);
        });
    }
    static setSecurityManager(securityManager) {
        SecurityUtils.securityManager = securityManager;
    }
    static getSecurityManager() {
        return SecurityUtils.securityManager;
    }
    static setSubjectDAO(subjectDAO) {
        SecurityUtils.subjectDAO = subjectDAO;
    }
    static getSubjectDAO() {
        if (!SecurityUtils.subjectDAO) {
            console.log('没有缓存了。。。。。。。。。');
            SecurityUtils.setSubjectDAO(new SubjectDAO_1.SubjectDAO());
        }
        return SecurityUtils.subjectDAO;
    }
    static getSession(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionId = req.ctx.cookies.get(Subject_1.Subject.ID_KEY);
            return yield this.getSecurityManager().getSession(sessionId);
        });
    }
}
exports.SecurityUtils = SecurityUtils;
