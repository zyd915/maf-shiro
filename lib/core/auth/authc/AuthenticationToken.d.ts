export interface AuthenticationToken {
    getPrincipal(): Object;
    getCredentials(): Object;
}
export interface RememberMeAuthenticationToken extends AuthenticationToken {
    isRememberMe(): boolean;
}
export interface HostAuthenticationToken extends AuthenticationToken {
    getHost(): string;
}
