import { ProfileData } from '../../utils/profiles';
import { Client } from '../../vcs/vcs';
export declare function ensureExpoDevClientInstalledForDevClientBuildsAsync({ projectDir, vcsClient, nonInteractive, buildProfiles, }: {
    projectDir: string;
    vcsClient: Client;
    nonInteractive?: boolean;
    buildProfiles?: ProfileData<'build'>[];
}): Promise<void>;
