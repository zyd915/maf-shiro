import { Cache } from "../../Cache";
export declare class CmfCache<K, V> implements Cache<K, V> {
    instanceId: any;
    diskCache: any;
    constructor(diskCache: any);
    get(key: K): Promise<any>;
    put(key: K, value: V): Promise<V>;
    remove(key: K): Promise<any>;
    clear(): Promise<void>;
    size(): Promise<any>;
    keys(): Promise<any>;
}
