"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_ = require("../../../util/json_");
class UsernamePasswordToken {
    constructor(username, password, host, rememberMe) {
        this.username = username || null;
        this.password = password || null;
        this.host = host || null;
        this.rememberMe = rememberMe || false;
    }
    getPrincipal() {
        return this.username;
    }
    ;
    getCredentials() {
        return this.password;
    }
    ;
    getHost() {
        return this.host;
    }
    isRememberMe() {
        return this.rememberMe;
    }
    ;
    setRememberMe(rememberMe) {
        this.rememberMe = rememberMe;
    }
    ;
    clear() {
        this.username = this.password = this.host = null;
        this.rememberMe = false;
    }
    ;
    serialize() {
        return json_.toJson(this, null);
    }
    ;
    deserialize(serializedToken) {
        var obj = json_.fromJson(serializedToken);
        Object.assign(this, obj);
    }
    ;
}
exports.UsernamePasswordToken = UsernamePasswordToken;
