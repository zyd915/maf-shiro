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
const Filter_1 = require("./Filter");
const SecurityUtils_1 = require("../../SecurityUtils");
class LogoutFilter extends Filter_1.AbstractFilter {
    execute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield SecurityUtils_1.SecurityUtils.getSubjectById(req);
            if (subject) {
                subject.logout();
            }
            return true;
        });
    }
}
exports.LogoutFilter = LogoutFilter;
