"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationFilter_1 = require("./AuthenticationFilter");
class FormAuthenticationFilter extends AuthenticationFilter_1.AuthenticationFilter {
    onExecute(req, res, param) {
        return this.isAccessAllowed(req, res, param) || this.onAccessDenied(req, res, param);
    }
    onAccessDenied(req, res, param) {
        this.redirectToLogin(req, res);
        return false;
    }
}
exports.FormAuthenticationFilter = FormAuthenticationFilter;
