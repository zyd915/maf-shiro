import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { AuthInfo } from '../auth/AuthInfo';
import { AuthenticatingRealm } from './AuthenticatingRealm';
import { AuthorizingRealm } from './AuthorizingRealm';
export interface Realm extends AuthenticatingRealm, AuthorizingRealm {
    getName(): string;
    supports(token: AuthenticationToken): boolean;
    getAuthInfo(token: AuthenticationToken): Promise<AuthInfo>;
}
