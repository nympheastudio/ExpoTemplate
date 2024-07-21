"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeDistributionCertificateAsync = exports.createDistributionCertificateAsync = exports.listDistributionCertificatesAsync = exports.transformCertificate = exports.getDistributionCertificateAsync = exports.getCertificateBySerialNumberAsync = exports.AppleTooManyCertsError = void 0;
const apple_utils_1 = require("@expo/apple-utils");
const authenticate_1 = require("./authenticate");
const ora_1 = require("../../../ora");
class AppleTooManyCertsError extends Error {
}
exports.AppleTooManyCertsError = AppleTooManyCertsError;
async function getCertificateBySerialNumberAsync(context, serialNumber) {
    const cert = (await apple_utils_1.Certificate.getAsync(context)).find(item => item.attributes.serialNumber === serialNumber);
    if (!cert) {
        throw new Error(`No certificate exists with serial number "${serialNumber}"`);
    }
    return cert;
}
exports.getCertificateBySerialNumberAsync = getCertificateBySerialNumberAsync;
async function getDistributionCertificateAsync(context, serialNumber) {
    // At most, this returns 2 values.
    const certificates = await apple_utils_1.Certificate.getAsync(context, {
        query: {
            filter: {
                certificateType: [apple_utils_1.CertificateType.IOS_DISTRIBUTION, apple_utils_1.CertificateType.DISTRIBUTION],
            },
        },
    });
    return (certificates.find(certificate => certificate.attributes.serialNumber === serialNumber) ?? null);
}
exports.getDistributionCertificateAsync = getDistributionCertificateAsync;
function transformCertificate(cert) {
    return {
        id: cert.id,
        name: cert.attributes.name,
        status: cert.attributes.status,
        created: new Date(cert.attributes.requestedDate).getTime() / 1000,
        expires: new Date(cert.attributes.expirationDate).getTime() / 1000,
        ownerName: cert.attributes.ownerName,
        ownerId: cert.attributes.ownerId,
        serialNumber: cert.attributes.serialNumber,
    };
}
exports.transformCertificate = transformCertificate;
async function listDistributionCertificatesAsync(authCtx) {
    const spinner = (0, ora_1.ora)(`Fetching Apple distribution certificates`).start();
    try {
        const context = (0, authenticate_1.getRequestContext)(authCtx);
        const certs = (await apple_utils_1.Certificate.getAsync(context, {
            query: {
                filter: {
                    certificateType: [
                        apple_utils_1.CertificateType.DISTRIBUTION,
                        apple_utils_1.CertificateType.IOS_DISTRIBUTION,
                        apple_utils_1.CertificateType.MAC_APP_DISTRIBUTION,
                    ],
                },
            },
        })).map(transformCertificate);
        spinner.succeed(`Fetched Apple distribution certificates`);
        return certs;
    }
    catch (error) {
        spinner.fail(`Failed to fetch Apple distribution certificates`);
        throw error;
    }
}
exports.listDistributionCertificatesAsync = listDistributionCertificatesAsync;
/**
 * Run from `eas credentials` -> iOS -> Add new Distribution Certificate
 */
async function createDistributionCertificateAsync(authCtx) {
    const spinner = (0, ora_1.ora)(`Creating Apple distribution certificate`).start();
    try {
        const context = (0, authenticate_1.getRequestContext)(authCtx);
        const results = await (0, apple_utils_1.createCertificateAndP12Async)(context, {
            certificateType: apple_utils_1.CertificateType.IOS_DISTRIBUTION,
        });
        spinner.succeed(`Created Apple distribution certificate`);
        return {
            certId: results.certificate.id,
            certP12: results.certificateP12,
            certPassword: results.password,
            certPrivateSigningKey: results.privateSigningKey,
            distCertSerialNumber: results.certificate.attributes.serialNumber,
            teamId: authCtx.team.id,
            teamName: authCtx.team.name,
        };
    }
    catch (error) {
        spinner.fail('Failed to create Apple distribution certificate');
        // TODO: Move check into apple-utils
        if (/You already have a current .* certificate or a pending certificate request/.test(error.message)) {
            throw new AppleTooManyCertsError('Maximum number of certificates generated');
        }
        throw error;
    }
}
exports.createDistributionCertificateAsync = createDistributionCertificateAsync;
async function revokeDistributionCertificateAsync(authCtx, ids) {
    const name = `Apple distribution certificate${ids?.length === 1 ? '' : 's'}`;
    const spinner = (0, ora_1.ora)(`Revoking ${name}`).start();
    try {
        const context = (0, authenticate_1.getRequestContext)(authCtx);
        await Promise.all(ids.map(id => apple_utils_1.Certificate.deleteAsync(context, { id })));
        spinner.succeed(`Revoked ${name}`);
    }
    catch (error) {
        spinner.fail(`Failed to revoke ${name}`);
        throw error;
    }
}
exports.revokeDistributionCertificateAsync = revokeDistributionCertificateAsync;
