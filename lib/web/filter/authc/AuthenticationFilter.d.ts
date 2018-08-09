import { AccessControlFilter } from '../AccessControlFilter';
export declare abstract class AuthenticationFilter extends AccessControlFilter {
    static DEFAULT_SUCCESS_URL: string;
    successUrl: string;
    constructor();
    setSuccessUrl(successUrl: string): void;
    getSuccessUrl(): string;
    isAccessAllowed(req: any, res: any, param: any): Promise<boolean>;
    onAccessDenied(req: any, res: any, param: any): Promise<boolean>;
    issueSuccessRedirect(req: any, res: any): void;
}
