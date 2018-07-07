"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_ = require("../../../util/check_");
const Permission_1 = require("./Permission");
class AuthorizationInfo {
    constructor(roles, permissions) {
        this.roles = check_.isArray(roles) ? roles : [];
        this.permissions = check_.isArray(permissions) ? permissions : [];
    }
    getRoles() {
        return this.roles;
    }
    ;
    getPermissions() {
        return this.permissions;
    }
    ;
    getStringPermissions() {
        let permissions = [];
        for (let i = 0, len = this.permissions.length; i < len; i++) {
            let p = this.permissions[i];
            if (check_.isString(p)) {
                permissions.push(p);
            }
        }
        return permissions;
    }
    ;
    getObjectPermissions() {
        let permissions = [];
        for (let i = 0, len = this.permissions.length; i < len; i++) {
            let p = this.permissions[i];
            if (p instanceof Permission_1.Permission) {
                permissions.push(p);
            }
        }
        return permissions;
    }
    ;
}
exports.AuthorizationInfo = AuthorizationInfo;
