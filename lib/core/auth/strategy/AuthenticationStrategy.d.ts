import { Realm } from '../../realm/Realm';
import { AuthenticationToken } from '../authc/AuthenticationToken';
import { AuthInfo } from '../AuthInfo';
export interface AuthenticationStrategy {
    beforeAllAttempts(realms: Realm[], token: AuthenticationToken): AuthInfo;
    beforeAttempt(realm: Realm, token: AuthenticationToken, authInfo: AuthInfo): AuthInfo;
    afterAttempt(realm: Realm, token: AuthenticationToken, authInfo1: AuthInfo, authInfo2: AuthInfo, error: Error): AuthInfo;
    afterAllAttempts(token: AuthenticationToken, authInfo: AuthInfo): AuthInfo;
}
