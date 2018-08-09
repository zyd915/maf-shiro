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
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield this.getSubject(req, res);
            if (subject == null)
                return false;
            return this.isSessionaVailable(subject.session) && subject.isAuthenticated();
        });
    }
    onAccessDenied(req, res, param) {
        return __awaiter(this, void 0, void 0, function* () {
            return false;
        });
    }
    issueSuccessRedirect(req, res) {
        res.redirect(this.getSuccessUrl());
    }
}
AuthenticationFilter.DEFAULT_SUCCESS_URL = "/";
exports.AuthenticationFilter = AuthenticationFilter;
