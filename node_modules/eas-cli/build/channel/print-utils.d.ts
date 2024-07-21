import { UpdateChannelObject } from '../graphql/queries/ChannelQuery';
import { FormattedBranchDescription } from '../update/utils';
/**
 * Log all the branches associated with the channel and their most recent update group
 */
export declare function logChannelDetails(channel: UpdateChannelObject): void;
export declare function getDescriptionByBranchId(channel: UpdateChannelObject): Record<string, FormattedBranchDescription>;
