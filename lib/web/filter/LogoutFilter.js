"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Filter_1 = require("./Filter");
const SecurityUtils_1 = require("../../SecurityUtils");
class LogoutFilter extends Filter_1.AbstractFilter {
    execute(req, res) {
        let subject = SecurityUtils_1.SecurityUtils.getSubjectById(req);
        if (subject) {
            subject.logout();
        }
        return true;
    }
}
exports.LogoutFilter = LogoutFilter;
