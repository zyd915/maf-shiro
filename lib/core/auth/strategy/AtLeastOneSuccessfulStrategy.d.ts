import { AbstractAuthenticationStrategy } from './AbstractAuthenticationStrategy';
import { AuthenticationToken } from '../authc/AuthenticationToken';
import { AuthInfo } from '../AuthInfo';
export declare class AtLeastOneSuccessfulStrategy extends AbstractAuthenticationStrategy {
    afterAllAttempts(token: AuthenticationToken, aggregate: AuthInfo): AuthInfo;
}
