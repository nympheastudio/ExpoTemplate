import { ExpoConfig } from '@expo/config';
import { Env } from '@expo/eas-build-job';
import { IosVersionAutoIncrement } from '@expo/eas-json';
import { Target } from '../../credentials/ios/types';
import { Client } from '../../vcs/vcs';
export declare function syncProjectConfigurationAsync({ projectDir, exp, targets, localAutoIncrement, vcsClient, env, }: {
    projectDir: string;
    exp: ExpoConfig;
    targets: Target[];
    localAutoIncrement?: IosVersionAutoIncrement;
    vcsClient: Client;
    env: Env | undefined;
}): Promise<void>;
