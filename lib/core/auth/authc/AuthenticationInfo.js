"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationInfo {
    constructor(principal, credentials) {
        this.principal = principal;
        this.credentials = credentials;
    }
    getPrincipal() {
        return this.principal;
    }
    getCredentials() {
        return this.credentials;
    }
}
exports.AuthenticationInfo = AuthenticationInfo;
