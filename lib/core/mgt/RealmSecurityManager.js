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
const Subject_1 = require("../subject/Subject");
const AuthenticatingSecurityManager_1 = require("./AuthenticatingSecurityManager");
const AuthorizingSecurityManager_1 = require("./AuthorizingSecurityManager");
const fs_1 = require("fs");
const SessionManager_1 = require("../session/SessionManager");
class RealmSecurityManager extends SessionManager_1.DefaultSessionManager {
    constructor(realm, sessionDAO, config) {
        super(sessionDAO, config);
        this.realm = realm;
        this.authenticator = new AuthenticatingSecurityManager_1.AuthenticatingSecurityManager(realm);
    }
    // todo
    login(subject, token) {
        return undefined;
    }
    // todo
    logout(subject) {
    }
    // todo
    createSubject(subjectContext) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = new Subject_1.Subject(this);
            subject.renderFromSubjectContext(subjectContext);
            return subject;
        });
    }
    authenticate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let authInfo = yield this.authenticator.authenticate(token);
            if (authInfo) {
                this.authorizer = new AuthorizingSecurityManager_1.AuthorizingSecurityManager(authInfo.authz);
            }
            return authInfo;
        });
    }
    getAuthorizer() {
        return this.authorizer;
    }
    setAuthorizer(authorizer) {
        this.authorizer = authorizer;
    }
    clear() {
        this.authorizer.clear();
    }
    isPermitted(permission) {
        return this.authorizer.isPermitted(permission);
    }
    isPermittedAll(permissions) {
        return this.authorizer.isPermittedAll(fs_1.promises);
    }
    hasRole(role) {
        return this.authorizer.hasRole(role);
    }
    hasRoles(roles) {
        return this.authorizer.hasRoles(roles);
    }
    hasAllRoles(roles) {
        return this.authorizer.hasAllRoles(roles);
    }
    getPermissions(authorizationInfo) {
        return this.authorizer.getPermissions(authorizationInfo);
    }
    isObjectPermissionPermitted(permission) {
        return this.authorizer.isObjectPermissionPermitted(permission);
    }
    resolvePermission(permission) {
        return this.authorizer.resolvePermission(permission);
    }
}
exports.RealmSecurityManager = RealmSecurityManager;
