import { ExpoConfig } from '@expo/config';
import { Env, Workflow } from '@expo/eas-build-job';
/**
 * Synchronize updates configuration to native files. This needs to do essentially the same thing as `withUpdates`
 */
export declare function syncUpdatesConfigurationAsync({ projectDir, exp, workflow, env, }: {
    projectDir: string;
    exp: ExpoConfig;
    workflow: Workflow;
    env: Env | undefined;
}): Promise<void>;
export declare function readChannelSafelyAsync(projectDir: string): Promise<string | null>;
