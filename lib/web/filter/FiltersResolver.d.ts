import { PathMatcher } from './PathMatcher';
import { FilterManager } from './FilterManager';
export declare class FiltersResolver {
    matcher: PathMatcher;
    filterManager: FilterManager;
    constructor();
    setMatcher(matcher: PathMatcher): void;
    getMatcher(): PathMatcher;
    setFilterManager(filterManager: FilterManager): void;
    getFilterManager(): FilterManager;
    resolve(req: any, res: any): void;
    pathMatches(pattern: string, path: string): any;
}
