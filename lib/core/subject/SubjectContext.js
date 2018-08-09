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
const AuthenticationInfo_1 = require("../auth/authc/AuthenticationInfo");
const AuthorizationInfo_1 = require("../auth/authz/AuthorizationInfo");
const SecurityUtils_1 = require("../../SecurityUtils");
const UsernamePasswordToken_1 = require("../auth/authc/UsernamePasswordToken");
const RealmSecurityManager_1 = require("../mgt/RealmSecurityManager");
const AuthorizingSecurityManager_1 = require("../mgt/AuthorizingSecurityManager");
class SubjectContext {
    constructor(session, authenticated, remembered, securityManager, authenticationInfo, authorizationInfo) {
        this.session = session;
        this.sessionId = session ? session.getId() : null;
        this.host = session ? session.getHost() : null;
        this.authenticated = authenticated;
        this.remembered = remembered;
        this.securityManager = securityManager;
        this.authenticationInfo = authenticationInfo;
        this.authorizationInfo = authorizationInfo;
    }
    getSecurityManager() {
        return this.securityManager;
    }
    setSecurityManager(securityManager) {
        this.securityManager = securityManager;
    }
    resolveSecurityManager() {
        let securityManger = this.getSecurityManager();
        if (!securityManger) {
            securityManger = SecurityUtils_1.SecurityUtils.getSecurityManager();
        }
        return securityManger;
    }
    getSessionId() {
        return this.sessionId;
    }
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    resolveSession() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getSecurityManager().getSession(this.sessionId);
        });
    }
    getHost() {
        return this.host;
    }
    setHost(host) {
        this.host = host;
    }
    getAuthenticationInfo() {
        return this.authenticationInfo;
    }
    setAuthenticationInfo(authenticationInfo) {
        this.authenticationInfo = authenticationInfo;
    }
    getAuthenticated() {
        return this.authenticated;
    }
    setAuthenticated(authenticated) {
        this.authenticated = authenticated;
    }
    resolveAuthenticated() {
        let authc = this.authenticated;
        if (!authc) {
            authc = (this.getAuthenticationInfo() != null);
        }
        return authc;
    }
    getRemembered() {
        return this.remembered;
    }
    setRemembered(remembered) {
        this.remembered = remembered;
    }
    fromJsonObj({ sessionId, authenticated, host, remembered, principal, credentials, roles, permissions }) {
        this.sessionId = sessionId;
        this.authenticated = authenticated;
        this.host = host;
        this.remembered = remembered;
        this.authenticationInfo = new AuthenticationInfo_1.AuthenticationInfo(principal, credentials);
        this.authorizationInfo = new AuthorizationInfo_1.AuthorizationInfo(roles, permissions);
        this.authenticationToken = new UsernamePasswordToken_1.UsernamePasswordToken(principal, credentials, host, remembered);
        this.securityManager = this.resolveSecurityManager();
        if (this.securityManager instanceof RealmSecurityManager_1.RealmSecurityManager) {
            this.securityManager.setAuthorizer(new AuthorizingSecurityManager_1.AuthorizingSecurityManager(this.authorizationInfo));
        }
    }
    toJsonObj() {
        let sessionId = this.sessionId, authenticated = this.authenticated, host = this.host, remembered = this.remembered, principal = this.authenticationInfo ? this.authenticationInfo.getPrincipal() : null, credentials = this.authenticationInfo ? this.authenticationInfo.getCredentials() : null, roles = this.authorizationInfo ? this.authorizationInfo.getRoles() : null, permissions = this.authorizationInfo ? this.authorizationInfo.getStringPermissions() : null;
        return { sessionId, authenticated, host, remembered, principal, credentials, roles, permissions };
    }
}
exports.SubjectContext = SubjectContext;
