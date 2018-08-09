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
const log4js = require("log4js");
const log = log4js.getLogger();
const UsernamePasswordToken_1 = require("../auth/authc/UsernamePasswordToken");
const CacheRealm_1 = require("./CacheRealm");
const AuthInfo_1 = require("../auth/AuthInfo");
class AuthRealm extends CacheRealm_1.CacheRealm {
    constructor() {
        super();
    }
    getName() {
        return this.constructor.name;
    }
    supports(token) {
        return token != null && token instanceof UsernamePasswordToken_1.UsernamePasswordToken;
    }
    getAuthInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let authc = null, authz = null;
            try {
                authc = yield this.getAuthenticationInfo(token);
            }
            catch (e) {
                throw e;
            }
            try {
                authz = yield this.getAuthorizationInfo(token);
            }
            catch (e) {
                throw e;
            }
            return new AuthInfo_1.AuthInfo(authc, authz);
        });
    }
    getAuthenticationInfo(token) {
        let promise = this.getCachedAuthenticationInfo(token);
        let _this = this;
        if (promise == null) {
            promise = this.doGetAuthenticationInfo(token);
            promise.then(function (authenticationInfo) {
                log.debug("Looked up AuthenticationInfo [{}] from doGetAuthenticationInfo", authenticationInfo);
                if (token != null && authenticationInfo != null) {
                    _this.cacheAuthenticationInfoIfPossible(token, authenticationInfo);
                }
                else {
                    log.debug("Using cached authentication info [{}] to perform credentials matching.", authenticationInfo);
                }
                if (authenticationInfo != null) {
                    _this.assertCredentialsMatch(token, authenticationInfo);
                    return Promise.resolve(authenticationInfo);
                }
                else {
                    log.debug("No AuthenticationInfo found for submitted AuthenticationToken [{}].  Returning null.", token);
                    return Promise.reject('No AuthenticationInfo found for submitted AuthenticationToken');
                }
            }, function (data) {
                return Promise.reject('get AuthenticationInfo error');
            });
        }
        return promise;
    }
    assertCredentialsMatch(token, info) { }
    getAuthorizationInfo(token) {
        let promise = this.getCachedAuthorizationInfo(token);
        let _this = this;
        if (promise == null) {
            promise = this.doGetAuthorizationInfo(token);
            promise.then(function (authorizationInfo) {
                log.debug("Looked up AuthorizationInfo [{}] from doGetAuthorizationInfo", authorizationInfo);
                if (token != null && authorizationInfo != null) {
                    _this.cacheAuthorizationInfoIfPossible(token, authorizationInfo);
                }
                else {
                    log.debug("Using cached authorizationInfo info [{}] to perform credentials matching.", authorizationInfo);
                }
                if (authorizationInfo != null) {
                    return Promise.resolve(authorizationInfo);
                }
                else {
                    log.debug("No AuthorizationInfo found for submitted AuthenticationToken [{}].  Returning null.", token);
                    return Promise.reject('No AuthorizationInfo found for submitted AuthenticationToken');
                }
            }, function (data) {
                return Promise.reject('get AuthorizationInfo error');
            });
        }
        return promise;
    }
}
exports.AuthRealm = AuthRealm;
