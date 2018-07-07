"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnonymousFilter_1 = require("./AnonymousFilter");
const FormAuthenticationFilter_1 = require("./authc/FormAuthenticationFilter");
const LogoutFilter_1 = require("./LogoutFilter");
const PermissionsAuthorizationFilter_1 = require("./authz/PermissionsAuthorizationFilter");
const HttpMethodPermissionFilter_1 = require("./authz/HttpMethodPermissionFilter");
const RolesAuthorizationFilter_1 = require("./authz/RolesAuthorizationFilter");
const UserFilter_1 = require("./authc/UserFilter");
const PathMatcherFilter_1 = require("./PathMatcherFilter");
const NamedFilterList_1 = require("./NamedFilterList");
const IllegalArgumentException_1 = require("../../core/exception/IllegalArgumentException");
const str_ = require("../../util/str_");
class FilterInstance {
    constructor(c) {
        this.filter = new c();
    }
}
exports.FilterInstance = FilterInstance;
exports.DefaultFilters = {
    anon: new FilterInstance(AnonymousFilter_1.AnonymousFilter),
    authc: new FilterInstance(FormAuthenticationFilter_1.FormAuthenticationFilter),
    logout: new FilterInstance(LogoutFilter_1.LogoutFilter),
    perms: new FilterInstance(PermissionsAuthorizationFilter_1.PermissionsAuthorizationFilter),
    rest: new FilterInstance(HttpMethodPermissionFilter_1.HttpMethodPermissionFilter),
    roles: new FilterInstance(RolesAuthorizationFilter_1.RolesAuthorizationFilter),
    user: new FilterInstance(UserFilter_1.UserFilter),
};
class ChainResolver {
    constructor(chainDefinitionItem) {
        this.chainDefinitionItem = chainDefinitionItem;
    }
    resolveFilterName() {
        let name = this.chainDefinitionItem;
        if (this.isParametrizedFilter(this.chainDefinitionItem)) {
            name = this.chainDefinitionItem.substr(0, this.chainDefinitionItem.indexOf('['));
        }
        return str_.trim(name);
    }
    resolveFilterAuthConfig() {
        let args = null;
        if (this.isParametrizedFilter(this.chainDefinitionItem)) {
            let sIdx = this.chainDefinitionItem.indexOf('[');
            let eIdx = this.chainDefinitionItem.indexOf(']');
            let str = this.chainDefinitionItem.substr(sIdx + 1, eIdx - sIdx - 1);
            let tokens = str.split(',');
            args = [];
            tokens.forEach(function (token) {
                args.push(str_.trim(token));
            });
        }
        return args;
    }
    isParametrizedFilter(chainDefinitionItem) {
        return (chainDefinitionItem.indexOf('perms') > -1) || (chainDefinitionItem.indexOf('roles') > -1);
    }
}
exports.ChainResolver = ChainResolver;
class FilterManager {
    constructor() {
        this.filters = new Map();
        this.filterChains = new Map();
        this.addDefaultFilters(false);
    }
    getFilters() {
        return this.filters;
    }
    setFilters(filters) {
        this.filters = filters;
    }
    getFilterChains() {
        return this.filterChains;
    }
    setFilterChains(filterChains) {
        this.filterChains = filterChains;
    }
    getFilter(name) {
        return this.filters.get(name);
    }
    getChain(chainName) {
        return this.filterChains.get(chainName);
    }
    getChainNames() {
        let keys = [];
        this.filterChains.forEach(function (value, key) {
            keys.push(key);
        });
        return keys;
    }
    createChain(pattern, chainDefinition) {
        let tokens = chainDefinition.split(',');
        for (let chainDefinitionItem of tokens) {
            let resolver = new ChainResolver(chainDefinitionItem);
            this.addToChain(pattern, resolver.resolveFilterName(), resolver.resolveFilterAuthConfig());
        }
    }
    addToChain(chainName, filterName, authConfig) {
        let filter = this.getFilter(filterName);
        if (filter == null) {
            throw new IllegalArgumentException_1.IllegalArgumentException('There is no filter with name \'' + filterName
                + '\' to apply to chain [' + chainName + '] in the pool of available Filters.);');
        }
        this.applyFilterPathConfig(filter, chainName, authConfig);
        let chain = this.ensureChain(chainName);
        chain.add(filter);
    }
    ensureChain(chainName) {
        let chain = this.getChain(chainName);
        if (chain == null) {
            chain = new NamedFilterList_1.NamedFilterList(chainName);
            this.filterChains.set(chainName, chain);
        }
        return chain;
    }
    addFilter(name, filter, init, overwrite) {
        let existing = this.getFilter(name);
        if (existing == null || overwrite) {
            if (init) {
                this.initFilter(filter);
            }
            this.filters.set(name, filter);
        }
    }
    initFilter(filter) {
        return filter;
    }
    applyFilterPathConfig(filter, pattern, authConfig) {
        if (filter instanceof PathMatcherFilter_1.PathMatcherFilter) {
            filter.processPathConfig(pattern, authConfig);
        }
    }
    addDefaultFilters(init) {
        for (let key in exports.DefaultFilters) {
            this.addFilter(key, exports.DefaultFilters[key].filter, init, false);
        }
    }
    proxy(chainName) {
        let chain = this.getChain(chainName);
        if (chain == null) {
            throw new IllegalArgumentException_1.IllegalArgumentException('There is no configured chain under the name/key [' + chainName + '].');
        }
        return chain.proxy();
    }
}
exports.FilterManager = FilterManager;
