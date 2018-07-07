export declare class AuthorizationInfo {
    roles: any;
    permissions: any;
    constructor(roles: any, permissions: any);
    getRoles(): any;
    getPermissions(): any;
    getStringPermissions(): any[];
    getObjectPermissions(): any[];
}
