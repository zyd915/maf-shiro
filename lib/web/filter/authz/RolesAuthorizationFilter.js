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
const AuthorizationFilter_1 = require("./AuthorizationFilter");
class RolesAuthorizationFilter extends AuthorizationFilter_1.AuthorizationFilter {
    isAccessAllowed(req, res, roles) {
        return __awaiter(this, void 0, void 0, function* () {
            let subject = yield this.getSubject(req, res);
            if (roles == null || roles.length == 0) {
                //no roles specified, so nothing to check - allow access.
                return true;
            }
            return this.isSessionaVailable(subject.session) && subject.hasAllRoles(roles);
        });
    }
}
exports.RolesAuthorizationFilter = RolesAuthorizationFilter;
