import { Cache } from "../../Cache";
export declare class CmfCache<K, V> implements Cache<K, V> {
    diskCache: any;
    constructor(diskCache: any);
    get(key: K): V;
    put(key: K, value: V): V;
    remove(key: K): V;
    clear(): void;
    size(): number;
    keys(): Set<K>;
    values(): Array<V>;
}
