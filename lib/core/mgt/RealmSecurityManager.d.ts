import { SecurityManager } from './SecurityManager';
import { AuthInfo } from '../auth/AuthInfo';
import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { Subject } from '../subject/Subject';
import { SubjectContext } from '../subject/SubjectContext';
import { Authenticator } from '../auth/Authenticator';
import { Authorizer } from '../auth/Authorizer';
import { AuthorizationInfo } from '../auth/authz/AuthorizationInfo';
import { Permission } from '../auth/authz/Permission';
import { DefaultSessionManager } from '../session/SessionManager';
export declare class RealmSecurityManager extends DefaultSessionManager implements SecurityManager {
    authenticator: Authenticator;
    authorizer: Authorizer;
    realm: any;
    constructor(realm: any);
    login(subject: Subject, token: AuthenticationToken): Subject;
    logout(subject: Subject): void;
    createSubject(subjectContext: SubjectContext): Subject;
    authenticate(token: AuthenticationToken): Promise<AuthInfo>;
    clear(): void;
    isPermitted(permission: any): boolean | boolean[];
    isPermittedAll(permissions: any): boolean;
    hasRole(role: any): boolean;
    hasRoles(roles: any): boolean[];
    hasAllRoles(roles: any): boolean;
    getPermissions(authorizationInfo: AuthorizationInfo): Permission[];
    isObjectPermissionPermitted(permission: any): boolean;
    resolvePermission(permission: string | Permission): Permission;
}
