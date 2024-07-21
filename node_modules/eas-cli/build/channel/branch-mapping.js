"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchMappingValidationError = exports.assertString = exports.assertNumber = exports.assertNodeObject = exports.assertStatement = exports.assertVersion = exports.hashLtOperator = exports.equalsOperator = exports.alwaysTrue = exports.isAlwaysTrue = exports.andStatement = exports.isNodeObject = exports.isStatement = exports.isAndStatement = exports.getNodesFromStatement = exports.getBranchMapping = exports.getBranchIds = exports.isAlwaysTrueBranchMapping = exports.isEmptyBranchMapping = exports.getStandardBranchId = exports.hasStandardBranchMap = exports.hasEmptyBranchMap = exports.getAlwaysTrueBranchMapping = exports.getEmptyBranchMapping = void 0;
function getEmptyBranchMapping() {
    return {
        version: 0,
        data: [],
    };
}
exports.getEmptyBranchMapping = getEmptyBranchMapping;
function getAlwaysTrueBranchMapping(branchId) {
    return {
        version: 0,
        data: [
            {
                branchId,
                branchMappingLogic: 'true',
            },
        ],
    };
}
exports.getAlwaysTrueBranchMapping = getAlwaysTrueBranchMapping;
function hasEmptyBranchMap(channelInfo) {
    const branchMapping = getBranchMapping(channelInfo.branchMapping);
    return isEmptyBranchMapping(branchMapping);
}
exports.hasEmptyBranchMap = hasEmptyBranchMap;
function hasStandardBranchMap(channelInfo) {
    const branchMapping = getBranchMapping(channelInfo.branchMapping);
    return isAlwaysTrueBranchMapping(branchMapping);
}
exports.hasStandardBranchMap = hasStandardBranchMap;
function getStandardBranchId(channelInfo) {
    const branchMapping = getBranchMapping(channelInfo.branchMapping);
    assertAlwaysTrueBranchMapping(branchMapping);
    return getBranchIdFromStandardMapping(branchMapping);
}
exports.getStandardBranchId = getStandardBranchId;
function isEmptyBranchMapping(branchMapping) {
    return branchMapping.data.length === 0;
}
exports.isEmptyBranchMapping = isEmptyBranchMapping;
function isAlwaysTrueBranchMapping(branchMapping) {
    const numBranches = branchMapping.data.length;
    if (numBranches !== 1) {
        return false;
    }
    const branchMappingLogic = branchMapping.data[0].branchMappingLogic;
    return isAlwaysTrue(branchMappingLogic);
}
exports.isAlwaysTrueBranchMapping = isAlwaysTrueBranchMapping;
function getBranchIdFromStandardMapping(branchMapping) {
    return branchMapping.data[0].branchId;
}
function getBranchIds(branchMapping) {
    return branchMapping.data.map(data => data.branchId);
}
exports.getBranchIds = getBranchIds;
function getBranchMapping(branchMappingString) {
    try {
        return JSON.parse(branchMappingString);
    }
    catch {
        throw new Error(`Could not parse branchMapping string into a JSON: "${branchMappingString}"`);
    }
}
exports.getBranchMapping = getBranchMapping;
function getNodesFromStatement(statement) {
    return statement.slice(1);
}
exports.getNodesFromStatement = getNodesFromStatement;
function isAndStatement(statement) {
    return statement[0] === 'and';
}
exports.isAndStatement = isAndStatement;
function isStatement(node) {
    return Array.isArray(node);
}
exports.isStatement = isStatement;
function isNodeObject(node) {
    return typeof node === 'object' && !isStatement(node);
}
exports.isNodeObject = isNodeObject;
function andStatement(nodes) {
    return ['and', ...nodes];
}
exports.andStatement = andStatement;
function isAlwaysTrue(node) {
    return node === 'true';
}
exports.isAlwaysTrue = isAlwaysTrue;
function alwaysTrue() {
    return 'true';
}
exports.alwaysTrue = alwaysTrue;
function equalsOperator() {
    return '==';
}
exports.equalsOperator = equalsOperator;
function hashLtOperator() {
    return 'hash_lt';
}
exports.hashLtOperator = hashLtOperator;
function isVersion(branchMapping, version) {
    return branchMapping.version === version;
}
function assertVersion(channelInfo, version) {
    const branchMapping = getBranchMapping(channelInfo.branchMapping);
    if (!isVersion(branchMapping, version)) {
        throw new BranchMappingValidationError(`Expected branch mapping version ${version}. Received: ${JSON.stringify(branchMapping)}`);
    }
}
exports.assertVersion = assertVersion;
function assertStatement(node) {
    if (!isStatement(node)) {
        throw new BranchMappingValidationError('Branch mapping node must be a statement. Received: ' + JSON.stringify(node));
    }
}
exports.assertStatement = assertStatement;
function assertNodeObject(node) {
    if (!isNodeObject(node)) {
        throw new BranchMappingValidationError('Branch mapping node must be an object. Received: ' + JSON.stringify(node));
    }
}
exports.assertNodeObject = assertNodeObject;
function assertNumber(operand) {
    if (typeof operand !== 'number') {
        throw new BranchMappingValidationError('Expected a number. Received: ' + JSON.stringify(operand));
    }
}
exports.assertNumber = assertNumber;
function assertString(operand) {
    if (typeof operand !== 'string') {
        throw new BranchMappingValidationError('Expected a string. Received: ' + JSON.stringify(operand));
    }
}
exports.assertString = assertString;
function assertAlwaysTrueBranchMapping(branchMapping) {
    if (!isAlwaysTrueBranchMapping(branchMapping)) {
        throw new BranchMappingValidationError('Expected standard branch mapping. Received: ' + JSON.stringify(branchMapping));
    }
}
class BranchMappingValidationError extends Error {
}
exports.BranchMappingValidationError = BranchMappingValidationError;
