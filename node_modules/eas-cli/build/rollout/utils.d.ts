import { Rollout } from './branch-mapping';
import { RuntimeFragment, UpdateBranchBasicInfoFragment, UpdateFragment } from '../graphql/generated';
import { UpdateBranchObject, UpdateChannelObject } from '../graphql/queries/ChannelQuery';
export declare function printRollout(channel: UpdateChannelObject): void;
export declare function displayRolloutDetails(channelName: string, rollout: Rollout<UpdateBranchBasicInfoFragment>): void;
export declare function formatBranchWithUpdateGroup(maybeUpdateGroup: UpdateFragment[] | undefined | null, branch: UpdateBranchObject, percentRolledOut: number): string;
export declare function formatRuntimeWithUpdateGroup(maybeUpdateGroup: UpdateFragment[] | undefined | null, runtime: RuntimeFragment, branchName: string): string;
export declare function promptForRolloutPercentAsync({ promptMessage, }: {
    promptMessage: string;
}): Promise<number>;
