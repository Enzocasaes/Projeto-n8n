/**
 * Parâmetros para geração de número randômico verdadeiro
 * @param min Valor mínimo (Min)
 * @param max Valor máximo (Max)
 */
export interface TrueRandomNumberOptions {
    /**
     * Valor mínimo do intervalo (Min)
     * @friendlyName Min
     */
    min: number;
    /**
     * Valor máximo do intervalo (Max)
     * @friendlyName Max
     */
    max: number;
}
export interface TrueRandomNumberResult {
    result: number;
    min: number;
    max: number;
    datetime: string;
    source: string;
}
export declare class RandomConnector {
    execute(options: TrueRandomNumberOptions): Promise<TrueRandomNumberResult>;
}
//# sourceMappingURL=True_Random_Number_Generator.d.ts.map