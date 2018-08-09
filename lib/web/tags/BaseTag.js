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
const SecurityUtils_1 = require("../../SecurityUtils");
const nunjucks = require("nunjucks");
const Subject_1 = require("../../core/subject/Subject");
class BaseTag {
    constructor(name, config) {
        this.tags = [name];
        this.config = config;
        this.autoescape = false;
        this.argsKey = {};
    }
    parse(parser, nodes, lexer) {
        let tok = parser.nextToken();
        let args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        let body = parser.parseUntilBlocks('end' + this.tags[0]);
        parser.advanceAfterBlockEnd();
        return new nodes.CallExtensionAsync(this, 'run', args, [body]);
    }
    run(context, params, body, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionId = this.getSessionId(context, params);
            let contentFun = null, args = null;
            if (sessionId) {
                let subject = yield this.getSubject(sessionId);
                if (typeof params === 'function') {
                    callback = body;
                    contentFun = params;
                }
                else {
                    args = params;
                    contentFun = body;
                }
                args = args || {};
                yield this.handler(context, subject, contentFun, callback, args);
            }
            return null;
        });
    }
    getSessionId(context, params) {
        params = params || {};
        context.ctx = context.ctx || {};
        return params[Subject_1.Subject.ID_KEY] || context.ctx[Subject_1.Subject.ID_KEY];
    }
    getSubject(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SecurityUtils_1.SecurityUtils.getSubject(sessionId);
        });
    }
    getSafeString(str) {
        return new nunjucks.runtime.SafeString(str);
    }
    putContext(context, key, value) {
        if (context && key) {
            context.ctx[key] = value;
        }
    }
}
exports.BaseTag = BaseTag;
