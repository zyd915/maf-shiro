import { Session } from '../session/Session';
import { AuthenticationInfo } from '../auth/authc/AuthenticationInfo';
import { AuthInfo } from '../auth/AuthInfo';
import { SecurityManager } from '../mgt/SecurityManager';
export declare class Subject {
    authenticationInfo: AuthenticationInfo;
    authenticated: boolean;
    remembered: boolean;
    session: Session;
    sessionId: string;
    securityManager: SecurityManager;
    constructor(securityManager: SecurityManager, authenticated?: boolean, session?: Session, authenticationInfo?: AuthenticationInfo);
    login(token: any): Promise<AuthInfo>;
    rememberMe(sessionId: any): Promise<false | AuthInfo>;
    logout(): void;
    getSession(create?: boolean): Promise<Session>;
    getPrincipal(): any;
    isAuthenticated(): boolean;
    isRemembered(): boolean;
    hasRole(role: any): boolean;
    hasRoles(roles: any): any[];
    hasAllRoles(roles: any): boolean;
    isPermitted(permissions: any): boolean | boolean[];
    isPermittedAll(permissions: any): boolean;
    clear(): void;
}
