"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SessionException_1 = require("../exception/SessionException");
class Session {
    constructor() {
        this.uid = null;
        this.host = null;
        this.startTimestamp = new Date();
        this.stopTimestamp = null;
        this.lastAccessTime = new Date();
        this.timeout = 30 * 60 * 1000;
        this.expired = false;
        this.attributes = {};
    }
    getId() {
        return this.uid;
    }
    ;
    setId(uid) {
        this.uid = uid;
    }
    ;
    getHost() {
        return this.host;
    }
    setHost(host) {
        this.host = host;
    }
    getStartTimestamp() {
        return this.startTimestamp;
    }
    ;
    getLastAccessTime() {
        return this.lastAccessTime;
    }
    ;
    getTimeout() {
        return this.timeout;
    }
    ;
    setTimeout(maxIdleTimeInMillis) {
        this.timeout = maxIdleTimeInMillis;
    }
    ;
    touch() {
        this.lastAccessTime = new Date();
    }
    ;
    stop() {
        if (this.stopTimestamp === null) {
            this.stopTimestamp = new Date();
        }
    }
    ;
    isStopped() {
        return this.stopTimestamp !== null;
    }
    ;
    isExpired() {
        return this.expired;
    }
    ;
    expire() {
        this.stop();
        this.expired = true;
    }
    ;
    isValid() {
        return !this.isStopped() && !this.isExpired();
    }
    ;
    validate() {
        if (this.isStopped()) {
            let msg = 'Session with id [' + this.getId() + '] has been '
                + 'explicitly stopped.  No further interaction under this session is allowed.';
            throw new SessionException_1.SessionException(msg);
        }
        if (this.isTimedOut()) {
            this.expire();
            throw new SessionException_1.SessionException('Session has expired');
        }
    }
    ;
    isTimedOut() {
        let timedOut = this.isExpired();
        if (!timedOut) {
            let timeout = this.getTimeout();
            if (timeout >= 1) {
                let currentTimestamp = new Date().getTime();
                let expireTimeMillis = currentTimestamp - timeout;
                let expireTime = new Date(expireTimeMillis);
                timedOut = new Date(this.lastAccessTime) <= expireTime;
            }
        }
        return timedOut;
    }
    ;
    getAttributeKeys() {
        return Object.keys(this.attributes);
    }
    ;
    getAttribute(key) {
        return this.attributes[key];
    }
    ;
    setAttribute(key, value) {
        this.attributes[key] = value;
    }
    ;
    removeAttribute(key) {
        delete this.attributes[key];
    }
    ;
}
exports.Session = Session;
