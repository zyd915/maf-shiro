"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_ = require("../../util/check_");
const Permission_1 = require("./authz/Permission");
class AbstractAuthorizer {
    constructor(authorizationInfo) {
        if (authorizationInfo) {
            this.authorizationInfo = authorizationInfo;
            this.permissions = this.getPermissions(authorizationInfo);
        }
        else {
            this.authorizationInfo = null;
            this.permissions = null;
        }
    }
    clear() {
        this.authorizationInfo = this.permissions = null;
    }
    ;
    isPermitted(permission) {
        let result;
        if (check_.isArray(permission)) {
            result = [];
            const that = this;
            permission.forEach(function (item) {
                result.push(that.isObjectPermissionPermitted(that.resolvePermission(item)));
            });
        }
        else {
            result = this.isObjectPermissionPermitted(this.resolvePermission(permission));
        }
        return result;
    }
    ;
    isPermittedAll(permissions) {
        return (this.isPermitted(permissions).indexOf(false) === -1);
    }
    ;
    hasRole(role) {
        let hasRole = false;
        if (role) {
            hasRole = (this.authorizationInfo.getRoles().indexOf(role) > -1);
        }
        return hasRole;
    }
    ;
    hasRoles(roles) {
        let result = [], that = this;
        if (roles && check_.isArray(roles)) {
            roles.forEach(function (role) {
                result.push(that.hasRole(role));
            });
        }
        return result;
    }
    ;
    hasAllRoles(roles) {
        return (this.hasRoles(roles).indexOf(false) === -1);
    }
    ;
    getPermissions(authorizationInfo) {
        let permissions = authorizationInfo.getObjectPermissions();
        let stringPermissions = authorizationInfo.getStringPermissions();
        for (let i = 0, len = stringPermissions.length; i < len; i++) {
            permissions.push(new Permission_1.Permission(stringPermissions[i]));
        }
        return permissions;
    }
    ;
    isObjectPermissionPermitted(permission) {
        let permitted = false;
        for (let i = 0, len = this.permissions.length; i < len && !permitted; i++) {
            permitted = this.permissions[i].implies(permission);
        }
        return permitted;
    }
    ;
    resolvePermission(permission) {
        if (permission instanceof Permission_1.Permission) {
            return permission;
        }
        else {
            return new Permission_1.Permission(permission);
        }
    }
    ;
}
exports.AbstractAuthorizer = AbstractAuthorizer;
