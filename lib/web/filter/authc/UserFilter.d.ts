import { AccessControlFilter } from '../AccessControlFilter';
export declare class UserFilter extends AccessControlFilter {
    isAccessAllowed(req: any, res: any, param: any): Promise<boolean>;
    onAccessDenied(req: any, res: any, param: any): Promise<boolean>;
}
