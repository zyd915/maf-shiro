export declare class Session {
    uid: string;
    startTimestamp: Date;
    stopTimestamp: Date;
    lastAccessTime: Date;
    timeout: number;
    expired: boolean;
    attributes: object;
    constructor();
    getId(): string;
    setId(uid: any): void;
    getStartTimestamp(): Date;
    getLastAccessTime(): Date;
    getTimeout(): number;
    setTimeout(maxIdleTimeInMillis: any): void;
    touch(): void;
    stop(): void;
    isStopped(): boolean;
    isExpired(): boolean;
    expire(): void;
    isValid(): boolean;
    validate(): void;
    isTimedOut(): boolean;
    getAttributeKeys(): string[];
    getAttribute(key: any): any;
    setAttribute(key: any, value: any): void;
    removeAttribute(key: any): void;
}
