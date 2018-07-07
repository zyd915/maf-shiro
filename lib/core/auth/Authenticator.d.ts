import { AuthenticationToken } from "./authc/AuthenticationToken";
import { AuthInfo } from './AuthInfo';
export interface Authenticator {
    authenticate(token: AuthenticationToken): Promise<AuthInfo>;
}
export declare abstract class AbstractAuthenticator implements Authenticator {
    authenticate(token: AuthenticationToken): Promise<AuthInfo>;
    abstract doAuthenticate(token: AuthenticationToken): Promise<AuthInfo>;
}
