export declare class PathMatcher {
    pathSeparator: string;
    constructor();
    setPathSeparator(pathSeparator: any): void;
    match(pattern: any, path: any): any;
    doMatch(pattern: any, path: any, fullMatch: any): any;
    matchStrings(pattern: any, str: any): boolean;
    containsStar(str: any): boolean;
}
