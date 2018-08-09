import { Session } from '../session/Session';
import { AuthenticationInfo } from '../auth/authc/AuthenticationInfo';
import { AuthInfo } from '../auth/AuthInfo';
import { SecurityManager } from '../mgt/SecurityManager';
import { SubjectContext } from './SubjectContext';
export declare class Subject {
    static ID_KEY: string;
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
    setSession(session: any): void;
    getPrincipal(): any;
    isAuthenticated(): boolean;
    isRemembered(): boolean;
    hasRole(role: any): boolean;
    hasRoles(roles: any): boolean[];
    hasAllRoles(roles: any): boolean;
    isPermitted(permission: any): boolean | boolean[];
    isPermitteds(permissions: any): boolean | boolean[];
    isPermittedAll(permissions: any): boolean;
    clear(): void;
    toSubjectContext(): SubjectContext;
    renderFromSubjectContext(subjectContext: any): void;
}
