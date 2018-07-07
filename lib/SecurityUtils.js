"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("./core/subject/Subject");
class SecurityUtils {
    static getSubject(subjectId) {
        SecurityUtils.updateSubject();
        let subject = null;
        if (subjectId) {
            subject = SecurityUtils.subjectMap.get(subjectId);
        }
        if (subject == null) {
            subject = new Subject_1.Subject(SecurityUtils.getSecurityManager());
        }
        return subject;
    }
    static getSubjectById(req) {
        let subjectId = req.ctx.cookies.get('subjectId');
        if (subjectId) {
            return SecurityUtils.getSubject(subjectId);
        }
        return null;
    }
    static addSubject(subjectId, subject) {
        SecurityUtils.subjectMap.set(subjectId, subject);
    }
    static updateSubject() {
        let deleteItems = [];
        SecurityUtils.subjectMap.forEach(function (subject, subjectId) {
            let session = subject.session;
            if (!session.isValid() || session.isTimedOut()) {
                deleteItems.push(subjectId);
            }
        });
        deleteItems.forEach(function (subjectId) {
            SecurityUtils.subjectMap.delete(subjectId);
        });
    }
    static removeSubject(subjectId) {
        SecurityUtils.subjectMap.delete(subjectId);
    }
    static setSecurityManager(securityManager) {
        SecurityUtils.securityManager = securityManager;
    }
    static getSecurityManager() {
        return SecurityUtils.securityManager;
    }
}
SecurityUtils.subjectMap = new Map();
exports.SecurityUtils = SecurityUtils;
