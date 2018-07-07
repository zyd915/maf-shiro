"use strict";
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
        let subject = this.getSubject(req, res);
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
    }
}
exports.AuthorizationFilter = AuthorizationFilter;
