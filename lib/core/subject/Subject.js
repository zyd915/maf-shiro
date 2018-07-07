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
            var me = this;
            if (authInfo != null) {
                me.authenticationInfo = authInfo.authc;
                me.authenticated = true;
                yield me.getSession(true);
                if (token.isRememberMe()) {
                    // put the token in session to auto login if needed
                    var session = yield me.getSession(false);
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
            var session = yield this.securityManager.getSession(sessionId);
            if (session !== null && session.getAttribute('token')) {
                var token = new UsernamePasswordToken_1.UsernamePasswordToken();
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
            }
            return this.session;
        });
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
        var result = [], that = this;
        roles = roles || [];
        roles.forEach(function (role) {
            result.push(that.hasRole(role));
        });
        return result;
    }
    hasAllRoles(roles) {
        return this.isAuthenticated() && this.securityManager.hasAllRoles(roles);
    }
    isPermitted(permissions) {
        return this.isAuthenticated() && this.securityManager.isPermitted(permissions);
    }
    isPermittedAll(permissions) {
        return this.isAuthenticated() && this.securityManager.isPermittedAll(permissions);
    }
    clear() {
        this.authenticated = this.remembered = false;
        this.authenticationInfo = null;
        this.securityManager.clear();
    }
}
exports.Subject = Subject;
