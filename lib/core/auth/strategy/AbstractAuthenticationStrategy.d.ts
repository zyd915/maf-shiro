import { AuthenticationStrategy } from './AuthenticationStrategy';
import { Realm } from '../../realm/Realm';
import { AuthenticationToken } from '../authc/AuthenticationToken';
import { AuthInfo } from '../AuthInfo';
export declare abstract class AbstractAuthenticationStrategy implements AuthenticationStrategy {
    beforeAllAttempts(realms: Realm[], token: AuthenticationToken): AuthInfo;
    beforeAttempt(realm: Realm, token: AuthenticationToken, aggregateInfo: AuthInfo): AuthInfo;
    afterAttempt(realm: Realm, token: AuthenticationToken, singleRealmInfo: AuthInfo, aggregateInfo: AuthInfo, error: Error): AuthInfo;
    afterAllAttempts(token: AuthenticationToken, aggregate: AuthInfo): AuthInfo;
    protected merge(info: AuthInfo, aggregate: AuthInfo): AuthInfo;
}
