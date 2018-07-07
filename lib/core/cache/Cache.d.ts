export interface Cache<K, V> {
    get(key: K): V;
    put(key: K, value: V): V;
    remove(key: K): V;
    clear(): void;
    size(): number;
    keys(): Set<K>;
    values(): Array<V>;
}
