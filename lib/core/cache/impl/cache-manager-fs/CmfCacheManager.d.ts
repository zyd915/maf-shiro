import { CacheManager } from "../../CacheManager";
import { Cache } from "../../Cache";
export declare class CmfCacheManager implements CacheManager {
    cache: any;
    config: any;
    constructor(config?: any);
    init(): void;
    getCache<K, V>(cacheKey?: string): Cache<K, V>;
    destroy(): void;
}
