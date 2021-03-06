import { AuthenticationInfo } from '../auth/authc/AuthenticationInfo';
import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { Session } from '../session/Session';
import { AuthorizationInfo } from '../auth/authz/AuthorizationInfo';
import { SecurityManager } from '../mgt/SecurityManager';
export declare class SubjectContext {
    authenticationInfo: AuthenticationInfo;
    authorizationInfo: AuthorizationInfo;
    authenticationToken: AuthenticationToken;
    sessionId: string;
    session: Session;
    host: string;
    remembered: boolean;
    authenticated: boolean;
    securityManager: SecurityManager;
    constructor(session?: any, authenticated?: any, remembered?: any, securityManager?: any, authenticationInfo?: any, authorizationInfo?: any);
    getSecurityManager(): SecurityManager;
    setSecurityManager(securityManager: SecurityManager): void;
    resolveSecurityManager(): SecurityManager;
    getSessionId(): string;
    setSessionId(sessionId: string): void;
    resolveSession(): Promise<Session>;
    getHost(): string;
    setHost(host: string): void;
    getAuthenticationInfo(): AuthenticationInfo;
    setAuthenticationInfo(authenticationInfo: AuthenticationInfo): void;
    getAuthenticated(): boolean;
    setAuthenticated(authenticated: boolean): void;
    resolveAuthenticated(): boolean;
    getRemembered(): boolean;
    setRemembered(remembered: boolean): void;
    fromJsonObj({ sessionId, authenticated, host, remembered, principal, credentials, roles, permissions }: {
        sessionId: any;
        authenticated: any;
        host: any;
        remembered: any;
        principal: any;
        credentials: any;
        roles: any;
        permissions: any;
    }): void;
    toJsonObj(): {
        sessionId: string;
        authenticated: boolean;
        host: string;
        remembered: boolean;
        principal: string | object;
        credentials: string | object;
        roles: any;
        permissions: any[];
    };
}
