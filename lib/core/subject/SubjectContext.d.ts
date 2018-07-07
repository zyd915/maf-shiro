import { Subject } from './Subject';
import { AuthenticationInfo } from '../auth/authc/AuthenticationInfo';
import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { Session } from '../session/Session';
import { AuthorizationInfo } from '../auth/authz/AuthorizationInfo';
export declare class SubjectContext {
    subject: Subject;
    authenticationInfo: AuthenticationInfo;
    authorizationInfo: AuthorizationInfo;
    authenticationToken: AuthenticationToken;
    sessionId: string;
    session: Session;
    host: string;
    authenticated: boolean;
}
