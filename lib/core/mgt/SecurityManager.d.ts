import { Authenticator } from '../auth/Authenticator';
import { Subject } from '../subject/Subject';
import { SubjectContext } from '../subject/SubjectContext';
import { AuthenticationToken } from '../auth/authc/AuthenticationToken';
import { Authorizer } from '../auth/Authorizer';
import { SessionManager } from '../session/SessionManager';
export interface SecurityManager extends Authenticator, Authorizer, SessionManager {
    login(subject: Subject, token: AuthenticationToken): Subject;
    logout(subject: Subject): void;
    createSubject(subjectContext: SubjectContext): Subject;
}
