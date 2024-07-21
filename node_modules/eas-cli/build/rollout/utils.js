"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptForRolloutPercentAsync = exports.formatRuntimeWithUpdateGroup = exports.formatBranchWithUpdateGroup = exports.displayRolloutDetails = exports.printRollout = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const branch_mapping_1 = require("./branch-mapping");
const log_1 = tslib_1.__importDefault(require("../log"));
const prompts_1 = require("../prompts");
const utils_1 = require("../update/utils");
const formatFields_1 = tslib_1.__importDefault(require("../utils/formatFields"));
function printRollout(channel) {
    if (!(0, branch_mapping_1.isRollout)(channel)) {
        log_1.default.log(`Channel ${chalk_1.default.bold(channel.name)} doesn't have a rollout.`);
        return;
    }
    const rollout = (0, branch_mapping_1.getRollout)(channel);
    displayRolloutDetails(channel.name, rollout);
}
exports.printRollout = printRollout;
function displayRolloutDetails(channelName, rollout) {
    const rolledOutPercent = rollout.percentRolledOut;
    log_1.default.newLine();
    log_1.default.log(chalk_1.default.bold('🚀 Rollout:'));
    log_1.default.log((0, formatFields_1.default)([
        { label: 'Channel', value: channelName },
        ...((0, branch_mapping_1.isConstrainedRollout)(rollout)
            ? [{ label: 'Runtime version', value: rollout.runtimeVersion }]
            : []),
        {
            label: 'Branches',
            value: `${rollout.rolledOutBranch.name} (${rolledOutPercent}%), ${rollout.defaultBranch.name} (${100 - rolledOutPercent}%)`,
        },
    ]));
    log_1.default.addNewLineIfNone();
}
exports.displayRolloutDetails = displayRolloutDetails;
function formatBranchWithUpdateGroup(maybeUpdateGroup, branch, percentRolledOut) {
    const lines = [];
    lines.push(chalk_1.default.bold(`➡️ 📱 Latest update on the ${chalk_1.default.bold(branch.name)} branch (${percentRolledOut}%)`));
    if (!maybeUpdateGroup) {
        lines.push(`No updates for target runtime`);
    }
    else {
        const [updateGroupDescription] = (0, utils_1.getUpdateGroupDescriptions)([maybeUpdateGroup]);
        lines.push(...formatUpdateGroup(updateGroupDescription));
    }
    return lines.join('\n    ');
}
exports.formatBranchWithUpdateGroup = formatBranchWithUpdateGroup;
function formatRuntimeWithUpdateGroup(maybeUpdateGroup, runtime, branchName) {
    const lines = [];
    lines.push(chalk_1.default.bold(`➡️ 📱 Latest update on the ${chalk_1.default.bold(branchName)} branch served to runtime ${chalk_1.default.bold(runtime.version)}:`));
    if (!maybeUpdateGroup) {
        lines.push(`No updates published for this runtime`);
    }
    else {
        const [updateGroupDescription] = (0, utils_1.getUpdateGroupDescriptions)([maybeUpdateGroup]);
        lines.push(...formatUpdateGroup(updateGroupDescription));
    }
    return lines.join('\n    ');
}
exports.formatRuntimeWithUpdateGroup = formatRuntimeWithUpdateGroup;
function formatUpdateGroup(updateGroup) {
    const lines = [];
    const formattedLines = (0, formatFields_1.default)([
        { label: 'Message', value: updateGroup.message ?? 'N/A' },
        { label: 'Runtime version', value: updateGroup.runtimeVersion ?? 'N/A' },
        { label: 'Platforms', value: updateGroup.platforms ?? 'N/A' },
        { label: 'Group ID', value: updateGroup.group ?? 'N/A' },
    ]).split('\n');
    lines.push(...formattedLines);
    return lines;
}
async function promptForRolloutPercentAsync({ promptMessage, }) {
    const { name: rolloutPercent } = await (0, prompts_1.promptAsync)({
        type: 'text',
        name: 'name',
        format: value => {
            return parseInt(value, 10);
        },
        message: promptMessage,
        initial: 0,
        validate: (rolloutPercent) => {
            const floatValue = parseFloat(rolloutPercent);
            return Number.isInteger(floatValue) && floatValue >= 0 && floatValue <= 100
                ? true
                : 'The rollout percentage must be an integer between 0 and 100 inclusive.';
        },
    });
    return rolloutPercent;
}
exports.promptForRolloutPercentAsync = promptForRolloutPercentAsync;
