import { AuthorizationFilter } from './AuthorizationFilter';
export declare class RolesAuthorizationFilter extends AuthorizationFilter {
    isAccessAllowed(req: any, res: any, roles: any): boolean;
}
