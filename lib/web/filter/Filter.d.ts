export interface Filter {
    init(): void;
    doFilter(req: any, res: any): Promise<boolean>;
    distroy(): void;
}
export interface AspectFilter extends Filter {
    beforeExecute(req: any, res: any): Promise<boolean>;
    execute(req: any, res: any): Promise<boolean>;
    afterExecute(req: any, res: any): Promise<boolean>;
}
export declare abstract class AbstractFilter implements AspectFilter {
    init(): void;
    doFilter(req: any, res: any): Promise<boolean>;
    distroy(): void;
    abstract execute(req: any, res: any): Promise<boolean>;
    beforeExecute(req: any, res: any): Promise<boolean>;
    afterExecute(req: any, res: any): Promise<boolean>;
}
