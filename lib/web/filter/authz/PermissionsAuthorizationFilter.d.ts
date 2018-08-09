import { AuthorizationFilter } from './AuthorizationFilter';
export declare class PermissionsAuthorizationFilter extends AuthorizationFilter {
    isAccessAllowed(req: any, res: any, perms: string[]): Promise<boolean>;
}
