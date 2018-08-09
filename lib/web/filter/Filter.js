"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractFilter {
    init() {
    }
    doFilter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.beforeExecute(req, res);
            let executeFlag = yield this.execute(req, res);
            yield this.afterExecute(req, res);
            return executeFlag;
        });
    }
    distroy() {
    }
    beforeExecute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    afterExecute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
}
exports.AbstractFilter = AbstractFilter;
