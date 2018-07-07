export interface Filter {
    init(): void;
    doFilter(req: any, res: any): boolean;
    distroy(): void;
}
export interface AspectFilter extends Filter {
    beforeExecute(req: any, res: any): boolean;
    execute(req: any, res: any): boolean;
    afterExecute(req: any, res: any): boolean;
}
export declare abstract class AbstractFilter implements AspectFilter {
    init(): void;
    doFilter(req: any, res: any): boolean;
    distroy(): void;
    abstract execute(req: any, res: any): boolean;
    beforeExecute(req: any, res: any): boolean;
    afterExecute(req: any, res: any): boolean;
}
