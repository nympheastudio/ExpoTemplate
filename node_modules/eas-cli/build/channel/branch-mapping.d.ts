import { ChannelBasicInfo } from './utils';
export type BranchMappingOperator = '==' | '!=' | '<' | '>' | '<=' | '>=' | 'in' | 'regex' | 'hash_lt' | 'hash_lte' | 'hash_gt' | 'hash_gte';
export type BranchMappingObject = {
    clientKey: string;
    branchMappingOperator: BranchMappingOperator;
    operand: number | string | string[];
};
export type BranchMappingAlwaysTrue = 'true';
export type BranchMappingStatement = ['and' | 'or', ...BranchMappingNode[]] | ['not', BranchMappingNode];
export type BranchMappingNode = BranchMappingAlwaysTrue | BranchMappingObject | BranchMappingStatement;
export type BranchMapping = {
    version: number;
    data: {
        branchId: string;
        branchMappingLogic: BranchMappingNode;
    }[];
};
export type AlwaysTrueBranchMapping = {
    version: number;
    data: [
        {
            branchId: string;
            branchMappingLogic: BranchMappingAlwaysTrue;
        }
    ];
};
export type EmptyBranchMapping = {
    version: number;
    data: [];
};
export declare function getEmptyBranchMapping(): EmptyBranchMapping;
export declare function getAlwaysTrueBranchMapping(branchId: string): AlwaysTrueBranchMapping;
export declare function hasEmptyBranchMap(channelInfo: ChannelBasicInfo): boolean;
export declare function hasStandardBranchMap(channelInfo: ChannelBasicInfo): boolean;
export declare function getStandardBranchId(channelInfo: ChannelBasicInfo): string;
export declare function isEmptyBranchMapping(branchMapping: BranchMapping): branchMapping is EmptyBranchMapping;
export declare function isAlwaysTrueBranchMapping(branchMapping: BranchMapping): branchMapping is AlwaysTrueBranchMapping;
export declare function getBranchIds(branchMapping: BranchMapping): string[];
export declare function getBranchMapping(branchMappingString: string): BranchMapping;
export declare function getNodesFromStatement(statement: BranchMappingStatement): BranchMappingNode[];
export declare function isAndStatement(statement: BranchMappingStatement): statement is BranchMappingStatement;
export declare function isStatement(node: BranchMappingNode): node is BranchMappingStatement;
export declare function isNodeObject(node: BranchMappingNode): node is BranchMappingObject;
export declare function andStatement(nodes: BranchMappingNode[]): ['and', ...BranchMappingNode[]];
export declare function isAlwaysTrue(node: BranchMappingNode): boolean;
export declare function alwaysTrue(): BranchMappingAlwaysTrue;
export declare function equalsOperator(): BranchMappingOperator;
export declare function hashLtOperator(): BranchMappingOperator;
export declare function assertVersion(channelInfo: ChannelBasicInfo, version: number): void;
export declare function assertStatement(node: BranchMappingNode): asserts node is BranchMappingStatement;
export declare function assertNodeObject(node: BranchMappingNode): asserts node is BranchMappingObject;
export declare function assertNumber(operand: string | number | string[]): asserts operand is number;
export declare function assertString(operand: string | number | string[]): asserts operand is string;
export declare class BranchMappingValidationError extends Error {
}
