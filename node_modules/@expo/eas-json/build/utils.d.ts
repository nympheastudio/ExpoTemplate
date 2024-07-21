import { Platform } from '@expo/eas-build-job';
import { EasJsonAccessor } from './accessor';
import { BuildProfile } from './build/types';
import { SubmitProfile } from './submit/types';
import { EasJson } from './types';
interface EasJsonDeprecationWarning {
    message: string[];
    docsUrl?: string;
}
export declare class EasJsonUtils {
    static getBuildProfileNamesAsync(accessor: EasJsonAccessor): Promise<string[]>;
    static getBuildProfileAsync<T extends Platform>(accessor: EasJsonAccessor, platform: T, profileName?: string): Promise<BuildProfile<T>>;
    static getBuildProfileDeprecationWarningsAsync(easJsonAccessor: EasJsonAccessor, platform: Platform, profileName: string): Promise<EasJsonDeprecationWarning[]>;
    private static getCustomPathsDeprecationWarnings;
    static getCliConfigAsync(accessor: EasJsonAccessor): Promise<EasJson['cli'] | null>;
    static getSubmitProfileNamesAsync(accessor: EasJsonAccessor): Promise<string[]>;
    static getSubmitProfileAsync<T extends Platform>(accessor: EasJsonAccessor, platform: T, profileName?: string): Promise<SubmitProfile<T>>;
}
export {};
