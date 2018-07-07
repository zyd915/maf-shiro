"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationFilter_1 = require("./AuthorizationFilter");
class RolesAuthorizationFilter extends AuthorizationFilter_1.AuthorizationFilter {
    isAccessAllowed(req, res, roles) {
        let subject = this.getSubject(req, res);
        if (roles == null || roles.length == 0) {
            //no roles specified, so nothing to check - allow access.
            return true;
        }
        return subject.hasAllRoles(roles);
    }
}
exports.RolesAuthorizationFilter = RolesAuthorizationFilter;
