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
const BaseTag_1 = require("./BaseTag");
class HasRoleTag extends BaseTag_1.BaseTag {
    constructor(config) {
        super('hasRole', config);
        this.argsKey = {
            role: 'role',
        };
    }
    handler(context, subject, contentFun, callback, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = '', role = args[this.argsKey.role];
            if (subject && subject.hasRole(role)) {
                content = contentFun();
            }
            callback(null, this.getSafeString(context.env.renderString(content, context.ctx)));
        });
    }
}
exports.HasRoleTag = HasRoleTag;
