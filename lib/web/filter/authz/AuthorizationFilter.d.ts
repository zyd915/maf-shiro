import { AccessControlFilter } from '../AccessControlFilter';
export declare abstract class AuthorizationFilter extends AccessControlFilter {
    unauthorizedUrl: string;
    constructor();
    setUnauthorizedUrl(unauthorizedUrl: string): void;
    getUnauthorizedUrl(): string;
    onAccessDenied(req: any, res: any, param: any): boolean;
}
