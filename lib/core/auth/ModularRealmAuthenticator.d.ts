import { AbstractAuthenticator } from './Authenticator';
import { AuthenticationToken } from './authc/AuthenticationToken';
import { AuthInfo } from './AuthInfo';
import { Realm } from '../realm/Realm';
import { AuthenticationStrategy } from './strategy/AuthenticationStrategy';
/**
 * multiple realms authenticate support
 */
export declare class ModularRealmAuthenticator extends AbstractAuthenticator {
    authenticationStrategy: AuthenticationStrategy;
    realms: Realm[];
    constructor(realms: Realm[]);
    setAuthenticationStrategy(strategy: AuthenticationStrategy): void;
    doAuthenticate(token: AuthenticationToken): Promise<AuthInfo>;
    doSingleRealmAuthentication(realm: Realm, token: AuthenticationToken): Promise<AuthInfo>;
    doMultiRealmAuthentication(realms: Realm[], token: AuthenticationToken): Promise<AuthInfo>;
}
