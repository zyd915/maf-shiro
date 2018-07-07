export declare class Permission {
    WILDCARD_TOKEN: string;
    PART_DIVIDER_TOKEN: string;
    SUBPART_DIVIDER_TOKEN: string;
    parts: any;
    constructor(wildcardString: any, caseSensitive?: any);
    implies(permission: any): boolean;
    containsAll(ourPart: any, theirPart: any): boolean;
    containsWildCardToken(part: any): boolean;
    resolveParts(wildcardString: any, caseSensitive: any): any[];
    resolveSubParts(part: any, caseSensitive: any): any[];
    getParts(): any;
}
