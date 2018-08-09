"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_config = {
    loginUrl: 'login',
    unauthorizedUrl: 'unauthorized',
    successUrl: null,
    urls: {
        '/': 'anon',
        '/*.ico': 'anon',
        '/index': 'anon',
        '/login': 'anon',
        '/_login': 'anon',
        '/logout': 'logout',
        '/**': 'authc,user'
    },
    session: {
        redis: {
            port: 6379,
            host: '127.0.0.1',
            password: '',
            expire: null,
        },
        timeout: 30 * 60 * 1000,
    }
};
class ShiroConfig {
    constructor(config = {}) {
        this.config = Object.assign({}, default_config, config);
    }
    getLoginUrl() {
        return this.config.loginUrl;
    }
    getSuccessUrl() {
        return this.config.successUrl;
    }
    getUnauthorizedUrl() {
        return this.config.unauthorizedUrl;
    }
    getUrls() {
        return this.config.urls;
    }
    getSession() {
        return this.config.session;
    }
}
exports.ShiroConfig = ShiroConfig;
