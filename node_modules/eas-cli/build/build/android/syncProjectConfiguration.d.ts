import { ExpoConfig } from '@expo/config';
import { Env } from '@expo/eas-build-job';
import { AndroidVersionAutoIncrement } from '@expo/eas-json';
import { Client } from '../../vcs/vcs';
export declare function syncProjectConfigurationAsync({ projectDir, exp, localAutoIncrement, vcsClient, env, }: {
    projectDir: string;
    exp: ExpoConfig;
    localAutoIncrement?: AndroidVersionAutoIncrement;
    vcsClient: Client;
    env: Env | undefined;
}): Promise<void>;
export declare function cleanUpOldEasBuildGradleScriptAsync(projectDir: string): Promise<void>;
