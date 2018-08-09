export declare abstract class BaseTag {
    tags: any;
    config: any;
    autoescape: any;
    argsKey: any;
    constructor(name: any, config?: any);
    parse(parser: any, nodes: any, lexer: any): any;
    run(context: any, params: any, body: any, callback: any): Promise<any>;
    abstract handler(context: any, subject: any, contentFun: any, callback: any, args: any): Promise<void>;
    getSessionId(context: any, params: any): any;
    getSubject(sessionId: any): Promise<any>;
    getSafeString(str: any): any;
    putContext(context: any, key: any, value: any): void;
}
