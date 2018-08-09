import { BaseTag } from './BaseTag';
export declare class HasAnyRolesTag extends BaseTag {
    constructor(config?: any);
    handler(context: any, subject: any, contentFun: any, callback: any, args: any): Promise<void>;
}
