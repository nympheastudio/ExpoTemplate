import { BranchMapping, BranchMappingAlwaysTrue } from '../channel/branch-mapping';
import { BranchBasicInfo, ChannelBasicInfo, UpdateChannelInfoWithBranches } from '../channel/utils';
export type Rollout<Branch extends BranchBasicInfo> = LegacyRollout<Branch> | ConstrainedRollout<Branch>;
export type RolloutInfo = LegacyRolloutInfo | ConstrainedRolloutInfo;
type ConstrainedRollout<Branch extends BranchBasicInfo> = LegacyRollout<Branch> & {
    runtimeVersion: string;
};
type LegacyRollout<Branch extends BranchBasicInfo> = {
    rolledOutBranch: Branch;
    defaultBranch: Branch;
} & LegacyRolloutInfo;
type ConstrainedRolloutInfo = LegacyRolloutInfo & {
    runtimeVersion: string;
};
type LegacyRolloutInfo = {
    rolledOutBranchId: string;
    percentRolledOut: number;
    defaultBranchId: string;
};
export type RolloutBranchMapping = LegacyRolloutBranchMapping | ConstrainedRolloutBranchMapping;
type RolloutNode = {
    clientKey: 'rolloutToken';
    branchMappingOperator: 'hash_lt';
    operand: number;
};
type RuntimeVersionNode = {
    clientKey: 'runtimeVersion';
    branchMappingOperator: '==';
    operand: string;
};
type RtvConstrainedRolloutNode = ['and', RolloutNode, RuntimeVersionNode] | ['and', RuntimeVersionNode, RolloutNode];
export type LegacyRolloutBranchMapping = {
    version: number;
    data: [
        {
            branchId: string;
            branchMappingLogic: RolloutNode;
        },
        {
            branchId: string;
            branchMappingLogic: BranchMappingAlwaysTrue;
        }
    ];
};
export type ConstrainedRolloutBranchMapping = {
    version: number;
    data: [
        {
            branchId: string;
            branchMappingLogic: RtvConstrainedRolloutNode;
        },
        {
            branchId: string;
            branchMappingLogic: BranchMappingAlwaysTrue;
        }
    ];
};
export declare function isLegacyRolloutInfo(rollout: RolloutInfo): rollout is LegacyRolloutInfo;
export declare function isConstrainedRolloutInfo(rollout: RolloutInfo): rollout is ConstrainedRolloutInfo;
export declare function isConstrainedRollout<Branch extends BranchBasicInfo>(rollout: Rollout<Branch>): rollout is ConstrainedRollout<Branch>;
export declare function getRolloutInfo(basicChannelInfo: ChannelBasicInfo): RolloutInfo;
export declare function getRolloutInfoFromBranchMapping(branchMapping: RolloutBranchMapping): RolloutInfo;
export declare function getRollout<Branch extends BranchBasicInfo>(channel: UpdateChannelInfoWithBranches<Branch>): Rollout<Branch>;
export declare function composeRollout<Branch extends BranchBasicInfo>(rolloutInfo: RolloutInfo, defaultBranch: Branch, rolledOutBranch: Branch): Rollout<Branch>;
export declare function getRolloutBranchMapping(branchMappingString: string): RolloutBranchMapping;
/**
 * Detect if a branch mapping is a rollout.
 *
 * Types of rollout:
 * 1. Legacy unconstrained rollout:
 * Maps to a rollout branch via a rollout token
 * Falls back to a default branch
 *
 * Example:
 * {
    version: 0,
    data: [
      {
        branchId: uuidv4(),
        branchMappingLogic: {
          operand: 10 / 100,
          clientKey: 'rolloutToken',
          branchMappingOperator: hashLtOperator(),
        },
      },
      { branchId: uuidv4(), branchMappingLogic: alwaysTrue() },
    ],
  }
  *
  * 2. RTV constrained rollout:
  * Maps to a rollout branch via a rollout token, constrained by runtime version
  * Falls back to a default branch
  *
  * Example:
  * {
    version: 0,
    data: [
      {
        branchId: uuidv4(),
        branchMappingLogic: andStatement([
          {
            operand: '1.0.0',
            clientKey: 'runtimeVersion',
            branchMappingOperator: equalsOperator(),
          },
          {
            operand: 10 / 100,
            clientKey: 'rolloutToken',
            branchMappingOperator: hashLtOperator(),
          },
        ]),
      },
      { branchId: uuidv4(), branchMappingLogic: alwaysTrue() },
    ],
  }
 */
export declare function isRolloutBranchMapping(branchMapping: BranchMapping): branchMapping is RolloutBranchMapping;
export declare function isRollout(channelInfo: ChannelBasicInfo): boolean;
export declare function doesTargetRollout(branchMapping: RolloutBranchMapping, runtimeVersion: string): boolean;
export declare function createRolloutBranchMapping({ defaultBranchId, rolloutBranchId, percent, runtimeVersion, }: {
    defaultBranchId: string;
    rolloutBranchId: string;
    percent: number;
    runtimeVersion: string;
}): ConstrainedRolloutBranchMapping;
export declare function editRolloutBranchMapping(branchMapping: RolloutBranchMapping, percent: number): RolloutBranchMapping;
export declare function assertRolloutBranchMapping(branchMapping: BranchMapping): asserts branchMapping is RolloutBranchMapping;
export {};
