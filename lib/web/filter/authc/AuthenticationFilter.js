"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControlFilter_1 = require("../AccessControlFilter");
class AuthenticationFilter extends AccessControlFilter_1.AccessControlFilter {
    constructor() {
        super();
        this.successUrl = AuthenticationFilter.DEFAULT_SUCCESS_URL;
    }
    setSuccessUrl(successUrl) {
        this.successUrl = successUrl;
    }
    getSuccessUrl() {
        return this.successUrl;
    }
    isAccessAllowed(req, res, param) {
        let subject = this.getSubject(req, res);
        if (subject == null)
            return false;
        return subject.isAuthenticated();
    }
    onAccessDenied(req, res, param) {
        return false;
    }
    issueSuccessRedirect(req, res) {
        res.redirect(this.getSuccessUrl());
    }
}
AuthenticationFilter.DEFAULT_SUCCESS_URL = "/";
exports.AuthenticationFilter = AuthenticationFilter;
