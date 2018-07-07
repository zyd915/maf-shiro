"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authenticator_1 = require("../auth/Authenticator");
class AuthenticatingSecurityManager extends Authenticator_1.AbstractAuthenticator {
    constructor(realm) {
        super();
        this.realm = realm;
    }
    doAuthenticate(token) {
        return this.realm.getAuthInfo(token);
    }
}
exports.AuthenticatingSecurityManager = AuthenticatingSecurityManager;
