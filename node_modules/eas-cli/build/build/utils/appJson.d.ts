import * as ExpoConfig from '@expo/config';
export declare function updateAppJsonConfigAsync({ projectDir, exp, }: {
    projectDir: string;
    exp: ExpoConfig.ExpoConfig;
}, modifyConfig: (config: any) => void): Promise<void>;
export declare function readAppJson(appJsonPath: string): any;
