"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractFilter {
    init() {
    }
    doFilter(req, res) {
        this.beforeExecute(req, res);
        let executeFlag = this.execute(req, res);
        this.afterExecute(req, res);
        return executeFlag;
    }
    distroy() {
    }
    beforeExecute(req, res) {
        return true;
    }
    afterExecute(req, res) {
        return true;
    }
}
exports.AbstractFilter = AbstractFilter;
