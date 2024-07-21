import { Env } from '@expo/eas-build-job';
export declare class ExpoUpdatesCLIModuleNotFoundError extends Error {
}
export declare class ExpoUpdatesCLIInvalidCommandError extends Error {
}
export declare class ExpoUpdatesCLICommandFailedError extends Error {
}
export declare function expoUpdatesCommandAsync(projectDir: string, args: string[], options: {
    env: Env | undefined;
    cwd?: string;
}): Promise<string>;
