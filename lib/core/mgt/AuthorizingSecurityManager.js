"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authorizer_1 = require("../auth/Authorizer");
class AuthorizingSecurityManager extends Authorizer_1.AbstractAuthorizer {
    constructor(authorizationInfo) {
        super(authorizationInfo);
    }
}
exports.AuthorizingSecurityManager = AuthorizingSecurityManager;
