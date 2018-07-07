"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const log = log4js.getLogger();
const FiltersResolver_1 = require("./filter/FiltersResolver");
const SecurityUtils_1 = require("../SecurityUtils");
const FilterManager_1 = require("./filter/FilterManager");
const AccessControlFilter_1 = require("./filter/AccessControlFilter");
const AuthenticationFilter_1 = require("./filter/authc/AuthenticationFilter");
const AuthorizationFilter_1 = require("./filter/authz/AuthorizationFilter");
const BeanInitializationException_1 = require("../core/exception/BeanInitializationException");
class AbstractShiroFilter {
}
exports.AbstractShiroFilter = AbstractShiroFilter;
class ShiroFilter extends AbstractShiroFilter {
    constructor(securityManager, filtersResolver) {
        super();
        this.securityManager = securityManager;
        this.filtersResolver = filtersResolver;
    }
    setSecurityManager(securityManager) {
        this.securityManager = securityManager;
    }
    getSecurityManager() {
        return this.securityManager;
    }
    setFiltersResolver(filtersResolver) {
        this.filtersResolver = filtersResolver;
    }
    getFiltersResolver() {
        return this.filtersResolver;
    }
    doFilter(req, res) {
        this.filtersResolver.resolve(req, res);
        this.updateSessionLastAccessTime(req, res);
    }
    updateSessionLastAccessTime(req, res) {
        let subject = SecurityUtils_1.SecurityUtils.getSubjectById(req);
        //Subject should never _ever_ be null, but just in case:
        if (subject != null) {
            let session = subject.session;
            if (session != null) {
                try {
                    session.touch();
                }
                catch (e) {
                    log.error("session.touch() method invocation has failed.  Unable to update" +
                        "the corresponding session's last access time based on the incoming request.", e);
                }
            }
        }
    }
}
exports.ShiroFilter = ShiroFilter;
class ShiroFilterFactory {
    constructor(config) {
        this.filters = new Map();
        this.filterChainDefinitionMap = new Map();
        this.instance = null;
        if (config) {
            this.setLoginUrl(config.getLoginUrl());
            this.setUnauthorizedUrl(config.getUnauthorizedUrl());
            this.setSuccessUrl(config.getSuccessUrl());
            this.setFilterChainDefinitions(config.getUrls());
        }
    }
    getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance();
        }
        return this.instance;
    }
    getSecurityManager() {
        return this.securityManager;
    }
    setSecurityManager(securityManager) {
        this.securityManager = securityManager;
    }
    getLoginUrl() {
        return this.loginUrl;
    }
    setLoginUrl(loginUrl) {
        this.loginUrl = loginUrl;
    }
    getSuccessUrl() {
        return this.successUrl;
    }
    setSuccessUrl(successUrl) {
        this.successUrl = successUrl;
    }
    getUnauthorizedUrl() {
        return this.unauthorizedUrl;
    }
    setUnauthorizedUrl(unauthorizedUrl) {
        this.unauthorizedUrl = unauthorizedUrl;
    }
    getFilters() {
        return this.filters;
    }
    setFilters(filters) {
        this.filters = filters;
    }
    getFilterChainDefinitionMap() {
        return this.filterChainDefinitionMap;
    }
    setFilterChainDefinitionMap(filterChainDefinitionMap) {
        this.filterChainDefinitionMap = filterChainDefinitionMap;
    }
    setFilterChainDefinitions(definitionUrls = {}) {
        for (let key in definitionUrls) {
            this.filterChainDefinitionMap.set(key, definitionUrls[key]);
        }
    }
    createInstance() {
        log.debug("Creating Shiro Filter instance.");
        let securityManager = this.getSecurityManager();
        if (securityManager == null) {
            throw new BeanInitializationException_1.BeanInitializationException("SecurityManager property must be set.");
        }
        let manager = this.createFilterManager();
        let filtersResolver = new FiltersResolver_1.FiltersResolver();
        filtersResolver.setFilterManager(manager);
        return new ShiroFilter(securityManager, filtersResolver);
    }
    createFilterManager() {
        let manager = new FilterManager_1.FilterManager();
        let defaultFilters = manager.getFilters();
        for (let filter of defaultFilters.values()) {
            this.applyGlobalPropertiesIfNecessary(filter);
        }
        let filters = this.getFilters();
        if (filters && filters.size > 0) {
            for (let [name, filter] of filters.entries()) {
                this.applyGlobalPropertiesIfNecessary(filter);
                manager.addFilter(name, filter, false, false);
            }
        }
        let chains = this.getFilterChainDefinitionMap();
        if (chains && chains.size > 0) {
            for (let [url, chainDefinition] of chains.entries()) {
                manager.createChain(url, chainDefinition);
            }
        }
        return manager;
    }
    applyGlobalPropertiesIfNecessary(filter) {
        this.applyLoginUrlIfNecessary(filter);
        this.applySuccessUrlIfNecessary(filter);
        this.applyUnauthorizedUrlIfNecessary(filter);
    }
    applyLoginUrlIfNecessary(filter) {
        if (this.getLoginUrl() && filter instanceof AccessControlFilter_1.AccessControlFilter) {
            if (AccessControlFilter_1.AccessControlFilter.DEFAULT_LOGIN_URL == filter.getLoginUrl()) {
                filter.setLoginUrl(this.getLoginUrl());
            }
        }
    }
    applySuccessUrlIfNecessary(filter) {
        if (this.getSuccessUrl() && filter instanceof AuthenticationFilter_1.AuthenticationFilter) {
            if (AuthenticationFilter_1.AuthenticationFilter.DEFAULT_SUCCESS_URL == filter.getSuccessUrl()) {
                filter.setSuccessUrl(this.getSuccessUrl());
            }
        }
    }
    applyUnauthorizedUrlIfNecessary(filter) {
        if (this.getUnauthorizedUrl() && filter instanceof AuthorizationFilter_1.AuthorizationFilter) {
            if (null == filter.getUnauthorizedUrl()) {
                filter.setUnauthorizedUrl(this.getUnauthorizedUrl());
            }
        }
    }
}
exports.ShiroFilterFactory = ShiroFilterFactory;
