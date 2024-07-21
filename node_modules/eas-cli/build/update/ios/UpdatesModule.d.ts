import { ExpoConfig } from '@expo/config';
import { Env, Workflow } from '@expo/eas-build-job';
import { Client } from '../../vcs/vcs';
export declare function syncUpdatesConfigurationAsync({ vcsClient, projectDir, exp, workflow, env, }: {
    vcsClient: Client;
    projectDir: string;
    exp: ExpoConfig;
    workflow: Workflow;
    env: Env | undefined;
}): Promise<void>;
export declare function readChannelSafelyAsync(projectDir: string): Promise<string | null>;
