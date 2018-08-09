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
const check_ = require("../../util/check_");
const UsernamePasswordToken_1 = require("../auth/authc/UsernamePasswordToken");
const SubjectContext_1 = require("./SubjectContext");
const RealmSecurityManager_1 = require("../mgt/RealmSecurityManager");
const Authorizer_1 = require("../auth/Authorizer");
class Subject {
    constructor(securityManager, authenticated, session, authenticationInfo) {
        this.securityManager = securityManager;
        this.authenticated = authenticated || false;
        this.remembered = false;
        this.session = session || null;
        this.authenticationInfo = authenticationInfo || null;
    }
    login(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let authInfo = yield this.securityManager.authenticate(token);
            let me = this;
            if (authInfo != null && authInfo.authc) {
                me.authenticationInfo = authInfo.authc;
                me.authenticated = true;
                yield me.getSession(true);
                if (token.isRememberMe()) {
                    // put the token in session to auto login if needed
                    let session = yield me.getSession(false);
                    session.setAttribute('token', token);
                    yield me.securityManager.update(session);
                    me.remembered = true;
                }
                token.clear();
            }
            else {
                me.clear();
            }
            return authInfo;
        });
    }
    rememberMe(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = false;
            let session = yield this.securityManager.getSession(sessionId);
            if (session !== null && session.getAttribute('token')) {
                let token = new UsernamePasswordToken_1.UsernamePasswordToken();
                token.deserialize(session.getAttribute('token'));
                // auto login to reload authorization infos
                output = this.login(token);
            }
            return output;
        });
    }
    logout() {
        this.clear();
    }
    getSession(create = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.session === null && create) {
                this.session = yield this.securityManager.start();
                this.sessionId = this.session.getId();
            }
            return this.session;
        });
    }
    setSession(session) {
        this.session = session;
    }
    getPrincipal() {
        let principal = null;
        if (check_.isDefined(this.authenticationInfo) && check_.isObject(this.authenticationInfo)) {
            principal = this.authenticationInfo.getPrincipal();
        }
        return principal;
    }
    isAuthenticated() {
        return this.authenticated;
    }
    isRemembered() {
        return this.remembered;
    }
    hasRole(role) {
        return this.isAuthenticated() && this.securityManager.hasRole(role);
    }
    hasRoles(roles) {
        if (this.isAuthenticated()) {
            return this.securityManager.hasRoles(roles);
            ;
        }
        let len = roles.length || 0;
        return Array.from({ length: len }, () => false);
    }
    hasAllRoles(roles) {
        return this.isAuthenticated() && this.securityManager.hasAllRoles(roles);
    }
    isPermitted(permission) {
        return this.isAuthenticated() && this.securityManager.isPermitted(permission);
    }
    isPermitteds(permissions) {
        if (this.isAuthenticated()) {
            return this.securityManager.isPermitted(permissions);
        }
        let len = permissions.length || 0;
        return Array.from({ length: len }, () => false);
    }
    isPermittedAll(permissions) {
        return this.isAuthenticated() && this.securityManager.isPermittedAll(permissions);
    }
    clear() {
        this.authenticated = this.remembered = false;
        this.authenticationInfo = null;
        this.securityManager.clear();
    }
    toSubjectContext() {
        let authorizationInfo = null;
        if (this.securityManager instanceof RealmSecurityManager_1.RealmSecurityManager) {
            let authorizer = this.securityManager.getAuthorizer();
            if (authorizer instanceof Authorizer_1.AbstractAuthorizer) {
                authorizationInfo = authorizer.authorizationInfo;
            }
        }
        return new SubjectContext_1.SubjectContext(this.session, this.authenticated, this.remembered, this.securityManager, this.authenticationInfo, authorizationInfo);
    }
    renderFromSubjectContext(subjectContext) {
        this.sessionId = subjectContext.sessionId;
        this.authenticated = subjectContext.authenticated;
        this.remembered = subjectContext.remembered;
        this.authenticationInfo = subjectContext.authenticationInfo;
        this.securityManager = subjectContext.securityManager;
    }
}
Subject.ID_KEY = 'sessionId';
exports.Subject = Subject;
