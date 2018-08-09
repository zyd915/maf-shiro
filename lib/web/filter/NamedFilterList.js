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
class NamedFilterList {
    constructor(name, filters) {
        this.name = name;
        if (filters) {
            this.filters = filters;
        }
        else {
            this.filters = [];
        }
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    add(filter) {
        this.filters.push(filter);
    }
    proxy() {
        let that = this;
        return function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                if (that.filters == null || that.filters.length == 0)
                    return true;
                let result;
                for (let filter of that.filters) {
                    result = yield filter.doFilter(req, res);
                    if (!result)
                        break;
                }
                return result;
            });
        };
    }
}
exports.NamedFilterList = NamedFilterList;
