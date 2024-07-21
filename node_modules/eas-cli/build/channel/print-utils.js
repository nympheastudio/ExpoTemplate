"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescriptionByBranchId = exports.logChannelDetails = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const branch_mapping_1 = require("./branch-mapping");
const log_1 = tslib_1.__importDefault(require("../log"));
const branch_mapping_2 = require("../rollout/branch-mapping");
const utils_1 = require("../update/utils");
/**
 * Log all the branches associated with the channel and their most recent update group
 */
function logChannelDetails(channel) {
    (0, branch_mapping_1.assertVersion)(channel, 0);
    const doesSupportMapping = (0, branch_mapping_1.hasEmptyBranchMap)(channel) || (0, branch_mapping_1.hasStandardBranchMap)(channel) || (0, branch_mapping_2.isRollout)(channel);
    if (!doesSupportMapping) {
        log_1.default.log(chalk_1.default.dim('Custom branch mapping detected.'));
        return;
    }
    const branchDescriptionByBranchId = getDescriptionByBranchId(channel);
    const entries = Object.entries(branchDescriptionByBranchId);
    if (entries.length === 0) {
        log_1.default.log(chalk_1.default.dim('No branches are pointed to this channel.'));
    }
    else {
        log_1.default.log(entries
            .map(([_branchId, description]) => (0, utils_1.formatBranch)(description))
            .join(`\n\n${chalk_1.default.dim('———')}\n\n`));
    }
}
exports.logChannelDetails = logChannelDetails;
function getDescriptionByBranchId(channel) {
    return channel.updateBranches.reduce((acc, branch) => {
        const maybeRollout = (0, branch_mapping_2.isRollout)(channel) ? (0, branch_mapping_2.getRollout)(channel) : null;
        let maybePercentOnBranch = undefined;
        if (maybeRollout) {
            maybePercentOnBranch =
                maybeRollout.rolledOutBranchId === branch.id
                    ? maybeRollout.percentRolledOut
                    : 100 - maybeRollout.percentRolledOut;
        }
        if (branch.updateGroups.length === 0) {
            acc[branch.id] = { branch: branch.name, branchRolloutPercentage: maybePercentOnBranch };
            return acc;
        }
        const updateGroupsWithBranchDescriptions = (0, utils_1.getUpdateGroupDescriptionsWithBranch)(branch.updateGroups);
        // display the most recent update group
        const updateGroupWithBranchDescription = updateGroupsWithBranchDescriptions[0];
        const { branch: branchName, ...updateGroup } = updateGroupWithBranchDescription;
        acc[branch.id] = {
            branch: branchName,
            branchRolloutPercentage: maybePercentOnBranch,
            update: updateGroup,
        };
        return acc;
    }, {});
}
exports.getDescriptionByBranchId = getDescriptionByBranchId;
