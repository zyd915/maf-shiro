import { Subject } from './Subject';
import { SecurityManager } from '../mgt/SecurityManager';
export declare class SubjectDAO {
    static SUBJECT_SESSION_KEY: string;
    securityManager: any;
    constructor(securityManager?: SecurityManager);
    save(subject: Subject): Promise<void>;
    get(sessionId: string): Promise<any>;
    delete(sessionId: string): Promise<void>;
}
