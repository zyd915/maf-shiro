export interface Cache<K, V> {
    get(key: K): Promise<V>;
    put(key: K, value: V): Promise<V>;
    remove(key: K): Promise<V>;
    clear(): Promise<void>;
    size(): Promise<number>;
    keys(): Promise<Set<K>>;
}
