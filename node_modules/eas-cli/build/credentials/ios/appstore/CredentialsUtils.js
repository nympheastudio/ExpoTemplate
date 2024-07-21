"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidCertSerialNumbers = exports.sortCertificatesByExpiryDesc = exports.filterRevokedDistributionCerts = exports.filterRevokedDistributionCertsFromEasServers = exports.filterRevokedAndUntrackedPushKeysFromEasServersAsync = exports.filterRevokedAndUntrackedPushKeysAsync = void 0;
/**
 * Edge case: Uploaded push keys rely on the user to provide the keyIdentifier, which could be incorrect
 * It is possible an uploaded key could have a valid p8 but invalid identifier, making it impossible for us to
 * track it's status on the Apple Developer Portal
 */
async function filterRevokedAndUntrackedPushKeysAsync(pushKeys, pushInfoFromApple) {
    // if the credentials are valid, check it against apple to make sure it hasnt been revoked
    const validKeyIdsOnAppleServer = pushInfoFromApple.map(pushKey => pushKey.id);
    return pushKeys.filter(pushKey => {
        return validKeyIdsOnAppleServer.includes(pushKey.apnsKeyId);
    });
}
exports.filterRevokedAndUntrackedPushKeysAsync = filterRevokedAndUntrackedPushKeysAsync;
/**
 * Edge case: Uploaded push keys rely on the user to provide the keyIdentifier, which could be incorrect
 * It is possible an uploaded key could have a valid p8 but invalid identifier, making it impossible for us to
 * track it's status on the Apple Developer Portal
 */
async function filterRevokedAndUntrackedPushKeysFromEasServersAsync(pushKeys, pushInfoFromApple) {
    // if the credentials are valid, check it against apple to make sure it hasnt been revoked
    const validKeyIdsOnAppleServer = pushInfoFromApple.map(pushKey => pushKey.id);
    return pushKeys.filter(pushKey => {
        return validKeyIdsOnAppleServer.includes(pushKey.keyIdentifier);
    });
}
exports.filterRevokedAndUntrackedPushKeysFromEasServersAsync = filterRevokedAndUntrackedPushKeysFromEasServersAsync;
function filterRevokedDistributionCertsFromEasServers(distributionCerts, certInfoFromApple) {
    if (distributionCerts.length === 0) {
        return [];
    }
    // if the cert is valid, check it against apple to make sure it hasnt been revoked
    const validCertSerialsOnAppleServer = certInfoFromApple
        .filter(
    // remove expired certs
    cert => cert.expires > Math.floor(Date.now() / 1000))
        .map(cert => cert.serialNumber);
    return distributionCerts.filter(cert => validCertSerialsOnAppleServer.includes(cert.serialNumber));
}
exports.filterRevokedDistributionCertsFromEasServers = filterRevokedDistributionCertsFromEasServers;
function filterRevokedDistributionCerts(distributionCerts, certInfoFromApple) {
    if (distributionCerts.length === 0) {
        return [];
    }
    // if the credentials are valid, check it against apple to make sure it hasnt been revoked
    const validCertSerialsOnAppleServer = certInfoFromApple
        .filter(
    // remove expired certs
    cert => cert.expires > Math.floor(Date.now() / 1000))
        .map(cert => cert.serialNumber);
    const validDistributionCerts = distributionCerts.filter(cert => {
        if (!cert.distCertSerialNumber) {
            return false;
        }
        return validCertSerialsOnAppleServer.includes(cert.distCertSerialNumber);
    });
    return validDistributionCerts;
}
exports.filterRevokedDistributionCerts = filterRevokedDistributionCerts;
function sortCertificatesByExpiryDesc(certInfoFromApple, distributionCerts) {
    return distributionCerts.sort((certA, certB) => {
        const certAInfo = certInfoFromApple.find(cert => cert.id === certA.certId);
        const certAExpiry = certAInfo ? certAInfo.expires : Number.NEGATIVE_INFINITY;
        const certBInfo = certInfoFromApple.find(cert => cert.id === certB.certId);
        const certBExpiry = certBInfo ? certBInfo.expires : Number.NEGATIVE_INFINITY;
        return certBExpiry - certAExpiry;
    });
}
exports.sortCertificatesByExpiryDesc = sortCertificatesByExpiryDesc;
function getValidCertSerialNumbers(certInfoFromApple) {
    return certInfoFromApple
        .filter(
    // remove expired certs
    cert => cert.expires > Math.floor(Date.now() / 1000))
        .map(cert => cert.serialNumber);
}
exports.getValidCertSerialNumbers = getValidCertSerialNumbers;
