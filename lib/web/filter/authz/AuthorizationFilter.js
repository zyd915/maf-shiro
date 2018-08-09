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
const AccessControlFilter_1 = require("../AccessControlFilter");
class AuthorizationFilter extends AccessControlFilter_1.AccessControlFilter {
    constructor() {
        super();
        this.unauthorizedUrl = null;
    }
    setUnauthorizedUrl(unauthorizedUrl) {
        this.unauthorizedUrl = unauthorizedUrl;
    }
    getUnauthorizedUrl() {
        return this.unauthorizedUrl;
    }
    onAccessDenied(req, res, param) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield this.getSubject(req, res);
            // If the subject isn't identified, redirect to login URL
            if (subject.getPrincipal() == null) {
                this.redirectToLogin(req, res);
            }
            else {
                // If subject is known but not authorized, redirect to the unauthorized URL if there is one
                // If no unauthorized URL is specified, just return an unauthorized HTTP status code
                if (!!this.getUnauthorizedUrl()) {
                    this.redirect(req, res, this.getUnauthorizedUrl());
                }
                else {
                    // todo
                }
            }
            return false;
        });
    }
}
exports.AuthorizationFilter = AuthorizationFilter;
