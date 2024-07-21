"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextVersionCode = exports.isValidVersionCode = exports.VERSION_CODE_REQUIREMENTS = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const MAX_VERSION_CODE = 2100000000;
exports.VERSION_CODE_REQUIREMENTS = `versionCode needs to be a positive integer smaller or equal to ${MAX_VERSION_CODE}`;
function isValidVersionCode(versionCode) {
    const numericVersionCode = typeof versionCode === 'string' ? Number(versionCode) : versionCode;
    return (Number.isInteger(numericVersionCode) &&
        numericVersionCode <= MAX_VERSION_CODE &&
        numericVersionCode > 0);
}
exports.isValidVersionCode = isValidVersionCode;
function getNextVersionCode(versionCode) {
    (0, assert_1.default)(isValidVersionCode(versionCode), `Invalid versionCode ${versionCode}`);
    const numericVersionCode = typeof versionCode === 'string' ? Number(versionCode) : versionCode;
    if (numericVersionCode >= MAX_VERSION_CODE) {
        throw new Error(`Invalid value: ${exports.VERSION_CODE_REQUIREMENTS}.`);
    }
    return numericVersionCode + 1;
}
exports.getNextVersionCode = getNextVersionCode;
