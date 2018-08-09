import { PathMatcherFilter } from './PathMatcherFilter';
export declare class AnonymousFilter extends PathMatcherFilter {
    onExecute(req: any, res: any, param: any): Promise<boolean>;
}
