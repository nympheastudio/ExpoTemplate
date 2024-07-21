export type ChannelBasicInfo = {
    id: string;
    name: string;
    branchMapping: string;
};
export type BranchBasicInfo = {
    id: string;
    name: string;
};
export type UpdateChannelInfoWithBranches<Branch extends BranchBasicInfo> = ChannelBasicInfo & {
    updateBranches: Branch[];
};
export declare function getUpdateBranch<Branch extends BranchBasicInfo>(channel: UpdateChannelInfoWithBranches<Branch>, branchId: string): Branch;
