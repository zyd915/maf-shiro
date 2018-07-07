"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const log = log4js.getLogger();
const Authenticator_1 = require("./Authenticator");
const UnsupportedTokenException_1 = require("../exception/UnsupportedTokenException");
const UnknownAccountException_1 = require("../exception/UnknownAccountException");
const AtLeastOneSuccessfulStrategy_1 = require("./strategy/AtLeastOneSuccessfulStrategy");
const AuthenticationException_1 = require("../exception/AuthenticationException");
/**
 * multiple realms authenticate support
 */
class ModularRealmAuthenticator extends Authenticator_1.AbstractAuthenticator {
    constructor(realms) {
        super();
        this.realms = realms;
        this.authenticationStrategy = new AtLeastOneSuccessfulStrategy_1.AtLeastOneSuccessfulStrategy();
    }
    setAuthenticationStrategy(strategy) {
        this.authenticationStrategy = strategy;
    }
    doAuthenticate(token) {
        return this.realms.length == 1 ?
            this.doSingleRealmAuthentication(this.realms[0], token) : this.doMultiRealmAuthentication(this.realms, token);
    }
    doSingleRealmAuthentication(realm, token) {
        if (!realm.supports(token)) {
            let msg = "Realm [" + realm + "] does not support authentication token [" + token + "].  Please ensure that the appropriate Realm implementation is " + "configured correctly or that the realm accepts AuthenticationTokens of this type.";
            throw new UnsupportedTokenException_1.UnsupportedTokenException(msg);
        }
        else {
            let info = realm.getAuthInfo(token);
            if (info == null) {
                let msg = "Realm [" + realm + "] was unable to find account data for the " + "submitted AuthenticationToken [" + token + "].";
                throw new UnknownAccountException_1.UnknownAccountException(msg);
            }
            else {
                return info;
            }
        }
    }
    doMultiRealmAuthentication(realms, token) {
        let aggregate = this.authenticationStrategy.beforeAllAttempts(realms, token);
        for (let realm of realms) {
            aggregate = this.authenticationStrategy.beforeAttempt(realm, token, aggregate);
            if (!realm.supports(token)) {
                log.debug("Realm [{}] does not support token {}.  Skipping realm.", realm, token);
            }
            else {
                log.trace("Attempting to authenticate token [{}] using realm [{}]", token, realm);
                let promise = realm.getAuthInfo(token);
                let info = null;
                let err = null;
                if (promise == null) {
                    let msg = "Realm [" + realm + "] was unable to find account data for the " + "submitted AuthenticationToken [" + token + "].";
                    err = new AuthenticationException_1.AuthenticationException(msg);
                }
                else {
                    promise.then(function (authInfo) {
                        info = authInfo;
                    }, function (err_msg) {
                        err = new AuthenticationException_1.AuthenticationException(err_msg);
                        let msg = "Realm [" + realm + "] threw an exception during a multi-realm authentication attempt:";
                        log.debug(msg, err);
                    });
                }
                aggregate = this.authenticationStrategy.afterAttempt(realm, token, info, aggregate, err);
            }
        }
        aggregate = this.authenticationStrategy.afterAllAttempts(token, aggregate);
        return Promise.resolve(aggregate);
    }
}
exports.ModularRealmAuthenticator = ModularRealmAuthenticator;
