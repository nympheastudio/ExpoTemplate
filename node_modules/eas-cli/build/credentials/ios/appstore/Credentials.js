"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPushKey = exports.formatPushKey = exports.isDistributionCertificate = exports.formatDistributionCertificate = void 0;
const tslib_1 = require("tslib");
const dateformat_1 = tslib_1.__importDefault(require("dateformat"));
function formatDistributionCertificate({ name, id, status, expires, created, ownerName, }) {
    const expiresDate = formatTimestamp(expires);
    const createdDate = formatTimestamp(created);
    return `${name} (${status}) - ID: ${id} - expires: ${expiresDate} (created: ${createdDate}) - owner: ${ownerName}`;
}
exports.formatDistributionCertificate = formatDistributionCertificate;
function isDistributionCertificate(val) {
    return (val.certP12 &&
        typeof val.certP12 === 'string' &&
        val.certPassword &&
        typeof val.certPassword === 'string' &&
        val.teamId &&
        typeof val.teamId === 'string');
}
exports.isDistributionCertificate = isDistributionCertificate;
function formatPushKey({ id, name }) {
    return `${name} - ID: ${id}`;
}
exports.formatPushKey = formatPushKey;
function isPushKey(obj) {
    return (obj.apnsKeyP8 &&
        typeof obj.apnsKeyP8 === 'string' &&
        obj.apnsKeyId &&
        typeof obj.apnsKeyId === 'string' &&
        obj.teamId &&
        typeof obj.teamId === 'string');
}
exports.isPushKey = isPushKey;
function formatTimestamp(timestamp) {
    return (0, dateformat_1.default)(new Date(timestamp * 1000));
}
