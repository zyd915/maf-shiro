import { Cache } from "./Cache";
export interface CacheManager {
    init(): void;
    getCache<K, V>(cacheKey: string): Cache<K, V>;
    destroy(): void;
}
