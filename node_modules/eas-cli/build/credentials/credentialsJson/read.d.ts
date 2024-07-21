import { AndroidCredentials, IosCredentials } from './types';
import { Target } from '../ios/types';
export declare function readAndroidCredentialsAsync(projectDir: string): Promise<AndroidCredentials>;
export declare function readIosCredentialsAsync(projectDir: string, applicationTarget: Target): Promise<IosCredentials>;
export declare function readRawAsync(projectDir: string, { throwIfMissing }?: {
    throwIfMissing?: boolean | undefined;
}): Promise<any>;
