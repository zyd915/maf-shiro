import { Filter } from './Filter';
import { AnonymousFilter } from './AnonymousFilter';
import { FormAuthenticationFilter } from './authc/FormAuthenticationFilter';
import { LogoutFilter } from './LogoutFilter';
import { PermissionsAuthorizationFilter } from './authz/PermissionsAuthorizationFilter';
import { HttpMethodPermissionFilter } from './authz/HttpMethodPermissionFilter';
import { RolesAuthorizationFilter } from './authz/RolesAuthorizationFilter';
import { UserFilter } from './authc/UserFilter';
import { NamedFilterList } from './NamedFilterList';
export declare class FilterInstance<T extends Filter> {
    filter: T;
    constructor(c: new () => T);
}
export declare const DefaultFilters: {
    anon: FilterInstance<AnonymousFilter>;
    authc: FilterInstance<FormAuthenticationFilter>;
    logout: FilterInstance<LogoutFilter>;
    perms: FilterInstance<PermissionsAuthorizationFilter>;
    rest: FilterInstance<HttpMethodPermissionFilter>;
    roles: FilterInstance<RolesAuthorizationFilter>;
    user: FilterInstance<UserFilter>;
};
export declare class ChainResolver {
    chainDefinitionItem: string;
    constructor(chainDefinitionItem: string);
    resolveFilterName(): any;
    resolveFilterAuthConfig(): any;
    isParametrizedFilter(chainDefinitionItem: any): boolean;
}
export declare class FilterManager {
    filters: Map<string, Filter>;
    filterChains: Map<string, NamedFilterList>;
    constructor();
    getFilters(): Map<string, Filter>;
    setFilters(filters: Map<string, Filter>): void;
    getFilterChains(): Map<string, NamedFilterList>;
    setFilterChains(filterChains: Map<string, NamedFilterList>): void;
    getFilter(name: string): Filter;
    getChain(chainName: string): NamedFilterList;
    getChainNames(): any[];
    createChain(pattern: string, chainDefinition: string): void;
    addToChain(chainName: string, filterName: string, authConfig: string | string[]): void;
    ensureChain(chainName: string): NamedFilterList;
    addFilter(name: string, filter: Filter, init: boolean, overwrite: boolean): void;
    initFilter(filter: Filter): Filter;
    applyFilterPathConfig(filter: Filter, pattern: string, authConfig: string | string[]): void;
    addDefaultFilters(init: boolean): void;
    proxy(chainName: string): (req: any, res: any) => Promise<boolean>;
}
