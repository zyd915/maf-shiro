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
const PermissionsAuthorizationFilter_1 = require("./PermissionsAuthorizationFilter");
const Action = {
    CREATE_ACTION: 'create',
    READ_ACTION: 'read',
    UPDATE_ACTION: 'update',
    DELETE_ACTION: 'delete'
};
const HttpMethodAction = {
    DELETE: Action.DELETE_ACTION,
    GET: Action.READ_ACTION,
    HEAD: Action.READ_ACTION,
    MKCOL: Action.CREATE_ACTION,
    OPTIONS: Action.READ_ACTION,
    POST: Action.CREATE_ACTION,
    PUT: Action.UPDATE_ACTION,
    TRACE: Action.READ_ACTION,
};
class HttpMethodPermissionFilter extends PermissionsAuthorizationFilter_1.PermissionsAuthorizationFilter {
    constructor() {
        super();
        this.httpMethodActions = new Map();
        for (let action in HttpMethodAction) {
            this.httpMethodActions.set(action.toLocaleLowerCase(), HttpMethodAction[action]);
        }
    }
    getHttpMethodActions() {
        return this.httpMethodActions;
    }
    getHttpMethodAction(method) {
        method = method.toLocaleLowerCase();
        let resolved = this.getHttpMethodActions().get(method);
        return resolved != null ? resolved : method;
    }
    buildPermissions(configuredPerms, action) {
        if (configuredPerms == null || configuredPerms.length <= 0) {
            return configuredPerms;
        }
        let mappedPerms = [];
        // loop and append :action
        for (let perm of configuredPerms.values()) {
            mappedPerms.push(perm + ":" + action);
        }
        return mappedPerms;
    }
    isAccessAllowed(req, res, perms) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let method = req.method;
            let action = this.getHttpMethodAction(method);
            let resolvedPerms = this.buildPermissions(perms, action);
            return yield _super("isAccessAllowed").call(this, req, res, resolvedPerms);
        });
    }
}
exports.HttpMethodPermissionFilter = HttpMethodPermissionFilter;
