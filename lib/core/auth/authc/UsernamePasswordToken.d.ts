import { HostAuthenticationToken, RememberMeAuthenticationToken } from "./AuthenticationToken";
export declare class UsernamePasswordToken implements RememberMeAuthenticationToken, HostAuthenticationToken {
    username: string;
    password: string;
    host: string;
    rememberMe: boolean;
    constructor(username?: any, password?: any, host?: any, rememberMe?: any);
    getPrincipal(): string;
    getCredentials(): string;
    getHost(): string;
    isRememberMe(): boolean;
    setRememberMe(rememberMe: any): void;
    clear(): void;
    serialize(): string;
    deserialize(serializedToken: any): void;
}
