import { SecurityManager } from './core/mgt/SecurityManager';
import { Subject } from './core/subject/Subject';
export declare class SecurityUtils {
    static securityManager: SecurityManager;
    static subjectMap: Map<string, Subject>;
    static getSubject(subjectId?: string): Subject;
    static getSubjectById(req: any): Subject;
    static addSubject(subjectId: string, subject: Subject): void;
    static updateSubject(): void;
    static removeSubject(subjectId: any): void;
    static setSecurityManager(securityManager: SecurityManager): void;
    static getSecurityManager(): SecurityManager;
}
