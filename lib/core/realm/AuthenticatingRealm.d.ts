import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { AuthenticationInfo } from '../auth/authc/AuthenticationInfo';
export interface AuthenticatingRealm {
    getAuthenticationInfo(token: AuthenticationToken): Promise<AuthenticationInfo>;
    assertCredentialsMatch(token: AuthenticationToken, info: AuthenticationInfo): any;
}
