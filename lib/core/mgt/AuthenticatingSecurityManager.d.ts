import { AbstractAuthenticator } from '../auth/Authenticator';
import { Realm } from '../realm/Realm';
import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { AuthInfo } from '../auth/AuthInfo';
export declare class AuthenticatingSecurityManager extends AbstractAuthenticator {
    realm: Realm;
    constructor(realm: Realm);
    doAuthenticate(token: AuthenticationToken): Promise<AuthInfo>;
}
