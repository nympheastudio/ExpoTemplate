export declare function getAaptExecutableAsync(): Promise<string>;
export declare function getAptParametersAsync(appPath: string): Promise<{
    packageName: string;
    activityName: string;
}>;
