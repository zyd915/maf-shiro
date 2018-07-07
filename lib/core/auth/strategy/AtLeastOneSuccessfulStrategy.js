"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractAuthenticationStrategy_1 = require("./AbstractAuthenticationStrategy");
const AuthenticationException_1 = require("../../exception/AuthenticationException");
class AtLeastOneSuccessfulStrategy extends AbstractAuthenticationStrategy_1.AbstractAuthenticationStrategy {
    afterAllAttempts(token, aggregate) {
        if (aggregate != null && aggregate.authc != null && aggregate.authc.getPrincipal()) {
            return aggregate;
        }
        else {
            throw new AuthenticationException_1.AuthenticationException("Authentication token of type [" + token.constructor.name + "] " + "could not be authenticated by any configured realms.  Please ensure that at least one realm can " + "authenticate these tokens.");
        }
    }
}
exports.AtLeastOneSuccessfulStrategy = AtLeastOneSuccessfulStrategy;
