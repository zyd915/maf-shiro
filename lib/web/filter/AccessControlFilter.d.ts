import { PathMatcherFilter } from './PathMatcherFilter';
import { Subject } from '../../core/subject/Subject';
export declare abstract class AccessControlFilter extends PathMatcherFilter {
    static DEFAULT_LOGIN_URL: string;
    static GET_METHOD: string;
    static POST_METHOD: string;
    private loginUrl;
    constructor();
    onExecute(req: any, res: any, param: any): boolean;
    abstract isAccessAllowed(req: any, res: any, param: any): boolean;
    abstract onAccessDenied(req: any, res: any, param: any): boolean;
    getLoginUrl(): string;
    setLoginUrl(loginUrl: string): void;
    getSubject(req: any, res: any): Subject;
    isLoginRequest(req: any, res: any): boolean;
    redirectToLogin(req: any, res: any): void;
    redirect(req: any, res: any, url: any): void;
}
