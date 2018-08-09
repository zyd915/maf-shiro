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
const PathMatcherFilter_1 = require("./PathMatcherFilter");
const SecurityUtils_1 = require("../../SecurityUtils");
class AccessControlFilter extends PathMatcherFilter_1.PathMatcherFilter {
    constructor() {
        super();
        this.loginUrl = AccessControlFilter.DEFAULT_LOGIN_URL;
    }
    onExecute(req, res, param) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.isAccessAllowed(req, res, param)) || (yield this.onAccessDenied(req, res, param));
        });
    }
    getLoginUrl() {
        return this.loginUrl;
    }
    setLoginUrl(loginUrl) {
        this.loginUrl = loginUrl;
    }
    getSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield SecurityUtils_1.SecurityUtils.getSubjectById(req);
            return subject;
        });
    }
    isSessionaVailable(session) {
        if (session) {
            return !session.isExpired();
        }
        return false;
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
