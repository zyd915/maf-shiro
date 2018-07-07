import { Permission } from './authz/Permission';
import { AuthorizationInfo } from './authz/AuthorizationInfo';
export interface Authorizer {
    clear(): void;
    isPermitted(permission: any): boolean | boolean[];
    isPermittedAll(permissions: any): boolean;
    hasRole(role: any): boolean;
    hasRoles(roles: any): boolean[];
    hasAllRoles(roles: any): boolean;
    getPermissions(authorizationInfo: AuthorizationInfo): Permission[];
    isObjectPermissionPermitted(permission: any): boolean;
    resolvePermission(permission: string | Permission): Permission;
}
export declare abstract class AbstractAuthorizer implements Authorizer {
    permissions: Permission[];
    authorizationInfo: AuthorizationInfo;
    constructor(authorizationInfo?: AuthorizationInfo);
    clear(): void;
    isPermitted(permission: any): any;
    isPermittedAll(permissions: any): boolean;
    hasRole(role: any): boolean;
    hasRoles(roles: any): any[];
    hasAllRoles(roles: any): boolean;
    getPermissions(authorizationInfo: AuthorizationInfo): any[];
    isObjectPermissionPermitted(permission: any): boolean;
    resolvePermission(permission: string | Permission): Permission;
}
