"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationFilter_1 = require("./AuthorizationFilter");
class PermissionsAuthorizationFilter extends AuthorizationFilter_1.AuthorizationFilter {
    isAccessAllowed(req, res, perms) {
        let subject = this.getSubject(req, res);
        let isPermitted = true;
        if (perms != null && perms.length > 0) {
            if (perms.length == 1) {
                if (!subject.isPermitted(perms[0])) {
                    isPermitted = false;
                }
            }
            else {
                if (!subject.isPermittedAll(perms)) {
                    isPermitted = false;
                }
            }
        }
        return isPermitted;
    }
}
exports.PermissionsAuthorizationFilter = PermissionsAuthorizationFilter;
