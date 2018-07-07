import { AuthenticationInfo } from './authc/AuthenticationInfo';
import { AuthorizationInfo } from './authz/AuthorizationInfo';
export declare class AuthInfo {
    authc: AuthenticationInfo;
    authz: AuthorizationInfo;
    constructor(authc?: any, authz?: any);
}
