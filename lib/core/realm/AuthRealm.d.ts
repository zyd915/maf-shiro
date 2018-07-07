import { Realm } from './Realm';
import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { CacheRealm } from './CacheRealm';
import { AuthenticationInfo } from '../auth/authc/AuthenticationInfo';
import { AuthInfo } from '../auth/AuthInfo';
import { AuthorizationInfo } from '../auth/authz/AuthorizationInfo';
export declare abstract class AuthRealm extends CacheRealm implements Realm {
    constructor();
    getName(): string;
    supports(token: AuthenticationToken): boolean;
    getAuthInfo(token: AuthenticationToken): Promise<AuthInfo>;
    getAuthenticationInfo(token: AuthenticationToken): Promise<AuthenticationInfo>;
    assertCredentialsMatch(token: AuthenticationToken, info: AuthenticationInfo): void;
    abstract doGetAuthenticationInfo(token: AuthenticationToken): Promise<AuthenticationInfo>;
    getAuthorizationInfo(token: AuthenticationToken): Promise<AuthorizationInfo>;
    abstract doGetAuthorizationInfo(token: AuthenticationToken): Promise<AuthorizationInfo>;
}
