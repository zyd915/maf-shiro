"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticatedTag_1 = require("./AuthenticatedTag");
const NotAuthenticatedTag_1 = require("./NotAuthenticatedTag");
const HasRoleTag_1 = require("./HasRoleTag");
const HasAnyRolesTag_1 = require("./HasAnyRolesTag");
const HasPermissionTag_1 = require("./HasPermissionTag");
const LacksRoleTag_1 = require("./LacksRoleTag");
const LacksPermissionTag_1 = require("./LacksPermissionTag");
const GuestTag_1 = require("./GuestTag");
const UserTag_1 = require("./UserTag");
const PrincipalTag_1 = require("./PrincipalTag");
const tags = {
    authenticated: AuthenticatedTag_1.AuthenticatedTag,
    notAuthenticated: NotAuthenticatedTag_1.NotAuthenticatedTag,
    hasRole: HasRoleTag_1.HasRoleTag,
    hasAnyRoles: HasAnyRolesTag_1.HasAnyRolesTag,
    hasPermission: HasPermissionTag_1.HasPermissionTag,
    lacksRole: LacksRoleTag_1.LacksRoleTag,
    lacksPermission: LacksPermissionTag_1.LacksPermissionTag,
    guest: GuestTag_1.GuestTag,
    user: UserTag_1.UserTag,
    principal: PrincipalTag_1.PrincipalTag,
};
class InitShiroTags {
    constructor(env, nunjucks, config) {
        this.env = env;
        this.nunjucks = nunjucks;
        this.config = config;
    }
    init() {
        if (!this.env)
            return;
        for (let key in tags) {
            this.env.addExtension(key, new tags[key](this.config));
        }
    }
}
exports.InitShiroTags = InitShiroTags;
