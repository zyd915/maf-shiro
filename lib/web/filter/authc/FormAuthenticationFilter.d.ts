import { AuthenticationFilter } from './AuthenticationFilter';
export declare class FormAuthenticationFilter extends AuthenticationFilter {
    onExecute(req: any, res: any, param: any): Promise<boolean>;
    onAccessDenied(req: any, res: any, param: any): Promise<boolean>;
}
