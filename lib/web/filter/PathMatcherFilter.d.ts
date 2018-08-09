import { AbstractFilter } from './Filter';
import { PathMatcher } from './PathMatcher';
export declare abstract class PathMatcherFilter extends AbstractFilter {
    pathMatcher: PathMatcher;
    appliedPaths: Map<string, string | string[]>;
    constructor();
    processPathConfig(path: string, config: string | string[]): this;
    pathsMatch(pattern: string, path: string): boolean;
    execute(req: any, res: any): Promise<boolean>;
    abstract onExecute(req: any, res: any, param: string | string[]): Promise<boolean>;
}
