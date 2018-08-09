import { PermissionsAuthorizationFilter } from './PermissionsAuthorizationFilter';
export declare class HttpMethodPermissionFilter extends PermissionsAuthorizationFilter {
    httpMethodActions: Map<string, string>;
    constructor();
    getHttpMethodActions(): Map<string, string>;
    getHttpMethodAction(method: string): string;
    buildPermissions(configuredPerms: string[], action: string): string[];
    isAccessAllowed(req: any, res: any, perms: string[]): Promise<boolean>;
}
