import { SecurityManager } from '../core/mgt/SecurityManager';
import { Filter } from './filter/Filter';
import { FiltersResolver } from './filter/FiltersResolver';
import { FilterManager } from './filter/FilterManager';
import { ShiroConfig } from './config/ShiroConfig';
export declare abstract class AbstractShiroFilter {
    abstract doFilter(req: any, res: any): any;
}
export declare class ShiroFilter extends AbstractShiroFilter {
    securityManager: SecurityManager;
    filtersResolver: FiltersResolver;
    constructor(securityManager: SecurityManager, filtersResolver: FiltersResolver);
    setSecurityManager(securityManager: SecurityManager): void;
    getSecurityManager(): SecurityManager;
    setFiltersResolver(filtersResolver: FiltersResolver): void;
    getFiltersResolver(): FiltersResolver;
    doFilter(req: any, res: any): void;
    updateSessionLastAccessTime(req: any, res: any): void;
}
export declare class ShiroFilterFactory {
    securityManager: SecurityManager;
    loginUrl: string;
    successUrl: string;
    unauthorizedUrl: string;
    filters: Map<string, Filter>;
    filterChainDefinitionMap: Map<string, string>;
    instance: ShiroFilter;
    constructor(config?: ShiroConfig);
    getInstance(): ShiroFilter;
    getSecurityManager(): SecurityManager;
    setSecurityManager(securityManager: SecurityManager): void;
    getLoginUrl(): string;
    setLoginUrl(loginUrl: string): void;
    getSuccessUrl(): string;
    setSuccessUrl(successUrl: string): void;
    getUnauthorizedUrl(): string;
    setUnauthorizedUrl(unauthorizedUrl: string): void;
    getFilters(): Map<string, Filter>;
    setFilters(filters: Map<string, Filter>): void;
    getFilterChainDefinitionMap(): Map<string, string>;
    setFilterChainDefinitionMap(filterChainDefinitionMap: Map<string, string>): void;
    setFilterChainDefinitions(definitionUrls?: {}): void;
    createInstance(): ShiroFilter;
    createFilterManager(): FilterManager;
    applyGlobalPropertiesIfNecessary(filter: any): void;
    applyLoginUrlIfNecessary(filter: any): void;
    applySuccessUrlIfNecessary(filter: any): void;
    applyUnauthorizedUrlIfNecessary(filter: any): void;
}
