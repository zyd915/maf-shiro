import { AbstractAuthorizer } from '../auth/Authorizer';
import { AuthorizationInfo } from '../auth/authz/AuthorizationInfo';
export declare class AuthorizingSecurityManager extends AbstractAuthorizer {
    constructor(authorizationInfo: AuthorizationInfo);
}
