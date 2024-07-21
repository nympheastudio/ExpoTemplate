import { ExpoConfig } from '@expo/config';
export declare function ensureStaticConfigExists(projectDir: string): void;
export declare function bumpAppVersionAsync({ appVersion, projectDir, exp, }: {
    appVersion: string;
    projectDir: string;
    exp: ExpoConfig;
}): Promise<void>;
