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
const AccessControlFilter_1 = require("../AccessControlFilter");
class UserFilter extends AccessControlFilter_1.AccessControlFilter {
    isAccessAllowed(req, res, param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isLoginRequest(req, res)) {
                return true;
            }
            else {
                let subject = yield this.getSubject(req, res);
                return this.isSessionaVailable(subject.session) && !!subject && subject.getPrincipal() !== null;
            }
        });
    }
    onAccessDenied(req, res, param) {
        return __awaiter(this, void 0, void 0, function* () {
            this.redirectToLogin(req, res);
            return false;
        });
    }
}
exports.UserFilter = UserFilter;
