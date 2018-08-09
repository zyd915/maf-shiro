import { PathMatcherFilter } from './PathMatcherFilter';
import { Subject } from '../../core/subject/Subject';
export declare abstract class AccessControlFilter extends PathMatcherFilter {
    static DEFAULT_LOGIN_URL: string;
    static GET_METHOD: string;
    static POST_METHOD: string;
    private loginUrl;
    constructor();
    onExecute(req: any, res: any, param: any): Promise<boolean>;
    abstract isAccessAllowed(req: any, res: any, param: any): Promise<boolean>;
    abstract onAccessDenied(req: any, res: any, param: any): Promise<boolean>;
    getLoginUrl(): string;
    setLoginUrl(loginUrl: string): void;
    getSubject(req: any, res: any): Promise<Subject>;
    isSessionaVailable(session: any): boolean;
    isLoginRequest(req: any, res: any): boolean;
    redirectToLogin(req: any, res: any): void;
    redirect(req: any, res: any, url: any): void;
}
