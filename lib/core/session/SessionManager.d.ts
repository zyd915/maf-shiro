import { Session } from "./Session";
import { SessionDAO } from './SessionDAO';
export interface SessionManager {
    sessionDAO: SessionDAO;
    start(): Promise<Session>;
    getSession(sessionId: any): Promise<Session>;
    update(session: Session): any;
}
export declare class DefaultSessionManager implements SessionManager {
    sessionDAO: SessionDAO;
    constructor(sessionDAO?: SessionDAO, config?: any);
    start(): Promise<Session>;
    getSession(sessionId: any): Promise<any>;
    update(session: Session): Promise<void>;
}
