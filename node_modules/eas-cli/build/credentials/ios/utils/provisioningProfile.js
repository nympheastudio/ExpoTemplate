"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.isEnterpriseUniversalProfile = exports.isAdHocProfile = exports.readProfileName = exports.readAppleTeam = void 0;
const tslib_1 = require("tslib");
const plist_1 = tslib_1.__importDefault(require("@expo/plist"));
function readAppleTeam(dataBase64) {
    const profilePlist = parse(dataBase64);
    const teamId = profilePlist['TeamIdentifier']?.[0];
    const teamName = profilePlist['TeamName'];
    if (!teamId) {
        throw new Error('Team identifier is missing from provisioning profile');
    }
    return { teamId, teamName };
}
exports.readAppleTeam = readAppleTeam;
function readProfileName(dataBase64) {
    const profilePlist = parse(dataBase64);
    return profilePlist['Name'];
}
exports.readProfileName = readProfileName;
function isAdHocProfile(dataBase64) {
    const profilePlist = parse(dataBase64);
    const provisionedDevices = profilePlist['ProvisionedDevices'];
    return Array.isArray(provisionedDevices);
}
exports.isAdHocProfile = isAdHocProfile;
function isEnterpriseUniversalProfile(dataBase64) {
    const profilePlist = parse(dataBase64);
    return !!profilePlist['ProvisionsAllDevices'];
}
exports.isEnterpriseUniversalProfile = isEnterpriseUniversalProfile;
function parse(dataBase64) {
    try {
        const buffer = Buffer.from(dataBase64, 'base64');
        const profile = buffer.toString('utf8');
        return plist_1.default.parse(profile);
    }
    catch {
        throw new Error('Provisioning profile is malformed');
    }
}
exports.parse = parse;
