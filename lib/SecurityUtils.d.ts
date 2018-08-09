import { SecurityManager } from './core/mgt/SecurityManager';
import { Subject } from './core/subject/Subject';
import { SubjectDAO } from './core/subject/SubjectDAO';
export declare class SecurityUtils {
    static securityManager: SecurityManager;
    static subjectDAO: SubjectDAO;
    static getSubject(sessionId?: string): Promise<any>;
    static getSubjectById(req: any): Promise<any>;
    static saveSubject(subject: Subject): Promise<void>;
    static updateSubject(sessionId: any): Promise<void>;
    static removeSubject(sessionId: any): Promise<void>;
    static setSecurityManager(securityManager: SecurityManager): void;
    static getSecurityManager(): SecurityManager;
    static setSubjectDAO(subjectDAO: SubjectDAO): void;
    static getSubjectDAO(): SubjectDAO;
    static getSession(req: any): Promise<import("./core/session/Session").Session>;
}
