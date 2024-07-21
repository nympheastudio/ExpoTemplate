"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateBranch = void 0;
function getUpdateBranchNullable(channel, branchId) {
    const updateBranches = channel.updateBranches;
    const updateBranch = updateBranches.find(branch => branch.id === branchId);
    return updateBranch ?? null;
}
function getUpdateBranch(channel, branchId) {
    const updateBranch = getUpdateBranchNullable(channel, branchId);
    if (!updateBranch) {
        throw new Error(`Could not find branch with id "${branchId}" in branch-mapping of channel "${channel.name}"`);
    }
    return updateBranch;
}
exports.getUpdateBranch = getUpdateBranch;
