"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_ = require("../../../util/check_");
const str_ = require("../../../util/str_");
class Permission {
    constructor(wildcardString, caseSensitive) {
        this.WILDCARD_TOKEN = '*';
        this.PART_DIVIDER_TOKEN = ':';
        this.SUBPART_DIVIDER_TOKEN = ',';
        caseSensitive = caseSensitive || false;
        this.parts = this.resolveParts(wildcardString, caseSensitive);
    }
    implies(permission) {
        let implies = check_.isDefined(permission) && (this.getParts().length > 0);
        if (implies) {
            permission = (check_.isString(permission)) ? new Permission(permission) : permission;
            let theirParts = permission.getParts();
            let theirPartsLength = theirParts.length;
            let ourParts = this.getParts();
            for (let i = 0, len = ourParts.length; i < len; i++) {
                let ourPart = ourParts[i];
                if (i < theirPartsLength) {
                    let theirPart = theirParts[i];
                    if (!this.containsWildCardToken(ourPart) && !this.containsAll(ourPart, theirPart)) {
                        implies = false;
                        break;
                    }
                }
                else {
                    if (!this.containsWildCardToken(ourPart)) {
                        implies = false;
                        break;
                    }
                }
            }
        }
        return implies;
    }
    ;
    containsAll(ourPart, theirPart) {
        let contains = true;
        for (let i = 0; i < theirPart.length; i++) {
            if (ourPart.indexOf(theirPart[i]) === -1) {
                contains = false;
                break;
            }
        }
        return contains;
    }
    ;
    containsWildCardToken(part) {
        return part.indexOf(this.WILDCARD_TOKEN) > -1;
    }
    ;
    resolveParts(wildcardString, caseSensitive) {
        let parts = [], that = this;
        if (check_.isDefined(wildcardString) && check_.isString(wildcardString)) {
            wildcardString = wildcardString.trim() || wildcardString;
            let tokens = wildcardString.split(this.PART_DIVIDER_TOKEN);
            tokens.forEach(function (token) {
                parts.push(that.resolveSubParts(token, caseSensitive));
            });
        }
        return parts;
    }
    ;
    resolveSubParts(part, caseSensitive) {
        let subParts = [];
        let tokens = part.split(this.SUBPART_DIVIDER_TOKEN);
        let idx = 0;
        tokens.forEach(function (token) {
            token = token.trim() || token;
            token = (caseSensitive === false) ? str_.lowercase(token) : token;
            subParts[idx++] = token;
        });
        return subParts;
    }
    ;
    getParts() {
        return this.parts;
    }
    ;
}
exports.Permission = Permission;
