"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathMatcherFilter_1 = require("./PathMatcherFilter");
const SecurityUtils_1 = require("../../SecurityUtils");
class AccessControlFilter extends PathMatcherFilter_1.PathMatcherFilter {
    constructor() {
        super();
        this.loginUrl = AccessControlFilter.DEFAULT_LOGIN_URL;
    }
    onExecute(req, res, param) {
        return this.isAccessAllowed(req, res, param) || this.onAccessDenied(req, res, param);
    }
    getLoginUrl() {
        return this.loginUrl;
    }
    setLoginUrl(loginUrl) {
        this.loginUrl = loginUrl;
    }
    getSubject(req, res) {
        return SecurityUtils_1.SecurityUtils.getSubjectById(req);
    }
    isLoginRequest(req, res) {
        return this.pathsMatch(this.getLoginUrl(), req.url);
    }
    redirectToLogin(req, res) {
        res.redirect(this.getLoginUrl());
    }
    redirect(req, res, url) {
        res.redirect(url);
    }
}
AccessControlFilter.DEFAULT_LOGIN_URL = "/login";
AccessControlFilter.GET_METHOD = "GET";
AccessControlFilter.POST_METHOD = "POST";
exports.AccessControlFilter = AccessControlFilter;
