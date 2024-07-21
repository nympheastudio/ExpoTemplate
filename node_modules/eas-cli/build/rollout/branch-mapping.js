"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRolloutBranchMapping = exports.editRolloutBranchMapping = exports.createRolloutBranchMapping = exports.doesTargetRollout = exports.isRollout = exports.isRolloutBranchMapping = exports.getRolloutBranchMapping = exports.composeRollout = exports.getRollout = exports.getRolloutInfoFromBranchMapping = exports.getRolloutInfo = exports.isConstrainedRollout = exports.isConstrainedRolloutInfo = exports.isLegacyRolloutInfo = void 0;
const branch_mapping_1 = require("../channel/branch-mapping");
const utils_1 = require("../channel/utils");
function isLegacyRolloutInfo(rollout) {
    return !isConstrainedRolloutInfo(rollout);
}
exports.isLegacyRolloutInfo = isLegacyRolloutInfo;
function isConstrainedRolloutInfo(rollout) {
    return 'runtimeVersion' in rollout;
}
exports.isConstrainedRolloutInfo = isConstrainedRolloutInfo;
function isConstrainedRollout(rollout) {
    return isConstrainedRolloutInfo(rollout);
}
exports.isConstrainedRollout = isConstrainedRollout;
function getRolloutInfo(basicChannelInfo) {
    const rolloutBranchMapping = getRolloutBranchMapping(basicChannelInfo.branchMapping);
    return getRolloutInfoFromBranchMapping(rolloutBranchMapping);
}
exports.getRolloutInfo = getRolloutInfo;
function getRolloutInfoFromBranchMapping(branchMapping) {
    const rolledOutBranchId = branchMapping.data[0].branchId;
    const defaultBranchId = branchMapping.data[1].branchId;
    if (isRtvConstrainedRollout(branchMapping)) {
        const statementNode = branchMapping.data[0].branchMappingLogic;
        (0, branch_mapping_1.assertStatement)(statementNode);
        const nodesFromStatement = (0, branch_mapping_1.getNodesFromStatement)(statementNode);
        const runtimeVersionNode = nodesFromStatement.find(isRuntimeVersionNode);
        if (!runtimeVersionNode) {
            throw new branch_mapping_1.BranchMappingValidationError('Runtime version node must be defined.');
        }
        (0, branch_mapping_1.assertNodeObject)(runtimeVersionNode);
        const runtimeVersion = runtimeVersionNode.operand;
        (0, branch_mapping_1.assertString)(runtimeVersion);
        const rolloutNode = nodesFromStatement.find(isRolloutNode);
        if (!rolloutNode) {
            throw new branch_mapping_1.BranchMappingValidationError('Rollout node must be defined.');
        }
        (0, branch_mapping_1.assertNodeObject)(rolloutNode);
        const operand = rolloutNode.operand;
        (0, branch_mapping_1.assertNumber)(operand);
        return {
            rolledOutBranchId,
            percentRolledOut: Math.round(operand * 100),
            runtimeVersion,
            defaultBranchId,
        };
    }
    else {
        const rolloutNode = branchMapping.data[0].branchMappingLogic;
        (0, branch_mapping_1.assertNodeObject)(rolloutNode);
        const operand = rolloutNode.operand;
        (0, branch_mapping_1.assertNumber)(operand);
        return {
            rolledOutBranchId,
            percentRolledOut: Math.round(operand * 100),
            defaultBranchId,
        };
    }
}
exports.getRolloutInfoFromBranchMapping = getRolloutInfoFromBranchMapping;
function getRollout(channel) {
    const rolloutBranchMapping = getRolloutBranchMapping(channel.branchMapping);
    const rolledOutBranchId = rolloutBranchMapping.data[0].branchId;
    const rolledOutBranch = (0, utils_1.getUpdateBranch)(channel, rolledOutBranchId);
    const defaultBranchId = rolloutBranchMapping.data[1].branchId;
    const defaultBranch = (0, utils_1.getUpdateBranch)(channel, defaultBranchId);
    const rolloutInfo = getRolloutInfo(channel);
    return composeRollout(rolloutInfo, defaultBranch, rolledOutBranch);
}
exports.getRollout = getRollout;
function composeRollout(rolloutInfo, defaultBranch, rolledOutBranch) {
    if (rolloutInfo.defaultBranchId !== defaultBranch.id) {
        throw new branch_mapping_1.BranchMappingValidationError(`Default branch id must match. Received: ${JSON.stringify(rolloutInfo)} ${defaultBranch.id}`);
    }
    if (rolloutInfo.rolledOutBranchId !== rolledOutBranch.id) {
        throw new branch_mapping_1.BranchMappingValidationError(`Rolled out branch id must match. Received: ${JSON.stringify(rolloutInfo)} ${rolledOutBranch.id}`);
    }
    return {
        ...rolloutInfo,
        rolledOutBranch,
        defaultBranch,
    };
}
exports.composeRollout = composeRollout;
function getRolloutBranchMapping(branchMappingString) {
    const branchMapping = (0, branch_mapping_1.getBranchMapping)(branchMappingString);
    assertRolloutBranchMapping(branchMapping);
    return branchMapping;
}
exports.getRolloutBranchMapping = getRolloutBranchMapping;
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
function isRolloutBranchMapping(branchMapping) {
    return isUnconstrainedRollout(branchMapping) || isRtvConstrainedRollout(branchMapping);
}
exports.isRolloutBranchMapping = isRolloutBranchMapping;
function isRollout(channelInfo) {
    const branchMapping = (0, branch_mapping_1.getBranchMapping)(channelInfo.branchMapping);
    return isRolloutBranchMapping(branchMapping);
}
exports.isRollout = isRollout;
function doesTargetRollout(branchMapping, runtimeVersion) {
    const rolloutInfo = getRolloutInfoFromBranchMapping(branchMapping);
    if (!isConstrainedRolloutInfo(rolloutInfo)) {
        return true;
    }
    return rolloutInfo.runtimeVersion === runtimeVersion;
}
exports.doesTargetRollout = doesTargetRollout;
function createRolloutBranchMapping({ defaultBranchId, rolloutBranchId, percent, runtimeVersion, }) {
    assertPercent(percent);
    return {
        version: 0,
        data: [
            {
                branchId: rolloutBranchId,
                branchMappingLogic: [
                    'and',
                    {
                        operand: runtimeVersion,
                        clientKey: 'runtimeVersion',
                        branchMappingOperator: '==',
                    },
                    {
                        operand: percent / 100,
                        clientKey: 'rolloutToken',
                        branchMappingOperator: 'hash_lt',
                    },
                ],
            },
            { branchId: defaultBranchId, branchMappingLogic: (0, branch_mapping_1.alwaysTrue)() },
        ],
    };
}
exports.createRolloutBranchMapping = createRolloutBranchMapping;
function editRolloutBranchMapping(branchMapping, percent) {
    assertPercent(percent);
    if (isRtvConstrainedRollout(branchMapping)) {
        return editRtvConstrainedRollout(branchMapping, percent);
    }
    else {
        return editLegacyRollout(branchMapping, percent);
    }
}
exports.editRolloutBranchMapping = editRolloutBranchMapping;
function editRtvConstrainedRollout(branchMapping, percent) {
    const newBranchMapping = { ...branchMapping };
    const statementNode = newBranchMapping.data[0].branchMappingLogic;
    const nodesFromStatement = (0, branch_mapping_1.getNodesFromStatement)(statementNode);
    const rolloutNode = nodesFromStatement.find(isRolloutNode);
    if (!rolloutNode) {
        throw new branch_mapping_1.BranchMappingValidationError('Rollout node must be defined.');
    }
    rolloutNode.operand = percent / 100;
    return newBranchMapping;
}
function editLegacyRollout(branchMapping, percent) {
    const newBranchMapping = { ...branchMapping };
    const rolloutNode = newBranchMapping.data[0].branchMappingLogic;
    rolloutNode.operand = percent / 100;
    return newBranchMapping;
}
function isRtvConstrainedRollout(branchMapping) {
    if (branchMapping.data.length !== 2) {
        return false;
    }
    const hasRtvRolloutNode = isRtvConstrainedRolloutNode(branchMapping.data[0].branchMappingLogic);
    const defaultsToAlwaysTrueNode = (0, branch_mapping_1.isAlwaysTrue)(branchMapping.data[1].branchMappingLogic);
    return hasRtvRolloutNode && defaultsToAlwaysTrueNode;
}
function isRtvConstrainedRolloutNode(node) {
    if (!(0, branch_mapping_1.isStatement)(node) || !(0, branch_mapping_1.isAndStatement)(node)) {
        return false;
    }
    const statementNodes = (0, branch_mapping_1.getNodesFromStatement)(node);
    if (statementNodes.length !== 2) {
        return false;
    }
    const hasRuntimeVersionNode = statementNodes.some(isRuntimeVersionNode);
    const hasRolloutNode = statementNodes.some(isRolloutNode);
    return hasRuntimeVersionNode && hasRolloutNode;
}
function isUnconstrainedRollout(branchMapping) {
    if (branchMapping.data.length !== 2) {
        return false;
    }
    const hasRolloutNode = isRolloutNode(branchMapping.data[0].branchMappingLogic);
    const defaultsToAlwaysTrueNode = (0, branch_mapping_1.isAlwaysTrue)(branchMapping.data[1].branchMappingLogic);
    return hasRolloutNode && defaultsToAlwaysTrueNode;
}
function isRuntimeVersionNode(node) {
    if (typeof node === 'string') {
        return false;
    }
    if (Array.isArray(node)) {
        return false;
    }
    return node.clientKey === 'runtimeVersion' && node.branchMappingOperator === '==';
}
function isRolloutNode(node) {
    if (typeof node === 'string') {
        return false;
    }
    if (Array.isArray(node)) {
        return false;
    }
    return node.clientKey === 'rolloutToken' && node.branchMappingOperator === 'hash_lt';
}
function assertRolloutBranchMapping(branchMapping) {
    if (!isRolloutBranchMapping(branchMapping)) {
        throw new branch_mapping_1.BranchMappingValidationError('Branch mapping node must be a rollout. Received: ' + JSON.stringify(branchMapping));
    }
}
exports.assertRolloutBranchMapping = assertRolloutBranchMapping;
function assertPercent(percent) {
    const isPercent = Number.isInteger(percent) && percent >= 0 && percent <= 100;
    if (!isPercent) {
        throw new branch_mapping_1.BranchMappingValidationError(`The percentage must be an integer between 0 and 100 inclusive. Received: ${percent}`);
    }
}
