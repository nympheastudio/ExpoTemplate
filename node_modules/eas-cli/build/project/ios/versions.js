"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextBuildNumber = exports.isValidBuildNumber = exports.BUILD_NUMBER_REQUIREMENTS = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
exports.BUILD_NUMBER_REQUIREMENTS = `buildNumber needs to consist only of up to 3 dot-separated positive integers`;
function isValidBuildNumber(buildNumber) {
    return !!buildNumber.match(/^\d+(\.\d+)?(\.\d+)?$/);
}
exports.isValidBuildNumber = isValidBuildNumber;
function getNextBuildNumber(buildNumber) {
    (0, assert_1.default)(isValidBuildNumber(buildNumber), `Invalid buildNumber ${buildNumber}`);
    const comps = buildNumber.split('.');
    comps[comps.length - 1] = String(Number(comps[comps.length - 1]) + 1);
    return comps.join('.');
}
exports.getNextBuildNumber = getNextBuildNumber;
