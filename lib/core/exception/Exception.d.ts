export declare class Exception {
    msg: string;
    subEx: Exception;
    constructor(msg: any, subEx?: Exception);
}
