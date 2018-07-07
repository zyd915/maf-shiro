import { AccessControlFilter } from '../AccessControlFilter';
export declare class UserFilter extends AccessControlFilter {
    isAccessAllowed(req: any, res: any, param: any): boolean;
    onAccessDenied(req: any, res: any, param: any): boolean;
}
