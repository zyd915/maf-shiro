import { Session } from "./Session";
export declare class SessionDAO {
    cache: any;
    timeout: any;
    constructor(cache?: any, config?: any);
    create(session: Session): Promise<string>;
    readSession(sessionId: any): Promise<any>;
    update(session: Session): Promise<void>;
    delete(session: Session): Promise<void>;
}
