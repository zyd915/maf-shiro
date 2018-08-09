import { Filter } from './Filter';
export declare class NamedFilterList {
    name: string;
    filters: Filter[];
    constructor(name: string, filters?: Filter[]);
    setName(name: string): void;
    getName(): string;
    add(filter: Filter): void;
    proxy(): (req: any, res: any) => Promise<boolean>;
}
