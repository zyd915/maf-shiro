"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccessControlFilter_1 = require("../AccessControlFilter");
class UserFilter extends AccessControlFilter_1.AccessControlFilter {
    isAccessAllowed(req, res, param) {
        if (this.isLoginRequest(req, res)) {
            return true;
        }
        else {
            let subject = this.getSubject(req, res);
            return !!subject && subject.getPrincipal() !== null;
        }
    }
    onAccessDenied(req, res, param) {
        this.redirectToLogin(req, res);
        return false;
    }
}
exports.UserFilter = UserFilter;
