"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthInfo_1 = require("../AuthInfo");
class AbstractAuthenticationStrategy {
    beforeAllAttempts(realms, token) {
        return new AuthInfo_1.AuthInfo();
    }
    beforeAttempt(realm, token, aggregateInfo) {
        return aggregateInfo;
    }
    afterAttempt(realm, token, singleRealmInfo, aggregateInfo, error) {
        let info;
        if (singleRealmInfo == null) {
            info = aggregateInfo;
        }
        else if (aggregateInfo == null) {
            info = singleRealmInfo;
        }
        else {
            info = this.merge(singleRealmInfo, aggregateInfo);
        }
        return info;
    }
    afterAllAttempts(token, aggregate) {
        return aggregate;
    }
    merge(info, aggregate) {
        // todo aggregate.merge(info);
        return aggregate;
    }
}
exports.AbstractAuthenticationStrategy = AbstractAuthenticationStrategy;
