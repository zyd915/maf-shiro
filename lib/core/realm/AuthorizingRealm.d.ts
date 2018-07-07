import { AuthorizationInfo } from '../auth/authz/AuthorizationInfo';
import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
export interface AuthorizingRealm {
    getAuthorizationInfo(token: AuthenticationToken): Promise<AuthorizationInfo>;
}
