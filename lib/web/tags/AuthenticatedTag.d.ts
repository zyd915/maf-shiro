import { BaseTag } from './BaseTag';
export declare class AuthenticatedTag extends BaseTag {
    constructor(config?: any);
    handler(context: any, subject: any, contentFun: any, callback: any, args: any): Promise<void>;
}
