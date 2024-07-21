import { EasJson } from './types';
export declare class EasJsonAccessor {
    private easJsonPath;
    private isJson5;
    private easJson;
    private easJsonRawContents;
    private easJsonRawObject;
    private easJsonPatched;
    private constructor();
    private constructor();
    static fromProjectPath(projectDir: string): EasJsonAccessor;
    static fromRawString(easJsonRawContents: string): EasJsonAccessor;
    static formatEasJsonPath(projectDir: string): string;
    readAsync(): Promise<EasJson>;
    writeAsync(): Promise<void>;
    patch(fn: (easJsonRawObject: any) => any): void;
    readRawJsonAsync(): Promise<any>;
    private parseRawJson;
    private resetState;
}
