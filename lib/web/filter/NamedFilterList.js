"use strict";
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
            if (that.filters == null || that.filters.length == 0)
                return;
            for (let filter of that.filters) {
                if (!filter.doFilter(req, res)) {
                    break;
                }
            }
        };
    }
}
exports.NamedFilterList = NamedFilterList;
