export declare class AuthenticationInfo {
    principal: any;
    credentials: any;
    constructor(principal: any, credentials: any);
    getPrincipal(): object | string;
    getCredentials(): object | string;
}
