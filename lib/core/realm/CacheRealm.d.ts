import { AuthenticationInfo } from '../auth/authc/AuthenticationInfo';
import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { AuthorizationInfo } from '../auth/authz/AuthorizationInfo';
export declare abstract class CacheRealm {
    getCachedAuthenticationInfo(token: AuthenticationToken): Promise<AuthenticationInfo>;
    cacheAuthenticationInfoIfPossible(token: AuthenticationToken, info: AuthenticationInfo): void;
    getCachedAuthorizationInfo(token: AuthenticationToken): Promise<AuthorizationInfo>;
    cacheAuthorizationInfoIfPossible(token: AuthenticationToken, info: AuthorizationInfo): void;
}
