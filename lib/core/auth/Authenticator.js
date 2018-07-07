"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const log = log4js.getLogger();
const AuthenticationException_1 = require("../exception/AuthenticationException");
const IllegalArgumentException_1 = require("../exception/IllegalArgumentException");
class AbstractAuthenticator {
    authenticate(token) {
        if (token == null) {
            throw new IllegalArgumentException_1.IllegalArgumentException("Method argumet (authentication token) cannot be null.");
        }
        else {
            log.trace("Authentication attempt received for token [{}]", token);
            let info;
            try {
                info = this.doAuthenticate(token);
                if (info == null) {
                    let msg = "No account information found for authentication token [" + token + "] by this " + "Authenticator instance.  Please check that it is configured correctly.";
                    throw new AuthenticationException_1.AuthenticationException(msg);
                }
            }
            catch (error) {
                let ae = null;
                if (error instanceof AuthenticationException_1.AuthenticationException) {
                    ae = error;
                }
                if (ae == null) {
                    let msg = "Authentication failed for token submission [" + token + "].  Possible unexpected " + "error? (Typical or expected login exceptions should extend from AuthenticationException).";
                    ae = new AuthenticationException_1.AuthenticationException(msg, error);
                }
                throw ae;
            }
            log.debug("Authentication successful for token [{}].  Returned account [{}]", token, info);
            return info;
        }
        return null;
    }
}
exports.AbstractAuthenticator = AbstractAuthenticator;
